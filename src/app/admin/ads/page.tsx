'use client'

import React, { useState } from 'react'
import {
  BarChart3,
  TrendingUp,
  Target,
  DollarSign,
  Users2,
  Calendar,
  Filter,
} from 'lucide-react'
import { MOCK_AD_CAMPAIGNS } from '@/data/adminData'
import { Button, Badge, Card, CardContent } from '@/components/ui/primitives'
import { formatINR } from '@/lib/utils'

export default function AdminAdsDashboardPage() {
  const [campaigns, setCampaigns] = useState(MOCK_AD_CAMPAIGNS)

  const totalSpend = campaigns.reduce((sum, c) => sum + c.spendInr, 0)
  const totalLeads = campaigns.reduce((sum, c) => sum + c.leadsGenerated, 0)
  const totalBookings = campaigns.reduce((sum, c) => sum + c.confirmedBookings, 0)
  const totalPipelineRevenue = campaigns.reduce((sum, c) => sum + c.pipelineRevenueInr, 0)
  const blendedCpl = Math.round(totalSpend / totalLeads)
  const blendedCpb = Math.round(totalSpend / totalBookings)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-brand-400" />
            Ads & Campaign ROI Dashboard (CRM Attributed)
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Judge paid media spend by confirmed hospital admissions and treatment value, not superficial form submissions.
          </p>
        </div>

        <div className="text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
          <TrendingUp className="h-4 w-4" /> Blended ROI: <strong>{(totalPipelineRevenue / totalSpend).toFixed(1)}x</strong>
        </div>
      </div>

      {/* Aggregate Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-slate-900 border-slate-800 text-white">
          <CardContent className="p-4 sm:p-5">
            <span className="text-xs text-slate-400 font-semibold block">Total Ad Spend (M-T-D)</span>
            <div className="text-2xl font-extrabold text-white mt-1">{formatINR(totalSpend)}</div>
            <span className="text-[11px] text-slate-400 mt-0.5 block">Across 4 Active Campaigns</span>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800 text-white">
          <CardContent className="p-4 sm:p-5">
            <span className="text-xs text-slate-400 font-semibold block">Attributed Inquiries</span>
            <div className="text-2xl font-extrabold text-brand-400 mt-1">{totalLeads} Leads</div>
            <span className="text-[11px] text-slate-400 mt-0.5 block">Blended CPL: {formatINR(blendedCpl)}</span>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800 text-white">
          <CardContent className="p-4 sm:p-5">
            <span className="text-xs text-slate-400 font-semibold block">Confirmed Bookings</span>
            <div className="text-2xl font-extrabold text-emerald-400 mt-1">{totalBookings} Patients</div>
            <span className="text-[11px] text-slate-400 mt-0.5 block">Cost Per Booking: {formatINR(blendedCpb)}</span>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800 text-white">
          <CardContent className="p-4 sm:p-5">
            <span className="text-xs text-slate-400 font-semibold block">Attributed Hospital Billing</span>
            <div className="text-2xl font-extrabold text-amber-400 mt-1">{formatINR(totalPipelineRevenue)}</div>
            <span className="text-[11px] text-emerald-400 mt-0.5 block font-semibold">Net High-Intent Pipeline</span>
          </CardContent>
        </Card>
      </div>

      {/* Campaigns Breakdown Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="border-b border-slate-800 bg-slate-950/70 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
            <tr>
              <th className="p-3.5">Campaign & Channel</th>
              <th className="p-3.5">Target Keywords & Region</th>
              <th className="p-3.5">Spend (INR)</th>
              <th className="p-3.5">Leads / CPL</th>
              <th className="p-3.5">Bookings</th>
              <th className="p-3.5">Pipeline Revenue</th>
              <th className="p-3.5 text-right">ROI Multiplier</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {campaigns.map((c) => (
              <tr key={c.id} className="hover:bg-slate-800/50 transition-colors">
                <td className="p-3.5">
                  <div className="font-bold text-white">{c.campaignName}</div>
                  <span
                    className={`inline-block mt-0.5 text-[9px] font-bold px-1.5 py-0.2 rounded ${
                      c.channel === 'Google Ads'
                        ? 'bg-blue-500/20 text-blue-300'
                        : c.channel === 'Meta Ads'
                        ? 'bg-purple-500/20 text-purple-300'
                        : 'bg-emerald-500/20 text-emerald-300'
                    }`}
                  >
                    {c.channel}
                  </span>
                </td>
                <td className="p-3.5">
                  <div className="font-mono text-brand-400 text-[11px]">&ldquo;{c.targetKeyword}&rdquo;</div>
                  <div className="text-[10px] text-slate-400">{c.targetRegion}</div>
                </td>
                <td className="p-3.5 font-bold text-white">{formatINR(c.spendInr)}</td>
                <td className="p-3.5">
                  <span className="font-bold text-white">{c.leadsGenerated} leads</span>
                  <div className="text-[10px] text-slate-400">({formatINR(c.costPerLeadInr)} / lead)</div>
                </td>
                <td className="p-3.5 font-bold text-emerald-400">
                  {c.confirmedBookings} bookings
                  <div className="text-[10px] text-slate-400">({formatINR(c.costPerBookingInr)} / bkg)</div>
                </td>
                <td className="p-3.5 font-bold text-white">{formatINR(c.pipelineRevenueInr)}</td>
                <td className="p-3.5 text-right font-extrabold text-amber-400 text-sm">
                  {c.roiMultiplier}x
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
