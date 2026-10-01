'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Adds the `visible` class to an element when it scrolls into view.
 * `stagger` delays the class by N ms so grids can cascade.
 */
export function useScrollReveal(stagger = 0) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (prefersReduced) {
      el.classList.add('visible')
      return
    }

    // Reveal a little before the element reaches the viewport, and never wait
    // for a fraction of the element to be visible: a 3000px-tall section would
    // otherwise stay blank for hundreds of pixels of scrolling.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.classList.add('visible')
          }, stagger)
          observer.unobserve(el)
        }
      },
      { threshold: 0, rootMargin: '240px 0px 240px 0px' }
    )

    // Check if already in viewport on mount
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight + 240 && rect.bottom > -240) {
      setTimeout(() => {
        el.classList.add('visible')
      }, stagger)
      observer.disconnect()
    } else {
      observer.observe(el)
    }

    return () => observer.disconnect()
  }, [stagger])

  return ref
}

/** Returns the id of the last section whose top has passed the scroll offset. */
export function useScrollSpy(ids: string[], offset = 100) {
  const [active, setActive] = useState(ids[0] || '')

  useEffect(() => {
    if (ids.length === 0) return

    const handleScroll = () => {
      const scrollY = window.scrollY + offset
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i])
        if (el && el.offsetTop <= scrollY) {
          setActive(ids[i])
          return
        }
      }
      setActive(ids[0])
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [ids, offset])

  return active
}

export interface TiltOptions {
  /** Max rotation in degrees. 0 disables rotation (hover-only). */
  max?: number
  /** Scale applied while hovered. */
  scale?: number
  /** translateY (px) applied while hovered. */
  lift?: number
  /** Prepend `perspective(Npx)` to the transform. */
  perspective?: number
  /** Snap back to flat when the pointer leaves. Default true. */
  resetOnLeave?: boolean
}

/**
 * Pointer interaction for a card: hover flag plus the 3D transform that follows
 * the cursor. Colour/glow styling stays with the card; only the geometry lives here.
 *
 *   const { ref, hovered, transform, handlers } = useTilt({ max: 8, scale: 1.02 })
 *   <div ref={ref} {...handlers} style={{ transform }} />
 */
export function useTilt({
  max = 8,
  scale = 1,
  lift = 0,
  perspective,
  resetOnLeave = true,
}: TiltOptions = {}) {
  const ref = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const onMouseEnter = useCallback(() => setHovered(true), [])
  const onMouseLeave = useCallback(() => {
    setHovered(false)
    if (resetOnLeave) setTilt({ x: 0, y: 0 })
  }, [resetOnLeave])
  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current
      if (!el || max === 0) return
      const rect = el.getBoundingClientRect()
      setTilt({
        x: ((e.clientY - rect.top) / rect.height - 0.5) * -max,
        y: ((e.clientX - rect.left) / rect.width - 0.5) * max,
      })
    },
    [max]
  )

  const transform = [
    perspective && `perspective(${perspective}px)`,
    lift && `translateY(${hovered ? -lift : 0}px)`,
    `rotateX(${tilt.x}deg)`,
    `rotateY(${tilt.y}deg)`,
    `scale(${hovered ? scale : 1})`,
  ]
    .filter(Boolean)
    .join(' ')

  return {
    ref,
    hovered,
    transform,
    handlers: { onMouseEnter, onMouseLeave, onMouseMove },
  }
}

/** Locks body scrolling while `active`, restoring the previous value on cleanup. */
export function useBodyScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [active])
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'

/**
 * Modal focus management for a conditionally rendered dialog.
 * While `active`: focus moves into the dialog (the container itself when it has
 * a tabindex, otherwise its first focusable element), Tab/Shift+Tab are trapped
 * inside, and focus returns to the element that opened it on close.
 *
 *   const ref = useModalFocus(open)
 *   {open && <div ref={ref} role='dialog' aria-modal='true'>…</div>}
 */
export function useModalFocus(active: boolean) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!active) return
    const container = ref.current

    // Capture the opener before focus moves into the dialog.
    const opener =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null

    const focusables = container
      ? Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
      : []
    const initial =
      container && container.getAttribute('tabindex') !== null
        ? container
        : focusables[0]
    initial?.focus()

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !container) return
      const items = Array.from(
        container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      )
      if (items.length === 0) return
      const first = items[0]
      const last = items[items.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      } else if (
        document.activeElement instanceof HTMLElement &&
        !container.contains(document.activeElement)
      ) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      opener?.focus()
    }
  }, [active])

  return ref
}

/** Cycles an index 0..length-1 on an interval — for auto-advancing pipelines. */
export function useStepCycle(length: number, intervalMs: number) {
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (length <= 0) return
    const id = setInterval(() => setStep((s) => (s + 1) % length), intervalMs)
    return () => clearInterval(id)
  }, [length, intervalMs])

  return length > 0 ? step % length : 0
}
