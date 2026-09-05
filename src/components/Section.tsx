'use client'

import { useScrollReveal } from '@/lib/hooks'
import { ReactNode } from 'react'

type RevealVariant = 'default' | '3d-up' | '3d-left' | '3d-right' | '3d-title'

export default function Section({
  id,
  title,
  subtitle,
  children,
  className = '',
  delay = 0,
  revealVariant = 'default',
}: {
  id: string
  title: string
  subtitle?: string
  children: ReactNode
  className?: string
  delay?: number
  revealVariant?: RevealVariant
}) {
  const ref = useScrollReveal(delay)

  const revealClass =
    revealVariant === '3d-up'
      ? 'reveal-3d-up'
      : revealVariant === '3d-left'
        ? 'reveal-3d-left'
        : revealVariant === '3d-right'
          ? 'reveal-3d-right'
          : revealVariant === '3d-title'
            ? 'reveal-3d-title'
            : 'reveal'

  return (
    <section id={id} className={`px-6 py-16 md:py-24 ${className}`}>
      <div className="mx-auto max-w-6xl">
        <div ref={ref} className={revealClass}>
          <h2
            className="section-title section-title-glow"
            data-text={title}
          >
            {title}
          </h2>
          {subtitle && (
            <p className="mt-5 max-w-2xl text-base sm:text-lg text-[#94a3b8] leading-relaxed">
              {subtitle}
            </p>
          )}
          <div className="mt-10">{children}</div>
        </div>
      </div>
    </section>
  )
}
