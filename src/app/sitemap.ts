import { MetadataRoute } from 'next'
import { PROCEDURES } from '@/data/procedures'
import { HOSPITALS } from '@/data/hospitals'
import { DOCTORS } from '@/data/doctors'
import { MOCK_BLOG_POSTS } from '@/data/adminData'
import { INITIAL_SEO_BLOG_POSTS } from '@/data/blogPipelineData'
import { INITIAL_LANDING_PAGES } from '@/data/landingPagesData'
import { NEWS_ARTICLES } from '@/data/newsData'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://healthremade.com'

const languageAlternates = (path: string) => {
  const clean = path.startsWith('/') ? path : `/${path}`
  return {
    languages: {
      en: `${SITE_URL}${clean === '/' ? '' : clean}`,
      bn: `${SITE_URL}/bn${clean === '/' ? '' : clean}`,
      ar: `${SITE_URL}/ar${clean === '/' ? '' : clean}`,
      ru: `${SITE_URL}/ru${clean === '/' ? '' : clean}`,
      fr: `${SITE_URL}/fr${clean === '/' ? '' : clean}`,
      sw: `${SITE_URL}/sw${clean === '/' ? '' : clean}`,
      uz: `${SITE_URL}/uz${clean === '/' ? '' : clean}`,
      ro: `${SITE_URL}/ro${clean === '/' ? '' : clean}`,
      pt: `${SITE_URL}/pt${clean === '/' ? '' : clean}`,
      es: `${SITE_URL}/es${clean === '/' ? '' : clean}`,
      de: `${SITE_URL}/de${clean === '/' ? '' : clean}`,
      tr: `${SITE_URL}/tr${clean === '/' ? '' : clean}`,
    },
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString()

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: 'weekly', priority: 1.0, alternates: languageAlternates('') },
    { url: `${SITE_URL}/pricing`, lastModified: now, changeFrequency: 'daily', priority: 0.9, alternates: languageAlternates('/pricing') },
    { url: `${SITE_URL}/doctors`, lastModified: now, changeFrequency: 'weekly', priority: 0.9, alternates: languageAlternates('/doctors') },
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: 'daily', priority: 0.85, alternates: languageAlternates('/blog') },
    { url: `${SITE_URL}/news`, lastModified: now, changeFrequency: 'daily', priority: 0.9, alternates: languageAlternates('/news') },
    { url: `${SITE_URL}/how-we-work`, lastModified: now, changeFrequency: 'monthly', priority: 0.8, alternates: languageAlternates('/how-we-work') },
    { url: `${SITE_URL}/testimonials`, lastModified: now, changeFrequency: 'daily', priority: 0.9, alternates: languageAlternates('/testimonials') },
    { url: `${SITE_URL}/verified-outcomes`, lastModified: now, changeFrequency: 'weekly', priority: 0.8, alternates: languageAlternates('/verified-outcomes') },
    { url: `${SITE_URL}/visa-and-travel`, lastModified: now, changeFrequency: 'monthly', priority: 0.7, alternates: languageAlternates('/visa-and-travel') },
    { url: `${SITE_URL}/treatments`, lastModified: now, changeFrequency: 'weekly', priority: 0.8, alternates: languageAlternates('/treatments') },
    { url: `${SITE_URL}/hospitals`, lastModified: now, changeFrequency: 'weekly', priority: 0.8, alternates: languageAlternates('/hospitals') },
  ]

  // Doctor individual profiles
  const doctorPages: MetadataRoute.Sitemap = DOCTORS.map((doc) => ({
    url: `${SITE_URL}/doctors/${doc.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.85,
    alternates: languageAlternates(`/doctors/${doc.slug}`),
  }))

  // Specialty hub pages
  const specialties = Array.from(new Set(PROCEDURES.map((p) => p.specialty)))
  const specialtyPages: MetadataRoute.Sitemap = specialties.map((spec) => ({
    url: `${SITE_URL}/treatments/${spec}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.85,
    alternates: languageAlternates(`/treatments/${spec}`),
  }))

  // Treatment pages
  const treatmentPages: MetadataRoute.Sitemap = PROCEDURES.map((proc) => ({
    url: `${SITE_URL}/treatments/${proc.specialty}/${proc.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.85,
    alternates: languageAlternates(`/treatments/${proc.specialty}/${proc.slug}`),
  }))

  // Blog pages (Published SEO articles + legacy)
  const publishedSeoBlogPages: MetadataRoute.Sitemap = INITIAL_SEO_BLOG_POSTS.filter(
    (post) => post.status === 'published'
  ).map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.publishedAt || now,
    changeFrequency: 'daily',
    priority: 0.85,
    alternates: languageAlternates(`/blog/${post.slug}`),
  }))

  const legacyBlogPages: MetadataRoute.Sitemap = MOCK_BLOG_POSTS.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
    alternates: languageAlternates(`/blog/${post.slug}`),
  }))

  // AI Published Landing Pages
  const publishedLpPages: MetadataRoute.Sitemap = INITIAL_LANDING_PAGES.filter(
    (lp) => lp.status === 'published'
  ).map((lp) => ({
    url: `${SITE_URL}${lp.slug}`,
    lastModified: lp.publishedAt || now,
    changeFrequency: 'weekly',
    priority: 0.9,
    alternates: languageAlternates(lp.slug),
  }))

  // News & Updates articles
  const newsPages: MetadataRoute.Sitemap = NEWS_ARTICLES.map((article) => ({
    url: `${SITE_URL}/news/${article.slug}`,
    lastModified: article.updatedAt || article.publishedAt || now,
    changeFrequency: 'weekly',
    priority: 0.85,
    alternates: languageAlternates(`/news/${article.slug}`),
  }))

  // Hospital pages
  const hospitalPages: MetadataRoute.Sitemap = HOSPITALS.map((h) => ({
    url: `${SITE_URL}/hospitals/${h.city}/${h.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
    alternates: languageAlternates(`/hospitals/${h.city}/${h.slug}`),
  }))

  // Deduplicate by URL
  const allEntries = [
    ...staticPages,
    ...doctorPages,
    ...specialtyPages,
    ...treatmentPages,
    ...publishedSeoBlogPages,
    ...legacyBlogPages,
    ...newsPages,
    ...publishedLpPages,
    ...hospitalPages,
  ]

  const seen = new Set<string>()
  return allEntries.filter((item) => {
    if (seen.has(item.url)) return false
    seen.add(item.url)
    return true
  })
}

