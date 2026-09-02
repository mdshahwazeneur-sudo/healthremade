import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, Clock, Stethoscope, ChevronRight } from 'lucide-react'
import { getProcedure, getAllProcedureParams } from '@/data/procedures'
import { getPackagesForProcedure } from '@/data/hospitals'
import { Badge, Button, Card, CardContent } from '@/components/ui/primitives'
import { PriceRange, AccreditationBadge } from '@/components/ui/medical'
import { JsonLd } from '@/components/ui/primitives'
import { buildMedicalProcedureSchema, buildFAQSchema, buildBreadcrumbSchema } from '@/lib/schema'

import { TreatmentHeroCTA, TreatmentSidebarCTA } from '@/components/treatment/TreatmentCTAs'

type Params = Promise<{ specialty: string; procedure: string }>

export async function generateStaticParams() {
  return getAllProcedureParams()
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { specialty, procedure } = await params
  const proc = getProcedure(specialty, procedure)
  if (!proc) return {}
  return {
    title: proc.seoTitle,
    description: proc.seoDescription,
    openGraph: { title: proc.seoTitle, description: proc.seoDescription },
    alternates: { canonical: `/treatments/${specialty}/${procedure}` },
  }
}

export default async function TreatmentPage({ params }: { params: Params }) {
  const { specialty, procedure: slug } = await params
  const proc = getProcedure(specialty, slug)
  if (!proc) notFound()
  const packages = getPackagesForProcedure(proc!.id)
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://healthremade.com'
  const pageUrl = `${SITE_URL}/treatments/${specialty}/${slug}`

  const jsonLd = [
    buildMedicalProcedureSchema({
      name: proc.schemaOrgName,
      description: proc.description,
      url: pageUrl,
    }),
    buildFAQSchema({ questions: proc.faqs }),
    buildBreadcrumbSchema([
      { name: 'Home', url: SITE_URL },
      { name: 'Treatments', url: `${SITE_URL}/treatments` },
      { name: proc.specialtyLabel, url: `${SITE_URL}/treatments/${specialty}` },
      { name: proc.name, url: pageUrl },
    ]),
  ]

  return (
    <>
      <JsonLd data={jsonLd} />

      {/* ─── Breadcrumb ─────────────────────────────────────────── */}
      <nav className="border-b border-border bg-white px-4 py-3 sm:px-6" aria-label="Breadcrumb">
        <ol className="mx-auto flex max-w-7xl items-center gap-1.5 text-xs text-muted-foreground">
          <li><Link href="/" className="hover:text-brand-600">Home</Link></li>
          <li><ChevronRight className="h-3 w-3" /></li>
          <li><Link href="/treatments" className="hover:text-brand-600">Treatments</Link></li>
          <li><ChevronRight className="h-3 w-3" /></li>
          <li><Link href={`/treatments/${specialty}`} className="hover:text-brand-600">{proc.specialtyLabel}</Link></li>
          <li><ChevronRight className="h-3 w-3" /></li>
          <li className="text-foreground font-medium">{proc.name}</li>
        </ol>
      </nav>

      {/* ─── Header ─────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-brand-50 to-white px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <Badge variant="default" className="mb-3">{proc.specialtyLabel}</Badge>
          <h1 className="text-3xl font-extrabold text-foreground sm:text-4xl">{proc.name}</h1>
          <p className="mt-3 max-w-2xl text-lg text-muted-foreground">{proc.tagline}</p>

          {/* Quick stats */}
          <div className="mt-6 flex flex-wrap gap-4">
            <div className="flex items-center gap-1.5 rounded-lg bg-white px-3 py-2 text-sm shadow-sm border border-border">
              <Clock className="h-4 w-4 text-brand-600" />
              <span className="font-medium">{proc.totalStayDays} days</span>
              <span className="text-muted-foreground">total India stay</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-lg bg-white px-3 py-2 text-sm shadow-sm border border-border">
              <Stethoscope className="h-4 w-4 text-brand-600" />
              <span className="font-medium">{proc.hospitalStayDays} days</span>
              <span className="text-muted-foreground">hospital stay</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-lg bg-white px-3 py-2 text-sm shadow-sm border border-border">
              <span className="font-medium">{proc.recoveryWeeks} weeks</span>
              <span className="text-muted-foreground">recovery</span>
            </div>
          </div>

          {/* Direct WhatsApp & Quote CTAs */}
          <TreatmentHeroCTA procedureName={proc.name} />
        </div>
      </section>

      {/* ─── Main Content ────────────────────────────────────────── */}
      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-3">
          {/* Left: description + price factors */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-xl font-bold text-foreground mb-3">About this procedure</h2>
              <p className="text-muted-foreground leading-relaxed">{proc.description}</p>
            </div>

            {/* Price factors */}
            <div>
              <h2 className="text-xl font-bold text-foreground mb-3">What affects the price?</h2>
              <ul className="space-y-2">
                {proc.priceFactors.map((factor) => (
                  <li key={factor} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                    {factor}
                  </li>
                ))}
              </ul>
            </div>

            {/* Hospital packages table */}
            <div>
              <div className="flex items-end justify-between mb-4">
                <h2 className="text-xl font-bold text-foreground">Hospital package prices</h2>
                <p className="text-xs text-amber-700">⚠ Prices not yet independently verified</p>
              </div>

              {packages.length === 0 ? (
                <p className="text-muted-foreground text-sm">No packages listed yet for this procedure.</p>
              ) : (
                <div className="space-y-4">
                  {packages.map(({ hospital, package: pkg }) => (
                    <Card key={hospital.id}>
                      <CardContent className="p-5">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                          <div className="flex-1">
                            <Link
                              href={`/hospitals/${hospital.city}/${hospital.slug}`}
                              className="font-semibold text-foreground hover:text-brand-700 transition-colors"
                            >
                              {hospital.name}
                            </Link>
                            <p className="text-xs text-muted-foreground mt-0.5">{hospital.cityLabel}</p>
                            <div className="mt-2 flex flex-wrap gap-1.5">
                              <AccreditationBadge type="NABH" regNumber={hospital.nabhRegNumber} />
                              {hospital.jciAccredId && (
                                <AccreditationBadge type="JCI" regNumber={hospital.jciAccredId} />
                              )}
                            </div>

                            {/* Includes */}
                            <div className="mt-3">
                              <p className="text-xs font-semibold text-foreground mb-1">Package includes:</p>
                              <ul className="space-y-0.5">
                                {pkg.includes.map((item) => (
                                  <li key={item} className="flex items-start gap-1.5 text-xs text-muted-foreground">
                                    <span className="text-success mt-0.5">✓</span> {item}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Excludes */}
                            <div className="mt-2">
                              <p className="text-xs font-semibold text-foreground mb-1">Not included:</p>
                              <ul className="space-y-0.5">
                                {pkg.excludes.map((item) => (
                                  <li key={item} className="flex items-start gap-1.5 text-xs text-muted-foreground">
                                    <span className="text-destructive mt-0.5">✕</span> {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          <div className="sm:text-right sm:shrink-0 sm:min-w-40">
                            <PriceRange
                              minInr={pkg.priceInrMin}
                              maxInr={pkg.priceInrMax}
                              lastVerifiedAt={pkg.lastVerifiedAt}
                            />
                            <Button size="sm" className="mt-3 w-full sm:w-auto" asChild>
                              <Link href={`/hospitals/${hospital.city}/${hospital.slug}`}>
                                View hospital <ArrowRight className="h-3.5 w-3.5" />
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            {/* FAQ */}
            <div>
              <h2 className="text-xl font-bold text-foreground mb-4">Frequently asked questions</h2>
              <div className="space-y-4">
                {proc.faqs.map((faq, i) => (
                  <details key={i} className="group rounded-lg border border-border bg-white p-4 open:shadow-sm">
                    <summary className="flex cursor-pointer items-center justify-between font-medium text-foreground list-none">
                      {faq.question}
                      <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-90" />
                    </summary>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <aside className="space-y-6">
            <TreatmentSidebarCTA procedureName={proc.name} />

            <Card>
              <CardContent className="p-5">
                <h3 className="font-semibold text-foreground mb-3">Quick price guide</h3>
                <p className="text-xs text-muted-foreground mb-3">Indicative range across our partner hospitals — subject to individual assessment</p>
                <PriceRange
                  minInr={proc.priceInrMin}
                  maxInr={proc.priceInrMax}
                  lastVerifiedAt={null}
                />
                <p className="mt-3 text-xs text-amber-700">
                  ⚠ This range is for guidance only and has not yet been independently verified. See individual hospital packages above.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-5">
                <h3 className="font-semibold text-foreground mb-3">Top cities for this procedure</h3>
                <ul className="space-y-2">
                  {proc.topCities.map((city) => (
                    <li key={city}>
                      <Link
                        href={`/cities/${city.toLowerCase()}`}
                        className="flex items-center justify-between text-sm text-foreground hover:text-brand-600 group"
                      >
                        <span>{city}</span>
                        <ChevronRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-brand-600" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-5">
                <h3 className="font-semibold text-foreground mb-2">Dedicated Patient Assistance</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Need help choosing a hospital or obtaining a medical visa invitation letter? Our team coordinates hospital opinions and airport transfers directly.
                </p>
                <Link href="/how-we-work" className="mt-3 flex items-center gap-1 text-xs font-semibold text-brand-600 hover:text-brand-700">
                  How our support works <ArrowRight className="h-3 w-3" />
                </Link>
              </CardContent>
            </Card>
          </aside>
        </div>
      </section>
    </>
  )
}
