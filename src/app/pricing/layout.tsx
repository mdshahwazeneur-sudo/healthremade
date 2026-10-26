import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hospital Treatment Costs & Package Prices in India | healthremade',
  description:
    'Search and compare itemized medical treatment package costs across accredited hospitals in India. Bypass surgery, knee replacement, cancer therapy, and organ transplants with transparent pricing.',
  alternates: {
    canonical: '/pricing',
  },
  openGraph: {
    title: 'Hospital Treatment Costs & Package Prices in India | healthremade',
    description:
      'Compare transparent hospital pricing in India. Real package inclusions, surgeon fees, and zero hidden markups.',
    url: '/pricing',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hospital Treatment Costs & Package Prices in India | healthremade',
    description:
      'Compare transparent hospital pricing in India. Real package inclusions, surgeon fees, and zero hidden markups.',
  },
}

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
