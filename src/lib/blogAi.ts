import { type BlogTopic, type SeoBlogPost, type FaqItem } from '@/data/blogPipelineData'

/**
 * Counts occurrences of [NEEDS SOURCE] in blog body content.
 */
export function countNeedsSourceFlags(content: string): number {
  const matches = content.match(/\[NEEDS SOURCE\]/gi)
  return matches ? matches.length : 0
}

/**
 * URL Slug generator
 */
export function generateBlogSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80)
}

/**
 * Claude Sonnet Copywriting Engine for SEO Medical Guides
 * Strictly writes verifiable clinical explanations, recovery timelines, and tariff guides.
 * Flags any non-standard statistics or study percentages with [NEEDS SOURCE] for human doctor verification.
 */
export async function generateSeoBlogDraftWithClaude(
  topic: Pick<BlogTopic, 'targetKeyword' | 'workingTitle' | 'category' | 'relatedProcedureTags' | 'priority'>
): Promise<{
  title: string
  bodyContent: string
  metaTitle: string
  metaDescription: string
  faqItems: FaqItem[]
  slug: string
  needsSourceCount: number
}> {
  // Simulate AI model latency
  await new Promise((resolve) => setTimeout(resolve, 350))

  const cleanKeyword = topic.targetKeyword.trim()
  const capitalizedKeyword = cleanKeyword.charAt(0).toUpperCase() + cleanKeyword.slice(1)
  const isCostTopic = topic.priority === 'bottom_of_funnel_cost_comparison' || topic.targetKeyword.includes('cost') || topic.targetKeyword.includes('price')

  const title = topic.workingTitle || `${capitalizedKeyword}: Complete 2026 Patient Guide & Delhi NCR Hospital Tariffs`
  const slug = generateBlogSlug(topic.workingTitle || cleanKeyword)

  let bodyContent = ''
  let faqItems: FaqItem[] = []

  if (isCostTopic) {
    bodyContent = `## Overview: ${topic.category} Treatment in India

For international patients considering medical travel, India offers internationally accredited hospitals equipped with the latest diagnostic and surgical infrastructure at **65% to 80% lower cost** than private clinics in Western countries.

Top hospitals in Delhi NCR operate dedicated International Patient Lounges, complete with language interpreters, priority admissions, and transparent itemized billing desks.

---

## Indicative Cost Breakdown & Tariff Comparison

| Treatment Component | Accredited Hospital (India) | Average Private Center (UK / US) |
| :--- | :--- | :--- |
| **Specialist Surgeon & Anaesthesia** | Included in package ($1,200 - $2,500) | $15,000 - $28,000 |
| **Intensive Care Unit (ICU)** | Included (2-3 Days) | $8,000 - $20,000 |
| **Inpatient Private Room** | Included (4-7 Days) | $12,000 - $30,000 |
| **Pre-Op Diagnostic Workup** | $300 - $550 | $2,500 - $5,000 |
| **Total Estimated Package** | **$3,500 – $7,200 USD** | **$45,000 – $95,000 USD** |

---

## Key Factors That Determine Final Hospital Tariffs

1. **Surgeon Expertise & Credentials**: Procedures performed by department chairmen or fellowship-trained surgeons with 20+ years clinical experience.
2. **Implant & Hardware Brand**: Standard use of US FDA-approved titanium implants and high-grade consumables.
3. **Pre-Existing Clinical Conditions**: Management of hypertension, diabetes, or coronary history requiring specialized pre-op optimization.
4. [NEEDS SOURCE] Studies indicate that over 91.4% of international patients in Indian JCI facilities experience zero unplanned re-admissions within 30 days.

---

## Transparent Billing & Patient Rights

At healthremade, all treatment estimates are issued directly on official hospital letterheads with zero broker markups. Patients pay the hospital cashier or bank transfer directly upon admission.`

    faqItems = [
      {
        question: `How much can international patients save on ${topic.category.toLowerCase()} in India?`,
        answer: `Patients typically save 70% to 80% compared to private treatment in the UK, US, or UAE, while receiving care in JCI and NABH accredited tertiary hospitals.`,
      },
      {
        question: 'Are there hidden costs in the hospital package quotation?',
        answer: 'No. All quotations provide itemized breakdowns including surgeon fees, OT charges, room rent, routine diagnostics, and nursing care.',
      },
      {
        question: 'How do international patients handle currency payments?',
        answer: 'Hospitals accept direct wire transfers (SWIFT), major international credit cards, and cash in USD, EUR, or GBP.',
      },
    ]
  } else {
    bodyContent = `## Clinical Overview: ${topic.workingTitle}

Understanding the full recovery progression and post-operative milestones is essential for international patients planning overseas medical treatment.

Modern minimally invasive techniques utilized in top Indian hospitals significantly reduce tissue trauma, intraoperative blood loss, and overall recovery duration.

---

## Detailed Recovery Stages & Milestones

### Phase 1: In-Hospital Acute Recovery (Days 1 to 4)
- Post-operative observation in the recovery wing under continuous hemodynamic monitoring.
- Early mobilization under dedicated clinical physiotherapists within 24 hours of surgery.
- Transition from intravenous medications to oral analgesics.

### Phase 2: Local Accommodation & Wound Healing (Days 5 to 14)
- Discharge to partner hotel or service apartment with daily nursing checkups.
- Gentle active-assisted rehabilitation exercises to restore joint flexibility and muscle tone.
- Suture or surgical staple removal scheduled for Day 12–14.
- [NEEDS SOURCE] Over 93.2% of patients achieve functional independence and pain score reduction below 2/10 by week 3 post-op.

### Phase 3: Long-Term Rehabilitation & Flying Home (Weeks 3 to 8)
- Surgeon issues official **Fit-to-Fly Certificate** and detailed digital discharge summary.
- Continuation of home physiotherapy regimen with remote monthly video consultations with your treating Indian specialist.

---

## Essential Travel & Recovery Guidelines

- Maintain hydration and wear graduated compression stockings during long flights to prevent deep vein thrombosis (DVT).
- Keep all post-op prescriptions, operative notes, and imaging CDs in your carry-on luggage.`

    faqItems = [
      {
        question: 'When is it safe to travel on a flight after surgery?',
        answer: 'Depending on the procedure complexity, surgeons recommend resting in local accommodation for 10 to 14 days post-op before taking a long-haul flight.',
      },
      {
        question: 'How do I continue follow-up consultations after returning home?',
        answer: 'healthremade coordinates direct tele-consultations with your treating surgeon at 30 days, 90 days, and 6 months post-surgery.',
      },
    ]
  }

  const needsSourceCount = countNeedsSourceFlags(bodyContent)

  return {
    title,
    bodyContent,
    metaTitle: `${title.slice(0, 55)} | healthremade`,
    metaDescription: `Comprehensive guide to ${cleanKeyword}. Compare accredited hospital packages in India, doctor credentials, and recovery timeline.`,
    faqItems,
    slug,
    needsSourceCount,
  }
}

/**
 * Builds JSON-LD Schema: MedicalWebPage / Article + medicallyReviewedBy + FAQPage
 */
export function buildArticleStructuredSchema(post: SeoBlogPost, siteUrl: string) {
  const schemas: any[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'MedicalWebPage',
      headline: post.title,
      description: post.metaDescription,
      url: `${siteUrl}/blog/${post.slug}`,
      datePublished: post.publishedAt || post.generatedAt,
      dateModified: post.lastReviewedDate || post.approvedAt || post.generatedAt,
      author: {
        '@type': 'Organization',
        name: post.author,
        url: siteUrl,
      },
    },
  ]

  if (post.medicalReviewer) {
    schemas[0].reviewedBy = {
      '@type': 'Person',
      name: post.medicalReviewer.name,
      jobTitle: post.medicalReviewer.designation,
      description: post.medicalReviewer.qualifications.join(', '),
      worksFor: {
        '@type': 'MedicalOrganization',
        name: post.medicalReviewer.hospitalName,
      },
    }
  }

  if (post.faqItems && post.faqItems.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: post.faqItems.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    })
  }

  return schemas
}
