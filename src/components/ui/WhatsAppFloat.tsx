'use client'

import React, { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { MessageCircle, X } from 'lucide-react'
import { getWhatsAppUrl, WhatsAppContext } from '@/lib/whatsapp'
import { PROCEDURES } from '@/data/procedures'
import { HOSPITALS } from '@/data/hospitals'

export function WhatsAppFloat() {
  const pathname = usePathname()
  const [showTooltip, setShowTooltip] = useState(false)
  const [closedManually, setClosedManually] = useState(false)

  // Delay tooltip popup slightly after load for a nice natural feel
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!closedManually) {
        setShowTooltip(true)
      }
    }, 2500)
    return () => clearTimeout(timer)
  }, [pathname, closedManually])

  // Derive context based on current route
  const getContext = (): WhatsAppContext => {
    if (pathname === '/') {
      return { pageType: 'home' }
    }
    if (pathname.startsWith('/pricing')) {
      return { pageType: 'pricing' }
    }
    if (pathname.startsWith('/visa-and-travel')) {
      return { pageType: 'visa' }
    }
    if (pathname.startsWith('/how-we-work')) {
      return { pageType: 'how-we-work' }
    }
    if (pathname.startsWith('/verified-outcomes')) {
      return { pageType: 'outcomes' }
    }
    if (pathname.startsWith('/treatments/')) {
      const parts = pathname.split('/').filter(Boolean)
      const slug = parts[2]
      const procedure = PROCEDURES.find((p) => p.slug === slug)
      return {
        pageType: 'treatment',
        treatmentName: procedure?.name || slug?.replace(/-/g, ' '),
      }
    }
    if (pathname.startsWith('/hospitals/')) {
      const parts = pathname.split('/').filter(Boolean)
      const slug = parts[2]
      const city = parts[1]
      const hospital = HOSPITALS.find((h) => h.slug === slug)
      return {
        pageType: 'hospital',
        hospitalName: hospital?.name || slug?.replace(/-/g, ' '),
        city: hospital?.cityLabel || city,
      }
    }
    return { pageType: 'general' }
  }

  const context = getContext()
  const waUrl = getWhatsAppUrl(context)

  // Dynamic tooltip preview text depending on context
  const getTooltipPrompt = () => {
    if (context.treatmentName) {
      return `Need cost details for ${context.treatmentName}? Chat with our Care Team on WhatsApp!`
    }
    if (context.hospitalName) {
      return `Questions about ${context.hospitalName}? Speak with our coordinator directly.`
    }
    if (context.pageType === 'pricing') {
      return `Get instant package comparisons from 3+ hospitals on WhatsApp.`
    }
    if (context.pageType === 'visa') {
      return `Need urgent medical visa assistance? Connect with us on WhatsApp.`
    }
    return `Looking for treatment in India? Chat live with a Medical Coordinator.`
  }

  return (
    <aside
      aria-label="WhatsApp quick chat"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9999] flex flex-col items-end pointer-events-none"
    >
      {/* Dynamic Context Tooltip */}
      {showTooltip && (
        <div className="mb-2.5 max-w-[calc(100vw-32px)] sm:max-w-xs rounded-2xl bg-white p-3.5 shadow-2xl border border-slate-200 pointer-events-auto transition-all animate-in fade-in slide-in-from-bottom-3 duration-300">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-bold text-slate-800">Care Coordinator Online</span>
            </div>
            <button
              onClick={() => {
                setShowTooltip(false)
                setClosedManually(true)
              }}
              className="text-slate-400 hover:text-slate-600 rounded-full p-0.5"
              aria-label="Dismiss message"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
          <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
            {getTooltipPrompt()}
          </p>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2.5 inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-[#25D366] px-3 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-[#1EBE5D] transition-colors"
          >
            <MessageCircle className="h-3.5 w-3.5 fill-white" />
            Chat on WhatsApp
          </a>
        </div>
      )}

      {/* Main Floating Button */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp with healthremade Care Coordinator"
        className="group pointer-events-auto relative flex h-13 w-13 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl hover:scale-105 active:scale-95 hover:bg-[#1EBE5D] transition-all duration-200"
      >
        {/* Pulse ripple ring */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-30 group-hover:opacity-50 animate-ping -z-10" />

        {/* WhatsApp Icon */}
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-6 w-6 sm:h-7 sm:w-7"
        >
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.067-1.107-.066-.35-.113-.775-.277-1.332-.519-2.336-1.014-3.86-3.376-3.977-3.533-.117-.156-.95-1.264-.95-2.411 0-1.147.603-1.71.817-1.944.214-.233.468-.292.624-.292.156 0 .312.002.45.009.144.007.337-.054.527.401.196.47.668 1.632.726 1.75.058.117.098.254.019.41-.078.156-.117.253-.234.39-.117.137-.246.306-.351.41-.118.117-.24.244-.103.479.137.234.607 1.002 1.302 1.621.895.797 1.651 1.045 1.885 1.162.234.117.371.098.508-.058.137-.156.586-.683.742-.917.156-.234.313-.195.527-.117.215.078 1.366.644 1.601.761.234.117.39.176.449.273.058.098.058.566-.086.971z" />
          <path d="M12.042 2C6.505 2 2 6.506 2 12.044c0 1.947.556 3.763 1.521 5.305L2 22l4.821-1.464c1.472.859 3.181 1.353 5.221 1.353 5.537 0 10.042-4.506 10.042-10.045 0-5.538-4.505-10.044-10.042-10.044zm0 18.08c-1.748 0-3.37-.502-4.747-1.365l-.341-.213-2.871.872.871-2.802-.234-.372c-.958-1.52-1.467-3.284-1.467-5.156 0-4.437 3.61-8.044 8.047-8.044 4.439 0 8.047 3.607 8.047 8.044 0 4.438-3.608 8.044-8.046 8.044z" />
        </svg>

        {/* Unread badge dot */}
        <span className="absolute top-0 right-0 block h-3.5 w-3.5 rounded-full ring-2 ring-white bg-amber-400" />
      </a>
    </aside>
  )
}
