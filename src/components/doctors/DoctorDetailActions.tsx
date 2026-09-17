'use client'

import React from 'react'
import { FileText, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/primitives'
import { useQuote } from '@/components/ui/QuoteModal'
import { getWhatsAppUrl } from '@/lib/whatsapp'

interface DoctorDetailActionsProps {
  doctorName: string
  hospitalName: string
  department: string
}

export function DoctorDetailActions({
  doctorName,
  hospitalName,
  department,
}: DoctorDetailActionsProps) {
  const { openQuoteModal } = useQuote()

  const waUrl = getWhatsAppUrl({
    pageType: 'treatment',
    hospitalName,
    customMessage: `Hello healthremade! I would like to consult with ${doctorName} (${department}) at ${hospitalName} in India. Please guide me with treatment plans, costs, and medical visa support.`,
  })

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
      <Button
        variant="accent"
        size="md"
        onClick={() =>
          openQuoteModal({
            treatment: `${doctorName} (${department})`,
            hospital: hospitalName,
          })
        }
        className="flex-1 font-bold shadow-xs py-2.5 h-11"
      >
        <FileText className="h-4 w-4 mr-1.5" />
        Get Free Senior Doctor Opinion
      </Button>

      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#1EBE5D] transition-all shadow-xs h-11"
      >
        <MessageCircle className="h-4 w-4 fill-white" />
        WhatsApp
      </a>
    </div>
  )
}
