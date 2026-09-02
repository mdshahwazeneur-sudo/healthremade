import type { Metadata } from 'next'
import Link from 'next/link'
import { MapPin } from 'lucide-react'
import { HOSPITALS, type City } from '@/data/hospitals'
import { Card, CardContent } from '@/components/ui/primitives'
import { AccreditationBadge } from '@/components/ui/medical'

export const metadata: Metadata = {
  title: 'Accredited Hospitals in India — Partner Listings | healthremade',
  description:
    'Browse our partner hospitals across Delhi NCR, Mumbai, Chennai, Bangalore, and Hyderabad. Accreditation verified via official NABH/JCI registries.',
}

const CITY_LABELS: Record<City, string> = {
  delhi: 'Delhi / NCR',
  mumbai: 'Mumbai',
  chennai: 'Chennai',
  bangalore: 'Bengaluru',
  hyderabad: 'Hyderabad',
}

const byCity = new Map<City, typeof HOSPITALS>()
for (const h of HOSPITALS) {
  const existing = byCity.get(h.city) ?? []
  byCity.set(h.city, [...existing, h])
}

export default function HospitalsIndexPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-extrabold text-foreground sm:text-4xl mb-3">Partner hospitals</h1>
      <p className="text-muted-foreground mb-10 max-w-2xl">
        {HOSPITALS.length} accredited hospitals across India. NABH/JCI accreditation numbers link directly to official public registries.
      </p>

      {Array.from(byCity.entries()).map(([city, hospitals]) => (
        <div key={city} className="mb-10">
          <h2 className="text-lg font-bold text-foreground mb-4">{CITY_LABELS[city]}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {hospitals.map((hospital) => (
              <Link key={hospital.id} href={`/hospitals/${hospital.city}/${hospital.slug}`} className="group">
                <Card className="h-full transition-shadow group-hover:shadow-md">
                  <CardContent className="p-5">
                    {/* Photo */}
                    <div className="relative mb-4 h-36 w-full rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
                      {hospital.photos.length > 0 ? (
                        <img
                          src={hospital.photos[0]}
                          alt={hospital.name}
                          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-slate-400 text-xs">
                          {hospital.name}
                        </div>
                      )}
                    </div>
                    <h3 className="font-semibold text-sm text-foreground group-hover:text-brand-700 transition-colors leading-snug">
                      {hospital.name}
                    </h3>
                    <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" /> {hospital.cityLabel}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      <AccreditationBadge type="NABH" regNumber={hospital.nabhRegNumber} />
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">
                      {hospital.specialties.slice(0, 3).join(' · ')}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
