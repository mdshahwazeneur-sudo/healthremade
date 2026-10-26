import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight, ArrowRight, ShieldCheck, Stethoscope, Building2 } from 'lucide-react'
import { PROCEDURES, getProceduresBySpecialty, type Specialty } from '@/data/procedures'
import { HOSPITALS } from '@/data/hospitals'
import { Badge, Button, Card, CardContent, JsonLd } from '@/components/ui/primitives'
import { formatINR } from '@/lib/utils'
import { buildBreadcrumbSchema } from '@/lib/schema'
import { WhatsAppCTA } from '@/components/ui/WhatsAppCTA'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://healthremade.com'

type Params = Promise<{ specialty: string }>

export async function generateStaticParams() {
  const bySpecialty = getProceduresBySpecialty()
  return Array.from(bySpecialty.keys()).map((specialty) => ({
    specialty,
  }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { specialty } = await params
  const bySpecialty = getProceduresBySpecialty()
  const procs = bySpecialty.get(specialty as Specialty)

  if (!procs || procs.length === 0) {
    return { title: 'Specialty Not Found | healthremade' }
  }

  const label = procs[0].specialtyLabel

  return {
    title: `${label} in India — Procedures, Top Hospitals & Package Costs | healthremade`,
    description: `Compare ${label.toLowerCase()} procedures, hospital packages, and expert surgeon opinions in India. Verified JCI/NABH hospitals with 70–85% savings and transparent quotes.`,
    alternates: {
      canonical: `/treatments/${specialty}`,
    },
    openGraph: {
      title: `${label} in India — Procedures, Hospitals & Costs | healthremade`,
      description: `Compare ${label.toLowerCase()} package costs from top accredited hospitals in India with verified clinical outcomes.`,
      url: `/treatments/${specialty}`,
    },
  }
}

export default async function SpecialtyPage({ params }: { params: Params }) {
  const { specialty } = await params
  const bySpecialty = getProceduresBySpecialty()
  const procs = bySpecialty.get(specialty as Specialty)

  if (!procs || procs.length === 0) {
    notFound()
  }

  const label = procs[0].specialtyLabel
  const pageUrl = `${SITE_URL}/treatments/${specialty}`

  const breadcrumbs = buildBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Treatments', url: `${SITE_URL}/treatments` },
    { name: label, url: pageUrl },
  ])

  // Filter hospitals offering packages in this specialty
  const relatedHospitals = HOSPITALS.filter((h) =>
    h.specialties.some((s) => s.toLowerCase().includes(specialty.toLowerCase()) || specialty.toLowerCase().includes(s.toLowerCase()))
  ).slice(0, 4)

  return (
    <>
      <JsonLd data={breadcrumbs} />

      {/* Breadcrumb Navigation */}
      <nav className="border-b border-border bg-white px-4 py-3 sm:px-6" aria-label="Breadcrumb">
        <ol className="mx-auto flex max-w-7xl items-center gap-1.5 text-xs text-muted-foreground">
          <li><Link href="/" className="hover:text-brand-600">Home</Link></li>
          <li><ChevronRight className="h-3 w-3" /></li>
          <li><Link href="/treatments" className="hover:text-brand-600">Treatments</Link></li>
          <li><ChevronRight className="h-3 w-3" /></li>
          <li className="text-foreground font-medium">{label}</li>
        </ol>
      </nav>

      {/* Hero Header */}
      <section className="bg-gradient-to-br from-brand-950 via-slate-900 to-slate-950 text-white py-12 px-4 sm:px-6 relative overflow-hidden">
        <div className="mx-auto max-w-7xl relative z-10">
          <div className="max-w-3xl">
            <Badge variant="outline" className="text-brand-300 border-brand-500/30 mb-3 bg-brand-950/40">
              <Stethoscope className="h-3.5 w-3.5 mr-1" />
              Specialty Guide
            </Badge>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
              {label} in India
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Access world-class surgical facilities, internationally trained specialists, and transparent, itemized package costs across accredited JCI and NABH hospitals in India.
            </p>
          </div>
        </div>
      </section>

      {/* Procedures Grid */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="mb-8 flex items-baseline justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground">Flagship {label} Procedures</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Transparent prices with no form-fill requirements</p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {procs.map((proc) => (
            <Link key={proc.id} href={`/treatments/${proc.specialty}/${proc.slug}`} className="group block">
              <Card className="h-full border border-slate-200 transition-all duration-200 hover:shadow-lg hover:border-brand-500/50">
                <CardContent className="p-6 flex flex-col justify-between h-full">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-2 py-0.5 rounded-sm">
                      {proc.specialtyLabel}
                    </span>
                    <h3 className="font-bold text-base text-slate-900 group-hover:text-brand-600 transition-colors mt-2 leading-snug">
                      {proc.name}
                    </h3>
                    <p className="mt-2 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {proc.tagline}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] uppercase font-bold text-slate-600 tracking-wider">Estimated Package</p>
                      <p className="text-sm font-extrabold text-slate-900">From {formatINR(proc.priceInrMin)}</p>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 group-hover:translate-x-0.5 transition-transform">
                      Details <ChevronRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Top Hospitals for this specialty */}
        {relatedHospitals.length > 0 && (
          <div className="mt-16 pt-10 border-t border-slate-200">
            <h2 className="text-xl font-bold text-foreground mb-4">Accredited Centres for {label}</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {relatedHospitals.map((hosp) => (
                <Link key={hosp.id} href={`/hospitals/${hosp.city}/${hosp.slug}`} className="group">
                  <div className="rounded-xl border border-slate-200 p-4 bg-white hover:shadow-md transition-shadow">
                    <div className="relative mb-3 h-28 w-full rounded-lg overflow-hidden bg-slate-100">
                      {hosp.photos.length > 0 ? (
                        <img
                          src={hosp.photos[0]}
                          alt={hosp.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-xs text-slate-400">Hospital</div>
                      )}
                    </div>
                    <h4 className="font-bold text-xs text-slate-900 group-hover:text-brand-600 line-clamp-1">{hosp.name}</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">{hosp.cityLabel}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Consultation CTA */}
        <div className="mt-16 rounded-2xl bg-gradient-to-r from-brand-900 to-slate-900 p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl font-bold">Need a specialist opinion for {label.toLowerCase()}?</h3>
            <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
              Send your medical reports for a free clinical assessment and personalized itemized quote from leading hospital department chairmen in India.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <WhatsAppCTA
              pageType="treatment"
              label="Instant WhatsApp Opinion"
              size="md"
              className="w-full sm:w-auto"
            />
          </div>
        </div>
      </div>
    </>
  )
}
