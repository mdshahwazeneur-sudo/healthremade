'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Newspaper,
  Calendar,
  Clock,
  ArrowRight,
  Search,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Building2,
  Globe2,
  MessageCircle,
  FileText,
  ChevronRight,
  Filter,
} from 'lucide-react'
import { NEWS_ARTICLES, type NewsArticle } from '@/data/newsData'
import { Badge, Button, Card, CardContent, JsonLd } from '@/components/ui/primitives'
import { useQuote } from '@/components/ui/QuoteModal'
import { getWhatsAppUrl } from '@/lib/whatsapp'

const CATEGORIES = [
  'All',
  'Policy & Visa',
  'Clinical Innovation',
  'Hospital Expansion',
  'Cost & Trends',
  'Patient Advisory',
]

export default function NewsPage() {
  const { openQuoteModal } = useQuote()
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredArticles = NEWS_ARTICLES.filter((article) => {
    const matchesCategory =
      selectedCategory === 'All' || article.category === selectedCategory
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const featuredArticle = NEWS_ARTICLES.find((a) => a.featured) || NEWS_ARTICLES[0]

  const waUrl = getWhatsAppUrl({
    pageType: 'general',
    customMessage: 'Hello healthremade! I saw the latest healthcare updates on your News page and would like to consult with a medical coordinator.',
  })

  // JSON-LD News Collection Schema
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://healthremade.com'
  const newsCollectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'India Healthcare & Medical Tourism News & Updates | healthremade',
    description:
      'Latest verified news, regulatory updates, medical visa policies, robotic surgery advances, and cost trends in Indian medical tourism.',
    url: `${SITE_URL}/news`,
    publisher: {
      '@type': 'Organization',
      name: 'healthremade',
      url: SITE_URL,
      logo: `${SITE_URL}/images/logo.png`,
    },
    hasPart: NEWS_ARTICLES.map((article) => ({
      '@type': 'NewsArticle',
      headline: article.title,
      description: article.summary,
      datePublished: article.publishedAt,
      url: `${SITE_URL}/news/${article.slug}`,
      image: article.coverImage,
    })),
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <JsonLd data={newsCollectionSchema} />

      {/* ─── 1. HERO HEADER ────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-900 via-brand-800 to-slate-900 text-white py-14 px-4 sm:px-6">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        
        <div className="relative mx-auto max-w-7xl">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-1.5 text-xs text-brand-200 mb-4" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3 text-brand-400" />
            <span className="text-white font-medium">News & Updates</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-500/20 border border-brand-400/30 px-3 py-1 text-xs font-semibold text-brand-200 mb-3 backdrop-blur-xs">
                <Newspaper className="h-3.5 w-3.5 text-brand-300" />
                Live Healthcare Intelligence & Policy Desk
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                India Healthcare <span className="text-emerald-400">News & Updates</span>
              </h1>
              <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
                Authoritative updates on fast-track medical e-visas, JCI & NABH hospital accreditations, robotic surgery innovations, and global procedure cost benchmarks.
              </p>
            </div>

            {/* Quick WhatsApp Support Header Badge */}
            <div className="shrink-0 flex items-center gap-3 bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/15">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-white">
                <Globe2 className="h-5 w-5" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-white">Need Patient Advisory?</p>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-emerald-300 hover:text-emerald-200 inline-flex items-center gap-1"
                >
                  WhatsApp International Desk →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. MAIN CONTENT WRAPPER ──────────────────────────────── */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        
        {/* Search & Category Filter Toolbar */}
        <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-2xl shadow-xs border border-slate-200/80">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    active
                      ? 'bg-brand-600 text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80'
                  }`}
                >
                  {cat}
                </button>
              )
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search news, topics, tags..."
              className="w-full pl-9 pr-3 py-2 text-xs font-semibold rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-600 transition-all"
            />
          </div>
        </div>

        {/* ─── 3. FEATURED BREAKING NEWS SPOTLIGHT ─────────────────── */}
        {selectedCategory === 'All' && !searchQuery && featuredArticle && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-4 w-4 text-amber-500" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Featured Lead Story
              </h2>
            </div>

            <Card className="overflow-hidden border-brand-200 bg-white shadow-md hover:shadow-lg transition-shadow">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                {/* Image */}
                <div className="relative lg:col-span-6 h-64 lg:h-auto min-h-[280px] bg-slate-100">
                  <img
                    src={featuredArticle.coverImage}
                    alt={featuredArticle.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-brand-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-sm">
                    {featuredArticle.category}
                  </div>
                </div>

                {/* Content */}
                <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 text-xs text-slate-500 mb-2.5">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5 text-slate-400" />
                        {featuredArticle.publishedDateFormatted}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-slate-400" />
                        {featuredArticle.readTime}
                      </span>
                    </div>

                    <Link href={`/news/${featuredArticle.slug}`}>
                      <h3 className="text-xl sm:text-2xl font-black text-slate-900 hover:text-brand-600 transition-colors leading-snug">
                        {featuredArticle.title}
                      </h3>
                    </Link>

                    <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                      {featuredArticle.summary}
                    </p>

                    {/* Key Highlights */}
                    <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5">
                      {featuredArticle.keyHighlights.slice(0, 2).map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="text-xs text-slate-500">
                      By <span className="font-semibold text-slate-800">{featuredArticle.author.name}</span>
                    </div>
                    <Link
                      href={`/news/${featuredArticle.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-brand-600 hover:text-brand-700 group"
                    >
                      Read Full Update <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* ─── 4. LATEST NEWS & UPDATES GRID ──────────────────────── */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
                {selectedCategory === 'All' ? 'Latest Healthcare Updates' : `${selectedCategory} News`}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Showing {filteredArticles.length} verified news releases and patient advisories.
              </p>
            </div>
          </div>

          {filteredArticles.length === 0 ? (
            <div className="bg-white rounded-2xl p-10 text-center border border-slate-200">
              <Newspaper className="h-10 w-10 text-slate-400 mx-auto mb-2" />
              <h3 className="text-base font-bold text-slate-800">No news articles found</h3>
              <p className="text-xs text-slate-500 mt-1">
                Try selecting another category or adjusting your search keyword.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedCategory('All')
                  setSearchQuery('')
                }}
                className="mt-4"
              >
                Reset Filters
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredArticles.map((article) => (
                <Card
                  key={article.id}
                  className="h-full flex flex-col justify-between bg-white hover:shadow-md transition-shadow border-slate-200/80 overflow-hidden group"
                >
                  <div>
                    {/* Thumbnail Image */}
                    <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                      <img
                        src={article.coverImage}
                        alt={article.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute top-2.5 left-2.5 bg-slate-950/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                        {article.category}
                      </div>
                    </div>

                    <CardContent className="p-5">
                      <div className="flex items-center gap-2.5 text-[11px] text-slate-500 mb-2">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-slate-400" />
                          {article.publishedDateFormatted}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-slate-400" />
                          {article.readTime}
                        </span>
                      </div>

                      <Link href={`/news/${article.slug}`} className="block">
                        <h3 className="text-base font-bold text-slate-900 group-hover:text-brand-600 transition-colors leading-snug line-clamp-2">
                          {article.title}
                        </h3>
                      </Link>

                      <p className="mt-2 text-xs text-slate-500 line-clamp-3 leading-relaxed">
                        {article.summary}
                      </p>

                      {/* Tag Pills */}
                      <div className="mt-3 flex flex-wrap gap-1">
                        {article.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </div>

                  <div className="p-5 pt-0">
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] text-slate-500">
                        Source: <span className="font-semibold text-slate-700">{article.source.name.split('&')[0]}</span>
                      </span>
                      <Link
                        href={`/news/${article.slug}`}
                        className="text-xs font-bold text-brand-600 hover:text-brand-700 inline-flex items-center gap-0.5"
                      >
                        Read →
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* ─── 5. PROMINENT CONVERSION BANNER ───────────────────────── */}
        <div className="rounded-3xl bg-gradient-to-r from-brand-900 via-brand-800 to-slate-900 text-white p-6 sm:p-10 shadow-xl border border-brand-700/50 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-2.5 py-0.5 rounded-full mb-2">
              <ShieldCheck className="h-3 w-3" /> Free Hospital Quote Guarantee
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white">
              Planning Medical Treatment in India?
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
              Get 3 itemized package quotes, surgeon recommendations, and dedicated visa invitation letters within 24 hours.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
            <Button
              variant="accent"
              size="lg"
              onClick={() => openQuoteModal()}
              className="w-full sm:w-auto font-bold shadow-md"
            >
              <FileText className="h-4 w-4 mr-1.5" />
              Get Free Package Quote
            </Button>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#25D366] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#1EBE5D] transition-colors shadow-md"
            >
              <MessageCircle className="h-4 w-4 fill-white" />
              WhatsApp Care Desk
            </a>
          </div>
        </div>

      </main>
    </div>
  )
}
