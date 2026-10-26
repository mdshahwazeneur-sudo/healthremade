import type { Metadata } from 'next'
import Link from 'next/link'
import { ExternalLink, ArrowRight } from 'lucide-react'
import { Badge, Card, CardContent, Button } from '@/components/ui/primitives'

export const metadata: Metadata = {
  title: 'India Medical Visa (MED) Guide & Travel Process | healthremade',
  description:
    'Complete medical visa process for India: step-by-step by country, official embassy contacts, documents required, and hospital invitation letters.',
  alternates: {
    canonical: '/visa-and-travel',
  },
  openGraph: {
    title: 'India Medical Visa (MED) Guide & Travel Process | healthremade',
    description:
      'Official medical visa requirements, invitation letters, embassy guidelines, and travel checklist for medical treatment in India.',
    url: '/visa-and-travel',
  },
}

const VISA_DATA = [
  {
    region: 'UK & Ireland',
    visaType: 'Medical Visa (MED)',
    daysToProcess: '5–10 working days',
    validity: '180 days (multiple entry)',
    embassyUrl: 'https://www.hcilondon.gov.in/visa-info.php',
    documents: [
      'Valid passport (6+ months validity)',
      'Completed Visa Application Form (online)',
      'Hospital invitation letter on official letterhead',
      'Diagnosis letter from your home country doctor',
      'Proof of sufficient funds',
      'Return flight booking',
      'Hotel or accommodation booking',
      '2 recent passport photographs',
    ],
    notes: 'UK nationals can apply via the Indian Visa Application Centre (VFS Global) online. Medical visa allows entry for up to 180 days per visit; valid for 12 months from issue.',
  },
  {
    region: 'USA & Canada',
    visaType: 'Medical Visa (MED)',
    daysToProcess: '5–15 working days',
    validity: '180 days (multiple entry)',
    embassyUrl: 'https://www.cgisf.gov.in/visa/medical-visa/',
    documents: [
      'Valid passport (6+ months validity)',
      'Online Visa Application Form',
      'Hospital invitation/appointment letter',
      'Doctor\'s letter from treating physician in US/Canada',
      'Proof of financial ability to cover treatment costs',
      'Return/onward ticket booking',
    ],
    notes: 'Apply through the Indian consulate in your region. Allow extra time for busy periods. US/Canada applicants may use BLS International or VFS Global centres.',
  },
  {
    region: 'Nigeria & West Africa',
    visaType: 'Medical Visa (MED)',
    daysToProcess: '7–14 working days',
    validity: '180 days',
    embassyUrl: 'https://www.hciabuja.gov.in/',
    documents: [
      'Valid international passport',
      'Completed visa form (online)',
      'Hospital referral/invitation letter',
      'Medical report from Nigerian doctor',
      'Bank statement (last 3 months)',
      'Return flight booking',
    ],
    notes: 'Apply at the Indian High Commission in Abuja or the Consulate General in Lagos. Processing is typically faster via the Abuja High Commission for Abuja residents.',
  },
  {
    region: 'Gulf (UAE, Saudi Arabia, Qatar, Kuwait)',
    visaType: 'Medical Visa (MED)',
    daysToProcess: '3–7 working days',
    validity: '180 days',
    embassyUrl: 'https://indembassyuae.gov.in/',
    documents: [
      'Valid passport',
      'Online application form',
      'Hospital appointment/invitation letter',
      'Medical records and diagnosis',
      'Emirates/Iqama ID copy (for UAE residents)',
      'Return ticket booking',
    ],
    notes: 'Gulf-based expats may find e-Medical Visa (e-MED Visa) processing convenient. Shorter processing times reflect high volume of India-bound medical travellers from the Gulf.',
  },
  {
    region: 'East Africa (Kenya, Tanzania, Uganda, Ethiopia)',
    visaType: 'Medical e-Visa (e-MED)',
    daysToProcess: '3–5 working days (online)',
    validity: '60 days (extendable)',
    embassyUrl: 'https://indianvisaonline.gov.in/',
    documents: [
      'Valid passport',
      'Online e-Visa application',
      'Hospital letter or appointment confirmation',
      'Medical records',
      'Bank statement',
      'Return flight booking',
    ],
    notes: 'East African nationals can apply for India e-Medical Visa online at indianvisaonline.gov.in. Visa is emailed — no physical stamp required. Extendable at the FRRO in India.',
  },
]

