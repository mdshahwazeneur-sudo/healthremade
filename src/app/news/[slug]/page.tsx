import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  Calendar,
  Clock,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  Share2,
  Building2,
  Stethoscope,
  ShieldCheck,
  MessageCircle,
  FileText,
  Sparkles,
  ExternalLink,
} from 'lucide-react'
import { NEWS_ARTICLES, type NewsArticle } from '@/data/newsData'
import { Badge, Button, Card, CardContent, JsonLd } from '@/components/ui/primitives'
import { buildBreadcrumbSchema } from '@/lib/schema'
import { getWhatsAppUrl } from '@/lib/whatsapp'
import { NewsSidebarCTA } from '@/components/news/NewsCTAs'

type Params = Promise<{ slug: string }>

export async function generateStaticParams() {
  return NEWS_ARTICLES.map((article) => ({
    slug: article.slug,
  }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const article = NEWS_ARTICLES.find((a) => a.slug === slug)

  if (!article) {
    return {
      title: 'News Article Not Found | healthremade',
    }
  }

  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://healthremade.com'

  return {
    title: `${article.title} | healthremade News & Updates`,
    description: article.summary,
    alternates: {
      canonical: `/news/${slug}`,
    },
    openGraph: {
      type: 'article',
      title: article.title,
      description: article.summary,
      url: `${SITE_URL}/news/${slug}`,
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt || article.publishedAt,
      authors: [article.author.name],
      images: [
        {
          url: article.coverImage,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.summary,
      images: [article.coverImage],
    },
  }
}

export default async function NewsArticleDetailPage({ params }: { params: Params }) {
  const { slug } = await params
  const article = NEWS_ARTICLES.find((a) => a.slug === slug)

  if (!article) {
    notFound()
  }

  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://healthremade.com'
  const articleUrl = `${SITE_URL}/news/${slug}`

  const waUrl = getWhatsAppUrl({
    pageType: 'general',
    customMessage: `Hello healthremade! I read the news article "${article.title}" and would like to get more information regarding treatment packages in India.`,
  })

  // JSON-LD NewsArticle Structured Schema
  const newsArticleSchema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.summary,
    image: [article.coverImage],
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    author: [
      {
        '@type': 'Person',
        name: article.author.name,
        jobTitle: article.author.role,
      },
    ],
    publisher: {
      '@type': 'Organization',
      name: 'healthremade',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
  }

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'News & Updates', url: `${SITE_URL}/news` },
    { name: article.title, url: articleUrl },
  ])

  // Get other latest news for sidebar
  const otherNews = NEWS_ARTICLES.filter((a) => a.id !== article.id).slice(0, 3)

  return (
    <div className="min-h-screen bg-slate-50">
      <JsonLd data={newsArticleSchema} />
      <JsonLd data={breadcrumbSchema} />

      {/* ─── 1. ARTICLE HEADER SECTION ────────────────────────────── */}
      <header className="border-b border-slate-200/80 bg-white py-8 px-4 sm:px-6">
        <div className="mx-auto max-w-4xl">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-4" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-brand-600 transition-colors">Home</Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
            <Link href="/news" className="hover:text-brand-600 transition-colors">News & Updates</Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
            <span className="text-slate-800 font-semibold truncate max-w-[200px] sm:max-w-none">
              {article.title}
            </span>
          </nav>

          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="rounded-md bg-brand-50 border border-brand-200 px-2.5 py-0.5 text-xs font-bold text-brand-700">
              {article.category}
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="flex items-center gap-1 text-xs text-slate-500">
              <Calendar className="h-3.5 w-3.5 text-slate-400" />
              {article.publishedDateFormatted}
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="flex items-center gap-1 text-xs text-slate-500">
              <Clock className="h-3.5 w-3.5 text-slate-400" />
              {article.readTime}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {article.title}
          </h1>

          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
            {article.subtitle}
          </p>

          {/* Author and Source Bar */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-full bg-brand-100 border border-brand-200 flex items-center justify-center font-bold text-brand-700 text-xs">
                {article.author.name[0]}
              </div>
              <div>
                <p className="font-bold text-slate-800">{article.author.name}</p>
                <p className="text-[11px] text-slate-500">{article.author.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200/80">
              <span className="text-slate-400 font-medium">Source:</span>
              <span className="font-semibold text-slate-700">{article.source.name}</span>
            </div>
          </div>
        </div>
      </header>

      {/* ─── 2. ARTICLE BODY & SIDEBAR ─────────────────────────────── */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Article Content */}
          <article className="lg:col-span-8 space-y-8">
            {/* Featured Image */}
            <div className="overflow-hidden rounded-2xl bg-slate-100 border border-slate-200/80 shadow-xs">
              <img
                src={article.coverImage}
                alt={article.title}
                className="w-full h-auto max-h-[420px] object-cover"
              />
            </div>

            {/* Key Takeaways Callout Card */}
            <div className="rounded-2xl bg-emerald-50/80 border border-emerald-200/80 p-5 sm:p-6">
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="h-5 w-5 text-emerald-700" />
                <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-900">
                  Key Update Highlights
                </h2>
              </div>
              <ul className="space-y-2.5">
                {article.keyHighlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-2.5 text-xs sm:text-sm text-emerald-950">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Markdown / Formatted Content */}
            <div className="rounded-2xl bg-white p-6 sm:p-8 border border-slate-200/80 shadow-xs prose prose-slate max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-4">
              {article.content.split('\n\n').map((paragraph, index) => {
                const trimmed = paragraph.trim()
                if (!trimmed) return null

                // Headers
                if (trimmed.startsWith('### ')) {
                  return (
                    <h3 key={index} className="text-lg sm:text-xl font-bold text-slate-900 pt-4 pb-1 border-b border-slate-100">
                      {trimmed.replace('### ', '')}
                    </h3>
                  )
                }

                // Table parsing (simple markdown table)
                if (trimmed.includes('|')) {
                  const lines = trimmed.split('\n').filter((l) => l.trim() && !l.includes(':---'))
                  if (lines.length > 1) {
                    const headerCells = lines[0].split('|').map((c) => c.trim()).filter(Boolean)
                    const rowLines = lines.slice(1)
                    return (
                      <div key={index} className="my-4 overflow-x-auto rounded-xl border border-slate-200">
                        <table className="min-w-full divide-y divide-slate-200 text-xs sm:text-sm text-left">
                          <thead className="bg-slate-50 font-bold text-slate-900">
                            <tr>
                              {headerCells.map((h, hIdx) => (
                                <th key={hIdx} className="px-3.5 py-2.5">{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 bg-white">
                            {rowLines.map((row, rIdx) => {
                              const cells = row.split('|').map((c) => c.trim()).filter(Boolean)
                              return (
                                <tr key={rIdx} className="hover:bg-slate-50/60">
                                  {cells.map((cell, cIdx) => (
                                    <td key={cIdx} className="px-3.5 py-2 text-slate-700">
                                      {cell.replace(/\*\*/g, '')}
                                    </td>
                                  ))}
                                </tr>
                              )
                            })}
                          </tbody>
                        </table>
                      </div>
                    )
                  }
                }

                // Bullet list items
                if (trimmed.startsWith('* ') || trimmed.startsWith('1. ')) {
                  const listItems = trimmed.split('\n')
                  return (
                    <ul key={index} className="space-y-2 pl-4 list-disc marker:text-brand-600">
                      {listItems.map((item, itemIdx) => (
                        <li key={itemIdx} className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                          {item.replace(/^\*\s+/, '').replace(/^\d+\.\s+/, '')}
                        </li>
                      ))}
                    </ul>
                  )
                }

                return (
                  <p key={index} className="text-xs sm:text-sm sm:leading-relaxed text-slate-700">
                    {trimmed}
                  </p>
                )
              })}
            </div>

            {/* Related Procedures & Hospitals Link Modules for SEO Ranking */}
            {(article.relatedProcedures?.length || article.relatedHospitals?.length) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {article.relatedProcedures && article.relatedProcedures.length > 0 && (
                  <div className="rounded-2xl bg-white p-5 border border-slate-200/80 shadow-xs">
                    <div className="flex items-center gap-2 mb-3">
                      <Stethoscope className="h-4 w-4 text-brand-600" />
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                        Related Medical Treatments
                      </h4>
                    </div>
                    <ul className="space-y-2">
                      {article.relatedProcedures.map((proc, idx) => (
                        <li key={idx}>
                          <Link
                            href={proc.href}
                            className="text-xs font-semibold text-brand-600 hover:text-brand-700 hover:underline flex items-center justify-between"
                          >
                            <span>{proc.name}</span>
                            <ChevronRight className="h-3 w-3 text-slate-400" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {article.relatedHospitals && article.relatedHospitals.length > 0 && (
                  <div className="rounded-2xl bg-white p-5 border border-slate-200/80 shadow-xs">
                    <div className="flex items-center gap-2 mb-3">
                      <Building2 className="h-4 w-4 text-emerald-600" />
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                        Accredited Hospital Centers
                      </h4>
                    </div>
                    <ul className="space-y-2">
                      {article.relatedHospitals.map((hosp, idx) => (
                        <li key={idx}>
                          <Link
                            href={hosp.href}
                            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 hover:underline flex items-center justify-between"
                          >
                            <span>{hosp.name}</span>
                            <ChevronRight className="h-3 w-3 text-slate-400" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Tags footer */}
            <div className="flex flex-wrap items-center gap-1.5 pt-2">
              <span className="text-xs text-slate-400 font-semibold mr-1">Tags:</span>
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-slate-100 border border-slate-200 px-2.5 py-1 text-[11px] font-semibold text-slate-600"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            
            {/* 1-Click Quote & Consultation Action Card */}
            <NewsSidebarCTA articleTitle={article.title} />

            {/* Other Latest News Releases */}
            <div className="rounded-2xl bg-white p-5 border border-slate-200/80 shadow-xs">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                <span>Latest Healthcare News</span>
                <Link href="/news" className="text-brand-600 hover:underline text-[11px] font-semibold">
                  View all →
                </Link>
              </h3>

              <div className="space-y-4">
                {otherNews.map((item) => (
                  <div key={item.id} className="group">
                    <span className="text-[10px] font-bold text-brand-600 uppercase">
                      {item.category}
                    </span>
                    <Link href={`/news/${item.slug}`} className="block mt-0.5">
                      <h4 className="text-xs font-bold text-slate-800 group-hover:text-brand-600 transition-colors line-clamp-2 leading-snug">
                        {item.title}
                      </h4>
                    </Link>
                    <span className="text-[10px] text-slate-400 mt-1 block">
                      {item.publishedDateFormatted}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Accreditation Guarantee */}
            <div className="rounded-2xl bg-slate-100/80 p-5 border border-slate-200/80 text-center">
              <ShieldCheck className="h-8 w-8 text-brand-600 mx-auto mb-2" />
              <h4 className="text-xs font-bold text-slate-900">JCI & NABH Accredited Network</h4>
              <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                All partnered hospitals meet rigorous safety, infection control, and surgical outcome standards.
              </p>
              <Link
                href="/verified-outcomes"
                className="mt-3 inline-block text-xs font-bold text-brand-600 hover:text-brand-700 underline"
              >
                View verified clinical outcomes →
              </Link>
            </div>

          </aside>
        </div>
      </main>
    </div>
  )
}
