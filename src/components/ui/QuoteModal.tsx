'use client'

import React, { useState, createContext, useContext } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { X, CheckCircle2, MessageCircle, ArrowRight, ShieldCheck, Clock, FileText } from 'lucide-react'
import { Button } from './primitives'
import { getWhatsAppUrl } from '@/lib/whatsapp'
import { PROCEDURES } from '@/data/procedures'
import { COUNTRY_OPTIONS } from '@/components/home/InlineQuoteSection'
import { sanitizeInput } from '@/lib/security'

interface QuoteContextType {
  openQuoteModal: (initialData?: { treatment?: string; hospital?: string; city?: string }) => void
  closeQuoteModal: () => void
}

const QuoteContext = createContext<QuoteContextType | undefined>(undefined)

export function useQuote() {
  const context = useContext(QuoteContext)
  if (!context) {
    throw new Error('useQuote must be used within a QuoteProvider')
  }
  return context
}

export function QuoteProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [presetData, setPresetData] = useState<{ treatment?: string; hospital?: string; city?: string }>({})
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Form fields
  const [name, setName] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('India')
  const [countryCode, setCountryCode] = useState('+91')
  const [phone, setPhone] = useState('+91 ')
  const [email, setEmail] = useState('')
  const [treatment, setTreatment] = useState('')
  const [cityPref, setCityPref] = useState('delhi')
  const [notes, setNotes] = useState('')
  const [honeypot, setHoneypot] = useState('')

  const handleCountryChange = (countryName: string) => {
    const found = COUNTRY_OPTIONS.find((c) => c.name === countryName)
    if (found) {
      setSelectedCountry(found.name)
      setCountryCode(found.code)
      const digitsOnly = phone.replace(/^\+\d+\s*/, '')
      setPhone(found.code === '+' ? '+' : `${found.code} ${digitsOnly}`.trimEnd() + (digitsOnly ? '' : ' '))
    }
  }

  const openQuoteModal = (initialData?: { treatment?: string; hospital?: string; city?: string }) => {
    if (initialData) {
      setPresetData(initialData)
      if (initialData.treatment) setTreatment(initialData.treatment)
      if (initialData.city) setCityPref(initialData.city.toLowerCase())
    }
    setSubmitted(false)
    setIsOpen(true)
  }

  const closeQuoteModal = () => {
    setIsOpen(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (honeypot.trim().length > 0) {
      setSubmitted(true)
      return
    }

    setName(sanitizeInput(name, 100))
    setPhone(sanitizeInput(phone, 30))
    setNotes(sanitizeInput(notes, 500))

    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
    }, 600)
  }

  const waUrl = getWhatsAppUrl({
    pageType: 'general',
    treatmentName: treatment || presetData.treatment,
    hospitalName: presetData.hospital,
    city: cityPref || presetData.city,
    customMessage: name
      ? `Hello healthremade! My name is ${sanitizeInput(name, 100)} (${selectedCountry}). I am looking for a quote and hospital options for ${treatment || 'medical treatment'} in ${cityPref || 'India'}. Phone: ${sanitizeInput(phone, 30)}`
      : undefined,
  })

  return (
    <QuoteContext.Provider value={{ openQuoteModal, closeQuoteModal }}>
      {children}

      <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <Dialog.Content className="fixed left-[50%] top-[50%] z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%] rounded-2xl bg-white p-6 shadow-2xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:max-w-xl max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-start justify-between border-b border-border pb-4">
              <div>
                <Dialog.Title className="text-xl font-bold text-foreground sm:text-2xl flex items-center gap-2">
                  <span>Get Free Medical Quote</span>
                  <span className="rounded-full bg-emerald-100 text-emerald-800 text-xs px-2.5 py-0.5 font-semibold">
                    100% Free
                  </span>
                </Dialog.Title>
                <Dialog.Description className="mt-1 text-sm text-muted-foreground">
                  Receive personalized treatment plans & package cost estimates from 3+ top accredited Indian hospitals within 24 hours.
                </Dialog.Description>
              </div>
              <Dialog.Close asChild>
                <button
                  className="rounded-full p-1.5 text-muted-foreground hover:bg-slate-100 hover:text-foreground transition-colors"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </Dialog.Close>
            </div>

            {submitted ? (
              <div className="py-8 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-4">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Quote Request Received!</h3>
                <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
                  Thank you, <strong className="text-foreground">{name || 'Patient'}</strong>. Our dedicated Medical Travel Coordinator will review your case and share itemized hospital package comparisons within 24 hours.
                </p>

                <div className="mt-6 rounded-xl bg-slate-50 border border-slate-200 p-4 text-left text-xs space-y-2">
                  <div className="flex items-center gap-2 text-slate-700 font-semibold">
                    <Clock className="h-4 w-4 text-brand-600" /> Expected Response: Within 24 Hours
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <FileText className="h-4 w-4 text-brand-600" /> You will receive quotes from 3+ NABH/JCI accredited hospitals.
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <ShieldCheck className="h-4 w-4 text-brand-600" /> Your medical reports remain confidential.
                  </div>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366] text-white px-5 py-2.5 text-sm font-semibold hover:bg-[#1EBE5D] transition-colors shadow-sm"
                  >
                    <MessageCircle className="h-4 w-4 fill-white" />
                    Speed up via WhatsApp Chat
                  </a>
                  <Button variant="outline" onClick={closeQuoteModal} className="w-full sm:w-auto">
                    Done
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                {presetData.hospital && (
                  <div className="rounded-lg bg-brand-50 border border-brand-200 px-3.5 py-2 text-xs text-brand-900 font-medium">
                    📍 Selected Hospital: <strong>{presetData.hospital}</strong>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1">
                      Treatment / Specialty *
                    </label>
                    <select
                      value={treatment}
                      onChange={(e) => setTreatment(e.target.value)}
                      required
                      className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand-600"
                    >
                      <option value="">Select treatment...</option>
                      {PROCEDURES.map((p) => (
                        <option key={p.id} value={p.name}>
                          {p.name} ({p.specialtyLabel})
                        </option>
                      ))}
                      <option value="Oncology / Cancer Care">Oncology / Cancer Care</option>
                      <option value="Robotic Surgery">Robotic Surgery</option>
                      <option value="Bone Marrow Transplant">Bone Marrow Transplant</option>
                      <option value="Cosmetic / Plastic Surgery">Cosmetic / Plastic Surgery</option>
                      <option value="Dental Surgery">Dental Implants / Surgery</option>
                      <option value="Other Medical Condition">Other Medical Condition</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1">
                      Preferred City / Hub
                    </label>
                    <select
                      value={cityPref}
                      onChange={(e) => setCityPref(e.target.value)}
                      className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand-600"
                    >
                      <option value="delhi">Delhi NCR (Gurugram/Delhi)</option>
                      <option value="mumbai">Mumbai</option>
                      <option value="chennai">Chennai</option>
                      <option value="bangalore">Bengaluru</option>
                      <option value="hyderabad">Hyderabad</option>
                      <option value="any">Any Top Accredited Hospital</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1">
                      Patient Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1">
                      Country *
                    </label>
                    <select
                      value={selectedCountry}
                      onChange={(e) => handleCountryChange(e.target.value)}
                      className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand-600 font-medium"
                    >
                      {COUNTRY_OPTIONS.map((c) => (
                        <option key={c.name} value={c.name}>
                          {c.flag} {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">
                    WhatsApp / Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder={`${countryCode} 9876543210`}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand-600 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">
                    Brief Medical Problem / Query (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Describe symptoms, previous diagnosis, or any specific doctor preference..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand-600"
                  />
                </div>

                {/* Honeypot Bot Trap */}
                <input
                  type="text"
                  name="modal_security_hp"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden opacity-0 absolute -z-50 h-0 w-0 pointer-events-none"
                  aria-hidden="true"
                />

                <div className="pt-2 flex flex-col sm:flex-row gap-3 items-center justify-between">
                  <Button
                    type="submit"
                    variant="accent"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full sm:flex-1 py-3 text-base shadow-sm"
                  >
                    {isSubmitting ? 'Submitting...' : 'Request Free Hospital Quotes'} <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>

                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-lg border border-[#25D366] bg-[#25D366]/10 px-4 py-2.5 text-xs font-bold text-[#1a8b43] hover:bg-[#25D366]/20 transition-colors"
                  >
                    <MessageCircle className="h-4 w-4 text-[#25D366] fill-[#25D366]" />
                    Instant WhatsApp
                  </a>
                </div>

                <div className="flex items-center justify-center gap-4 text-[11px] text-muted-foreground pt-1">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" /> 100% Privacy
                  </span>
                  <span>•</span>
                  <span>No Spam Guarantee</span>
                  <span>•</span>
                  <span>Response in &lt; 24h</span>
                </div>
              </form>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </QuoteContext.Provider>
  )
}
