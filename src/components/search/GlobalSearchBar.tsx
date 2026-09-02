'use client'

import React, { useState, useEffect, useRef, useMemo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Search,
  Stethoscope,
  Building2,
  Activity,
  DollarSign,
  FileText,
  ArrowRight,
  X,
  Sparkles,
  Command,
  ChevronRight,
  TrendingUp,
} from 'lucide-react'
import * as Dialog from '@radix-ui/react-dialog'
import { DOCTORS } from '@/data/doctors'
import { HOSPITALS } from '@/data/hospitals'
import { PROCEDURES } from '@/data/procedures'
import { MOCK_BLOG_POSTS } from '@/data/adminData'
import { useAdminData } from '@/context/AdminDataContext'
import { formatINR } from '@/lib/utils'

export interface SearchResultItem {
  id: string
  title: string
  subtitle: string
  category: 'treatment' | 'doctor' | 'hospital' | 'pricing' | 'guide'
  href: string
  badge?: string
  extra?: string
}

export function GlobalSearchModal({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const router = useRouter()
  const { doctors, hospitals, blogPosts } = useAdminData()
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  // Focus input on open
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50)
    } else {
      setQuery('')
    }
  }, [open])

  // Global Cmd+K / Ctrl+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        onOpenChange(!open)
      }
      if (e.key === 'Escape' && open) {
        onOpenChange(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, onOpenChange])

  // Search Results
  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []

    const list: SearchResultItem[] = []

    // 1. Treatments / Procedures
    PROCEDURES.forEach((proc) => {
      if (
        proc.name.toLowerCase().includes(q) ||
        proc.tagline.toLowerCase().includes(q) ||
        proc.description.toLowerCase().includes(q) ||
        proc.specialtyLabel.toLowerCase().includes(q) ||
        proc.slug.toLowerCase().includes(q)
      ) {
        list.push({
          id: `proc_${proc.id}`,
          title: proc.name,
          subtitle: `${proc.specialtyLabel} • ${proc.totalStayDays} Days Stay`,
          category: 'treatment',
          href: `/treatments/${proc.specialty}/${proc.slug}`,
          badge: `${formatINR(proc.priceInrMin)} – ${formatINR(proc.priceInrMax)}`,
        })
      }
    })

    // 2. Doctors
    const currentDoctors = doctors && doctors.length > 0 ? doctors : DOCTORS
    currentDoctors.forEach((doc) => {
      if (
        doc.name.toLowerCase().includes(q) ||
        doc.department.toLowerCase().includes(q) ||
        doc.hospitalName.toLowerCase().includes(q) ||
        doc.keyExpertise.some((k) => k.toLowerCase().includes(q))
      ) {
        list.push({
          id: `doc_${doc.id}`,
          title: doc.name,
          subtitle: `${doc.designation} at ${doc.hospitalName}`,
          category: 'doctor',
          href: `/doctors`,
          badge: `${doc.experienceYears}+ Yrs Exp`,
          extra: `${doc.surgeriesCount} Surgeries`,
        })
      }
    })

    // 3. Hospitals
    const currentHospitals = hospitals && hospitals.length > 0 ? hospitals : HOSPITALS
    currentHospitals.forEach((hosp) => {
      if (
        hosp.name.toLowerCase().includes(q) ||
        hosp.cityLabel.toLowerCase().includes(q) ||
        hosp.specialties.some((s) => s.toLowerCase().includes(q))
      ) {
        list.push({
          id: `hosp_${hosp.id}`,
          title: hosp.name,
          subtitle: `${hosp.cityLabel} • ${hosp.bedCount}+ Beds`,
          category: 'hospital',
          href: `/hospitals/${hosp.city}/${hosp.slug}`,
          badge: hosp.jciAccredId ? 'JCI + NABH' : 'NABH Verified',
        })
      }
    })

    // 4. Pricing / Cost Explorer
    if ('pricing cost calculator estimate package'.includes(q) || q.includes('price') || q.includes('cost')) {
      list.push({
        id: 'pricing_explorer',
        title: 'Compare All Hospital Package Pricing',
        subtitle: 'Itemized price calculator across Delhi NCR top accredited hospitals',
        category: 'pricing',
        href: '/pricing',
        badge: 'Interactive Explorer',
      })
    }

    // 5. Guides / Blog Posts
    const currentBlogs = blogPosts && blogPosts.length > 0 ? blogPosts : MOCK_BLOG_POSTS
    currentBlogs.forEach((blog) => {
      if (
        blog.title.toLowerCase().includes(q) ||
        blog.category.toLowerCase().includes(q) ||
        blog.targetKeyword.toLowerCase().includes(q) ||
        blog.medicalReviewer.toLowerCase().includes(q)
      ) {
        list.push({
          id: `blog_${blog.id}`,
          title: blog.title,
          subtitle: `Reviewed by ${blog.medicalReviewer} • ${blog.category}`,
          category: 'guide',
          href: `/blog/${blog.slug}`,
          badge: 'Doctor Signed Guide',
        })
      }
    })

    return list.slice(0, 12)
  }, [query, doctors, hospitals, blogPosts])

  const handleSelect = (href: string) => {
    onOpenChange(false)
    router.push(href)
  }

  // Group results by category
  const treatments = results.filter((r) => r.category === 'treatment')
  const doctorsList = results.filter((r) => r.category === 'doctor')
  const hospitalsList = results.filter((r) => r.category === 'hospital')
  const guidesList = results.filter((r) => r.category === 'guide' || r.category === 'pricing')

  const popularSearches = [
    { label: 'Bypass Surgery (CABG)', href: '/treatments/cardiac/bypass-surgery' },
    { label: 'Knee Replacement', href: '/treatments/orthopaedics/knee-replacement' },
    { label: 'Liver Transplant', href: '/treatments/transplant/liver-transplant' },
    { label: 'Dr. Naresh Trehan', href: '/doctors' },
    { label: 'Medanta The Medicity', href: '/hospitals/delhi/medanta-the-medicity' },
    { label: 'Pricing Explorer', href: '/pricing' },
  ]

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md animate-in fade-in" />
        <Dialog.Content className="fixed left-[50%] top-[20%] z-50 w-[95vw] max-w-2xl translate-x-[-50%] rounded-2xl bg-white text-slate-900 shadow-2xl border border-slate-200 p-0 overflow-hidden outline-none animate-in fade-in zoom-in-95">
          {/* Top Search Input */}
          <div className="flex items-center px-4 py-3.5 border-b border-slate-200/80 bg-slate-50/50">
            <Search className="h-5 w-5 text-brand-600 shrink-0 mr-3" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search treatments, doctors (e.g. Trehan, Seth), hospitals, or costs..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent text-sm sm:text-base font-semibold text-slate-900 placeholder-slate-400 focus:outline-none"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-md"
              >
                <X className="h-4 w-4" />
              </button>
            ) : (
              <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded border border-slate-300 bg-white px-1.5 py-0.5 text-[10px] font-mono text-slate-500 shadow-2xs">
                ESC
              </kbd>
            )}
          </div>

          {/* Results Dropdown Box */}
          <div className="max-h-[65vh] overflow-y-auto p-3 space-y-4">
            {/* When Query is Empty -> Show Popular Suggestions */}
            {!query.trim() && (
              <div className="p-2 space-y-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                  <TrendingUp className="h-3.5 w-3.5 text-brand-600" /> Popular Patient Searches
                </span>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => handleSelect(item.href)}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-brand-50 hover:border-brand-300 text-slate-700 hover:text-brand-900 px-3 py-1.5 text-xs font-semibold transition-all shadow-2xs"
                    >
                      <span>{item.label}</span>
                      <ArrowRight className="h-3 w-3 text-slate-400" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* When Query Has Results */}
            {query.trim() && results.length === 0 && (
              <div className="py-12 text-center text-slate-500 space-y-2">
                <p className="text-sm font-semibold">No direct results found for &ldquo;{query}&rdquo;</p>
                <p className="text-xs text-slate-400">
                  Try searching for general keywords like &ldquo;Heart&rdquo;, &ldquo;Knee&rdquo;, &ldquo;Medanta&rdquo;, or &ldquo;Trehan&rdquo;.
                </p>
              </div>
            )}

            {query.trim() && results.length > 0 && (
              <div className="space-y-4">
                {/* Treatments Group */}
                {treatments.length > 0 && (
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-700 flex items-center gap-1 px-2">
                      <Activity className="h-3.5 w-3.5" /> Treatments & Procedures ({treatments.length})
                    </span>
                    <div className="space-y-1">
                      {treatments.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => handleSelect(item.href)}
                          className="flex items-center justify-between p-2.5 rounded-xl hover:bg-brand-50/80 cursor-pointer transition-colors border border-transparent hover:border-brand-200"
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-100 text-brand-700 shrink-0">
                              <Activity className="h-4 w-4" />
                            </div>
                            <div>
                              <div className="font-bold text-xs sm:text-sm text-slate-900">{item.title}</div>
                              <div className="text-[11px] text-slate-500">{item.subtitle}</div>
                            </div>
                          </div>

                          {item.badge && (
                            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-lg whitespace-nowrap">
                              {item.badge}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Doctors Group */}
                {doctorsList.length > 0 && (
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 flex items-center gap-1 px-2">
                      <Stethoscope className="h-3.5 w-3.5" /> Top Doctors & Chief Surgeons ({doctorsList.length})
                    </span>
                    <div className="space-y-1">
                      {doctorsList.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => handleSelect(item.href)}
                          className="flex items-center justify-between p-2.5 rounded-xl hover:bg-purple-50/80 cursor-pointer transition-colors border border-transparent hover:border-purple-200"
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 text-purple-700 shrink-0">
                              <Stethoscope className="h-4 w-4" />
                            </div>
                            <div>
                              <div className="font-bold text-xs sm:text-sm text-slate-900">{item.title}</div>
                              <div className="text-[11px] text-slate-500">{item.subtitle}</div>
                            </div>
                          </div>

                          <div className="text-right shrink-0">
                            <span className="text-[10px] font-bold text-purple-800 bg-purple-100 px-2 py-0.5 rounded-md block">
                              {item.badge}
                            </span>
                            {item.extra && (
                              <span className="text-[10px] text-slate-500 font-medium mt-0.5 block">{item.extra}</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Hospitals Group */}
                {hospitalsList.length > 0 && (
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 flex items-center gap-1 px-2">
                      <Building2 className="h-3.5 w-3.5" /> Accredited Hospitals ({hospitalsList.length})
                    </span>
                    <div className="space-y-1">
                      {hospitalsList.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => handleSelect(item.href)}
                          className="flex items-center justify-between p-2.5 rounded-xl hover:bg-blue-50/80 cursor-pointer transition-colors border border-transparent hover:border-blue-200"
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-700 shrink-0">
                              <Building2 className="h-4 w-4" />
                            </div>
                            <div>
                              <div className="font-bold text-xs sm:text-sm text-slate-900">{item.title}</div>
                              <div className="text-[11px] text-slate-500">{item.subtitle}</div>
                            </div>
                          </div>

                          {item.badge && (
                            <span className="text-[10px] font-bold text-blue-800 bg-blue-100 px-2 py-0.5 rounded-md whitespace-nowrap">
                              {item.badge}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Pricing & Guides Group */}
                {guidesList.length > 0 && (
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 flex items-center gap-1 px-2">
                      <FileText className="h-3.5 w-3.5" /> Pricing & Clinical Guides ({guidesList.length})
                    </span>
                    <div className="space-y-1">
                      {guidesList.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => handleSelect(item.href)}
                          className="flex items-center justify-between p-2.5 rounded-xl hover:bg-amber-50/80 cursor-pointer transition-colors border border-transparent hover:border-amber-200"
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-amber-800 shrink-0">
                              <FileText className="h-4 w-4" />
                            </div>
                            <div>
                              <div className="font-bold text-xs sm:text-sm text-slate-900">{item.title}</div>
                              <div className="text-[11px] text-slate-500">{item.subtitle}</div>
                            </div>
                          </div>

                          {item.badge && (
                            <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md whitespace-nowrap">
                              {item.badge}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer Info */}
          <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-200/80 flex items-center justify-between text-[11px] text-slate-500">
            <span>Direct search across 12+ hospitals, 10+ senior surgeons & 6+ treatments</span>
            <span className="hidden sm:inline">Press <strong>ESC</strong> to close</span>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

/**
 * Trigger button rendered in Navbar and Hero
 */
export function SearchTriggerButton({
  className = '',
  placeholder = 'Search treatments, doctors, hospitals...',
  variant = 'compact',
}: {
  className?: string
  placeholder?: string
  variant?: 'compact' | 'hero'
}) {
  const [modalOpen, setModalOpen] = useState(false)

  if (variant === 'hero') {
    return (
      <>
        <div
          onClick={() => setModalOpen(true)}
          className={`cursor-pointer group flex items-center justify-between w-full max-w-2xl mx-auto rounded-2xl bg-white border-2 border-slate-200 hover:border-brand-500 p-2 sm:p-2.5 shadow-md hover:shadow-xl transition-all ${className}`}
        >
          <div className="flex items-center gap-3 pl-2 sm:pl-3 flex-1 min-w-0">
            <Search className="h-5 w-5 sm:h-6 sm:w-6 text-brand-600 shrink-0 group-hover:scale-110 transition-transform" />
            <span className="text-xs sm:text-base text-slate-400 font-medium truncate">
              {placeholder}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex items-center gap-1 rounded-lg bg-slate-100 border border-slate-200 px-2.5 py-1 text-xs font-mono text-slate-500">
              <Command className="h-3 w-3" /> K
            </span>
            <button
              type="button"
              className="rounded-xl bg-brand-600 group-hover:bg-brand-700 text-white font-bold text-xs sm:text-sm px-4 sm:px-6 py-2.5 transition-colors shadow-xs"
            >
              Search
            </button>
          </div>
        </div>

        <GlobalSearchModal open={modalOpen} onOpenChange={setModalOpen} />
      </>
    )
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setModalOpen(true)}
        className={`flex items-center justify-between gap-2.5 rounded-xl border border-slate-200 bg-slate-50/80 hover:bg-slate-100/90 text-slate-500 hover:text-slate-900 px-3 py-1.5 text-xs font-medium transition-all shadow-2xs ${className}`}
        title="Search platform (Cmd+K)"
      >
        <div className="flex items-center gap-2">
          <Search className="h-3.5 w-3.5 text-brand-600" />
          <span className="hidden sm:inline truncate max-w-[140px] md:max-w-[200px]">{placeholder}</span>
          <span className="sm:hidden">Search...</span>
        </div>
        <kbd className="hidden md:inline-flex items-center gap-0.5 rounded border border-slate-300 bg-white px-1.5 py-0.2 text-[10px] font-mono text-slate-400">
          ⌘K
        </kbd>
      </button>

      <GlobalSearchModal open={modalOpen} onOpenChange={setModalOpen} />
    </>
  )
}
