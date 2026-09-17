'use client'

import React, { useState } from 'react'
import { CheckCircle2, MessageCircle, ArrowRight, Clock, Lock } from 'lucide-react'
import { Button } from '@/components/ui/primitives'
import { getWhatsAppUrl } from '@/lib/whatsapp'
import { PROCEDURES } from '@/data/procedures'
import { sanitizeInput } from '@/lib/security'
import { submitPatientLead } from '@/lib/supabase/leads'

export interface CountryItem {
  name: string
  code: string
  flag: string
}

export const COUNTRY_OPTIONS: CountryItem[] = [
  { name: 'India', code: '+91', flag: '🇮🇳' },
  { name: 'United States', code: '+1', flag: '🇺🇸' },
  { name: 'United Kingdom', code: '+44', flag: '🇬🇧' },
  { name: 'United Arab Emirates', code: '+971', flag: '🇦🇪' },
  { name: 'Saudi Arabia', code: '+966', flag: '🇸🇦' },
  { name: 'Bangladesh', code: '+880', flag: '🇧🇩' },
  { name: 'Nigeria', code: '+234', flag: '🇳🇬' },
  { name: 'Kenya', code: '+254', flag: '🇰🇪' },
  { name: 'Oman', code: '+968', flag: '🇴🇲' },
  { name: 'Kuwait', code: '+965', flag: '🇰🇼' },
  { name: 'Qatar', code: '+974', flag: '🇶🇦' },
  { name: 'Russia', code: '+7', flag: '🇷🇺' },
  { name: 'Uzbekistan', code: '+998', flag: '🇺🇿' },
  { name: 'Romania', code: '+40', flag: '🇷🇴' },
  { name: 'France', code: '+33', flag: '🇫🇷' },
  { name: 'Germany', code: '+49', flag: '🇩🇪' },
  { name: 'Spain', code: '+34', flag: '🇪🇸' },
  { name: 'Portugal', code: '+351', flag: '🇵🇹' },
  { name: 'Canada', code: '+1', flag: '🇨🇦' },
  { name: 'Australia', code: '+61', flag: '🇦🇺' },
  { name: 'Tanzania', code: '+255', flag: '🇹🇿' },
  { name: 'Uganda', code: '+256', flag: '🇺🇬' },
  { name: 'Ethiopia', code: '+251', flag: '🇪🇹' },
  { name: 'Ghana', code: '+233', flag: '🇬🇭' },
  { name: 'Other', code: '+', flag: '🌐' },
]

