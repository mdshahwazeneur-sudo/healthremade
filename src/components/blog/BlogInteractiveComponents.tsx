'use client'

import React, { useState, useEffect } from 'react'
import { FileText, MessageCircle, ArrowUpRight, List, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/primitives'
import { useQuote } from '@/components/ui/QuoteModal'
import { getWhatsAppUrl } from '@/lib/whatsapp'

interface BlogQuoteButtonProps {
  procedureTitle: string
  category: string
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export function BlogQuoteButton({
  procedureTitle,
  category,
  className = '',
  size = 'md',
}: BlogQuoteButtonProps) {
  const { openQuoteModal } = useQuote()

  return (
    <Button
      variant="accent"
      size={size}
      onClick={() => openQuoteModal({ treatment: procedureTitle })}
      className={`font-bold shadow-xs ${className}`}
    >
      <FileText className="h-4 w-4 mr-1.5" />
      Get Free Hospital Quote
    </Button>
  )
}

export function BlogWhatsAppButton({
  procedureTitle,
  category,
  className = '',
}: {
  procedureTitle: string
  category: string
  className?: string
}) {
  const waUrl = getWhatsAppUrl({
    pageType: 'treatment',
    treatmentName: category,
    customMessage: `Hello healthremade! I read your clinical guide on "${procedureTitle}" and would like to get a hospital cost quote and doctor appointment in India.`,
  })

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] text-white px-5 py-3 text-sm font-bold hover:bg-[#1EBE5D] transition-colors shadow-md ${className}`}
    >
      <MessageCircle className="h-4 w-4 fill-white" />
      <span>Consult Doctor on WhatsApp</span>
    </a>
  )
}

export function BlogTableOfContents({ headings }: { headings: Array<{ id: string; text: string }> }) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120
      for (let i = headings.length - 1; i >= 0; i--) {
        const el = document.getElementById(headings[i].id)
        if (el && el.offsetTop <= scrollPosition) {
          setActiveId(headings[i].id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [headings])

  if (!headings || headings.length === 0) return null

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-3">
      <div className="flex items-center gap-2 font-bold text-sm text-slate-900 border-b border-slate-100 pb-2.5">
        <List className="h-4 w-4 text-brand-600" />
        <span>Table of Contents</span>
      </div>
      <nav className="flex flex-col space-y-1.5 text-xs">
        {headings.map((h) => {
          const isActive = activeId === h.id
          return (
            <a
              key={h.id}
              href={`#${h.id}`}
              className={`py-1 px-2 rounded-lg transition-colors leading-snug line-clamp-1 ${
                isActive
                  ? 'bg-brand-50 text-brand-700 font-bold border-l-2 border-brand-600 pl-2'
                  : 'text-slate-600 hover:text-brand-600 hover:bg-slate-50'
              }`}
            >
              {h.text}
            </a>
          )
        })}
      </nav>
    </div>
  )
}
