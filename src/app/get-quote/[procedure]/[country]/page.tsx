import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ShieldCheck,
  CheckCircle2,
  FileText,
  MessageCircle,
  TrendingDown,
  Building2,
  Stethoscope,
  PhoneCall,
  Clock,
  Award,
  Globe2,
  Lock,
} from 'lucide-react'
import { INITIAL_LANDING_PAGES, type LandingPageRecord } from '@/data/landingPagesData'
import { HOSPITALS } from '@/data/hospitals'
import { DOCTORS } from '@/data/doctors'
import { Badge, Button, Card, CardContent } from '@/components/ui/primitives'
import { getWhatsAppUrl } from '@/lib/whatsapp'
import { PublicLandingPageClient } from './PublicLandingPageClient'

type Params = Promise<{ procedure: string; country: string }>

export async function generateStaticParams() {
  // Only pre-render published landing pages
  return INITIAL_LANDING_PAGES.filter((l) => l.status === 'published').map((l) => ({
    procedure: l.procedureSlug,
    country: l.countrySlug,
  }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { procedure: procSlug, country: countrySlug } = await params
  const lp = INITIAL_LANDING_PAGES.find(
    (l) => l.procedureSlug === procSlug && l.countrySlug === countrySlug
  )

  if (!lp || lp.status !== 'published') {
    return {}
  }

  return {
    title: lp.metaTitle,
    description: lp.metaDescription,
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default async function PublicGeneratedLandingPage({ params }: { params: Params }) {
  const { procedure: procSlug, country: countrySlug } = await params

  // ─── STRICT PUBLISHING CONSTRAINT (DATABASE/ROUTE LEVEL) ───────────────
  // A pending or draft page MUST NEVER be accessible on the live site.
  // It only becomes reachable after status === 'published'.
  const lp = INITIAL_LANDING_PAGES.find(
    (l) => l.procedureSlug === procSlug && l.countrySlug === countrySlug
  )

  if (!lp || lp.status !== 'published') {
    notFound()
  }

  // Find linked hospital objects
  const matchingHospitals = HOSPITALS.filter((h) =>
    lp.hospitalNames.some((hn) => h.name.toLowerCase().includes(hn.toLowerCase()) || hn.toLowerCase().includes(h.name.toLowerCase()))
  )

  // Find matching top doctors
  const matchingDoctors = DOCTORS.filter((d) =>
    d.department.toLowerCase().includes(lp.category.toLowerCase()) ||
    d.keyExpertise.some((ke) => lp.procedureName.toLowerCase().includes(ke.toLowerCase()) || ke.toLowerCase().includes(lp.procedureName.toLowerCase()))
  ).slice(0, 3)

  return (
    <PublicLandingPageClient
      lp={lp}
      hospitals={matchingHospitals.length > 0 ? matchingHospitals : HOSPITALS.slice(0, 2)}
      doctors={matchingDoctors.length > 0 ? matchingDoctors : DOCTORS.slice(0, 2)}
    />
  )
}
