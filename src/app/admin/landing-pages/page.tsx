'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Sparkles,
  Plus,
  CheckCircle2,
  Clock,
  ExternalLink,
  Edit3,
  AlertTriangle,
  RotateCcw,
  Eye,
  Globe2,
  Building2,
  DollarSign,
  TrendingUp,
  ShieldCheck,
  PowerOff,
  History,
  X,
  FileCheck,
  Send,
  MessageCircle,
} from 'lucide-react'
import { useAdminData } from '@/context/AdminDataContext'
import { HOSPITALS } from '@/data/hospitals'
import { type LandingPageRecord } from '@/data/landingPagesData'

const COUNTRIES = [
  'United Kingdom',
  'United Arab Emirates',
  'United States',
  'Saudi Arabia',
  'Nigeria',
  'Kenya',
  'Oman',
  'Kuwait',
  'Qatar',
  'Bangladesh',
  'Russia',
  'Uzbekistan',
  'Romania',
  'France',
  'Germany',
  'Canada',
  'Australia',
  'Tanzania',
  'Ghana',
]

const CATEGORIES = [
  'Cardiac Surgery',
  'Orthopaedics',
  'Organ Transplant',
  'Fertility & IVF',
  'Spine & Neurosurgery',
  'Oncology',
  'Bariatric Surgery',
  'Ophthalmology',
]

