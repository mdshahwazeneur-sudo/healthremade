'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  Stethoscope,
  Award,
  GraduationCap,
  Languages,
  Video,
  Play,
  Search,
  Filter,
  CheckCircle2,
  Building2,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react'
import type { Doctor } from '@/data/doctors'
import { useAdminData } from '@/context/AdminDataContext'
import { Button, Badge, Card, CardContent } from '@/components/ui/primitives'
import { DoctorCardActions } from '@/components/doctors/DoctorCardActions'
import { useQuote } from '@/components/ui/QuoteModal'
import { getWhatsAppUrl } from '@/lib/whatsapp'

export default function DoctorsPage() {
  const { doctors } = useAdminData()
  const [selectedSpecialty, setSelectedSpecialty] = useState('all')
  const [selectedCity, setSelectedCity] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const { openQuoteModal } = useQuote()

  const filteredDoctors = useMemo(() => {
    return doctors.filter((doc) => {
      const matchesSpecialty =
        selectedSpecialty === 'all' || doc.specialtySlug === selectedSpecialty
      const matchesCity = selectedCity === 'all' || doc.city === selectedCity
      const matchesSearch =
        searchQuery === '' ||
        doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.hospitalName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.keyExpertise.some((e) =>
          e.toLowerCase().includes(searchQuery.toLowerCase())
        )

      return matchesSpecialty && matchesCity && matchesSearch
    })
  }, [selectedSpecialty, selectedCity, searchQuery])

  const specialties = [
    { id: 'all', label: 'All Specialties' },
    { id: 'oncology', label: 'Cancer & Surgical Oncology' },
    { id: 'cardiac', label: 'Cardiology & Heart Surgeries' },
    { id: 'orthopaedics', label: 'Orthopaedics & Joint Replacement' },
    { id: 'urology', label: 'Urology & Andrology' },
    { id: 'transplant', label: 'Liver & Organ Transplant' },
  ]

  const cities = [
    { id: 'all', label: 'All Cities' },
    { id: 'delhi', label: 'Delhi NCR' },
  ]

  const waHeaderUrl = getWhatsAppUrl({
    pageType: 'general',
    customMessage:
      'Hello healthremade! I would like to get recommendations for top specialist doctors and surgeons in India for my medical condition.',
  })

  return (
    <>
      {/* ─── 1. HERO BANNER ────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-brand-50/80 via-white to-slate-50 px-4 py-12 sm:px-6 sm:py-16 border-b border-slate-200/70">
        <div className="mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100/80 border border-emerald-300 px-3.5 py-1 text-xs font-bold text-emerald-800 mb-4 shadow-2xs">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span>Senior Chairmen & Chief Surgeons Network</span>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl leading-tight">
            Top Doctors & Surgeons in India
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Connect directly with India’s most celebrated department chairmen, Padma awardees, and senior specialists. Watch video explanations of surgical approaches and request a free case evaluation.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              variant="accent"
              size="md"
              onClick={() => openQuoteModal()}
              className="w-full sm:w-auto font-bold shadow-xs"
            >
              Get Free Senior Doctor Opinion
            </Button>
            <a
              href={waHeaderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366] text-white px-4 py-2.5 text-xs font-bold hover:bg-[#1EBE5D] transition-colors shadow-xs"
            >
              Consult Medical Coordinator on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ─── 2. FILTERS & SEARCH BAR ──────────────────────────────── */}
      <section className="sticky top-16 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-md px-4 py-3 sm:px-6">
        <div className="mx-auto max-w-6xl flex flex-wrap items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1 min-w-[240px] max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search doctor name, procedure, or hospital..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-slate-50 pl-9 pr-4 py-2 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-600"
            />
          </div>

          {/* Specialty Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
              {specialties.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedSpecialty(s.id)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                    selectedSpecialty === s.id
                      ? 'bg-brand-600 text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>

            {/* City Dropdown */}
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-600"
            >
              {cities.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* ─── 3. DOCTORS GRID / LIST ────────────────────────────────── */}
      <section className="px-4 py-10 sm:px-6 bg-slate-50">
        <div className="mx-auto max-w-6xl space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>
              Showing <strong>{filteredDoctors.length}</strong> top accredited specialist
              {filteredDoctors.length !== 1 ? 's' : ''} in India
            </span>
            <span className="hidden sm:inline">
              All doctors verified by Hospital Credentials Committee
            </span>
          </div>

          {filteredDoctors.length === 0 ? (
            <div className="py-20 text-center text-slate-500">
              No doctors found matching your criteria. Try adjusting your search query or filters.
            </div>
          ) : (
            <div className="grid gap-6">
              {filteredDoctors.map((doctor) => (
                <Card
                  key={doctor.id}
                  className="overflow-hidden border border-slate-200/80 bg-white hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-5 sm:p-7">
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Left: Doctor Photo & Metric Badges */}
                      <div className="flex sm:flex-col items-center sm:items-start gap-4 shrink-0 sm:w-48">
                        <div className="relative h-32 w-32 sm:h-44 sm:w-44 rounded-2xl overflow-hidden bg-slate-100 border-2 border-slate-200/80 shrink-0 shadow-xs">
                          <img
                            src={doctor.photoUrl}
                            alt={doctor.name}
                            className="h-full w-full object-cover object-top"
                          />
                          <div className="absolute bottom-2 left-2 right-2 bg-slate-950/80 backdrop-blur-xs text-white text-[10px] font-bold text-center py-0.5 rounded-md">
                            {doctor.experienceYears}+ Yrs Experience
                          </div>
                        </div>

                        <div className="space-y-1.5 text-xs text-slate-600 w-full">
                          <div className="flex items-center gap-1.5 font-semibold text-slate-900">
                            <Stethoscope className="h-3.5 w-3.5 text-brand-600" />
                            <span>{doctor.surgeriesCount} Surgeries</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-[11px]">
                            <Languages className="h-3.5 w-3.5 text-slate-400" />
                            <span>{doctor.languages.join(', ')}</span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Comprehensive Details & Video Section */}
                      <div className="flex-1 space-y-3.5">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <Link href={`/doctors/${doctor.slug}`} className="hover:text-brand-600 transition-colors">
                                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 hover:text-brand-600 transition-colors">
                                  {doctor.name}
                                </h2>
                              </Link>
                              {doctor.awards.length > 0 && (
                                <Badge
                                  variant="accent"
                                  className="text-[10px] bg-amber-100 text-amber-900 border-amber-300 font-bold"
                                >
                                  🏆 {doctor.awards[0].split('—')[0]}
                                </Badge>
                              )}
                            </div>

                            <p className="text-xs sm:text-sm font-semibold text-brand-700 mt-0.5">
                              {doctor.designation}
                            </p>

                            <p className="text-xs text-slate-600 flex items-center gap-1 mt-1">
                              <Building2 className="h-3.5 w-3.5 text-slate-400" />
                              <Link
                                href={`/hospitals/${doctor.city}/${doctor.hospitalSlug}`}
                                className="font-semibold text-slate-800 hover:text-brand-600 underline"
                              >
                                {doctor.hospitalName}
                              </Link>{' '}
                              • {doctor.cityLabel}
                            </p>
                          </div>
                        </div>

                        {/* Bio summary */}
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                          {doctor.bio}
                        </p>

                        {/* Key Surgical Expertise Tags */}
                        <div>
                          <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                            Key Surgical Procedures & Expertise:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {doctor.keyExpertise.map((item) => (
                              <span
                                key={item}
                                className="inline-flex items-center gap-1 text-xs bg-slate-100 border border-slate-200/80 text-slate-800 px-2.5 py-1 rounded-lg font-medium"
                              >
                                <span className="text-emerald-600 font-bold">✓</span> {item}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Video Explanation Box */}
                        <div className="rounded-xl border border-brand-200 bg-brand-50/60 p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                          <div className="flex items-start gap-2.5">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white shrink-0 shadow-xs">
                              <Video className="h-4 w-4" />
                            </div>
                            <div>
                              <h4 className="text-xs font-bold text-slate-900 leading-tight">
                                📹 {doctor.videoTitle}
                              </h4>
                              <p className="text-[11px] text-slate-600 mt-0.5 line-clamp-1">
                                {doctor.videoDescription}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Interactive CTAs & Video Modal Trigger */}
                        <DoctorCardActions doctor={doctor} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ─── 4. BOTTOM VALUE PROP ─────────────────────────────────── */}
      <section className="bg-slate-900 text-white py-14 px-4 sm:px-6">
        <div className="mx-auto max-w-4xl text-center space-y-4">
          <Badge variant="verified" className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
            Senior Surgeon Second Opinions
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-extrabold">
            Need Help Choosing the Right Surgeon for Your Medical Reports?
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
            Send your angiograms, MRI scans, biopsy reports, or surgical history. Our medical director will review your case and share recommendations from 3+ senior department chairmen within 24 hours.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
            <Button
              variant="accent"
              size="lg"
              onClick={() => openQuoteModal()}
              className="font-bold text-slate-950"
            >
              Upload Case for Free Review
            </Button>
            <a
              href={waHeaderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366] text-white px-5 py-3 text-sm font-bold hover:bg-[#1EBE5D] transition-colors"
            >
              Speak with Medical Desk on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
