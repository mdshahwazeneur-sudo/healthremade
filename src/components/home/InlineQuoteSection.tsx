'use client'

import React, { useState } from 'react'
import { CheckCircle2, MessageCircle, ArrowRight, Clock, Lock, AlertCircle, Paperclip, X } from 'lucide-react'
import { Button } from '@/components/ui/primitives'
import { getWhatsAppUrl } from '@/lib/whatsapp'
import { PROCEDURES } from '@/data/procedures'
import { sanitizeInput } from '@/lib/security'
import { submitPatientLead } from '@/lib/supabase/leads'
import {
  COUNTRY_PHONE_RULES,
  getCountryPhoneRule,
  validatePhoneNumber,
} from '@/lib/phoneValidation'
import { useActiveLanguage } from '@/components/ui/LanguageSelector'
import { useLanguage } from '@/context/LanguageContext'

export interface CountryItem {
  name: string
  code: string
  flag: string
}

export const COUNTRY_OPTIONS: CountryItem[] = COUNTRY_PHONE_RULES.map((c) => ({
  name: c.name,
  code: c.code,
  flag: c.flag,
}))

export function InlineQuoteSection({
  isHeroCard = false,
  className = '',
}: {
  isHeroCard?: boolean
  className?: string
}) {
  const activeLang = useActiveLanguage()
  const { t } = useLanguage()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('India')
  const [subscriberNumber, setSubscriberNumber] = useState('')
  const [phoneTouched, setPhoneTouched] = useState(false)
  const [treatment, setTreatment] = useState('Cardiac Surgery (CABG / Bypass)')
  const [notes, setNotes] = useState('')
  const [attachedFile, setAttachedFile] = useState<{ name: string; size: string } | null>(null)
  const [fileError, setFileError] = useState<string | null>(null)
  const [honeypot, setHoneypot] = useState('') // Anti-spam bot trap
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const countryRule = getCountryPhoneRule(selectedCountry)
  const phoneValidation = validatePhoneNumber(subscriberNumber, selectedCountry)

  const handleCountryChange = (countryName: string) => {
    setSelectedCountry(countryName)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null)
    const file = e.target.files?.[0]
    if (!file) return

    // 10 MB limit check
    if (file.size > 10 * 1024 * 1024) {
      setFileError('File size exceeds 10 MB. Please choose a smaller report or image.')
      return
    }

    const sizeFormatted = file.size > 1024 * 1024
      ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
      : `${Math.round(file.size / 1024)} KB`

    setAttachedFile({
      name: file.name,
      size: sizeFormatted,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Bot check: If honeypot is filled, silent discard
    if (honeypot.trim().length > 0) {
      setSubmitted(true)
      return
    }

    // Strict Phone Completeness Check
    const validation = validatePhoneNumber(subscriberNumber, selectedCountry)
    if (!validation.isValid) {
      setPhoneTouched(true)
      return
    }

    const cleanName = sanitizeInput(name, 100)
    const cleanPhone = validation.fullFormattedNumber
    const cleanNotes = sanitizeInput(notes, 500)

    setName(cleanName)
    setNotes(cleanNotes)
    setIsSubmitting(true)

    // Save patient lead to Supabase & dispatch Telegram alert
    await submitPatientLead({
      patientName: cleanName || 'Anonymous Patient',
      country: selectedCountry,
      whatsappNumber: cleanPhone,
      treatmentNeeded: treatment || 'Cardiac Surgery (CABG / Bypass)',
      medicalSummary: cleanNotes,
      sourcePage: typeof window !== 'undefined' ? window.location.pathname : undefined,
      attachedReportName: attachedFile?.name,
      attachedReportSize: attachedFile?.size,
      honeypot,
    })

    setIsSubmitting(false)
    setSubmitted(true)
  }

  const getLocalizedInlineCustomMessage = () => {
    const cleanName = sanitizeInput(name, 100)
    const phoneStr = phoneValidation.e164Number

    if (activeLang === 'bn') {
      return name
        ? `নমস্কার Healthremade! আমার নাম ${cleanName} (${selectedCountry})। আমি ভারতে ${treatment}-র জন্য হাসপাতালের প্যাকেজ ও খরচের তালিকা জানতে চাই। ফোন: ${phoneStr}`
        : `নমস্কার Healthremade! আমি ভারতে ${treatment}-র জন্য ৩টি শীর্ষ হাসপাতালের মতামত ও খরচের হিসাব পেতে চাই। দেশ: ${selectedCountry}`
    }
    if (activeLang === 'ar') {
      return name
        ? `مرحباً Healthremade! اسمي ${cleanName} (${selectedCountry}). أبحث عن باقات المستشفيات وتكلفة ${treatment}. هاتف: ${phoneStr}`
        : `مرحباً Healthremade! أود الحصول على 3 آراء طبية وتقدير التكلفة لـ ${treatment}. الدولة: ${selectedCountry}`
    }
    if (activeLang === 'ru') {
      return name
        ? `Здравствуйте, Healthremade! Меня зовут ${cleanName} (${selectedCountry}). Я ищу стоимость лечения (${treatment}) в клиниках Индии. Телефон: ${phoneStr}`
        : `Здравствуйте, Healthremade! Я хочу получить 3 медицинских заключения и расчет стоимости по ${treatment}. Страна: ${selectedCountry}`
    }
    if (activeLang === 'fr') {
      return name
        ? `Bonjour Healthremade! Je m'appelle ${cleanName} (${selectedCountry}). Je recherche des devis d'hôpitaux pour ${treatment}. Téléphone: ${phoneStr}`
        : `Bonjour Healthremade! J'aimerais obtenir 3 avis d'hôpitaux et une estimation de coût pour ${treatment}. Pays: ${selectedCountry}`
    }
    return name
      ? `Hi healthremade! My name is ${cleanName} (${selectedCountry}). I am looking for hospital package quotes for ${treatment}. My phone is ${phoneStr}.`
      : `Hi healthremade! I would like to get 3 hospital opinions and cost estimates for ${treatment}. Country: ${selectedCountry}.`
  }

  const waUrl = getWhatsAppUrl({
    pageType: 'home',
    lang: activeLang,
    treatmentName: treatment,
    customMessage: getLocalizedInlineCustomMessage(),
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
              {t.quoteForm.title}
            </h2>

            <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl">
              {t.quoteForm.subtitle}
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
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">{t.quoteForm.title}</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {t.quoteForm.subtitle}
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
                        {t.quoteForm.fullName}
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={t.quoteForm.fullNamePlaceholder}
                        className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-600"
                      />
                    </div>

                    {/* Country Selector */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        {t.quoteForm.country}
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

                  {/* Phone / WhatsApp input with country dial badge and strict completeness check */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-semibold text-slate-700">
                        {t.quoteForm.phone}
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
                        value={subscriberNumber}
                        onChange={(e) => {
                          setSubscriberNumber(e.target.value)
                          if (!phoneTouched) setPhoneTouched(true)
                        }}
                        onBlur={() => setPhoneTouched(true)}
                        placeholder={`e.g. ${countryRule.placeholder}`}
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
                      {t.quoteForm.notes}
                    </label>
                    <textarea
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder={t.quoteForm.notesPlaceholder}
                      className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-600"
                    />
                  </div>

                  {/* Optional Medical Reports Upload */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {t.quoteForm.attachReports}
                    </label>
                    {attachedFile ? (
                      <div className="flex items-center justify-between rounded-xl border border-brand-200 bg-brand-50/80 px-3 py-2 text-xs">
                        <div className="flex items-center gap-2 text-slate-800 font-medium truncate">
                          <Paperclip className="h-3.5 w-3.5 text-brand-600 shrink-0" />
                          <span className="truncate">{attachedFile.name}</span>
                          <span className="text-[11px] text-slate-500 shrink-0 font-normal">({attachedFile.size})</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setAttachedFile(null)}
                          className="text-slate-400 hover:text-rose-600 ml-2 p-1 rounded-md transition-colors"
                          title="Remove file"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ) : (
                      <label className="flex items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 bg-slate-50 hover:bg-white hover:border-brand-500 px-3 py-2 text-xs text-slate-600 cursor-pointer transition-colors">
                        <Paperclip className="h-3.5 w-3.5 text-slate-400" />
                        <span>{t.quoteForm.attachPlaceholder}</span>
                        <input
                          type="file"
                          accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                          className="hidden"
                          onChange={handleFileChange}
                        />
                      </label>
                    )}
                    {fileError && <p className="text-xs text-rose-600 mt-1">{fileError}</p>}
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
                      t.quoteForm.submitting
                    ) : (
                      <>
                        {t.quoteForm.submitButton} <ArrowRight className="h-4 w-4 ml-1.5" />
                      </>
                    )}
                  </Button>

                  <div className="space-y-1 text-center pt-1">
                    <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
                      <Lock className="h-3 w-3 text-emerald-600" />
                      <span>{t.quoteForm.privacyBadge}</span>
                    </div>
                    <p className="text-[10px] text-slate-400 leading-tight">
                      {t.quoteForm.disclaimer}
                    </p>
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
