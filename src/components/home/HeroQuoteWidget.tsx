'use client'

import React, { useState } from 'react'
import { ArrowRight, MessageCircle, ShieldCheck, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/primitives'
import { useQuote } from '@/components/ui/QuoteModal'
import { getWhatsAppUrl } from '@/lib/whatsapp'
import { PROCEDURES } from '@/data/procedures'

export function HeroQuoteWidget() {
  const { openQuoteModal } = useQuote()
  const [selectedSpecialty, setSelectedSpecialty] = useState('cardiac')
  const [selectedCity, setSelectedCity] = useState('delhi')

  const currentProc = PROCEDURES.find((p) => p.specialty === selectedSpecialty) || PROCEDURES[0]

  const waUrl = getWhatsAppUrl({
    pageType: 'home',
    treatmentName: currentProc.name,
    city: selectedCity === 'delhi' ? 'Delhi NCR' : selectedCity.toUpperCase(),
    customMessage: `Hello healthremade! I would like to get 3 hospital opinions and cost estimates for ${currentProc.name}.`,
  })

  return (
    <div className="mx-auto mt-6 w-full max-w-3xl rounded-2xl sm:rounded-3xl bg-white p-4 sm:p-6 shadow-xl border border-slate-200/80 text-left">
      {/* ─── Top Header: Title & Badges ──────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-3.5 mb-4 gap-2">
        <div className="flex items-center gap-2">
          <span className="flex h-3 w-3 rounded-full bg-emerald-500 animate-ping" />
          <h2 className="text-sm sm:text-base md:text-lg font-extrabold text-slate-900 tracking-tight">
            Get 3 Hospital Opinions & Cost Estimates
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
            <ShieldCheck className="h-3 w-3" /> JCI & NABH Verified
          </span>
          <span className="text-[11px] text-brand-700 font-bold bg-brand-50 border border-brand-200 px-2.5 py-0.5 rounded-full">
            100% Free & Confidential
          </span>
        </div>
      </div>

      {/* ─── Quotation Form Controls ─────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            1. Select Specialty / Procedure
          </label>
          <select
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-slate-50/70 px-3 py-2.5 text-xs sm:text-sm text-slate-900 font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-600 shadow-2xs"
          >
            <option value="cardiac">Cardiac Surgery (CABG / Bypass)</option>
            <option value="orthopaedics">Total Knee & Hip Replacement</option>
            <option value="transplant">Liver & Kidney Transplant</option>
            <option value="fertility">IVF & Assisted Reproduction</option>
            <option value="neurology">Spine & Neurosurgery</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            2. Preferred Medical Hub
          </label>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-slate-50/70 px-3 py-2.5 text-xs sm:text-sm text-slate-900 font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-600 shadow-2xs"
          >
            <option value="delhi">Delhi NCR (Medanta, Fortis, Max, Apollo)</option>
            <option value="mumbai">Mumbai (Kokilaben, Lilavati)</option>
            <option value="chennai">Chennai (Apollo Greams Rd)</option>
            <option value="bangalore">Bengaluru (Narayana, Manipal)</option>
            <option value="hyderabad">Hyderabad (Yashoda)</option>
          </select>
        </div>

        <div className="flex flex-col justify-end">
          <Button
            variant="accent"
            size="lg"
            onClick={() =>
              openQuoteModal({
                treatment: currentProc.name,
                city: selectedCity,
              })
            }
            className="w-full h-[42px] font-bold shadow-sm"
          >
            Get Free Quotes <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>

      {/* ─── Trust Checkpoints & WhatsApp CTA ────────────────────── */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <span className="flex items-center gap-1 font-medium">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" /> Quotes from 3+ Hospitals
          </span>
          <span className="flex items-center gap-1 font-medium">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" /> Free Visa Invitation
          </span>
          <span className="flex items-center gap-1 font-medium">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" /> In-Country Airport Pickup
          </span>
        </div>

        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3 py-1.5 rounded-xl transition-colors shadow-2xs"
        >
          <MessageCircle className="h-4 w-4 fill-[#25D366] text-[#25D366]" />
          <span>Instant WhatsApp Estimate →</span>
        </a>
      </div>
    </div>
  )
}
