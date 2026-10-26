import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'India Healthcare & Medical Tourism News | healthremade',
  description:
    'Stay updated with the latest news on Indian medical visa policies, hospital technological advancements, clinical trial breakthroughs, and medical tourism trends.',
  alternates: {
    canonical: '/news',
  },
  openGraph: {
    title: 'India Healthcare & Medical Tourism News | healthremade',
    description:
      'Official medical visa updates, hospital clinical breakthroughs, and patient advisory news in India.',
    url: '/news',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'India Healthcare & Medical Tourism News | healthremade',
    description:
      'Official medical visa updates and hospital clinical breakthroughs in India.',
  },
}

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
