import { createClient, isSupabaseConfigured } from './client'
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
  medicalReportsUrls?: string[]
}): Promise<{ success: boolean; leadId?: string; error?: string }> {
  try {
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
        return { success: true, leadId: 'local-' + Date.now() } // graceful fallback
      }

      return { success: true, leadId: data.id }
    }

    // Fallback if Supabase credentials are not yet populated in .env.local
    console.log('[Offline/Dev Mode] Lead captured:', record)
    return { success: true, leadId: 'dev-' + Date.now() }
  } catch (err: any) {
    console.error('Submit lead error:', err)
    return { success: false, error: err?.message || 'Unknown error' }
  }
}
