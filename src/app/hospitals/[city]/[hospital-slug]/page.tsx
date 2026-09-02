import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MapPin, ChevronRight, ExternalLink, CheckCircle2 } from 'lucide-react'
import { getHospital, getAllHospitalParams } from '@/data/hospitals'
import { PROCEDURES } from '@/data/procedures'
import { Badge, Button, Card, CardContent } from '@/components/ui/primitives'
import { PriceRange, AccreditationBadge, NPSScore } from '@/components/ui/medical'
import { JsonLd } from '@/components/ui/primitives'
import { buildHospitalSchema, buildBreadcrumbSchema } from '@/lib/schema'
import { HospitalHeroCTA, HospitalSidebarCTA } from '@/components/hospital/HospitalCTAs'

type Params = Promise<{ city: string; 'hospital-slug': string }>

export async function generateStaticParams() {
  return getAllHospitalParams()
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { city, 'hospital-slug': slug } = await params
  const hospital = getHospital(city, slug)
  if (!hospital) return {}

  return {
    title: `${hospital.name} — ${hospital.cityLabel} | healthremade`,
    description: `${hospital.description.slice(0, 155)}…`,
    alternates: { canonical: `/hospitals/${city}/${slug}` },
  }
}

export default async function HospitalPage({ params }: { params: Params }) {
  const { city, 'hospital-slug': slug } = await params
  const hospital = getHospital(city, slug)
  if (!hospital) notFound()

  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://healthremade.com'
  const pageUrl = `${SITE_URL}/hospitals/${city}/${slug}`

  const jsonLd = [
    buildHospitalSchema({
      name: hospital.name,
      url: pageUrl,
      address: {
        streetAddress: hospital.address,
        addressLocality: hospital.cityLabel,
        addressRegion: hospital.city.toUpperCase(),
        addressCountry: 'IN',
      },
      ...(hospital.npsScore !== null && hospital.npsResponseCount !== null
        ? {
            aggregateRating: {
              ratingValue: Math.min(5, (hospital.npsScore + 100) / 40),
              reviewCount: hospital.npsResponseCount,
            },
          }
        : {}),
    }),
    buildBreadcrumbSchema([
      { name: 'Home', url: SITE_URL },
      { name: 'Hospitals', url: `${SITE_URL}/hospitals` },
      { name: hospital.cityLabel, url: `${SITE_URL}/cities/${city}` },
      { name: hospital.name, url: pageUrl },
    ]),
  ]

  return (
    <>
      <JsonLd data={jsonLd} />

      {/* Breadcrumb */}
      <nav className="border-b border-border bg-white px-4 py-3 sm:px-6" aria-label="Breadcrumb">
        <ol className="mx-auto flex max-w-7xl items-center gap-1.5 text-xs text-muted-foreground">
          <li><Link href="/" className="hover:text-brand-600">Home</Link></li>
          <li><ChevronRight className="h-3 w-3" /></li>
          <li><Link href="/hospitals" className="hover:text-brand-600">Hospitals</Link></li>
          <li><ChevronRight className="h-3 w-3" /></li>
          <li><Link href={`/cities/${city}`} className="hover:text-brand-600">{hospital.cityLabel}</Link></li>
          <li><ChevronRight className="h-3 w-3" /></li>
          <li className="text-foreground font-medium">{hospital.name}</li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-50 to-white px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-7xl">
          {/* Hospital Photo Banner */}
          <div className="relative mb-6 h-56 w-full rounded-2xl overflow-hidden bg-slate-900 shadow-md sm:h-80 border border-slate-200">
            {hospital.photos.length > 0 ? (
              <>
                <img
                  src={hospital.photos[0]}
                  alt={`${hospital.name} Campus`}
                  className="h-full w-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                  <span className="text-xs sm:text-sm font-semibold bg-black/50 backdrop-blur-md px-3 py-1 rounded-lg border border-white/20">
                    🏛️ Verified Hospital Campus & Infrastructure
                  </span>
                  <span className="text-xs bg-emerald-600/90 font-bold px-2.5 py-1 rounded-lg">
                    {hospital.bedCount}+ Beds
                  </span>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-slate-400 text-sm">
                {hospital.name}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-2xl font-extrabold text-foreground sm:text-3xl">{hospital.name}</h1>
              <p className="mt-1 flex items-center gap-1.5 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {hospital.address}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <AccreditationBadge type="NABH" regNumber={hospital.nabhRegNumber} />
                {hospital.jciAccredId && (
                  <AccreditationBadge type="JCI" regNumber={hospital.jciAccredId} />
                )}
              </div>
            </div>

            <div className="sm:text-right">
              <NPSScore score={hospital.npsScore} responseCount={hospital.npsResponseCount} />
              {hospital.website && (
                <a
                  href={hospital.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-xs text-brand-600 hover:text-brand-700"
                >
                  Official website <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
          </div>

          {/* Direct CTA Bar */}
          <HospitalHeroCTA hospitalName={hospital.name} city={hospital.cityLabel} />
        </div>
      </section>

      {/* Main */}
      <section className="px-4 py-10 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <div>
              <h2 className="text-xl font-bold text-foreground mb-3">About {hospital.name}</h2>
              <p className="text-muted-foreground leading-relaxed">{hospital.description}</p>
              <div className="mt-4 grid grid-cols-3 gap-3">
                <div className="rounded-lg bg-muted p-3 text-center">
                  <div className="text-xl font-bold text-brand-700">{hospital.bedCount.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Beds</div>
                </div>
                <div className="rounded-lg bg-muted p-3 text-center">
                  <div className="text-xl font-bold text-brand-700">{hospital.founded}</div>
                  <div className="text-xs text-muted-foreground">Founded</div>
                </div>
                <div className="rounded-lg bg-muted p-3 text-center">
                  <div className="text-xl font-bold text-brand-700">{hospital.specialties.length}+</div>
                  <div className="text-xs text-muted-foreground">Specialties</div>
                </div>
              </div>
            </div>

            {/* Accreditation detail */}
            <div>
              <h2 className="text-xl font-bold text-foreground mb-3">Accreditation</h2>
              <div className="space-y-3">
                <div className="rounded-lg border border-border bg-white p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm">NABH Accreditation</span>
                        {hospital.nabhRegNumber ? (
                          <Badge variant="verified" className="text-xs">Verified</Badge>
                        ) : (
                          <Badge variant="warning" className="text-xs">Registration pending</Badge>
                        )}
                      </div>
                      {hospital.nabhRegNumber ? (
                        <p className="text-xs text-muted-foreground mt-1">Reg. No: {hospital.nabhRegNumber}</p>
                      ) : (
                        <p className="text-xs text-amber-700 mt-1">⚠ NABH registration number not yet confirmed — verify before booking</p>
                      )}
                    </div>
                    <a
                      href="https://www.nabh.co/AccreditedHospitals.aspx"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-brand-600 hover:text-brand-700 flex items-center gap-0.5"
                    >
                      Verify <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>

                {hospital.jciAccredId && (
                  <div className="rounded-lg border border-border bg-white p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm">JCI Accreditation</span>
                          <Badge variant="verified" className="text-xs">International</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Accred. ID: {hospital.jciAccredId}</p>
                      </div>
                      <a
                        href="https://www.jointcommissioninternational.org/who-we-are/accredited-organizations/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-brand-600 hover:text-brand-700 flex items-center gap-0.5"
                      >
                        Verify <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Package pricing */}
            <div>
              <h2 className="text-xl font-bold text-foreground mb-2">Package pricing</h2>
              <p className="text-xs text-amber-700 mb-4">⚠ Prices not yet independently verified — for guidance only</p>

              {hospital.packages.length === 0 ? (
                <p className="text-muted-foreground text-sm">No packages listed yet.</p>
              ) : (
                <div className="space-y-4">
                  {hospital.packages.map((pkg) => {
                    const procedure = PROCEDURES.find((p) => p.id === pkg.procedureId)
                    return (
                      <Card key={pkg.procedureId}>
                        <CardContent className="p-5">
                          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
                            <div className="flex-1">
                              <h3 className="font-semibold text-foreground">{pkg.procedureName}</h3>
                              {procedure && (
                                <Link
                                  href={`/treatments/${procedure.specialty}/${procedure.slug}`}
                                  className="text-xs text-brand-600 hover:text-brand-700"
                                >
                                  About this procedure →
                                </Link>
                              )}

                              <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1">
                                <div>
                                  <p className="text-xs font-semibold text-foreground mb-1">Includes</p>
                                  {pkg.includes.map((item) => (
                                    <p key={item} className="flex items-start gap-1 text-xs text-muted-foreground">
                                      <span className="text-success mt-0.5 shrink-0">✓</span> {item}
                                    </p>
                                  ))}
                                </div>
                                <div>
                                  <p className="text-xs font-semibold text-foreground mb-1">Not included</p>
                                  {pkg.excludes.map((item) => (
                                    <p key={item} className="flex items-start gap-1 text-xs text-muted-foreground">
                                      <span className="text-destructive mt-0.5 shrink-0">✕</span> {item}
                                    </p>
                                  ))}
                                </div>
                              </div>
                            </div>

                            <div className="sm:min-w-48 sm:shrink-0">
                              <PriceRange
                                minInr={pkg.priceInrMin}
                                maxInr={pkg.priceInrMax}
                                lastVerifiedAt={pkg.lastVerifiedAt}
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Specialties */}
            <div>
              <h2 className="text-xl font-bold text-foreground mb-3">Specialties</h2>
              <div className="flex flex-wrap gap-2">
                {hospital.specialties.map((spec) => (
                  <Badge key={spec} variant="default">{spec}</Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <HospitalSidebarCTA hospitalName={hospital.name} city={hospital.cityLabel} />

            <Card>
              <CardContent className="p-5">
                <h3 className="font-semibold text-foreground mb-3">International Patient Services</h3>
                <ul className="space-y-2 text-xs text-muted-foreground">
                  <li className="flex items-start gap-1.5">
                    <span className="text-success font-bold">✓</span> Visa invitation letter & embassy documentation
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-success font-bold">✓</span> Airport pickup & hospital transfer assistance
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-success font-bold">✓</span> Multi-lingual medical interpreter on request
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-success font-bold">✓</span> Post-discharge telemetry & telemedicine checkup
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-5">
                <h3 className="font-semibold text-foreground mb-3">Enquire about this hospital</h3>
                <p className="text-xs text-muted-foreground mb-3">
                  Create a free account to send an enquiry. We never share your details without consent.
                </p>
                <Button size="md" className="w-full" asChild>
                  <Link href="/register">Create account to enquire</Link>
                </Button>
              </CardContent>
            </Card>
          </aside>
        </div>
      </section>
    </>
  )
}
