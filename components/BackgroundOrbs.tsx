'use client'

import { useEffect, useState } from 'react'

/* ── Animated Gradient Orbs — pure CSS drift (no JS re-renders, no canvas).
   Styles and drift keyframes live in app/globals.css ("BACKGROUND ORBS"). ── */
function GradientOrbs() {
  return (
    <div className="absolute inset-0">
      {/* Orb 1 — teal */}
      <div className="orb orb-1" />
      {/* Orb 2 — fire orange */}
      <div className="orb orb-2" />
      {/* Orb 3 — deep red/maroon */}
      <div className="orb orb-3" />
      {/* Orb 4 — purple bottom */}
      <div className="orb orb-4" />
      {/* Orb 5 — subtle orange center */}
      <div className="orb orb-5" />
    </div>
  )
}

/* ── Main Component ── */
export default function BackgroundOrbs() {
  const [prefersReduced, setPrefersReduced] = useState(false)

  useEffect(() => {
    setPrefersReduced(
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
  }, [])

  if (prefersReduced) return null

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <GradientOrbs />
    </div>
  )
}
