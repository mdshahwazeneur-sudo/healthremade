import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, ShieldCheck, HelpCircle, Video } from 'lucide-react'
import { Badge, Button, Card, CardContent } from '@/components/ui/primitives'
import { OutcomeStat } from '@/components/ui/medical'
import { JsonLd } from '@/components/ui/primitives'
import { buildBreadcrumbSchema } from '@/lib/schema'
import { OutcomesHeroCTA, OutcomesBottomCTA } from '@/components/outcomes/OutcomesCTAs'
import { CloudflareVideoTestimonialPlayer } from '@/components/testimonials/CloudflareVideoTestimonialPlayer'

export const metadata: Metadata = {
  title: 'Verified Patient Outcomes & Hospital Success Metrics | healthremade',
  description:
    'How healthremade evaluates hospital success rates, survey-backed NPS metrics, and patient-reported clinical outcomes across top Indian medical centres.',
  openGraph: {
    title: 'Verified Patient Outcomes & Hospital Success Metrics | healthremade',
    description:
      'Transparent, survey-backed patient satisfaction and outcome data for accredited hospitals in Delhi NCR and India.',
  },
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://healthremade.com'

const SURVEY_QUESTIONS = [
  'How would you rate your overall treatment experience at the hospital?',
  'How clearly was your treatment plan and expected outcome explained before the procedure?',
  'How would you rate the responsiveness of the hospital\'s care team during your stay?',
  'Did the final cost match the quoted package price? (If not, what changed?)',
  'How would you rate your physical recovery at 4 weeks post-treatment?',
  'How would you rate the hospital\'s discharge planning and post-op instructions?',
  'How satisfied are you with the post-op telemedicine follow-up support?',
  'Did you experience any complication that required unplanned medical attention?',
  'How likely are you to recommend this hospital to a friend or family member? (0–10)',
  'Is there anything you would have wanted to know before travelling to India for treatment?',
]

const METHODOLOGY = [
  {
    title: 'Multi-Stage Longitudinal Surveys',
    description:
      'Surveys are sent at 4 weeks, 12 weeks, and 26 weeks post-discharge. Capturing multiple time points gives an honest picture of long-term recovery and clinical satisfaction.',
  },
  {
    title: 'Verified Booking Authentication',
    description:
      'Surveys are sent only to patients whose admission was verified in the hospital management system. We do not accept unverified third-party reviews, preventing manipulation.',
  },
  {
    title: 'Standardized NPS Benchmark',
    description:
      'Net Promoter Score (NPS) is calculated from the willingness to recommend question (0–10). Promoters score 9–10, Passives 7–8, Detractors 0–6. NPS = % Promoters − % Detractors.',
  },
  {
    title: 'Independent Publication Threshold',
    description:
      'A hospital must reach a minimum threshold of verified post-treatment survey responses before published aggregate scores are displayed on its public profile.',
  },
  {
    title: 'Strict Separation from Marketing',
    description:
      'Verified survey data is compiled independently. Hospitals cannot edit, filter, or suppress survey responses or published patient outcomes.',
  },
]

export default function VerifiedOutcomesPage() {
  const jsonLd = buildBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Verified Outcomes', url: `${SITE_URL}/verified-outcomes` },
  ])

  return (
    <>
      <JsonLd data={jsonLd} />

      {/* ─── 1. Hero ─────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-brand-50 via-white to-slate-50 px-4 py-14 sm:px-6 sm:py-18 border-b border-slate-200/70">
        <div className="mx-auto max-w-4xl">
          <Badge variant="verified" className="mb-4">
            Survey-Backed Clinical Transparency
          </Badge>
          <h1 className="text-3xl font-extrabold text-slate-900 sm:text-5xl leading-tight">
            Verified Patient Outcomes & Quality Benchmarks
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
            Every quality metric and NPS score on healthremade is collected through structured post-treatment patient surveys — giving you unbiased data to choose the right hospital.
          </p>

          {/* Direct CTA Buttons */}
          <OutcomesHeroCTA />
        </div>
      </section>

      {/* ─── 2. Live Quality Indicators ──────────────────────────── */}
      <section className="border-b border-border bg-white px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <p className="text-center text-xs text-slate-500 mb-6 uppercase tracking-wider font-semibold">
            Platform Quality Assurance Standards
          </p>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            <OutcomeStat label="Accredited Partners" value="100%" subtext="JCI / NABH Verified" />
            <OutcomeStat label="Response Rate" value=">65%" subtext="At 4 & 12 weeks" />
            <OutcomeStat label="Surgeon Seniority" value="15+ Yrs" subtext="Average lead surgeon exp." />
            <OutcomeStat label="Free Quotes Given" value="1,000+" subtext="Multiple hospital choices" />
          </div>
        </div>
      </section>

      {/* ─── 2.5 Video Testimonials with Real-time Multi-Language Subtitles ── */}
      <section className="bg-slate-950 px-4 py-16 sm:px-6 border-b border-slate-800 text-white">
        <div className="mx-auto max-w-6xl space-y-6">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-500/20 border border-brand-400/30 px-3.5 py-1 text-xs font-bold text-brand-300 mb-3">
              <Video className="h-3.5 w-3.5" />
              <span>Cloudflare Stream Video Testimonials</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Real Patient Stories & Subtitle Translations
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-2">
              Select your preferred language in the top menu bar to automatically sync subtitles and interactive video transcripts in real-time across 12 languages.
            </p>
          </div>

          <CloudflareVideoTestimonialPlayer />
        </div>
      </section>

      {/* ─── 3. Methodology ──────────────────────────────────────── */}
      <section className="px-4 py-16 sm:px-6 bg-slate-50">
        <div className="mx-auto max-w-4xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Badge variant="default" className="mb-2">Data Integrity</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              How We Evaluate Hospital Quality
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Our 5-pillar verification framework ensures data integrity and objective patient feedback.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {METHODOLOGY.map((item, i) => (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs"
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-100 text-brand-700 text-xs font-bold">
                    0{i + 1}
                  </span>
                  <h3 className="font-bold text-base text-slate-900">{item.title}</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. The Survey Questions ─────────────────────────────── */}
      <section className="bg-white px-4 py-16 sm:px-6 border-t border-slate-200">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Standardized Survey Questionnaire</h2>
            <p className="text-sm text-slate-600 mt-1">
              These exact questions are sent to international patients at 4, 12, and 26 weeks post-surgery:
            </p>
          </div>

          <div className="space-y-3">
            {SURVEY_QUESTIONS.map((q, i) => (
              <div key={i} className="flex gap-3.5 rounded-xl bg-slate-50/70 border border-slate-200 p-4">
                <span className="text-xs font-extrabold text-brand-600 bg-white border border-brand-200 rounded-md h-6 w-6 flex items-center justify-center shrink-0">
                  Q{i + 1}
                </span>
                <p className="text-xs sm:text-sm text-slate-800 font-medium">{q}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 5. Clinical Disclaimer / Context ─────────────────────── */}
      <section className="bg-slate-50 px-4 py-14 sm:px-6 border-t border-slate-200">
        <div className="mx-auto max-w-3xl space-y-4">
          <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-brand-600" />
            Important Context on Medical Data
          </h2>

          <Card>
            <CardContent className="p-5 space-y-2">
              <h3 className="font-semibold text-sm text-slate-900">Patient-Reported vs. Clinical Registry Data</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Patient surveys reflect recovery experiences, hospital care responsiveness, and billing transparency. Specific clinical feasibility and surgical risk assessments are evaluated by senior department heads on a case-by-case basis.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-5 space-y-2">
              <h3 className="font-semibold text-sm text-slate-900">Individual Medical Assessment</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Treatment outcomes depend on diagnosis, age, medical history, and procedural complexity. We recommend requesting opinions from multiple hospitals before making travel arrangements.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ─── 6. High-Conversion Bottom CTA ───────────────────────── */}
      <OutcomesBottomCTA />
    </>
  )
}
