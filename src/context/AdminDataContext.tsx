'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { DOCTORS as INITIAL_DOCTORS, type Doctor } from '@/data/doctors'
import { HOSPITALS as INITIAL_HOSPITALS, type Hospital } from '@/data/hospitals'
import {
  MOCK_BLOG_POSTS as INITIAL_BLOG_POSTS,
  MOCK_LEADS as INITIAL_LEADS,
  MOCK_PRICING_REQUESTS as INITIAL_PRICING_REQUESTS,
  MOCK_DISPUTES as INITIAL_DISPUTES,
  MOCK_MODERATION as INITIAL_MODERATION,
  type BlogPost,
  type LeadCase,
  type PricingChangeRequest,
  type DisputeTicket,
  type OutcomeModerationItem,
} from '@/data/adminData'
import {
  INITIAL_PROCEDURES,
  INITIAL_LANDING_PAGES,
  type ProcedureRecord,
  type LandingPageRecord,
} from '@/data/landingPagesData'
import { generateLandingPageDraftWithClaude, slugify, getCountryDialCode } from '@/lib/landingPageAi'
import {
  INITIAL_BLOG_TOPICS,
  INITIAL_SEO_BLOG_POSTS,
  type BlogTopic,
  type SeoBlogPost,
  type MedicalReviewer,
} from '@/data/blogPipelineData'
import { generateSeoBlogDraftWithClaude, countNeedsSourceFlags } from '@/lib/blogAi'

interface AdminDataContextType {
  // Doctors
  doctors: Doctor[]
  addDoctor: (doc: Omit<Doctor, 'id'>) => void
  updateDoctor: (id: string, doc: Partial<Doctor>) => void
  deleteDoctor: (id: string) => void

  // Blog Posts (Legacy / Simple)
  blogPosts: BlogPost[]
  addBlogPost: (post: Omit<BlogPost, 'id'>) => void
  updateBlogPost: (id: string, post: Partial<BlogPost>) => void
  deleteBlogPost: (id: string) => void

  // AI SEO Blog Pipeline
  blogTopics: BlogTopic[]
  seoBlogPosts: SeoBlogPost[]
  addBlogTopicAndGenerateDraft: (topic: Omit<BlogTopic, 'id' | 'status' | 'createdAt' | 'updatedAt'>) => Promise<SeoBlogPost>
  bulkImportBlogTopics: (topics: Array<Omit<BlogTopic, 'id' | 'status' | 'createdAt' | 'updatedAt'>>) => Promise<number>
  approveAndPublishBlogPost: (id: string, reviewer: MedicalReviewer, adminUser?: string) => { success: boolean; error?: string }
  sendBackPostForEdits: (id: string, adminUser: string, feedbackNote: string, requestRegenerate?: boolean) => Promise<void>
  updateBlogPostDraft: (id: string, content: Partial<SeoBlogPost>) => void
  unpublishBlogPost: (id: string, adminUser: string) => void
  getNeedsRefreshPosts: () => SeoBlogPost[]

  // Hospitals
  hospitals: Hospital[]
  addHospital: (hosp: Omit<Hospital, 'id'>) => void
  updateHospital: (id: string, hosp: Partial<Hospital>) => void
  deleteHospital: (id: string) => void

  // Leads
  leads: LeadCase[]
  addLead: (lead: Omit<LeadCase, 'id'>) => void
  updateLead: (id: string, lead: Partial<LeadCase>) => void
  deleteLead: (id: string) => void

  // Pricing Requests
  pricingRequests: PricingChangeRequest[]
  addPricingRequest: (req: Omit<PricingChangeRequest, 'id'>) => void
  updatePricingRequest: (id: string, req: Partial<PricingChangeRequest>) => void

  // Disputes
  disputes: DisputeTicket[]
  updateDispute: (id: string, disp: Partial<DisputeTicket>) => void

