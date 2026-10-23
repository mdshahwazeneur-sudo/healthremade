'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  FileText,
  MessageCircle,
  Star,
  Building2,
  CheckCircle2,
  ShieldCheck,
  Subtitles,
  ChevronDown,
  ChevronUp,
  Quote,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { PATIENT_TESTIMONIALS, type PatientTestimonial, type SubtitleCue } from '@/data/testimonialsData'
import { useActiveLanguage, SUPPORTED_LANGUAGES } from '@/components/ui/LanguageSelector'
import { useQuote } from '@/components/ui/QuoteModal'
import { useAdminData } from '@/context/AdminDataContext'
import { getWhatsAppUrl } from '@/lib/whatsapp'
import { Badge, Button } from '@/components/ui/primitives'

// Robust YouTube Video ID Extractor (supports all formats, query params, shorts, live, embed, youtu.be, m.youtube)
export function extractYouTubeId(url: string): string | null {
  if (!url) return null
  const cleanUrl = url.trim()
  if (/^[a-zA-Z0-9_-]{11}$/.test(cleanUrl)) {
    return cleanUrl
  }
  // Try regex patterns for standard, embed, shorts, live, youtu.be
  const regExp = /(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/|live\/))([\w-]{11})/i
  const match = cleanUrl.match(regExp)
  if (match && match[1]) {
    return match[1]
  }
  // Fallback via URL query parameter v=
  try {
    const urlObj = new URL(cleanUrl.startsWith('http') ? cleanUrl : `https://${cleanUrl}`)
    const v = urlObj.searchParams.get('v')
    if (v && v.length === 11) return v
  } catch {}

  // Last ditch regex: any 11 char ID preceded by standard markers
  const lastDitch = /(?:v=|vi=|youtu\.be\/|embed\/|\/v\/|\/e\/|shorts\/)([\w-]{11})/i
  const lastMatch = cleanUrl.match(lastDitch)
  return lastMatch ? lastMatch[1] : null
}

// Parse YouTube / Vimeo / MP4
export function parseVideoEmbedUrl(url: string, autoPlay: boolean = false): { type: 'youtube' | 'vimeo' | 'direct'; embedUrl: string } {
  if (!url) return { type: 'direct', embedUrl: '' }

  const ytId = extractYouTubeId(url)
  if (ytId) {
    return {
      type: 'youtube',
      embedUrl: `https://www.youtube-nocookie.com/embed/${ytId}?autoplay=${autoPlay ? 1 : 0}&rel=0&modestbranding=1`,
    }
  }

  // Vimeo match
  const vimeoRegex = /vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)/
  const vimeoMatch = url.match(vimeoRegex)
  if (vimeoMatch && vimeoMatch[3]) {
    return {
      type: 'vimeo',
      embedUrl: `https://player.vimeo.com/video/${vimeoMatch[3]}?autoplay=${autoPlay ? 1 : 0}`,
    }
  }

  return { type: 'direct', embedUrl: url }
}

// Extract YouTube Thumbnail from URL (Canonical high-resolution thumbnail)
export function getYouTubeThumbnail(url: string): string | null {
  const id = extractYouTubeId(url)
  if (id) {
    return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
  }
  return null
}

// Get effective poster image with automatic YouTube thumbnail fallback and self-healing
export function getVideoPosterUrl(videoUrl?: string, customPoster?: string): string {
  // If customPoster is provided, sanitize blocked img.youtube.com to canonical i.ytimg.com
  if (customPoster && customPoster.trim() !== '') {
    const trimmed = customPoster.trim()
    if (trimmed.includes('img.youtube.com')) {
      return trimmed.replace('img.youtube.com', 'i.ytimg.com')
    }
    // If it's a real custom image that isn't the unsplash fallback, use it
    if (!trimmed.includes('unsplash.com')) {
      return trimmed
    }
  }

  // Derive thumbnail from videoUrl if available
  if (videoUrl) {
    const ytThumb = getYouTubeThumbnail(videoUrl)
    if (ytThumb) return ytThumb
  }

  if (customPoster && customPoster.trim() !== '') return customPoster.trim()
  return 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1200&q=80'
}

