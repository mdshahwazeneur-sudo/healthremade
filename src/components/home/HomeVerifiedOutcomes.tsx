'use client'

import React from 'react'
import Link from 'next/link'
import { ShieldCheck, CheckCircle2, Star, TrendingUp, Users, ChevronRight, Award } from 'lucide-react'
import { Badge, Card, CardContent, Button } from '@/components/ui/primitives'
import { useQuote } from '@/components/ui/QuoteModal'

import { CloudflareVideoTestimonialPlayer } from '@/components/testimonials/CloudflareVideoTestimonialPlayer'

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

  return (
    <section className="bg-slate-950 text-white py-16 px-4 sm:px-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl relative z-10 space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 px-3 py-1 text-xs font-bold text-emerald-300 mb-3">
              <ShieldCheck className="h-3.5 w-3.5" /> Longitudinal Survey Benchmarks & Patient Stories
            </div>
            <h2 className="text-2xl font-extrabold sm:text-3xl lg:text-4xl text-white">
              Verified Patient Outcomes & Video Testimonials
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-2xl">
              Watch authentic video stories from international patients with multi-language subtitles synchronized with your language preference.
            </p>
          </div>
          <Link
            href="/verified-outcomes"
            className="inline-flex items-center gap-1 text-sm font-bold text-brand-400 hover:text-brand-300"
          >
            Review Audit Methodology <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        {/* ─── Cloudflare Stream Multi-Language Video Player ─────────── */}
        <CloudflareVideoTestimonialPlayer />

        {/* 4 Outcome Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-4">
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
      </div>
    </section>
  )
}
