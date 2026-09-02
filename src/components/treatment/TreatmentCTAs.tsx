'use client'

import React from 'react'
import { FileText, MessageCircle, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/primitives'
import { useQuote } from '@/components/ui/QuoteModal'
import { getWhatsAppUrl } from '@/lib/whatsapp'

export function TreatmentHeroCTA({ procedureName }: { procedureName: string }) {
  const { openQuoteModal } = useQuote()

  const waUrl = getWhatsAppUrl({
    pageType: 'treatment',
    treatmentName: procedureName,
  })

  return (
    <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
      <Button
        variant="accent"
        size="lg"
        onClick={() => openQuoteModal({ treatment: procedureName })}
        className="w-full sm:w-auto font-bold shadow-md"
      >
        <FileText className="h-4 w-4 mr-1.5" />
        Get Free Quotes for {procedureName}
      </Button>

      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366] text-white px-5 py-3 text-sm font-bold hover:bg-[#1EBE5D] transition-colors shadow-sm"
      >
        <MessageCircle className="h-4 w-4 fill-white" />
        Chat on WhatsApp
      </a>
    </div>
  )
}

export function TreatmentSidebarCTA({ procedureName }: { procedureName: string }) {
  const { openQuoteModal } = useQuote()

  const waUrl = getWhatsAppUrl({
    pageType: 'treatment',
    treatmentName: procedureName,
  })

  return (
    <div className="rounded-xl border border-brand-200 bg-brand-50/70 p-5 space-y-3">
      <h3 className="font-bold text-sm text-brand-950">
        Free 3-Hospital Comparison for {procedureName}
      </h3>
      <p className="text-xs text-brand-800 leading-relaxed">
        Send your medical scans or reports to receive itemized package prices and surgeon profiles within 24 hours.
      </p>

      <Button
        variant="accent"
        size="md"
        onClick={() => openQuoteModal({ treatment: procedureName })}
        className="w-full font-bold shadow-xs"
      >
        Request Free Quotes <ArrowRight className="h-3.5 w-3.5 ml-1" />
      </Button>

      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-[#25D366] bg-white px-3 py-2 text-xs font-bold text-[#15803d] hover:bg-[#25D366]/10 transition-colors"
      >
        <MessageCircle className="h-3.5 w-3.5 fill-[#25D366] text-[#25D366]" />
        Direct WhatsApp Inquiry
      </a>
    </div>
  )
}
