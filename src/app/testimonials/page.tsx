import type { Metadata } from 'next'
import Link from 'next/link'
import { Video, ShieldCheck, Star, Award, Building2, CheckCircle2 } from 'lucide-react'
import { Badge, Button, Card, CardContent } from '@/components/ui/primitives'
import { JsonLd } from '@/components/ui/primitives'
import { buildBreadcrumbSchema } from '@/lib/schema'
import { TestimonialsBarView } from '@/components/testimonials/TestimonialsBarView'
import { OutcomesHeroCTA, OutcomesBottomCTA } from '@/components/outcomes/OutcomesCTAs'

export const metadata: Metadata = {
  title: 'Patient Video Testimonials & Verified Clinical Outcomes | healthremade',
  description:
    'Watch real video stories from international patients who received cardiac surgery, robotic knee replacement, organ transplants, and dental rehabilitation in India with 70–85% savings.',
  openGraph: {
    title: 'Patient Video Testimonials & Verified Clinical Outcomes | healthremade',
    description:
      'Real video stories and full case backgrounds from international patients treated at top JCI/NABH accredited hospitals in India.',
  },
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://healthremade.com'

export default function TestimonialsPage() {
  const jsonLd = buildBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Patient Testimonials', url: `${SITE_URL}/testimonials` },
  ])

  return (
    <>
      <JsonLd data={jsonLd} />

      {/* ─── Hero Section ────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-brand-50 via-white to-slate-50 px-4 py-12 sm:px-6 sm:py-16 border-b border-slate-200/70">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Badge variant="verified">
              <ShieldCheck className="h-3 w-3 mr-1 text-emerald-600" />
              Verified Hospital Outcomes
            </Badge>
            <span className="text-xs text-slate-500 font-semibold">• 100% On-Location Hospital Filming</span>
          </div>

          <h1 className="text-3xl font-extrabold text-slate-900 sm:text-5xl leading-tight tracking-tight">
            Patient Video Testimonials & Success Stories
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
            Watch authentic video testimonials from patients worldwide who traveled to India for world-class cardiac surgery, joint replacements, organ transplants, and advanced dental care.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-200/80">
            <div>
              <div className="text-2xl sm:text-3xl font-black text-brand-600">70–90%</div>
              <p className="text-xs text-slate-500 mt-0.5">Average Cost Savings vs US/UK</p>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-600">0 Days</div>
              <p className="text-xs text-slate-500 mt-0.5">Waitlist for Critical Surgeries</p>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900">12+</div>
              <p className="text-xs text-slate-500 mt-0.5">Subtitled Languages Available</p>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-amber-500">99.2%</div>
              <p className="text-xs text-slate-500 mt-0.5">Clinical Success Benchmark</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Main Interactive Testimonials Section (Bar Form + Detail View + Suggestions) ── */}
      <section className="bg-slate-50 dark:bg-slate-950 px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <TestimonialsBarView />
        </div>
      </section>

      {/* ─── Bottom CTA ──────────────────────────────────────────── */}
      <OutcomesBottomCTA />
    </>
  )
}
