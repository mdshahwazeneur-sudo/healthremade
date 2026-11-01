/**
 * Telegram Instant Lead Notification Dispatcher
 * Sends real-time lead alerts directly to admin's Telegram chat or group.
 */

export interface LeadTelegramPayload {
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
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

export async function sendTelegramLeadAlert(
  payload: LeadTelegramPayload
): Promise<{ success: boolean; error?: string }> {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID || '1228191175'

  if (!token) {
    console.warn('[Telegram Alert] TELEGRAM_BOT_TOKEN is missing.');
    return { success: false, error: 'Telegram credentials missing' }
  }

  try {
    // Generate WhatsApp direct chat link (extract digits only)
    const waDigits = payload.whatsappNumber.replace(/\D/g, '')
    const waLink = waDigits ? `https://wa.me/${waDigits}` : null

    // Format IST timestamp
    const timestamp = new Intl.DateTimeFormat('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short',
      timeZone: 'Asia/Kolkata',
    }).format(new Date())

    const lines: string[] = [
      '🚨 <b>NEW PATIENT QUOTE REQUEST</b>',
      '',
      `👤 <b>Patient:</b> ${escapeHtml(payload.patientName || 'Anonymous Patient')}`,
      `🌍 <b>Country:</b> ${escapeHtml(payload.country || 'Not specified')}`,
      `📱 <b>WhatsApp / Phone:</b> <code>${escapeHtml(payload.whatsappNumber)}</code>`,
    ]

    if (payload.email) {
      lines.push(`✉️ <b>Email:</b> ${escapeHtml(payload.email)}`)
    }

    lines.push(`🩺 <b>Treatment:</b> ${escapeHtml(payload.treatmentNeeded)}`)

    if (payload.preferredHospital) {
      lines.push(`🏥 <b>Preferred Hospital:</b> ${escapeHtml(payload.preferredHospital)}`)
    }

    if (payload.preferredCity) {
      lines.push(`📍 <b>Preferred City:</b> ${escapeHtml(payload.preferredCity)}`)
    }

    if (payload.medicalSummary && payload.medicalSummary.trim().length > 0) {
      lines.push(`📝 <b>Medical Summary:</b> <i>${escapeHtml(payload.medicalSummary.trim())}</i>`)
    }

    if (payload.attachedReportName) {
      lines.push(`📎 <b>Medical Report:</b> <code>${escapeHtml(payload.attachedReportName)}</code> ${payload.attachedReportSize ? `(${escapeHtml(payload.attachedReportSize)})` : ''}`)
    }

    if (payload.sourcePage) {
      lines.push(`🌐 <b>Source Page:</b> <code>${escapeHtml(payload.sourcePage)}</code>`)
    }

    lines.push(`⏰ <b>Received:</b> ${timestamp} IST`)

    if (waLink) {
      lines.push('')
      lines.push(`👉 <a href="${waLink}"><b>Open WhatsApp Chat with Patient</b></a>`)
    }

    const messageText = lines.join('\n')

    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: messageText,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
    })

    const data = await response.json()

    if (!response.ok || !data.ok) {
      console.error('[Telegram Alert Error]', data)
      return { success: false, error: data?.description || 'Telegram API error' }
    }

    return { success: true }
  } catch (err: any) {
    console.error('[Telegram Alert Exception]', err)
    return { success: false, error: err?.message || 'Network error' }
  }
}
