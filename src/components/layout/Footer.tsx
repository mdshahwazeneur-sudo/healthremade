import Link from 'next/link'
import { Separator } from '@/components/ui/primitives'

const TREATMENT_LINKS = [
  { label: 'Bypass Surgery (CABG)', href: '/treatments/cardiac/bypass-surgery' },
  { label: 'Knee Replacement', href: '/treatments/orthopaedics/knee-replacement' },
  { label: 'Liver Transplant', href: '/treatments/transplant/liver-transplant' },
  { label: 'IVF Treatment', href: '/treatments/fertility/ivf' },
  { label: 'Spinal Fusion', href: '/treatments/neurology/spinal-fusion' },
]

const CITY_LINKS = [
  { label: 'Delhi NCR', href: '/cities/delhi' },
  { label: 'Mumbai', href: '/cities/mumbai' },
  { label: 'Chennai', href: '/cities/chennai' },
  { label: 'Bangalore', href: '/cities/bangalore' },
  { label: 'Hyderabad', href: '/cities/hyderabad' },
]

const TRUST_LINKS = [
  { label: 'Patient Testimonials', href: '/testimonials' },
  { label: 'How We Work', href: '/how-we-work' },
  { label: 'Verified Outcomes', href: '/verified-outcomes' },
  { label: 'Pricing Explorer', href: '/pricing' },
  { label: 'Partner Hospitals', href: '/hospitals' },
  { label: 'News & Updates', href: '/news' },
]

const PATIENT_LINKS = [
  { label: 'Treatment Cost Guides & Blog', href: '/blog' },
  { label: 'Visa & Travel Guide', href: '/visa-and-travel' },
  { label: 'Dental Tourism Guide', href: '/blog/full-mouth-dental-implants-cost-india-all-on-4-guide' },
  { label: 'CABG Bypass Cost Guide', href: '/blog/heart-bypass-surgery-cost-india-delhi-guide' },
  { label: 'Robotic Knee Cost Guide', href: '/blog/robotic-knee-replacement-cost-india-recovery-guide' },
  { label: 'Patient Dashboard', href: '/login' },
  { label: 'Create Account', href: '/register' },
]

const LEGAL_LINKS = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Use', href: '/terms' },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-slate-50">
      {/* Trust bar */}
      <div className="bg-brand-700 py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-brand-100">
            <span className="flex items-center gap-1.5">
              <span className="text-brand-300">🏥</span>
              <span>JCI & NABH Accredited Partner Hospitals</span>
            </span>
            <span className="hidden sm:block text-brand-500">|</span>
            <span className="flex items-center gap-1.5">
              <span>✓</span>
              <Link href="/verified-outcomes" className="hover:text-brand-200 underline underline-offset-2">
                Survey-backed patient outcomes
              </Link>
            </span>
            <span className="hidden sm:block text-brand-500">|</span>
            <span className="flex items-center gap-1.5">
              <span>📋</span>
              <Link href="/pricing" className="hover:text-brand-200 underline underline-offset-2">
                Itemized package price estimates
              </Link>
            </span>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand column */}
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <img
                src="/images/logo.png"
                alt="healthremade Logo"
                className="h-14 w-14 sm:h-16 sm:w-16 object-contain rounded-xl bg-white p-1 border border-slate-200/80 shadow-2xs"
              />
              <span className="text-2xl font-black text-foreground">
                health<span className="text-brand-600">remade</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              India&apos;s transparent medical tourism platform. Itemized package estimates, verified credentials, and post-op care coordination.
            </p>
          </div>

          {/* Treatments */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-foreground">Treatments</h3>
            <ul className="space-y-2">
              {TREATMENT_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-brand-600 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/treatments" className="text-sm font-medium text-brand-600 hover:text-brand-700">
                  All treatments →
                </Link>
              </li>
            </ul>
          </div>

          {/* Cities */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-foreground">Medical Hubs</h3>
            <ul className="space-y-2">
              {CITY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-brand-600 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Trust */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-foreground">Patient Trust</h3>
            <ul className="space-y-2">
              {TRUST_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-brand-600 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Patients */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-foreground">Travel & Support</h3>
            <ul className="space-y-2">
              {PATIENT_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-brand-600 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Featured Guides Callout Banner */}
        <div className="mt-8 rounded-2xl bg-gradient-to-r from-brand-50 via-white to-brand-50/60 border border-brand-200/80 p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
          <div className="flex items-center gap-3.5">
            <div className="h-10 w-10 rounded-xl bg-brand-600 text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-xs">
              📚
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">
                Detailed Medical Cost Guides & Procedure Walkthroughs
              </h4>
              <p className="text-xs text-muted-foreground mt-0.5">
                Compare USA/UK vs India pricing for Dental Implants, Bypass Surgery, Knee Replacements, Liver Transplants, and IVF.
              </p>
            </div>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white px-4 py-2.5 text-xs font-bold transition-colors shadow-2xs shrink-0"
          >
            <span>Explore All Cost Guides</span>
            <span>→</span>
          </Link>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} healthremade. Medical information on this site is for informational guidance only and does not constitute medical advice.
          </p>
          <div className="flex flex-wrap gap-4">
            {LEGAL_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="text-xs text-muted-foreground hover:text-brand-600">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Accreditation logos / links */}
        <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
          <span>Hospital accreditation verified via:</span>
          <a href="https://www.nabh.co" target="_blank" rel="noopener noreferrer" className="font-medium text-brand-600 hover:text-brand-700">
            NABH (National Accreditation Board for Hospitals) ↗
          </a>
          <a href="https://www.jointcommissioninternational.org" target="_blank" rel="noopener noreferrer" className="font-medium text-brand-600 hover:text-brand-700">
            JCI (Joint Commission International) ↗
          </a>
        </div>
      </div>
    </footer>
  )
}
