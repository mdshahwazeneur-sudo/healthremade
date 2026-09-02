import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { PROCEDURES, getProceduresBySpecialty } from '@/data/procedures'
import { Badge, Card, CardContent } from '@/components/ui/primitives'
import { formatINR } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Medical Treatments in India — All Procedures & Prices | healthremade',
  description:
    'Browse all medical procedures available in India with transparent price ranges, recovery timelines, and top hospital matches. No form-fill required.',
}

export default function TreatmentsIndexPage() {
  const bySpecialty = getProceduresBySpecialty()

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-extrabold text-foreground sm:text-4xl mb-3">All treatments</h1>
      <p className="text-muted-foreground mb-10">
        Browse all {PROCEDURES.length} flagship procedures with indicative price ranges — no account required.
      </p>

      {Array.from(bySpecialty.entries()).map(([specialty, procs]) => (
        <div key={specialty} className="mb-10">
          <h2 className="text-lg font-bold text-foreground mb-4 capitalize">
            {procs[0].specialtyLabel}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {procs.map((proc) => (
              <Link key={proc.id} href={`/treatments/${proc.specialty}/${proc.slug}`} className="group">
                <Card className="h-full transition-shadow group-hover:shadow-md">
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-foreground group-hover:text-brand-700 transition-colors">
                      {proc.name}
                    </h3>
                    <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2">{proc.tagline}</p>
                    <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground">From</p>
                        <p className="font-bold text-foreground">{formatINR(proc.priceInrMin)}</p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-brand-600" />
                    </div>
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
