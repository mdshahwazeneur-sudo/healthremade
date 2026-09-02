'use client'

import React, { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import {
  DollarSign,
  Plus,
  History,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  X,
  Save,
} from 'lucide-react'
import { useAdminData } from '@/context/AdminDataContext'
import type { PricingChangeRequest } from '@/data/adminData'
import { Button, Badge, Card, CardContent } from '@/components/ui/primitives'
import { formatINR } from '@/lib/utils'

export default function AdminPricingManagementPage() {
  const { pricingRequests, addPricingRequest, updatePricingRequest } = useAdminData()
  const [activeTab, setActiveTab] = useState<'pending' | 'history'>('pending')

  // Modal State
  const [modalOpen, setModalOpen] = useState(false)
  const [hospitalName, setHospitalName] = useState('Medanta — The Medicity')
  const [procedureName, setProcedureName] = useState('Bypass Surgery (CABG / Off-Pump)')
  const [currentMinInr, setCurrentMinInr] = useState(320000)
  const [currentMaxInr, setCurrentMaxInr] = useState(480000)
  const [proposedMinInr, setProposedMinInr] = useState(340000)
  const [proposedMaxInr, setProposedMaxInr] = useState(495000)
  const [submittedBy, setSubmittedBy] = useState('Tariff Desk')
  const [reason, setReason] = useState('Annual revision in surgical consumables and ICU room tariffs.')
  const [itemizedChangesText, setItemizedChangesText] = useState('+ ₹20,000 OT baseline\n+ ₹15,000 deluxe room component')

  const handleApprove = (id: string) => {
    updatePricingRequest(id, { status: 'approved' })
  }

  const handleReject = (id: string) => {
    updatePricingRequest(id, { status: 'rejected' })
  }

  const handleCreateProposal = (e: React.FormEvent) => {
    e.preventDefault()

    const newReq: Omit<PricingChangeRequest, 'id'> = {
      hospitalName,
      procedureName,
      currentMinInr: Number(currentMinInr),
      currentMaxInr: Number(currentMaxInr),
      proposedMinInr: Number(proposedMinInr),
      proposedMaxInr: Number(proposedMaxInr),
      submittedBy,
      submittedAt: new Date().toISOString().split('T')[0],
      reason,
      status: 'pending_review',
      version: 2,
      itemizedChanges: itemizedChangesText.split('\n').filter(Boolean),
    }

    addPricingRequest(newReq)
    setModalOpen(false)
  }

  const pending = pricingRequests.filter((r) => r.status === 'pending_review')
  const history = pricingRequests.filter((r) => r.status !== 'pending_review')

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <DollarSign className="h-6 w-6 text-amber-400" />
            Pricing & Package Management (Version Audit)
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Itemized hospital package tariffs require a two-person clinical and administrative sign-off before going live to international patients.
          </p>
        </div>

        <Button
          variant="accent"
          size="sm"
          onClick={() => setModalOpen(true)}
          className="font-bold shadow-md bg-emerald-600 hover:bg-emerald-500 text-white"
        >
          <Plus className="h-3.5 w-3.5 mr-1" /> Create Tariff Proposal
        </Button>
      </div>

      {/* Audit Banner */}
      <div className="flex items-center gap-2.5 rounded-xl bg-amber-950/40 border border-amber-500/30 p-3.5 text-xs text-amber-200">
        <ShieldCheck className="h-4 w-4 text-amber-400 shrink-0" />
        <span>
          <strong>Patient-Facing Trust Governance:</strong> Every price modification stores immutable diff logs and author attribution to guarantee zero unexpected hospital billing surprises.
        </span>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('pending')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
            activeTab === 'pending'
              ? 'bg-brand-600 text-white'
              : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          Pending Review ({pending.length})
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
            activeTab === 'history'
              ? 'bg-brand-600 text-white'
              : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          Approval Audit History ({history.length})
        </button>
      </div>

      {/* Content */}
      <div className="space-y-4">
        {(activeTab === 'pending' ? pending : history).length === 0 ? (
          <div className="py-16 text-center text-slate-500 bg-slate-900 rounded-xl border border-slate-800">
            No tariff proposals in this tab.
          </div>
        ) : (
          (activeTab === 'pending' ? pending : history).map((req) => (
            <Card key={req.id} className="bg-slate-900 border-slate-800 text-white">
              <CardContent className="p-5 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400">{req.id} • Version {req.version}</span>
                    <h3 className="font-bold text-base text-white">{req.procedureName}</h3>
                    <div className="text-xs text-brand-400 font-semibold">{req.hospitalName}</div>
                  </div>

                  <div className="text-right">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        req.status === 'approved'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : req.status === 'rejected'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {req.status.replace('_', ' ').toUpperCase()}
                    </span>
                    <div className="text-[10px] text-slate-400 mt-0.5">Submitted: {req.submittedAt}</div>
                  </div>
                </div>

                {/* Price Diff Card */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Current Live Price (INR)</span>
                    <span className="text-sm font-semibold text-slate-300 line-through">
                      {formatINR(req.currentMinInr)} – {formatINR(req.currentMaxInr)}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-emerald-400 uppercase tracking-wider block font-bold">Proposed Tariff (INR)</span>
                    <span className="text-base font-extrabold text-emerald-400">
                      {formatINR(req.proposedMinInr)} – {formatINR(req.proposedMaxInr)}
                    </span>
                  </div>
                </div>

                {/* Rationale & Itemized Inclusions */}
                <div className="space-y-1.5 text-xs text-slate-300">
                  <p><strong>Clinical / Tariff Justification:</strong> {req.reason}</p>
                  <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800/80">
                    <span className="text-[11px] font-semibold text-slate-400 block mb-1">Itemized Modifications:</span>
                    <ul className="space-y-1 text-slate-300">
                      {req.itemizedChanges.map((item, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <span className="text-emerald-400 font-bold">•</span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Action Buttons if Pending */}
                {req.status === 'pending_review' && (
                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      onClick={() => handleReject(req.id)}
                      className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-rose-950 text-rose-400 text-xs font-bold transition-colors"
                    >
                      Reject Proposal
                    </button>
                    <button
                      onClick={() => handleApprove(req.id)}
                      className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors shadow-sm"
                    >
                      ✓ Authorize & Publish Tariff to Public Site
                    </button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* ─── CREATE TARIFF PROPOSAL MODAL ──────────────────────────── */}
      <Dialog.Root open={modalOpen} onOpenChange={setModalOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm animate-in fade-in" />
          <Dialog.Content className="fixed left-[50%] top-[50%] z-50 w-[95vw] max-w-xl max-h-[90vh] overflow-y-auto translate-x-[-50%] translate-y-[-50%] rounded-2xl bg-slate-900 text-white shadow-2xl border border-slate-800 p-5 sm:p-6 outline-none">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div>
                <Dialog.Title className="text-lg font-bold text-white">
                  Create Hospital Tariff Proposal
                </Dialog.Title>
                <p className="text-xs text-slate-400">
                  Submit a package price adjustment for clinical audit before public publishing.
                </p>
              </div>

              <Dialog.Close asChild>
                <button
                  type="button"
                  className="rounded-full p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </Dialog.Close>
            </div>

            <form onSubmit={handleCreateProposal} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Hospital Partner *</label>
                  <input
                    type="text"
                    required
                    value={hospitalName}
                    onChange={(e) => setHospitalName(e.target.value)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 p-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Procedure Name *</label>
                  <input
                    type="text"
                    required
                    value={procedureName}
                    onChange={(e) => setProcedureName(e.target.value)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 p-2 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 bg-slate-950 p-3 rounded-xl border border-slate-800">
                <div>
                  <label className="block text-slate-400 text-[11px] mb-1">Current Price Min (INR)</label>
                  <input
                    type="number"
                    value={currentMinInr}
                    onChange={(e) => setCurrentMinInr(Number(e.target.value))}
                    className="w-full rounded-lg border border-slate-700 bg-slate-900 p-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-[11px] mb-1">Current Price Max (INR)</label>
                  <input
                    type="number"
                    value={currentMaxInr}
                    onChange={(e) => setCurrentMaxInr(Number(e.target.value))}
                    className="w-full rounded-lg border border-slate-700 bg-slate-900 p-2 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 bg-slate-950 p-3 rounded-xl border border-slate-800">
                <div>
                  <label className="block text-emerald-400 font-semibold text-[11px] mb-1">Proposed Price Min (INR) *</label>
                  <input
                    type="number"
                    required
                    value={proposedMinInr}
                    onChange={(e) => setProposedMinInr(Number(e.target.value))}
                    className="w-full rounded-lg border border-slate-700 bg-slate-900 p-2 text-white font-bold text-emerald-400"
                  />
                </div>
                <div>
                  <label className="block text-emerald-400 font-semibold text-[11px] mb-1">Proposed Price Max (INR) *</label>
                  <input
                    type="number"
                    required
                    value={proposedMaxInr}
                    onChange={(e) => setProposedMaxInr(Number(e.target.value))}
                    className="w-full rounded-lg border border-slate-700 bg-slate-900 p-2 text-white font-bold text-emerald-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Reason for Tariff Adjustment *</label>
                <textarea
                  rows={2}
                  required
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 p-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Itemized Inclusions / Exclusions Diff (One per line)</label>
                <textarea
                  rows={2}
                  value={itemizedChangesText}
                  onChange={(e) => setItemizedChangesText(e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 p-2 text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1.5 shadow-md"
                >
                  <Save className="h-4 w-4" /> Submit for Audit
                </button>
              </div>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}
