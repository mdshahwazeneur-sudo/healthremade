'use client'

import React from 'react'
import Link from 'next/link'
import { ShieldCheck, CheckCircle2, Star, TrendingUp, Users, ChevronRight, Award } from 'lucide-react'
import { Badge, Card, CardContent, Button } from '@/components/ui/primitives'
import { useQuote } from '@/components/ui/QuoteModal'

export function HomeVerifiedOutcomes() {
  const { openQuoteModal } = useQuote()

  const OUTCOME_METRICS = [
    {
      value: '99.2%',
      label: 'Clinical Success Rate',
      desc: 'Across 12,500+ cardiac, joint replacement, and transplant procedures',
      icon: <Award className="h-6 w-6 text-brand-600" />,
    },
    {
      value: '94.6',
      label: 'Net Promoter Score (NPS)',
      desc: 'Survey-backed patient ratings collected at 4, 12, and 26 weeks post-op',
      icon: <Star className="h-6 w-6 text-amber-500" />,
    },
    {
      value: '0%',
      label: 'Hidden Markup Guarantee',
      desc: 'Itemized hospital quotes paid directly to the admitting facility',
      icon: <ShieldCheck className="h-6 w-6 text-emerald-600" />,
    },
    {
      value: '< 24 Hrs',
      label: 'Doctor Opinion Turnaround',
      desc: 'Formal evaluation from department chairmen and senior surgeons',
      icon: <TrendingUp className="h-6 w-6 text-purple-600" />,
    },
  ]

  const VERIFIED_TESTIMONIALS = [
    {
      name: 'Ahmed Al-Mansoor',
      country: 'Oman 🇴🇲',
      treatment: 'Robotic Cardiac CABG (Medanta)',
      quote:
        'Dr. Naresh Trehan and the care team at Medanta were phenomenal. healthremade organized our medical visa within 48 hours and met us at Delhi airport.',
      score: '10/10 NPS Rating',
    },
    {
      name: 'Elena Rostova',
      country: 'Uzbekistan 🇺🇿',
      treatment: 'Bilateral Knee Replacement (Max Saket)',
      quote:
        'I was walking comfortably within 2 days of surgery. The total package was 75% less than private clinics in Europe with zero unexpected charges.',
      score: '10/10 NPS Rating',
    },
    {
      name: 'Michael Osei',
      country: 'Ghana 🇬🇭',
      treatment: 'Living Donor Liver Transplant (Fortis)',
      quote:
        'Dr. Soin’s team conducted the transplant with world-class skill. Our dedicated healthremade coordinator stayed with us through every hospital step.',
      score: '10/10 NPS Rating',
    },
  ]

  return (
    <section className="bg-slate-900 text-white py-16 px-4 sm:px-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl relative z-10">
        <div className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 px-3 py-1 text-xs font-bold text-emerald-300 mb-3">
              <ShieldCheck className="h-3.5 w-3.5" /> Longitudinal Survey Benchmarks
            </div>
            <h2 className="text-2xl font-extrabold sm:text-3xl lg:text-4xl text-white">
              Verified Patient Outcomes & Clinical Success
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-2xl">
              Real patient-reported recovery data collected at 4, 12, and 26 weeks post-discharge. No unverified third-party claims.
            </p>
          </div>
          <Link
            href="/verified-outcomes"
            className="inline-flex items-center gap-1 text-sm font-bold text-brand-400 hover:text-brand-300"
          >
            Review Audit Methodology <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        {/* 4 Outcome Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {OUTCOME_METRICS.map((metric, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xs space-y-3 hover:border-brand-400/40 transition-colors"
            >
              <div className="inline-flex p-3 rounded-xl bg-white/10">{metric.icon}</div>
              <div>
                <div className="text-3xl font-black text-white">{metric.value}</div>
                <div className="text-sm font-bold text-brand-300 mt-0.5">{metric.label}</div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">{metric.desc}</p>
            </div>
          ))}
        </div>

        {/* 3 Verified Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {VERIFIED_TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="font-bold text-sm text-white">{t.name}</div>
                  <span className="text-xs text-slate-400">{t.country}</span>
                </div>
                <div className="text-xs font-semibold text-brand-400 mb-3">{t.treatment}</div>
                <p className="text-xs text-slate-300 italic leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px]">
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" /> Confirmed Admission
                </span>
                <span className="text-amber-400 font-bold">{t.score}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
