'use client'

import React, { useState } from 'react'
import {
  AlertTriangle,
  Clock,
  CheckCircle2,
  ShieldAlert,
  Send,
  Building2,
  FileText,
} from 'lucide-react'
import { MOCK_DISPUTES, type DisputeTicket } from '@/data/adminData'
import { Button, Badge, Card, CardContent } from '@/components/ui/primitives'

export default function AdminDisputesPage() {
  const [disputes, setDisputes] = useState<DisputeTicket[]>(MOCK_DISPUTES)
  const [selectedDispute, setSelectedDispute] = useState<DisputeTicket>(MOCK_DISPUTES[0])
  const [resolutionText, setResolutionText] = useState('')

  const handleResolve = (id: string) => {
    setDisputes((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: 'resolved' as const } : d))
    )
    if (selectedDispute.id === id) {
      setSelectedDispute((prev) => ({ ...prev, status: 'resolved' as const }))
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
          <AlertTriangle className="h-6 w-6 text-rose-400" />
          Dispute, Escalation & Clinical Safety Net Tracker
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Strict internal resolution workflows with ownership assignment, SLA countdowns, and second-opinion guarantees.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Dispute List */}
        <div className="lg:col-span-6 space-y-3">
          {disputes.map((disp) => {
            const isSelected = selectedDispute.id === disp.id

            return (
              <div
                key={disp.id}
                onClick={() => setSelectedDispute(disp)}
                className={`cursor-pointer rounded-xl border p-4 transition-all ${
                  isSelected
                    ? 'border-rose-500 bg-slate-900 shadow-md ring-1 ring-rose-500'
                    : 'border-slate-800 bg-slate-900/60 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-sm text-white">{disp.patientName}</h3>
                      <span className="text-[10px] font-mono text-slate-400">({disp.bookingId})</span>
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                          disp.severity === 'critical'
                            ? 'bg-rose-500/20 text-rose-300'
                            : 'bg-amber-500/20 text-amber-300'
                        }`}
                      >
                        {disp.severity.toUpperCase()}
                      </span>
                    </div>

                    <p className="text-xs text-brand-400 mt-0.5 font-medium">{disp.hospitalName} • {disp.procedure}</p>
                    <div className="text-[11px] text-slate-300 mt-1 font-semibold">Issue: {disp.issueType}</div>
                  </div>

                  <div className="text-right">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-rose-950 text-rose-300 border border-rose-500/30 px-2 py-0.5 rounded-full">
                      <Clock className="h-3 w-3" /> {disp.slaHoursLeft}h SLA
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Right: Resolution Workspace */}
        <div className="lg:col-span-6">
          <Card className="bg-slate-900 border-slate-800 text-white sticky top-20">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-start justify-between border-b border-slate-800 pb-3">
                <div>
                  <span className="text-[10px] font-mono text-slate-400">{selectedDispute.id}</span>
                  <h2 className="text-lg font-bold text-white">{selectedDispute.issueType}</h2>
                  <p className="text-xs text-slate-400">
                    Patient: {selectedDispute.patientName} • Hospital: {selectedDispute.hospitalName}
                  </p>
                </div>

                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                    selectedDispute.status === 'resolved'
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : 'bg-rose-500/20 text-rose-300'
                  }`}
                >
                  {selectedDispute.status.replace('_', ' ').toUpperCase()}
                </span>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Description of Dispute:</span>
                <p className="text-slate-200 leading-relaxed">{selectedDispute.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs bg-slate-950 p-3 rounded-xl border border-slate-800">
                <div>
                  <span className="text-[10px] text-slate-500 block">Case Owner</span>
                  <span className="font-semibold text-slate-200">{selectedDispute.assignedManager}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">SLA Target Resolution</span>
                  <span className="font-bold text-rose-400">{selectedDispute.slaDeadline}</span>
                </div>
              </div>

              {selectedDispute.status !== 'resolved' ? (
                <div className="space-y-3 pt-2">
                  <textarea
                    rows={3}
                    placeholder="Enter clinical second opinion findings or hospital tariff correction notes..."
                    value={resolutionText}
                    onChange={(e) => setResolutionText(e.target.value)}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                  />

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleResolve(selectedDispute.id)}
                      className="flex-1 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors"
                    >
                      ✓ Mark Resolved & Notify Patient
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-emerald-950/60 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 font-semibold flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" /> This dispute has been resolved within SLA guidelines.
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