  // Moderation
  moderationItems: OutcomeModerationItem[]
  updateModerationItem: (id: string, item: Partial<OutcomeModerationItem>) => void

  // AI Landing Page Pipeline
  procedures: ProcedureRecord[]
  landingPages: LandingPageRecord[]
  addProcedureAndTriggerAi: (proc: Omit<ProcedureRecord, 'id' | 'status' | 'createdAt' | 'updatedAt'>) => Promise<LandingPageRecord>
  approveAndPublishLandingPage: (id: string, reviewerName: string, notes?: string) => void
  sendBackForEdits: (id: string, reviewerName: string, feedbackNote: string, requestRegenerate?: boolean) => Promise<void>
  updateLandingPageContent: (id: string, content: Partial<LandingPageRecord>) => void
  unpublishLandingPage: (id: string, reviewerName: string) => void
  recordLandingPageView: (slug: string) => void
  recordLandingPageSubmission: (slug: string) => void
}

const AdminDataContext = createContext<AdminDataContextType | undefined>(undefined)

export function AdminDataProvider({ children }: { children: React.ReactNode }) {
  // Initialize with localStorage or defaults
  const [doctors, setDoctors] = useState<Doctor[]>(INITIAL_DOCTORS)
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(INITIAL_BLOG_POSTS)
  const [hospitals, setHospitals] = useState<Hospital[]>(INITIAL_HOSPITALS)
  const [leads, setLeads] = useState<LeadCase[]>(INITIAL_LEADS)
  const [pricingRequests, setPricingRequests] = useState<PricingChangeRequest[]>(INITIAL_PRICING_REQUESTS)
  const [disputes, setDisputes] = useState<DisputeTicket[]>(INITIAL_DISPUTES)
  const [moderationItems, setModerationItems] = useState<OutcomeModerationItem[]>(INITIAL_MODERATION)

  // AI Pipeline State
  const [procedures, setProcedures] = useState<ProcedureRecord[]>(INITIAL_PROCEDURES)
  const [landingPages, setLandingPages] = useState<LandingPageRecord[]>(INITIAL_LANDING_PAGES)

  // AI SEO Blog Pipeline State
  const [blogTopics, setBlogTopics] = useState<BlogTopic[]>(INITIAL_BLOG_TOPICS)
  const [seoBlogPosts, setSeoBlogPosts] = useState<SeoBlogPost[]>(INITIAL_SEO_BLOG_POSTS)

  // Load from localStorage on client mount
  useEffect(() => {
    try {
      const storedDocs = localStorage.getItem('healthremade_doctors_v5')
      if (storedDocs) {
        setDoctors(JSON.parse(storedDocs))
      } else {
        setDoctors(INITIAL_DOCTORS)
        localStorage.setItem('healthremade_doctors_v5', JSON.stringify(INITIAL_DOCTORS))
      }

      const storedBlogs = localStorage.getItem('healthremade_blogs')
      if (storedBlogs) setBlogPosts(JSON.parse(storedBlogs))

      const storedHosps = localStorage.getItem('healthremade_hospitals')
      if (storedHosps) setHospitals(JSON.parse(storedHosps))

      const storedLeads = localStorage.getItem('healthremade_leads')
      if (storedLeads) setLeads(JSON.parse(storedLeads))

      const storedPricing = localStorage.getItem('healthremade_pricing')
      if (storedPricing) setPricingRequests(JSON.parse(storedPricing))

      const storedProcedures = localStorage.getItem('healthremade_procedures')
      if (storedProcedures) setProcedures(JSON.parse(storedProcedures))

      const storedLandingPages = localStorage.getItem('healthremade_landing_pages')
      if (storedLandingPages) setLandingPages(JSON.parse(storedLandingPages))

      const storedBlogTopics = localStorage.getItem('healthremade_blog_topics')
      if (storedBlogTopics) setBlogTopics(JSON.parse(storedBlogTopics))

      const storedSeoBlogs = localStorage.getItem('healthremade_seo_blogs')
      if (storedSeoBlogs) setSeoBlogPosts(JSON.parse(storedSeoBlogs))
    } catch {
      // ignore storage errors
    }
  }, [])

  // Doctors Actions
  const addDoctor = (doc: Omit<Doctor, 'id'>) => {
    const newDoc: Doctor = { ...doc, id: `doc_${Date.now()}` }
    const updated = [newDoc, ...doctors]
    setDoctors(updated)
    localStorage.setItem('healthremade_doctors_v5', JSON.stringify(updated))
  }

  const updateDoctor = (id: string, partial: Partial<Doctor>) => {
    const updated = doctors.map((d) => (d.id === id ? { ...d, ...partial } : d))
    setDoctors(updated)
    localStorage.setItem('healthremade_doctors_v5', JSON.stringify(updated))
  }

  const deleteDoctor = (id: string) => {
    const updated = doctors.filter((d) => d.id !== id)
    setDoctors(updated)
    localStorage.setItem('healthremade_doctors_v5', JSON.stringify(updated))
  }

  // Blog Handlers
  const addBlogPost = (post: Omit<BlogPost, 'id'>) => {
    const newPost: BlogPost = {
      ...post,
      id: `blog_${Date.now()}`,
    }
    const updated = [newPost, ...blogPosts]
    setBlogPosts(updated)
    localStorage.setItem('healthremade_blogs', JSON.stringify(updated))
  }

  const updateBlogPost = (id: string, postData: Partial<BlogPost>) => {
    const updated = blogPosts.map((b) => (b.id === id ? { ...b, ...postData } : b))
    setBlogPosts(updated)
    localStorage.setItem('healthremade_blogs', JSON.stringify(updated))
  }

  const deleteBlogPost = (id: string) => {
    const updated = blogPosts.filter((b) => b.id !== id)
    setBlogPosts(updated)
    localStorage.setItem('healthremade_blogs', JSON.stringify(updated))
  }

  // Hospital Handlers
  const addHospital = (hosp: Omit<Hospital, 'id'>) => {
    const newHosp: Hospital = {
      ...hosp,
      id: `hosp_${Date.now()}`,
    }
    const updated = [newHosp, ...hospitals]
    setHospitals(updated)
    localStorage.setItem('healthremade_hospitals', JSON.stringify(updated))
  }

  const updateHospital = (id: string, hospData: Partial<Hospital>) => {
    const updated = hospitals.map((h) => (h.id === id ? { ...h, ...hospData } : h))
    setHospitals(updated)
    localStorage.setItem('healthremade_hospitals', JSON.stringify(updated))
  }

  const deleteHospital = (id: string) => {
    const updated = hospitals.filter((h) => h.id !== id)
    setHospitals(updated)
    localStorage.setItem('healthremade_hospitals', JSON.stringify(updated))
  }

  // Lead Handlers
  const addLead = (lead: Omit<LeadCase, 'id'>) => {
    const newLead: LeadCase = {
      ...lead,
      id: `CAS-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    }
    const updated = [newLead, ...leads]
    setLeads(updated)
    localStorage.setItem('healthremade_leads', JSON.stringify(updated))
  }

  const updateLead = (id: string, leadData: Partial<LeadCase>) => {
    const updated = leads.map((l) => (l.id === id ? { ...l, ...leadData } : l))
    setLeads(updated)
    localStorage.setItem('healthremade_leads', JSON.stringify(updated))
  }

  const deleteLead = (id: string) => {
    const updated = leads.filter((l) => l.id !== id)
    setLeads(updated)
    localStorage.setItem('healthremade_leads', JSON.stringify(updated))
  }

  // Pricing Requests
  const addPricingRequest = (req: Omit<PricingChangeRequest, 'id'>) => {
    const newReq: PricingChangeRequest = {
      ...req,
      id: `PR-2026-${Math.floor(100 + Math.random() * 900)}`,
      submittedAt: 'Just now',
    }
    const updated = [newReq, ...pricingRequests]
    setPricingRequests(updated)
    localStorage.setItem('healthremade_pricing', JSON.stringify(updated))
  }

  const updatePricingRequest = (id: string, reqData: Partial<PricingChangeRequest>) => {
    const updated = pricingRequests.map((r) => (r.id === id ? { ...r, ...reqData } : r))
    setPricingRequests(updated)
    localStorage.setItem('healthremade_pricing', JSON.stringify(updated))
  }

  // Disputes & Moderation
  const updateDispute = (id: string, dispData: Partial<DisputeTicket>) => {
    setDisputes((prev) => prev.map((d) => (d.id === id ? { ...d, ...dispData } : d)))
  }

  const updateModerationItem = (id: string, itemData: Partial<OutcomeModerationItem>) => {
    setModerationItems((prev) => prev.map((m) => (m.id === id ? { ...m, ...itemData } : m)))
  }

  // ─── AI LANDING PAGE PIPELINE HANDLERS ──────────────────────────────────────

  // STEP 1 & 2: Add procedure as draft & trigger AI generation into pending_review
  const addProcedureAndTriggerAi = async (
    procData: Omit<ProcedureRecord, 'id' | 'status' | 'createdAt' | 'updatedAt'>
  ): Promise<LandingPageRecord> => {
    const now = new Date().toISOString()
    const procId = `proc_${Date.now()}`

    const newProcedure: ProcedureRecord = {
      ...procData,
      id: procId,
      status: 'pending_review',
      createdAt: now,
      updatedAt: now,
    }

    // Step 2: Background Claude Sonnet generation
    const aiContent = await generateLandingPageDraftWithClaude(newProcedure)

    const procedureSlug = slugify(newProcedure.name)
    const countrySlug = slugify(newProcedure.targetCountry)
    const slug = `/get-quote/${procedureSlug}/${countrySlug}`

    const newLandingPage: LandingPageRecord = {
      id: `lp_${Date.now()}`,
      procedureId: procId,
      procedureName: newProcedure.name,
      category: newProcedure.category,
      targetCountry: newProcedure.targetCountry,
      priceMin: newProcedure.priceMin,
      priceMax: newProcedure.priceMax,
      currency: newProcedure.currency,
      hospitalNames: newProcedure.hospitalNames,
      trustBlurb: newProcedure.trustBlurb,
      headline: aiContent.headline,
      subheadline: aiContent.subheadline,
      bodyCopy: aiContent.bodyCopy,
      metaTitle: aiContent.metaTitle,
      metaDescription: aiContent.metaDescription,
      formConfig: {
        defaultTreatment: newProcedure.name,
        countryCode: getCountryDialCode(newProcedure.targetCountry),
        disclaimer: '100% Confidential. Free senior surgeon review within 24 hours.',
      },
      slug,
      procedureSlug,
      countrySlug,
      status: 'pending_review', // Strictly pending_review until human approves
      generatedAt: now,
      reviewedBy: null,
      approvedAt: null,
      publishedAt: null,
      auditLog: [
        {
          action: 'Procedure Draft Created',
          user: 'Super Admin',
          timestamp: now,
        },
        {
          action: 'AI Copy Generation Completed',
          user: 'Claude Sonnet Engine',
          timestamp: now,
          note: 'Generated compliant copy using exact verified prices & hospital accreditation data.',
        },
      ],
      feedbackNote: null,
      analytics: {
        views: 0,
        submissions: 0,
        conversionRate: 0,
      },
    }

    const updatedProcedures = [newProcedure, ...procedures]
    const updatedLps = [newLandingPage, ...landingPages]

    setProcedures(updatedProcedures)
    setLandingPages(updatedLps)

    localStorage.setItem('healthremade_procedures', JSON.stringify(updatedProcedures))
    localStorage.setItem('healthremade_landing_pages', JSON.stringify(updatedLps))

    return newLandingPage
  }

  // STEP 4: Approve and Publish
  const approveAndPublishLandingPage = (id: string, reviewerName: string, notes?: string) => {
    const now = new Date().toISOString()
    const updated = landingPages.map((lp) => {
      if (lp.id === id) {
        const auditLog = [
          ...lp.auditLog,
          {
            action: 'Approved & Published',
            user: reviewerName,
            timestamp: now,
            note: notes || 'Human approval verified. Live page published.',
          },
        ]
        return {
          ...lp,
          status: 'published' as const,
          reviewedBy: reviewerName,
          approvedAt: now,
          publishedAt: now,
          auditLog,
        }
      }
      return lp
    })

    setLandingPages(updated)
    localStorage.setItem('healthremade_landing_pages', JSON.stringify(updated))

    // Update procedure status as well
    const targetLp = landingPages.find((l) => l.id === id)
    if (targetLp) {
      const updatedProcs = procedures.map((p) =>
        p.id === targetLp.procedureId ? { ...p, status: 'published' as const, updatedAt: now } : p
      )
      setProcedures(updatedProcs)
      localStorage.setItem('healthremade_procedures', JSON.stringify(updatedProcs))
    }
  }

  // STEP 4: Send back for edits
  const sendBackForEdits = async (
    id: string,
    reviewerName: string,
    feedbackNote: string,
    requestRegenerate = false
  ) => {
    const now = new Date().toISOString()
    let updatedLps = [...landingPages]
    const current = landingPages.find((l) => l.id === id)
    if (!current) return

    let regeneratedContent = {
      headline: current.headline,
      subheadline: current.subheadline,
      bodyCopy: current.bodyCopy,
      metaTitle: current.metaTitle,
      metaDescription: current.metaDescription,
    }

    if (requestRegenerate) {
      const proc = procedures.find((p) => p.id === current.procedureId)
      if (proc) {
        regeneratedContent = await generateLandingPageDraftWithClaude(proc, feedbackNote)
      }
    }

    updatedLps = updatedLps.map((lp) => {
      if (lp.id === id) {
        const auditLog = [
          ...lp.auditLog,
          {
            action: requestRegenerate ? 'Sent Back for AI Re-generation' : 'Sent Back with Reviewer Notes',
            user: reviewerName,
            timestamp: now,
            note: feedbackNote,
          },
        ]
        return {
          ...lp,
          ...regeneratedContent,
          status: 'pending_review' as const,
          feedbackNote,
          auditLog,
        }
      }
      return lp
    })

    setLandingPages(updatedLps)
    localStorage.setItem('healthremade_landing_pages', JSON.stringify(updatedLps))
  }

  // Update content manually during review
  const updateLandingPageContent = (id: string, content: Partial<LandingPageRecord>) => {
    const now = new Date().toISOString()
    const updated = landingPages.map((lp) => {
      if (lp.id === id) {
        return {
          ...lp,
          ...content,
          auditLog: [
            ...lp.auditLog,
            {
              action: 'Manual Content Edit',
              user: 'Super Admin',
              timestamp: now,
            },
          ],
        }
      }
      return lp
    })
    setLandingPages(updated)
    localStorage.setItem('healthremade_landing_pages', JSON.stringify(updated))
  }

  // STEP 5: Take Offline / Unpublish
  const unpublishLandingPage = (id: string, reviewerName: string) => {
    const now = new Date().toISOString()
    const updated = landingPages.map((lp) => {
      if (lp.id === id) {
        return {
          ...lp,
          status: 'approved' as const, // Taken offline, preserved without deletion
          publishedAt: null,
          auditLog: [
            ...lp.auditLog,
            {
              action: 'Page Taken Offline',
              user: reviewerName,
              timestamp: now,
              note: 'Page temporarily unpublished.',
            },
          ],
        }
      }
      return lp
    })
    setLandingPages(updated)
    localStorage.setItem('healthremade_landing_pages', JSON.stringify(updated))
  }

  // Analytics tracking
  const recordLandingPageView = (slug: string) => {
    setLandingPages((prev) =>
      prev.map((lp) => {
        if (lp.slug === slug || lp.slug === `/get-quote/${slug}`) {
          const views = lp.analytics.views + 1
          const conversionRate = views > 0 ? Number(((lp.analytics.submissions / views) * 100).toFixed(2)) : 0
          return {
            ...lp,
            analytics: {
              ...lp.analytics,
              views,
              conversionRate,
            },
          }
        }
        return lp
      })
    )
  }

  const recordLandingPageSubmission = (slug: string) => {
    setLandingPages((prev) =>
      prev.map((lp) => {
        if (lp.slug === slug || lp.slug === `/get-quote/${slug}`) {
          const submissions = lp.analytics.submissions + 1
          const views = Math.max(lp.analytics.views, submissions)
          const conversionRate = views > 0 ? Number(((submissions / views) * 100).toFixed(2)) : 0
          return {
            ...lp,
            analytics: {
              ...lp.analytics,
              submissions,
              conversionRate,
            },
          }
        }
        return lp
      })
    )
  }

  // ─── AI SEO BLOG PIPELINE HANDLERS ──────────────────────────────────────

  const addBlogTopicAndGenerateDraft = async (
    topicData: Omit<BlogTopic, 'id' | 'status' | 'createdAt' | 'updatedAt'>
  ): Promise<SeoBlogPost> => {
    const topicId = `topic_${Date.now()}`
    const nowIso = new Date().toISOString()

    const newTopic: BlogTopic = {
      ...topicData,
      id: topicId,
      status: 'queued',
      createdAt: nowIso,
      updatedAt: nowIso,
    }

    const updatedTopics = [newTopic, ...blogTopics]
    setBlogTopics(updatedTopics)
    localStorage.setItem('healthremade_blog_topics', JSON.stringify(updatedTopics))

    // Step 2: Call Claude Sonnet Copywriter
    const draft = await generateSeoBlogDraftWithClaude(topicData)

    const newPost: SeoBlogPost = {
      id: `post_${Date.now()}`,
      topicId: topicId,
      title: draft.title,
      targetKeyword: topicData.targetKeyword,
      category: topicData.category,
      priority: topicData.priority,
      relatedProcedureTags: topicData.relatedProcedureTags,
      bodyContent: draft.bodyContent,
      metaTitle: draft.metaTitle,
      metaDescription: draft.metaDescription,
      faqItems: draft.faqItems,
      author: 'healthremade Clinical Editorial Team',
      medicalReviewer: null,
      lastReviewedDate: null,
      slug: draft.slug,
      status: 'pending_review',
      generatedAt: nowIso,
      approvedAt: null,
      publishedAt: null,
      needsSourceCount: draft.needsSourceCount,
      isNeedsSourceResolved: draft.needsSourceCount === 0,
      auditLog: [
        {
          action: 'AI Draft Generated (Claude Sonnet)',
          user: 'System Engine',
          timestamp: nowIso,
          note: draft.needsSourceCount > 0 ? `Flagged with ${draft.needsSourceCount} [NEEDS SOURCE] item(s) for doctor verification.` : 'Draft created.',
        },
      ],
      indexingStatus: 'pending',
      indexingLog: null,
      viewCount: 0,
    }

    const updatedPosts = [newPost, ...seoBlogPosts]
    setSeoBlogPosts(updatedPosts)
    localStorage.setItem('healthremade_seo_blog_posts', JSON.stringify(updatedPosts))

    // Update topic status to drafted
    const topicsWithDraft = updatedTopics.map((t) => (t.id === topicId ? { ...t, status: 'drafted' as const } : t))
    setBlogTopics(topicsWithDraft)
    localStorage.setItem('healthremade_blog_topics', JSON.stringify(topicsWithDraft))

    return newPost
  }

  const bulkImportBlogTopics = async (
    topicsList: Array<Omit<BlogTopic, 'id' | 'status' | 'createdAt' | 'updatedAt'>>
  ): Promise<number> => {
    let count = 0
    for (const item of topicsList) {
      await addBlogTopicAndGenerateDraft(item)
      count++
    }
    return count
  }

  const approveAndPublishBlogPost = (
    id: string,
    reviewer: MedicalReviewer,
    adminUser = 'Dr. Chief Medical Officer'
  ): { success: boolean; error?: string } => {
    const post = seoBlogPosts.find((p) => p.id === id)
    if (!post) return { success: false, error: 'Post not found.' }

    // ─── STRICT PUBLISHING CONSTRAINT (DATABASE / CONTEXT LEVEL) ────────────
    // 1. Must have a named medical doctor reviewer assigned
    if (!reviewer || !reviewer.name || !reviewer.designation) {
      return {
        success: false,
        error: 'BLOCKED: A named Medical Doctor Reviewer with credentials must be assigned before publishing.',
      }
    }

    // 2. Must have zero unresolved [NEEDS SOURCE] flags in bodyContent
    const unresolvedFlags = countNeedsSourceFlags(post.bodyContent)
    if (unresolvedFlags > 0) {
      return {
        success: false,
        error: `BLOCKED: Cannot publish with ${unresolvedFlags} unresolved [NEEDS SOURCE] flag(s) in body copy. Verify or replace all flagged statistics before approving.`,
      }
    }

    const nowIso = new Date().toISOString()
    const todayDate = nowIso.split('T')[0]

    const updated = seoBlogPosts.map((p) => {
      if (p.id === id) {
        return {
          ...p,
          status: 'published' as const,
          medicalReviewer: reviewer,
          approvedAt: nowIso,
          publishedAt: nowIso,
          lastReviewedDate: todayDate,
          needsSourceCount: 0,
          isNeedsSourceResolved: true,
          indexingStatus: 'submitted' as const,
          indexingLog: `Google Search Console Indexing API notified on ${new Date().toLocaleDateString()}`,
          auditLog: [
            ...p.auditLog,
            {
              action: 'Approved & Published',
              user: `${reviewer.name} (Reviewer) / ${adminUser}`,
              timestamp: nowIso,
              note: `Medically reviewed and approved. Article & FAQ JSON-LD schemas generated.`,
            },
          ],
        }
      }
      return p
    })

    setSeoBlogPosts(updated)
    localStorage.setItem('healthremade_seo_blog_posts', JSON.stringify(updated))
    return { success: true }
  }

  const sendBackPostForEdits = async (
    id: string,
    adminUser: string,
    feedbackNote: string,
    requestRegenerate = false
  ): Promise<void> => {
    const post = seoBlogPosts.find((p) => p.id === id)
    if (!post) return

    const nowIso = new Date().toISOString()

    if (requestRegenerate) {
      const draft = await generateSeoBlogDraftWithClaude({
        targetKeyword: post.targetKeyword,
        workingTitle: post.title,
        category: post.category,
        relatedProcedureTags: post.relatedProcedureTags,
        priority: post.priority,
      })

      const updated = seoBlogPosts.map((p) => {
        if (p.id === id) {
          return {
            ...p,
            bodyContent: draft.bodyContent,
            metaTitle: draft.metaTitle,
            metaDescription: draft.metaDescription,
            faqItems: draft.faqItems,
            needsSourceCount: draft.needsSourceCount,
            status: 'pending_review' as const,
            auditLog: [
              ...p.auditLog,
              {
                action: 'Sent Back & Re-generated with AI',
                user: adminUser,
                timestamp: nowIso,
                note: feedbackNote,
              },
            ],
          }
        }
        return p
      })
      setSeoBlogPosts(updated)
      localStorage.setItem('healthremade_seo_blog_posts', JSON.stringify(updated))
    } else {
      const updated = seoBlogPosts.map((p) => {
        if (p.id === id) {
          return {
            ...p,
            status: 'pending_review' as const,
            auditLog: [
              ...p.auditLog,
              {
                action: 'Sent Back for Revisions',
                user: adminUser,
                timestamp: nowIso,
                note: feedbackNote,
              },
            ],
          }
        }
        return p
      })
      setSeoBlogPosts(updated)
      localStorage.setItem('healthremade_seo_blog_posts', JSON.stringify(updated))
    }
  }

  const updateBlogPostDraft = (id: string, content: Partial<SeoBlogPost>) => {
    const updated = seoBlogPosts.map((p) => {
      if (p.id === id) {
        const bodyContent = content.bodyContent !== undefined ? content.bodyContent : p.bodyContent
        const needsSourceCount = countNeedsSourceFlags(bodyContent)
        return {
          ...p,
          ...content,
          needsSourceCount,
          isNeedsSourceResolved: needsSourceCount === 0,
        }
      }
      return p
    })
    setSeoBlogPosts(updated)
    localStorage.setItem('healthremade_seo_blog_posts', JSON.stringify(updated))
  }

  const unpublishBlogPost = (id: string, adminUser: string) => {
    const nowIso = new Date().toISOString()
    const updated = seoBlogPosts.map((p) => {
      if (p.id === id) {
        return {
          ...p,
          status: 'pending_review' as const,
          auditLog: [
            ...p.auditLog,
            {
              action: 'Taken Offline / Unpublished',
              user: adminUser,
              timestamp: nowIso,
              note: 'Post taken offline for content update.',
            },
          ],
        }
      }
      return p
    })
    setSeoBlogPosts(updated)
    localStorage.setItem('healthremade_seo_blog_posts', JSON.stringify(updated))
  }

  const getNeedsRefreshPosts = (): SeoBlogPost[] => {
    const now = Date.now()
    const sixMonthsMs = 180 * 24 * 60 * 60 * 1000 // 180 days

    return seoBlogPosts.filter((post) => {
      if (post.status !== 'published' || !post.lastReviewedDate) return false
      const reviewDateMs = new Date(post.lastReviewedDate).getTime()
      return now - reviewDateMs > sixMonthsMs
    })
  }

  return (
    <AdminDataContext.Provider
      value={{
        doctors,
        addDoctor,
        updateDoctor,
        deleteDoctor,
        blogPosts,
        addBlogPost,
        updateBlogPost,
        deleteBlogPost,
        blogTopics,
        seoBlogPosts,
        addBlogTopicAndGenerateDraft,
        bulkImportBlogTopics,
        approveAndPublishBlogPost,
        sendBackPostForEdits,
        updateBlogPostDraft,
        unpublishBlogPost,
        getNeedsRefreshPosts,
        hospitals,
        addHospital,
        updateHospital,
        deleteHospital,
        leads,
        addLead,
        updateLead,
        deleteLead,
        pricingRequests,
        addPricingRequest,
        updatePricingRequest,
        disputes,
        updateDispute,
        moderationItems,
        updateModerationItem,
        procedures,
        landingPages,
        addProcedureAndTriggerAi,
        approveAndPublishLandingPage,
        sendBackForEdits,
        updateLandingPageContent,
        unpublishLandingPage,
        recordLandingPageView,
        recordLandingPageSubmission,
      }}
    >
      {children}
    </AdminDataContext.Provider>
  )
}

export function useAdminData() {
  const context = useContext(AdminDataContext)
  if (!context) {
    throw new Error('useAdminData must be used within an AdminDataProvider')
  }
  return context
}
