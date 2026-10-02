'use client'

import { useState, useEffect } from 'react'
import { useScrollSpy } from '@/lib/hooks'
import { Menu, X, Download } from 'lucide-react'
import { CONTACT } from '@/lib/constants'
import { NAV_LINKS } from '@/lib/data/profile'
import AKLogo from './AKLogo'

const sectionIds = NAV_LINKS.map((l) => l.href.replace('#', ''))

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const activeId = useScrollSpy(sectionIds, 120)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('nav-open', mobileOpen)
    return () => document.body.classList.remove('nav-open')
  }, [mobileOpen])

  const close = () => setMobileOpen(false)

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-strong nav-scan shadow-lg shadow-black/20' : 'bg-transparent'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="shell flex items-center justify-between py-4">
        {/* AK Logo + Name */}
        <a
          href="#"
          aria-label="Ahetesham Khan — back to top"
          className="group/logo font-display transition-colors"
          onClick={close}
        >
          <AKLogo size="md" showText />
        </a>

        {/* Desktop links — from lg up; tablets get the drawer instead of a
            crammed row, which left no room for the brand lockup. */}
        <div className="hidden items-center gap-0.5 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`rounded-lg px-2.5 py-2 text-sm font-medium transition-colors xl:px-3 ${
                activeId === link.href.replace('#', '')
                  ? 'bg-primary/15 text-primary-light nav-active-pill'
                  : 'text-body-light hover:text-heading hover:bg-white/5'
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href={CONTACT.resumePath}
            target="_blank"
            rel="noopener noreferrer"
            className="cv-btn ml-2 inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-bold tracking-wide text-[#111] transition-transform duration-300 hover:-translate-y-0.5 hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8C00]/80 xl:px-5"
          >
            <Download size={15} className="transition-transform duration-300 group-hover:translate-y-0.5" />
            <span>Download CV</span>
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="relative z-50 rounded-lg p-2 text-heading hover:bg-white/5 lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile slide-in */}
      <div className={`fixed inset-0 z-40 transition-all duration-300 lg:hidden ${
        mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={close} />
        <div className={`absolute right-0 top-0 h-full w-72 glass-strong p-8 pt-20 transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={close}
                className={`rounded-lg px-4 py-3 text-base font-medium transition-colors ${
                  activeId === link.href.replace('#', '')
                    ? 'bg-primary/15 text-primary-light nav-active-pill'
                    : 'text-body-light hover:text-heading hover:bg-white/5'
                }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href={CONTACT.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              onClick={close}
              className="cv-btn mt-4 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl px-4 py-3 text-base font-bold tracking-wide text-[#111]"
            >
              <Download size={16} />
              <span>Download CV</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
