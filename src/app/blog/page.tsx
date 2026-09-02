'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Stethoscope,
  Calendar,
  Clock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  BookOpen,
  Search,
} from 'lucide-react'
import { useAdminData } from '@/context/AdminDataContext'
import { Badge, Button, Card, CardContent } from '@/components/ui/primitives'
import { JsonLd } from '@/components/ui/primitives'
import { buildBreadcrumbSchema } from '@/lib/schema'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://healthremade.com'

export default function BlogIndexPage() {
  const { blogPosts, seoBlogPosts } = useAdminData()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const jsonLd = buildBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Medical Guides & Insights', url: `${SITE_URL}/blog` },
  ])

  // Combine published SEO posts and legacy posts
  const publishedSeo = seoBlogPosts
    .filter((p) => p.status === 'published')
    .map((p) => ({
      id: p.id,
      slug: p.slug,
      title: p.title,
      category: p.category,
      excerpt: p.metaDescription || p.bodyContent.slice(0, 180).replace(/#/g, ''),
      medicalReviewer: p.medicalReviewer?.name || 'Dr. Naresh Trehan',
      reviewerHospital: p.medicalReviewer?.hospitalName || 'Top Accredited Hospital',
      lastUpdated: p.lastReviewedDate || p.publishedAt?.split('T')[0] || '2026',
    }))

  const publishedLegacy = blogPosts
    .filter((p) => p.status === 'published')
    .map((p) => ({
      id: p.id,
      slug: p.slug,
      title: p.title,
      category: p.category,
      excerpt: p.excerpt,
      medicalReviewer: p.medicalReviewer,
      reviewerHospital: p.reviewerHospital,
      lastUpdated: p.lastUpdated,
    }))

  // Merge unique by slug
  const allPublished = [...publishedSeo, ...publishedLegacy.filter((l) => !publishedSeo.some((s) => s.slug === l.slug))]

  const filtered = allPublished.filter((post) => {
    const matchesSearch =
      searchQuery === '' ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.medicalReviewer.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCat = selectedCategory === 'all' || post.category === selectedCategory
    return matchesSearch && matchesCat
  })

  return (
    <>
      <JsonLd data={jsonLd} />

      {/* ─── Hero ─────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-brand-50/80 via-white to-slate-50 px-4 py-12 sm:px-6 sm:py-16 border-b border-slate-200/70">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100/80 border border-emerald-300 px-3.5 py-1 text-xs font-bold text-emerald-800 mb-4 shadow-2xs">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span>Doctor-Reviewed Clinical & Cost Guides</span>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl leading-tight">
            Medical Treatment Guides & Pricing Insights
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Transparent, evidence-based guides on surgical procedures, recovery timelines, and hospital costs in India — reviewed and validated by leading department chairmen.
          </p>
        </div>
      </section>

      {/* ─── Search & Category Bar ─────────────────────────────────── */}
      <section className="sticky top-16 z-20 border-b border-slate-200 bg-white/95 backdrop-blur-md px-4 py-3 sm:px-6">
        <div className="mx-auto max-w-5xl flex flex-wrap items-center justify-between gap-3">
          <div className="relative flex-1 min-w-[240px] max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search medical guides, procedures, or doctors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-slate-50 pl-9 pr-4 py-2 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-600"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-semibold">{filtered.length} Published Articles</span>
          </div>
        </div>
      </section>

      {/* ─── Articles Grid ────────────────────────────────────────── */}
      <section className="px-4 py-12 sm:px-6 bg-slate-50">
        <div className="mx-auto max-w-5xl space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            {filtered.map((post) => (
              <Card
                key={post.id}
                className="overflow-hidden border border-slate-200 bg-white hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <CardContent className="p-6 flex flex-col justify-between h-full space-y-4">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <Badge variant="default" className="text-xs">
                        {post.category}
                      </Badge>
                      <span className="text-[11px] text-slate-500 flex items-center gap-1">
                        <Clock className="h-3 w-3" /> 5 min read
                      </span>
                    </div>

                    <Link href={`/blog/${post.slug}`} className="block group">
                      <h2 className="text-lg font-bold text-slate-900 group-hover:text-brand-600 transition-colors leading-snug">
                        {post.title}
                      </h2>
                    </Link>

                    <p className="text-xs sm:text-sm text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Doctor Reviewer Byline */}
                  <div className="pt-4 border-t border-slate-100 space-y-3">
                    <div className="flex items-center gap-2.5 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200/60">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 font-bold shrink-0">
                        <Stethoscope className="h-3.5 w-3.5" />
                      </div>
                      <div className="text-[11px]">
                        <span className="text-slate-500 block">Clinically reviewed by:</span>
                        <strong className="text-slate-900">{post.medicalReviewer}</strong> ({post.reviewerHospital})
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-slate-400">Updated: {post.lastUpdated}</span>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-xs font-bold text-brand-600 hover:text-brand-700 inline-flex items-center gap-1"
                      >
                        Read Complete Guide <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
