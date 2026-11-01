'use client'

import React, { useState } from 'react'
import {
  ChevronDown,
  HelpCircle,
  Sparkles,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react'
import { useQuote } from '@/components/ui/QuoteModal'
import { getWhatsAppUrl } from '@/lib/whatsapp'
import { buildFAQSchema } from '@/lib/schema'
import { JsonLd } from '@/components/ui/primitives'
import type { FAQ } from '@/data/faqsData'

interface FaqSectionProps {
  title?: string
  subtitle?: string
  badgeText?: string
  faqs: FAQ[]
  prefillTreatment?: string
  className?: string
}

export function FaqSection({
  title = 'Frequently Asked Questions',
  subtitle = 'Clinical benchmarks, itemized costs, visa timelines, and hospital care answered by our medical team.',
  badgeText = 'AEO & GEO Verified Medical Guide',
  faqs,
  prefillTreatment,
  className = '',
}: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const { openQuoteModal } = useQuote()

  const waUrl = getWhatsAppUrl({
    pageType: 'treatment',
    treatmentName: prefillTreatment || 'General Medical Inquiry',
    customMessage: `Hello healthremade! I have a question regarding medical treatment in India: `,
  })

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx)
  }

  if (!faqs || faqs.length === 0) return null

  return (
    <section className={`py-12 sm:py-16 ${className}`}>
      {/* Schema.org FAQPage for AEO & GEO (AI Overviews, Perplexity, SearchGPT) */}
      <JsonLd data={buildFAQSchema({ questions: faqs })} />

      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 border border-brand-200/80 px-3.5 py-1 text-xs font-bold text-brand-800 mb-3 shadow-2xs">
            <Sparkles className="h-3.5 w-3.5 text-brand-600 animate-pulse" />
            <span>{badgeText}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            {title}
          </h2>

          <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
            {subtitle}
          </p>

          <div className="mt-3 flex items-center justify-center gap-3 text-[11px] text-slate-500 font-semibold">
            <span className="flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" /> JCI & NABH Standards
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5 text-brand-600" /> {faqs.length} Answers Updated for 2026
            </span>
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'border-brand-300 bg-white shadow-md'
                    : 'border-slate-200/90 bg-slate-50/60 hover:bg-white hover:border-slate-300'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left gap-4"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-xs font-bold transition-colors ${
                        isOpen
                          ? 'bg-brand-600 text-white'
                          : 'bg-slate-200/80 text-slate-600'
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <span className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-brand-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 border-t border-slate-100 text-xs sm:text-sm text-slate-600 leading-relaxed space-y-2">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Bottom Support Banner */}
        <div className="mt-10 rounded-2xl bg-gradient-to-r from-slate-900 via-brand-950 to-slate-900 text-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-1.5 text-center sm:text-left">
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-400 bg-brand-900/60 border border-brand-700/60 px-2 py-0.5 rounded">
              24/7 International Desk
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-white">
              Have a question not listed here?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-lg">
              Our medical directors and hospital coordinators review cases within 24 hours. Get verified surgical opinions and package estimates free of charge.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => openQuoteModal({ treatment: prefillTreatment })}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 hover:bg-brand-500 active:scale-95 text-white font-bold text-xs sm:text-sm px-5 py-3 transition-all shadow-md"
            >
              <span>Ask Our Medical Team</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-bold text-xs sm:text-sm px-4 py-3 transition-all shadow-md"
            >
              <MessageCircle className="h-4 w-4" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
