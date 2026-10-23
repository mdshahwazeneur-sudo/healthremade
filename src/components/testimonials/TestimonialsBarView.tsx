'use client'

import React, { useState, useMemo, useRef } from 'react'
import Link from 'next/link'
import {
  Play,
  FileText,
  MessageCircle,
  Star,
  Building2,
  CheckCircle2,
  ShieldCheck,
  Search,
  Filter,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ArrowLeft,
  Share2,
  Calendar,
  Globe,
  Award,
} from 'lucide-react'
import { PATIENT_TESTIMONIALS, type PatientTestimonial, type SubtitleCue } from '@/data/testimonialsData'
import { useActiveLanguage, SUPPORTED_LANGUAGES } from '@/components/ui/LanguageSelector'
import { useQuote } from '@/components/ui/QuoteModal'
import { useAdminData } from '@/context/AdminDataContext'
import { getWhatsAppUrl } from '@/lib/whatsapp'
import { Badge, Button, Card, CardContent } from '@/components/ui/primitives'
import { parseVideoEmbedUrl, getVideoPosterUrl } from '@/components/testimonials/VideoTestimonialPlayer'

interface TestimonialsBarViewProps {
  initialStoryId?: string
  showHeroSection?: boolean
}

export function TestimonialsBarView({ initialStoryId, showHeroSection = false }: TestimonialsBarViewProps) {
  const activeLangCode = useActiveLanguage()
  const { openQuoteModal } = useQuote()

  // Retrieve testimonials from persistent Admin context or fallback to static data
  let allTestimonials = PATIENT_TESTIMONIALS
  try {
    const adminCtx = useAdminData()
    if (adminCtx && adminCtx.videoTestimonials && adminCtx.videoTestimonials.length > 0) {
      allTestimonials = adminCtx.videoTestimonials
    }
  } catch {
    allTestimonials = PATIENT_TESTIMONIALS
  }

  // Active Story selection state (null = list/bar view, or id = full detail view)
  const [activeStoryId, setActiveStoryId] = useState<string | null>(initialStoryId || null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all')
  const [selectedCountry, setSelectedCountry] = useState<string>('all')
  const [showFullTranscript, setShowFullTranscript] = useState(false)

  const detailViewRef = useRef<HTMLDivElement>(null)

  // Active story object
  const activeStory = useMemo(() => {
    if (!activeStoryId) return null
    return allTestimonials.find((t) => t.id === activeStoryId) || allTestimonials[0]
  }, [activeStoryId, allTestimonials])

  // Extract unique specialties and countries for filters
  const filterOptions = useMemo(() => {
    const specs = Array.from(new Set(allTestimonials.map((t) => t.specialty))).filter(Boolean)
    const countries = Array.from(new Set(allTestimonials.map((t) => t.country))).filter(Boolean)
    return { specialties: specs, countries }
  }, [allTestimonials])

  // Filtered stories in list mode
  const filteredStories = useMemo(() => {
    return allTestimonials.filter((t) => {
      const matchSearch =
        !searchQuery ||
        (t.title && t.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
        t.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.procedure.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.hospitalName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.country.toLowerCase().includes(searchQuery.toLowerCase())

      const matchSpecialty =
        selectedSpecialty === 'all' ||
        t.specialty.toLowerCase() === selectedSpecialty.toLowerCase()

      const matchCountry =
        selectedCountry === 'all' ||
        t.country.toLowerCase() === selectedCountry.toLowerCase()

      return matchSearch && matchSpecialty && matchCountry
    })
  }, [allTestimonials, searchQuery, selectedSpecialty, selectedCountry])

  // Suggestions for the active story (Vaidam Health inspiration)
  // Recommended stories: same specialty first, then other top rated stories
  const suggestedStories = useMemo(() => {
    if (!activeStory) return []
    const others = allTestimonials.filter((t) => t.id !== activeStory.id)

    // Sort by same specialty or same country first
    return others.sort((a, b) => {
      const aSameSpec = a.specialty === activeStory.specialty ? 1 : 0
      const bSameSpec = b.specialty === activeStory.specialty ? 1 : 0
      return bSameSpec - aSameSpec
    })
  }, [activeStory, allTestimonials])

  const openStoryDetails = (storyId: string) => {
    setActiveStoryId(storyId)
    setShowFullTranscript(false)
    setTimeout(() => {
      if (detailViewRef.current) {
        detailViewRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 50)
  }

  const closeStoryDetails = () => {
    setActiveStoryId(null)
    setShowFullTranscript(false)
  }

  // Active language info
  const activeLangObj =
    SUPPORTED_LANGUAGES.find((l) => l.code === activeLangCode) || SUPPORTED_LANGUAGES[0]

  // Video embed info for active story
  const videoMeta = activeStory
    ? parseVideoEmbedUrl(activeStory.videoUrl || activeStory.fallbackVideoUrl || '')
    : { type: 'direct', embedUrl: '' }

  const localizedQuote = activeStory
    ? activeStory.quote?.[activeLangCode] || activeStory.quote?.['en'] || ''
    : ''

  const currentCues: SubtitleCue[] = activeStory
    ? activeStory.subtitles?.[activeLangCode] || activeStory.subtitles?.['en'] || []
    : []

  const fullTranscriptText = activeStory
    ? activeStory.transcript ||
      (currentCues.length > 0
        ? currentCues.map((c) => c.text).join(' ')
        : activeStory.fullStory?.[activeLangCode] || activeStory.fullStory?.['en'] || localizedQuote)
    : ''

  const waUrl = activeStory
    ? getWhatsAppUrl({
        pageType: 'treatment',
        treatmentName: activeStory.procedure,
        hospitalName: activeStory.hospitalName,
        customMessage: `Hello healthremade! I watched the video story of ${activeStory.patientName} (${activeStory.procedure} at ${activeStory.hospitalName}) and would like to get cost quotes and surgeon opinion.`,
      })
    : getWhatsAppUrl({ pageType: 'home' })

  return (
    <div className="w-full space-y-8" ref={detailViewRef}>
      {/* ─── FULL DETAILS THEATRE VIEW (WHEN A STORY BAR IS CLICKED) ──── */}
      {activeStory ? (
        <div className="space-y-10 animate-in fade-in duration-300">
          {/* Top navigation bar */}
          <div className="flex items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-4 rounded-2xl">
            <button
              onClick={closeStoryDetails}
              className="inline-flex items-center gap-2 text-xs font-bold text-white hover:text-brand-400 bg-slate-800 hover:bg-slate-700 px-3.5 py-2 rounded-xl transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>← Back to All Stories</span>
            </button>
            <div className="flex items-center gap-2 text-xs text-slate-400 truncate max-w-md hidden sm:flex">
              <span>Patient Stories</span>
              <span>/</span>
              <span className="text-white font-medium truncate">{activeStory.patientName}</span>
              <span>({activeStory.country})</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-bold">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Verified Clinical Outcome
              </span>
            </div>
          </div>

          {/* Prominent Case Title Header */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="text-2xl">{activeStory.countryFlag}</span>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-400 bg-brand-950/80 border border-brand-800/60 px-2.5 py-1 rounded-lg">
                {activeStory.specialty}
              </span>
              <span className="text-xs text-slate-400">
                {activeStory.city}, {activeStory.country} • Treated {activeStory.treatmentDate}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              {activeStory.title || `${activeStory.patientName}: ${activeStory.procedure} at ${activeStory.hospitalName}`}
            </h1>
          </div>

          {/* Main Showcase Layout: Video on Left, Case Profile on Right */}
          <div className="bg-slate-950 rounded-3xl p-5 sm:p-8 text-white border border-slate-800 shadow-2xl space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Video Embed & Transcript Container */}
              <div className="lg:col-span-7 space-y-4">
                <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-inner group">
                  {videoMeta.type === 'youtube' || videoMeta.type === 'vimeo' ? (
                    <iframe
                      src={videoMeta.embedUrl}
                      title={activeStory.title || `${activeStory.patientName} Video Story`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="w-full h-full border-0"
                    />
                  ) : (
                    <video
                      controls
                      poster={getVideoPosterUrl(activeStory.videoUrl, activeStory.posterUrl)}
                      src={videoMeta.embedUrl}
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  )}

                  {/* Trust Badge overlay */}
                  <div className="absolute top-3 left-3 flex items-center gap-2 pointer-events-none">
                    <span className="inline-flex items-center gap-1 bg-slate-950/85 backdrop-blur-md text-[10px] font-bold text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded-full">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      Verified Video Record
                    </span>
                    <span className="inline-flex items-center gap-1 bg-brand-950/85 backdrop-blur-md text-[10px] font-bold text-brand-300 border border-brand-500/30 px-2.5 py-1 rounded-full">
                      <Globe className="h-3 w-3" />
                      Audio / Subtitles: {activeLangObj.name}
                    </span>
                  </div>
                </div>

                {/* Video metadata row */}
                <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 px-1">
                  <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                    <CheckCircle2 className="h-3.5 w-3.5" /> JCI & NABH Hospital Verified Record
                  </span>
                  <span>Recorded on location in Delhi NCR</span>
                </div>

                {/* ─── Synchronized Video Transcript Box ─── */}
                <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 space-y-3 mt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-brand-400" />
                      <h4 className="text-sm font-bold text-white">Full Video Transcript</h4>
                      <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">
                        {activeLangObj.name}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowFullTranscript(!showFullTranscript)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-brand-400 hover:text-brand-300 transition-colors"
                    >
                      <span>{showFullTranscript ? 'Collapse' : 'Show Full Transcript'}</span>
                      {showFullTranscript ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                    </button>
                  </div>

                  <div
                    className={`text-xs text-slate-300 leading-relaxed space-y-2 transition-all ${
                      showFullTranscript ? 'max-h-none' : 'max-h-24 overflow-hidden relative'
                    }`}
                  >
                    {currentCues.length > 0 ? (
                      <div className="space-y-2.5">
                        {currentCues.map((cue) => (
                          <div key={cue.id} className="flex items-start gap-3">
                            <span className="text-[10px] font-mono text-slate-500 bg-slate-950 px-1.5 py-0.5 rounded shrink-0">
                              {Math.floor(cue.startTime)}s
                            </span>
                            <p className="text-slate-300">{cue.text}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-slate-300 leading-relaxed">{fullTranscriptText}</p>
                    )}

                    {!showFullTranscript && (
                      <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none" />
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column: Case Details & Clinical Journey */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
                <div className="space-y-4">
                  {/* Patient Header Card */}
                  <div className="flex items-center justify-between bg-slate-900/90 border border-slate-800 p-4 rounded-2xl">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{activeStory.countryFlag}</span>
                      <div>
                        <h3 className="text-lg font-black text-white">{activeStory.patientName}</h3>
                        <p className="text-xs text-slate-400">
                          {activeStory.city}, {activeStory.country} • Age {activeStory.age}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="inline-block bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-1 rounded-lg text-xs font-bold">
                        {activeStory.costSavedUsd}
                      </span>
                      <div className="text-[10px] text-slate-400 mt-0.5 font-medium">
                        {activeStory.savingsPercentage}% Saved vs Home
                      </div>
                    </div>
                  </div>

                  {/* Procedure & Doctor Card */}
                  <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-4 space-y-2.5">
                    <div className="text-xs font-bold text-brand-400 uppercase tracking-wider">
                      {activeStory.specialty}
                    </div>
                    <div className="text-base font-bold text-white leading-snug">
                      {activeStory.procedure}
                    </div>
                    <div className="text-xs text-slate-300 flex items-center gap-2 pt-2 border-t border-slate-800">
                      <Building2 className="h-4 w-4 text-slate-400 shrink-0" />
                      <span>{activeStory.hospitalName}</span>
                    </div>
                    <div className="text-xs text-slate-300 flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                      <span>Treating Chief Doctor: <strong className="text-white">{activeStory.doctorName}</strong></span>
                    </div>
                  </div>

                  {/* Clinical Description & Medical Case Story */}
                  {activeStory.description && (
                    <div className="rounded-2xl bg-emerald-950/20 border border-emerald-500/30 p-4 text-xs space-y-2">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                        <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
                        <span>Case Background & Clinical Journey</span>
                      </div>
                      <p className="text-slate-300 leading-relaxed text-xs">
                        {activeStory.description}
                      </p>
                    </div>
                  )}

                  {/* Patient Review Quote Card */}
                  <div className="rounded-2xl bg-gradient-to-br from-brand-950/60 to-slate-900 border border-brand-800/40 p-4 text-xs space-y-2">
                    <div className="flex items-center gap-1 text-amber-400 font-bold">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <span className="text-slate-300 ml-1.5 font-medium">5.0 Star Verified Patient Rating</span>
                    </div>
                    <p className="text-slate-200 leading-relaxed italic">
                      &ldquo;{localizedQuote}&rdquo;
                    </p>
                  </div>
                </div>

                {/* Direct Action CTAs */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Button
                    variant="accent"
                    size="md"
                    onClick={() => openQuoteModal({ treatment: activeStory.procedure })}
                    className="w-full justify-center font-bold shadow-md"
                  >
                    <FileText className="h-4 w-4 mr-1.5" />
                    Get Quote for This Treatment
                  </Button>
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] text-white px-4 py-2.5 text-xs font-bold hover:bg-[#1EBE5D] transition-colors shadow-md w-full sm:w-auto shrink-0"
                  >
                    <MessageCircle className="h-4 w-4 fill-white" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* ─── SUGGESTIONS TESTIMONIALS BELOW (VAIDAM HEALTH INSPIRATION) ─── */}
          <div className="pt-8 border-t border-slate-200 dark:border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
              <div>
                <div className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1">
                  <Award className="h-3.5 w-3.5" />
                  <span>Similar Patient Journeys</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  Recommended Patient Stories & Outcomes
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                  Explore other international patient outcomes in {activeStory.specialty} and top Indian hospitals.
                </p>
              </div>

              <button
                onClick={closeStoryDetails}
                className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline inline-flex items-center gap-1 self-start sm:self-auto"
              >
                <span>View all {allTestimonials.length} stories</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Suggestions Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {suggestedStories.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  onClick={() => openStoryDetails(item.id)}
                  className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-brand-500 dark:hover:border-brand-500 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    {/* Poster thumbnail with play badge */}
                    <div className="relative h-44 w-full bg-slate-950 overflow-hidden">
                      <img
                        src={getVideoPosterUrl(item.videoUrl, item.posterUrl)}
                        alt={item.patientName}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1200&q=80'
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                      <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-bold text-white border border-white/10">
                        <span>{item.countryFlag}</span>
                        <span>{item.country}</span>
                      </div>
                      <div className="absolute top-2.5 right-2.5 bg-emerald-500 text-slate-950 text-[10px] font-extrabold px-2 py-0.5 rounded-md">
                        {item.costSavedUsd}
                      </div>

                      {/* Center Play Button Icon */}
                      <div className="absolute inset-0 m-auto flex h-11 w-11 items-center justify-center rounded-full bg-brand-600/90 group-hover:bg-brand-500 text-white shadow-lg group-hover:scale-110 transition-all">
                        <Play className="h-4 w-4 fill-white ml-0.5" />
                      </div>
                    </div>

                    <div className="p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/80 px-2 py-0.5 rounded">
                          {item.specialty}
                        </span>
                        <span className="text-[11px] text-slate-400">{item.city}</span>
                      </div>

                      <h4 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                        {item.title || `${item.patientName}: ${item.procedure}`}
                      </h4>

                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {item.hospitalName} • {item.doctorName}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 pt-0 border-t border-slate-100 dark:border-slate-800/80 mt-2 flex items-center justify-between text-xs text-brand-600 dark:text-brand-400 font-bold group-hover:translate-x-0.5 transition-transform">
                    <span>Watch Full Story & Details</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* ─── BAR FORM TESTIMONIALS LIST (VAIDAM-STYLE TITLE-FIRST BARS) ─── */
        <div className="space-y-6">
          {/* Filter Bar with Search, Specialty, and Country */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 sm:p-5 rounded-2xl shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search input */}
              <div className="relative flex-1">
                <Search className="h-4 w-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Search by case title, procedure, doctor, hospital, or country..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-brand-500"
                />
              </div>

              {/* Country dropdown */}
              <div className="w-full sm:w-48">
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
                >
                  <option value="all">All Countries</option>
                  {filterOptions.countries.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Specialty Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              <button
                onClick={() => setSelectedSpecialty('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
                  selectedSpecialty === 'all'
                    ? 'bg-brand-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                All Specialties ({allTestimonials.length})
              </button>
              {filterOptions.specialties.map((spec) => (
                <button
                  key={spec}
                  onClick={() => setSelectedSpecialty(spec)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
                    selectedSpecialty === spec
                      ? 'bg-brand-600 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {spec}
                </button>
              ))}
            </div>
          </div>

          {/* Results Count Header */}
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
            <span>
              Showing <strong>{filteredStories.length}</strong> patient outcome video stories
            </span>
            {(searchQuery || selectedSpecialty !== 'all' || selectedCountry !== 'all') && (
              <button
                onClick={() => {
                  setSearchQuery('')
                  setSelectedSpecialty('all')
                  setSelectedCountry('all')
                }}
                className="text-brand-600 dark:text-brand-400 hover:underline font-semibold"
              >
                Reset filters
              </button>
            )}
          </div>

          {/* ─── VERTICAL STACK OF TESTIMONIAL BARS (TITLE-FIRST) ─── */}
          <div className="space-y-4">
            {filteredStories.map((story) => (
              <div
                key={story.id}
                onClick={() => openStoryDetails(story.id)}
                className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-brand-500 dark:hover:border-brand-500 rounded-2xl p-4 sm:p-5 shadow-xs hover:shadow-xl transition-all cursor-pointer flex flex-col md:flex-row items-start md:items-center justify-between gap-5"
              >
                {/* Left/Middle Column: Thumbnail + Title & Case Details */}
                <div className="flex items-start sm:items-center gap-4 flex-1 w-full">
                  {/* Thumbnail Bar with Play Icon */}
                  <div className="relative h-20 w-28 sm:h-24 sm:w-36 rounded-xl overflow-hidden bg-slate-950 shrink-0 shadow-inner group-hover:ring-2 group-hover:ring-brand-500 transition-all">
                    <img
                      src={getVideoPosterUrl(story.videoUrl, story.posterUrl)}
                      alt={story.patientName}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1200&q=80'
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                    <div className="absolute inset-0 m-auto flex h-8 w-8 items-center justify-center rounded-full bg-brand-600/90 group-hover:bg-brand-500 text-white shadow-md">
                      <Play className="h-3.5 w-3.5 fill-white ml-0.5" />
                    </div>
                    <div className="absolute bottom-1 right-1 bg-slate-950/80 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                      Video Story
                    </div>
                  </div>

                  {/* Main Content: Title, Tags & Description Snippet */}
                  <div className="space-y-1.5 flex-1 min-w-0">
                    {/* Micro Tags */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-base">{story.countryFlag}</span>
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        {story.patientName}
                      </span>
                      <span className="text-xs text-slate-400">• {story.country}</span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/80 px-2 py-0.5 rounded">
                        {story.specialty}
                      </span>
                      <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded hidden sm:inline-block">
                        ✓ Verified Outcome
                      </span>
                    </div>

                    {/* Prominent Case Title (Title First) */}
                    <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors leading-snug line-clamp-2">
                      {story.title || `${story.patientName} from ${story.country}: ${story.procedure}`}
                    </h3>

                    {/* Description or Quote Snippet */}
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 leading-relaxed">
                      {story.description || story.quote?.['en'] || story.procedure}
                    </p>

                    {/* Hospital & Doctor Info */}
                    <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400 pt-0.5">
                      <span className="flex items-center gap-1">
                        <Building2 className="h-3 w-3 text-slate-400" />
                        <span>{story.hospitalName}</span>
                      </span>
                      <span>•</span>
                      <span>Treating Doctor: <strong className="text-slate-700 dark:text-slate-300">{story.doctorName}</strong></span>
                    </div>
                  </div>
                </div>

                {/* Right Column: Savings Badge & Click Action Button */}
                <div className="flex items-center justify-between sm:justify-end gap-4 w-full md:w-auto shrink-0 border-t md:border-t-0 border-slate-100 dark:border-slate-800/80 pt-3 md:pt-0">
                  <div className="text-left md:text-right">
                    <span className="inline-block bg-emerald-500/15 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 px-2.5 py-1 rounded-lg text-xs font-bold">
                      {story.costSavedUsd}
                    </span>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      {story.savingsPercentage}% Saved vs Home
                    </div>
                  </div>

                  <button
                    onClick={() => openStoryDetails(story.id)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-50 hover:bg-brand-100 dark:bg-brand-950/60 dark:hover:bg-brand-900 text-brand-700 dark:text-brand-300 text-xs font-bold transition-all group-hover:scale-102"
                  >
                    <span>View Details</span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}

            {filteredStories.length === 0 && (
              <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 space-y-3">
                <Search className="h-10 w-10 text-slate-400 mx-auto" />
                <h4 className="text-base font-bold text-slate-900 dark:text-white">No patient stories found</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                  Try adjusting your search terms, medical specialty filter, or country dropdown.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedSpecialty('all')
                    setSelectedCountry('all')
                  }}
                  className="px-4 py-2 rounded-xl bg-brand-600 text-white text-xs font-bold hover:bg-brand-500"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
