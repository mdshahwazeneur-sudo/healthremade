import { MetadataRoute } from 'next'
import { PROCEDURES } from '@/data/procedures'
import { HOSPITALS } from '@/data/hospitals'
import { DOCTORS } from '@/data/doctors'
import { MOCK_BLOG_POSTS } from '@/data/adminData'
import { INITIAL_SEO_BLOG_POSTS } from '@/data/blogPipelineData'
import { INITIAL_LANDING_PAGES } from '@/data/landingPagesData'
import { NEWS_ARTICLES } from '@/data/newsData'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://healthremade.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString()

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE_URL}/pricing`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE_URL}/doctors`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: 'daily', priority: 0.85 },
    { url: `${SITE_URL}/news`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE_URL}/how-we-work`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/testimonials`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE_URL}/verified-outcomes`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/visa-and-travel`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/treatments`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/hospitals`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
  ]

  // Doctor individual profiles
  const doctorPages: MetadataRoute.Sitemap = DOCTORS.map((doc) => ({
    url: `${SITE_URL}/doctors/${doc.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.85,
  }))

  // Specialty hub pages
  const specialties = Array.from(new Set(PROCEDURES.map((p) => p.specialty)))
  const specialtyPages: MetadataRoute.Sitemap = specialties.map((spec) => ({
    url: `${SITE_URL}/treatments/${spec}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.85,
  }))

  // Treatment pages
  const treatmentPages: MetadataRoute.Sitemap = PROCEDURES.map((proc) => ({
    url: `${SITE_URL}/treatments/${proc.specialty}/${proc.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.85,
  }))

  // Blog pages (Published SEO articles + legacy)
  const publishedSeoBlogPages: MetadataRoute.Sitemap = INITIAL_SEO_BLOG_POSTS.filter(
    (post) => post.status === 'published'
  ).map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.publishedAt || now,
    changeFrequency: 'daily',
    priority: 0.85,
  }))

  const legacyBlogPages: MetadataRoute.Sitemap = MOCK_BLOG_POSTS.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  // AI Published Landing Pages
  const publishedLpPages: MetadataRoute.Sitemap = INITIAL_LANDING_PAGES.filter(
    (lp) => lp.status === 'published'
  ).map((lp) => ({
    url: `${SITE_URL}${lp.slug}`,
    lastModified: lp.publishedAt || now,
    changeFrequency: 'weekly',
    priority: 0.9,
  }))

  // News & Updates articles
  const newsPages: MetadataRoute.Sitemap = NEWS_ARTICLES.map((article) => ({
    url: `${SITE_URL}/news/${article.slug}`,
    lastModified: article.updatedAt || article.publishedAt || now,
    changeFrequency: 'weekly',
    priority: 0.85,
  }))

  // Hospital pages
  const hospitalPages: MetadataRoute.Sitemap = HOSPITALS.map((h) => ({
    url: `${SITE_URL}/hospitals/${h.city}/${h.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
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

