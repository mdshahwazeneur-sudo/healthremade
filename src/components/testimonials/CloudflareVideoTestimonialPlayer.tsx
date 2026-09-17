'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  CheckCircle2,
  ShieldCheck,
  Globe2,
  MessageCircle,
  FileText,
  Star,
  Clock,
  Building2,
  UserCheck,
  ChevronRight,
  Sparkles,
  Subtitles,
} from 'lucide-react'
import { PATIENT_TESTIMONIALS, type PatientTestimonial, type SubtitleCue } from '@/data/testimonialsData'
import { useActiveLanguage, SUPPORTED_LANGUAGES } from '@/components/ui/LanguageSelector'
import { useQuote } from '@/components/ui/QuoteModal'
import { getWhatsAppUrl } from '@/lib/whatsapp'
import { Button, Badge, Card, CardContent } from '@/components/ui/primitives'

export function CloudflareVideoTestimonialPlayer() {
  const activeLangCode = useActiveLanguage()
  const { openQuoteModal } = useQuote()

  const [selectedStoryIndex, setSelectedStoryIndex] = useState(0)
  const currentStory = PATIENT_TESTIMONIALS[selectedStoryIndex] || PATIENT_TESTIMONIALS[0]

  // Video playback state
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(28)
  const [isMuted, setIsMuted] = useState(false)
  const [activeCueText, setActiveCueText] = useState('')

  // Active language info
  const activeLangObj =
    SUPPORTED_LANGUAGES.find((l) => l.code === activeLangCode) || SUPPORTED_LANGUAGES[0]

  // Get localized subtitles or fallback to English
  const currentCues: SubtitleCue[] =
    currentStory.subtitles[activeLangCode] || currentStory.subtitles['en'] || []

  // Get localized quote or fallback to English
  const localizedQuote =
    currentStory.quote[activeLangCode] || currentStory.quote['en'] || ''

  // Track video time and update active subtitle cue
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleTimeUpdate = () => {
      const time = video.currentTime
      setCurrentTime(time)
      if (video.duration && !isNaN(video.duration)) {
        setDuration(video.duration)
      }

      // Find active cue in current language
      const match = currentCues.find(
        (cue) => time >= cue.startTime && time <= cue.endTime
      )
      setActiveCueText(match ? match.text : '')
    }

    const handleEnded = () => {
      setIsPlaying(false)
    }

    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('ended', handleEnded)

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('ended', handleEnded)
    }
  }, [currentCues])

  // Play/Pause toggle
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

  // Seek to cue timestamp
  const seekToTimestamp = (seconds: number) => {
    if (!videoRef.current) return
    videoRef.current.currentTime = seconds
    if (!isPlaying) {
      videoRef.current.play()
      setIsPlaying(true)
    }
  }

  // Toggle Mute
  const toggleMute = () => {
    if (!videoRef.current) return
    videoRef.current.muted = !isMuted
    setIsMuted(!isMuted)
  }

  // Handle Fullscreen
  const handleFullscreen = () => {
    if (!videoRef.current) return
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen()
    }
  }

  // WhatsApp consultation link
  const waUrl = getWhatsAppUrl({
    pageType: 'treatment',
    treatmentName: currentStory.procedure,
    hospitalName: currentStory.hospitalName,
    customMessage: `Hello healthremade! I watched the video story of ${currentStory.patientName} (${currentStory.procedure} at ${currentStory.hospitalName}) and would like to get cost quotes and a doctor appointment in India.`,
  })

  return (
    <div className="w-full space-y-8">
      
      {/* ─── Top Patient Switcher Tabs ───────────────────────────── */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {PATIENT_TESTIMONIALS.map((testimonial, idx) => {
          const isSelected = selectedStoryIndex === idx
          return (
            <button
              key={testimonial.id}
              onClick={() => {
                setSelectedStoryIndex(idx)
                setIsPlaying(false)
                if (videoRef.current) {
                  videoRef.current.currentTime = 0
                  videoRef.current.pause()
                }
              }}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl border text-left transition-all shrink-0 ${
                isSelected
                  ? 'bg-brand-900 border-brand-700 text-white shadow-lg ring-2 ring-brand-500/50'
                  : 'bg-white border-slate-200/80 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span className="text-2xl leading-none">{testimonial.countryFlag}</span>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                    {testimonial.patientName}
                  </span>
                  <span className={`text-[10px] font-semibold px-1.5 py-0.2 rounded-full ${
                    isSelected ? 'bg-emerald-400 text-slate-950 font-bold' : 'bg-emerald-50 text-emerald-700'
                  }`}>
                    {testimonial.costSavedUsd}
                  </span>
                </div>
                <p className={`text-[11px] truncate max-w-[180px] ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                  {testimonial.procedure}
                </p>
              </div>
            </button>
          )
        })}
      </div>

      {/* ─── Main Video Player & Synchronized Subtitle Console ─────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-950 rounded-3xl p-4 sm:p-6 text-white border border-slate-800 shadow-2xl overflow-hidden">
        
        {/* Left Column: Cloudflare Stream / Video Player Container */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-inner group">
            
            {/* HTML5 Video with Subtitle Tracks & Cloudflare Stream Fallback */}
            <video
              ref={videoRef}
              poster={currentStory.posterUrl}
              src={currentStory.fallbackVideoUrl}
              playsInline
              className="w-full h-full object-cover"
              onClick={togglePlay}
            />

            {/* Cloudflare Stream Badge */}
            <div className="absolute top-3 left-3 flex items-center gap-2 pointer-events-none">
              <span className="inline-flex items-center gap-1 bg-slate-950/80 backdrop-blur-md text-[10px] font-bold text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded-full">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                Cloudflare Stream HD
              </span>
              <span className="inline-flex items-center gap-1 bg-brand-950/80 backdrop-blur-md text-[10px] font-bold text-brand-300 border border-brand-500/30 px-2.5 py-1 rounded-full">
                <Subtitles className="h-3 w-3" />
                CC: {activeLangObj.name} ({activeLangObj.flag})
              </span>
            </div>

            {/* Center Play Button Overlay */}
            {!isPlaying && (
              <button
                type="button"
                onClick={togglePlay}
                className="absolute inset-0 m-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-600/90 text-white shadow-2xl hover:scale-110 hover:bg-brand-500 transition-all z-20"
                aria-label="Play Video"
              >
                <Play className="h-7 w-7 fill-white ml-1" />
              </button>
            )}

            {/* Live Subtitle Overlay Bar (Changes dynamically with global language controller) */}
            {activeCueText && (
              <div className="absolute bottom-14 inset-x-4 flex justify-center pointer-events-none z-20">
                <div className="bg-black/85 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20 text-center max-w-xl animate-in fade-in zoom-in-95">
                  <p className="text-xs sm:text-sm font-semibold text-white leading-snug drop-shadow-md">
                    {activeCueText}
                  </p>
                </div>
              </div>
            )}

            {/* Bottom Controls Bar */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-3 flex items-center justify-between gap-3 z-30">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={togglePlay}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 fill-white" />}
                </button>
                <button
                  type="button"
                  onClick={toggleMute}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </button>
                <span className="text-[11px] font-mono text-slate-300">
                  {Math.floor(currentTime)}s / {Math.floor(duration)}s
                </span>
              </div>

              {/* Progress Slider */}
              <div className="flex-1 mx-2">
                <div className="h-1.5 w-full bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brand-500 transition-all"
                    style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleFullscreen}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                  title="Fullscreen"
                >
                  <Maximize2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Patient Bio & Verified Hospital Badge */}
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">
                  {currentStory.patientName}
                </h3>
                <span className="text-xs text-slate-400">
                  ({currentStory.country} {currentStory.countryFlag})
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-950 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                  <ShieldCheck className="h-3 w-3" /> Verified Outcome
                </span>
              </div>
              <p className="text-xs text-brand-300 font-medium mt-0.5">
                {currentStory.procedure} • {currentStory.treatmentDate}
              </p>
            </div>

            <div className="flex items-center gap-1 text-amber-400 text-xs font-bold bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
              <Star className="h-3.5 w-3.5 fill-amber-400" />
              <span>5.0 / 5.0 Patient Review</span>
            </div>
          </div>
        </div>

        {/* Right Column: Synchronized Interactive Subtitles & Quick Consultation */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          
          {/* Synchronized Transcript Header */}
          <div className="bg-slate-900/90 rounded-2xl p-4 border border-slate-800/80 flex flex-col justify-between flex-1">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-3">
                <div className="flex items-center gap-1.5">
                  <Globe2 className="h-4 w-4 text-brand-400" />
                  <span className="text-xs font-bold text-white">
                    Live Subtitles & Transcript ({activeLangObj.name})
                  </span>
                </div>
                <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-md border border-emerald-500/20">
                  Auto-Synced
                </span>
              </div>

              {/* Translated Quote Highlight */}
              <blockquote className="text-xs text-slate-300 italic bg-slate-950 p-3 rounded-xl border border-slate-800 mb-3 leading-relaxed">
                &ldquo;{localizedQuote}&rdquo;
              </blockquote>

              {/* Timestamped Subtitle Cues (Interactive Click to Seek) */}
              <div className="space-y-1.5 max-h-[190px] overflow-y-auto pr-1">
                {currentCues.map((cue) => {
                  const isActive = currentTime >= cue.startTime && currentTime <= cue.endTime
                  return (
                    <button
                      key={cue.id}
                      type="button"
                      onClick={() => seekToTimestamp(cue.startTime)}
                      className={`w-full text-left p-2 rounded-xl text-xs transition-all flex items-start gap-2.5 ${
                        isActive
                          ? 'bg-brand-600/30 border border-brand-500 text-white font-semibold'
                          : 'bg-slate-950/60 hover:bg-slate-950 text-slate-400 border border-slate-800/40'
                      }`}
                    >
                      <span className="text-[10px] font-mono text-brand-400 shrink-0 mt-0.5">
                        {cue.startTime}s
                      </span>
                      <span className="leading-snug">{cue.text}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Doctor & Hospital Credits */}
            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <div>
                <span className="text-[10px] text-slate-500 block">Treating Surgeon</span>
                <span className="font-bold text-slate-200">{currentStory.doctorName}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-500 block">Hospital Partner</span>
                <span className="font-bold text-slate-200">{currentStory.hospitalName}</span>
              </div>
            </div>
          </div>

          {/* Quick Consultation CTA Box */}
          <div className="bg-gradient-to-r from-brand-900 to-slate-900 rounded-2xl p-4 border border-brand-700/60 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold text-white">Need a similar treatment package?</p>
              <p className="text-[11px] text-slate-300">Consult with {currentStory.doctorName}</p>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button
                variant="accent"
                size="sm"
                onClick={() =>
                  openQuoteModal({
                    treatment: currentStory.procedure,
                    hospital: currentStory.hospitalName,
                  })
                }
                className="flex-1 sm:flex-none text-xs font-bold py-1.5 h-8"
              >
                <FileText className="h-3 w-3 mr-1" />
                Get Quote
              </Button>

              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1 rounded-lg bg-[#25D366] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#1EBE5D] transition-colors h-8 shadow-xs"
              >
                <MessageCircle className="h-3 w-3 fill-white" />
                WhatsApp
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
