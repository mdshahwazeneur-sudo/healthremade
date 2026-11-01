'use client'

import React, { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import {
  MessageSquare,
  Search,
  PlusCircle,
  ThumbsUp,
  MessageCircle,
  CheckCircle2,
  Clock,
  ArrowLeft,
  ShieldCheck,
  Send,
  X,
  User,
  RefreshCw,
  Sparkles,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Check,
} from 'lucide-react'
import { Badge } from '@/components/ui/primitives'
import { useQuote } from '@/components/ui/QuoteModal'
import { getWhatsAppUrl } from '@/lib/whatsapp'
import { FaqSection } from '@/components/ui/FaqSection'
import type { FAQ } from '@/data/faqsData'

interface ChatMessage {
  id: string
  author: string
  role: 'expert' | 'patient' | 'anonymous'
  badgeLabel: string
  country?: string
  content: string
  timestamp: string
}

interface ForumThread {
  id: string
  title: string
  initialContent: string
  startedBy: string
  userCountry: string
  category: 'cardiac' | 'orthopaedics' | 'transplant' | 'oncology' | 'visas' | 'costs'
  categoryLabel: string
  createdAt: string
  upvotes: number
  hasUpvoted?: boolean
  status: 'verified' | 'pending_verification'
  verificationNote?: string
  messages: ChatMessage[]
}

const INITIAL_THREADS: ForumThread[] = [
  {
    id: 'thread-1',
    title: 'Off-Pump vs On-Pump CABG: What is the real recovery difference in Delhi hospitals?',
    initialContent:
      'My 62-year-old father has triple vessel disease. Two hospitals in the UK have a 6-month waitlist. We received preliminary quotes for off-pump beating heart surgery in Delhi NCR. How soon can he fly back to Manchester?',
    startedBy: 'Patient #842',
    userCountry: 'United Kingdom',
    category: 'cardiac',
    categoryLabel: 'Cardiac Surgery',
    createdAt: '2 days ago',
    upvotes: 38,
    status: 'verified',
    messages: [
      {
        id: 'msg-1',
        author: 'healthremade Verified Expert',
        role: 'expert',
        badgeLabel: 'Senior Clinical Desk',
        content:
          'Off-pump (beating heart) bypass surgery minimizes systemic inflammation by avoiding the heart-lung machine circuit. Across top accredited facilities in Delhi NCR, ICU stays average 48 hours with hospital discharge by Day 6. International patients are typically evaluated for Fit-to-Fly clearance around Day 14–16 post-op after sternal stability and echocardiography confirmation.',
        timestamp: '1 day ago',
      },
      {
        id: 'msg-2',
        author: 'Anonymous Traveler #119',
        role: 'patient',
        badgeLabel: 'Patient Alumnus',
        country: 'London, UK',
        content:
          'My husband had off-pump surgery done 4 months ago. The coordination was seamless and our total package was around £5,200. He was walking comfortably inside the hotel by week two.',
        timestamp: '18 hours ago',
      },
    ],
  },
  {
    id: 'thread-2',
    title: 'How long did your Indian Medical Visa (MED) take from Nairobi, Kenya?',
    initialContent:
      'We are preparing to travel for bilateral knee replacement. The hospital dispatched the visa invitation letter yesterday. Does the e-Medical Visa take 48 hours or longer from Kenya?',
    startedBy: 'Patient #514',
    userCountry: 'Kenya',
    category: 'visas',
    categoryLabel: 'Visas & Travel',
    createdAt: '3 days ago',
    upvotes: 24,
    status: 'verified',
    messages: [
      {
        id: 'msg-3',
        author: 'healthremade Verified Expert',
        role: 'expert',
        badgeLabel: 'Consular Services Desk',
        content:
          'The Indian e-Medical Visa portal (indianvisaonline.gov.in) currently processes complete applications from Kenya within 48 to 72 hours. Ensure that you upload the official hospital invitation letter in PDF format (under 300KB) along with proof of your yellow fever vaccination certificate.',
        timestamp: '2 days ago',
      },
      {
        id: 'msg-4',
        author: 'Anonymous Patient #902',
        role: 'patient',
        badgeLabel: 'Patient',
        country: 'Nairobi',
        content:
          'Mine came through in 36 hours. Just make sure the photo matches the exact white background specs so there is no back-and-forth.',
        timestamp: '1 day ago',
      },
    ],
  },
  {
    id: 'thread-3',
    title: 'Living donor liver transplant: What legal documents are required for foreign donors?',
    initialContent:
      'We are exploring living donor liver transplantation in Delhi NCR. What documentation is mandated by the government authorization committee for an overseas donor and recipient?',
    startedBy: 'Anonymous Patient #371',
    userCountry: 'UAE',
    category: 'transplant',
    categoryLabel: 'Organ Transplants',
    createdAt: '4 days ago',
    upvotes: 31,
    status: 'verified',
    messages: [
      {
        id: 'msg-5',
        author: 'healthremade Verified Expert',
        role: 'expert',
        badgeLabel: 'Transplant Regulatory Liaison',
        content:
          'Under the Indian Transplantation of Human Organs Act (THOA), living donors must be immediate first-degree blood relatives (spouse, parent, sibling, child). The government authorization committee mandates: 1) Embassy NOC letter, 2) Family genealogical tree certified by your home Ministry of Foreign Affairs, 3) HLA tissue-typing and cross-match records, and 4) Mandatory in-person committee interview.',
        timestamp: '3 days ago',
      },
    ],
  },
  {
    id: 'thread-4',
    title: 'Robotic knee replacement vs conventional surgery: Is it worth the small price difference?',
    initialContent:
      'I am deciding between standard total knee replacement and robotic-assisted surgery in Delhi. For those who had robotic surgery, did you walk without crutches faster?',
    startedBy: 'Patient #209',
    userCountry: 'Australia',
    category: 'orthopaedics',
    categoryLabel: 'Orthopaedics',
    createdAt: '5 days ago',
    upvotes: 29,
    status: 'verified',
    messages: [
      {
        id: 'msg-6',
        author: 'healthremade Verified Expert',
        role: 'expert',
        badgeLabel: 'Clinical Reviewer',
        content:
          'Robotic navigation maps bone cuts based on a personalized 3D CT scan. The haptic feedback boundary prevents micro-damage to surrounding collateral ligaments. Clinical data indicates less intraoperative soft tissue trauma, lower post-op pain medication requirements, and faster progression to independent unassisted walking within 2 to 3 weeks.',
        timestamp: '4 days ago',
      },
    ],
  },
  {
    id: 'thread-5',
    title: 'Are itemized quotes really locked? Did anyone pay extra charges at hospital discharge?',
    initialContent:
      'We received an itemized package quote of $5,200 for cervical spine decompression and fusion. Are there hidden medication fees or room service surcharges upon discharge?',
    startedBy: 'Patient #603',
    userCountry: 'Nigeria',
    category: 'costs',
    categoryLabel: 'Costs & Invoicing',
    createdAt: '1 week ago',
    upvotes: 45,
    status: 'verified',
    messages: [
      {
        id: 'msg-7',
        author: 'healthremade Verified Expert',
        role: 'expert',
        badgeLabel: 'Hospital Tariff Auditor',
        content:
          'healthremade maintains a strict Zero Markup Policy and direct hospital billing agreements. Standard surgical packages include the defined hospital room stay, surgical team fees, standard implants, ICU monitoring, and routine post-op medications. Additional bills only arise if a pre-existing medical condition (such as cardiac instability or diabetic nephropathy) requires non-routine specialist intensive care.',
        timestamp: '5 days ago',
      },
      {
        id: 'msg-8',
        author: 'Anonymous Traveler #442',
        role: 'patient',
        badgeLabel: 'Patient',
        country: 'Lagos',
        content:
          'Our final bill matched the pre-travel estimate down to the last dollar. We paid directly at the hospital cashier on day of admission with zero extra agency charges.',
        timestamp: '4 days ago',
      },
    ],
  },
]

const FORUM_FAQS: FAQ[] = [
  {
    question: 'How do I initiate a new topic discussion in the forum?',
    answer:
      'Simply click "Initiate Topic Discussion" in the top bar. Choose your medical category, enter your question, and submit anonymously. To protect clinical safety, your topic is reviewed by a healthremade verified expert before being published for public discussion.',
  },
  {
    question: 'Why must new topics be verified by an expert before going live?',
    answer:
      'To prevent dangerous self-diagnosis, commercial hospital solicitations, and medical inaccuracies, every initiated topic is audited by our clinical review desk. Once verified for clinical relevance, the discussion unlocks for both patient participation and expert analysis.',
  },
  {
    question: 'How long does topic verification take?',
    answer:
      'New topics are typically audited and verified within 1 to 3 hours during active clinical hours, and always within 12 hours.',
  },
  {
    question: 'How does the anonymous account system work?',
    answer:
      'Every visitor is automatically assigned an anonymous account handle (such as "Anonymous Traveler #382"). You can initiate topics, reply in chats, and share clinical feedback immediately with zero password friction or public disclosure of your personal identity.',
  },
  {
    question: 'Can I change my anonymous alias?',
    answer:
      'Yes. You can customize your anonymous display name at any time using the alias switcher at the top of the forum or right before posting a message.',
  },
  {
    question: 'Who are the healthremade verified experts answering discussions?',
    answer:
      'healthremade verified experts are certified clinical coordinators, hospital liaison officers, and medical advisors who audit clinical protocols across JCI and NABH accredited facilities to provide neutral, medically sound guidance without sales promotion.',
  },
  {
    question: 'Are there individual doctor profiles on this forum?',
    answer:
      'No. To maintain complete clinical neutrality, prevent advertising, and protect patient confidentiality, all specialist replies are provided through the healthremade verified expert desk in consultation with accredited hospital departments.',
  },
  {
    question: 'Is it completely free to initiate topics and join chats?',
    answer:
      'Yes. The patients & doctors discussion forum is 100% free for all patients worldwide. healthremade never charges fees for asking questions or accessing community discussions.',
  },
  {
    question: 'Can I upload sensitive diagnostic scans and medical reports in the chat?',
    answer:
      'To safeguard your privacy, do not post private scans or confidential records into public discussions. Use the private "Request Formal Quote" or WhatsApp consultation link to transmit medical records securely to our HIPAA-compliant portal.',
  },
  {
    question: 'Can I discuss hospital bills, package costs, and price comparisons?',
    answer:
      'Yes. Transparent pricing is a core pillar of healthremade. You can freely inquire about procedure price ranges, implant costs, room categories, and payment policies across Indian medical centers.',
  },
]

export default function ForumPage() {
  const [threads, setThreads] = useState<ForumThread[]>(INITIAL_THREADS)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [openThreadId, setOpenThreadId] = useState<string | null>('thread-1')
  const [isInitiateModalOpen, setIsInitiateModalOpen] = useState(false)
  const [inlineReplyText, setInlineReplyText] = useState<{ [threadId: string]: string }>({})
  const { openQuoteModal } = useQuote()

  // Anonymous user state
  const [anonymousName, setAnonymousName] = useState<string>('Anonymous Traveler #482')
  const [isEditingAlias, setIsEditingAlias] = useState(false)
  const [tempAlias, setTempAlias] = useState(anonymousName)

  // Generate or load anonymous name
  useEffect(() => {
    const saved = localStorage.getItem('healthremade_anon_alias')
    if (saved) {
      setAnonymousName(saved)
      setTempAlias(saved)
    } else {
      const randomNum = Math.floor(100 + Math.random() * 900)
      const generated = `Anonymous Traveler #${randomNum}`
      setAnonymousName(generated)
      setTempAlias(generated)
      localStorage.setItem('healthremade_anon_alias', generated)
    }
  }, [])

  const handleSaveAlias = () => {
    const trimmed = tempAlias.trim()
    if (trimmed) {
      setAnonymousName(trimmed)
      localStorage.setItem('healthremade_anon_alias', trimmed)
    }
    setIsEditingAlias(false)
  }

  const handleRegenerateAlias = () => {
    const randomNum = Math.floor(100 + Math.random() * 900)
    const generated = `Anonymous Patient #${randomNum}`
    setAnonymousName(generated)
    setTempAlias(generated)
    localStorage.setItem('healthremade_anon_alias', generated)
    setIsEditingAlias(false)
  }

  // Upvote handling
  const handleUpvote = (threadId: string) => {
    setThreads((prev) =>
      prev.map((t) => {
        if (t.id === threadId) {
          const nextUpvoted = !t.hasUpvoted
          return {
            ...t,
            upvotes: nextUpvoted ? t.upvotes + 1 : t.upvotes - 1,
            hasUpvoted: nextUpvoted,
          }
        }
        return t
      })
    )
  }

  // Simulate or handle topic verification
  const handleVerifyThread = (threadId: string) => {
    setThreads((prev) =>
      prev.map((t) => {
        if (t.id === threadId) {
          return {
            ...t,
            status: 'verified',
            messages: [
              ...t.messages,
              {
                id: `msg-${Date.now()}-expert-verified`,
                author: 'healthremade Verified Expert',
                role: 'expert',
                badgeLabel: 'Senior Clinical Desk',
                content:
                  'Topic successfully verified. Clinical relevance and medical context confirmed. Discussion is now open for community participation and clinical coordination.',
                timestamp: 'Just now',
              },
            ],
          }
        }
        return t
      })
    )
  }

  // Send reply in an active chat
  const handleSendReply = (threadId: string) => {
    const text = inlineReplyText[threadId]?.trim()
    if (!text) return

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      author: anonymousName,
      role: 'anonymous',
      badgeLabel: 'Anonymous Participant',
      content: text,
      timestamp: 'Just now',
    }

    setThreads((prev) =>
      prev.map((t) => {
        if (t.id === threadId) {
          return {
            ...t,
            messages: [...t.messages, newMsg],
          }
        }
        return t
      })
    )

    setInlineReplyText((prev) => ({ ...prev, [threadId]: '' }))
  }

  // Initiate topic form state
  const [newTitle, setNewTitle] = useState('')
  const [newContent, setNewContent] = useState('')
  const [newCategory, setNewCategory] = useState<ForumThread['category']>('cardiac')
  const [newCountry, setNewCountry] = useState('')
  const [formSuccess, setFormSuccess] = useState(false)

  const handleInitiateTopic = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTitle.trim() || !newContent.trim()) return

    const categoryMap: Record<ForumThread['category'], string> = {
      cardiac: 'Cardiac Surgery',
      orthopaedics: 'Orthopaedics',
      transplant: 'Organ Transplants',
      oncology: 'Cancer Care',
      visas: 'Visas & Travel',
      costs: 'Costs & Invoicing',
    }

    // Created with pending_verification status as required
    const created: ForumThread = {
      id: `thread-${Date.now()}`,
      title: newTitle.trim(),
      initialContent: newContent.trim(),
      startedBy: anonymousName,
      userCountry: newCountry.trim() || 'International',
      category: newCategory,
      categoryLabel: categoryMap[newCategory],
      createdAt: 'Just now',
      upvotes: 1,
      hasUpvoted: true,
      status: 'pending_verification',
      verificationNote:
        'Topic initiated. Currently queued for review by a healthremade verified expert to ensure clinical relevance and safety before opening for public chat.',
      messages: [],
    }

    setThreads([created, ...threads])
    setOpenThreadId(created.id)
    setFormSuccess(true)
    setTimeout(() => {
      setFormSuccess(false)
      setIsInitiateModalOpen(false)
      setNewTitle('')
      setNewContent('')
      setNewCountry('')
    }, 1500)
  }

  const filteredThreads = useMemo(() => {
    return threads.filter((t) => {
      const matchesCategory =
        selectedCategory === 'all' || t.category === selectedCategory
      const q = searchQuery.toLowerCase().trim()
      const matchesQuery =
        !q ||
        t.title.toLowerCase().includes(q) ||
        t.initialContent.toLowerCase().includes(q) ||
        t.categoryLabel.toLowerCase().includes(q) ||
        t.messages.some((m) => m.content.toLowerCase().includes(q))
      return matchesCategory && matchesQuery
    })
  }, [threads, selectedCategory, searchQuery])

  return (
    <div className="min-h-screen bg-[#fcfdfd] text-slate-800 antialiased font-sans">
      {/* ─── Calming, Focused Header (No Main Navbar) ──────────────── */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-teal-700 transition-colors pr-3 border-r border-slate-200"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">healthremade</span>
            </Link>

            <div className="flex items-center gap-2">
              <span className="text-base sm:text-lg font-black tracking-tight text-slate-900">
                health<span className="text-teal-600">remade</span>
              </span>
              <span className="hidden md:inline-block text-xs font-medium text-slate-400">/</span>
              <span className="text-xs font-semibold text-slate-600">
                patients &amp; doctors discussion forum
              </span>
            </div>
          </div>

          {/* Anonymous Account Status & Initiate Action */}
          <div className="flex items-center gap-2.5">
            {/* Active Anonymous Identity Pill */}
            <div className="hidden sm:flex items-center gap-2 bg-slate-50 border border-slate-200/90 rounded-full py-1 px-3 text-xs">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-slate-500">Posting as:</span>
              <strong className="text-slate-800 font-semibold truncate max-w-[140px]">
                {anonymousName}
              </strong>
              <button
                onClick={() => setIsEditingAlias(true)}
                title="Change anonymous name"
                className="text-slate-400 hover:text-teal-700 transition-colors ml-0.5"
              >
                <RefreshCw className="h-3 w-3" />
              </button>
            </div>

            <button
              onClick={() => setIsInitiateModalOpen(true)}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 active:scale-95 px-3.5 sm:px-4 py-2 rounded-xl shadow-xs transition-all"
            >
              <PlusCircle className="h-4 w-4" />
              <span>Initiate Topic Discussion</span>
            </button>
          </div>
        </div>
      </header>

      {/* ─── Calming Hero Intro Banner (Easy on the eyes) ─────────── */}
      <section className="bg-gradient-to-b from-teal-50/70 via-slate-50/50 to-[#fcfdfd] border-b border-slate-200/60 py-10 px-4 sm:px-6">
        <div className="mx-auto max-w-4xl text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-teal-100/70 border border-teal-200/80 px-3 py-0.5 text-xs font-medium text-teal-800">
            <ShieldCheck className="h-3.5 w-3.5 text-teal-700" />
            <span>Anonymous Account System • Expert Verification Required</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            patients &amp; doctors discussion forum
          </h1>

          <p className="text-xs sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            An open community for medical travelers and patients. Anyone can <strong>initiate any topic discussion</strong>, which goes live once verified by a <strong>healthremade verified expert</strong> for clinical safety.
          </p>

          {/* Quick Anonymous Pill for Mobile */}
          <div className="sm:hidden pt-2">
            <button
              onClick={() => setIsEditingAlias(true)}
              className="inline-flex items-center gap-1.5 bg-white border border-slate-200 rounded-full px-3 py-1 text-xs text-slate-600"
            >
              <User className="h-3 w-3 text-teal-600" />
              <span>You: {anonymousName} (Tap to change)</span>
            </button>
          </div>
        </div>
      </section>

      {/* ─── Clean Search & Category Navigation ───────────────────── */}
      <section className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/70 py-3 px-4 sm:px-6">
        <div className="mx-auto max-w-4xl space-y-3">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search discussion topics (e.g., knee recovery, visa delay, bypass, hospital invoice)..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50/80 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/15 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
              >
                Clear
              </button>
            )}
          </div>

          {/* Soothing Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {[
              { id: 'all', label: 'All Discussions' },
              { id: 'cardiac', label: 'Cardiac & Heart' },
              { id: 'orthopaedics', label: 'Knees & Joints' },
              { id: 'transplant', label: 'Transplants' },
              { id: 'oncology', label: 'Cancer Care' },
              { id: 'visas', label: 'Visas & Travel' },
              { id: 'costs', label: 'Hospital Bills & Costs' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`text-xs font-medium px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-teal-700 text-white font-semibold shadow-2xs'
                    : 'bg-slate-100/80 text-slate-600 hover:bg-slate-200/70'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Main Chat Feed ───────────────────────────────────────── */}
      <main className="mx-auto max-w-4xl px-4 sm:px-6 py-8 space-y-5">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>
            Showing {filteredThreads.length} discussion {filteredThreads.length === 1 ? 'topic' : 'topics'}
          </span>
          <span className="flex items-center gap-1 text-slate-400">
            <Clock className="h-3.5 w-3.5" /> Recent updates
          </span>
        </div>

        {filteredThreads.length === 0 ? (
          <div className="text-center py-12 rounded-2xl bg-white border border-slate-200 p-8 space-y-3">
            <MessageSquare className="h-8 w-8 text-slate-300 mx-auto" />
            <h3 className="font-semibold text-slate-800 text-sm">No discussions match &ldquo;{searchQuery}&rdquo;</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Initiate this topic discussion now. Once verified by a healthremade expert, it will be published to the community.
            </p>
            <button
              onClick={() => {
                setNewTitle(searchQuery)
                setIsInitiateModalOpen(true)
              }}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 px-4 py-2 rounded-xl transition-all"
            >
              <PlusCircle className="h-3.5 w-3.5" />
              <span>Initiate Topic: &ldquo;{searchQuery}&rdquo;</span>
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredThreads.map((thread) => {
              const isOpen = openThreadId === thread.id
              const isPending = thread.status === 'pending_verification'
              const replyCount = thread.messages.length

              return (
                <article
                  key={thread.id}
                  className={`rounded-2xl border bg-white overflow-hidden shadow-2xs transition-all ${
                    isPending
                      ? 'border-amber-300/80 bg-amber-50/20'
                      : 'border-slate-200/90 hover:border-slate-300'
                  }`}
                >
                  {/* Thread Header Card */}
                  <div className="p-5 sm:p-6 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2 text-xs">
                          <span className="font-semibold text-teal-800 bg-teal-50 border border-teal-200/70 px-2 py-0.5 rounded text-[10px]">
                            {thread.categoryLabel}
                          </span>

                          {/* Verification Status Pill */}
                          {isPending ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 px-2.5 py-0.5 text-[10px] font-bold">
                              <Clock className="h-3 w-3 text-amber-700 animate-spin" />
                              Pending Expert Verification
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 px-2 py-0.5 text-[10px] font-semibold">
                              <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                              Expert Verified
                            </span>
                          )}

                          <span className="text-slate-400">•</span>
                          <span className="text-slate-600 font-medium">{thread.startedBy}</span>
                          <span className="text-slate-400">({thread.userCountry})</span>
                          <span className="text-slate-400">•</span>
                          <span className="text-slate-400 text-[11px]">{thread.createdAt}</span>
                        </div>

                        <h2
                          onClick={() => setOpenThreadId(isOpen ? null : thread.id)}
                          className="text-base sm:text-lg font-bold text-slate-900 hover:text-teal-700 cursor-pointer transition-colors leading-snug pt-0.5"
                        >
                          {thread.title}
                        </h2>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleUpvote(thread.id)}
                        className={`shrink-0 flex items-center gap-1 px-2.5 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                          thread.hasUpvoted
                            ? 'bg-teal-50 border-teal-300 text-teal-800 shadow-2xs'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <ThumbsUp className={`h-3.5 w-3.5 ${thread.hasUpvoted ? 'fill-teal-700 text-teal-700' : ''}`} />
                        <span>{thread.upvotes}</span>
                      </button>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {thread.initialContent}
                    </p>

                    {/* Pending Verification Notice Banner */}
                    {isPending && (
                      <div className="rounded-xl border border-amber-200 bg-amber-50/80 p-3.5 space-y-2 text-xs text-amber-900">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-bold flex items-center gap-1.5">
                            <Clock className="h-3.5 w-3.5 text-amber-700" />
                            Awaiting Expert Verification
                          </span>
                          <button
                            type="button"
                            onClick={() => handleVerifyThread(thread.id)}
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-teal-800 bg-white border border-teal-300 hover:bg-teal-50 px-2.5 py-1 rounded-md shadow-2xs transition-colors"
                          >
                            <Check className="h-3 w-3" />
                            <span>Verify Topic Now (Test Action)</span>
                          </button>
                        </div>
                        <p className="text-amber-800/90 leading-relaxed text-[11px]">
                          This topic was initiated by <strong>{thread.startedBy}</strong>. To protect patients and prevent inaccurate advice, public discussion opens only after clinical review by a healthremade verified expert.
                        </p>
                      </div>
                    )}

                    {/* Chat Stats & Toggle */}
                    <div className="pt-2 flex items-center justify-between border-t border-slate-100 text-xs text-slate-500">
                      <button
                        onClick={() => setOpenThreadId(isOpen ? null : thread.id)}
                        className="inline-flex items-center gap-1.5 font-semibold text-teal-700 hover:text-teal-800"
                      >
                        <MessageCircle className="h-3.5 w-3.5" />
                        <span>
                          {isPending
                            ? 'Verification Queue (Click to View)'
                            : `${replyCount} ${replyCount === 1 ? 'Message' : 'Messages'} in Chat`}
                        </span>
                        {isOpen ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                      </button>

                      <button
                        onClick={() => openQuoteModal({ treatment: thread.categoryLabel })}
                        className="font-medium text-slate-500 hover:text-teal-700 transition-colors"
                      >
                        Request private opinion →
                      </button>
                    </div>
                  </div>

                  {/* ─── Inline Chat Message Stream ─────────────────────────── */}
                  {isOpen && (
                    <div className="border-t border-slate-100 bg-slate-50/60 p-4 sm:p-6 space-y-4">
                      {thread.messages.length > 0 ? (
                        <div className="space-y-3">
                          {thread.messages.map((msg) => {
                            const isExpert = msg.role === 'expert'
                            return (
                              <div
                                key={msg.id}
                                className={`rounded-xl p-4 transition-all ${
                                  isExpert
                                    ? 'bg-emerald-50/80 border border-emerald-200/90 shadow-2xs'
                                    : 'bg-white border border-slate-200/80'
                                }`}
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center gap-2">
                                    {isExpert ? (
                                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-900">
                                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                                        {msg.author}
                                      </span>
                                    ) : (
                                      <span className="text-xs font-semibold text-slate-800">
                                        {msg.author} {msg.country && <span className="font-normal text-slate-400">({msg.country})</span>}
                                      </span>
                                    )}

                                    <span
                                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                                        isExpert
                                          ? 'bg-emerald-100 text-emerald-800'
                                          : 'bg-slate-100 text-slate-600'
                                      }`}
                                    >
                                      {msg.badgeLabel}
                                    </span>
                                  </div>
                                  <span className="text-[10px] text-slate-400">{msg.timestamp}</span>
                                </div>

                                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                                  {msg.content}
                                </p>
                              </div>
                            )
                          })}
                        </div>
                      ) : (
                        <div className="text-center py-6 text-xs text-slate-500 bg-white rounded-xl border border-slate-200/80 p-4 space-y-1">
                          <Clock className="h-5 w-5 text-amber-600 mx-auto" />
                          <p className="font-semibold text-slate-800">Topic Under Review</p>
                          <p className="text-slate-500">
                            A healthremade verified expert is reviewing this topic. Once verified, expert advice and public replies will appear here.
                          </p>
                        </div>
                      )}

                      {/* ─── Instant Anonymous Chat Input ───────────────────── */}
                      {isPending ? (
                        <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-3 text-xs text-amber-800 flex items-center gap-2">
                          <AlertCircle className="h-4 w-4 shrink-0 text-amber-700" />
                          <span>
                            Public replies unlock immediately after expert verification. You can click <strong>Verify Topic Now</strong> above to unlock.
                          </span>
                        </div>
                      ) : (
                        <div className="pt-2">
                          <div className="flex items-center gap-2 mb-1.5 text-xs text-slate-500">
                            <User className="h-3 w-3 text-teal-700" />
                            <span>Replying anonymously as: <strong className="text-slate-700">{anonymousName}</strong></span>
                          </div>

                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              value={inlineReplyText[thread.id] || ''}
                              onChange={(e) =>
                                setInlineReplyText({ ...inlineReplyText, [thread.id]: e.target.value })
                              }
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') handleSendReply(thread.id)
                              }}
                              placeholder="Type your message or clinical question into this chat..."
                              className="flex-1 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:border-teal-500 focus:ring-2 focus:ring-teal-500/15"
                            />
                            <button
                              type="button"
                              onClick={() => handleSendReply(thread.id)}
                              className="inline-flex items-center gap-1 rounded-xl bg-teal-700 hover:bg-teal-800 active:scale-95 text-white font-semibold text-xs px-4 py-2.5 shadow-2xs transition-all"
                            >
                              <Send className="h-3.5 w-3.5" />
                              <span>Send</span>
                            </button>
                          </div>
                          <p className="text-[11px] text-slate-400 mt-1">
                            No sign-up required. Your message is posted immediately using your anonymous handle.
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </article>
              )
            })}
          </div>
        )}
      </main>

      {/* ─── 10 AEO & GEO FAQs ─────────────────────────────────────── */}
      <FaqSection
        title="patients & doctors discussion forum FAQs"
        subtitle="How topic initiation works, expert verification protocols, anonymous accounts, and medical safety standards."
        badgeText="Community & Clinical Neutrality Guide"
        faqs={FORUM_FAQS}
        className="bg-white border-t border-slate-200/80"
      />

      {/* ─── Modal: Initiate Topic Discussion ──────────────────────── */}
      {isInitiateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl space-y-4 max-h-[90vh] overflow-y-auto border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">Initiate a Topic Discussion</h3>
                <p className="text-xs text-slate-500">
                  New topics go live once verified by a healthremade verified expert.
                </p>
              </div>
              <button
                onClick={() => setIsInitiateModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {formSuccess ? (
              <div className="py-6 text-center space-y-2">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <h4 className="font-bold text-slate-900 text-sm">Topic Initiated &amp; Queued for Review!</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  A healthremade verified expert will review this topic for clinical relevance. Once approved, the discussion opens for community participation.
                </p>
              </div>
            ) : (
              <form onSubmit={handleInitiateTopic} className="space-y-3">
                {/* Clinical Safety Notice */}
                <div className="rounded-xl border border-teal-200/90 bg-teal-50/60 p-3 text-xs text-teal-900 space-y-1">
                  <span className="font-bold flex items-center gap-1.5 text-teal-800">
                    <ShieldCheck className="h-4 w-4 text-teal-700" />
                    Expert Verification Protocol
                  </span>
                  <p className="text-teal-800/90 text-[11px] leading-relaxed">
                    To maintain clinical neutrality and protect patient safety, every initiated topic is audited by a healthremade verified expert before going live to the public.
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-2.5 text-xs text-slate-600 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5 text-teal-700" />
                    <span>Initiating as: <strong>{anonymousName}</strong></span>
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setIsInitiateModalOpen(false)
                      setIsEditingAlias(true)
                    }}
                    className="text-teal-700 hover:underline font-medium text-[11px]"
                  >
                    Change
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Topic Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-medium text-slate-800 focus:outline-hidden focus:border-teal-500 bg-white"
                  >
                    <option value="cardiac">Cardiac & Heart Surgery</option>
                    <option value="orthopaedics">Knee & Joint Replacement</option>
                    <option value="transplant">Organ Transplants</option>
                    <option value="oncology">Cancer Care</option>
                    <option value="visas">Visas & Travel Logistics</option>
                    <option value="costs">Hospital Bills & Package Costs</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Topic Discussion Title</label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Total knee replacement recovery timeline or Kenyan visa processing..."
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-900 focus:outline-hidden focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Details &amp; Specific Questions</label>
                  <textarea
                    rows={4}
                    required
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    placeholder="Describe symptoms, procedure questions, hospital quotes, or specific clinical doubts..."
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-900 focus:outline-hidden focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Your Country of Origin (Optional)</label>
                  <input
                    type="text"
                    value={newCountry}
                    onChange={(e) => setNewCountry(e.target.value)}
                    placeholder="e.g. United Kingdom, Kenya, UAE"
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-900 focus:outline-hidden focus:border-teal-500"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsInitiateModalOpen(false)}
                    className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 rounded-xl bg-teal-700 hover:bg-teal-800 active:scale-95 px-5 py-2 text-xs font-semibold text-white shadow-2xs"
                  >
                    <Send className="h-3 w-3" />
                    <span>Submit Topic for Expert Verification</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ─── Modal 2: Change Anonymous Alias ───────────────────────── */}
      {isEditingAlias && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-xl space-y-3.5 border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-sm font-bold text-slate-900">Your Anonymous Alias</h3>
              <button
                onClick={() => setIsEditingAlias(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              You can choose any anonymous name or generate a fresh one. Your privacy is fully preserved.
            </p>

            <input
              type="text"
              value={tempAlias}
              onChange={(e) => setTempAlias(e.target.value)}
              placeholder="e.g. Anonymous Traveler #482"
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-medium text-slate-900 focus:outline-hidden focus:border-teal-500"
            />

            <div className="flex items-center justify-between pt-1">
              <button
                type="button"
                onClick={handleRegenerateAlias}
                className="inline-flex items-center gap-1 text-xs text-teal-700 hover:text-teal-800 font-medium"
              >
                <RefreshCw className="h-3 w-3" />
                <span>Random Alias</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditingAlias(false)}
                  className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveAlias}
                  className="rounded-lg bg-teal-700 hover:bg-teal-800 text-white px-3.5 py-1.5 text-xs font-semibold"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