export function InlineQuoteSection({
  isHeroCard = false,
  className = '',
}: {
  isHeroCard?: boolean
  className?: string
}) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('India')
  const [countryCode, setCountryCode] = useState('+91')
  const [phone, setPhone] = useState('+91 ')
  const [treatment, setTreatment] = useState('Cardiac Surgery (CABG / Bypass)')
  const [notes, setNotes] = useState('')
  const [honeypot, setHoneypot] = useState('') // Anti-spam bot trap
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleCountryChange = (countryName: string) => {
    const found = COUNTRY_OPTIONS.find((c) => c.name === countryName)
    if (found) {
      setSelectedCountry(found.name)
      setCountryCode(found.code)
      // Strip previous dial code prefix and retain the pure user-typed digits
      const digitsOnly = phone.replace(/^\+\d+\s*/, '')
      setPhone(found.code === '+' ? '+' : `${found.code} ${digitsOnly}`.trimEnd() + (digitsOnly ? '' : ' '))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Bot check: If honeypot is filled, silent discard
    if (honeypot.trim().length > 0) {
      setSubmitted(true)
      return
    }

    const cleanName = sanitizeInput(name, 100)
    const cleanPhone = sanitizeInput(phone, 30)
    const cleanNotes = sanitizeInput(notes, 500)

    setName(cleanName)
    setPhone(cleanPhone)
    setNotes(cleanNotes)

    setIsSubmitting(true)

    // Save patient lead to Supabase database (with graceful fallback)
    await submitPatientLead({
      patientName: cleanName || 'Anonymous Patient',
      country: selectedCountry,
      whatsappNumber: cleanPhone,
      treatmentNeeded: treatment || 'Cardiac Surgery (CABG / Bypass)',
      medicalSummary: cleanNotes,
      sourcePage: typeof window !== 'undefined' ? window.location.pathname : undefined,
    })

    setIsSubmitting(false)
    setSubmitted(true)
  }

  const waUrl = getWhatsAppUrl({
    pageType: 'home',
    treatmentName: treatment,
    customMessage: name
      ? `Hi healthremade! My name is ${sanitizeInput(name, 100)} (${selectedCountry}). I am looking for hospital package quotes for ${treatment}. My phone is ${sanitizeInput(phone, 30)}.`
      : `Hi healthremade! I would like to get 3 hospital opinions and cost estimates for ${treatment}. Country: ${selectedCountry}.`,
  })

  const containerClasses = isHeroCard
    ? `w-full rounded-2xl sm:rounded-3xl bg-gradient-to-br from-slate-900 via-brand-950 to-slate-900 p-5 sm:p-8 md:p-10 text-white shadow-2xl border border-slate-700/60 relative overflow-hidden text-left ${className}`
    : `bg-gradient-to-br from-slate-900 via-brand-950 to-slate-900 py-16 px-4 sm:px-6 text-white relative overflow-hidden text-left ${className}`

  return (
    <div className={containerClasses}>
      {/* Subtle Background Glows */}
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className={isHeroCard ? 'relative z-10' : 'mx-auto max-w-7xl relative z-10'}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Value Proposition */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 px-3.5 py-1 text-xs font-semibold text-emerald-300">
              <Clock className="h-3.5 w-3.5" /> Fast 24-Hour Medical Turnaround
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold tracking-tight leading-[1.2] text-white">
              Get 3 Hospital Opinions & Cost Estimates — <span className="text-brand-400">100% Free</span>
            </h2>

            <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl">
              Don&apos;t rely on vague claims. Send your medical requirements to receive customized treatment plans, surgeon profiles, and itemized packages from India&apos;s leading JCI & NABH accredited hospitals.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white px-4.5 py-2.5 sm:px-5 sm:py-3 text-xs sm:text-sm font-bold transition-all shadow-lg hover:shadow-emerald-500/20"
              >
                <MessageCircle className="h-4 w-4 fill-white" />
                Instant WhatsApp Consultation
              </a>
              <span className="text-[11px] sm:text-xs text-slate-400">Response time: ~5 mins</span>
            </div>
          </div>

          {/* Right Column: Quick Form Box */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-white text-slate-900 p-5 sm:p-7 shadow-2xl border border-slate-100">
              <div className="border-b border-slate-100 pb-3 mb-4">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">Request Free Treatment Plan</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Fill in your details below to receive hospital comparisons.
                </p>
              </div>

              {submitted ? (
                <div className="py-6 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-3">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-slate-900">Request Successfully Sent!</h4>
                  <p className="text-xs text-slate-600 mt-1.5 max-w-sm mx-auto">
                    Our international care coordinator will reach out within 24 hours with package quotes from 3+ accredited hospitals.
                  </p>
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] text-white px-4 py-2.5 text-xs font-bold hover:bg-[#1EBE5D] transition-colors w-full"
                  >
                    <MessageCircle className="h-4 w-4 fill-white" />
                    Speed up response via WhatsApp
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Treatment Needed *
                    </label>
                    <select
                      value={treatment}
                      onChange={(e) => setTreatment(e.target.value)}
                      required
                      className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs sm:text-sm text-slate-900 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-600"
                    >
                      {PROCEDURES.map((p) => (
                        <option key={p.id} value={p.name}>
                          {p.name}
                        </option>
                      ))}
                      <option value="Other / Multiple Treatments">Other / Multiple Treatments</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Patient Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. John Doe"
                        className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-600"
                      />
                    </div>

                    {/* Country Selector */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Country *
                      </label>
                      <select
                        value={selectedCountry}
                        onChange={(e) => handleCountryChange(e.target.value)}
                        className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-600 font-medium"
                      >
                        {COUNTRY_OPTIONS.map((c) => (
                          <option key={c.name} value={c.name}>
                            {c.flag} {c.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Phone / WhatsApp input with automatic Country Code */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      WhatsApp / Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={`${countryCode} 9876543210`}
                      className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs sm:text-sm text-slate-900 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Current Symptoms / Brief Medical Summary
                    </label>
                    <textarea
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Brief note on diagnosis, reports available, or preferred hospital..."
                      className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-600"
                    />
                  </div>

                  {/* Honeypot Bot Trap (Invisible to humans) */}
                  <input
                    type="text"
                    name="website_feedback_hp"
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
                      'Processing...'
                    ) : (
                      <>
                        Get Free Quotes from 3+ Hospitals <ArrowRight className="h-4 w-4 ml-1.5" />
                      </>
                    )}
                  </Button>

                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 pt-1">
                    <Lock className="h-3 w-3 text-slate-400" />
                    <span>100% Confidential. We never share details with unauthorized parties.</span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
