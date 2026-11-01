'use client'

import React from 'react'
import { useLanguage } from '@/context/LanguageContext'

export function HomeStatsSection() {
  const { t } = useLanguage()

  const metrics = [
    { value: '500+', label: t.trustMetrics.bedsLabel, sub: t.trustMetrics.bedsSub },
    { value: '48 Hrs', label: t.trustMetrics.turnaroundLabel, sub: t.trustMetrics.turnaroundSub },
    { value: '70–85%', label: t.trustMetrics.savingsLabel, sub: t.trustMetrics.savingsSub },
    { value: '0', label: t.trustMetrics.markupLabel, sub: t.trustMetrics.markupSub },
  ]

  return (
    <section className="border-y border-slate-200 bg-slate-900 text-white py-10 px-4 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {metrics.map((m, idx) => (
            <div key={idx} className="space-y-1">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-400">
                {m.value}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-slate-200">{m.label}</div>
              <div className="text-[11px] text-slate-400">{m.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
