'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import { AlertTriangle, RefreshCw, Home, MessageCircle, ShieldAlert } from 'lucide-react'
import { Button } from '@/components/ui/primitives'
import { getWhatsAppUrl } from '@/lib/whatsapp'

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log client runtime exception securely
    console.error('Captured by healthremade Root Error Boundary:', error)
  }, [error])

  const waUrl = getWhatsAppUrl({
    pageType: 'general',
    customMessage: 'Hello healthremade Care Desk! I encountered an issue on the website and need assistance.',
  })

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 bg-slate-50">
      <div className="max-w-md w-full text-center bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-200/80">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 text-amber-700 mb-6 shadow-xs">
          <ShieldAlert className="h-8 w-8" />
        </div>

        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Temporary Display Issue
        </h1>

        <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
          We encountered an unexpected glitch loading this view. Your data is safe and our systems remain fully operational.
        </p>

        <div className="mt-6 flex flex-col gap-2.5">
          <Button
            variant="accent"
            size="lg"
            onClick={() => reset()}
            className="w-full font-bold shadow-xs"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Reload Page
          </Button>

          <Button variant="outline" size="lg" asChild className="w-full font-semibold">
            <Link href="/">
              <Home className="h-4 w-4 mr-2" />
              Return to Homepage
            </Link>
          </Button>

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 px-4 py-2.5 text-xs font-bold transition-colors"
          >
            <MessageCircle className="h-4 w-4 fill-[#25D366] text-[#25D366]" />
            Connect with Care Desk on WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}
