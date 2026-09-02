import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Shield,
  TrendingDown,
  Star,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Plane,
  HeartPulse,
  Building2,
  FileCheck,
  Languages,
} from 'lucide-react'
import { HOSPITALS } from '@/data/hospitals'
import { PROCEDURES } from '@/data/procedures'
import { Badge, Button, Card, CardContent, JsonLd } from '@/components/ui/primitives'
import { AccreditationBadge } from '@/components/ui/medical'
import { WhatsAppCTA } from '@/components/ui/WhatsAppCTA'
import { buildOrganizationSchema } from '@/lib/schema'
import { formatINR } from '@/lib/utils'

// Interactive Components
import { SearchTriggerButton } from '@/components/search/GlobalSearchBar'
import { HeroSection } from '@/components/home/HeroSection'
import { InlineQuoteSection } from '@/components/home/InlineQuoteSection'
import { ProcedureCardActions, CustomPackageCardAction, HospitalCardActions } from '@/components/home/CardActions'
import { HomeTopDoctors } from '@/components/home/HomeTopDoctors'
import { HomePricingExplorer } from '@/components/home/HomePricingExplorer'
import { HomeVerifiedOutcomes } from '@/components/home/HomeVerifiedOutcomes'

export const metadata: Metadata = {
  title: 'Get your health remade in india | Top Hospitals & Transparent Pricing',
  description:
    'Compare itemized medical treatment packages across JCI & NABH accredited hospitals in Delhi NCR and India. Free quotes, verified outcomes, and zero markup.',
  openGraph: {
    title: 'healthremade — Get your health remade in india',
    description:
      'Compare itemized treatment package costs from accredited hospitals in India. Transparent quotes, top doctors, and end-to-end patient care.',
  },
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://healthremade.com'

const HOW_WE_ASSIST = [
  {
    icon: <HeartPulse className="h-6 w-6" />,
    title: 'Free Opinions from Top Doctors',
    description: 'We share your medical reports with department chairmen and senior surgeons across 3+ hospitals to get treatment recommendations and estimates.',
  },
  {
    icon: <FileCheck className="h-6 w-6" />,
    title: 'Itemized Transparent Package Quotes',
    description: 'No hidden hospital fees or surprise surcharges. We provide clear, line-item pricing so you understand the exact inclusions before travelling.',
  },
  {
    icon: <Languages className="h-6 w-6" />,
    title: 'Dedicated Multi-Lingual Care Manager',
    description: 'A personal coordinator handles fast medical visa invitation letters, airport transfer logistics, and in-hospital scheduling.',
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: 'Direct Hospital Billing Guarantee',
    description: 'You pay the hospital directly upon admission. healthremade charges zero patient fee and adds zero hidden commissions.',
  },
]

const TRUST_METRICS = [
  { value: '500+', label: 'Accredited Hospital Beds', sub: 'JCI & NABH Certified' },
  { value: '48 Hrs', label: 'Doctor Opinion Turnaround', sub: 'From Senior Chairmen' },
  { value: '70–85%', label: 'Average Treatment Savings', sub: 'Vs. US & UK Pricing' },
  { value: '0', label: 'Hidden Service Markups', sub: 'Direct Hospital Invoicing' },
]

export default function HomePage() {
  return (
    <>
      <JsonLd data={buildOrganizationSchema(SITE_URL)} />

      {/* ─── 1. HERO SECTION WITH SCROLL-LINKED FLIGHT ANIMATION ──── */}
      <HeroSection>
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100/80 border border-emerald-300 px-3.5 py-1 text-xs font-bold text-emerald-800 mb-6 shadow-2xs">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>24/7 International Patient Desk Online</span>
        </div>

        <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.18] sm:leading-[1.15] max-w-4xl mx-auto px-2">
          Get your health <span className="text-brand-600">remade</span> in india
        </h1>

        <p className="mt-3 sm:mt-4 text-base sm:text-xl md:text-2xl font-bold text-brand-700 tracking-tight">
          Get Free Quotes & Transparent Pricing
        </p>

        <p className="mx-auto mt-2.5 max-w-2xl text-xs sm:text-base text-slate-600 leading-relaxed px-2">
          Compare itemized treatment packages from top JCI & NABH accredited hospitals in Delhi NCR and across India. Free senior doctor opinions, fast medical visas, and continuous care support.
        </p>

        {/* Instant Global Keyword Search Bar */}
        <SearchTriggerButton
          variant="hero"
          className="mt-6 mb-8"
          placeholder="Search treatments (e.g. Bypass, Knee, Liver), doctors (e.g. Trehan, Seth), or hospitals..."
        />

        {/* ─── SHIFTED: Quotation Form Section (Get 3 Hospital Opinions & Cost Estimates - 100% Free) ─── */}
        <div className="w-full max-w-6xl mx-auto mt-4 mb-4">
          <InlineQuoteSection isHeroCard={true} />
        </div>

        {/* Key Trust Signals */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs font-semibold text-slate-600">
          <span className="flex items-center gap-1.5">
            <Shield className="h-4 w-4 text-emerald-600" /> JCI & NABH Accredited Hospitals
          </span>
          <span className="flex items-center gap-1.5">
            <TrendingDown className="h-4 w-4 text-brand-600" /> Zero Hidden Markups
          </span>
          <span className="flex items-center gap-1.5">
            <Star className="h-4 w-4 text-amber-500" /> 100% Free Care Coordination
          </span>
        </div>
      </HeroSection>

      {/* ─── 2. HOW WE HELP (4-PILLAR CARE) ────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge variant="default" className="mb-2">Comprehensive Patient Support</Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              How healthremade Assists International Patients
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600">
              From your initial inquiry to full recovery back home, our care team handles every detail with complete transparency.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOW_WE_ASSIST.map((item, idx) => (
              <div
                key={idx}
                className="group rounded-2xl border border-slate-200/80 bg-slate-50/50 p-6 transition-all hover:bg-white hover:shadow-lg hover:border-brand-300"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 3. STATS BAR ─────────────────────────────────────────── */}
      <section className="border-y border-slate-200 bg-slate-900 text-white py-10 px-4 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {TRUST_METRICS.map((m) => (
              <div key={m.label} className="space-y-1">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-400">
                  {m.value}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-slate-200">{m.label}</div>
                <div className="text-[11px] text-slate-400">{m.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. TREATMENTS: FLAGSHIP MEDICAL PROCEDURES ────────────── */}
      <section className="bg-slate-50 py-16 px-4 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <Badge variant="default" className="mb-2">Popular Treatments</Badge>
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Flagship Medical Procedures</h2>
              <p className="mt-1 text-sm text-slate-600">
                Indicative hospital package costs, duration in India, and 1-click free quotes.
              </p>
            </div>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-1 text-sm font-bold text-brand-600 hover:text-brand-700"
            >
              Explore Full Pricing Table <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PROCEDURES.map((proc) => (
              <Card key={proc.id} className="h-full flex flex-col justify-between hover:shadow-md transition-shadow">
                <CardContent className="p-5 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <Badge variant="default" className="text-xs">{proc.specialtyLabel}</Badge>
                      <span className="text-[11px] text-slate-500 font-medium">
                        ⏱ {proc.totalStayDays} Days Stay
                      </span>
                    </div>

                    <Link
                      href={`/treatments/${proc.specialty}/${proc.slug}`}
                      className="block group"
                    >
                      <h3 className="font-bold text-base text-slate-900 group-hover:text-brand-600 transition-colors">
                        {proc.name}
                      </h3>
                      <p className="mt-1.5 text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {proc.tagline}
                      </p>
                    </Link>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-baseline justify-between">
                      <div>
                        <span className="text-[11px] text-slate-500 uppercase tracking-wider block">Package From</span>
                        <span className="text-lg font-extrabold text-slate-900">{formatINR(proc.priceInrMin)}</span>
                      </div>
                      <Link
                        href={`/treatments/${proc.specialty}/${proc.slug}`}
                        className="text-xs font-semibold text-brand-600 hover:underline"
                      >
                        Details →
                      </Link>
                    </div>
                  </div>

                  {/* 1-Click Quote & WhatsApp Action Buttons */}
                  <ProcedureCardActions
                    procedureName={proc.name}
                    slug={proc.slug}
                    specialty={proc.specialty}
                  />
                </CardContent>
              </Card>
            ))}

            {/* 6th Treatment Package: Customizable "Know Yours" Package */}
            <Card className="h-full flex flex-col justify-between border-2 border-amber-300/80 bg-gradient-to-br from-amber-50/60 via-white to-amber-50/20 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-amber-500 text-slate-950 text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-bl-lg tracking-wider">
                100% Customizable
              </div>

              <CardContent className="p-5 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <Badge variant="accent" className="text-xs bg-amber-100 text-amber-900 border-amber-300 font-bold">
                      Any Specialty / Condition
                    </Badge>
                    <span className="text-[11px] text-amber-800 font-semibold mr-16 sm:mr-18">
                      ⏱ Flexible Itinerary
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-base text-slate-900 leading-snug">
                      Custom Treatment / Other Surgery
                    </h3>
                    <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                      Need <strong>Oncology</strong>, <strong>Robotic Surgery</strong>, <strong>Bone Marrow Transplant</strong>, <strong>Dental Implants</strong>, or a second opinion for complex conditions?
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-amber-200/60 flex items-baseline justify-between">
                    <div>
                      <span className="text-[11px] text-amber-800 font-semibold uppercase tracking-wider block">Package Pricing</span>
                      <span className="text-sm font-extrabold text-brand-900">Customized Hospital Tariff</span>
                    </div>
                    <span className="text-xs font-bold text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded-md">
                      Free Estimate
                    </span>
                  </div>
                </div>

                {/* Customizable CTA: Know Yours & WhatsApp */}
                <CustomPackageCardAction />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ─── 5. HOSPITALS: TOP PARTNER HOSPITALS IN DELHI NCR & METROS ─ */}
      <section className="bg-white py-16 px-4 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <Badge variant="default" className="mb-2">Accredited Network</Badge>
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                Top Partner Hospitals in Delhi NCR & India
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Official JCI and NABH accredited tertiary institutions with dedicated international lounges.
              </p>
            </div>
            <Link
              href="/hospitals"
              className="inline-flex items-center gap-1 text-sm font-bold text-brand-600 hover:text-brand-700"
            >
              View All {HOSPITALS.length} Partner Hospitals <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {HOSPITALS.slice(0, 4).map((hospital) => (
              <Card key={hospital.id} className="h-full flex flex-col justify-between hover:shadow-md transition-shadow">
                <CardContent className="p-5 flex flex-col justify-between h-full">
                  <div>
                    <div className="relative mb-3 h-36 w-full rounded-xl overflow-hidden bg-slate-100 border border-slate-200/80">
                      {hospital.photos.length > 0 ? (
                        <img
                          src={hospital.photos[0]}
                          alt={hospital.name}
                          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full p-3 text-center">
                          <span className="text-xs font-bold text-brand-800">{hospital.name}</span>
                          <span className="text-[10px] text-slate-500 mt-0.5">{hospital.cityLabel}</span>
                        </div>
                      )}
                      <div className="absolute top-2 right-2 bg-slate-900/70 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded-md">
                        {hospital.cityLabel.split(' ')[0]}
                      </div>
                    </div>

                    <Link
                      href={`/hospitals/${hospital.city}/${hospital.slug}`}
                      className="block group"
                    >
                      <h3 className="font-bold text-sm text-slate-900 group-hover:text-brand-600 transition-colors leading-snug line-clamp-2">
                        {hospital.name}
                      </h3>
                    </Link>

                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {hospital.nabhRegNumber && (
                        <AccreditationBadge type="NABH" regNumber={hospital.nabhRegNumber} />
                      )}
                      {hospital.jciAccredId && (
                        <AccreditationBadge type="JCI" regNumber={hospital.jciAccredId} />
                      )}
                    </div>

                    <p className="mt-2.5 text-xs text-slate-500 line-clamp-2">
                      {hospital.specialties.slice(0, 3).join(' · ')}
                    </p>
                  </div>

                  {/* 1-Click Quote & WhatsApp Action Buttons */}
                  <HospitalCardActions
                    hospitalName={hospital.name}
                    city={hospital.cityLabel}
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 6. TOP DOCTORS: SENIOR SURGEONS & CHAIRMEN NETWORK ──────── */}
      <HomeTopDoctors />

      {/* ─── 7. PRICING EXPLORER: TRANSPARENT COST COMPARISONS ──────── */}
      <HomePricingExplorer />

      {/* ─── 8. VERIFIED OUTCOMES: CLINICAL SUCCESS BENCHMARKS ──────── */}
      <HomeVerifiedOutcomes />

      {/* ─── 9. FAST WHATSAPP DIRECT CALLOUT ─────────────────────────── */}
      <section className="bg-emerald-50 border-y border-emerald-200 py-12 px-4 sm:px-6">
        <div className="mx-auto max-w-4xl flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-1.5">
            <h3 className="text-xl sm:text-2xl font-bold text-emerald-950">
              Prefer to talk directly on WhatsApp?
            </h3>
            <p className="text-xs sm:text-sm text-emerald-800 max-w-xl">
              Send your reports or questions directly to our Medical Care Desk. We reply within minutes with hospital options and package estimates.
            </p>
          </div>
          <div className="shrink-0">
            <WhatsAppCTA
              pageType="home"
              label="Chat on WhatsApp Now"
              size="lg"
              className="shadow-md"
            />
          </div>
        </div>
      </section>

      {/* ─── 10. PATIENT JOURNEY TIMELINE ───────────────────────────── */}
      <section className="bg-white py-16 px-4 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Badge variant="default" className="mb-2">Step-by-Step</Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Your Medical Journey in 4 Simple Steps
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: '01',
                title: 'Request Free Quote',
                desc: 'Upload your medical reports or choose your treatment to receive 3 hospital estimates in 24 hours.',
              },
              {
                step: '02',
                title: 'Doctor Selection & Visa',
                desc: 'Pick your preferred surgeon. We issue the official hospital visa invitation letter for your embassy.',
              },
              {
                step: '03',
                title: 'Treatment & Admission',
                desc: 'Arrive in India with free airport pickup. Your dedicated coordinator assists with hospital registration.',
              },
              {
                step: '04',
                title: 'Post-Op Follow-Up',
                desc: 'Fly home with complete discharge papers and continuous video telemedicine consultations.',
              },
            ].map((s) => (
              <div key={s.step} className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 relative">
                <div className="text-3xl font-black text-brand-500 mb-2">{s.step}</div>
                <h4 className="font-bold text-sm text-slate-900 mb-1.5">{s.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 11. BOTTOM CONVERSION CTA ──────────────────────────────── */}
      <section className="bg-slate-900 py-16 px-4 sm:px-6 text-white text-center">
        <div className="mx-auto max-w-3xl space-y-6">
          <h2 className="text-2xl sm:text-4xl font-extrabold">
            Ready to Get Your Free Medical Opinion?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            Speak with an international care coordinator today. No upfront charges, no obligation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/pricing"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3.5 text-sm font-bold text-white hover:bg-brand-500 transition-colors shadow-lg"
            >
              Browse All Prices <ArrowRight className="h-4 w-4" />
            </Link>

            <WhatsAppCTA
              pageType="home"
              label="Instant WhatsApp Chat"
              size="lg"
              className="w-full sm:w-auto"
            />
          </div>
        </div>
      </section>
    </>
  )
}
