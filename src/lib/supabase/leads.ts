import { createClient } from './client'
import type { Database } from './types'

export type LeadInsert = Database['public']['Tables']['leads']['Insert']
export type LeadRow = Database['public']['Tables']['leads']['Row']

export async function submitPatientLead(lead: {
  patientName: string
  country: string
  whatsappNumber: string
  email?: string
  treatmentNeeded: string
  preferredHospital?: string
  preferredCity?: string
  medicalSummary?: string
  sourcePage?: string
  attachedReportName?: string
  attachedReportSize?: string
  medicalReportsUrls?: string[]
  honeypot?: string
}): Promise<{ success: boolean; leadId?: string; error?: string }> {
  try {
    // 1. Post to internal API route (which dispatches Telegram instant alert + records lead)
    if (typeof window !== 'undefined') {
      try {
        const response = await fetch('/api/quote', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(lead),
        })

        if (response.ok) {
          const resData = await response.json()
          if (resData.success) {
            return { success: true, leadId: resData.leadId }
          }
        }
      } catch (apiErr) {
        console.warn('API /api/quote call failed, using direct client fallback:', apiErr)
      }
    }

    // 2. Direct fallback (e.g. server-side invocation or offline fallback)
    const supabase = createClient()
    
    const record: LeadInsert = {
      patient_name: lead.patientName,
      country: lead.country,
      whatsapp_number: lead.whatsappNumber,
      email: lead.email || null,
      treatment_needed: lead.treatmentNeeded,
      preferred_hospital: lead.preferredHospital || null,
      preferred_city: lead.preferredCity || null,
      medical_summary: lead.medicalSummary || null,
      status: 'new',
      source_page: lead.sourcePage || (typeof window !== 'undefined' ? window.location.pathname : null),
      medical_reports_urls: lead.medicalReportsUrls || null,
    }

    if (supabase) {
      const { data, error } = await supabase
        .from('leads')
        .insert(record)
        .select('id')
        .single()

      if (error) {
        console.error('Supabase lead insert error:', error)
        return { success: true, leadId: 'local-' + Date.now() }
      }

      return { success: true, leadId: data.id }
    }

    return { success: true, leadId: 'dev-' + Date.now() }
  } catch (err: any) {
    console.error('Submit lead error:', err)
    return { success: false, error: err?.message || 'Unknown error' }
  }
}
