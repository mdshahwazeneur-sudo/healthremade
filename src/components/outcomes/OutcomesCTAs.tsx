'use client'

import React from 'react'
import Link from 'next/link'
import { FileText, MessageCircle, ArrowRight, Building2, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/primitives'
import { useQuote } from '@/components/ui/QuoteModal'
import { getWhatsAppUrl } from '@/lib/whatsapp'

export function OutcomesHeroCTA() {
  const { openQuoteModal } = useQuote()
  const waUrl = getWhatsAppUrl({ pageType: 'outcomes' })

  return (
    <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
      <Button
        variant="accent"
        size="lg"
        onClick={() => openQuoteModal()}
        className="w-full sm:w-auto font-bold shadow-md"
      >
        <FileText className="h-4 w-4 mr-1.5" />
        Request Verified Hospital Options
      </Button>

      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366] text-white px-5 py-3 text-sm font-bold hover:bg-[#1EBE5D] transition-colors shadow-sm"
      >
        <MessageCircle className="h-4 w-4 fill-white" />
        WhatsApp Medical Desk
      </a>
    </div>
  )
}

export function OutcomesBottomCTA() {
  const { openQuoteModal } = useQuote()
  const waUrl = getWhatsAppUrl({ pageType: 'outcomes' })

  return (
    <section className="bg-gradient-to-br from-slate-900 to-brand-950 text-white py-16 px-4 sm:px-6 border-t border-slate-800">
      <div className="mx-auto max-w-4xl text-center space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 px-3.5 py-1 text-xs font-semibold text-emerald-300">
          <ShieldCheck className="h-3.5 w-3.5" /> JCI & NABH Hospital Network
        </div>

        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
          Want Help Choosing the Right Hospital for Your Condition?
        </h2>

        <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Share your medical case to receive verified doctor profiles, hospital outcomes, and 3+ itemized package estimates within 24 hours — 100% free with no obligation.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
          <Button
            variant="accent"
            size="lg"
            onClick={() => openQuoteModal()}
            className="w-full sm:w-auto font-bold px-7 py-3.5 shadow-lg"
          >
            <FileText className="h-4 w-4 mr-1.5" />
            Get Free Hospital Quotes
          </Button>

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] text-white px-6 py-3.5 text-sm font-bold hover:bg-[#1EBE5D] transition-colors shadow-lg"
          >
            <MessageCircle className="h-4 w-4 fill-white" />
            Chat on WhatsApp
          </a>

          <Button
            variant="outline"
            size="lg"
            asChild
            className="w-full sm:w-auto bg-white/10 text-white border-white/20 hover:bg-white/20 hover:text-white"
          >
            <Link href="/pricing">
              Pricing Explorer <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </div>

        <p className="text-xs text-slate-400 pt-2">
          🔒 Strict patient confidentiality • Free coordinator support • Direct hospital admission
        </p>
      </div>
    </section>
  )
}
