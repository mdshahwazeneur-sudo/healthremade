'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { TrendingDown, ShieldCheck, ChevronRight, ArrowRight, DollarSign, CheckCircle2 } from 'lucide-react'
import { Badge, Button } from '@/components/ui/primitives'
import { PROCEDURES } from '@/data/procedures'
import { formatINR } from '@/lib/utils'
import { useQuote } from '@/components/ui/QuoteModal'

export function HomePricingExplorer() {
  const { openQuoteModal } = useQuote()
  const [selectedSpecialty, setSelectedSpecialty] = useState('all')

  const PRICING_COMPARISONS = [
    {
      procedure: 'Heart Bypass Surgery (CABG)',
      specialty: 'cardiac',
      indiaMin: 320000,
      indiaMax: 480000,
      usPriceUSD: 120000,
      ukPriceUSD: 35000,
      stayDays: 6,
      savings: '82%',
    },
    {
      procedure: 'Total Knee Replacement (Robotic)',
      specialty: 'orthopaedics',
      indiaMin: 260000,
      indiaMax: 380000,
      usPriceUSD: 45000,
      ukPriceUSD: 22000,
      stayDays: 4,
      savings: '78%',
    },
    {
      procedure: 'Living Donor Liver Transplant',
      specialty: 'transplant',
      indiaMin: 1750000,
      indiaMax: 2450000,
      usPriceUSD: 330000,
      ukPriceUSD: 160000,
      stayDays: 14,
      savings: '85%',
    },
    {
      procedure: 'IVF & ICSI Cycle with PGS',
      specialty: 'fertility',
      indiaMin: 130000,
      indiaMax: 220000,
      usPriceUSD: 24000,
      ukPriceUSD: 12000,
      stayDays: 15,
      savings: '75%',
    },
    {
      procedure: 'Minimally Invasive Spine Fusion',
      specialty: 'neurology',
      indiaMin: 360000,
      indiaMax: 520000,
      usPriceUSD: 110000,
      ukPriceUSD: 38000,
      stayDays: 5,
      savings: '80%',
    },
  ]

  const filtered =
    selectedSpecialty === 'all'
      ? PRICING_COMPARISONS
      : PRICING_COMPARISONS.filter((p) => p.specialty === selectedSpecialty)

  return (
    <section className="bg-white py-16 px-4 sm:px-6 border-t border-slate-200/80">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <Badge variant="default" className="mb-2">Transparent Healthcare Costs</Badge>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Pricing Explorer — Save 70% to 85% with Zero Hidden Charges
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Clear itemized packages with all-inclusive hospital stay, surgeon fees, ICU, investigations, and medications.
            </p>
          </div>
          <Link
            href="/pricing"
            className="inline-flex items-center gap-1 text-sm font-bold text-brand-600 hover:text-brand-700"
          >
            Open Full Pricing Calculator <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { id: 'all', label: 'All Procedures' },
            { id: 'cardiac', label: 'Cardiac' },
            { id: 'orthopaedics', label: 'Orthopaedics' },
            { id: 'transplant', label: 'Transplant' },
            { id: 'fertility', label: 'Fertility / IVF' },
            { id: 'neurology', label: 'Spine / Neuro' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedSpecialty(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedSpecialty === tab.id
                  ? 'bg-brand-600 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm bg-slate-50/50">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-100/80 text-[11px] font-extrabold uppercase tracking-wider text-slate-600">
                  <th className="py-3.5 px-4">Treatment / Procedure</th>
                  <th className="py-3.5 px-4">India Package (INR)</th>
                  <th className="py-3.5 px-4">India (USD Approx.)</th>
                  <th className="py-3.5 px-4">US / UK Average Cost</th>
                  <th className="py-3.5 px-4">Your Savings</th>
                  <th className="py-3.5 px-4 text-right">Get Quote</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-xs">
                {filtered.map((item, idx) => {
                  const indiaUSDMin = Math.round(item.indiaMin / 86).toLocaleString()
                  const indiaUSDMax = Math.round(item.indiaMax / 86).toLocaleString()

                  return (
                    <tr key={idx} className="hover:bg-white transition-colors">
                      <td className="py-3.5 px-4 font-bold text-slate-900 text-sm">
                        {item.procedure}
                        <span className="block text-[11px] text-slate-500 font-normal mt-0.5">
                          Includes ~{item.stayDays} days hospital & ICU stay
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-extrabold text-brand-700 text-sm">
                        {formatINR(item.indiaMin)} – {formatINR(item.indiaMax)}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-slate-800 text-sm">
                        ${indiaUSDMin} – ${indiaUSDMax}
                      </td>
                      <td className="py-3.5 px-4 text-slate-500 line-through">
                        ${item.usPriceUSD.toLocaleString()} (US) / ${item.ukPriceUSD.toLocaleString()} (UK)
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1 text-xs font-extrabold text-emerald-700 bg-emerald-100/80 border border-emerald-300 px-2.5 py-0.5 rounded-full">
                          <TrendingDown className="h-3.5 w-3.5" /> Save {item.savings}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <Button
                          variant="accent"
                          size="sm"
                          onClick={() => openQuoteModal({ treatment: item.procedure })}
                          className="font-bold text-xs"
                        >
                          Get Free Quote
                        </Button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}
