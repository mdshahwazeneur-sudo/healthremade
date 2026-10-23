import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  Stethoscope,
  Calendar,
  Clock,
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  ChevronRight,
  MessageCircle,
  FileText,
  Building2,
  Award,
  Lock,
} from 'lucide-react'
import { INITIAL_SEO_BLOG_POSTS, type SeoBlogPost } from '@/data/blogPipelineData'
import { MOCK_BLOG_POSTS } from '@/data/adminData'
import { Badge, Button, Card, CardContent } from '@/components/ui/primitives'
import { JsonLd } from '@/components/ui/primitives'
import { buildBreadcrumbSchema } from '@/lib/schema'
import { buildArticleStructuredSchema } from '@/lib/blogAi'
import { getWhatsAppUrl } from '@/lib/whatsapp'
import {
  BlogQuoteButton,
  BlogWhatsAppButton,
  BlogTableOfContents,
} from '@/components/blog/BlogInteractiveComponents'

type Params = Promise<{ slug: string }>

export async function generateStaticParams() {
  // Only pre-render published articles
  const seoSlugs = INITIAL_SEO_BLOG_POSTS.filter((p) => p.status === 'published').map((p) => ({
    slug: p.slug,
  }))
  const mockSlugs = MOCK_BLOG_POSTS.map((p) => ({ slug: p.slug }))
  return [...seoSlugs, ...mockSlugs]
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params

  const seoPost = INITIAL_SEO_BLOG_POSTS.find((p) => p.slug === slug && p.status === 'published')
  if (seoPost) {
    return {
      title: `${seoPost.metaTitle || seoPost.title} | healthremade`,
      description: seoPost.metaDescription,
      alternates: { canonical: `/blog/${slug}` },
      robots: { index: true, follow: true },
    }
  }

  const legacyPost = MOCK_BLOG_POSTS.find((p) => p.slug === slug)
  if (legacyPost) {
    return {
      title: `${legacyPost.title} | healthremade`,
      description: legacyPost.excerpt,
      alternates: { canonical: `/blog/${slug}` },
    }
  }

  return {}
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params

  // ─── STRICT PUBLISHING CONSTRAINT (DATABASE / ROUTE LEVEL) ───────────────
  // Unapproved or pending posts must strictly return 404
  const seoPost = INITIAL_SEO_BLOG_POSTS.find((p) => p.slug === slug)
  const legacyPost = MOCK_BLOG_POSTS.find((p) => p.slug === slug)

  if (seoPost) {
    if (seoPost.status !== 'published') {
      notFound()
    }
  } else if (!legacyPost) {
    notFound()
  }

  const post = seoPost || legacyPost!
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://healthremade.com'

  const isSeoPost = Boolean(seoPost)
  const postData = seoPost!

  const waUrl = getWhatsAppUrl({
    pageType: 'treatment',
    treatmentName: post.category,
    customMessage: `Hello healthremade! I read the clinical guide "${post.title}" and would like to get a hospital cost quote and doctor appointment in India.`,
  })

  // Extract H2 headings for Table of Contents
  const rawBody = isSeoPost ? postData.bodyContent : (legacyPost as any).content || ''
  const headings: Array<{ id: string; text: string }> = []
  rawBody.split('\n').forEach((line: string) => {
    if (line.startsWith('## ')) {
      const text = line.replace('## ', '').trim()
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      headings.push({ id, text })
    }
  })

  // Other related guides for bottom recommendation
  const otherPosts = INITIAL_SEO_BLOG_POSTS.filter((p) => p.slug !== slug && p.status === 'published').slice(0, 3)

  // Build JSON-LD Schemas with medicallyReviewedBy & FAQPage
  let jsonLdSchemas: any[] = []
  if (isSeoPost) {
    jsonLdSchemas = [
      buildBreadcrumbSchema([
        { name: 'Home', url: SITE_URL },
        { name: 'Medical Guides', url: `${SITE_URL}/blog` },
        { name: postData.title, url: `${SITE_URL}/blog/${slug}` },
      ]),
      ...buildArticleStructuredSchema(postData, SITE_URL),
    ]
  } else {
    jsonLdSchemas = [
      buildBreadcrumbSchema([
        { name: 'Home', url: SITE_URL },
        { name: 'Blog', url: `${SITE_URL}/blog` },
        { name: legacyPost!.title, url: `${SITE_URL}/blog/${slug}` },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'MedicalWebPage',
        headline: legacyPost!.title,
        description: legacyPost!.excerpt,
        author: { '@type': 'Person', name: legacyPost!.author },
        reviewedBy: {
          '@type': 'Person',
          name: legacyPost!.medicalReviewer,
          jobTitle: legacyPost!.reviewerDesignation,
        },
      },
    ]
  }

  const formatInlineMarkdown = (text: string) => {
    // Split by bold tokens **bold**
    const parts = text.split(/(\*\*[^*]+\*\*)/g)
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-bold text-slate-900">{part.slice(2, -2)}</strong>
      }
      return part
    })
  }

  return (
    <>
      <JsonLd data={jsonLdSchemas} />

      {/* Breadcrumb */}
      <nav className="border-b border-slate-200 bg-white px-4 py-3 sm:px-6" aria-label="Breadcrumb">
        <ol className="mx-auto flex max-w-7xl items-center gap-1.5 text-xs text-slate-500">
          <li>
            <Link href="/" className="hover:text-brand-600">
              Home
            </Link>
          </li>
          <li>
            <ChevronRight className="h-3 w-3" />
          </li>
          <li>
            <Link href="/blog" className="hover:text-brand-600">
              Medical Guides & Tariffs
            </Link>
          </li>
          <li>
            <ChevronRight className="h-3 w-3" />
          </li>
          <li className="text-slate-900 font-semibold truncate max-w-xs sm:max-w-md">{post.title}</li>
        </ol>
      </nav>

      <div className="bg-slate-50 min-h-screen py-8 sm:py-12 px-4 sm:px-6">
        <div className="mx-auto max-w-7xl">
          {/* Header Section */}
          <div className="max-w-4xl space-y-4 mb-8">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="accent">
                {post.category}
              </Badge>
              <span className="text-xs text-slate-400">•</span>
              <span className="flex items-center gap-1 text-xs text-slate-500">
                <Clock className="h-3.5 w-3.5" /> 8–10 min comprehensive read
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="flex items-center gap-1 text-xs text-emerald-700 font-semibold">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> JCI & NABH Clinical Standards
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-[1.18] sm:leading-[1.15]">
              {post.title}
            </h1>

            {/* Medical Reviewer Card */}
            <div className="rounded-2xl border border-emerald-200 bg-gradient-to-r from-emerald-50 via-white to-emerald-50/40 p-4 sm:p-5 shadow-2xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="h-12 w-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-xs">
                    <Stethoscope className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wide">
                        Medically Reviewed & Verified by
                      </span>
                      <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                    </div>
                    <div className="text-base font-black text-slate-900">
                      {isSeoPost
                        ? postData.medicalReviewer?.name || 'Senior Medical Board'
                        : (legacyPost as any).medicalReviewer}
                    </div>
                    <div className="text-xs text-slate-600">
                      {isSeoPost
                        ? `${postData.medicalReviewer?.designation} • ${postData.medicalReviewer?.hospitalName}`
                        : `${(legacyPost as any).reviewerDesignation} • ${(legacyPost as any).reviewerHospital}`}
                    </div>
                    {isSeoPost && postData.medicalReviewer?.qualifications && (
                      <div className="text-[11px] text-slate-500 mt-0.5 font-medium">
                        Credentials: {postData.medicalReviewer.qualifications.join(', ')}
                      </div>
                    )}
                  </div>
                </div>

                <div className="sm:text-right text-xs text-slate-500 border-t sm:border-t-0 pt-2 sm:pt-0 border-emerald-100 shrink-0">
                  <div className="flex sm:justify-end items-center gap-1 font-semibold text-emerald-700">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>Clinical Pricing Protocol Verified</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Last Updated: {isSeoPost ? postData.lastReviewedDate : (legacyPost as any).reviewerDate}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main 2-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Main Article Column (8 Cols) */}
            <article className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6 text-slate-800 leading-relaxed">
              {isSeoPost ? (
                <div className="space-y-5 text-sm sm:text-base">
                  {postData.bodyContent.split('\n\n').map((paragraph, idx) => {
                    // H2 Section Header
                    if (paragraph.startsWith('## ')) {
                      const text = paragraph.replace('## ', '').trim()
                      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
                      return (
                        <div key={idx} id={id} className="pt-8 scroll-mt-24 border-t border-slate-100 first:border-t-0 first:pt-0">
                          <h2 className="text-xl sm:text-2xl font-black text-slate-900 pb-2">
                            {text}
                          </h2>
                        </div>
                      )
                    }

                    // H3 Subheading
                    if (paragraph.startsWith('### ')) {
                      return (
                        <h3 key={idx} className="text-lg font-bold text-slate-900 pt-4">
                          {paragraph.replace('### ', '')}
                        </h3>
                      )
                    }

                    // Markdown Blockquote / Note
                    if (paragraph.startsWith('> ')) {
                      const cleanQuote = paragraph.replace(/^>\s*/, '').replace(/\[!(NOTE|TIP|IMPORTANT)\]\s*/i, '')
                      return (
                        <div key={idx} className="my-4 rounded-2xl bg-brand-50/60 border-l-4 border-brand-600 p-4 text-sm text-brand-950 font-medium leading-relaxed">
                          {formatInlineMarkdown(cleanQuote)}
                        </div>
                      )
                    }

                    // Markdown Bullet List
                    if (paragraph.startsWith('- ') || paragraph.startsWith('* ')) {
                      const items = paragraph.split('\n').filter(Boolean)
                      return (
                        <ul key={idx} className="space-y-2.5 my-3 pl-2">
                          {items.map((item, iIdx) => {
                            const clean = item.replace(/^[-*]\s*/, '')
                            return (
                              <li key={iIdx} className="flex items-start gap-2.5 text-slate-700">
                                <span className="h-2 w-2 rounded-full bg-brand-600 mt-2 shrink-0" />
                                <span>{formatInlineMarkdown(clean)}</span>
                              </li>
                            )
                          })}
                        </ul>
                      )
                    }

                    // Markdown Numbered List
                    if (/^\d+\.\s/.test(paragraph)) {
                      const items = paragraph.split('\n').filter(Boolean)
                      return (
                        <ol key={idx} className="space-y-3 my-4 pl-1">
                          {items.map((item, iIdx) => {
                            const match = item.match(/^(\d+)\.\s+(.*)$/)
                            const num = match ? match[1] : `${iIdx + 1}`
                            const content = match ? match[2] : item
                            return (
                              <li key={iIdx} className="flex items-start gap-3 text-slate-700">
                                <span className="h-6 w-6 rounded-full bg-brand-100 text-brand-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                                  {num}
                                </span>
                                <span>{formatInlineMarkdown(content)}</span>
                              </li>
                            )
                          })}
                        </ol>
                      )
                    }

                    // Markdown Table
                    if (paragraph.startsWith('|')) {
                      const lines = paragraph.trim().split('\n')
                      return (
                        <div key={idx} className="overflow-x-auto my-6 rounded-2xl border border-slate-200 shadow-2xs">
                          <table className="w-full text-xs sm:text-sm text-left">
                            <tbody className="divide-y divide-slate-200">
                              {lines.map((l, lIdx) => {
                                if (l.includes(':---')) return null
                                const cells = l.split('|').filter((c, i, arr) => i > 0 && i < arr.length - 1)
                                if (cells.length === 0) return null
                                const isHeader = lIdx === 0
                                return (
                                  <tr key={lIdx} className={isHeader ? 'bg-slate-100 font-bold text-slate-900' : 'hover:bg-slate-50/80 transition-colors'}>
                                    {cells.map((c, cIdx) => (
                                      <td key={cIdx} className={`p-3.5 border-r border-slate-200 last:border-r-0 ${isHeader ? 'font-black text-slate-900 text-xs sm:text-sm' : 'text-slate-700'}`}>
                                        {formatInlineMarkdown(c.trim())}
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

                    // Standard Paragraph
                    return (
                      <p key={idx} className="text-slate-700 leading-relaxed">
                        {formatInlineMarkdown(paragraph)}
                      </p>
                    )
                  })}
                </div>
              ) : (
                <div className="prose prose-slate max-w-none text-slate-700">
                  <p>{(legacyPost as any).content}</p>
                </div>
              )}

              {/* In-Article Callout Box */}
              <div className="my-8 rounded-2xl bg-gradient-to-r from-brand-600 to-brand-800 text-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
                <div className="space-y-1.5 text-center sm:text-left">
                  <h3 className="text-xl font-bold text-white">
                    Need an itemized hospital quotation for {post.category}?
                  </h3>
                  <p className="text-xs sm:text-sm text-brand-100 max-w-md">
                    We connect you directly with senior department surgeons and send 3 comparative estimates within 24 hours.
                  </p>
                </div>
                <div className="shrink-0 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <BlogQuoteButton
                    procedureTitle={post.title}
                    category={post.category}
                    className="w-full sm:w-auto bg-white text-brand-900 hover:bg-brand-50"
                  />
                </div>
              </div>

              {/* Structured FAQ Section (FAQPage Schema) */}
              {isSeoPost && postData.faqItems && postData.faqItems.length > 0 && (
                <div id="frequently-asked-questions" className="pt-8 border-t border-slate-200 space-y-5 scroll-mt-24">
                  <div className="space-y-1">
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
                      <HelpCircle className="h-6 w-6 text-brand-600" />
                      Frequently Asked Questions
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500">
                      Common clinical, cost, and logistics questions answered by our medical panel.
                    </p>
                  </div>
                  <div className="space-y-3.5">
                    {postData.faqItems.map((faq, fIdx) => (
                      <div key={fIdx} className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 space-y-2">
                        <h4 className="text-sm sm:text-base font-bold text-slate-900">{faq.question}</h4>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </article>

            {/* Right Sticky Sidebar (4 Cols) */}
            <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
              {/* Table of Contents */}
              {headings.length > 0 && (
                <BlogTableOfContents headings={headings} />
              )}

              {/* Quick Action Card */}
              <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-2xs space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-700 bg-brand-50 px-2 py-0.5 rounded">
                    Free Consultation Desk
                  </span>
                  <h4 className="text-base font-bold text-slate-900">
                    Get Free Doctor Opinion & Cost Tariff
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Compare treatment estimates from JCI & NABH accredited hospitals in Delhi NCR.
                  </p>
                </div>

                <div className="space-y-2.5 pt-1">
                  <BlogQuoteButton
                    procedureTitle={post.title}
                    category={post.category}
                    className="w-full justify-center"
                    size="md"
                  />
                  <BlogWhatsAppButton
                    procedureTitle={post.title}
                    category={post.category}
                    className="w-full justify-center text-xs py-2.5"
                  />
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2 text-[11px] text-slate-600 font-medium">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                    <span>Zero agency markup — direct hospital tariff</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                    <span>Official Medical Visa (MED-1) Assistance</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                    <span>Free airport transfer & multilingual manager</span>
                  </div>
                </div>
              </div>

              {/* Medical Reviewer Highlights */}
              {isSeoPost && postData.medicalReviewer && (
                <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-2xs space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                    <ShieldCheck className="h-4 w-4 text-emerald-600" />
                    <span>Clinical Reviewer Credentials</span>
                  </div>
                  <div className="space-y-1 text-xs">
                    <div className="font-bold text-slate-900">{postData.medicalReviewer.name}</div>
                    <div className="text-slate-600">{postData.medicalReviewer.designation}</div>
                    <div className="text-brand-700 font-semibold">{postData.medicalReviewer.hospitalName}</div>
                    {postData.medicalReviewer.qualifications && (
                      <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                        {postData.medicalReviewer.qualifications.join(' • ')}
                      </div>
                    )}
                  </div>
                  <Link
                    href="/doctors"
                    className="inline-flex items-center gap-1 text-xs font-bold text-brand-600 hover:underline pt-1"
                  >
                    View Verified Doctors →
                  </Link>
                </div>
              )}
            </aside>
          </div>

          {/* Bottom Related Guides Section */}
          {otherPosts.length > 0 && (
            <div className="mt-16 pt-10 border-t border-slate-200 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900">
                    Explore Other Medical Cost Guides
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Detailed procedural walkthroughs and transparent hospital tariffs.
                  </p>
                </div>
                <Link
                  href="/blog"
                  className="text-xs sm:text-sm font-bold text-brand-600 hover:text-brand-700 inline-flex items-center gap-1"
                >
                  View All Guides <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {otherPosts.map((other) => (
                  <div
                    key={other.id}
                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs hover:shadow-md hover:border-brand-300 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <Badge variant="accent" className="mb-2 text-[10px]">
                        {other.category}
                      </Badge>
                      <Link href={`/blog/${other.slug}`} className="block group">
                        <h4 className="font-bold text-sm text-slate-900 group-hover:text-brand-600 transition-colors line-clamp-2 leading-snug">
                          {other.title}
                        </h4>
                      </Link>
                      <p className="mt-2 text-xs text-slate-500 line-clamp-2">
                        {other.metaDescription}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <Link
                        href={`/blog/${other.slug}`}
                        className="text-xs font-bold text-brand-600 hover:text-brand-700"
                      >
                        Read Guide →
                      </Link>
                      <span className="text-[11px] text-slate-400">8 min read</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
