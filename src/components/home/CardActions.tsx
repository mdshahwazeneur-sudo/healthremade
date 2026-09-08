'use client'

import React from 'react'
import { FileText, MessageCircle, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/primitives'
import { useQuote } from '@/components/ui/QuoteModal'
import { getWhatsAppUrl } from '@/lib/whatsapp'

export function ProcedureCardActions({
  procedureName,
  slug,
  specialty,
}: {
  procedureName: string
  slug: string
  specialty: string
}) {
  const { openQuoteModal } = useQuote()

  const waUrl = getWhatsAppUrl({
    pageType: 'treatment',
    treatmentName: procedureName,
  })

  return (
    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
      <Button
        variant="accent"
        size="sm"
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          openQuoteModal({ treatment: procedureName })
        }}
        className="flex-1 h-9 text-xs font-bold shadow-2xs inline-flex items-center justify-center gap-1.5"
      >
        <FileText className="h-3.5 w-3.5" />
        <span>Get Quote</span>
      </Button>

      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className="flex-1 h-9 inline-flex items-center justify-center gap-1.5 rounded-lg border border-emerald-300 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 px-3 text-xs font-bold transition-colors shadow-2xs"
        title="Chat on WhatsApp about this procedure"
      >
        <MessageCircle className="h-3.5 w-3.5 fill-[#25D366] text-[#25D366]" />
        <span>WhatsApp</span>
      </a>
    </div>
  )
}

export function HospitalCardActions({
  hospitalName,
  city,
}: {
  hospitalName: string
  city: string
}) {
  const { openQuoteModal } = useQuote()

  const waUrl = getWhatsAppUrl({
    pageType: 'hospital',
    hospitalName,
    city,
  })

  return (
    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
      <Button
        variant="primary"
        size="sm"
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          openQuoteModal({ hospital: hospitalName, city })
        }}
        className="flex-1 h-9 text-xs font-bold shadow-2xs inline-flex items-center justify-center gap-1.5"
      >
        <FileText className="h-3.5 w-3.5" />
        <span>Get Quote</span>
      </Button>

      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className="flex-1 h-9 inline-flex items-center justify-center gap-1.5 rounded-lg border border-emerald-300 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 px-3 text-xs font-bold transition-colors shadow-2xs"
        title="Enquire on WhatsApp about this hospital"
      >
        <MessageCircle className="h-3.5 w-3.5 fill-[#25D366] text-[#25D366]" />
        <span>WhatsApp</span>
      </a>
    </div>
  )
}

export function CustomPackageCardAction() {
  const { openQuoteModal } = useQuote()

  const waUrl = getWhatsAppUrl({
    pageType: 'general',
    customMessage: 'Hello healthremade! I want to get a custom medical quote & doctor recommendation for a specific surgery/treatment in India.',
  })

  return (
    <div className="mt-4 pt-3 border-t border-brand-200/60 flex items-center gap-2">
      <Button
        variant="accent"
        size="sm"
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          openQuoteModal({ treatment: 'Other Medical Condition' })
        }}
        className="flex-1 h-9 text-xs font-bold shadow-xs bg-amber-500 hover:bg-amber-600 text-slate-950 inline-flex items-center justify-center gap-1.5"
      >
        <FileText className="h-3.5 w-3.5" />
        <span>Get Quote</span>
      </Button>

      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className="flex-1 h-9 inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#25D366] text-white hover:bg-[#1EBE5D] px-3 text-xs font-bold transition-colors shadow-2xs"
        title="Chat on WhatsApp about custom package"
      >
        <MessageCircle className="h-3.5 w-3.5 fill-white text-white" />
        <span>WhatsApp</span>
      </a>
    </div>
  )
}

