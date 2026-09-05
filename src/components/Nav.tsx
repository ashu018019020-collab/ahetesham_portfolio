'use client'

import { useState, useEffect } from 'react'
import { useScrollSpy } from '@/lib/hooks'
import { Menu, X, Download } from 'lucide-react'
import { CONTACT } from '@/lib/constants'
import AKLogo from './AKLogo'

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
]

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
        scrolled ? 'glass-strong shadow-lg shadow-black/20' : 'bg-transparent'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* AK Logo + Name */}
        <a href="#" className="font-display transition-colors" onClick={close}>
          <AKLogo size="md" showText />
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                activeId === link.href.replace('#', '')
                  ? 'bg-primary/15 text-primary-light'
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
            className="ml-2 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-all hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5"
            style={{ boxShadow: '0 0 15px rgba(255,69,0,0.3)' }}
          >
            <Download size={14} />
            Download CV
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="relative z-50 rounded-lg p-2 text-heading hover:bg-white/5 md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile slide-in */}
      <div className={`fixed inset-0 z-40 transition-all duration-300 md:hidden ${
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
                    ? 'bg-primary/15 text-primary-light'
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
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-base font-medium text-white transition-all hover:shadow-lg hover:shadow-primary/30"
            >
              <Download size={16} />
              Download CV
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
