'use client'

import { Mail, Heart, ArrowUp } from 'lucide-react'
import { LinkedinIcon, GithubIcon } from './Icons'
import { CONTACT } from '@/lib/constants'
import AKLogo from './AKLogo'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Career Focus', href: '#career-focus' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
]

const socials = [
  {
    label: 'LinkedIn',
    href: CONTACT.linkedin,
    icon: <LinkedinIcon size={18} />,
    glow: 'hover:text-[#0A66C2] hover:border-[#0A66C2]/40 hover:shadow-[0_0_20px_rgba(10,102,194,0.35)] hover:bg-[#0A66C2]/10',
  },
  {
    label: 'GitHub',
    href: CONTACT.github,
    icon: <GithubIcon size={18} />,
    glow: 'hover:text-[#e6edf3] hover:border-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:bg-white/10',
  },
  {
    label: 'Email',
    href: `mailto:${CONTACT.email}`,
    icon: <Mail size={18} />,
    glow: 'hover:text-[#FF8C00] hover:border-[#FF8C00]/40 hover:shadow-[0_0_20px_rgba(255,140,0,0.35)] hover:bg-[#FF8C00]/10',
  },
]

export default function Footer() {
  const year = new Date().getFullYear()

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="relative z-10 overflow-hidden border-t border-white/5 px-6 pb-10 pt-16">
      {/* Glow divider */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#FF4500]/60 to-transparent" />
      <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-[80%] -translate-x-1/2 rounded-full bg-[#FF4500]/[0.05] blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <div className="flex flex-col items-center gap-10 md:flex-row md:justify-between">
          <div className="text-center md:text-left">
            <a href="#" onClick={(e) => { e.preventDefault(); scrollTop() }} className="font-display" aria-label="Ahetesham Khan — back to top">
              <AKLogo size="sm" showText />
            </a>
            <p className="mt-3 max-w-[240px] text-xs leading-relaxed text-body-light">
              AI Engineer &amp; Data Scientist building intelligent systems end to end.
            </p>
          </div>

          <nav className="flex flex-wrap justify-center gap-x-7 gap-y-3" aria-label="Footer navigation">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative text-sm text-body-light transition-colors hover:text-heading"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-gradient-to-r from-[#FF4500] to-[#FF8C00] shadow-[0_0_8px_rgba(255,69,0,0.6)] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className={`flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-body-light backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:scale-110 ${s.glow}`}
              >
                {s.icon}
              </a>
            ))}
            <button
              type="button"
              onClick={scrollTop}
              aria-label="Scroll back to top"
              className="ml-1 flex h-10 w-10 items-center justify-center rounded-full border border-[#FF4500]/20 bg-gradient-to-br from-[#FF4500]/15 to-[#FF8C00]/10 text-[#FF8C00] transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:shadow-[0_0_20px_rgba(255,69,0,0.4)]"
            >
              <ArrowUp size={18} />
            </button>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-3 border-t border-white/5 pt-6 text-center text-xs text-body-light sm:flex-row sm:justify-between sm:text-left">
          <p>&copy; {year} Ahetesham Khan. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="hidden h-px w-16 bg-gradient-to-r from-transparent to-[#FF4500]/40 sm:block" />
            <p className="flex items-center gap-1">
              Built with <Heart size={12} className="animate-pulse text-[#FF4500]" /> &amp; lots of coffee
            </p>
            <span className="hidden h-px w-16 bg-gradient-to-l from-transparent to-[#FF4500]/40 sm:block" />
          </div>
        </div>
      </div>
    </footer>
  )
}