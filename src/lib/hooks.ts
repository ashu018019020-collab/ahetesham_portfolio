'use client'

import { useEffect, useRef, useState } from 'react'

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

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.classList.add('visible')
          }, stagger)
          observer.unobserve(el)
        }
      },
      { threshold: 0.05, rootMargin: '50px 0px -20px 0px' }
    )

    // Check if already in viewport on mount
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight + 50 && rect.bottom > -20) {
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
