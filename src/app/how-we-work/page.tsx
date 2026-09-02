import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { Badge, Card, CardContent, Button } from '@/components/ui/primitives'
import { JsonLd } from '@/components/ui/primitives'
import { buildBreadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'How We Work — Patient Journey | healthremade',
  description:
    'How healthremade works: from browsing real prices to coordinated travel, treatment, and post-op follow-up from home. No pop-ups, no hidden steps.',
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://healthremade.com'

const STEPS = [
  {
    phase: 'Before you enquire',
    steps: [
      {
        number: '01',
        title: 'Browse real prices — no account needed',
        description:
          'Every treatment page and hospital listing shows itemized package price ranges. Browse freely. Compare hospitals. Understand what\'s included and what\'s not — before you share your name or email address.',
      },
      {
        number: '02',
        title: 'Check verified outcomes independently',
        description:
          'Hospital NPS scores come from post-treatment patient surveys, not marketing testimonials. Accreditation numbers link directly to the NABH and JCI public registries. Verify them yourself — we want you to.',
      },
      {
        number: '03',
        title: 'Review itemized package inclusions',
        description:
          'Before you contact us, see exactly what each hospital package covers — surgeon fees, ICU days, implant brands, diagnostic tests, and what is excluded.',
      },
    ],
  },
  {
    phase: 'When you enquire',
    steps: [
      {
        number: '04',
        title: 'Create a free account',
        description:
          'Account creation is required only at the point of sending an enquiry — not to browse prices. We never auto-create accounts from lead forms.',
      },
      {
        number: '05',
        title: 'Medical record review',
        description:
          'Share your medical history, recent investigations, and any existing reports securely via your patient dashboard. A named coordinator (not a call centre) reviews your case and confirms which hospitals and treatment pathways are relevant.',
      },
      {
        number: '06',
        title: 'Tailored hospital shortlist',
        description:
          'Your coordinator provides a shortlist of 2–3 hospitals matched to your diagnosis, budget, and travel timeline — with a written explanation of why each was selected. Commission arrangement with each hospital is re-confirmed in writing.',
      },
    ],
  },
  {
    phase: 'During treatment',
    steps: [
      {
        number: '07',
        title: 'Pre-arrival checklist & visa support',
        description:
          'Your patient dashboard generates a pre-arrival checklist tailored to your procedure. We provide a medical visa invitation letter and step-by-step guidance for your country of origin\'s Indian embassy.',
      },
      {
        number: '08',
        title: 'In-country coordination',
        description:
          'Airport transfer, hospital admission, interpreter service (where needed), and daily check-ins from your coordinator during your hospital stay. We are reachable — not via a generic helpline.',
      },
      {
        number: '09',
        title: 'Treatment',
        description:
          'Your care is delivered entirely by the hospital\'s clinical team — healthremade is a coordination and transparency layer, not a clinical provider. We do not intervene in clinical decisions.',
      },
    ],
  },
  {
    phase: 'After you fly home',
    steps: [
      {
        number: '10',
        title: 'Post-op dashboard — active for months',
        description:
          'Your patient dashboard tracks recovery milestones, stores discharge summaries and prescriptions, and schedules telemedicine follow-ups with your Indian care team. The dashboard remains active for the full recovery period — not just until you board your flight.',
      },
      {
        number: '11',
        title: 'Telemedicine follow-up',
        description:
          'Book video consultations with your treating surgeon directly through the dashboard. All clinical notes are stored in your document vault and exportable for your home country GP.',
      },
      {
        number: '12',
        title: 'Outcome survey & review',
        description:
          'At 4, 12, and 26 weeks post-treatment, you\'ll receive a structured outcome survey. Your responses contribute to the hospital\'s verified NPS score — only survey-backed scores are published, never testimonials alone.',
      },
    ],
  },
]

const ESCALATION_STEPS = [
  'Contact your named coordinator with details of the concern',
  'We initiate a formal case within 48 hours and assign a case manager separate from your coordinator',
  'The case manager contacts the hospital directly and documents the response',
  'If unresolved within 14 days, we escalate to the hospital\'s patient advocacy / medical director',
  'Outcome and resolution are documented in your case file, accessible to you at all times',
  'Aggregate escalation data is reviewed monthly and used to inform hospital quality scores',
]

export default function HowWeWorkPage() {
  const jsonLd = buildBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'How We Work', url: `${SITE_URL}/how-we-work` },
  ])

  return (
    <>
      <JsonLd data={jsonLd} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-50 to-white px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-extrabold text-foreground sm:text-4xl">
            How healthremade works
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
            From browsing real prices to post-op recovery at home — every step is transparent, and every fee is disclosed in advance.
          </p>
        </div>
      </section>

      {/* Journey steps */}
      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-3xl">
          {STEPS.map((phase) => (
            <div key={phase.phase} className="mb-12">
              <h2 className="text-sm font-bold uppercase tracking-wider text-brand-600 mb-6">{phase.phase}</h2>
              <div className="space-y-6">
                {phase.steps.map((step) => (
                  <div key={step.number} className="flex gap-5">
                    <div className="flex flex-col items-center">
                      <div className="h-10 w-10 shrink-0 rounded-full bg-brand-600 text-white text-sm font-bold flex items-center justify-center">
                        {step.number}
                      </div>
                      <div className="mt-2 flex-1 w-px bg-border" />
                    </div>
                    <div className="pb-6 flex-1">
                      <h3 className="font-semibold text-foreground">{step.title}</h3>
                      <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Escalation */}
      <section className="bg-muted px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-foreground mb-3">Dispute & escalation process</h2>
          <p className="text-muted-foreground mb-8 max-w-xl">
            If something goes wrong during or after your treatment, we have a formal escalation process — not a generic &ldquo;contact us&rdquo; form. Here is exactly what happens:
          </p>
          <div className="space-y-3">
            {ESCALATION_STEPS.map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="h-6 w-6 shrink-0 rounded-full bg-brand-600 text-white text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
            <strong>Note:</strong> healthremade is a coordination and transparency layer — we cannot override clinical decisions or compel hospitals to take specific clinical actions. Our escalation process covers service quality, pricing discrepancies, communication failures, and post-op follow-up obligations. Clinical complaints should be filed with the hospital&apos;s patient advocacy team and, where applicable, the National Consumer Disputes Redressal Commission (NCDRC) or the Medical Council of India.
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-foreground">Ready to explore?</h2>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" asChild>
              <Link href="/pricing">Browse package prices <ArrowRight className="h-4 w-4" /></Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/verified-outcomes">Verified patient outcomes</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
