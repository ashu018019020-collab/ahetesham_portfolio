'use client'

import { useScrollReveal } from '@/lib/hooks'
import { ReactNode } from 'react'

type RevealVariant = 'default' | '3d-up' | '3d-left' | '3d-right' | '3d-title'

const REVEAL_CLASSES: Record<RevealVariant, string> = {
  default: 'reveal',
  '3d-up': 'reveal-3d-up',
  '3d-left': 'reveal-3d-left',
  '3d-right': 'reveal-3d-right',
  '3d-title': 'reveal-3d-title',
}

/**
 * The one owner of section chrome: outer padding, centred container, glowing
 * title, optional subtitle, and the scroll-reveal wrapper around the children.
 */
export default function Section({
  id,
  title,
  subtitle,
  children,
  className = '',
  delay = 0,
  revealVariant = 'default',
  containerClassName = 'shell',
  titleClassName = 'section-title section-title-glow',
}: {
  id: string
  title: string
  subtitle?: string
  children: ReactNode
  className?: string
  delay?: number
  revealVariant?: RevealVariant
  containerClassName?: string
  titleClassName?: string
}) {
  const ref = useScrollReveal(delay)

  return (
    <section id={id} className={`py-16 md:py-24 ${className}`}>
      <div className={containerClassName}>
        <div ref={ref} className={REVEAL_CLASSES[revealVariant]}>
          <h2 className={titleClassName} data-text={title}>
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
