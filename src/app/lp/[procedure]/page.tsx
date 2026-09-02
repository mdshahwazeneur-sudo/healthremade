import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
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
} from 'lucide-react'
import { PROCEDURES } from '@/data/procedures'
import { HOSPITALS } from '@/data/hospitals'
import { Badge, Button, Card, CardContent } from '@/components/ui/primitives'
import { formatINR } from '@/lib/utils'
import { getWhatsAppUrl } from '@/lib/whatsapp'
import { TreatmentHeroCTA } from '@/components/treatment/TreatmentCTAs'

type Params = Promise<{ procedure: string }>

export async function generateStaticParams() {
  return PROCEDURES.map((p) => ({
    procedure: p.slug,
  }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { procedure: slug } = await params
  const proc = PROCEDURES.find((p) => p.slug === slug)
  if (!proc) return {}

  return {
    title: `${proc.name} in India — Hospital Packages, Costs & Top Doctors | healthremade`,
    description: `Compare itemized hospital packages for ${proc.name} in top JCI & NABH accredited hospitals in Delhi NCR. Get free opinions and visa assistance.`,
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default async function AdLandingPage({ params }: { params: Params }) {
  const { procedure: slug } = await params
  const proc = PROCEDURES.find((p) => p.slug === slug)
  if (!proc) notFound()

  // Find partner hospitals offering this procedure
  const hospitalPackages = HOSPITALS.flatMap((h) =>
    h.packages
      .filter((pkg) => pkg.procedureId === proc.id)
      .map((pkg) => ({ hospital: h, package: pkg }))
  )

  const waUrl = getWhatsAppUrl({
    pageType: 'treatment',
    treatmentName: proc.name,
    customMessage: `Hello healthremade! I saw the ${proc.name} medical package and would like to get a free doctor opinion and hospital cost estimate.`,
  })

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* ─── 1. Ad-Compliant Distraction-Free Header ────────────────── */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 py-3 sm:px-6">
        <div className="mx-auto max-w-6xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5">
              <img src="/images/logo.png" alt="healthremade Logo" className="h-12 w-12 sm:h-14 sm:w-14 object-contain rounded-xl" />
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

      {/* ─── 2. High-Converting Intent Hero ─────────────────────────── */}
      <section className="bg-gradient-to-br from-brand-50 via-white to-slate-50 px-4 py-10 sm:px-6 sm:py-16 border-b border-slate-200">
        <div className="mx-auto max-w-4xl text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100/80 border border-emerald-300 px-3 py-1 text-xs font-bold text-emerald-800">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span>Direct Hospital Rates • 100% Free Care Assistance</span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {proc.name} in India: Package Costs & Top Accredited Surgeons
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {proc.tagline}. Compare itemized hospital packages in Delhi NCR and India with 15+ years experienced senior surgical team.
          </p>

          {/* Pricing Highlight Pill */}
          <div className="inline-flex items-center gap-3 bg-white border border-slate-200/80 rounded-2xl p-3 sm:px-6 shadow-sm">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Indicative Hospital Tariff</span>
              <span className="text-xl sm:text-2xl font-extrabold text-brand-700">
                {formatINR(proc.priceInrMin)} – {formatINR(proc.priceInrMax)}
              </span>
            </div>
            <div className="h-8 w-px bg-slate-200" />
            <div className="text-left text-xs text-slate-600">
              <span className="font-semibold block text-slate-900">⏱ {proc.totalStayDays} Days Stay</span>
              <span>{proc.recoveryWeeks} Weeks Recovery</span>
            </div>
          </div>

          {/* Interactive Hero CTAs */}
          <TreatmentHeroCTA procedureName={proc.name} />
        </div>
      </section>

      {/* ─── 3. Immediate Hospital Comparison Table ─────────────────── */}
      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-5xl space-y-6">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-2xl font-bold text-slate-900">
              Compare Hospital Tariffs for {proc.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Guaranteed itemized package estimates from certified hospital tariff schedules.
            </p>
          </div>

          <div className="grid gap-4">
            {hospitalPackages.map(({ hospital, package: pkg }) => (
              <Card key={hospital.id} className="border border-slate-200 bg-white hover:shadow-md transition-shadow">
                <CardContent className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-base text-slate-900">{hospital.name}</h3>
                      <span className="text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded">
                        {hospital.cityLabel}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600">
                      {pkg.includes.slice(0, 3).map((inc, i) => (
                        <span key={i} className="flex items-center gap-1">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> {inc}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="sm:text-right shrink-0">
                    <span className="text-xs text-slate-500 block">Package Tariff</span>
                    <span className="text-lg font-extrabold text-slate-900 block">
                      {formatINR(pkg.priceInrMin)} – {formatINR(pkg.priceInrMax)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. Strict Ad-Policy Compliance Disclaimer ──────────────── */}
      <footer className="bg-slate-900 text-slate-400 py-10 px-4 sm:px-6 text-xs text-center border-t border-slate-800">
        <div className="mx-auto max-w-4xl space-y-3">
          <p className="font-semibold text-slate-300">
            Ad Compliance & Medical Ethics Disclosure
          </p>
          <p className="leading-relaxed">
            healthremade facilitates patient coordination with JCI and NABH accredited medical institutions in India. All treatment plans, medical feasibility assessments, and surgical opinions are conducted exclusively by licensed senior surgeons. Indicative prices are derived from published hospital tariffs and may vary based on pre-existing comorbidities. We do not claim guaranteed cures or outcomes.
          </p>
          <p className="text-[11px] text-slate-500 pt-2">
            © {new Date().getFullYear()} healthremade • 24/7 International Patient Desk • WhatsApp: +91 99900 45006
          </p>
        </div>
      </footer>
    </div>
  )
}
