import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Top Doctors & Lead Surgeons in India — Verified Profiles | healthremade',
  description:
    'Consult verified chief surgeons and department heads across top JCI & NABH accredited hospitals in India. View credentials, experience, video insights, and request free medical opinions.',
  alternates: {
    canonical: '/doctors',
  },
  openGraph: {
    title: 'Top Doctors & Lead Surgeons in India | healthremade',
    description:
      'Verified chief surgeons, oncologists, cardiologists, and transplant specialists across top Indian hospitals. Free medical opinions and quotes.',
    url: '/doctors',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Top Doctors & Lead Surgeons in India | healthremade',
    description:
      'Verified chief surgeons and specialists across top Indian hospitals. Transparent quotes and direct medical opinion.',
  },
}

export default function DoctorsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
