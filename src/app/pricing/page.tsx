'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Filter, ArrowUpDown, FileText, MessageCircle } from 'lucide-react'
import { HOSPITALS } from '@/data/hospitals'
import { PROCEDURES } from '@/data/procedures'
import { Button, Card, CardContent } from '@/components/ui/primitives'
import { PriceRange, AccreditationBadge } from '@/components/ui/medical'
import { useQuote } from '@/components/ui/QuoteModal'
import { getWhatsAppUrl } from '@/lib/whatsapp'

type SortKey = 'price_asc' | 'price_desc' | 'city'

export default function PricingPage() {
  const [selectedProcedure, setSelectedProcedure] = useState<string>('all')
  const [selectedCity, setSelectedCity] = useState<string>('all')
  const [sortKey, setSortKey] = useState<SortKey>('price_asc')
  const { openQuoteModal } = useQuote()

  // Flatten all packages into a filterable list
  const allPackages = useMemo(() => {
    return HOSPITALS.flatMap((h) =>
      h.packages.map((pkg) => {
        const procedure = PROCEDURES.find((p) => p.id === pkg.procedureId)
        return { hospital: h, package: pkg, procedure }
      })
    )
  }, [])

  const filtered = useMemo(() => {
    let result = allPackages

    if (selectedProcedure !== 'all') {
      result = result.filter((r) => r.package.procedureId === selectedProcedure)
    }

    if (selectedCity !== 'all') {
      result = result.filter((r) => r.hospital.city === selectedCity)
    }

    if (sortKey === 'price_asc') {
      result = [...result].sort((a, b) => a.package.priceInrMin - b.package.priceInrMin)
    } else if (sortKey === 'price_desc') {
      result = [...result].sort((a, b) => b.package.priceInrMin - a.package.priceInrMin)
    } else if (sortKey === 'city') {
      result = [...result].sort((a, b) => a.hospital.city.localeCompare(b.hospital.city))
    }

    return result
  }, [allPackages, selectedProcedure, selectedCity, sortKey])

  const cities = ['all', ...Array.from(new Set(HOSPITALS.map((h) => h.city)))]
  const procedures = [{ id: 'all', name: 'All procedures' }, ...PROCEDURES.map((p) => ({ id: p.id, name: p.name }))]

  const topWaUrl = getWhatsAppUrl({ pageType: 'pricing' })

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-brand-50 to-white px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl font-extrabold text-foreground sm:text-4xl">
                Medical Pricing Explorer
              </h1>
              <p className="mt-2 max-w-2xl text-base text-muted-foreground">
                Compare itemized package prices across top accredited hospitals in Delhi NCR and India. Free quotes and zero broker markups.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
              <Button
                variant="accent"
                size="md"
                onClick={() => openQuoteModal()}
                className="font-bold shadow-xs"
              >
                <FileText className="h-4 w-4 mr-1.5" />
                Get 3-Hospital Quote
              </Button>

              <a
                href={topWaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#25D366] text-white px-4 py-2 text-xs font-bold hover:bg-[#1EBE5D] transition-colors shadow-xs"
              >
                <MessageCircle className="h-4 w-4 fill-white" />
                WhatsApp Assistance
              </a>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-2 text-xs sm:text-sm text-brand-900 bg-brand-50/80 border border-brand-200 rounded-xl px-4 py-2.5 max-w-2xl">
            <span>ℹ️</span>
            <span>
              Prices shown are indicative package estimates based on hospital tariffs.{' '}
              <Link href="/how-we-work" className="font-semibold underline">Learn how our care coordination works →</Link>
            </span>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-16 z-30 border-b border-border bg-white/95 backdrop-blur-sm px-4 py-3 sm:px-6">
        <div className="mx-auto max-w-5xl flex flex-wrap items-center gap-3">
          <Filter className="h-4 w-4 text-muted-foreground" />

          <select
            value={selectedProcedure}
            onChange={(e) => setSelectedProcedure(e.target.value)}
            className="rounded-lg border border-border bg-white px-3 py-1.5 text-xs sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand-600"
          >
            {procedures.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>

          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="rounded-lg border border-border bg-white px-3 py-1.5 text-xs sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand-600"
          >
            {cities.map((c) => (
              <option key={c} value={c}>{c === 'all' ? 'All cities' : c.charAt(0).toUpperCase() + c.slice(1)}</option>
            ))}
          </select>

          <div className="flex items-center gap-1 ml-auto">
            <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />
            <select
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value as SortKey)}
              className="rounded-lg border border-border bg-white px-3 py-1.5 text-xs sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand-600"
            >
              <option value="price_asc">Price: low to high</option>
              <option value="price_desc">Price: high to low</option>
              <option value="city">City</option>
            </select>
          </div>

          <span className="text-xs text-muted-foreground">{filtered.length} package{filtered.length !== 1 ? 's' : ''}</span>
        </div>
      </section>

      {/* Results */}
      <section className="px-4 py-8 sm:px-6">
        <div className="mx-auto max-w-5xl space-y-4">
          {filtered.length === 0 ? (
            <div className="py-16 text-center text-muted-foreground">
              No packages match your filters.
            </div>
          ) : (
            filtered.map(({ hospital, package: pkg, procedure }) => {
              const rowWaUrl = getWhatsAppUrl({
                pageType: 'pricing',
                treatmentName: pkg.procedureName,
                hospitalName: hospital.name,
                city: hospital.cityLabel,
              })

              return (
                <Card key={`${hospital.id}-${pkg.procedureId}`} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-5">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-start gap-3">
                          <div>
                            <Link
                              href={`/hospitals/${hospital.city}/${hospital.slug}`}
                              className="font-bold text-foreground hover:text-brand-700 transition-colors"
                            >
                              {hospital.name}
                            </Link>
                            <p className="text-xs text-muted-foreground capitalize">{hospital.cityLabel}</p>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {hospital.nabhRegNumber && (
                              <AccreditationBadge type="NABH" regNumber={hospital.nabhRegNumber} />
                            )}
                            {hospital.jciAccredId && (
                              <AccreditationBadge type="JCI" regNumber={hospital.jciAccredId} />
                            )}
                          </div>
                        </div>

                        <div className="mt-2.5">
                          <span className="text-sm font-bold text-brand-900">{pkg.procedureName}</span>
                          {procedure && (
                            <Link
                              href={`/treatments/${procedure.specialty}/${procedure.slug}`}
                              className="ml-2 text-xs text-brand-600 hover:text-brand-700 underline"
                            >
                              procedure info →
                            </Link>
                          )}
                        </div>

                        {/* Includes summary */}
                        <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1">
                          {pkg.includes.slice(0, 3).map((item) => (
                            <span key={item} className="text-xs text-muted-foreground flex items-center gap-1">
                              <span className="text-emerald-600 font-bold">✓</span> {item}
                            </span>
                          ))}
                          {pkg.includes.length > 3 && (
                            <span className="text-xs text-muted-foreground font-medium">+{pkg.includes.length - 3} more</span>
                          )}
                        </div>
                      </div>

                      <div className="sm:shrink-0 sm:min-w-48 flex flex-col gap-2">
                        <PriceRange
                          minInr={pkg.priceInrMin}
                          maxInr={pkg.priceInrMax}
                          lastVerifiedAt={pkg.lastVerifiedAt}
                        />
                        
                        <div className="flex items-center gap-1.5 mt-1">
                          <Button
                            size="sm"
                            variant="accent"
                            onClick={() =>
                              openQuoteModal({
                                treatment: pkg.procedureName,
                                hospital: hospital.name,
                                city: hospital.cityLabel,
                              })
                            }
                            className="flex-1 text-xs font-bold"
                          >
                            <FileText className="h-3 w-3 mr-1" />
                            Get Quote
                          </Button>

                          <a
                            href={rowWaUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center rounded-lg border border-emerald-300 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 p-2 text-xs font-semibold transition-colors"
                            title="Chat on WhatsApp about this hospital package"
                          >
                            <MessageCircle className="h-3.5 w-3.5 fill-[#25D366] text-[#25D366]" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })
          )}
        </div>
      </section>
    </>
  )
}