const TRAVEL_TIPS = [
  {
    title: 'Fly into the right airport',
    description:
      'Delhi (IGI Airport) for North India hospitals. Mumbai (CSIA) for Mumbai hospitals. Chennai (MAA) for Chennai. Bangalore (KIA) for Bangalore. Hyderabad (RGIA) for Hyderabad. All have international terminals with direct or one-stop connections from most origin countries.',
  },
  {
    title: 'Book aisle seats and compression socks',
    description:
      'For long-haul flights to India (8–15 hours), particularly after cardiac or orthopaedic procedures, book aisle seats and use graduated compression stockings. Your discharge team will advise on anticoagulation for the journey home.',
  },
  {
    title: 'Foreign exchange and payments',
    description:
      'Major Indian hospitals accept international credit cards and wire transfers. For daily expenses, withdraw INR at airport ATMs (Citibank, HDFC, ICICI have reliable international ATM networks). Avoid airport currency exchange counters — rates are poor.',
  },
  {
    title: 'SIM card and connectivity',
    description:
      'Buy a local Indian SIM at the airport (Airtel or Jio). You will need your passport and a local address (hospital address works) for registration. A local SIM reduces roaming costs and ensures reliable connectivity with your coordinator and the hospital.',
  },
  {
    title: 'Accommodation near hospitals',
    description:
      'Most major Indian hospitals have on-site guest houses or affiliated hotels within walking distance. We recommend staying within 15 minutes of the hospital for the first 7–10 days post-discharge. Your coordinator will recommend options based on your hospital and budget.',
  },
]

export default function VisaAndTravelPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-50 to-white px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-extrabold text-foreground sm:text-4xl">
            Visa & travel to India
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
            Step-by-step medical visa guidance by country, document checklists, and practical travel tips. All embassy links go directly to official government sources.
          </p>
        </div>
      </section>

      {/* Medical visa notice */}
      <section className="bg-amber-50 border-y border-amber-200 px-4 py-5 sm:px-6">
        <div className="mx-auto max-w-3xl flex gap-3 text-sm text-amber-800">
          <span className="text-lg shrink-0">⚠</span>
          <div>
            <strong>Important:</strong> Always apply for a Medical Visa (MED), not a tourist visa, when travelling for treatment. A tourist visa does not permit medical treatment stays longer than 60 days and may affect your insurance coverage. Visa rules change — verify at the official embassy website before applying.
          </div>
        </div>
      </section>

      {/* Visa by region */}
      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-foreground mb-8">Medical visa by country/region</h2>
          <div className="space-y-6">
            {VISA_DATA.map((region) => (
              <Card key={region.region}>
                <CardContent className="p-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="font-bold text-foreground">{region.region}</h3>
                        <Badge variant="default">{region.visaType}</Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                        <div>
                          <span className="text-xs text-muted-foreground uppercase tracking-wide">Processing time</span>
                          <p className="font-medium text-foreground">{region.daysToProcess}</p>
                        </div>
                        <div>
                          <span className="text-xs text-muted-foreground uppercase tracking-wide">Validity</span>
                          <p className="font-medium text-foreground">{region.validity}</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-xs font-semibold text-foreground mb-2">Documents required:</p>
                        <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-1">
                          {region.documents.map((doc) => (
                            <li key={doc} className="flex items-start gap-1.5 text-xs text-muted-foreground">
                              <span className="text-success mt-0.5 shrink-0">✓</span> {doc}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {region.notes && (
                        <p className="mt-3 text-xs text-muted-foreground border-t border-border pt-3">
                          <strong>Note:</strong> {region.notes}
                        </p>
                      )}
                    </div>

                    <div className="sm:shrink-0 sm:pl-6">
                      <a
                        href={region.embassyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-brand-200 bg-brand-50 px-3 py-2 text-xs font-semibold text-brand-700 hover:bg-brand-100 transition-colors"
                      >
                        Official embassy <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Visa information is provided for guidance only. Always verify current requirements directly with the relevant Indian embassy or consulate before applying. healthremade does not provide legal immigration advice.
          </p>
        </div>
      </section>

      {/* Travel tips */}
      <section className="bg-muted px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-foreground mb-8">Practical travel tips</h2>
          <div className="space-y-5">
            {TRAVEL_TIPS.map((tip) => (
              <div key={tip.title} className="flex gap-4">
                <div className="h-2 w-2 shrink-0 rounded-full bg-brand-500 mt-2" />
                <div>
                  <h3 className="font-semibold text-foreground">{tip.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{tip.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-xl font-bold text-foreground">Ready to start planning?</h2>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" asChild>
              <Link href="/pricing">Browse prices <ArrowRight className="h-4 w-4" /></Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/how-we-work">How it works</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
