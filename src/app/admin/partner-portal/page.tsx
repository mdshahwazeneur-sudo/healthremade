'use client'

import React, { useState } from 'react'
import {
  Building,
  Plus,
  CheckCircle2,
  XCircle,
  FileSpreadsheet,
  Clock,
  ExternalLink,
} from 'lucide-react'
import { Button, Badge, Card, CardContent } from '@/components/ui/primitives'

interface PartnerSubmission {
  id: string;
  hospitalName: string;
  submissionType: 'New Doctor Onboarding' | 'Package Tariff Update' | 'Accreditation Renewal' | 'Facility Upgrade';
  submittedBy: string;
  submittedAt: string;
  summary: string;
  status: 'pending' | 'approved' | 'rejected';
}

const MOCK_PARTNER_SUBMISSIONS: PartnerSubmission[] = [
  {
    id: "SUB-401",
    hospitalName: "Medanta — The Medicity",
    submissionType: "New Doctor Onboarding",
    submittedBy: "Dr. Ankit (Medanta International Desk)",
    submittedAt: "2026-08-29 16:30",
    summary: "Add Dr. Priya Bansal (Associate Director, Robotic Joint Replacement) to Medanta Orthopaedics roster.",
    status: "pending",
  },
  {
    id: "SUB-400",
    hospitalName: "Fortis Escorts Heart Institute",
    submissionType: "Facility Upgrade",
    submittedBy: "Rajeev Mehra (Fortis Corporate Desk)",
    submittedAt: "2026-08-28 10:15",
    summary: "Updated photos and technical specifications of new 4th Generation Hybrid Cardiac Cath Lab.",
    status: "pending",
  },
];

export default function AdminPartnerPortalPage() {
  const [submissions, setSubmissions] = useState(MOCK_PARTNER_SUBMISSIONS)

  const handleApprove = (id: string) => {
    setSubmissions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: 'approved' as const } : s))
    )
  }

  const handleReject = (id: string) => {
    setSubmissions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: 'rejected' as const } : s))
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
          <Building className="h-6 w-6 text-brand-400" />
          Partner Self-Service Submission Queue
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Hospital coordinators submit roster, pricing, and infrastructure updates for internal verification before going live.
        </p>
      </div>

      <div className="space-y-4">
        {submissions.map((sub) => (
          <Card key={sub.id} className="bg-slate-900 border-slate-800 text-white">
            <CardContent className="p-5 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 border-b border-slate-800 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">{sub.hospitalName}</span>
                    <span className="text-[10px] font-mono text-slate-400">({sub.id})</span>
                    <Badge variant="default" className="text-[10px] bg-slate-800 text-slate-300">
                      {sub.submissionType}
                    </Badge>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Submitted by: {sub.submittedBy} • {sub.submittedAt}</div>
                </div>

                <span
                  className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                    sub.status === 'approved'
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : sub.status === 'rejected'
                      ? 'bg-rose-500/20 text-rose-300'
                      : 'bg-amber-500/20 text-amber-300'
                  }`}
                >
                  {sub.status.toUpperCase()}
                </span>
              </div>

              <p className="text-xs text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800 leading-relaxed">
                {sub.summary}
              </p>

              {sub.status === 'pending' && (
                <div className="flex items-center justify-end gap-3 pt-1">
                  <button
                    onClick={() => handleReject(sub.id)}
                    className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-rose-950 text-rose-400 text-xs font-semibold transition-colors"
                  >
                    Reject Update
                  </button>
                  <button
                    onClick={() => handleApprove(sub.id)}
                    className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors"
                  >
                    ✓ Verify & Merge to Public Profile
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
