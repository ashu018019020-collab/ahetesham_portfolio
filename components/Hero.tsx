'use client'

import { useEffect, useState } from 'react'
import CyborgReveal from './CyborgReveal'
import { Mail, ExternalLink } from 'lucide-react'
import { LinkedinIcon, GithubIcon } from './Icons'
import { CONTACT } from '@/lib/constants'

const badges = ['AI ENGINEER', 'GENERATIVE AI', 'DATA SCIENTIST'];

const stats = [
  { label: 'Entry-Level', sub: 'AI Engineer' },
  { label: '3+', sub: 'Projects' },
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
    <section id="hero" className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center py-12 sm:py-16 md:py-20">
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
      <div className="relative z-10 mx-auto flex flex-col items-center gap-6 sm:gap-8 w-full max-w-7xl px-4 sm:px-6">

        {/* TOP - CyborgReveal Card */}
        <div className={`w-full flex justify-center transition-all duration-1000 ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`} style={{ transitionDelay: '0.2s' }}>
          <CyborgReveal />
        </div>

        {/* BOTTOM - Info centered below the card */}
        <div className="flex flex-col items-center text-center gap-5 w-full max-w-3xl">
          {/* Badges */}
          <div className={`flex flex-wrap gap-2 justify-center transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '0.5s' }}>
            {badges.map((b) => (
              <span
                key={b}
                className="rounded-full border border-[#FF4500]/20 bg-[#FF4500]/8 px-3 py-1 font-mono text-[10px] font-medium tracking-wider text-[#FF8C00] uppercase hover:bg-[#FF4500]/15 hover:border-[#FF4500]/40 hover:scale-105 transition-all duration-300"
              >
                {b}
              </span>
            ))}
          </div>

          <p className={`font-mono text-sm tracking-wide text-[#FF8C00] transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '0.6s' }}>
            Hi, I&apos;m
          </p>

          <h1 style={{ fontFamily: 'Chakra Petch, system-ui, sans-serif', transitionDelay: '0.7s' }} className={`text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl transition-all duration-800 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <span className="text-[#D9D9D9]">Ahetesham </span>
            <span className="bg-gradient-to-r from-[#FF4500] to-[#FF8C00] bg-clip-text text-transparent text-shimmer">Khan</span>
          </h1>

          <h2 className={`font-display text-lg font-semibold sm:text-xl md:text-2xl lg:text-3xl transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '0.8s' }}>
            <span className="text-[#D9D9D9]">Building Intelligent Solutions with </span>
            <span className="bg-gradient-to-r from-[#FF4500] to-[#FF8C00] bg-clip-text text-transparent">AI, ML & Data Science</span>
          </h2>

          <p className={`max-w-xl text-sm leading-relaxed sm:text-base md:text-lg text-[#94a3b8] transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '0.9s' }}>
            AI Engineer passionate about designing and deploying scalable AI solutions, LLM applications, and data-driven systems that solve real-world problems.
          </p>

          {/* CTAs */}
          <div className={`flex flex-col items-center gap-3 sm:flex-row sm:items-center transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '1.0s' }}>
            <a href="#projects" className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#FF4500] to-[#FF6B00] px-8 py-3.5 sm:px-10 sm:py-4 text-sm sm:text-base font-semibold text-white transition-all hover:shadow-lg hover:shadow-[#FF4500]/40 hover:-translate-y-1 hover:scale-105 active:scale-95">
              <ExternalLink size={16} className="transition-transform group-hover:rotate-12" />
              View Projects
            </a>
            <a href="#contact" className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-8 py-3.5 sm:px-10 sm:py-4 text-sm sm:text-base font-semibold text-[#D9D9D9] transition-all hover:bg-white/5 hover:-translate-y-1 hover:border-[#FF4500]/30 hover:scale-105 active:scale-95">
              Contact Me
            </a>
          </div>

          {/* Social - Bigger glowing icons */}
          <div className={`flex items-center gap-4 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '1.1s' }}>
            <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
              className="group relative flex items-center justify-center w-14 h-14 rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm text-[#64748b] transition-all duration-400 hover:text-[#008080] hover:border-[#008080]/40 hover:bg-[#008080]/10 hover:scale-110 hover:-translate-y-1.5 hover:shadow-[0_0_30px_rgba(0,128,128,0.3)]">
              <LinkedinIcon size={24} />
              <div className="absolute -inset-1 rounded-2xl bg-[#008080]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg" />
            </a>
            <a href={CONTACT.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"
              className="group relative flex items-center justify-center w-14 h-14 rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm text-[#64748b] transition-all duration-400 hover:text-[#D9D9D9] hover:border-white/20 hover:bg-white/5 hover:scale-110 hover:-translate-y-1.5 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]">
              <GithubIcon size={24} />
              <div className="absolute -inset-1 rounded-2xl bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg" />
            </a>
            <a href={`mailto:${CONTACT.email}`} aria-label="Email"
              className="group relative flex items-center justify-center w-14 h-14 rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm text-[#64748b] transition-all duration-400 hover:text-[#FF4500] hover:border-[#FF4500]/40 hover:bg-[#FF4500]/10 hover:scale-110 hover:-translate-y-1.5 hover:shadow-[0_0_30px_rgba(255,69,0,0.3)]">
              <Mail size={24} />
              <div className="absolute -inset-1 rounded-2xl bg-[#FF4500]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg" />
            </a>
          </div>

          {/* Stats - Bigger glowing bar */}
          <div className={`flex flex-wrap gap-4 justify-center transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '1.2s' }}>
            {stats.map((s, i) => (
              <div key={s.label} className="group relative flex items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm px-5 py-3.5 transition-all duration-400 hover:border-[#FF4500]/30 hover:bg-[#FF4500]/[0.04] hover:scale-105 hover:-translate-y-1 hover:shadow-[0_0_24px_rgba(255,69,0,0.12)] cursor-default"
                style={{ animationDelay: `${i * 150}ms` }}>
                <div className="relative flex items-center justify-center">
                  <div className="h-3 w-3 rounded-full bg-gradient-to-br from-[#FF4500] to-[#FF8C00] shadow-md shadow-[#FF4500]/50 group-hover:shadow-[#FF4500]/80 transition-all duration-300 group-hover:scale-125" />
                  <div className="absolute h-3 w-3 rounded-full bg-[#FF4500]/30 animate-ping" style={{ animationDuration: '2s' }} />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#D9D9D9] tracking-wide">{s.label}</p>
                  <p className="text-xs text-[#94a3b8]">{s.sub}</p>
                </div>
                {/* Bottom glow line on hover */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF4500] to-transparent group-hover:w-3/4 transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
