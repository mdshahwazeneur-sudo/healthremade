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
    customMessage: `Hello healthremade! I read the article "${post.title}" and would like to get a hospital cost quote and doctor appointment in India.`,
  })

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

  return (
    <>
      <JsonLd data={jsonLdSchemas} />

      {/* Breadcrumb */}
      <nav className="border-b border-slate-200 bg-white px-4 py-3 sm:px-6" aria-label="Breadcrumb">
        <ol className="mx-auto flex max-w-4xl items-center gap-1.5 text-xs text-slate-500">
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
              Medical Guides
            </Link>
          </li>
          <li>
            <ChevronRight className="h-3 w-3" />
          </li>
          <li className="text-slate-900 font-semibold truncate">{post.title}</li>
        </ol>
      </nav>

      <article className="px-4 py-10 sm:px-6 bg-slate-50 min-h-screen">
        <div className="mx-auto max-w-4xl space-y-8">
          {/* Article Header */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="accent">
                {post.category}
              </Badge>
              <span className="text-xs text-slate-400">•</span>
              <span className="flex items-center gap-1 text-xs text-slate-500">
                <Clock className="h-3.5 w-3.5" /> 6 min read
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-[1.15]">
              {post.title}
            </h1>

            {/* Medical Reviewer Byline Card */}
            <div className="rounded-2xl border border-emerald-200 bg-gradient-to-r from-emerald-50 via-white to-emerald-50/40 p-4 sm:p-5 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="h-12 w-12 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-sm">
                    <Stethoscope className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-emerald-800 uppercase tracking-wide">
                        Medically Reviewed by
                      </span>
                      <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                    </div>
                    <div className="text-sm sm:text-base font-black text-slate-900">
                      {isSeoPost
                        ? postData.medicalReviewer?.name || 'Dr. Naresh Trehan'
                        : (legacyPost as any).medicalReviewer}
                    </div>
                    <div className="text-xs text-slate-600">
                      {isSeoPost
                        ? `${postData.medicalReviewer?.designation} • ${postData.medicalReviewer?.hospitalName}`
                        : `${(legacyPost as any).reviewerDesignation} • ${(legacyPost as any).reviewerHospital}`}
                    </div>
                    {isSeoPost && postData.medicalReviewer?.qualifications && (
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        Credentials: {postData.medicalReviewer.qualifications.join(', ')}
                      </div>
                    )}
                  </div>
                </div>

                <div className="sm:text-right text-xs text-slate-500 border-t sm:border-t-0 pt-2 sm:pt-0 border-emerald-100 shrink-0">
                  <div className="flex sm:justify-end items-center gap-1 font-semibold text-emerald-700">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>Clinical Verification Active</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Last Reviewed: {isSeoPost ? postData.lastReviewedDate : (legacyPost as any).reviewerDate}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Article Main Body */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6 text-slate-800 leading-relaxed">
            {isSeoPost ? (
              <div className="space-y-4 text-sm sm:text-base">
                {postData.bodyContent.split('\n\n').map((paragraph, idx) => {
                  if (paragraph.startsWith('## ')) {
                    return (
                      <h2
                        key={idx}
                        className="text-xl sm:text-2xl font-black text-slate-900 pt-6 border-b border-slate-100 pb-2"
                      >
                        {paragraph.replace('## ', '')}
                      </h2>
                    )
                  }
                  if (paragraph.startsWith('### ')) {
                    return (
                      <h3 key={idx} className="text-lg font-bold text-slate-900 pt-4">
                        {paragraph.replace('### ', '')}
                      </h3>
                    )
                  }
                  if (paragraph.startsWith('|')) {
                    // Render simple table
                    const lines = paragraph.trim().split('\n')
                    return (
                      <div key={idx} className="overflow-x-auto my-4 rounded-xl border border-slate-200">
                        <table className="w-full text-xs sm:text-sm text-left">
                          <tbody className="divide-y divide-slate-200">
                            {lines.map((l, lIdx) => {
                              if (l.includes(':---')) return null
                              const cells = l.split('|').filter(Boolean)
                              return (
                                <tr key={lIdx} className={lIdx === 0 ? 'bg-slate-100 font-bold text-slate-900' : 'hover:bg-slate-50'}>
                                  {cells.map((c, cIdx) => (
                                    <td key={cIdx} className="p-3 border-r border-slate-200 last:border-r-0">
                                      {c.trim()}
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
                  return <p key={idx} className="text-slate-700 leading-relaxed">{paragraph}</p>
                })}
              </div>
            ) : (
              <div className="prose prose-slate max-w-none text-slate-700">
                <p>{(legacyPost as any).content}</p>
              </div>
            )}

            {/* Structured FAQ Section (FAQPage Schema) */}
            {isSeoPost && postData.faqItems && postData.faqItems.length > 0 && (
              <div className="pt-8 border-t border-slate-200 space-y-4">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-brand-600" />
                  Frequently Asked Questions
                </h3>
                <div className="space-y-3">
                  {postData.faqItems.map((faq, fIdx) => (
                    <div key={fIdx} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
                      <h4 className="text-sm sm:text-base font-bold text-slate-900">{faq.question}</h4>
                      <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Bottom CTA Card */}
          <div className="rounded-3xl bg-slate-900 text-white p-6 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-2 text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs px-3 py-0.5 font-bold border border-emerald-500/30">
                <ShieldCheck className="h-3.5 w-3.5" /> JCI & NABH Accredited Hospital Network
              </div>
              <h3 className="text-2xl font-black text-white">
                Get 3 Hospital Cost Estimates in 24 Hours
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 max-w-lg">
                Direct hospital estimates from top surgeons with zero agency markups. 100% free inquiry.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] text-white px-5 py-3 text-xs font-bold hover:bg-[#1EBE5D] transition-colors shadow-md"
              >
                <MessageCircle className="h-4 w-4 fill-white" />
                WhatsApp Consultation
              </a>
              <Link
                href="/pricing"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white px-5 py-3 text-xs font-bold border border-slate-700 transition-colors"
              >
                Explore Tariffs <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  )
}
