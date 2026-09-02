'use client'

import React, { useRef, useState, useEffect, useCallback } from 'react'

export function HeroFlightAnimation({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLElement | null>
}) {
  const layerRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const planeGroupRef = useRef<SVGGElement>(null)
  const markerGroupRef = useRef<SVGGElement>(null)
  const destTagRef = useRef<SVGGElement>(null)

  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({
    width: 1200,
    height: 700,
  })

  // Dynamic bezier path perfectly positioned between the navbar (y: ~80) and hero content:
  // Starts at left margin (x: 20, y: 120)
  // Curves through the open gap below the navbar (apex at y: 92)
  // Sweeps down along the right screen margin and touches down on Delhi India hub
  const w = dimensions.width
  const h = dimensions.height
  const isMobile = w < 768

  // Coordinated flight path points based on live screen dimensions:
  // Desktop navbar with top microbar is ~112px high; mobile navbar is 80px high.
  // We position apexY comfortably below the navbar and above the hero header content.
  const startX = isMobile ? 18 : 35
  const startY = isMobile ? 112 : 148

  const apexX = w * 0.48
  const apexY = isMobile ? 96 : 130

  const shoulderX = isMobile ? w - 20 : Math.min(w - 40, w * 0.96)
  const shoulderY = isMobile ? 220 : 270

  const destX = isMobile ? w - 45 : Math.min(w - 90, w * 0.92)
  const destY = isMobile ? 380 : 460

  const dynamicPathD = `M ${startX},${startY} C ${w * 0.18},${apexY + 2} ${w * 0.35},${apexY} ${apexX},${apexY} C ${w * 0.72},${apexY + 4} ${shoulderX},160 ${shoulderX},${shoulderY} C ${shoulderX},${destY - 40} ${destX + 25},${destY - 15} ${destX},${destY}`

  // Update live window dimensions
  const updateDimensions = useCallback(() => {
    if (typeof window !== 'undefined') {
      setDimensions({
        width: window.innerWidth || 1200,
        height: window.innerHeight || 700,
      })
    }
  }, [])

  useEffect(() => {
    updateDimensions()
    let animFrame: number | null = null

    const updateFlight = () => {
      const activePath = pathRef.current
      if (!activePath) return

      let totalLength = 0
      try {
        totalLength = activePath.getTotalLength()
      } catch (e) {
        return
      }

      if (totalLength === 0) return

      const scrollY =
        window.scrollY ||
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0

      const container = containerRef.current
      const heroHeight = container ? container.offsetHeight : 650

      // Flight progress (0.0 at top of page -> 1.0 when hero is scrolled)
      const maxScroll = Math.max(heroHeight - 80, 240)
      const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1)

      // Calculate coordinates along bezier curve
      const currentDist = progress * totalLength
      const pt = activePath.getPointAtLength(currentDist)

      // Calculate tangent angle
      const delta = Math.min(totalLength - currentDist, 4)
      const ptAhead = activePath.getPointAtLength(
        currentDist + (delta > 0 ? delta : -4)
      )
      const angle =
        delta > 0
          ? Math.atan2(ptAhead.y - pt.y, ptAhead.x - pt.x) * (180 / Math.PI)
          : Math.atan2(pt.y - ptAhead.y, pt.x - ptAhead.x) * (180 / Math.PI)

      // 1. Direct GPU transform on plane element (instant zero-lag update)
      if (planeGroupRef.current) {
        planeGroupRef.current.setAttribute(
          'transform',
          `translate(${pt.x}, ${pt.y}) rotate(${angle})`
        )
      }

      // 2. Pulse arrival marker as plane approaches
      if (markerGroupRef.current) {
        const markerOpacity = Math.max(0.25, 0.25 + progress * 0.75)
        markerGroupRef.current.style.opacity = String(markerOpacity)
      }

      if (destTagRef.current) {
        destTagRef.current.style.opacity = String(Math.max(0.35, progress))
      }

      // 3. Fade out layer smoothly after scrolling past hero section
      if (layerRef.current) {
        if (scrollY > heroHeight + 60) {
          const fade = Math.max(0, 1 - (scrollY - (heroHeight + 60)) / 150)
          layerRef.current.style.opacity = String(fade)
          layerRef.current.style.display = fade <= 0.01 ? 'none' : 'block'
        } else {
          layerRef.current.style.opacity = '1'
          layerRef.current.style.display = 'block'
        }
      }
    }

    // Scroll and resize listeners
    const onScroll = () => {
      if (animFrame) cancelAnimationFrame(animFrame)
      animFrame = requestAnimationFrame(updateFlight)
    }

    const onResize = () => {
      updateDimensions()
      if (animFrame) cancelAnimationFrame(animFrame)
      animFrame = requestAnimationFrame(updateFlight)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize, { passive: true })
    document.addEventListener('scroll', onScroll, { passive: true })

    // Trigger initial updates
    updateFlight()
    const t1 = setTimeout(updateFlight, 20)
    const t2 = setTimeout(updateFlight, 100)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('scroll', onScroll)
      if (animFrame) cancelAnimationFrame(animFrame)
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [containerRef, updateDimensions, w, h])

  return (
    <div
      ref={layerRef}
      className="pointer-events-none fixed inset-0 z-0 select-none overflow-hidden transition-opacity duration-150"
      aria-hidden="true"
    >
      <svg
        width={w}
        height={h}
        viewBox={`0 0 ${w} ${h}`}
        fill="none"
        className="h-full w-full text-brand-600"
      >
        {/* ─── 1. SIMPLIFIED STYLIZED INDIA MAP OUTLINE ────────────── */}
        <g
          transform={
            isMobile
              ? `translate(${destX - 85}, ${destY - 110}) scale(0.38)`
              : `translate(${destX - 110}, ${destY - 130}) scale(0.55)`
          }
          className="text-brand-700 transition-transform duration-200"
        >
          <path
            d="M 180,30 
               C 210,35 240,65 245,95 
               C 255,130 280,140 310,150 
               C 345,160 380,165 375,195 
               C 370,225 340,230 325,255 
               C 305,290 315,335 295,380 
               C 275,420 245,470 215,510 
               C 200,530 190,545 180,550 
               C 170,545 160,530 145,510 
               C 115,470 85,420 65,380 
               C 45,335 55,290 35,255 
               C 20,230 -10,225 -15,195 
               C -20,165 15,160 50,150 
               C 80,140 105,130 115,95 
               C 120,65 150,35 180,30 Z"
            fill="currentColor"
            fillOpacity="0.04"
            stroke="currentColor"
            strokeWidth="2"
            strokeOpacity="0.25"
            strokeDasharray="4 4"
          />

          <text
            x="180"
            y="300"
            textAnchor="middle"
            fill="currentColor"
            fillOpacity="0.35"
            className="text-[16px] font-extrabold uppercase tracking-widest font-sans"
          >
            India
          </text>
        </g>

        {/* ─── 2. FLIGHT TRAIL (SVG BEZIER PATH) ───────────────────── */}
        <path
          ref={pathRef}
          d={dynamicPathD}
          stroke="currentColor"
          strokeWidth="2.5"
          strokeDasharray="6 8"
          strokeOpacity="0.25"
          strokeLinecap="round"
          fill="none"
        />

        {/* Origin Runway Marker (Left) */}
        <circle cx={startX} cy={startY} r="4" fill="currentColor" fillOpacity="0.5" />
        <circle
          cx={startX}
          cy={startY}
          r="8"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeOpacity="0.25"
          fill="none"
        />

        {/* ─── 3. DESTINATION LANDING PIN (Delhi NCR) ──────────────── */}
        <g ref={markerGroupRef} transform={`translate(${destX}, ${destY})`}>
          {/* Animated concentric pulse circle */}
          <circle
            cx="0"
            cy="0"
            r={isMobile ? 14 : 18}
            stroke="currentColor"
            strokeWidth="1.5"
            strokeOpacity="0.7"
            fill="none"
          />
          <circle
            cx="0"
            cy="0"
            r={isMobile ? 7 : 9}
            stroke="currentColor"
            strokeWidth="1.5"
            fill="currentColor"
            fillOpacity="0.15"
          />
          <circle cx="0" cy="0" r={isMobile ? 3.5 : 4.5} fill="currentColor" />

          {/* Destination Tag */}
          <g
            ref={destTagRef}
            transform={isMobile ? 'translate(-85, -12)' : 'translate(12, -10)'}
          >
            <rect
              x="0"
              y="-10"
              width={isMobile ? 80 : 96}
              height="20"
              rx="10"
              fill="currentColor"
              fillOpacity="0.1"
              stroke="currentColor"
              strokeWidth="1"
              strokeOpacity="0.3"
            />
            <text
              x={isMobile ? 40 : 48}
              y="3"
              textAnchor="middle"
              fill="currentColor"
              fillOpacity="0.9"
              className="text-[9px] font-black uppercase tracking-wider font-sans"
            >
              Delhi • Hub
            </text>
          </g>
        </g>

        {/* ─── 4. DIRECT GPU-ACCELERATED PLANE GROUP ───────────────── */}
        <g
          ref={planeGroupRef}
          transform={`translate(${startX}, ${startY}) rotate(15)`}
          className="will-change-transform"
        >
          {/* Crisp Aerodynamic Jet Silhouette */}
          <g transform={isMobile ? 'scale(1.2)' : 'scale(1.45)'}>
            <path
              d="M 18,0 
                 L 4,-4 
                 L 2,-16 
                 L -3,-16 
                 L 0,-3 
                 L -10,-3 
                 L -14,-9 
                 L -17,-9 
                 L -15,0 
                 L -17,9 
                 L -14,9 
                 L -10,3 
                 L 0,3 
                 L -3,16 
                 L 2,16 
                 L 4,4 
                 Z"
              fill="currentColor"
              className="text-brand-600 drop-shadow-sm"
              fillOpacity="0.95"
            />
            {/* Trailing jet contrail */}
            <line
              x1="-18"
              y1="0"
              x2="-34"
              y2="0"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeDasharray="2 3"
              strokeOpacity="0.6"
              strokeLinecap="round"
            />
          </g>
        </g>
      </svg>
    </div>
  )
}
