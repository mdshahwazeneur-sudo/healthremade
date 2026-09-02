'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  ShieldCheck,
  CheckCircle2,
  FileText,
  MessageCircle,
  TrendingDown,
  Building2,
  Stethoscope,
  PhoneCall,
  Clock,
  Award,
  Globe2,
  Lock,
  ArrowRight,
  HeartHandshake,
} from 'lucide-react'
import { type LandingPageRecord } from '@/data/landingPagesData'
import { type Hospital } from '@/data/hospitals'
import { type Doctor } from '@/data/doctors'
import { Badge, Button, Card, CardContent } from '@/components/ui/primitives'
import { getWhatsAppUrl } from '@/lib/whatsapp'
import { useAdminData } from '@/context/AdminDataContext'
import { sanitizeInput } from '@/lib/security'

interface Props {
  lp: LandingPageRecord
  hospitals: Hospital[]
  doctors: Doctor[]
}

export function PublicLandingPageClient({ lp, hospitals, doctors }: Props) {
  const { recordLandingPageView, recordLandingPageSubmission, addLead } = useAdminData()

  const [name, setName] = useState('')
  const [phone, setPhone] = useState(lp.formConfig.countryCode ? `${lp.formConfig.countryCode} ` : '+44 ')
  const [cityPref, setCityPref] = useState('Delhi NCR (Gurugram/Delhi)')
  const [notes, setNotes] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Track page view in analytics on mount
  useEffect(() => {
    recordLandingPageView(lp.slug)
  }, [lp.slug, recordLandingPageView])

  const currencySymbol = lp.currency === 'USD' ? '$' : lp.currency === 'GBP' ? '£' : lp.currency === 'EUR' ? '€' : '₹'

  const waUrl = getWhatsAppUrl({
    pageType: 'treatment',
    treatmentName: lp.procedureName,
    customMessage: name
      ? `Hello healthremade! My name is ${sanitizeInput(name, 100)} (${lp.targetCountry}). I saw the verified ${lp.procedureName} package (${currencySymbol}${lp.priceMin.toLocaleString()} - ${currencySymbol}${lp.priceMax.toLocaleString()}) and would like to get a free doctor opinion and hospital comparison.`
      : `Hello healthremade! I saw the ${lp.procedureName} package for ${lp.targetCountry} patients and would like free hospital quotes.`,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (honeypot.trim().length > 0) {
      setSubmitted(true)
      return
    }

    setIsSubmitting(true)

    // Push into CRM Leads & record submission
    addLead({
      patientName: sanitizeInput(name, 100),
      country: lp.targetCountry,
      countryCode: lp.formConfig.countryCode,
      phone: sanitizeInput(phone, 30),
      procedure: lp.procedureName,
      preferredHospital: lp.hospitalNames[0] || 'Top Accredited Hospital',
      preferredCity: cityPref,
      caseManager: 'International Patient Desk',
      stage: 'inquiry',
      quoteAmountInr: lp.priceMin * 85,
      source: 'Google Ads',
      inquiryDate: 'Just now',
      lastActivity: 'Just now',
      notesCount: 1,
      priority: 'high',
      activityHistory: [
        {
          date: 'Just now',
          action: 'Landing Page Quote Submitted',
          user: 'System',
          details: `Inquiry submitted from ${lp.slug}`,
        },
      ],
    })

    recordLandingPageSubmission(lp.slug)

    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
    }, 600)
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* ─── 1. Distraction-Free Header ─────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 py-3 sm:px-6">
        <div className="mx-auto max-w-6xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5">
              <img
                src="/images/logo.png"
                alt="healthremade Logo"
                className="h-12 w-12 sm:h-14 sm:w-14 object-contain rounded-xl"
              />
              <span className="font-black text-xl tracking-tight text-slate-900">
                health<span className="text-brand-600">remade</span>
              </span>
            </Link>
            <span className="hidden sm:inline text-xs text-slate-300">|</span>
            <span className="hidden sm:inline text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              JCI & NABH Accredited Network
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#25D366] text-white px-3.5 py-1.5 text-xs font-bold hover:bg-[#1EBE5D] transition-colors shadow-2xs"
            >
              <MessageCircle className="h-4 w-4 fill-white" />
              <span>WhatsApp Helpline</span>
            </a>
          </div>
        </div>
      </header>

      {/* ─── 2. High-Converting Hero ────────────────────────────────── */}
      <section className="bg-gradient-to-br from-brand-50 via-white to-slate-50 px-4 py-10 sm:px-6 sm:py-16 border-b border-slate-200">
        <div className="mx-auto max-w-4xl text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100/80 border border-emerald-300 px-3 py-1 text-xs font-bold text-emerald-800">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            Verified Patient Care: {lp.targetCountry} Special Desk
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-[1.15]">
            {lp.headline}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {lp.subheadline}
          </p>

          {/* Pricing Highlight Pill */}
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 bg-white border border-slate-200 rounded-2xl p-4 sm:px-6 shadow-sm mt-2">
            <div className="text-left">
              <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                Transparent Package Price
              </div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-600">
                {currencySymbol}{lp.priceMin.toLocaleString()} – {currencySymbol}{lp.priceMax.toLocaleString()}
              </div>
            </div>
            <div className="hidden sm:block h-8 w-px bg-slate-200" />
            <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
              <CheckCircle2 className="h-4 w-4 text-brand-600 shrink-0" />
              <span>Includes surgeon fee, ICU, pre-op evaluation & accommodation support</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3. Main Split Section: Trust Copy + Quote Form ─────────── */}
      <section className="py-12 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Trust Details & Hospitals */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-slate-900">
                Why International Patients Choose healthremade
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                {lp.bodyCopy}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <Clock className="h-4 w-4 text-brand-600 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-slate-900">24-Hour Turnaround</div>
                    <div className="text-[11px] text-slate-500">Fast doctor reviews & itemized cost breakdowns</div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <ShieldCheck className="h-4 w-4 text-brand-600 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-slate-900">Zero Agent Markup</div>
                    <div className="text-[11px] text-slate-500">Pay directly to accredited hospital billing desks</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Accredited Partner Hospitals */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Building2 className="h-5 w-5 text-brand-600" />
                Featured Accredited Hospitals
              </h3>
              <div className="space-y-3">
                {hospitals.map((hosp) => (
                  <div key={hosp.id} className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-slate-50 transition-colors">
                    <div>
                      <div className="text-sm font-bold text-slate-900">{hosp.name}</div>
                      <div className="text-xs text-slate-500">{hosp.cityLabel || hosp.city} • {hosp.bedCount} Beds</div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md border border-emerald-200">
                        {[hosp.nabhRegNumber ? 'NABH Accredited' : null, hosp.jciAccredId ? 'JCI Accredited' : null].filter(Boolean).join(' • ') || 'Accredited Center'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Lead Form */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 rounded-2xl bg-white border border-slate-200 p-6 sm:p-7 shadow-xl">
              <div className="border-b border-slate-100 pb-3 mb-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-slate-900">Request Free Treatment Plan</h3>
                  <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                    100% Free
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Receive package comparisons from 3+ accredited hospitals within 24 hours.
                </p>
              </div>

              {submitted ? (
                <div className="py-6 text-center space-y-3">
                  <div className="mx-auto h-12 w-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900">Treatment Plan Request Received!</h4>
                  <p className="text-xs text-slate-600 max-w-xs mx-auto">
                    Thank you, <strong>{name}</strong>. Our international medical coordinator will send doctor opinions and itemized quotes within 24 hours.
                  </p>
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] text-white px-4 py-2.5 text-xs font-bold hover:bg-[#1EBE5D] transition-colors w-full"
                  >
                    <MessageCircle className="h-4 w-4 fill-white" />
                    Speed up response via WhatsApp
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Patient Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Smith"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      WhatsApp / Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder={`${lp.formConfig.countryCode} 9876543210`}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs sm:text-sm text-slate-900 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Preferred City / Hospital Location
                    </label>
                    <select
                      value={cityPref}
                      onChange={(e) => setCityPref(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-600 font-medium"
                    >
                      <option value="Delhi NCR (Gurugram/Delhi)">Delhi NCR (Gurugram/Delhi)</option>
                      <option value="Mumbai">Mumbai</option>
                      <option value="Chennai">Chennai</option>
                      <option value="Bengaluru">Bengaluru</option>
                      <option value="Hyderabad">Hyderabad</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Current Symptoms / Medical Summary (Optional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Brief note on diagnosis, reports available, or preferred surgeon..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-600"
                    />
                  </div>

                  {/* Anti-Spam Honeypot */}
                  <input
                    type="text"
                    name="lp_security_hp"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                    className="hidden opacity-0 absolute -z-50 h-0 w-0 pointer-events-none"
                    aria-hidden="true"
                  />

                  <Button
                    type="submit"
                    variant="accent"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full font-bold shadow-md h-11"
                  >
                    {isSubmitting ? (
                      'Submitting Request...'
                    ) : (
                      <>
                        Get Free 3-Hospital Quotes <ArrowRight className="h-4 w-4 ml-1.5" />
                      </>
                    )}
                  </Button>

                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 pt-1">
                    <Lock className="h-3 w-3 text-slate-400" />
                    <span>{lp.formConfig.disclaimer}</span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