export default function AdminLandingPagesPipeline() {
  const {
    landingPages,
    addProcedureAndTriggerAi,
    approveAndPublishLandingPage,
    sendBackForEdits,
    updateLandingPageContent,
    unpublishLandingPage,
  } = useAdminData()

  const [activeTab, setActiveTab] = useState<'pending' | 'live' | 'new'>('pending')
  const [selectedLp, setSelectedLp] = useState<LandingPageRecord | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [successBanner, setSuccessBanner] = useState<string | null>(null)

  // Step 1 Form State
  const [procName, setProcName] = useState('')
  const [procCategory, setProcCategory] = useState(CATEGORIES[0])
  const [procPriceMin, setProcPriceMin] = useState<number>(3500)
  const [procPriceMax, setProcPriceMax] = useState<number>(5500)
  const [procCurrency, setProcCurrency] = useState('USD')
  const [procTargetCountry, setProcTargetCountry] = useState(COUNTRIES[0])
  const [procHospitals, setProcHospitals] = useState<string[]>([
    HOSPITALS[0].name,
    HOSPITALS[1].name,
  ])
  const [procTrustBlurb, setProcTrustBlurb] = useState(
    'Accredited department directors with 25+ years experience, JCI & NABH standards, and zero agent markups.'
  )

  // Step 4 Review & Feedback State
  const [feedbackNote, setFeedbackNote] = useState('')
  const [reviewerName, setReviewerName] = useState('Dr. Admin (Chief Medical Officer)')
  const [isRegenerating, setIsRegenerating] = useState(false)

  // Editable fields in inspector
  const [editHeadline, setEditHeadline] = useState('')
  const [editSubheadline, setEditSubheadline] = useState('')
  const [editBodyCopy, setEditBodyCopy] = useState('')
  const [editMetaTitle, setEditMetaTitle] = useState('')
  const [editMetaDescription, setEditMetaDescription] = useState('')
  const [editPriceMin, setEditPriceMin] = useState<number>(0)
  const [editPriceMax, setEditPriceMax] = useState<number>(0)

  const pendingPages = landingPages.filter((l) => l.status === 'pending_review')
  const livePages = landingPages.filter((l) => l.status === 'published')

  const handleOpenReview = (lp: LandingPageRecord) => {
    setSelectedLp(lp)
    setEditHeadline(lp.headline)
    setEditSubheadline(lp.subheadline)
    setEditBodyCopy(lp.bodyCopy)
    setEditMetaTitle(lp.metaTitle)
    setEditMetaDescription(lp.metaDescription)
    setEditPriceMin(lp.priceMin)
    setEditPriceMax(lp.priceMax)
    setFeedbackNote(lp.feedbackNote || '')
  }

  // Handle Step 1 Submit
  const handleCreateProcedure = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsGenerating(true)
    try {
      const generated = await addProcedureAndTriggerAi({
        name: procName,
        category: procCategory,
        priceMin: Number(procPriceMin),
        priceMax: Number(procPriceMax),
        currency: procCurrency,
        targetCountry: procTargetCountry,
        hospitalNames: procHospitals,
        trustBlurb: procTrustBlurb,
      })

      setIsGenerating(false)
      setSuccessBanner(`Procedure "${procName}" saved as draft and AI draft generated into Pending Review queue!`)
      setActiveTab('pending')
      handleOpenReview(generated)

      // Reset form
      setProcName('')
    } catch (err) {
      console.error(err)
      setIsGenerating(false)
    }
  }

  // Handle Step 4 Approve & Publish
  const handleApprove = (lpId: string) => {
    // Save any pending manual edits first
    updateLandingPageContent(lpId, {
      headline: editHeadline,
      subheadline: editSubheadline,
      bodyCopy: editBodyCopy,
      metaTitle: editMetaTitle,
      metaDescription: editMetaDescription,
      priceMin: editPriceMin,
      priceMax: editPriceMax,
    })

    approveAndPublishLandingPage(lpId, reviewerName, 'Human approval verified. Live page published.')
    setSuccessBanner(`Landing page approved & published! Now live at ${selectedLp?.slug}`)
    setSelectedLp(null)
    setActiveTab('live')
  }

  // Handle Step 4 Send Back for Edits
  const handleSendBack = async (lpId: string, regenerate = false) => {
    if (!feedbackNote.trim()) {
      alert('Please enter a note explaining what needs revision.')
      return
    }

    if (regenerate) {
      setIsRegenerating(true)
      await sendBackForEdits(lpId, reviewerName, feedbackNote, true)
      setIsRegenerating(false)
      setSuccessBanner(`Sent back and re-generated by Claude Sonnet with reviewer feedback note!`)
    } else {
      await sendBackForEdits(lpId, reviewerName, feedbackNote, false)
      setSuccessBanner(`Saved revision notes for "${selectedLp?.procedureName}".`)
    }

    // Refresh selected record
    const updated = landingPages.find((l) => l.id === lpId)
    if (updated) handleOpenReview(updated)
  }

  const toggleHospital = (hName: string) => {
    if (procHospitals.includes(hName)) {
      setProcHospitals(procHospitals.filter((h) => h !== hName))
    } else {
      setProcHospitals([...procHospitals, hName])
    }
  }

  return (
    <div className="space-y-6">
      {/* ─── Header ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-amber-400" />
              AI Landing Page Pipeline
            </h1>
            <span className="rounded-full bg-amber-400/20 text-amber-300 text-xs px-3 py-0.5 font-bold border border-amber-400/30">
              Human-in-the-Loop
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Automated Claude Sonnet copywriting engine strictly bound to verified hospital & pricing data.
            <strong> No page publishes without human approval.</strong>
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('pending')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              activeTab === 'pending'
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Clock className="h-3.5 w-3.5" />
            Pending Review
            {pendingPages.length > 0 && (
              <span className="ml-1 rounded-full bg-slate-950 text-amber-300 text-[10px] px-1.5 py-0.2 font-black">
                {pendingPages.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('live')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              activeTab === 'live'
                ? 'bg-emerald-500 text-slate-950 shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Globe2 className="h-3.5 w-3.5" />
            Live Pages ({livePages.length})
          </button>

          <button
            onClick={() => setActiveTab('new')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              activeTab === 'new'
                ? 'bg-teal-500 text-slate-950 shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Plus className="h-3.5 w-3.5" />
            Add Procedure
          </button>
        </div>
      </div>

      {/* Success Notification Banner */}
      {successBanner && (
        <div className="rounded-xl bg-emerald-950/80 border border-emerald-700/60 p-3.5 flex items-center justify-between text-emerald-200 text-xs animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>{successBanner}</span>
          </div>
          <button onClick={() => setSuccessBanner(null)} className="text-emerald-400 hover:text-white">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* ─── TAB 1: PENDING REVIEW QUEUE (STEP 3 & 4) ────────────────────── */}
      {activeTab === 'pending' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <span>Pending Review Queue</span>
              <span className="text-xs text-slate-500">({pendingPages.length} drafts awaiting review)</span>
            </h2>
            <button
              onClick={() => setActiveTab('new')}
              className="inline-flex items-center gap-1 text-xs font-bold text-amber-400 hover:text-amber-300"
            >
              <Plus className="h-3.5 w-3.5" /> Generate New Page
            </button>
          </div>

          {pendingPages.length === 0 ? (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-12 text-center">
              <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-400 mb-3" />
              <h3 className="text-base font-bold text-white">All Landing Pages Reviewed</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                There are no pending drafts. Click &quot;Add Procedure&quot; to create a new AI-generated campaign.
              </p>
              <button
                onClick={() => setActiveTab('new')}
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 px-4 py-2 text-xs font-bold transition-all shadow-md"
              >
                <Plus className="h-4 w-4" /> Create New Procedure
              </button>
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-slate-800 bg-slate-950/80 text-slate-400 uppercase font-semibold text-[10px] tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Procedure & Target</th>
                      <th className="py-3 px-4">AI Generated Headline</th>
                      <th className="py-3 px-4">Verified Price</th>
                      <th className="py-3 px-4">Generated At</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {pendingPages.map((lp) => (
                      <tr key={lp.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-white text-sm">{lp.procedureName}</div>
                          <div className="flex items-center gap-1.5 mt-0.5 text-slate-400">
                            <Globe2 className="h-3 w-3 text-amber-400" />
                            <span>{lp.targetCountry}</span>
                            <span>•</span>
                            <span className="text-slate-500">{lp.category}</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 max-w-md">
                          <p className="font-medium text-slate-200 line-clamp-2">{lp.headline}</p>
                          <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">{lp.subheadline}</p>
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className="font-bold text-emerald-400">
                            ${lp.priceMin.toLocaleString()} – ${lp.priceMax.toLocaleString()}
                          </span>
                          <div className="text-[10px] text-slate-500">{lp.currency}</div>
                        </td>
                        <td className="py-3.5 px-4 text-slate-400 whitespace-nowrap">
                          <div>{new Date(lp.generatedAt).toLocaleDateString()}</div>
                          <div className="text-[10px] text-slate-500">
                            {new Date(lp.generatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          <button
                            onClick={() => handleOpenReview(lp)}
                            className="inline-flex items-center gap-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 px-3 py-1.5 text-xs font-bold transition-all"
                          >
                            <Eye className="h-3.5 w-3.5" />
                            Review & Approve
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ─── TAB 2: LIVE PUBLISHED PAGES (STEP 5) ────────────────────────── */}
      {activeTab === 'live' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <span>Published Landing Pages</span>
              <span className="text-xs text-slate-500">({livePages.length} active live URLs)</span>
            </h2>
          </div>

          {livePages.length === 0 ? (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-12 text-center">
              <Globe2 className="mx-auto h-10 w-10 text-slate-500 mb-3" />
              <h3 className="text-base font-bold text-white">No Live Pages Published Yet</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                Approve drafts in the &quot;Pending Review&quot; queue to publish them to live URLs.
              </p>
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-slate-800 bg-slate-950/80 text-slate-400 uppercase font-semibold text-[10px] tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Live URL & Procedure</th>
                      <th className="py-3 px-4">Target Country</th>
                      <th className="py-3 px-4">Published At / Approved By</th>
                      <th className="py-3 px-4">Performance (Views / Leads / CVR)</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {livePages.map((lp) => (
                      <tr key={lp.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-white text-sm">{lp.procedureName}</div>
                          <Link
                            href={lp.slug}
                            target="_blank"
                            className="inline-flex items-center gap-1 text-teal-400 hover:text-teal-300 text-xs font-mono mt-0.5"
                          >
                            <span>{lp.slug}</span>
                            <ExternalLink className="h-3 w-3" />
                          </Link>
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <div className="flex items-center gap-1.5 font-medium text-slate-200">
                            <Globe2 className="h-3.5 w-3.5 text-brand-400" />
                            <span>{lp.targetCountry}</span>
                          </div>
                          <div className="text-[10px] text-slate-500">{lp.category}</div>
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap text-slate-400">
                          <div>{lp.publishedAt ? new Date(lp.publishedAt).toLocaleDateString() : 'N/A'}</div>
                          <div className="text-[10px] text-emerald-400 flex items-center gap-1">
                            <ShieldCheck className="h-3 w-3" />
                            <span>{lp.reviewedBy || 'Super Admin'}</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div>
                              <div className="font-bold text-white">{lp.analytics.views.toLocaleString()}</div>
                              <div className="text-[10px] text-slate-500">Views</div>
                            </div>
                            <div>
                              <div className="font-bold text-emerald-400">{lp.analytics.submissions}</div>
                              <div className="text-[10px] text-slate-500">Leads</div>
                            </div>
                            <div>
                              <div className="font-bold text-amber-400">{lp.analytics.conversionRate}%</div>
                              <div className="text-[10px] text-slate-500">CVR</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-right whitespace-nowrap space-x-2">
                          <button
                            onClick={() => handleOpenReview(lp)}
                            className="inline-flex items-center gap-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-1.5 text-xs font-semibold"
                          >
                            <Edit3 className="h-3.5 w-3.5" />
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Take "${lp.procedureName}" offline? The page will become inaccessible to users.`)) {
                                unpublishLandingPage(lp.id, reviewerName)
                                setSuccessBanner(`Page taken offline.`)
                              }
                            }}
                            className="inline-flex items-center gap-1 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 px-2.5 py-1.5 text-xs font-semibold"
                          >
                            <PowerOff className="h-3.5 w-3.5" />
                            Take offline
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ─── TAB 3: STEP 1 — ADMIN INPUT FORM (ADD PROCEDURE) ────────────── */}
      {activeTab === 'new' && (
        <div className="max-w-3xl mx-auto rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8 shadow-xl space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Plus className="h-5 w-5 text-amber-400" />
              Step 1: Add New Medical Procedure
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Provide verified procedure details and partner hospitals. On submit, Claude Sonnet automatically drafts high-converting copy into the Pending Review queue.
            </p>
          </div>

          <form onSubmit={handleCreateProcedure} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Procedure Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Minimally Invasive Robotic Cardiac Bypass (CABG)"
                value={procName}
                onChange={(e) => setProcName(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-sm text-white focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Medical Category *
                </label>
                <select
                  value={procCategory}
                  onChange={(e) => setProcCategory(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-white focus:border-amber-400 focus:outline-none"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Target Source Country *
                </label>
                <select
                  value={procTargetCountry}
                  onChange={(e) => setProcTargetCountry(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-white focus:border-amber-400 focus:outline-none"
                >
                  {COUNTRIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Minimum Price *
                </label>
                <input
                  type="number"
                  required
                  min={100}
                  value={procPriceMin}
                  onChange={(e) => setProcPriceMin(Number(e.target.value))}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-sm text-white focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Maximum Price *
                </label>
                <input
                  type="number"
                  required
                  min={100}
                  value={procPriceMax}
                  onChange={(e) => setProcPriceMax(Number(e.target.value))}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-sm text-white focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Currency *
                </label>
                <select
                  value={procCurrency}
                  onChange={(e) => setProcCurrency(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-white focus:border-amber-400 focus:outline-none"
                >
                  <option value="USD">USD ($)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="AED">AED (د.إ)</option>
                  <option value="INR">INR (₹)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Partner Hospitals Offering This Procedure (Accredited JCI / NABH) *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-slate-950 p-3 rounded-xl border border-slate-800 max-h-48 overflow-y-auto">
                {HOSPITALS.map((h) => {
                  const checked = procHospitals.includes(h.name)
                  return (
                    <label
                      key={h.id}
                      className={`flex items-center gap-2 p-2 rounded-lg text-xs cursor-pointer transition-colors ${
                        checked ? 'bg-amber-400/10 text-amber-300 border border-amber-400/30' : 'text-slate-400 hover:bg-slate-900'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleHospital(h.name)}
                        className="rounded accent-amber-400"
                      />
                      <span className="truncate">{h.name}</span>
                    </label>
                  )
                })}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Short Clinical Trust Blurb (Key Highlights / Accreditations) *
              </label>
              <textarea
                rows={2}
                required
                value={procTrustBlurb}
                onChange={(e) => setProcTrustBlurb(e.target.value)}
                placeholder="Senior surgeon experience, FDA implants, clinical success rate, zero broker markup..."
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-xs text-white focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setActiveTab('pending')}
                className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isGenerating || procHospitals.length === 0}
                className="inline-flex items-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 px-5 py-2.5 text-xs font-bold transition-all shadow-md disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <Sparkles className="h-4 w-4 animate-spin text-slate-950" />
                    Generating Claude Draft...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 text-slate-950" />
                    Save & Generate AI Draft
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ─── SIDE-BY-SIDE REVIEW & EDIT MODAL (STEP 3 & 4) ───────────────── */}
      {selectedLp && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-7xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-800 bg-slate-950 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white flex items-center gap-2">
                    <span>{selectedLp.procedureName}</span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                        selectedLp.status === 'published'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {selectedLp.status.replace('_', ' ')}
                    </span>
                  </h2>
                  <p className="text-xs text-slate-400">
                    Target: {selectedLp.targetCountry} • Price: ${selectedLp.priceMin.toLocaleString()} – ${selectedLp.priceMax.toLocaleString()} {selectedLp.currency}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedLp(null)}
                  className="rounded-xl p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Modal Body: Split Screen */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 flex-1 overflow-y-auto divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
              
              {/* Left Column (5 Cols): Editable Inspector */}
              <div className="lg:col-span-5 p-5 space-y-4 overflow-y-auto bg-slate-900/60 max-h-[70vh]">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                  <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Edit3 className="h-3.5 w-3.5" />
                    Review & Edit Copy
                  </h3>
                  <span className="text-[11px] text-slate-500">Claude Sonnet Copy</span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Headline
                  </label>
                  <input
                    type="text"
                    value={editHeadline}
                    onChange={(e) => setEditHeadline(e.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Subheadline
                  </label>
                  <textarea
                    rows={2}
                    value={editSubheadline}
                    onChange={(e) => setEditSubheadline(e.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Trust-Focused Body Copy
                  </label>
                  <textarea
                    rows={4}
                    value={editBodyCopy}
                    onChange={(e) => setEditBodyCopy(e.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-300 focus:border-amber-400 focus:outline-none leading-relaxed"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Min Price (${selectedLp.currency})
                    </label>
                    <input
                      type="number"
                      value={editPriceMin}
                      onChange={(e) => setEditPriceMin(Number(e.target.value))}
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Max Price (${selectedLp.currency})
                    </label>
                    <input
                      type="number"
                      value={editPriceMax}
                      onChange={(e) => setEditPriceMax(Number(e.target.value))}
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Meta Title (SEO)
                  </label>
                  <input
                    type="text"
                    value={editMetaTitle}
                    onChange={(e) => setEditMetaTitle(e.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs text-slate-300 focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Meta Description (SEO)
                  </label>
                  <textarea
                    rows={2}
                    value={editMetaDescription}
                    onChange={(e) => setEditMetaDescription(e.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs text-slate-300 focus:border-amber-400 focus:outline-none"
                  />
                </div>

                {/* Audit Trail & History */}
                <div className="pt-3 border-t border-slate-800 space-y-2">
                  <div className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
                    <History className="h-3.5 w-3.5" />
                    Audit Log
                  </div>
                  <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 space-y-1.5 text-[11px] max-h-28 overflow-y-auto">
                    {selectedLp.auditLog.map((log, idx) => (
                      <div key={idx} className="border-b border-slate-900 pb-1 last:border-0 last:pb-0">
                        <div className="flex items-center justify-between text-slate-300">
                          <span className="font-semibold text-amber-400">{log.action}</span>
                          <span className="text-[10px] text-slate-500">{new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                        <div className="text-slate-400">{log.user}</div>
                        {log.note && <div className="text-slate-500 italic mt-0.5">&quot;{log.note}&quot;</div>}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reviewer Note Input */}
                <div className="pt-2">
                  <label className="block text-xs font-semibold text-amber-300 mb-1">
                    Reviewer Notes / Revision Instructions
                  </label>
                  <textarea
                    rows={2}
                    value={feedbackNote}
                    onChange={(e) => setFeedbackNote(e.target.value)}
                    placeholder="Enter instructions for what needs revision before publishing..."
                    className="w-full rounded-xl border border-amber-500/30 bg-slate-950 px-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Right Column (7 Cols): Live Rendered Preview */}
              <div className="lg:col-span-7 p-6 overflow-y-auto bg-slate-100 text-slate-900 max-h-[70vh]">
                <div className="mb-3 flex items-center justify-between text-xs text-slate-500 border-b border-slate-200 pb-2">
                  <span className="font-bold flex items-center gap-1.5 text-slate-700">
                    <Eye className="h-4 w-4 text-brand-600" />
                    Live Render Preview ({selectedLp.procedureSlug})
                  </span>
                  <span className="font-mono text-[11px] bg-white px-2 py-0.5 rounded border border-slate-200">
                    {selectedLp.slug}
                  </span>
                </div>

                {/* Rendered Template */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
                  {/* Hero Box */}
                  <div className="text-center space-y-3 pb-6 border-b border-slate-100">
                    <div className="inline-flex items-center gap-1 rounded-full bg-emerald-100 text-emerald-800 text-xs px-3 py-0.5 font-bold">
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                      JCI & NABH Accredited Partner Network
                    </div>

                    <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                      {editHeadline || selectedLp.headline}
                    </h1>

                    <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
                      {editSubheadline || selectedLp.subheadline}
                    </p>

                    <div className="pt-2 inline-block bg-slate-50 border border-slate-200 rounded-xl px-4 py-2">
                      <div className="text-[10px] uppercase font-bold text-slate-500">Indicative Package Cost</div>
                      <div className="text-lg font-black text-emerald-600">
                        ${editPriceMin.toLocaleString()} – ${editPriceMax.toLocaleString()} {selectedLp.currency}
                      </div>
                    </div>
                  </div>

                  {/* Body & Trust */}
                  <div className="space-y-3 text-xs leading-relaxed text-slate-700">
                    <h3 className="font-bold text-sm text-slate-900">Why Patients Choose Our Partner Network:</h3>
                    <p>{editBodyCopy || selectedLp.bodyCopy}</p>
                  </div>

                  {/* Partner Hospitals */}
                  <div className="space-y-2">
                    <h4 className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                      <Building2 className="h-4 w-4 text-brand-600" />
                      Accredited Hospitals:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selectedLp.hospitalNames.map((hName) => (
                        <div key={hName} className="p-2.5 rounded-xl border border-slate-100 bg-slate-50 text-xs font-semibold text-slate-800 flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                          <span>{hName}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Lead Form Preview */}
                  <div className="bg-slate-900 text-white p-4 rounded-xl space-y-3">
                    <div className="text-xs font-bold text-white flex items-center justify-between">
                      <span>Request Free {selectedLp.procedureName} Package</span>
                      <span className="text-[10px] text-emerald-400">100% Free</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-slate-400 text-xs">
                      <div className="bg-slate-800/80 p-2 rounded-lg">Name: John Doe</div>
                      <div className="bg-slate-800/80 p-2 rounded-lg">Phone: {selectedLp.formConfig.countryCode} ...</div>
                    </div>
                    <button className="w-full py-2 bg-brand-600 text-white rounded-lg text-xs font-bold">
                      Get 3 Hospital Quotes
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer Actions (Step 4) */}
            <div className="px-6 py-4 border-t border-slate-800 bg-slate-950 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span>Reviewer:</span>
                <input
                  type="text"
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-xs text-white font-semibold"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                {/* Send Back for Edits */}
                <button
                  onClick={() => handleSendBack(selectedLp.id, false)}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3.5 py-2 text-xs font-bold transition-all"
                >
                  <Send className="h-3.5 w-3.5" />
                  Send back for edits
                </button>

                {/* Re-generate with AI & Note */}
                <button
                  onClick={() => handleSendBack(selectedLp.id, true)}
                  disabled={isRegenerating}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 px-3.5 py-2 text-xs font-bold transition-all disabled:opacity-50"
                >
                  <RotateCcw className={`h-3.5 w-3.5 ${isRegenerating ? 'animate-spin' : ''}`} />
                  Re-generate with Claude
                </button>

                {/* Approve & Publish */}
                <button
                  onClick={() => handleApprove(selectedLp.id)}
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-5 py-2 text-xs font-extrabold transition-all shadow-md"
                >
                  <FileCheck className="h-4 w-4" />
                  Approve and publish
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
