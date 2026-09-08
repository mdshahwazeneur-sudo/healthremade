'use client'

import React from 'react'
import { FileText, MessageCircle, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/primitives'
import { useQuote } from '@/components/ui/QuoteModal'
import { getWhatsAppUrl } from '@/lib/whatsapp'

export function NewsSidebarCTA({ articleTitle }: { articleTitle: string }) {
  const { openQuoteModal } = useQuote()

  const waUrl = getWhatsAppUrl({
    pageType: 'general',
    customMessage: `Hello healthremade! I read the news article "${articleTitle}" and would like to get more information regarding hospital treatment packages and visa support in India.`,
  })

  return (
    <div className="rounded-2xl bg-gradient-to-br from-brand-900 via-brand-800 to-slate-900 text-white p-6 shadow-md border border-brand-700/50">
      <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-2.5 py-0.5 rounded-full mb-3">
        <Sparkles className="h-3 w-3" /> 24/7 International Desk
      </span>
      <h3 className="text-lg font-bold text-white">
        Get Free Hospital Quotes & Visa Support
      </h3>
      <p className="mt-2 text-xs text-slate-300 leading-relaxed">
        Connect with accredited Indian medical centers. Receive customized treatment plans and transparent cost packages.
      </p>

      <div className="mt-5 space-y-2.5">
        <Button
          variant="accent"
          size="sm"
          onClick={() => openQuoteModal()}
          className="w-full font-bold shadow-xs py-2 inline-flex items-center justify-center gap-1.5"
        >
          <FileText className="h-3.5 w-3.5" />
          <span>Request Free Quote</span>
        </Button>

        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-[#25D366] text-white hover:bg-[#1EBE5D] py-2 text-xs font-bold transition-colors shadow-xs"
        >
          <MessageCircle className="h-3.5 w-3.5 fill-white" />
          <span>Chat on WhatsApp</span>
        </a>
      </div>
    </div>
  )
}
