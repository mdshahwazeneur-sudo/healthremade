import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Medical Tourism & Treatment Guides | Expert Insights | healthremade',
  description:
    'Evidence-based medical travel guides, treatment cost comparisons, surgery recovery timelines, and hospital reviews medically verified by leading specialists in India.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Medical Tourism & Treatment Guides | healthremade',
    description:
      'Medically verified travel guides, treatment price comparisons, and clinical insights for patients travelling to India for care.',
    url: '/blog',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Medical Tourism & Treatment Guides | healthremade',
    description:
      'Medically verified travel guides and clinical cost comparisons for treatment in India.',
  },
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
