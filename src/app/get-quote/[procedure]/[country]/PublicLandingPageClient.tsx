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
  AlertCircle,
} from 'lucide-react'
import { type LandingPageRecord } from '@/data/landingPagesData'
import { type Hospital } from '@/data/hospitals'
import { type Doctor } from '@/data/doctors'
import { Badge, Button, Card, CardContent } from '@/components/ui/primitives'
import { getWhatsAppUrl } from '@/lib/whatsapp'
import { useAdminData } from '@/context/AdminDataContext'
import { sanitizeInput } from '@/lib/security'
import { submitPatientLead } from '@/lib/supabase/leads'
import {
  getCountryPhoneRule,
  validatePhoneNumber,
} from '@/lib/phoneValidation'
import { useActiveLanguage } from '@/components/ui/LanguageSelector'

interface Props {
  lp: LandingPageRecord
  hospitals: Hospital[]
  doctors: Doctor[]
}

export function PublicLandingPageClient({ lp, hospitals, doctors }: Props) {
  const activeLang = useActiveLanguage()
  const { recordLandingPageView, recordLandingPageSubmission, addLead } = useAdminData()

  const [name, setName] = useState('')
  const [subscriberNumber, setSubscriberNumber] = useState('')
  const [phoneTouched, setPhoneTouched] = useState(false)
  const [cityPref, setCityPref] = useState('Delhi NCR (Gurugram/Delhi)')
  const [notes, setNotes] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const countryRule = getCountryPhoneRule(lp.targetCountry)
  const phoneValidation = validatePhoneNumber(subscriberNumber, lp.targetCountry)

  // Track page view in analytics on mount
  useEffect(() => {
    recordLandingPageView(lp.slug)
  }, [lp.slug, recordLandingPageView])

  const currencySymbol = lp.currency === 'USD' ? '$' : lp.currency === 'GBP' ? '£' : lp.currency === 'EUR' ? '€' : '₹'

  const getLocalizedLpMessage = () => {
    const cleanName = sanitizeInput(name, 100)
    const phoneStr = phoneValidation.e164Number
    const priceText = `${currencySymbol}${lp.priceMin.toLocaleString()} - ${currencySymbol}${lp.priceMax.toLocaleString()}`

    if (activeLang === 'bn') {
      return name
        ? `নমস্কার Healthremade! আমার নাম ${cleanName} (${lp.targetCountry})। আমি ${lp.procedureName} প্যাকেজ (${priceText}) দেখেছি এবং বিশেষজ্ঞ ডাক্তারের মতামত ও হাসপাতালের তুলনা জানতে চাই। ফোন: ${phoneStr}`
        : `নমস্কার Healthremade! আমি ${lp.targetCountry}-র রোগীদের জন্য ${lp.procedureName} প্যাকেজ দেখেছি এবং বিনামূল্যে হাসপাতালের কোটেশন পেতে চাই।`
    }
    if (activeLang === 'ar') {
      return name
        ? `مرحباً Healthremade! اسمي ${cleanName} (${lp.targetCountry}). رأيت باقة ${lp.procedureName} (${priceText}) وأود الحصول على استشارة طبية مجانية ومقارنة المستشفيات. هاتف: ${phoneStr}`
        : `مرحباً Healthremade! رأيت باقة ${lp.procedureName} لمرضى ${lp.targetCountry} وأود الحصول على عروض أسعار مجانية للمستشفيات.`
    }
    if (activeLang === 'ru') {
      return name
        ? `Здравствуйте, Healthremade! Меня зовут ${cleanName} (${lp.targetCountry}). Я ознакомился с пакетом ${lp.procedureName} (${priceText}) и хочу получить бесплатную консультацию врача и расчет клиник. Телефон: ${phoneStr}`
        : `Здравствуйте, Healthremade! Меня интересует пакет ${lp.procedureName} для пациентов из ${lp.targetCountry}. Хочу получить предложения клиник.`
    }
    if (activeLang === 'fr') {
      return name
        ? `Bonjour Healthremade! Je m'appelle ${cleanName} (${lp.targetCountry}). J'ai vu le forfait ${lp.procedureName} (${priceText}) et souhaite obtenir un avis médical gratuit et une comparaison d'hôpitaux. Téléphone: ${phoneStr}`
        : `Bonjour Healthremade! J'ai vu le forfait ${lp.procedureName} pour les patients de ${lp.targetCountry} et souhaite recevoir des devis d'hôpitaux gratuits.`
    }
    return name
      ? `Hello healthremade! My name is ${cleanName} (${lp.targetCountry}). I saw the verified ${lp.procedureName} package (${priceText}) and would like to get a free doctor opinion and hospital comparison. My phone is ${phoneStr}`
      : `Hello healthremade! I saw the ${lp.procedureName} package for ${lp.targetCountry} patients and would like free hospital quotes.`
  }

  const waUrl = getWhatsAppUrl({
    pageType: 'treatment',
    lang: activeLang,
    treatmentName: lp.procedureName,
    customMessage: getLocalizedLpMessage(),
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (honeypot.trim().length > 0) {
      setSubmitted(true)
      return
    }

    // Strict Phone Completeness Check
    const validation = validatePhoneNumber(subscriberNumber, lp.targetCountry)
    if (!validation.isValid) {
      setPhoneTouched(true)
      return
    }

    setIsSubmitting(true)

    const cleanName = sanitizeInput(name, 100)
    const cleanPhone = validation.fullFormattedNumber

    // Push into Supabase Leads
    await submitPatientLead({
      patientName: cleanName || 'Anonymous Patient',
      country: lp.targetCountry,
      whatsappNumber: cleanPhone,
      treatmentNeeded: lp.procedureName,
      preferredHospital: lp.hospitalNames[0] || 'Top Accredited Hospital',
      preferredCity: cityPref,
      medicalSummary: notes,
      sourcePage: typeof window !== 'undefined' ? window.location.pathname : undefined,
      honeypot,
    })

    // Push into CRM Leads & record submission
    addLead({
      patientName: cleanName,
      country: lp.targetCountry,
      countryCode: countryRule.code,
      phone: cleanPhone,
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

    setIsSubmitting(false)
    setSubmitted(true)
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

                  {/* Phone / WhatsApp input with country dial badge and strict completeness check */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-semibold text-slate-700">
                        WhatsApp / Phone Number *
                      </label>
                      <span className="text-[11px] font-medium text-slate-500">
                        {subscriberNumber.replace(/\D/g, '').length} / {countryRule.minDigits} digits
                      </span>
                    </div>

                    <div className="flex items-center rounded-xl border border-slate-300 bg-slate-50 focus-within:bg-white focus-within:ring-2 focus-within:ring-brand-600 focus-within:border-brand-600 transition-all overflow-hidden">
                      <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 border-r border-slate-300 text-xs sm:text-sm font-semibold text-slate-700 select-none">
                        <span>{countryRule.flag}</span>
                        <span>{countryRule.code}</span>
                      </div>
                      <input
                        type="tel"
                        required
                        placeholder={`e.g. ${countryRule.placeholder}`}
                        value={subscriberNumber}
                        onChange={(e) => {
                          setSubscriberNumber(e.target.value)
                          if (!phoneTouched) setPhoneTouched(true)
                        }}
                        onBlur={() => setPhoneTouched(true)}
                        className="w-full bg-transparent px-3 py-2 text-xs sm:text-sm text-slate-900 font-medium focus:outline-none"
                      />
                    </div>

                    {phoneTouched && !phoneValidation.isValid && (
                      <div className="flex items-center gap-1.5 mt-1.5 text-xs text-rose-600 font-medium">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{phoneValidation.errorMessage}</span>
                      </div>
                    )}
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
