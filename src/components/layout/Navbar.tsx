'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown, MessageCircle, FileText } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/primitives'
import { useQuote } from '@/components/ui/QuoteModal'
import { getWhatsAppUrl } from '@/lib/whatsapp'
import { LanguageSelector } from '@/components/ui/LanguageSelector'

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  {
    label: 'Treatments',
    href: '/treatments',
    children: [
      { label: 'Cardiac Surgery (CABG)', href: '/treatments/cardiac/bypass-surgery' },
      { label: 'Total Knee Replacement', href: '/treatments/orthopaedics/knee-replacement' },
      { label: 'Liver Transplantation', href: '/treatments/transplant/liver-transplant' },
      { label: 'IVF & Fertility Treatment', href: '/treatments/fertility/ivf' },
      { label: 'Spinal Fusion Surgery', href: '/treatments/neurology/spinal-fusion' },
      { label: 'View All Treatments →', href: '/treatments' },
    ],
  },
  { label: 'Hospitals', href: '/hospitals' },
  { label: 'Top Doctors', href: '/doctors' },
  { label: 'Pricing Explorer', href: '/pricing' },
  { label: 'Verified Outcomes', href: '/verified-outcomes' },
]

export function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const { openQuoteModal } = useQuote()

  const waUrl = getWhatsAppUrl({ pageType: 'home' })

  const isLinkActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-white/95 backdrop-blur-md">
      {/* Top micro bar for international emergency / direct hotline */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 hidden sm:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>International Patient Desk: 24/7 Response</span>
            </span>
            <span className="text-slate-600">|</span>
            <span>Free Hospital Package Quotes & Doctor Opinions in 24 Hours</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
            >
              <MessageCircle className="h-3.5 w-3.5 fill-emerald-400" />
              <span>WhatsApp: +91 99900 45006</span>
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto flex h-16 sm:h-20 max-w-7xl items-center justify-between px-3 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 sm:gap-3 shrink-0 group py-1">
          <img
            src="/images/logo.png"
            alt="healthremade Logo"
            className="h-9 w-9 sm:h-14 sm:w-14 object-contain rounded-xl transition-transform group-hover:scale-105"
          />
          <div className="flex flex-col">
            <span className="text-lg sm:text-2xl font-black tracking-tight text-foreground leading-none">
              health<span className="text-brand-600">remade</span>
            </span>
            <span className="text-[9px] sm:text-[11px] text-muted-foreground font-bold uppercase tracking-wider mt-0.5 sm:mt-1">
              Medical Care India
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
          {NAV_LINKS.map((link) => {
            const active = isLinkActive(link.href)
            return link.children ? (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => setOpenDropdown(link.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button
                  className={cn(
                    'flex items-center gap-1 rounded-xl px-3.5 py-2 text-sm font-semibold transition-all',
                    active
                      ? 'bg-brand-50 text-brand-700 font-bold border border-brand-200/80 shadow-2xs'
                      : 'text-slate-700 hover:bg-brand-50/60 hover:text-brand-700'
                  )}
                >
                  {link.label}
                  <ChevronDown className={cn('h-3.5 w-3.5 transition-transform', openDropdown === link.label && 'rotate-180')} />
                </button>
                {openDropdown === link.label && (
                  <div className="absolute top-full left-0 mt-1 w-64 rounded-2xl border border-border bg-white shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-1">
                    {link.children.map((child) => {
                      const isChildActive = pathname === child.href
                      return (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={cn(
                            'block px-4 py-2 text-sm rounded-lg mx-1.5 transition-colors',
                            isChildActive
                              ? 'bg-brand-100 text-brand-900 font-bold'
                              : 'text-slate-700 hover:bg-brand-50 hover:text-brand-700',
                            child.label.includes('View All') && 'font-bold text-brand-600 border-t border-slate-100 mt-1.5 pt-2.5 rounded-none mx-0 px-4'
                          )}
                        >
                          {child.label}
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'rounded-xl px-3.5 py-2 text-sm font-semibold transition-all',
                  active
                    ? 'bg-brand-50 text-brand-700 font-bold border border-brand-200/80 shadow-2xs'
                    : 'text-slate-700 hover:bg-brand-50/60 hover:text-brand-700'
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* Desktop right actions */}
        <div className="hidden lg:flex items-center gap-2.5">
          {/* Select Language Dropdown */}
          <LanguageSelector />

          {/* Direct WhatsApp CTA Button */}
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-300 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-800 hover:bg-emerald-100 transition-colors shadow-2xs"
            title="Chat directly with a Care Coordinator"
          >
            <MessageCircle className="h-4 w-4 text-[#25D366] fill-[#25D366]" />
            <span>WhatsApp</span>
          </a>

          {/* Prominent Get Free Quote CTA */}
          <Button
            variant="accent"
            size="sm"
            onClick={() => openQuoteModal()}
            className="shadow-xs font-semibold"
          >
            <FileText className="h-4 w-4 mr-1" />
            Get Free Quote
          </Button>

          <Button variant="outline" size="sm" asChild>
            <Link href="/login">Sign in</Link>
          </Button>
        </div>

        {/* Mobile toggle */}
        <div className="flex items-center gap-1.5 sm:gap-2 lg:hidden shrink-0">
          <Button
            variant="accent"
            size="sm"
            onClick={() => openQuoteModal()}
            className="text-[11px] sm:text-xs px-2.5 sm:px-3 py-1 h-8 font-bold shadow-xs"
          >
            Free Quote
          </Button>
          <button
            className="rounded-lg p-1.5 text-foreground hover:bg-slate-100 focus:outline-none"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X className="h-6 w-6 text-slate-700" /> : <Menu className="h-6 w-6 text-slate-700" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-white px-4 pb-6 pt-3 max-h-[80vh] overflow-y-auto space-y-3">
          {/* Mobile Language Selector row */}
          <div className="flex items-center justify-between py-1 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-600">Select Language:</span>
            <LanguageSelector className="text-xs py-1 px-2.5" />
          </div>

          <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-emerald-900">Need Instant Assistance?</p>
              <p className="text-[11px] text-emerald-700">Chat with a medical coordinator</p>
            </div>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#25D366] text-white px-3 py-1.5 text-xs font-bold shadow-xs"
            >
              <MessageCircle className="h-3.5 w-3.5 fill-white" />
              WhatsApp
            </a>
          </div>

          <nav className="flex flex-col gap-1.5" aria-label="Mobile navigation">
            {NAV_LINKS.map((link) => {
              const active = isLinkActive(link.href)
              return (
                <div key={link.label}>
                  <Link
                    href={link.href}
                    className={cn(
                      'block rounded-xl px-3.5 py-2 text-sm font-medium transition-colors',
                      active
                        ? 'bg-brand-50 text-brand-700 font-bold border-l-4 border-brand-600 pl-3'
                        : 'text-foreground hover:bg-slate-50'
                    )}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                  {link.children && (
                    <div className="ml-4 flex flex-col gap-0.5 border-l-2 border-slate-100 pl-2 mt-1">
                      {link.children.map((child) => {
                        const isChildActive = pathname === child.href
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={cn(
                              'block rounded-lg px-2.5 py-1.5 text-xs transition-colors',
                              isChildActive
                                ? 'bg-brand-100 text-brand-900 font-bold'
                                : 'text-muted-foreground hover:bg-brand-50 hover:text-brand-700'
                            )}
                            onClick={() => setMobileOpen(false)}
                          >
                            {child.label}
                          </Link>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </nav>

          <div className="mt-5 flex flex-col gap-2 pt-3 border-t border-border">
            <Button
              variant="accent"
              size="md"
              onClick={() => {
                setMobileOpen(false)
                openQuoteModal()
              }}
              className="w-full justify-center"
            >
              <FileText className="h-4 w-4 mr-1.5" />
              Get Free Hospital Quote
            </Button>
            <Button variant="outline" size="md" asChild className="w-full justify-center">
              <Link href="/login" onClick={() => setMobileOpen(false)}>
                Sign in to Patient Portal
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
