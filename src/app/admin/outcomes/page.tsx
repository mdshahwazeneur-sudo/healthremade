'use client'

import React, { useState } from 'react'
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Search,
  Filter,
  Star,
  Building2,
} from 'lucide-react'
import { MOCK_MODERATION, type OutcomeModerationItem } from '@/data/adminData'
import { Button, Badge, Card, CardContent } from '@/components/ui/primitives'

export default function AdminOutcomesModerationPage() {
  const [items, setItems] = useState<OutcomeModerationItem[]>(MOCK_MODERATION)

  const handleApprove = (id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: 'published' as const } : item))
    )
  }

  const handleReject = (id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: 'rejected_flagged' as const } : item))
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
          <ShieldCheck className="h-6 w-6 text-emerald-400" />
          Verified Reviews & Outcomes Moderation
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Zero fake review tolerance: All published reviews and NPS scores are tied to confirmed hospital admission booking IDs.
        </p>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <Card key={item.id} className="bg-slate-900 border-slate-800 text-white">
            <CardContent className="p-5 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 border-b border-slate-800 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm text-white">{item.patientName}</h3>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 border border-emerald-500/30 px-2 py-0.5 rounded">
                      ✓ Confirmed Booking: {item.bookingId}
                    </span>
                  </div>
                  <p className="text-xs text-brand-400 mt-0.5">{item.hospitalName} • {item.procedure}</p>
                </div>

                <div className="text-right">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      item.status === 'published'
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : item.status === 'rejected_flagged'
                        ? 'bg-rose-500/20 text-rose-300'
                        : 'bg-amber-500/20 text-amber-300'
                    }`}
                  >
                    {item.status.replace('_', ' ').toUpperCase()}
                  </span>
                  <div className="text-[10px] text-slate-400 mt-1">Stage: {item.surveyStage.replace('_', ' ')} survey</div>
                </div>
              </div>

              {/* Feedback Body */}
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs space-y-2">
                <div className="flex items-center gap-2 text-amber-400 font-bold">
                  <span>NPS Score: {item.npsScore}/10</span>
                  <span>•</span>
                  <span>Overall Experience: {'⭐'.repeat(item.rating)}</span>
                </div>
                <p className="text-slate-300 leading-relaxed italic">
                  &ldquo;{item.patientFeedback}&rdquo;
                </p>
              </div>

              {item.status === 'pending_verification' && (
                <div className="flex items-center justify-end gap-3 pt-1">
                  <button
                    onClick={() => handleReject(item.id)}
                    className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-rose-950 text-rose-400 text-xs font-semibold transition-colors"
                  >
                    Flag / Reject
                  </button>
                  <button
                    onClick={() => handleApprove(item.id)}
                    className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors"
                  >
                    ✓ Verify & Publish to Public NPS
                  </button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
