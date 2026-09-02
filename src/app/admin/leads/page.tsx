'use client'

import React, { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import {
  Users2,
  Search,
  Plus,
  ArrowRight,
  MessageCircle,
  Clock,
  CheckCircle2,
  Send,
  UserCheck,
  X,
  Save,
  Trash2,
} from 'lucide-react'
import { useAdminData } from '@/context/AdminDataContext'
import type { LeadCase } from '@/data/adminData'
import { Button, Badge, Card, CardContent } from '@/components/ui/primitives'
import { formatINR } from '@/lib/utils'

const STAGES = [
  { id: 'all', label: 'All Stages' },
  { id: 'inquiry', label: '1. New Inquiry' },
  { id: 'quote_sent', label: '2. Quote Sent' },
  { id: 'doctor_review', label: '3. Doctor Review' },
  { id: 'booking_confirmed', label: '4. Booking Confirmed' },
  { id: 'visa_travel', label: '5. Visa & Travel' },
  { id: 'in_hospital', label: '6. In Hospital' },
  { id: 'post_op', label: '7. Post-Op Followup' },
]

export default function LeadsCRMPage() {
  const { leads, addLead, updateLead, deleteLead } = useAdminData()
  const [selectedStage, setSelectedStage] = useState('all')
  const [selectedCaseId, setSelectedCaseId] = useState<string>(leads[0]?.id || '')
  const [searchQuery, setSearchQuery] = useState('')
  const [newNoteText, setNewNoteText] = useState('')

  // Create Case Modal
  const [modalOpen, setModalOpen] = useState(false)
  const [patientName, setPatientName] = useState('')
  const [country, setCountry] = useState('United Arab Emirates')
  const [phone, setPhone] = useState('+971 50 123 4567')
  const [procedure, setProcedure] = useState('Bypass Surgery (CABG / Off-Pump)')
  const [preferredHospital, setPreferredHospital] = useState('Medanta — The Medicity')
  const [caseManager, setCaseManager] = useState('Rohan Varma')
  const [quoteAmountInr, setQuoteAmountInr] = useState(360000)
  const [source, setSource] = useState<LeadCase['source']>('Google Ads')
  const [priority, setPriority] = useState<LeadCase['priority']>('high')
  const [initialNote, setInitialNote] = useState('New patient inquiry received.')

  const selectedCase = leads.find((l) => l.id === selectedCaseId) || leads[0]

  const filtered = leads.filter((lead) => {
    const matchesStage = selectedStage === 'all' || lead.stage === selectedStage
    const matchesSearch =
      searchQuery === '' ||
      lead.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.procedure.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStage && matchesSearch
  })

  const handleStageChange = (caseId: string, newStage: LeadCase['stage']) => {
    updateLead(caseId, { stage: newStage })
  }

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newNoteText.trim() || !selectedCase) return

    const newActivity = {
      date: 'Just now',
      action: 'Case Note Added',
      user: 'Dr. Vikram Seth',
      details: newNoteText,
    }

    updateLead(selectedCase.id, {
      notesCount: selectedCase.notesCount + 1,
      activityHistory: [newActivity, ...selectedCase.activityHistory],
    })
    setNewNoteText('')
  }

  const handleCreateCase = (e: React.FormEvent) => {
    e.preventDefault()

    const newLeadData: Omit<LeadCase, 'id'> = {
      patientName,
      country,
      countryCode: phone.split(' ')[0] || '+1',
      phone,
      procedure,
      preferredHospital,
      preferredCity: 'Delhi NCR',
      caseManager,
      stage: 'inquiry',
      quoteAmountInr: Number(quoteAmountInr),
      source,
      inquiryDate: new Date().toISOString().split('T')[0],
      lastActivity: 'Just now',
      notesCount: 1,
      priority,
      activityHistory: [
        {
          date: 'Just now',
          action: 'Inquiry Created',
          user: caseManager,
          details: initialNote || 'Case registered into healthremade CRM.',
        },
      ],
    }

    addLead(newLeadData)
    setModalOpen(false)
  }

  const handleDeleteCase = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete patient case: "${name}"?`)) {
      deleteLead(id)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Users2 className="h-6 w-6 text-brand-400" />
            Case & Lead Management CRM
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            End-to-end patient journey: medical report intake, quote dispatch, hospital admission, and post-discharge continuity.
          </p>
        </div>

        <Button
          variant="accent"
          size="sm"
          onClick={() => setModalOpen(true)}
          className="font-bold shadow-md bg-emerald-600 hover:bg-emerald-500 text-white"
        >
          <Plus className="h-3.5 w-3.5 mr-1" /> New Patient Case
        </Button>
      </div>

      {/* Stage Filters & Search */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900 p-3 rounded-xl border border-slate-800">
        <div className="relative flex-1 min-w-[240px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search patient, case ID, country..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-slate-800 bg-slate-950 pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {STAGES.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelectedStage(s.id)}
              className={`rounded-lg px-2.5 py-1 text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedStage === s.id
                  ? 'bg-brand-600 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main 2-Column Split: Pipeline List & Detail Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Cases Table / List */}
        <div className="lg:col-span-7 space-y-3">
          {filtered.length === 0 ? (
            <div className="py-16 text-center text-slate-500 bg-slate-900 rounded-xl border border-slate-800">
              No patient cases found. Click &quot;New Patient Case&quot; to add one.
            </div>
          ) : (
            filtered.map((c) => {
              const isSelected = selectedCase?.id === c.id

              return (
                <div
                  key={c.id}
                  onClick={() => setSelectedCaseId(c.id)}
                  className={`cursor-pointer rounded-xl border p-4 transition-all ${
                    isSelected
                      ? 'border-brand-500 bg-slate-900 shadow-md ring-1 ring-brand-500'
                      : 'border-slate-800 bg-slate-900/60 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-sm text-white">{c.patientName}</h3>
                        <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-1.5 py-0.5 rounded">
                          {c.id}
                        </span>
                        {c.priority === 'high' && (
                          <span className="text-[10px] font-bold bg-rose-500/20 text-rose-300 px-1.5 py-0.2 rounded">
                            HIGH
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-slate-300 mt-1 font-medium">
                        {c.procedure}
                      </p>

                      <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-1.5">
                        <span>🌍 {c.country}</span>
                        <span>🏥 {c.preferredHospital}</span>
                        <span>💰 {formatINR(c.quoteAmountInr)}</span>
                      </div>
                    </div>

                    <div className="text-right space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-950 text-brand-300 border border-brand-500/30">
                        {c.stage.replace('_', ' ')}
                      </span>
                      <div className="text-[10px] text-slate-500">
                        Manager: <span className="text-slate-300">{c.caseManager}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Right Column: Active Case Workspace & Activity Timeline */}
        {selectedCase && (
          <div className="lg:col-span-5 space-y-4">
            <Card className="bg-slate-900 border-slate-800 text-white sticky top-20">
              <CardContent className="p-5 space-y-5">
                {/* Header */}
                <div className="flex items-start justify-between border-b border-slate-800 pb-3">
                  <div>
                    <div className="text-[10px] font-mono text-brand-400">{selectedCase.id}</div>
                    <h2 className="text-lg font-bold text-white">{selectedCase.patientName}</h2>
                    <p className="text-xs text-slate-400">{selectedCase.phone} • {selectedCase.country}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={`https://wa.me/${selectedCase.phone.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-lg bg-[#25D366] text-white px-2.5 py-1.5 text-xs font-bold hover:bg-[#1EBE5D] transition-colors"
                    >
                      <MessageCircle className="h-3.5 w-3.5 fill-white" />
                      WhatsApp
                    </a>
                    <button
                      onClick={() => handleDeleteCase(selectedCase.id, selectedCase.patientName)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-950 text-slate-400 hover:text-rose-400"
                      title="Delete Case"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                {/* Stage Progression Selector */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Pipeline Progression Stage:
                  </label>
                  <select
                    value={selectedCase.stage}
                    onChange={(e) =>
                      handleStageChange(selectedCase.id, e.target.value as LeadCase['stage'])
                    }
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs font-bold text-brand-300 focus:outline-none focus:ring-1 focus:ring-brand-500"
                  >
                    <option value="inquiry">1. New Inquiry (Intake)</option>
                    <option value="quote_sent">2. Official Quote Sent</option>
                    <option value="doctor_review">3. Doctor Review & Clinical Opinion</option>
                    <option value="booking_confirmed">4. Booking Confirmed (Deposit Paid)</option>
                    <option value="visa_travel">5. Visa Letter & Travel Scheduled</option>
                    <option value="in_hospital">6. In Hospital (Admitted)</option>
                    <option value="post_op">7. Post-Op Telemedicine Followup</option>
                  </select>
                </div>

                {/* Case Meta Grid */}
                <div className="grid grid-cols-2 gap-2 text-xs bg-slate-950 p-3 rounded-xl border border-slate-800/80">
                  <div>
                    <span className="text-[10px] text-slate-500 block">Procedure</span>
                    <span className="font-semibold text-slate-200">{selectedCase.procedure}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">Quote Value</span>
                    <span className="font-bold text-emerald-400">{formatINR(selectedCase.quoteAmountInr)}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">Hospital Partner</span>
                    <span className="font-semibold text-slate-200">{selectedCase.preferredHospital}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">Lead Source</span>
                    <span className="font-semibold text-brand-400">{selectedCase.source}</span>
                  </div>
                </div>

                {/* Activity & Clinical Notes Timeline */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-slate-400" />
                    Activity & Care Coordination Log
                  </h4>

                  <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                    {selectedCase.activityHistory.map((act, i) => (
                      <div
                        key={i}
                        className="rounded-lg border border-slate-800/60 bg-slate-950 p-2.5 text-xs space-y-1"
                      >
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="font-bold text-brand-400">{act.action}</span>
                          <span className="text-slate-500">{act.date}</span>
                        </div>
                        <p className="text-slate-300 leading-snug">{act.details}</p>
                        <div className="text-[9px] text-slate-500">By: {act.user}</div>
                      </div>
                    ))}
                  </div>

                  {/* Add Note Form */}
                  <form onSubmit={handleAddNote} className="flex gap-2 pt-1">
                    <input
                      type="text"
                      placeholder="Add case coordinator note or doctor remarks..."
                      value={newNoteText}
                      onChange={(e) => setNewNoteText(e.target.value)}
                      className="flex-1 rounded-lg border border-slate-800 bg-slate-950 px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                    />
                    <button
                      type="submit"
                      className="rounded-lg bg-brand-600 hover:bg-brand-500 text-white px-3 py-1.5 text-xs font-bold flex items-center gap-1 transition-colors"
                    >
                      <Send className="h-3 w-3" /> Post
                    </button>
                  </form>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* ─── NEW PATIENT CASE MODAL ─────────────────────────────────── */}
      <Dialog.Root open={modalOpen} onOpenChange={setModalOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm animate-in fade-in" />
          <Dialog.Content className="fixed left-[50%] top-[50%] z-50 w-[95vw] max-w-xl max-h-[90vh] overflow-y-auto translate-x-[-50%] translate-y-[-50%] rounded-2xl bg-slate-900 text-white shadow-2xl border border-slate-800 p-5 sm:p-6 outline-none">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div>
                <Dialog.Title className="text-lg font-bold text-white">
                  Add New Patient Case
                </Dialog.Title>
                <p className="text-xs text-slate-400">
                  Register a global patient into the clinical intake and quotation pipeline.
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

            <form onSubmit={handleCreateCase} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Patient Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tariq Al-Mansoor"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 p-2 text-white focus:outline-none focus:ring-1 focus:ring-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Country *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. United Arab Emirates"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 p-2 text-white focus:outline-none focus:ring-1 focus:ring-brand-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">WhatsApp / Phone Number *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. +971 50 123 4567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 p-2 text-white focus:outline-none focus:ring-1 focus:ring-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Quote Estimate (INR) *</label>
                  <input
                    type="number"
                    required
                    value={quoteAmountInr}
                    onChange={(e) => setQuoteAmountInr(Number(e.target.value))}
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 p-2 text-white focus:outline-none focus:ring-1 focus:ring-brand-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Procedure Required *</label>
                <input
                  type="text"
                  required
                  value={procedure}
                  onChange={(e) => setProcedure(e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 p-2 text-white focus:outline-none focus:ring-1 focus:ring-brand-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Preferred Hospital</label>
                  <input
                    type="text"
                    value={preferredHospital}
                    onChange={(e) => setPreferredHospital(e.target.value)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 p-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Assigned Manager</label>
                  <input
                    type="text"
                    value={caseManager}
                    onChange={(e) => setCaseManager(e.target.value)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 p-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Priority</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as LeadCase['priority'])}
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 p-2 text-white"
                  >
                    <option value="high">High Priority</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Initial Clinical Note / Inquiry Details</label>
                <textarea
                  rows={2}
                  value={initialNote}
                  onChange={(e) => setInitialNote(e.target.value)}
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
                  <Save className="h-4 w-4" /> Register Patient Case
                </button>
              </div>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}
