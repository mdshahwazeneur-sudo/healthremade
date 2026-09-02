'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Users2,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  FileCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldAlert,
  Building2,
  ExternalLink,
  MessageCircle,
  Play,
  FileText,
} from 'lucide-react'
import {
  ADMIN_KPIS,
  MOCK_LEADS,
  MOCK_PRICING_REQUESTS,
  MOCK_DISPUTES,
  MOCK_MODERATION,
} from '@/data/adminData'
import { useAdminData } from '@/context/AdminDataContext'
import { Button, Badge, Card, CardContent } from '@/components/ui/primitives'
import { formatINR } from '@/lib/utils'

export default function AdminOverviewPage() {
  const { leads, pricingRequests, updatePricingRequest, disputes, updateDispute, moderationItems, updateModerationItem } = useAdminData()

  const handleApprovePricing = (id: string) => {
    updatePricingRequest(id, { status: 'approved' })
  }

  const handleRejectPricing = (id: string) => {
    updatePricingRequest(id, { status: 'rejected' })
  }

  return (
    <div className="space-y-8">
      {/* ─── Page Title & Alerts Bar ─────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Operational Command Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time oversight of patient intake pipeline, hospital tariff approvals, dispute SLAs, and ad attribution.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button variant="accent" size="sm" asChild className="font-bold">
            <Link href="/admin/leads">
              <Users2 className="h-3.5 w-3.5 mr-1" /> View Full CRM ({ADMIN_KPIS.activeLeadsCount})
            </Link>
          </Button>
        </div>
      </div>

      {/* ─── 1. CORE OPERATIONAL KPIS ──────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-slate-900 border-slate-800 text-white">
          <CardContent className="p-4 sm:p-5">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
              <span>Active Patient Leads</span>
              <Users2 className="h-4 w-4 text-brand-400" />
            </div>
            <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-white">
              {ADMIN_KPIS.activeLeadsCount}
            </div>
            <div className="mt-1 text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
              <span>↑ 14 inquiries this week</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800 text-white">
          <CardContent className="p-4 sm:p-5">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
              <span>Active Pipeline Value</span>
              <DollarSign className="h-4 w-4 text-emerald-400" />
            </div>
            <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-white">
              {formatINR(ADMIN_KPIS.pipelineValueInr)}
            </div>
            <div className="mt-1 text-[11px] text-slate-400">
              Across 29 confirmed bookings
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800 text-white">
          <CardContent className="p-4 sm:p-5">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
              <span>Blended Cost Per Lead</span>
              <TrendingUp className="h-4 w-4 text-amber-400" />
            </div>
            <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-white">
              {formatINR(ADMIN_KPIS.blendedCplInr)}
            </div>
            <div className="mt-1 text-[11px] text-emerald-400 font-medium">
              34.8x ROI multiplier
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800 text-white">
          <CardContent className="p-4 sm:p-5">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
              <span>Disputes & Escalations</span>
              <AlertTriangle className="h-4 w-4 text-rose-400" />
            </div>
            <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-rose-400">
              {ADMIN_KPIS.activeDisputesCount} Active
            </div>
            <div className="mt-1 text-[11px] text-rose-300 font-medium">
              1 ticket within 4h SLA deadline
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ─── 2. ACTIVE PATIENT CRM PIPELINE SNAPSHOT ────────────────── */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Users2 className="h-5 w-5 text-brand-400" />
              Patient Pipeline & Case Manager Assignments
            </h2>
            <p className="text-xs text-slate-400">
              Track global patient journeys from initial medical quote to hospital admission and discharge.
            </p>
          </div>

          <Link
            href="/admin/leads"
            className="text-xs text-brand-400 hover:text-brand-300 font-semibold flex items-center gap-1"
          >
            Open Kanban Board →
          </Link>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="border-b border-slate-800 bg-slate-950/70 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="p-3.5">Case ID & Patient</th>
                <th className="p-3.5">Country</th>
                <th className="p-3.5">Procedure & Hospital</th>
                <th className="p-3.5">Stage</th>
                <th className="p-3.5">Quote Amount</th>
                <th className="p-3.5">Case Manager</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {leads.map((c) => (
                <tr key={c.id} className="hover:bg-slate-800/50 transition-colors">
                  <td className="p-3.5">
                    <div className="font-bold text-white">{c.patientName}</div>
                    <div className="text-[10px] text-slate-500 font-mono">{c.id} • {c.source}</div>
                  </td>
                  <td className="p-3.5">
                    <span className="font-medium text-slate-200">{c.country}</span>
                    <div className="text-[10px] text-slate-400">{c.phone}</div>
                  </td>
                  <td className="p-3.5">
                    <div className="font-semibold text-slate-200">{c.procedure}</div>
                    <div className="text-[10px] text-brand-400">{c.preferredHospital}</div>
                  </td>
                  <td className="p-3.5">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        c.stage === 'in_hospital'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : c.stage === 'visa_travel'
                          ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                          : c.stage === 'doctor_review'
                          ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {c.stage.replace('_', ' ').toUpperCase()}
                    </span>
                  </td>
                  <td className="p-3.5 font-bold text-white">
                    {formatINR(c.quoteAmountInr)}
                  </td>
                  <td className="p-3.5 text-slate-300">
                    {c.caseManager}
                  </td>
                  <td className="p-3.5 text-right">
                    <Link
                      href={`/admin/leads?case=${c.id}`}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-brand-400 hover:text-brand-300 bg-slate-800 hover:bg-slate-700 px-2.5 py-1 rounded-md transition-colors"
                    >
                      Manage <ArrowRight className="h-3 w-3" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ─── 3. TWO COLUMN OPERATIONAL QUEUES ───────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Pending Pricing & Tariff Approvals */}
        <Card className="bg-slate-900 border-slate-800 text-white">
          <CardContent className="p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-sm text-white flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-amber-400" />
                  Pricing & Tariff Change Approvals ({pricingRequests.filter((r) => r.status === 'pending_review').length})
                </h3>
                <p className="text-[11px] text-slate-400">
                  Mandatory audit step before prices update on public Pricing Explorer.
                </p>
              </div>
              <Link
                href="/admin/pricing"
                className="text-xs text-brand-400 hover:text-brand-300 font-semibold"
              >
                View History →
              </Link>
            </div>

            <div className="space-y-3">
              {pricingRequests.map((req) => (
                <div
                  key={req.id}
                  className="rounded-xl border border-slate-800 bg-slate-950 p-3.5 space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        {req.hospitalName}
                      </span>
                      <h4 className="text-xs font-bold text-white">{req.procedureName}</h4>
                    </div>

                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        req.status === 'approved'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : req.status === 'rejected'
                          ? 'bg-rose-500/20 text-rose-300'
                          : 'bg-amber-500/20 text-amber-300'
                      }`}
                    >
                      {req.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>

                  {/* Tariff Price Diff */}
                  <div className="flex items-center gap-2 text-xs bg-slate-900 p-2 rounded-lg font-mono">
                    <span className="text-slate-400 line-through">
                      {formatINR(req.currentMinInr)} – {formatINR(req.currentMaxInr)}
                    </span>
                    <span className="text-slate-500">→</span>
                    <span className="text-emerald-400 font-bold">
                      {formatINR(req.proposedMinInr)} – {formatINR(req.proposedMaxInr)}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-300 leading-snug">
                    <strong>Reason:</strong> {req.reason}
                  </p>

                  {req.status === 'pending_review' && (
                    <div className="flex items-center gap-2 pt-1">
                      <button
                        onClick={() => handleApprovePricing(req.id)}
                        className="flex-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-1.5 transition-colors"
                      >
                        ✓ Approve & Publish (v{req.version})
                      </button>
                      <button
                        onClick={() => handleRejectPricing(req.id)}
                        className="rounded-lg bg-slate-800 hover:bg-rose-900/50 text-rose-400 text-xs font-bold px-3 py-1.5 transition-colors"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Right: Disputes & Clinical Safety Net SLAs */}
        <Card className="bg-slate-900 border-slate-800 text-white">
          <CardContent className="p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-sm text-white flex items-center gap-2">
                  <ShieldAlert className="h-4 w-4 text-rose-400" />
                  Active Dispute & Escalation Safety Net ({disputes.length})
                </h3>
                <p className="text-[11px] text-slate-400">
                  Strict SLA countdown for billing disputes & second-opinion reviews.
                </p>
              </div>
              <Link
                href="/admin/disputes"
                className="text-xs text-brand-400 hover:text-brand-300 font-semibold"
              >
                Dispute Desk →
              </Link>
            </div>

            <div className="space-y-3">
              {disputes.map((disp) => (
                <div
                  key={disp.id}
                  className="rounded-xl border border-rose-900/40 bg-slate-950 p-3.5 space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-white">{disp.patientName}</span>
                        <span className="text-[10px] font-mono text-slate-400">({disp.bookingId})</span>
                      </div>
                      <p className="text-[11px] text-brand-400 font-medium">
                        {disp.hospitalName} • {disp.procedure}
                      </p>
                    </div>

                    <span className="text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {disp.slaHoursLeft}h left
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 bg-slate-900 p-2.5 rounded-lg leading-relaxed">
                    {disp.description}
                  </p>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                    <span>Owner: <strong>{disp.assignedManager}</strong></span>
                    <Link
                      href="/admin/disputes"
                      className="text-xs font-bold text-rose-400 hover:underline"
                    >
                      Resolve SLA Ticket →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ─── 4. OUTCOMES MODERATION QUEUE ──────────────────────────── */}
      <Card className="bg-slate-900 border-slate-800 text-white">
        <CardContent className="p-5 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <FileCheck className="h-4 w-4 text-emerald-400" />
                Verified Patient Outcomes & NPS Moderation Queue
              </h3>
              <p className="text-[11px] text-slate-400">
                All public reviews must be cryptographically authenticated against real hospital booking IDs.
              </p>
            </div>
            <Link
              href="/admin/outcomes"
              className="text-xs text-brand-400 hover:text-brand-300 font-semibold"
            >
              Survey Pipeline →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {moderationItems.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-slate-800 bg-slate-950 p-3.5 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">{item.patientName}</span>
                  <span className="text-[10px] font-semibold bg-emerald-950 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-md">
                    ✓ Booking Verified ({item.bookingId})
                  </span>
                </div>
                <div className="text-[11px] text-slate-400">
                  {item.hospitalName} • {item.surveyStage.replace('_', ' ')} follow-up • NPS: <strong>{item.npsScore}/10</strong>
                </div>
                <p className="text-xs text-slate-300 italic bg-slate-900 p-2 rounded-lg">
                  &ldquo;{item.patientFeedback}&rdquo;
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <button className="flex-1 py-1 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold transition-colors">
                    Approve for Public NPS
                  </button>
                  <button className="py-1 px-3 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-semibold transition-colors">
                    Flag Note
                  </button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