export function VideoTestimonialPlayer() {
  const activeLangCode = useActiveLanguage()
  const { openQuoteModal } = useQuote()

  // Safely access admin context or fallback to static
  let stories = PATIENT_TESTIMONIALS
  try {
    const adminCtx = useAdminData()
    if (adminCtx && adminCtx.videoTestimonials && adminCtx.videoTestimonials.length > 0) {
      stories = adminCtx.videoTestimonials
    }
  } catch {
    stories = PATIENT_TESTIMONIALS
  }

  const [selectedStoryIndex, setSelectedStoryIndex] = useState(0)
  const currentStory = stories[selectedStoryIndex] || stories[0]

  // Playback state (defaults to false so video NEVER plays on its own)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showFullTranscript, setShowFullTranscript] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  // When story changes, make sure video does NOT start playing on its own
  const handleSelectStory = (idx: number) => {
    setSelectedStoryIndex(idx)
    setIsPlaying(false)
    if (videoRef.current) {
      videoRef.current.currentTime = 0
      videoRef.current.pause()
    }
  }

  const handlePrev = () => {
    handleSelectStory(selectedStoryIndex > 0 ? selectedStoryIndex - 1 : stories.length - 1)
  }

  const handleNext = () => {
    handleSelectStory(selectedStoryIndex < stories.length - 1 ? selectedStoryIndex + 1 : 0)
  }

  // Language info
  const activeLangObj =
    SUPPORTED_LANGUAGES.find((l) => l.code === activeLangCode) || SUPPORTED_LANGUAGES[0]

  // Translated quote & transcript
  const localizedQuote =
    currentStory.quote?.[activeLangCode] || currentStory.quote?.['en'] || ''

  // Subtitles / Cues
  const currentCues: SubtitleCue[] =
    currentStory.subtitles?.[activeLangCode] || currentStory.subtitles?.['en'] || []

  // Full transcript text
  const fullTranscriptText =
    currentStory.transcript ||
    (currentCues.length > 0
      ? currentCues.map((c) => c.text).join(' ')
      : currentStory.fullStory?.[activeLangCode] || currentStory.fullStory?.['en'] || localizedQuote)

  const videoMeta = parseVideoEmbedUrl(
    currentStory.videoUrl || currentStory.fallbackVideoUrl || '',
    isPlaying
  )

  const togglePlay = () => {
    if (!videoRef.current) return
    if (isPlaying) {
      videoRef.current.pause()
      setIsPlaying(false)
    } else {
      videoRef.current.play()
      setIsPlaying(true)
    }
  }

  const waUrl = getWhatsAppUrl({
    pageType: 'treatment',
    treatmentName: currentStory.procedure,
    hospitalName: currentStory.hospitalName,
    customMessage: `Hello healthremade! I watched the video story of ${currentStory.patientName} (${currentStory.procedure} at ${currentStory.hospitalName}) and would like to get cost quotes and doctor consultation in India.`,
  })

  return (
    <div className="w-full space-y-6">
      {/* ─── Auto-sliding Testimonials Marquee (Slides left, pauses on touch & hover) ─── */}
      <div className="space-y-2.5">
        <style>{`
          @keyframes slideLeftContinuous {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(-100% / 3)); }
          }
          .animate-testimonials-slide {
            animation: slideLeftContinuous 45s linear infinite;
          }
          .paused-slide {
            animation-play-state: paused !important;
          }
        `}</style>

        {/* Carousel Header with Navigation Controls */}
        <div className="flex items-center justify-between px-1 text-xs">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
              <Sparkles className="h-3 w-3" /> Verified Stories
            </span>
            <span className="text-[11px] text-slate-400">
              ✦ Auto-sliding • Touch or hover to pause
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handlePrev}
              className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Previous patient story"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Next patient story"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Continuous Auto-sliding Bar */}
        <div
          className="relative w-full overflow-hidden rounded-2xl bg-slate-950/70 border border-slate-800/80 py-2.5 select-none"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          {/* Edge gradients */}
          <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />

          <div
            className={`flex items-center gap-3 w-max animate-testimonials-slide ${
              isPaused ? 'paused-slide' : ''
            }`}
          >
            {[...stories, ...stories, ...stories].map((testimonial, idx) => {
              const realIndex = idx % stories.length
              const isSelected = selectedStoryIndex === realIndex
              return (
                <button
                  key={`${testimonial.id}-${idx}`}
                  type="button"
                  onClick={() => handleSelectStory(realIndex)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl border text-left transition-all shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-brand-900/90 border-brand-500 text-white shadow-md ring-2 ring-brand-400/60'
                      : 'bg-slate-900/90 border-slate-800 text-slate-300 hover:bg-slate-800 hover:border-slate-700'
                  }`}
                >
                  <span className="text-xl sm:text-2xl leading-none shrink-0">{testimonial.countryFlag}</span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className={`text-xs font-bold truncate ${isSelected ? 'text-white' : 'text-slate-100'}`}>
                        {testimonial.patientName}
                      </span>
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-1.5 py-0.2 rounded font-bold shrink-0">
                        {testimonial.costSavedUsd}
                      </span>
                    </div>
                    <p className={`text-[11px] truncate max-w-[170px] ${isSelected ? 'text-slate-300' : 'text-slate-400'}`}>
                      {testimonial.procedure}
                    </p>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* ─── Main Video Player Card ─────── */}
      <div className="bg-slate-950 rounded-3xl p-5 sm:p-8 text-white border border-slate-800 shadow-2xl overflow-hidden space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: YouTube / Video Embed (Click-to-Play, NO Autoplay on its own) */}
          <div className="lg:col-span-7 space-y-3">
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-inner group">
              {isPlaying && (videoMeta.type === 'youtube' || videoMeta.type === 'vimeo') ? (
                <iframe
                  src={parseVideoEmbedUrl(currentStory.videoUrl || currentStory.fallbackVideoUrl || '', true).embedUrl}
                  title={`${currentStory.patientName} Video Story`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              ) : isPlaying && videoMeta.type === 'direct' ? (
                <video
                  ref={videoRef}
                  poster={getVideoPosterUrl(currentStory.videoUrl, currentStory.posterUrl)}
                  src={videoMeta.embedUrl}
                  playsInline
                  autoPlay
                  controls
                  className="w-full h-full object-cover"
                />
              ) : (
                /* Cover Poster with Play Button — Zero Autoplay */
                <div
                  className="relative w-full h-full cursor-pointer group/poster overflow-hidden"
                  onClick={() => setIsPlaying(true)}
                  title={`Click to watch ${currentStory.patientName}'s video story`}
                >
                  <img
                    src={getVideoPosterUrl(currentStory.videoUrl, currentStory.posterUrl)}
                    alt={`${currentStory.patientName} Video Story`}
                    className="w-full h-full object-cover group-hover/poster:scale-105 transition-transform duration-300 opacity-90"
                    onError={(e) => {
                      e.currentTarget.src =
                        'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1200&q=80'
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-slate-950/20" />

                  {/* Pulsing Center Play Button */}
                  <div className="absolute inset-0 m-auto flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-brand-600/90 text-white shadow-2xl group-hover/poster:scale-110 group-hover/poster:bg-brand-500 transition-all z-20">
                    <Play className="h-8 w-8 sm:h-9 sm:w-9 fill-white ml-1" />
                  </div>

                  {/* Bottom quick callout */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white z-10 pointer-events-none">
                    <span className="font-semibold drop-shadow-md">
                      Click to watch {currentStory.patientName}&apos;s story
                    </span>
                    <span className="bg-emerald-600/95 text-white font-extrabold px-2 py-0.5 rounded text-[11px] shadow-sm">
                      {currentStory.costSavedUsd}
                    </span>
                  </div>
                </div>
              )}

              {/* Verified Patient Story Badge */}
              <div className="absolute top-3 left-3 flex items-center gap-2 pointer-events-none z-20">
                <span className="inline-flex items-center gap-1 bg-slate-950/85 backdrop-blur-md text-[10px] font-bold text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded-full">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Verified Patient Story
                </span>
                <span className="inline-flex items-center gap-1 bg-brand-950/85 backdrop-blur-md text-[10px] font-bold text-brand-300 border border-brand-500/30 px-2.5 py-1 rounded-full">
                  <Subtitles className="h-3 w-3" />
                  Transcript: {activeLangObj.name} ({activeLangObj.flag})
                </span>
              </div>
            </div>

            {/* Micro Trust Indicators under video */}
            <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 pt-1">
              <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                <CheckCircle2 className="h-3.5 w-3.5" /> JCI & NABH Hospital Verified Record
              </span>
              <span>Filmed on location in Delhi NCR</span>
            </div>
          </div>

          {/* Right Column: Patient Details & Case Summary */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-3xl">{currentStory.countryFlag}</span>
                  <div>
                    <h3 className="text-xl font-black text-white">{currentStory.patientName}</h3>
                    <p className="text-xs text-slate-400">
                      {currentStory.city}, {currentStory.country} • Age {currentStory.age}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="inline-block bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-1 rounded-lg text-xs font-bold">
                    {currentStory.costSavedUsd}
                  </span>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    Saved {currentStory.savingsPercentage}% vs Home
                  </div>
                </div>
              </div>

              {/* Procedure & Doctor Trust Card */}
              <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-4 space-y-2">
                <div className="text-xs font-bold text-brand-400 uppercase tracking-wider">
                  {currentStory.specialty}
                </div>
                <div className="text-sm font-bold text-white">{currentStory.procedure}</div>
                <div className="text-xs text-slate-300 flex items-center gap-1.5 pt-1 border-t border-slate-800">
                  <Building2 className="h-3.5 w-3.5 text-slate-400" />
                  <span>{currentStory.hospitalName}</span>
                </div>
                <div className="text-xs text-slate-300 flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Treating Doctor: <strong className="text-white">{currentStory.doctorName}</strong></span>
                </div>
              </div>

              {/* Patient Case Description */}
              {currentStory.description && (
                <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-4 text-xs space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                    <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Case Background & Clinical Story</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed text-[11px]">
                    {currentStory.description}
                  </p>
                </div>
              )}

              {/* Patient Quote Callout */}
              <div className="rounded-2xl bg-gradient-to-br from-brand-950/60 to-slate-900 border border-brand-800/40 p-4 text-xs space-y-2">
                <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span className="text-slate-300 ml-1">5.0 Star Verified Patient Rating</span>
                </div>
                <p className="text-slate-200 leading-relaxed italic">
                  &ldquo;{localizedQuote}&rdquo;
                </p>
              </div>
            </div>

            {/* Direct CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                variant="accent"
                size="md"
                onClick={() => openQuoteModal({ treatment: currentStory.procedure })}
                className="w-full justify-center font-bold shadow-md"
              >
                <FileText className="h-4 w-4 mr-1.5" />
                Get Quote for This Procedure
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

        {/* ─── Dedicated Video Transcript Card Below Video ─────────────── */}
        <div className="pt-6 border-t border-slate-800/80">
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-brand-400" />
                <h4 className="text-sm font-bold text-white">
                  Video Transcript & Patient Remarks
                </h4>
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

            {/* Synchronized Cues or Paragraph Text */}
            <div className={`text-xs text-slate-300 leading-relaxed space-y-2 transition-all ${
              showFullTranscript ? 'max-h-none' : 'max-h-24 overflow-hidden relative'
            }`}>
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
                <p className="text-slate-300">{fullTranscriptText}</p>
              )}

              {!showFullTranscript && (
                <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
