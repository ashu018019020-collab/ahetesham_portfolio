'use client'

import { useEffect, useState } from 'react'
import CyborgReveal from './CyborgReveal'
import { Mail, ExternalLink } from 'lucide-react'
import { LinkedinIcon, GithubIcon } from './Icons'
import { CONTACT } from '@/lib/constants'

const badges = ['AI ENGINEER', 'GENERATIVE AI', 'DATA SCIENTIST'];

const stats = [
  { label: 'Entry-Level', sub: 'AI Engineer' },
  { label: '5+', sub: 'Projects' },
  { label: 'AI / ML', sub: 'Specialization' },
  { label: 'Fast Learner', sub: 'Always Growing' },
];

export default function Hero() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <section id="hero" className="relative min-h-dvh-safe w-full overflow-hidden flex flex-col items-center justify-center py-12 sm:py-16 md:py-20">
      {/* Background fire glows */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-[#008080]/5 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[#FF4500]/5 blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-[#FF6B00]/3 blur-[140px]" />
      </div>

      {/* Floating ember particles */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: (5 + i * 5) + "%",
              bottom: "-5%",
              animationDuration: (8 + (i % 7) * 2) + "s",
              animationDelay: (i * 0.5) + "s",
              width: (1 + (i % 3)) + "px",
              height: (1 + (i % 3)) + "px",
              opacity: 0.3,
            }}
          />
        ))}
      </div>

      {/* Content - stacked: card on top, info below */}
      <div className="relative z-10 shell flex flex-col items-center gap-6 sm:gap-8">

        {/* TOP - CyborgReveal Card */}
        <div className={`w-full flex justify-center transition-all duration-1000 ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`} style={{ transitionDelay: '0.2s' }}>
          <CyborgReveal />
        </div>

        {/* BOTTOM - Info centered below the card */}
        <div className="flex flex-col items-center text-center gap-5 sm:gap-6 w-full max-w-4xl">
          {/* Badges */}
          <div className={`flex flex-wrap gap-2 sm:gap-2.5 justify-center transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '0.5s' }}>
            {badges.map((b, i) => (
              <span
                key={b}
                className="inline-flex items-center gap-2 rounded-full border border-[#FF4500]/25 bg-gradient-to-b from-[#FF4500]/12 to-[#FF4500]/[0.02] px-3.5 py-1.5 font-mono text-[10px] font-medium tracking-[0.14em] text-[#FF9A4D] uppercase backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#FF8C00]/60 hover:text-[#FFB37A] hover:shadow-[0_0_22px_rgba(255,69,0,0.28)]"
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-[#FF8C00] opacity-70 animate-ping" style={{ animationDuration: '2.4s', animationDelay: `${i * 0.4}s` }} />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#FF6B00] shadow-[0_0_6px_rgba(255,107,0,0.9)]" />
                </span>
                {b}
              </span>
            ))}
          </div>

          {/* Kicker */}
          <div className={`flex items-center gap-3 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '0.6s' }}>
            <span aria-hidden className="h-px w-8 sm:w-14 bg-gradient-to-r from-transparent to-[#FF4500]/70" />
            <p className="font-mono text-xs sm:text-sm tracking-[0.28em] text-[#FF8C00] uppercase">Hi, I&apos;m</p>
            <span aria-hidden className="h-px w-8 sm:w-14 bg-gradient-to-l from-transparent to-[#FF4500]/70" />
          </div>

          <h1 style={{ fontFamily: 'Chakra Petch, system-ui, sans-serif', transitionDelay: '0.7s' }} className={`hero-title font-bold transition-all duration-800 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <span className="text-[#D9D9D9]">Ahetesham </span>
            <span className="bg-gradient-to-r from-[#FF4500] to-[#FF8C00] bg-clip-text text-transparent text-shimmer">Khan</span>
          </h1>

          <h2 className={`hero-subtitle font-display font-semibold max-w-3xl transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '0.8s' }}>
            <span className="text-[#D9D9D9]">Building Intelligent Solutions with </span>
            <span className="bg-gradient-to-r from-[#FF4500] to-[#FF8C00] bg-clip-text text-transparent">AI, ML &amp; Data Science</span>
          </h2>

          <p className={`hero-lede max-w-2xl text-[#94a3b8] transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '0.9s' }}>
            AI Engineer passionate about designing and deploying scalable AI solutions, LLM applications, and data-driven systems that solve real-world problems.
          </p>

          {/* CTAs — primary mirrors the Download CV glow, secondary is quiet glass */}
          <div className={`flex flex-col items-stretch sm:items-center gap-3 sm:flex-row sm:gap-4 w-full sm:w-auto transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '1.0s' }}>
            <a href="#projects" className="cv-btn cv-btn-hero group inline-flex items-center justify-center gap-2 rounded-xl px-8 py-3.5 sm:px-11 sm:py-4 text-sm sm:text-base font-semibold text-[#111] transition-transform hover:-translate-y-1 hover:scale-[1.04] active:scale-95">
              <ExternalLink size={17} className="transition-transform duration-300 group-hover:rotate-12" />
              View Projects
            </a>
            <a href="#contact" className="hero-cta-ghost group inline-flex items-center justify-center gap-2 rounded-xl border border-white/12 px-8 py-3.5 sm:px-11 sm:py-4 text-sm sm:text-base font-semibold text-[#D9D9D9] transition-all hover:-translate-y-1 hover:border-transparent hover:text-white hover:scale-[1.04] active:scale-95">
              <Mail size={17} className="opacity-70 transition-opacity group-hover:opacity-100" />
              Contact Me
            </a>
          </div>

          {/* Social - Bigger glowing icons */}
          <div className={`flex items-center gap-4 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '1.1s' }}>
            <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
              className="group relative flex items-center justify-center w-14 h-14 rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.06] to-white/[0.015] backdrop-blur-sm text-[#64748b] transition-all duration-400 hover:text-[#2AB3B3] hover:border-[#008080]/50 hover:scale-110 hover:-translate-y-1.5 hover:shadow-[0_0_30px_rgba(0,128,128,0.35)]">
              <span aria-hidden className="pointer-events-none absolute inset-x-2.5 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
              <LinkedinIcon size={24} className="relative" />
              <span aria-hidden className="absolute -inset-1 rounded-2xl bg-[#008080]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg" />
            </a>
            <a href={CONTACT.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"
              className="group relative flex items-center justify-center w-14 h-14 rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.06] to-white/[0.015] backdrop-blur-sm text-[#64748b] transition-all duration-400 hover:text-[#D9D9D9] hover:border-white/25 hover:scale-110 hover:-translate-y-1.5 hover:shadow-[0_0_30px_rgba(255,255,255,0.12)]">
              <span aria-hidden className="pointer-events-none absolute inset-x-2.5 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
              <GithubIcon size={24} className="relative" />
              <span aria-hidden className="absolute -inset-1 rounded-2xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg" />
            </a>
            <a href={`mailto:${CONTACT.email}`} aria-label="Email"
              className="group relative flex items-center justify-center w-14 h-14 rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.06] to-white/[0.015] backdrop-blur-sm text-[#64748b] transition-all duration-400 hover:text-[#FF8C00] hover:border-[#FF4500]/50 hover:scale-110 hover:-translate-y-1.5 hover:shadow-[0_0_30px_rgba(255,69,0,0.35)]">
              <span aria-hidden className="pointer-events-none absolute inset-x-2.5 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
              <Mail size={24} className="relative" />
              <span aria-hidden className="absolute -inset-1 rounded-2xl bg-[#FF4500]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg" />
            </a>
          </div>

          {/* Stats - unified glass console bar */}
          <div className={`w-full sm:w-auto max-w-full rounded-2xl border border-white/[0.07] bg-white/[0.025] backdrop-blur-sm p-1.5 sm:p-2 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '1.2s' }}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5 sm:gap-2">
              {stats.map((s, i) => (
                <div key={s.label} className="group relative flex items-center gap-2.5 sm:gap-3 rounded-xl px-3.5 py-3 sm:px-4 transition-all duration-300 hover:bg-[#FF4500]/[0.07] hover:shadow-[0_0_24px_rgba(255,69,0,0.14)] cursor-default"
                  style={{ animationDelay: `${i * 150}ms` }}>
                  <span aria-hidden className="relative flex shrink-0 items-center justify-center">
                    <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-br from-[#FF4500] to-[#FF8C00] shadow-md shadow-[#FF4500]/50 transition-all duration-300 group-hover:scale-125 group-hover:shadow-[#FF4500]/80" />
                    <span className="absolute h-2.5 w-2.5 rounded-full bg-[#FF4500]/30 animate-ping" style={{ animationDuration: '2s', animationDelay: `${i * 0.4}s` }} />
                  </span>
                  <span className="min-w-0 text-left">
                    <span className="block text-[13px] font-bold text-[#D9D9D9] tracking-wide whitespace-nowrap">{s.label}</span>
                    <span className="block text-[11px] text-[#94a3b8] whitespace-nowrap">{s.sub}</span>
                  </span>
                  {/* Bottom glow line on hover */}
                  <span aria-hidden className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF4500] to-transparent transition-all duration-500 group-hover:w-3/4" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
