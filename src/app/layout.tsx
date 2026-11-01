import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { JsonLd } from '@/components/ui/primitives'
import { buildOrganizationSchema } from '@/lib/schema'
import { QuoteProvider } from '@/components/ui/QuoteModal'
import { WhatsAppFloat } from '@/components/ui/WhatsAppFloat'
import { AdminDataProvider } from '@/context/AdminDataContext'
import { CurrencyProvider } from '@/context/CurrencyContext'
import { GoogleTranslateBridge } from '@/components/ui/GoogleTranslateBridge'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://healthremade.com'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0d9488',
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'healthremade — Medical Tourism India | Compare Hospital Packages & Free Quotes',
    template: '%s | healthremade',
  },
  description:
    'Get free treatment quotes and package price estimates from top accredited hospitals in Delhi NCR and India. 24/7 WhatsApp care coordination, medical visa support, and continuous post-op recovery.',
  keywords: [
    'medical tourism India',
    'hospital cost India',
    'Delhi hospital treatment quote',
    'bypass surgery India cost',
    'knee replacement India',
    'liver transplant India',
    'IVF India cost',
    'best hospital Delhi India',
  ],
  alternates: {
    canonical: SITE_URL,
    languages: {
      'en': SITE_URL,
      'bn': `${SITE_URL}?lang=bn`,
      'ar': `${SITE_URL}?lang=ar`,
      'ru': `${SITE_URL}?lang=ru`,
      'fr': `${SITE_URL}?lang=fr`,
      'sw': `${SITE_URL}?lang=sw`,
      'uz': `${SITE_URL}?lang=uz`,
      'ro': `${SITE_URL}?lang=ro`,
      'pt': `${SITE_URL}?lang=pt`,
      'es': `${SITE_URL}?lang=es`,
      'de': `${SITE_URL}?lang=de`,
      'tr': `${SITE_URL}?lang=tr`,
      'x-default': SITE_URL,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName: 'healthremade',
    title: 'healthremade — Medical Tourism India | Free Hospital Quotes & Itemized Pricing',
    description:
      'Transparent hospital package prices, accredited doctors, 24/7 WhatsApp assistance, and dedicated post-op recovery care across India.',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@healthremade',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

import { LanguageProvider } from '@/context/LanguageContext'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full antialiased font-sans">
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <GoogleTranslateBridge />
        <JsonLd data={buildOrganizationSchema(SITE_URL)} />
        <LanguageProvider>
          <AdminDataProvider>
            <CurrencyProvider>
              <QuoteProvider>
                <Navbar />
                <main className="flex-1">{children}</main>
                <Footer />
                <WhatsAppFloat />
              </QuoteProvider>
            </CurrencyProvider>
          </AdminDataProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
