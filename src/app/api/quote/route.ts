import { NextResponse } from 'next/server'
import { sendTelegramLeadAlert, type LeadTelegramPayload } from '@/lib/telegram'
import { createClient } from '@/lib/supabase/client'
import { sanitizeInput } from '@/lib/security'

// In-memory sliding window rate limiter (IP -> Array of request timestamps)
const rateLimitMap = new Map<string, number[]>()
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000 // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 6 // Max 6 quote submissions per IP per 10 mins

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const windowStart = now - RATE_LIMIT_WINDOW_MS
  
  const timestamps = (rateLimitMap.get(ip) || []).filter((t) => t > windowStart)
  
  if (timestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    return true
  }

  timestamps.push(now)
  rateLimitMap.set(ip, timestamps)

  // Periodic cleanup if map grows large
  if (rateLimitMap.size > 5000) {
    for (const [key, times] of rateLimitMap.entries()) {
      const valid = times.filter((t) => t > windowStart)
      if (valid.length === 0) rateLimitMap.delete(key)
      else rateLimitMap.set(key, valid)
    }
  }

  return false
}

export async function POST(request: Request) {
  try {
    // 1. IP Rate Limiting
    const forwardedFor = request.headers.get('x-forwarded-for')
    const realIp = request.headers.get('x-real-ip')
    const clientIp = (forwardedFor?.split(',')[0] || realIp || '127.0.0.1').trim()

    if (isRateLimited(clientIp)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Too many quote requests from this network. Please wait a few minutes before trying again.',
        },
        { status: 429 }
      )
    }

    const body = await request.json()

    // 2. Anti-Spam Bot Honeypot Check
    if (body.honeypot && String(body.honeypot).trim().length > 0) {
      // Silently discard bot submission
      return NextResponse.json({ success: true, leadId: 'discarded' })
    }

    const {
      patientName,
      country,
      whatsappNumber,
      email,
      treatmentNeeded,
      preferredHospital,
      preferredCity,
      medicalSummary,
      sourcePage,
      attachedReportName,
      attachedReportSize,
      medicalReportsUrls,
    } = body

    if (!whatsappNumber) {
      return NextResponse.json(
        { success: false, error: 'Phone number is required' },
        { status: 400 }
      )
    }

    // 3. Sanitize inputs
    const cleanName = sanitizeInput(patientName || 'Anonymous Patient', 100)
    const cleanCountry = sanitizeInput(country || 'Not specified', 60)
    const cleanPhone = sanitizeInput(whatsappNumber, 40)
    const cleanEmail = email ? sanitizeInput(email, 100) : undefined
    const cleanTreatment = sanitizeInput(treatmentNeeded || 'General Medical Inquiry', 120)
    const cleanHospital = preferredHospital ? sanitizeInput(preferredHospital, 120) : undefined
    const cleanCity = preferredCity ? sanitizeInput(preferredCity, 80) : undefined
    const cleanSummary = medicalSummary ? sanitizeInput(medicalSummary, 800) : undefined
    const cleanSource = sourcePage ? sanitizeInput(sourcePage, 150) : undefined
    const cleanReportName = attachedReportName ? sanitizeInput(attachedReportName, 120) : undefined
    const cleanReportSize = attachedReportSize ? sanitizeInput(attachedReportSize, 30) : undefined

    const payload: LeadTelegramPayload = {
      patientName: cleanName,
      country: cleanCountry,
      whatsappNumber: cleanPhone,
      email: cleanEmail,
      treatmentNeeded: cleanTreatment,
      preferredHospital: cleanHospital,
      preferredCity: cleanCity,
      medicalSummary: cleanSummary,
      sourcePage: cleanSource,
      attachedReportName: cleanReportName,
      attachedReportSize: cleanReportSize,
    }

    // 4. Send instant notification to Telegram
    const telegramResult = await sendTelegramLeadAlert(payload)

    // 5. Insert into Supabase leads table if configured
    let leadId = 'lead-' + Date.now()
    try {
      const supabase = createClient()
      if (supabase) {
        const { data, error } = await supabase
          .from('leads')
          .insert({
            patient_name: payload.patientName,
            country: payload.country,
            whatsapp_number: payload.whatsappNumber,
            email: cleanEmail || null,
            treatment_needed: payload.treatmentNeeded,
            preferred_hospital: cleanHospital || null,
            preferred_city: cleanCity || null,
            medical_summary: cleanSummary || null,
            status: 'new',
            source_page: cleanSource || null,
            medical_reports_urls: medicalReportsUrls || (cleanReportName ? [cleanReportName] : null),
          })
          .select('id')
          .single()

        if (!error && data?.id) {
          leadId = data.id
        }
      }
    } catch (dbErr) {
      console.warn('[Database Insert Warning]', dbErr)
    }

    return NextResponse.json({
      success: true,
      leadId,
      telegramNotified: telegramResult.success,
    })
  } catch (error: any) {
    console.error('[API /api/quote Error]', error)
    return NextResponse.json(
      { success: false, error: error?.message || 'Server error' },
      { status: 500 }
    )
  }
}
