'use client'

import React, { useState } from 'react'
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Search,
  Filter,
  Star,
  Building2,
  Video,
  Plus,
  Play,
  Globe,
  Trash2,
  FileText,
  ExternalLink,
  Sparkles,
  Edit3,
  Save,
} from 'lucide-react'
import { MOCK_MODERATION, type OutcomeModerationItem } from '@/data/adminData'
import { type PatientTestimonial } from '@/data/testimonialsData'
import { COUNTRIES, ALL_MEDICAL_SPECIALTIES } from '@/data/countriesData'
import { useAdminData } from '@/context/AdminDataContext'
import { Button, Badge, Card, CardContent } from '@/components/ui/primitives'
import { getYouTubeThumbnail, getVideoPosterUrl } from '@/components/testimonials/VideoTestimonialPlayer'

function YoutubeIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  )
}

export default function AdminOutcomesModerationPage() {
  const [activeTab, setActiveTab] = useState<'videos' | 'surveys'>('videos')
  const [surveyItems, setSurveyItems] = useState<OutcomeModerationItem[]>(MOCK_MODERATION)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  // Use persistent admin context so all changes appear on Home & Verified Outcomes
  const { videoTestimonials, addVideoTestimonial, deleteVideoTestimonial, updateVideoTestimonial } = useAdminData()

  // Track if we are editing an existing testimonial or creating a new one
  const [editingVideo, setEditingVideo] = useState<PatientTestimonial | null>(null)

  // Form State for Video Testimonial (Create & Edit)
  const [formData, setFormData] = useState({
    title: '',
    patientName: '',
    country: 'United States',
    countryFlag: '🇺🇸',
    city: '',
    age: 52,
    procedure: '',
    specialty: 'Dental Care & Implants',
    hospitalName: 'Apollo Hospitals, Delhi',
    doctorName: 'Dr. Himanshu Gupta',
    costSavedUsd: '$32,000 Saved',
    savingsPercentage: 75,
    videoUrl: '',
    posterUrl: '',
    quote: '',
    transcript: '',
    description: '',
  })

  const openCreateModal = () => {
    setEditingVideo(null)
    setFormData({
      title: '',
      patientName: '',
      country: 'United States',
      countryFlag: '🇺🇸',
      city: '',
      age: 52,
      procedure: '',
      specialty: 'Dental Care & Implants',
      hospitalName: 'Apollo Hospitals, Delhi',
      doctorName: 'Dr. Himanshu Gupta',
      costSavedUsd: '$32,000 Saved',
      savingsPercentage: 75,
      videoUrl: '',
      posterUrl: '',
      quote: '',
      transcript: '',
      description: '',
    })
    setIsAddModalOpen(true)
  }

  const openEditModal = (video: PatientTestimonial) => {
    setEditingVideo(video)
    setFormData({
      title: video.title || '',
      patientName: video.patientName || '',
      country: video.country || 'International',
      countryFlag: video.countryFlag || '🌍',
      city: video.city || '',
      age: video.age || 50,
      procedure: video.procedure || '',
      specialty: video.specialty || 'Dental Care & Implants',
      hospitalName: video.hospitalName || '',
      doctorName: video.doctorName || '',
      costSavedUsd: video.costSavedUsd || '',
      savingsPercentage: video.savingsPercentage || 75,
      videoUrl: video.videoUrl || video.fallbackVideoUrl || '',
      posterUrl: video.posterUrl || '',
      quote: video.quote?.['en'] || '',
      transcript: video.transcript || '',
      description: video.description || '',
    })
    setIsAddModalOpen(true)
  }

  const handleCountryChange = (countryName: string) => {
    const found = COUNTRIES.find((c) => c.name === countryName)
    setFormData({
      ...formData,
      country: countryName,
      countryFlag: found ? found.flag : '🌍',
    })
  }

  const handleApproveSurvey = (id: string) => {
    setSurveyItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: 'published' as const } : item))
    )
  }

  const handleRejectSurvey = (id: string) => {
    setSurveyItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: 'rejected_flagged' as const } : item))
    )
  }

  const handleSaveVideo = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.patientName || !formData.videoUrl) {
      alert('Please provide patient name and YouTube/video URL')
      return
    }

    const effectiveTitle =
      formData.title.trim() ||
      `${formData.patientName} from ${formData.country}: ${formData.procedure} at ${formData.hospitalName}`

    const effectivePoster = getVideoPosterUrl(
      formData.videoUrl,
      formData.posterUrl.trim() || editingVideo?.posterUrl
    )

    if (editingVideo) {
      // Update existing video testimonial
      updateVideoTestimonial(editingVideo.id, {
        title: effectiveTitle,
        patientName: formData.patientName,
        country: formData.country,
        countryFlag: formData.countryFlag,
        city: formData.city,
        age: Number(formData.age) || editingVideo.age,
        procedure: formData.procedure,
        specialty: formData.specialty,
        hospitalName: formData.hospitalName,
        hospitalSlug: formData.hospitalName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        doctorName: formData.doctorName,
        doctorSlug: formData.doctorName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        savingsPercentage: Number(formData.savingsPercentage) || 75,
        costSavedUsd: formData.costSavedUsd,
        videoUrl: formData.videoUrl,
        fallbackVideoUrl: formData.videoUrl,
        posterUrl: effectivePoster,
        description: formData.description,
        transcript: formData.transcript,
        quote: {
          ...(editingVideo.quote || {}),
          en: formData.quote || editingVideo.quote?.['en'] || '',
        },
        fullStory: {
          ...(editingVideo.fullStory || {}),
          en: formData.description || formData.transcript || editingVideo.fullStory?.['en'] || '',
        },
      })
    } else {
      // Create new video testimonial
      const newVideo: PatientTestimonial = {
        id: `test_${Date.now()}`,
        title: effectiveTitle,
        patientName: formData.patientName,
        country: formData.country || 'International',
        countryFlag: formData.countryFlag || '🌍',
        city: formData.city || 'Global Patient',
        age: Number(formData.age) || 50,
        procedure: formData.procedure || 'Medical Treatment',
        specialty: formData.specialty || 'Dental Care & Implants',
        hospitalName: formData.hospitalName,
        hospitalSlug: formData.hospitalName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        doctorName: formData.doctorName,
        doctorSlug: formData.doctorName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        savingsPercentage: Number(formData.savingsPercentage) || 75,
        costSavedUsd: formData.costSavedUsd || '$30,000 Saved',
        treatmentDate: 'Recent 2026',
        rating: 5,
        verified: true,
        posterUrl: effectivePoster,
        videoUrl: formData.videoUrl,
        fallbackVideoUrl: formData.videoUrl,
        transcript:
          formData.transcript ||
          formData.quote ||
          `Hello, I am ${formData.patientName} from ${formData.country}. I received world-class treatment in India and saved over ${formData.costSavedUsd}. The medical care and hospital hospitality were extraordinary.`,
        description:
          formData.description ||
          formData.quote ||
          `Clinical case for ${formData.patientName}: Treated for ${formData.procedure} at ${formData.hospitalName} by ${formData.doctorName}. Achieved successful recovery and saved over ${formData.costSavedUsd}.`,
        quote: {
          en:
            formData.quote ||
            `Our surgery in Delhi with ${formData.doctorName} was flawless. We saved over ${formData.costSavedUsd} compared to prices at home.`,
        },
        subtitles: {
          en: [
            {
              id: 1,
              startTime: 0,
              endTime: 5,
              text: `Hello, I'm ${formData.patientName} from ${formData.country}.`,
            },
            {
              id: 2,
              startTime: 5,
              endTime: 12,
              text: formData.quote || `We saved over ${formData.costSavedUsd} with world-class care in India.`,
            },
          ],
        },
        fullStory: {
          en:
            formData.description ||
            formData.transcript ||
            formData.quote ||
            `Full patient case story recorded at ${formData.hospitalName}.`,
        },
      }

      addVideoTestimonial(newVideo)
    }

    setIsAddModalOpen(false)
    setEditingVideo(null)

    // Reset Form
    setFormData({
      title: '',
      patientName: '',
      country: 'United States',
      countryFlag: '🇺🇸',
      city: '',
      age: 52,
      procedure: '',
      specialty: 'Dental Care & Implants',
      hospitalName: 'Apollo Hospitals, Delhi',
      doctorName: 'Dr. Himanshu Gupta',
      costSavedUsd: '$32,000 Saved',
      savingsPercentage: 75,
      videoUrl: '',
      posterUrl: '',
      quote: '',
      transcript: '',
      description: '',
    })
  }

  const handleDeleteVideo = (id: string) => {
    if (confirm('Are you sure you want to remove this video testimonial? It will be removed from the Homepage and Verified Outcomes.')) {
      deleteVideoTestimonial(id)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-emerald-400" />
            Verified Outcomes & Video Testimonials
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage YouTube patient video stories with full transcripts and moderate verified hospital surveys.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('videos')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'videos'
                ? 'bg-brand-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Video className="h-3.5 w-3.5" />
            <span>Video Testimonials ({videoTestimonials.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('surveys')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'surveys'
                ? 'bg-brand-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Star className="h-3.5 w-3.5" />
            <span>Survey Moderation ({surveyItems.length})</span>
          </button>
        </div>
      </div>

      {/* ─── TAB 1: VIDEO TESTIMONIALS (YOUTUBE & TRANSCRIPTS) ─────────── */}
      {activeTab === 'videos' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900 border border-slate-800 p-4 rounded-2xl">
            <div>
              <div className="flex items-center gap-2">
                <YoutubeIcon className="h-4 w-4 text-red-500" />
                <h3 className="text-sm font-bold text-white">Public Video Stories & Transcripts</h3>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Automatically rendered on Homepage and Verified Outcomes with synchronized transcripts.
              </p>
            </div>
            <Button
              variant="accent"
              size="sm"
              onClick={openCreateModal}
              className="font-bold shadow-xs text-xs self-start sm:self-auto"
            >
              <Plus className="h-3.5 w-3.5 mr-1" />
              Add Video Testimonial
            </Button>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {videoTestimonials.map((video) => (
              <Card
                key={video.id}
                className="bg-slate-900 border-slate-800 text-white overflow-hidden flex flex-col justify-between hover:border-slate-700 transition-colors"
              >
                <div>
                  <div className="relative h-44 w-full bg-slate-950 overflow-hidden">
                    <img
                      src={getVideoPosterUrl(video.videoUrl, video.posterUrl)}
                      alt={video.patientName}
                      className="h-full w-full object-cover opacity-80"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1200&q=80'
                      }}
                    />
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-bold text-white border border-white/10">
                      <span>{video.countryFlag}</span>
                      <span>{video.country}</span>
                    </div>
                    <div className="absolute top-2.5 right-2.5 bg-emerald-500/90 text-slate-950 text-[10px] font-extrabold px-2 py-0.5 rounded-md">
                      {video.costSavedUsd}
                    </div>
                    <div className="absolute inset-0 m-auto flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-xs text-white">
                      <Play className="h-4 w-4 fill-white ml-0.5" />
                    </div>
                  </div>

                  <CardContent className="p-4 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <h4 className="font-bold text-sm text-white">{video.patientName}</h4>
                        {video.title && (
                          <p className="text-[11px] text-slate-300 font-medium line-clamp-1">
                            {video.title}
                          </p>
                        )}
                      </div>
                      <Badge variant="accent" className="text-[10px] shrink-0">{video.specialty}</Badge>
                    </div>
                    <p className="text-xs font-semibold text-brand-400">{video.procedure}</p>
                    <p className="text-[11px] text-slate-400">
                      {video.hospitalName} • {video.doctorName}
                    </p>

                    {/* Description Snippet */}
                    {video.description && (
                      <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800/80 space-y-1">
                        <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                          <Sparkles className="h-3 w-3 text-emerald-400" />
                          <span>Case Description:</span>
                        </div>
                        <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed">
                          {video.description}
                        </p>
                      </div>
                    )}

                    {/* Transcript Snippet */}
                    <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800/80 space-y-1">
                      <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        <FileText className="h-3 w-3 text-brand-400" />
                        <span>Transcript Preview:</span>
                      </div>
                      <p className="text-[11px] text-slate-300 italic line-clamp-2 leading-relaxed">
                        &ldquo;{video.transcript || video.quote?.['en']}&rdquo;
                      </p>
                    </div>
                  </CardContent>
                </div>

                <div className="p-4 pt-0 border-t border-slate-800/80 flex items-center justify-between text-xs mt-3">
                  <a
                    href={video.videoUrl || video.fallbackVideoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-400 hover:underline flex items-center gap-1 text-[11px]"
                  >
                    <YoutubeIcon className="h-3.5 w-3.5 text-red-500" />
                    <span>Watch Video Source</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditModal(video)}
                      className="inline-flex items-center gap-1 text-slate-300 hover:text-white px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold transition-colors border border-slate-700/60"
                      title="Edit Testimonial Details"
                    >
                      <Edit3 className="h-3.5 w-3.5 text-brand-400" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDeleteVideo(video.id)}
                      className="text-rose-400 hover:text-rose-300 p-1.5 rounded-lg hover:bg-rose-950/40 text-xs transition-colors"
                      title="Delete Testimonial"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* ─── TAB 2: SURVEY MODERATION ──────────────────────────────────── */}
      {activeTab === 'surveys' && (
        <div className="space-y-4">
          {surveyItems.map((item) => (
            <Card key={item.id} className="bg-slate-900 border-slate-800 text-white">
              <CardContent className="p-5 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 border-b border-slate-800 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-sm text-white">{item.patientName}</h3>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 border border-emerald-500/30 px-2 py-0.5 rounded">
                        ✓ Confirmed Booking: {item.bookingId}
                      </span>
                    </div>
                    <p className="text-xs text-brand-400 mt-0.5">{item.hospitalName} • {item.procedure}</p>
                  </div>

                  <div className="text-right">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        item.status === 'published'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : item.status === 'rejected_flagged'
                          ? 'bg-rose-500/20 text-rose-300'
                          : 'bg-amber-500/20 text-amber-300'
                      }`}
                    >
                      {item.status.replace('_', ' ').toUpperCase()}
                    </span>
                    <div className="text-[10px] text-slate-400 mt-1">Stage: {item.surveyStage.replace('_', ' ')} survey</div>
                  </div>
                </div>

                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs space-y-2">
                  <div className="flex items-center gap-2 text-amber-400 font-bold">
                    <span>NPS Score: {item.npsScore}/10</span>
                    <span>•</span>
                    <span>Overall Experience: {'⭐'.repeat(item.rating)}</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed italic">
                    &ldquo;{item.patientFeedback}&rdquo;
                  </p>
                </div>

                {item.status === 'pending_verification' && (
                  <div className="flex items-center justify-end gap-3 pt-1">
                    <button
                      onClick={() => handleRejectSurvey(item.id)}
                      className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-rose-950 text-rose-400 text-xs font-semibold transition-colors"
                    >
                      Flag / Reject
                    </button>
                    <button
                      onClick={() => handleApproveSurvey(item.id)}
                      className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors"
                    >
                      ✓ Verify & Publish to Public NPS
                    </button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* ─── ADD VIDEO TESTIMONIAL MODAL (WITH ALL COUNTRIES & SPECIALTIES) ─── */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl max-h-[92vh] overflow-y-auto text-white p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                {editingVideo ? (
                  <div className="h-9 w-9 rounded-xl bg-brand-500/20 border border-brand-500/40 flex items-center justify-center text-brand-400 shrink-0">
                    <Edit3 className="h-4 w-4" />
                  </div>
                ) : (
                  <div className="h-9 w-9 rounded-xl bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-500 shrink-0">
                    <YoutubeIcon className="h-5 w-5" />
                  </div>
                )}
                <div>
                  <h3 className="text-base font-bold text-white">
                    {editingVideo ? `Edit Testimonial: ${editingVideo.patientName}` : 'Add YouTube Video Testimonial'}
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    {editingVideo
                      ? 'Update case details, clinical description, YouTube link, and transcript.'
                      : 'Publish a new patient story to Homepage and Verified Outcomes.'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsAddModalOpen(false)
                  setEditingVideo(null)
                }}
                className="text-slate-400 hover:text-white text-sm p-1 rounded-lg hover:bg-slate-800 transition-colors"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveVideo} className="space-y-4 text-xs">
              {/* Case Headline / Title for Bar View */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1 flex items-center justify-between">
                  <span>Case Headline / Title (Shows in Bar List View)</span>
                  <span className="text-[10px] text-slate-500 font-normal">e.g. UK Patient Avoids 11-Month Waitlist with CABG</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. UK Patient Avoids 11-Month NHS Waitlist with Beating-Heart Bypass Surgery at Medanta"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Patient Name */}
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Patient Name(s) *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John & Emma Davies"
                    value={formData.patientName}
                    onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                    className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                  />
                </div>

                {/* Country with Flag Dropdown (All Countries) */}
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Country of Origin (with Flag) *
                  </label>
                  <div className="flex gap-2">
                    <span className="flex items-center justify-center w-12 text-xl bg-slate-950 border border-slate-800 rounded-xl">
                      {formData.countryFlag}
                    </span>
                    <select
                      value={formData.country}
                      onChange={(e) => handleCountryChange(e.target.value)}
                      className="flex-1 rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-white focus:outline-none focus:border-brand-500"
                    >
                      {COUNTRIES.map((c) => (
                        <option key={c.code} value={c.name}>
                          {c.flag} {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* City */}
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">City / State</label>
                  <input
                    type="text"
                    placeholder="e.g. Sydney, Australia or Dallas, TX"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                  />
                </div>

                {/* Patient Age */}
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Patient Age</label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                    className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-white focus:outline-none focus:border-brand-500"
                  />
                </div>

                {/* Procedure Name */}
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Procedure Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. All-on-4 Dental Implants or Heart Bypass"
                    value={formData.procedure}
                    onChange={(e) => setFormData({ ...formData, procedure: e.target.value })}
                    className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                  />
                </div>

                {/* Specialty Dropdown (All Specialties) */}
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Medical Specialty *</label>
                  <select
                    value={formData.specialty}
                    onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                    className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-white focus:outline-none focus:border-brand-500"
                  >
                    {ALL_MEDICAL_SPECIALTIES.map((spec) => (
                      <option key={spec} value={spec}>
                        {spec}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Hospital Name */}
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Hospital Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Apollo Hospitals or Fortis Escorts"
                    value={formData.hospitalName}
                    onChange={(e) => setFormData({ ...formData, hospitalName: e.target.value })}
                    className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                  />
                </div>

                {/* Doctor Name */}
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Treating Chief Doctor</label>
                  <input
                    type="text"
                    placeholder="e.g. Dr. Himanshu Gupta or Dr. Naresh Trehan"
                    value={formData.doctorName}
                    onChange={(e) => setFormData({ ...formData, doctorName: e.target.value })}
                    className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                  />
                </div>

                {/* Amount Saved */}
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Amount Saved ($)</label>
                  <input
                    type="text"
                    placeholder="e.g. $32,000 Saved"
                    value={formData.costSavedUsd}
                    onChange={(e) => setFormData({ ...formData, costSavedUsd: e.target.value })}
                    className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                  />
                </div>

                {/* Savings Percentage */}
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Savings Percentage (%)</label>
                  <input
                    type="number"
                    placeholder="75"
                    value={formData.savingsPercentage}
                    onChange={(e) => setFormData({ ...formData, savingsPercentage: Number(e.target.value) })}
                    className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              {/* Video URL (YouTube) */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  YouTube Video Link (Public or Unlisted) *
                </label>
                <div className="relative">
                  <input
                    type="url"
                    required
                    placeholder="https://www.youtube.com/watch?v=... or https://youtu.be/..."
                    value={formData.videoUrl}
                    onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                    className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 font-mono text-[11px] pl-8"
                  />
                  <YoutubeIcon className="h-4 w-4 text-red-500 absolute left-2.5 top-2.5" />
                </div>
                <p className="text-[10px] text-slate-400 mt-1">
                  Paste any YouTube URL (standard, unlisted, or Short). The video player and cover thumbnail will be configured automatically.
                </p>
              </div>

              {/* YouTube Thumbnail Auto-Detection Live Preview */}
              {getYouTubeThumbnail(formData.videoUrl) && (
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-950 border border-emerald-500/30">
                  <img
                    src={getYouTubeThumbnail(formData.videoUrl)!}
                    alt="YouTube Auto Thumbnail"
                    className="h-16 w-28 object-cover rounded-xl border border-slate-800 shadow-sm shrink-0"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1200&q=80'
                    }}
                  />
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>YouTube Cover Thumbnail Auto-Detected!</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Thumbnail cover is extracted automatically from YouTube. You don't need to upload or paste any image URL!
                    </p>
                  </div>
                </div>
              )}

              {/* Optional Custom Poster Image Override */}
              <div>
                <label className="block text-slate-400 font-normal mb-1 flex items-center justify-between text-[11px]">
                  <span>Custom Poster Image URL (Optional — leave blank for auto-detected YouTube thumbnail)</span>
                  <span className="text-[10px] text-slate-500">Auto-detected from YouTube</span>
                </label>
                <input
                  type="url"
                  placeholder="Leave blank for automatic YouTube thumbnail, or paste custom image URL..."
                  value={formData.posterUrl}
                  onChange={(e) => setFormData({ ...formData, posterUrl: e.target.value })}
                  className="w-full rounded-xl bg-slate-950 border border-slate-800/80 px-3 py-1.5 text-slate-300 placeholder-slate-600 focus:outline-none focus:border-brand-500 text-[11px]"
                />
              </div>

              {/* Patient Quote / Highlight */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Short Highlight Quote</label>
                <input
                  type="text"
                  placeholder="e.g. In Australia, full mouth implants were $48,000. In Delhi, Dr. Gupta did it for under $9,000..."
                  value={formData.quote}
                  onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                  className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                />
              </div>

              {/* Case Description / Clinical Background */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1 flex items-center justify-between">
                  <span>Case Background & Clinical Story (Description)</span>
                  <span className="text-[10px] text-emerald-400 font-normal">Shows in clinical journey box</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="Detailed clinical case background (e.g. Diagnosed with severe 3-vessel CAD. Faced 11-month NHS waitlist. Received beating-heart CABG by Dr. Trehan. Ambulatory on Day 2 and discharged fit to fly)..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 text-xs"
                />
              </div>

              {/* Full Video Transcript */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1 flex items-center justify-between">
                  <span>Full Video Transcript (Displayed Below Video) *</span>
                  <span className="text-[10px] text-brand-400 font-normal">Shows in readable transcript box</span>
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Paste the word-for-word spoken transcript of the patient video here. This improves accessibility, trust, and search engine ranking..."
                  value={formData.transcript}
                  onChange={(e) => setFormData({ ...formData, transcript: e.target.value })}
                  className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <Button
                  variant="outline"
                  size="sm"
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false)
                    setEditingVideo(null)
                  }}
                  className="text-slate-300"
                >
                  Cancel
                </Button>
                <Button
                  variant="accent"
                  size="sm"
                  type="submit"
                  className="font-bold shadow-xs flex items-center gap-1.5"
                >
                  {editingVideo ? (
                    <>
                      <Save className="h-3.5 w-3.5" />
                      <span>Save Changes</span>
                    </>
                  ) : (
                    <>
                      <Plus className="h-3.5 w-3.5" />
                      <span>Publish Video Testimonial</span>
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
