'use client'

import { useEffect, useState } from 'react'

/* ── Animated Gradient Orbs — pure CSS drift (no JS re-renders, no canvas) ── */
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

      <style jsx>{`
        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          will-change: transform;
        }

        .orb-1 {
          width: 620px;
          height: 620px;
          top: 10%;
          left: -15%;
          background: radial-gradient(
            circle,
            rgba(0, 150, 150, 0.2) 0%,
            rgba(0, 128, 128, 0.04) 50%,
            transparent 70%
          );
          animation: drift1 34s ease-in-out infinite;
        }

        .orb-2 {
          width: 540px;
          height: 540px;
          top: 5%;
          right: -8%;
          background: radial-gradient(
            circle,
            rgba(255, 69, 0, 0.15) 0%,
            rgba(255, 107, 0, 0.03) 50%,
            transparent 70%
          );
          animation: drift2 32s ease-in-out infinite;
        }

        .orb-3 {
          width: 460px;
          height: 460px;
          top: 0%;
          right: 15%;
          background: radial-gradient(
            circle,
            rgba(139, 0, 30, 0.12) 0%,
            rgba(100, 0, 20, 0.02) 50%,
            transparent 70%
          );
          animation: drift3 30s ease-in-out infinite;
        }

        .orb-4 {
          width: 460px;
          height: 460px;
          bottom: -10%;
          left: 35%;
          background: radial-gradient(
            circle,
            rgba(100, 60, 220, 0.08) 0%,
            rgba(80, 40, 180, 0.01) 50%,
            transparent 70%
          );
          animation: drift4 38s ease-in-out infinite;
        }

        .orb-5 {
          width: 380px;
          height: 380px;
          top: 40%;
          left: 45%;
          background: radial-gradient(
            circle,
            rgba(255, 140, 0, 0.06) 0%,
            rgba(255, 100, 0, 0.01) 50%,
            transparent 70%
          );
          animation: drift5 28s ease-in-out infinite;
        }

        @keyframes drift1 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(34px, 26px) scale(1.04);
          }
          50% {
            transform: translate(16px, 48px) scale(0.97);
          }
          75% {
            transform: translate(-24px, 16px) scale(1.02);
          }
        }

        @keyframes drift2 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(-26px, 34px) scale(1.05);
          }
          50% {
            transform: translate(-40px, 8px) scale(0.96);
          }
          75% {
            transform: translate(-12px, -20px) scale(1.02);
          }
        }

        @keyframes drift3 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(-16px, 24px) scale(1.06);
          }
          66% {
            transform: translate(12px, -12px) scale(0.95);
          }
        }

        @keyframes drift4 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(20px, -28px) scale(1.04);
          }
        }

        @keyframes drift5 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(-24px, 16px) scale(1.06);
          }
        }
      `}</style>
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
