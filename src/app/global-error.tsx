'use client'

import React from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex items-center justify-center bg-slate-100 font-sans p-4">
        <div className="max-w-md w-full text-center bg-white rounded-2xl p-8 shadow-xl border border-slate-200">
          <div className="text-3xl mb-3">🏥</div>
          <h1 className="text-xl font-bold text-slate-900 mb-2">
            healthremade — System Glitch
          </h1>
          <p className="text-xs text-slate-600 mb-6">
            An unexpected error occurred. Click below to refresh the application.
          </p>
          <button
            onClick={() => reset()}
            className="w-full rounded-xl bg-teal-600 text-white font-bold py-2.5 px-4 text-sm hover:bg-teal-700 transition-colors shadow-sm"
          >
            Restart Application
          </button>
        </div>
      </body>
    </html>
  )
}
