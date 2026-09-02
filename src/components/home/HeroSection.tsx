'use client'

import React, { useRef } from 'react'
import { HeroFlightAnimation } from '@/components/home/HeroFlightAnimation'

export function HeroSection({ children }: { children: React.ReactNode }) {
  const heroRef = useRef<HTMLElement>(null)

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden bg-gradient-to-b from-brand-50/80 via-white to-slate-50 px-4 pt-12 pb-16 sm:px-6 sm:pt-16 sm:pb-24 border-b border-slate-200/60"
    >
      {/* ─── Layer 0: Scroll-Linked Background Flight Animation ─── */}
      <HeroFlightAnimation containerRef={heroRef} />

      {/* ─── Layer 1: Real Interactive Hero Content ─────────────── */}
      <div className="relative z-10 mx-auto max-w-5xl text-center">
        {children}
      </div>
    </section>
  )
}
