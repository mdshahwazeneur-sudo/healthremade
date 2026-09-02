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
  Stethoscope,
  TrendingUp,
  ShieldCheck,
  PowerOff,
  History,
  X,
  FileCheck,
  Send,
  Upload,
  FileText,
  HelpCircle,
  Calendar,
  AlertCircle,
  Search,
  Check,
} from 'lucide-react'
import { useAdminData } from '@/context/AdminDataContext'
import { type SeoBlogPost, type MedicalReviewer, type TopicPriority } from '@/data/blogPipelineData'
import { countNeedsSourceFlags } from '@/lib/blogAi'

const CATEGORIES = [
  'Cardiac Surgery',
  'Orthopaedics',
  'Organ Transplant',
  'Fertility & IVF',
  'Spine & Neurosurgery',
  'Oncology',
  'Medical Tourism Guide',
  'Pricing & Visas',
]

export default function AdminBlogPipelinePage() {
  const {
    doctors,
    seoBlogPosts,
    addBlogTopicAndGenerateDraft,
    bulkImportBlogTopics,
    approveAndPublishBlogPost,
    sendBackPostForEdits,
    updateBlogPostDraft,
    unpublishBlogPost,
    getNeedsRefreshPosts,
  } = useAdminData()

  const [activeTab, setActiveTab] = useState<'pending' | 'live' | 'refresh' | 'new'>('pending')
  const [selectedPost, setSelectedPost] = useState<SeoBlogPost | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isBulkImporting, setIsBulkImporting] = useState(false)
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  // Step 1: Single Topic Form State
  const [targetKeyword, setTargetKeyword] = useState('')
  const [workingTitle, setWorkingTitle] = useState('')
  const [category, setCategory] = useState(CATEGORIES[0])
  const [priority, setPriority] = useState<TopicPriority>('bottom_of_funnel_cost_comparison')
  const [relatedTags, setRelatedTags] = useState('Bypass Surgery, Heart Surgery, Delhi Hospital')

  // Step 1: Bulk CSV State
  const [csvText, setCsvText] = useState(
    `target_keyword,working_title,category,priority\nrobotic prostatectomy cost in india,Robotic Prostatectomy in India: Cost Comparison & Hospital Guide,Oncology,bottom_of_funnel_cost_comparison\nhip replacement recovery timeline,Total Hip Replacement: 8-Week Day-by-Day Recovery Guide,Orthopaedics,top_of_funnel_educational`
  )

  // Step 3 & 4: Review & Edit Inspector State
  const [editTitle, setEditTitle] = useState('')
  const [editBody, setEditBody] = useState('')
  const [editMetaTitle, setEditMetaTitle] = useState('')
  const [editMetaDescription, setEditMetaDescription] = useState('')
  const [editSelectedDoctorId, setEditSelectedDoctorId] = useState<string>('')
  const [confirmSourceResolved, setConfirmSourceResolved] = useState(false)
  const [reviewerFeedback, setReviewerFeedback] = useState('')
  const [isRegenerating, setIsRegenerating] = useState(false)

  const pendingPosts = seoBlogPosts.filter((p) => p.status === 'pending_review')
  const livePosts = seoBlogPosts.filter((p) => p.status === 'published')
  const refreshPosts = getNeedsRefreshPosts()

  // Open Edit Inspector
  const handleOpenReview = (post: SeoBlogPost) => {
    setSelectedPost(post)
    setEditTitle(post.title)
    setEditBody(post.bodyContent)
    setEditMetaTitle(post.metaTitle)
    setEditMetaDescription(post.metaDescription)
    setEditSelectedDoctorId(post.medicalReviewer?.doctorId || (doctors[0] ? doctors[0].id : ''))
    setConfirmSourceResolved(post.isNeedsSourceResolved)
    setReviewerFeedback('')
  }

  // Handle Step 1: Create Single Topic
  const handleCreateTopic = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsGenerating(true)
    try {
      const created = await addBlogTopicAndGenerateDraft({
        targetKeyword,
        workingTitle,
        category,
        priority,
        relatedProcedureTags: relatedTags.split(',').map((t) => t.trim()),
      })

      setIsGenerating(false)
      setNotification({
        type: 'success',
        message: `Topic "${targetKeyword}" queued and Claude Sonnet draft generated in Pending Review!`,
      })
      setActiveTab('pending')
      handleOpenReview(created)

      // Reset
      setTargetKeyword('')
      setWorkingTitle('')
    } catch (err) {
      console.error(err)
      setIsGenerating(false)
      setNotification({ type: 'error', message: 'Failed to generate AI draft.' })
    }
  }

  // Handle Step 1: Bulk CSV Import
  const handleBulkImport = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsBulkImporting(true)
    try {
      const lines = csvText.trim().split('\n')
      const itemsToImport: any[] = []

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim()
        if (!line || line.startsWith('target_keyword')) continue
        const parts = line.split(',')
        if (parts.length >= 2) {
          itemsToImport.push({
            targetKeyword: parts[0]?.trim() || 'treatment cost',
            workingTitle: parts[1]?.trim() || '',
            category: parts[2]?.trim() || CATEGORIES[0],
            priority: (parts[3]?.trim() as TopicPriority) || 'bottom_of_funnel_cost_comparison',
            relatedProcedureTags: [parts[2]?.trim() || 'Medical Treatment'],
          })
        }
      }

      if (itemsToImport.length === 0) {
        alert('No valid CSV rows found.')
        setIsBulkImporting(false)
        return
      }

      const count = await bulkImportBlogTopics(itemsToImport)
      setIsBulkImporting(false)
      setNotification({
        type: 'success',
        message: `Successfully bulk imported and generated drafts for ${count} SEO blog topics!`,
      })
      setActiveTab('pending')
    } catch (err) {
      console.error(err)
      setIsBulkImporting(false)
    }
  }

  // Live calculation of [NEEDS SOURCE] flags in editor
  const currentSourceFlags = countNeedsSourceFlags(editBody)

  // Handle Step 4: Approve and Publish
  const handleApprove = (postId: string) => {
    const chosenDoctor = doctors.find((d) => d.id === editSelectedDoctorId)
    if (!chosenDoctor) {
      setNotification({
        type: 'error',
        message: 'BLOCKED: Please select a named Medical Doctor Reviewer from the dropdown.',
      })
      return
    }

    if (currentSourceFlags > 0) {
      setNotification({
        type: 'error',
        message: `BLOCKED: Cannot publish with ${currentSourceFlags} unresolved [NEEDS SOURCE] flag(s) in body copy. Please replace or verify all flagged statistics.`,
      })
      return
    }

    if (!confirmSourceResolved) {
      setNotification({
        type: 'error',
        message: 'BLOCKED: You must check the confirmation box verifying that all clinical claims are verified.',
      })
      return
    }

    // Save current content edits first
    updateBlogPostDraft(postId, {
      title: editTitle,
      bodyContent: editBody,
      metaTitle: editMetaTitle,
      metaDescription: editMetaDescription,
    })

    const reviewer: MedicalReviewer = {
      doctorId: chosenDoctor.id,
      name: chosenDoctor.name,
      designation: chosenDoctor.designation,
      qualifications: chosenDoctor.qualifications,
      hospitalName: chosenDoctor.hospitalName,
      photoUrl: chosenDoctor.photoUrl,
    }

    const result = approveAndPublishBlogPost(postId, reviewer)
    if (!result.success) {
      setNotification({ type: 'error', message: result.error || 'Failed to approve.' })
    } else {
      setNotification({
        type: 'success',
        message: `Article approved by ${chosenDoctor.name} and published live! Structured Article & FAQ schemas generated.`,
      })
      setSelectedPost(null)
      setActiveTab('live')
    }
  }

  // Handle Step 4: Send Back for Edits
  const handleSendBack = async (postId: string, regenerate = false) => {
    if (!reviewerFeedback.trim()) {
      alert('Please enter a note for what needs revision.')
      return
    }

    if (regenerate) {
      setIsRegenerating(true)
      await sendBackPostForEdits(postId, 'Editorial Admin', reviewerFeedback, true)
      setIsRegenerating(false)
      setNotification({
        type: 'success',
        message: 'Re-generated fresh draft with Claude Sonnet and appended revision note.',
      })
    } else {
      await sendBackPostForEdits(postId, 'Editorial Admin', reviewerFeedback, false)
      setNotification({
        type: 'success',
        message: 'Revision feedback saved in post audit log.',
      })
    }

    const updated = seoBlogPosts.find((p) => p.id === postId)
    if (updated) handleOpenReview(updated)
  }

  return (
    <div className="space-y-6">
      {/* ─── Header ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <FileText className="h-6 w-6 text-teal-400" />
              AI SEO Blog Publishing Pipeline
            </h1>
            <span className="rounded-full bg-teal-400/20 text-teal-300 text-xs px-3 py-0.5 font-bold border border-teal-400/30">
              Named Medical Review Required
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Automated Claude Sonnet SEO medical guide generator. <strong>Zero unverified claims permitted.</strong> Every post must be reviewed by a named doctor before publication.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-xl border border-slate-800 flex-wrap">
          <button
            onClick={() => setActiveTab('pending')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              activeTab === 'pending'
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Clock className="h-3.5 w-3.5" />
            Pending Posts
            {pendingPosts.length > 0 && (
              <span className="ml-1 rounded-full bg-slate-950 text-amber-300 text-[10px] px-1.5 py-0.2 font-black">
                {pendingPosts.length}
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
            Live Posts ({livePosts.length})
          </button>

          <button
            onClick={() => setActiveTab('refresh')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              activeTab === 'refresh'
                ? 'bg-rose-500 text-slate-950 shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <AlertTriangle className="h-3.5 w-3.5" />
            Needs Refresh ({refreshPosts.length})
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
            Add Topic / CSV
          </button>
        </div>
      </div>

      {/* Notification Banner */}
      {notification && (
        <div
          className={`rounded-xl p-3.5 flex items-center justify-between text-xs animate-in fade-in ${
            notification.type === 'error'
              ? 'bg-rose-950/80 border border-rose-700/60 text-rose-200'
              : 'bg-emerald-950/80 border border-emerald-700/60 text-emerald-200'
          }`}
        >
          <div className="flex items-center gap-2">
            {notification.type === 'error' ? (
              <AlertCircle className="h-4 w-4 text-rose-400 shrink-0" />
            ) : (
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
            )}
            <span>{notification.message}</span>
          </div>
          <button onClick={() => setNotification(null)} className="hover:text-white">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* ─── TAB 1: PENDING POSTS QUEUE (STEP 3) ─────────────────────────── */}
      {activeTab === 'pending' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <span>Pending Review Queue</span>
              <span className="text-xs text-slate-500">({pendingPosts.length} drafts awaiting medical review)</span>
            </h2>
            <button
              onClick={() => setActiveTab('new')}
              className="inline-flex items-center gap-1 text-xs font-bold text-teal-400 hover:text-teal-300"
            >
              <Plus className="h-3.5 w-3.5" /> Add New Topic
            </button>
          </div>

          {pendingPosts.length === 0 ? (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-12 text-center">
              <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-400 mb-3" />
              <h3 className="text-base font-bold text-white">All Blog Drafts Reviewed</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                No articles are awaiting medical review. Add new topics or bulk import keywords to generate drafts.
              </p>
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-slate-800 bg-slate-950/80 text-slate-400 uppercase font-semibold text-[10px] tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Article Title & Target Keyword</th>
                      <th className="py-3 px-4">Category & Funnel</th>
                      <th className="py-3 px-4">Verification Flags</th>
                      <th className="py-3 px-4">Drafted At</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {pendingPosts.map((post) => {
                      const hasFlags = post.needsSourceCount > 0
                      return (
                        <tr
                          key={post.id}
                          className={`transition-colors ${
                            hasFlags ? 'bg-amber-950/15 hover:bg-amber-950/25' : 'hover:bg-slate-800/40'
                          }`}
                        >
                          <td className="py-3.5 px-4 max-w-md">
                            <div className="font-bold text-white text-sm line-clamp-1">{post.title}</div>
                            <div className="text-[11px] text-teal-400/90 font-mono mt-0.5">
                              Keyword: &quot;{post.targetKeyword}&quot;
                            </div>
                          </td>

                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <div className="font-medium text-slate-300">{post.category}</div>
                            <div className="text-[10px] text-slate-500 uppercase">
                              {post.priority === 'top_of_funnel_educational' ? 'Educational Guide' : 'Cost Comparison'}
                            </div>
                          </td>

                          <td className="py-3.5 px-4 whitespace-nowrap">
                            {hasFlags ? (
                              <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2.5 py-0.5 text-[11px] font-bold animate-pulse">
                                <AlertTriangle className="h-3 w-3 text-amber-400" />
                                {post.needsSourceCount} [NEEDS SOURCE] Flag{post.needsSourceCount > 1 ? 's' : ''}
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 text-[11px] font-semibold">
                                <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                                No Unresolved Flags
                              </span>
                            )}
                          </td>

                          <td className="py-3.5 px-4 text-slate-400 whitespace-nowrap">
                            <div>{new Date(post.generatedAt).toLocaleDateString()}</div>
                            <div className="text-[10px] text-slate-500">
                              {new Date(post.generatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                          </td>

                          <td className="py-3.5 px-4 text-right whitespace-nowrap">
                            <button
                              onClick={() => handleOpenReview(post)}
                              className="inline-flex items-center gap-1.5 rounded-lg bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 border border-teal-500/40 px-3 py-1.5 text-xs font-bold transition-all"
                            >
                              <Eye className="h-3.5 w-3.5" />
                              Review & Edit
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ─── TAB 2: LIVE PUBLISHED POSTS (STEP 5) ────────────────────────── */}
      {activeTab === 'live' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <span>Published Blog Articles</span>
              <span className="text-xs text-slate-500">({livePosts.length} live articles on dynamic sitemap)</span>
            </h2>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-slate-800 bg-slate-950/80 text-slate-400 uppercase font-semibold text-[10px] tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Live URL & Title</th>
                    <th className="py-3 px-4">Named Medical Reviewer</th>
                    <th className="py-3 px-4">Last Verified</th>
                    <th className="py-3 px-4">Google Indexing</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {livePosts.map((post) => (
                    <tr key={post.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3.5 px-4 max-w-md">
                        <div className="font-bold text-white text-sm">{post.title}</div>
                        <Link
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          className="inline-flex items-center gap-1 text-teal-400 hover:text-teal-300 text-xs font-mono mt-0.5"
                        >
                          <span>/blog/{post.slug}</span>
                          <ExternalLink className="h-3 w-3" />
                        </Link>
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="h-7 w-7 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-300 font-bold text-xs shrink-0">
                            Dr
                          </div>
                          <div>
                            <div className="font-bold text-emerald-400">{post.medicalReviewer?.name || 'Assigned Doctor'}</div>
                            <div className="text-[10px] text-slate-400">{post.medicalReviewer?.hospitalName}</div>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-slate-300 whitespace-nowrap">
                        <div>{post.lastReviewedDate || 'Recently'}</div>
                        <div className="text-[10px] text-slate-500">Verified tariff & claims</div>
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-bold">
                          <Check className="h-3 w-3" />
                          GSC Indexing Active
                        </span>
                        <div className="text-[10px] text-slate-500 mt-0.5">Auto in /sitemap.xml</div>
                      </td>

                      <td className="py-3.5 px-4 text-right whitespace-nowrap space-x-2">
                        <button
                          onClick={() => handleOpenReview(post)}
                          className="inline-flex items-center gap-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-1.5 text-xs font-semibold"
                        >
                          <Edit3 className="h-3.5 w-3.5" />
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Take "${post.title}" offline?`)) {
                              unpublishBlogPost(post.id, 'Admin Editor')
                              setNotification({ type: 'success', message: 'Article moved back to pending drafts.' })
                            }
                          }}
                          className="inline-flex items-center gap-1 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 px-2.5 py-1.5 text-xs font-semibold"
                        >
                          <PowerOff className="h-3.5 w-3.5" />
                          Unpublish
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ─── TAB 3: CONTENT REFRESH REMINDERS (STEP 6) ────────────────────── */}
      {activeTab === 'refresh' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-rose-400" />
                <span>Needs 6-Month Content Refresh</span>
                <span className="text-xs text-slate-500">({refreshPosts.length} posts require medical re-check)</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Articles older than 180 days are flagged to ensure hospital package tariffs, surgical techniques, and success rates remain medically accurate.
              </p>
            </div>
          </div>

          {refreshPosts.length === 0 ? (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-12 text-center">
              <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-400 mb-3" />
              <h3 className="text-base font-bold text-white">All Published Articles Up to Date</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                No articles are older than 6 months. Scheduled audits run automatically.
              </p>
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-slate-800 bg-slate-950/80 text-slate-400 uppercase font-semibold text-[10px] tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Article Title</th>
                      <th className="py-3 px-4">Last Reviewed Date</th>
                      <th className="py-3 px-4">Assigned Doctor</th>
                      <th className="py-3 px-4">Audit Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {refreshPosts.map((post) => (
                      <tr key={post.id} className="bg-rose-950/20 hover:bg-rose-950/30 transition-colors">
                        <td className="py-3.5 px-4 font-bold text-white">
                          <div>{post.title}</div>
                          <div className="text-[11px] text-teal-400 font-mono mt-0.5">/blog/{post.slug}</div>
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap text-rose-300 font-bold">
                          {post.lastReviewedDate}
                          <div className="text-[10px] text-slate-500 font-normal">Over 180 days ago</div>
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap text-slate-300 font-medium">
                          {post.medicalReviewer?.name || 'Reviewer'}
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 px-2.5 py-0.5 text-[11px] font-bold">
                            <AlertCircle className="h-3 w-3 text-rose-400" />
                            Tariff Refresh Required
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          <button
                            onClick={() => handleOpenReview(post)}
                            className="inline-flex items-center gap-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 border border-rose-500/40 px-3 py-1.5 text-xs font-bold transition-all"
                          >
                            <Edit3 className="h-3.5 w-3.5" />
                            Re-verify & Refresh
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

      {/* ─── TAB 4: ADD TOPIC & BULK CSV (STEP 1) ────────────────────────── */}
      {activeTab === 'new' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {/* Single Topic Creation */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl space-y-4">
            <div className="border-b border-slate-800 pb-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Plus className="h-4 w-4 text-teal-400" />
                Add Single Blog Topic
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Submitting creates a queued topic and triggers Claude Sonnet AI draft generation.
              </p>
            </div>

            <form onSubmit={handleCreateTopic} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Target SEO Keyword *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. coronary angioplasty cost in india"
                  value={targetKeyword}
                  onChange={(e) => setTargetKeyword(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-teal-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Working Title / Topic Idea (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Coronary Angioplasty in India: Complete Procedure & Package Guide"
                  value={workingTitle}
                  onChange={(e) => setWorkingTitle(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-teal-400 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Medical Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-teal-400 focus:outline-none"
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
                    Funnel Priority *
                  </label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as TopicPriority)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-teal-400 focus:outline-none"
                  >
                    <option value="bottom_of_funnel_cost_comparison">Bottom-of-Funnel (Cost & Comparison)</option>
                    <option value="top_of_funnel_educational">Top-of-Funnel (Educational & Recovery)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Related Procedure Tags (Comma-Separated)
                </label>
                <input
                  type="text"
                  value={relatedTags}
                  onChange={(e) => setRelatedTags(e.target.value)}
                  placeholder="Angioplasty, Stent, Cardiac"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-teal-400 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={isGenerating || !targetKeyword.trim()}
                  className="inline-flex items-center gap-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 px-4 py-2 text-xs font-bold transition-all shadow-md disabled:opacity-50"
                >
                  {isGenerating ? (
                    <>
                      <Sparkles className="h-4 w-4 animate-spin text-slate-950" />
                      Generating AI Draft...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 text-slate-950" />
                      Queue Topic & Generate Draft
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Bulk CSV Uploader */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl space-y-4">
            <div className="border-b border-slate-800 pb-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Upload className="h-4 w-4 text-amber-400" />
                Bulk Add Topics via CSV
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Paste raw CSV or upload keyword list to generate multiple articles in batch.
              </p>
            </div>

            <form onSubmit={handleBulkImport} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  CSV Data (target_keyword, working_title, category, priority)
                </label>
                <textarea
                  rows={8}
                  required
                  value={csvText}
                  onChange={(e) => setCsvText(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs font-mono text-slate-300 focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={isBulkImporting || !csvText.trim()}
                  className="inline-flex items-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 px-4 py-2 text-xs font-bold transition-all shadow-md disabled:opacity-50"
                >
                  {isBulkImporting ? (
                    <>
                      <Sparkles className="h-4 w-4 animate-spin text-slate-950" />
                      Batch Generating...
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4 text-slate-950" />
                      Bulk Import & Generate All
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── SIDE-BY-SIDE REVIEW & EDIT MODAL (STEP 3 & 4) ───────────────── */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-7xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-800 bg-slate-950 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-teal-400/20 border border-teal-400/40 flex items-center justify-center text-teal-300">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white flex items-center gap-2">
                    <span>{selectedPost.title}</span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                        selectedPost.status === 'published'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {selectedPost.status.replace('_', ' ')}
                    </span>
                  </h2>
                  <p className="text-xs text-slate-400">
                    Keyword: &quot;{selectedPost.targetKeyword}&quot; • Category: {selectedPost.category}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedPost(null)}
                className="rounded-xl p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body: Split Screen */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 flex-1 overflow-y-auto divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
              {/* Left Column (5 Cols): Editable Inspector */}
              <div className="lg:col-span-5 p-5 space-y-4 overflow-y-auto bg-slate-900/60 max-h-[70vh]">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                  <h3 className="text-xs font-bold text-teal-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Edit3 className="h-3.5 w-3.5" />
                    Review & Edit Body Copy
                  </h3>
                  {currentSourceFlags > 0 ? (
                    <span className="text-[11px] font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/30">
                      ⚠️ {currentSourceFlags} [NEEDS SOURCE] remaining
                    </span>
                  ) : (
                    <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/30">
                      ✓ Factual verification clean
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Article Title (H1)
                  </label>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-teal-400 focus:outline-none font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center justify-between">
                    <span>Body Content (Markdown)</span>
                    <span className="text-[10px] text-slate-500">Remove [NEEDS SOURCE] after verifying</span>
                  </label>
                  <textarea
                    rows={12}
                    value={editBody}
                    onChange={(e) => setEditBody(e.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-200 focus:border-teal-400 focus:outline-none font-mono leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Meta Title (SEO)
                  </label>
                  <input
                    type="text"
                    value={editMetaTitle}
                    onChange={(e) => setEditMetaTitle(e.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs text-slate-300 focus:border-teal-400 focus:outline-none"
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
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs text-slate-300 focus:border-teal-400 focus:outline-none"
                  />
                </div>

                {/* Named Medical Reviewer Dropdown (Required) */}
                <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <label className="block text-xs font-bold text-teal-300 flex items-center gap-1.5">
                    <Stethoscope className="h-3.5 w-3.5" />
                    Assign Named Medical Reviewer (Required for Publication) *
                  </label>
                  <select
                    value={editSelectedDoctorId}
                    onChange={(e) => setEditSelectedDoctorId(e.target.value)}
                    className="w-full rounded-xl border border-teal-500/40 bg-slate-900 px-3 py-2 text-xs text-white focus:border-teal-400 focus:outline-none font-semibold"
                  >
                    <option value="">-- Select Registered Doctor Reviewer --</option>
                    {doctors.map((doc) => (
                      <option key={doc.id} value={doc.id}>
                        {doc.name} — {doc.designation} ({doc.hospitalName})
                      </option>
                    ))}
                  </select>

                  {/* Confirmation Checkbox */}
                  <label className="flex items-start gap-2 pt-2 text-xs text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={confirmSourceResolved}
                      onChange={(e) => setConfirmSourceResolved(e.target.checked)}
                      className="mt-0.5 rounded accent-teal-400"
                    />
                    <span>
                      I confirm that all clinical claims, tariffs, and <strong>[NEEDS SOURCE]</strong> flags have been medically checked and verified.
                    </span>
                  </label>
                </div>

                {/* Reviewer Feedback / Revision Note */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Reviewer Notes / Feedback
                  </label>
                  <textarea
                    rows={2}
                    value={reviewerFeedback}
                    onChange={(e) => setReviewerFeedback(e.target.value)}
                    placeholder="Enter instructions for what needs updating..."
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-teal-400 focus:outline-none"
                  />
                </div>

                {/* Audit History */}
                <div className="pt-2 border-t border-slate-800 space-y-1.5">
                  <div className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
                    <History className="h-3.5 w-3.5" />
                    Audit Trail
                  </div>
                  <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 space-y-1 text-[11px] max-h-24 overflow-y-auto">
                    {selectedPost.auditLog.map((log, idx) => (
                      <div key={idx} className="border-b border-slate-900 pb-1 last:border-0 last:pb-0">
                        <div className="flex items-center justify-between text-slate-300">
                          <span className="font-semibold text-teal-400">{log.action}</span>
                          <span className="text-[10px] text-slate-500">
                            {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <div className="text-slate-400">{log.user}</div>
                        {log.note && <div className="text-slate-500 italic">&quot;{log.note}&quot;</div>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column (7 Cols): Live Render Preview */}
              <div className="lg:col-span-7 p-6 overflow-y-auto bg-white text-slate-900 max-h-[70vh]">
                <div className="mb-4 flex items-center justify-between text-xs text-slate-500 border-b border-slate-200 pb-2">
                  <span className="font-bold flex items-center gap-1.5 text-slate-700">
                    <Eye className="h-4 w-4 text-brand-600" />
                    Live Render Preview
                  </span>
                  <span className="font-mono text-[11px] bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                    /blog/{selectedPost.slug}
                  </span>
                </div>

                {/* Article Header Preview */}
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 text-brand-700 text-xs px-3 py-0.5 font-bold border border-brand-200">
                    {selectedPost.category}
                  </div>

                  <h1 className="text-2xl font-black text-slate-900 leading-tight">
                    {editTitle || selectedPost.title}
                  </h1>

                  {/* Medical Reviewer Byline Card */}
                  {(() => {
                    const doc = doctors.find((d) => d.id === editSelectedDoctorId) || selectedPost.medicalReviewer
                    if (doc) {
                      return (
                        <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-200">
                          <div className="h-11 w-11 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0 shadow-sm">
                            <Stethoscope className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-bold text-emerald-900">Medically Reviewed by</span>
                              <span className="text-xs font-black text-slate-900">{doc.name}</span>
                              <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                            </div>
                            <div className="text-[11px] text-slate-600">
                              {doc.designation} • {doc.hospitalName}
                            </div>
                            <div className="text-[10px] text-slate-500 mt-0.5">
                              Verified on {new Date().toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      )
                    }
                    return (
                      <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />
                        <span>No Medical Reviewer assigned yet. (Approval blocked until doctor selected).</span>
                      </div>
                    )
                  })()}

                  {/* Formatted Body Content */}
                  <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed pt-2 border-t border-slate-100">
                    {editBody.split('\n\n').map((para, idx) => {
                      if (para.startsWith('## ')) {
                        return (
                          <h2 key={idx} className="text-base font-bold text-slate-900 pt-3 border-b border-slate-100 pb-1">
                            {para.replace('## ', '')}
                          </h2>
                        )
                      }
                      if (para.startsWith('### ')) {
                        return (
                          <h3 key={idx} className="text-sm font-bold text-slate-800 pt-2">
                            {para.replace('### ', '')}
                          </h3>
                        )
                      }
                      if (para.includes('[NEEDS SOURCE]')) {
                        return (
                          <div key={idx} className="p-3 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs my-2 flex items-start gap-2">
                            <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                            <div>
                              <strong className="font-bold">[NEEDS SOURCE]:</strong> {para.replace(/\[NEEDS SOURCE\]/g, '')}
                              <div className="text-[10px] text-amber-700 mt-1 font-semibold">
                                ⚠️ Clinical claim requires source citation before publishing.
                              </div>
                            </div>
                          </div>
                        )
                      }
                      return <p key={idx}>{para}</p>
                    })}
                  </div>

                  {/* FAQ Accordion Preview */}
                  {selectedPost.faqItems && selectedPost.faqItems.length > 0 && (
                    <div className="pt-4 border-t border-slate-200 space-y-2">
                      <h4 className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                        <HelpCircle className="h-4 w-4 text-brand-600" />
                        Frequently Asked Questions (FAQ Schema Enabled)
                      </h4>
                      {selectedPost.faqItems.map((faq, fIdx) => (
                        <div key={fIdx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                          <div className="font-bold text-slate-900">{faq.question}</div>
                          <div className="text-slate-600 mt-1">{faq.answer}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Footer Actions (Step 4) */}
            <div className="px-6 py-4 border-t border-slate-800 bg-slate-950 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                {currentSourceFlags > 0 ? (
                  <span className="text-rose-400 font-bold flex items-center gap-1">
                    <AlertCircle className="h-3.5 w-3.5" /> {currentSourceFlags} unresolved [NEEDS SOURCE] flag(s)
                  </span>
                ) : (
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Ready for named doctor sign-off
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                {/* Send Back for Edits */}
                <button
                  onClick={() => handleSendBack(selectedPost.id, false)}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3.5 py-2 text-xs font-bold transition-all"
                >
                  <Send className="h-3.5 w-3.5" />
                  Send back for edits
                </button>

                {/* Re-generate with AI */}
                <button
                  onClick={() => handleSendBack(selectedPost.id, true)}
                  disabled={isRegenerating}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 border border-teal-500/40 px-3.5 py-2 text-xs font-bold transition-all disabled:opacity-50"
                >
                  <RotateCcw className={`h-3.5 w-3.5 ${isRegenerating ? 'animate-spin' : ''}`} />
                  Re-generate with Claude
                </button>

                {/* Approve & Publish */}
                <button
                  onClick={() => handleApprove(selectedPost.id)}
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
