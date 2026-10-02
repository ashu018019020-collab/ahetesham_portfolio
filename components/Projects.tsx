'use client'

import Section from './Section'
import { Fragment, useEffect, useState } from 'react'
import { GithubIcon } from './Icons'
import { type LucideIcon, X, ExternalLink, Crown } from 'lucide-react'
import { CONTACT, liveHost } from '@/lib/constants'
import {
  useBodyScrollLock,
  useModalFocus,
  useStepCycle,
  useTilt,
} from '@/lib/hooks'
import { Icon as IconifyIcon } from '@iconify/react'
import { isBrandIcon } from '@/lib/data/skills'
import {
  PROJECTS,
  type Project,
  type ProjectWorkflowStep,
} from '@/lib/data/projects'

/** True while the user prefers reduced motion — freezes auto-cycling pipelines. */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return reduced
}

/** '#RRGGBB' → 'rgba(r,g,b,a)' so a project accent can drive translucent glows. */
function rgba(hex: string, alpha: number) {
  const h = hex.replace('#', '')
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h
  const n = parseInt(full, 16)
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`
}

/**
 * Card/modal title. Projects with a logo image (the flagship) get their
 * camel-case title split so the tail word wears the logo's neon gradient with
 * an amber light sweeping over it, exactly like the BroCode wordmark.
 */
function ProjectTitle({ project, className }: { project: Project; className?: string }) {
  const parts = project.image ? project.title.split(/(?=[A-Z])/) : []
  if (parts.length < 2) return <h3 className={className}>{project.title}</h3>
  return (
    <h3 className={className}>
      {parts[0]}
      <span className="wordmark-accent">{parts.slice(1).join('')}</span>
    </h3>
  )
}

function WorkflowPipeline({ steps, isHovered, activeStep, accent = '#FF4500' }: { steps: ProjectWorkflowStep[], isHovered: boolean, activeStep: number, accent?: string }) {
  const progress = Math.round(((activeStep + 1) / steps.length) * 100)

  return (
    <div className="mt-5 pt-5 border-t border-white/5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: accent }} />
          <span className="text-[10px] font-mono uppercase tracking-widest" style={{ color: rgba(accent, 0.75) }}>Live Pipeline</span>
        </div>
        <span className="text-[9px] font-mono text-white/30">
          STEP {String(activeStep + 1).padStart(2, '0')}/{String(steps.length).padStart(2, '0')}
        </span>
      </div>

      {/* Grid — every step always fully visible, no scroll */}
      <div className={`grid gap-1.5 ${steps.length > 5 ? 'grid-cols-3 sm:grid-cols-6' : 'grid-cols-5'}`}>
        {steps.map((s, i) => {
          const isActive = i === activeStep
          const isPassed = i < activeStep
          return (
            <div key={i} className="relative">
              <div
                className={`relative flex h-full min-h-[74px] flex-col items-center justify-center rounded-xl border px-1 py-2 text-center transition-all duration-500 ${
                  isActive ? 'scale-[1.06] -translate-y-0.5' : ''
                }`}
                style={{
                  background: isActive ? rgba(accent, 0.16) : isPassed ? rgba(accent, 0.06) : 'rgba(255,255,255,.03)',
                  borderColor: isActive ? rgba(accent, 0.6) : isPassed ? rgba(accent, 0.2) : 'rgba(255,255,255,.07)',
                  boxShadow: isActive ? `0 0 25px ${rgba(accent, 0.28)}, inset 0 0 12px ${rgba(accent, 0.1)}` : 'none',
                }}
              >
                {isActive && <div className="absolute inset-0 rounded-xl border animate-ping" style={{ borderColor: rgba(accent, 0.3), animationDuration: '2s' }} />}
                <span className="text-sm leading-none mb-1">{s.icon}</span>
                <span
                  className="text-[9px] font-bold leading-tight whitespace-nowrap sm:text-[10px]"
                  style={{ color: isActive ? accent : isPassed ? rgba(accent, 0.75) : '#64748b' }}
                >
                  {s.step}
                </span>
                <span className="mt-0.5 text-[7px] leading-tight text-white/30 whitespace-nowrap sm:text-[8px]">{s.desc}</span>
                {isActive && (
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-[2px] rounded-full"
                    style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)`, boxShadow: `0 0 8px ${accent}` }} />
                )}
              </div>
              {/* Arrow overlay — no layout width, always fits */}
              {i < steps.length - 1 && (
                <div className="pointer-events-none absolute top-1/2 -right-[7px] z-10 -translate-y-1/2">
                  <span className="text-[9px]" style={{ color: isPassed || isActive ? accent : '#334155' }}>▶</span>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Progress bar */}
      <div className="mt-3 flex items-center gap-2">
        <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${progress}%`, background: `linear-gradient(90deg, ${rgba(accent, 0.85)}, ${accent})`, boxShadow: `0 0 10px ${rgba(accent, 0.5)}` }}
          />
        </div>
        <span className="text-[9px] font-mono" style={{ color: rgba(accent, 0.75) }}>{progress}%</span>
      </div>
    </div>
  )
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen?: () => void }) {
  const { ref: cardRef, hovered: isHovered, transform, handlers } = useTilt({ max: 8, perspective: 1200 })
  // Running pipeline animation — auto-advances even without hover so it's always alive
  const reduced = usePrefersReducedMotion()
  const cycleStep = useStepCycle(project.workflow.length, isHovered ? 800 : 1400)
  const activeStep = reduced ? 0 : cycleStep
  // Architecture chain runs on its own slower loop so the card always has movement.
  const flowLength = project.flow?.length ?? 0
  const flowCycle = useStepCycle(flowLength, isHovered ? 900 : 1600)
  const activeFlow = reduced ? 0 : flowCycle
  // Brand mark (Iconify data) or lucide glyph — the header tile must never be empty.
  const brandIcon = isBrandIcon(project.icon) ? project.icon : undefined
  const GlyphIcon = isBrandIcon(project.icon) ? undefined : (project.icon as LucideIcon)
  const accent = project.accent ?? (project.statusTone === 'founder' ? '#D946EF' : '#FF4500')

  return (
    <div className={`group flex ${project.spanFull ? 'lg:col-span-2' : ''}`}>
      <div
        ref={cardRef}
        {...handlers}
        onClick={onOpen}
        onKeyDown={(e) => { if (onOpen && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); onOpen() } }}
        role={onOpen ? 'button' : undefined}
        tabIndex={onOpen ? 0 : undefined}
        aria-label={onOpen ? `Open ${project.title} case study` : undefined}
        className={`relative flex-1 overflow-hidden rounded-2xl border transition-all duration-500 ${
          onOpen ? 'cursor-pointer' : ''
        }`}
        style={{
          background: isHovered
            ? `linear-gradient(135deg, ${rgba(accent, 0.09)}, rgba(0,0,0,0.4))`
            : 'linear-gradient(135deg, rgba(255,255,255,0.03), rgba(0,0,0,0.3))',
          borderColor: isHovered ? rgba(accent, 0.42) : 'rgba(255,255,255,0.06)',
          boxShadow: isHovered ? `0 0 40px ${rgba(accent, 0.18)}` : 'none',
          transform: `${transform}${isHovered ? ' scale(1.01)' : ''}`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Ambient glow */}
        <div className={`absolute -inset-1 bg-gradient-to-br ${project.gradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl`} />

        <div className="relative p-6 lg:p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-4">
              {project.image ? (
                /* Flagship logo tile — neon border that carries the emblem's own glow */
                <div className={`relative w-16 h-16 shrink-0 transition-all duration-300 ${isHovered ? 'scale-115 rotate-3' : ''}`}>
                  <div
                    className="absolute -inset-1 rounded-2xl opacity-70 blur-md transition-opacity duration-500"
                    style={{
                      background: 'linear-gradient(135deg, #22d3ee, #818cf8 50%, #e879f9)',
                      opacity: isHovered ? 0.9 : 0.5,
                    }}
                    aria-hidden
                  />
                  <div
                    className="relative w-16 h-16 rounded-xl overflow-hidden border-2"
                    style={{
                      borderColor: isHovered ? accent : 'rgba(255,255,255,0.18)',
                      boxShadow: isHovered
                        ? `0 0 22px ${accent}80, inset 0 0 10px rgba(0,0,0,0.4)`
                        : `0 0 12px ${accent}45, inset 0 0 10px rgba(0,0,0,0.4)`,
                      background: '#000',
                      transition: 'all .35s ease',
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={project.image} alt={`${project.title} logo`} className="w-full h-full object-cover" />
                  </div>
                </div>
              ) : (
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${project.tagColor} flex items-center justify-center shadow-lg transition-all duration-300 ${isHovered ? 'scale-115 rotate-3 shadow-[0_0_20px_rgba(255,69,0,0.3)]' : ''}`}>
                {brandIcon ? (
                  <IconifyIcon icon={brandIcon} width={30} height={30} aria-hidden />
                ) : GlyphIcon ? (
                  <GlyphIcon size={30} strokeWidth={1.8} aria-hidden className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.35)]" />
                ) : null}
              </div>
              )}
              <div>
                <div className={`text-[10px] font-mono uppercase tracking-widest bg-gradient-to-r ${project.tagColor} bg-clip-text text-transparent font-bold`}>
                  [{project.tag}]
                </div>
                <ProjectTitle
                  project={project}
                  className={`mt-0.5 font-bold text-white ${
                    project.image ? 'text-2xl tracking-tight sm:text-[27px]' : 'text-xl'
                  }`}
                />
                <div className="flex items-center gap-2 mt-1 text-[10px] text-white/35 font-mono">
                  <span style={{ color: accent }}>●</span>
                  {project.role}
                </div>
              </div>
            </div>
            <span className="text-white/30 text-xs font-mono mt-1 px-2 py-1 rounded-lg bg-white/[0.03] border border-white/[0.06]">{project.year}</span>
          </div>

          {/* Description */}
          <p className="text-white/50 text-sm leading-relaxed mb-4">{project.description}</p>

          {/* Founder block (flagship projects) */}
          {project.founder && (
            <div
              className="mb-4 rounded-xl border p-4 backdrop-blur-sm"
              style={{
                borderColor: `${accent}33`,
                background: `linear-gradient(135deg, ${accent}12, rgba(255,255,255,0.02))`,
              }}
            >
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                  style={{ background: `linear-gradient(135deg, ${accent}, #818cf8)`, boxShadow: `0 0 16px ${accent}55` }}
                >
                  {project.founder.name.split(' ').map(w => w[0]).slice(0, 2).join('')}
                </div>
                <div>
                  <div className="text-sm font-bold text-white">{project.founder.name}</div>
                  <div className="text-[10px] font-mono uppercase tracking-widest" style={{ color: accent }}>{project.founder.role}</div>
                </div>
                <span className="ml-auto rounded-full border px-2 py-0.5 text-[9px] font-mono uppercase tracking-widest" style={{ borderColor: `${accent}55`, color: accent, background: `${accent}15` }}>
                  Founder
                </span>
              </div>
              <p className="text-xs italic leading-relaxed text-white/50 border-l-2 pl-3" style={{ borderColor: `${accent}66` }}>
                “{project.founder.statement}”
              </p>
            </div>
          )}

          {/* Highlights */}
          <ul className="space-y-2 mb-4">
            {project.highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-white/60">
                <span className="mt-1.5 text-[6px]" style={{ color: accent }}>●</span>
                <span>{h}</span>
              </li>
            ))}
          </ul>

          {/* Impact metrics — one hue per fact, and a status tile that breathes */}
          <div className={`grid gap-2 mb-4 ${project.metrics.length > 3 ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-3'}`}>
            {project.metrics.map((m, i) => {
              const tone = m.tone ?? accent
              const isLive = m.live === true
              return (
                <div
                  key={i}
                  className={`relative overflow-hidden rounded-xl border px-3 py-2.5 text-center transition-all duration-300 ${
                    isLive ? 'metric-live' : isHovered ? 'scale-[1.02]' : ''
                  }`}
                  style={{
                    borderColor: isLive ? undefined : rgba(tone, isHovered ? 0.45 : 0.24),
                    background: isLive
                      ? 'linear-gradient(150deg, rgba(52,211,153,0.18), rgba(34,211,238,0.05))'
                      : `linear-gradient(150deg, ${rgba(tone, isHovered ? 0.16 : 0.1)}, ${rgba(tone, 0.02)})`,
                  }}
                >
                  {/* Hue rail across the top edge */}
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-[2px]"
                    style={{ background: `linear-gradient(90deg, transparent, ${rgba(tone, 0.9)}, transparent)` }}
                  />
                  <div className="flex items-center justify-center gap-1.5">
                    {isLive && <span className="live-dot" aria-hidden />}
                    <span
                      className="text-lg font-bold leading-tight tracking-tight"
                      style={{
                        backgroundImage: `linear-gradient(120deg, #ffffff 15%, ${tone} 130%)`,
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        color: 'transparent',
                      }}
                    >
                      {m.value}
                    </span>
                  </div>
                  <div className="mt-0.5 font-mono text-[9px] uppercase tracking-wider" style={{ color: rgba(tone, 0.85) }}>
                    {m.label}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Tech stack (flagship keeps a compact single line per item) */}
          <div className="mb-4 space-y-2">
            {project.architecture.map((a, i) => (
              <div key={i} className="flex items-start gap-2.5 text-xs">
                <span className="shrink-0 mt-0.5 font-mono text-[10px] rounded px-1.5 py-0.5"
                  style={{ color: rgba(accent, 0.9), border: `1px solid ${rgba(accent, 0.25)}`, background: rgba(accent, 0.06) }}>
                  {a.name}
                </span>
                <span className="text-white/45 leading-relaxed">{a.detail}</span>
              </div>
            ))}
          </div>

          {/* Architecture chain — auto-cycles through the flow so it stays alive */}
          {project.flow && (
            <div className="mx-auto mb-4 max-w-md rounded-xl border border-white/[0.06] bg-white/[0.02] p-2">
              <div className="mb-1.5 flex items-center justify-between gap-2">
                <span className="text-[9px] font-mono uppercase tracking-widest text-white/35">
                  {project.title} Architecture
                </span>
                <span className="text-[9px] font-mono" style={{ color: rgba(accent, 0.7) }}>
                  {String(activeFlow + 1).padStart(2, '0')}/{String(flowLength).padStart(2, '0')}
                </span>
              </div>
              <div className="relative flex flex-col items-center gap-0">
                {/* Energy rail the highlight travels along */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute left-1/2 top-1 bottom-1 w-px -translate-x-1/2"
                  style={{ background: `linear-gradient(180deg, transparent, ${rgba(accent, 0.35)}, transparent)` }}
                />
                {project.flow.map((f, i) => {
                  const isActive = i === activeFlow
                  const isDone = i < activeFlow
                  return (
                    <Fragment key={f}>
                      <span
                        className="relative z-10 w-full rounded-md border px-2 py-[2px] text-center font-mono text-[11px] leading-snug transition-all duration-500"
                        style={{
                          borderColor: isActive ? rgba(accent, 0.75) : rgba(accent, 0.22),
                          background: isActive ? rgba(accent, 0.18) : rgba(accent, 0.04),
                          color: isActive ? '#fff' : 'rgba(255,255,255,0.6)',
                          boxShadow: isActive ? `0 0 16px ${rgba(accent, 0.35)}, inset 0 0 10px ${rgba(accent, 0.12)}` : 'none',
                          transform: isActive ? 'scale(1.02)' : 'scale(1)',
                        }}
                      >
                        {f}
                      </span>
                      {i < flowLength - 1 && (
                        <span
                          className="relative z-10 text-[7px] leading-[5px] transition-colors duration-500"
                          style={{ color: isDone ? rgba(accent, 0.9) : 'rgba(148,163,184,0.32)' }}
                        >
                          ▼
                        </span>
                      )}
                    </Fragment>
                  )
                })}
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((t, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full text-xs font-mono border transition-all duration-300"
                style={{
                  borderColor: isHovered ? rgba(accent, 0.35) : 'rgba(255,255,255,0.1)',
                  background: isHovered ? rgba(accent, 0.1) : 'rgba(255,255,255,0.03)',
                  color: isHovered ? '#fff' : 'rgba(255,255,255,0.5)',
                }}
              >
                {t}
              </span>
            ))}
          </div>

          {/* Mini workflow pipeline - with running animation.
              Always the site's orange ember, whatever the card accent is. */}
          <WorkflowPipeline steps={project.workflow} isHovered={isHovered} activeStep={activeStep} accent="#FF4500" />

          {/* Outcome */}
          <div className={`mt-4 rounded-xl border px-4 py-3 flex items-start gap-2.5 transition-all duration-300 ${
            isHovered ? 'border-emerald-500/25 bg-emerald-500/5' : 'border-white/[0.06] bg-white/[0.02]'
          }`}>
            <span className="mt-0.5 text-emerald-400">✦</span>
            <p className="text-xs text-white/50 leading-relaxed">{project.outcome}</p>
          </div>

          {/* Bottom row */}
          <div className="flex items-center justify-between mt-5">
            <div className="flex items-center gap-4">
              <a
                href={CONTACT.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-2 text-white/40 transition-colors text-sm group/link"
                style={{ color: isHovered ? accent : undefined }}
              >
                <GithubIcon size={18} />
                <span className="group-hover/link:underline">Code</span>
              </a>
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  title={project.live}
                  aria-label={`Open live platform — ${liveHost(project.live)}`}
                  className="live-pill group/live px-2.5 py-1 text-[11px]"
                >
                  <span className="live-dot" aria-hidden />
                  <span className="font-bold uppercase tracking-widest" aria-hidden>Visit Live Platform</span>
                  <ExternalLink
                    size={12}
                    className="transition-transform duration-300 group-hover/live:-translate-y-0.5 group-hover/live:translate-x-0.5"
                  />
                </a>
              )}
              {onOpen && (
                <span className="hidden sm:flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest transition-colors"
                  style={{ color: rgba(accent, isHovered ? 0.95 : 0.6) }}>
                  View case study →
                </span>
              )}
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-white/20">
              <div className="w-1 h-1 rounded-full animate-pulse" style={{ background: project.statusTone === 'founder' ? accent : '#10b981' }} />
              <span className="font-mono">{project.statusLabel ?? 'DEPLOYED'}</span>
            </div>
          </div>
        </div>

        {/* Corner accents */}
        <div className={`absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 rounded-tl-2xl transition-colors duration-300`} style={{ borderColor: isHovered ? rgba(accent, 0.6) : 'rgba(255,255,255,0.05)' }} />
        <div className={`absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 rounded-tr-2xl transition-colors duration-300`} style={{ borderColor: isHovered ? rgba(accent, 0.6) : 'rgba(255,255,255,0.05)' }} />
        <div className={`absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 rounded-bl-2xl transition-colors duration-300`} style={{ borderColor: isHovered ? rgba(accent, 0.6) : 'rgba(255,255,255,0.05)' }} />
        <div className={`absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 rounded-br-2xl transition-colors duration-300`} style={{ borderColor: isHovered ? rgba(accent, 0.6) : 'rgba(255,255,255,0.05)' }} />
      </div>
    </div>
  )
}

export default function Projects() {
  const [active, setActive] = useState<Project | null>(null)
  const close = () => setActive(null)

  // Lock scroll + trap focus while the case-study modal is open
  useBodyScrollLock(active !== null)
  const modalRef = useModalFocus(active !== null)

  useEffect(() => {
    if (!active) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active])

  return (
    <Section id='projects' title='Projects' subtitle='Selected work demonstrating end-to-end AI system design.' revealVariant='3d-up'>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {PROJECTS.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onOpen={project.detail ? () => setActive(project) : undefined}
          />
        ))}
      </div>

      {/* ── Case-study modal (same shell as the Certifications modal) ── */}
      {active && active.detail && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center p-4 animate-fade-in"
          style={{ backgroundColor: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)' }}
          onClick={close}
          role='dialog'
          aria-modal='true'
          aria-label={`${active.title} case study`}
        >
          {/* Glowing close button */}
          <button
            onClick={close}
            aria-label='Close'
            className="absolute right-5 top-5 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#FF4500] to-[#FF6B00] text-white shadow-[0_0_25px_rgba(255,69,0,0.5)] transition-all duration-300 hover:scale-110 hover:rotate-90 hover:shadow-[0_0_40px_rgba(255,69,0,0.7)] active:scale-95"
          >
            <X size={26} strokeWidth={2.5} />
          </button>

          <div
            ref={modalRef}
            tabIndex={-1}
            className='relative max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-2xl scroll-smooth'
            style={{ background: 'linear-gradient(135deg,rgba(20,16,12,0.95),rgba(8,8,8,0.92))', border: '1px solid rgba(255,69,0,0.25)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', boxShadow: '0 0 60px rgba(255,69,0,0.15), 0 25px 60px rgba(0,0,0,0.5)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top accent line */}
            <div className='h-1 w-full bg-gradient-to-r from-[#FF4500] via-[#D946EF] to-[#818CF8]' />

            <ProjectDetail project={active} />
          </div>
        </div>
      )}
    </Section>
  )
}

/** Numbered case-study sections — 01 … 09 — for a flagship project. */
function ProjectDetail({ project }: { project: Project }) {
  const reduced = usePrefersReducedMotion()
  const cycleStep = useStepCycle(project.workflow.length, 2200)
  const activeStep = reduced ? 0 : cycleStep
  const founder = project.founder
  const accent = project.accent ?? (project.statusTone === 'founder' ? '#D946EF' : '#FF4500')
  const flowLength = project.flow?.length ?? 0
  const flowCycle = useStepCycle(flowLength, 1500)
  const activeFlow = reduced ? 0 : flowCycle

  return (
    <div className='p-5 sm:p-8'>
      {/* Hero header */}
      <div className='flex items-center gap-4 mb-6'>
        {project.image ? (
          <div className='relative w-20 h-20 shrink-0'>
            <div className='absolute -inset-1.5 rounded-2xl opacity-70 blur-md' style={{ background: 'linear-gradient(135deg, #22d3ee, #818cf8 50%, #e879f9)' }} aria-hidden />
            <div className='relative w-20 h-20 rounded-xl overflow-hidden border-2 border-white/20' style={{ boxShadow: '0 0 22px rgba(217,70,239,0.45), inset 0 0 10px rgba(0,0,0,0.4)', background: '#000' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={project.image} alt={`${project.title} logo`} className='w-full h-full object-cover' />
            </div>
          </div>
        ) : (
          <div className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${project.tagColor} shadow-[0_0_30px_rgba(255,69,0,0.25)]`}>
            {isBrandIcon(project.icon) ? (
              <IconifyIcon icon={project.icon} width={34} height={34} aria-hidden />
            ) : (() => { const I = project.icon as LucideIcon; return <I size={34} strokeWidth={1.7} aria-hidden className='text-white' /> })()}
          </div>
        )}
        <div className='min-w-0'>
          <div className={`text-[10px] font-mono uppercase tracking-widest bg-gradient-to-r ${project.tagColor} bg-clip-text text-transparent font-bold`}>
            [{project.tag}]
          </div>
          <ProjectTitle
            project={project}
            className={`mt-0.5 font-bold text-white ${
              project.image ? 'text-3xl tracking-tight' : 'text-2xl'
            }`}
          />
          <div className='flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-[11px] text-white/40 font-mono'>
            <span style={{ color: accent }}>●</span>
            <span>{project.role}</span>
            <span className='text-white/20'>·</span>
            <span>{project.year}</span>
          </div>
        </div>
        {project.statusLabel && (
          <span className='ml-auto hidden sm:flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-emerald-400'>
            <span className='w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse' />
            {project.statusLabel}
          </span>
        )}
      </div>

      {/* Live platform CTA — the case study's outbound link, glowing like LIVE */}
      {project.live && (
        <a
          href={project.live}
          target='_blank'
          rel='noopener noreferrer'
          title={project.live}
          aria-label={`Open live platform — ${liveHost(project.live)}`}
          className='live-pill group/live mx-auto mb-2 flex w-fit items-center gap-2 px-4 py-2 text-xs'
        >
          <span className='live-dot' aria-hidden />
          <span className='font-bold uppercase tracking-widest'>Visit Live Platform</span>
          <ExternalLink
            size={13}
            className='transition-transform duration-300 group-hover/live:-translate-y-0.5 group-hover/live:translate-x-0.5'
          />
        </a>
      )}

      {/* Numbered sections */}
      {project.detail!.map((section, idx) => (
        <section key={section.title} className='border-t border-white/[0.07] py-5'>
          <div className='flex items-baseline gap-3 mb-3'>
            <span className='text-[11px] font-mono font-bold' style={{ color: accent }}>{String(idx + 1).padStart(2, '0')}</span>
            <h4 className='text-sm font-bold uppercase tracking-widest text-white/80'>{section.title}</h4>
          </div>

          {section.body && <p className='text-sm leading-relaxed text-white/55'>{section.body}</p>}

          {section.bullets && (
            <ul className='space-y-2 mt-1'>
              {section.bullets.map((b, i) => (
                <li key={i} className='flex items-start gap-2.5 text-sm text-white/60'>
                  <span className='mt-1.5 text-[6px]' style={{ color: accent }}>●</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Founder profile block */}
          {section.kind === 'founder' && founder && (
            <div className='rounded-2xl border border-fuchsia-500/25 bg-gradient-to-br from-fuchsia-500/10 via-white/[0.02] to-indigo-500/10 p-5'>
              <div className='flex items-center gap-4 mb-4'>
                <div
                  className='flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-lg font-bold text-white'
                  style={{ background: 'linear-gradient(135deg, #D946EF, #818CF8)', boxShadow: '0 0 24px rgba(217,70,239,0.5)' }}
                >
                  {founder.name.split(' ').map(w => w[0]).slice(0, 2).join('')}
                </div>
                <div>
                  <div className='text-lg font-bold text-white'>{founder.name}</div>
                  <div className='text-[11px] font-mono uppercase tracking-widest text-fuchsia-400'>{founder.role}</div>
                </div>
                <span className='ml-auto flex items-center gap-1.5 rounded-full border border-fuchsia-500/40 bg-fuchsia-500/15 px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-fuchsia-300'>
                  <Crown size={12} /> Founder
                </span>
              </div>
              <ul className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
                {founder.facts.map((f, i) => (
                  <li key={i} className='flex items-start gap-2 text-xs text-white/60'>
                    <span className='mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-fuchsia-400' />
                    {f}
                  </li>
                ))}
              </ul>
              <p className='mt-4 text-sm italic leading-relaxed text-white/55 border-l-2 border-fuchsia-500/50 pl-3'>
                “{founder.statement}”
              </p>
            </div>
          )}

          {/* Vertical architecture chain — same live cycling as the card */}
          {section.kind === 'flow' && project.flow && (
            <div className='relative flex flex-col items-center gap-0.5 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 sm:p-4'>
              <span
                aria-hidden
                className='pointer-events-none absolute left-1/2 top-2 bottom-2 w-px -translate-x-1/2'
                style={{ background: `linear-gradient(180deg, transparent, ${rgba(accent, 0.35)}, transparent)` }}
              />
              {project.flow.map((f, i) => {
                const isActive = i === activeFlow
                const isDone = i < activeFlow
                return (
                  <Fragment key={f}>
                    <span
                      className='relative z-10 w-full max-w-xs rounded-lg border px-3 py-1 text-center font-mono text-[11px] transition-all duration-500 sm:py-1.5 sm:text-xs'
                      style={{
                        borderColor: isActive ? rgba(accent, 0.75) : rgba(accent, 0.24),
                        background: isActive ? rgba(accent, 0.18) : rgba(accent, 0.04),
                        color: isActive ? '#fff' : 'rgba(255,255,255,0.65)',
                        boxShadow: isActive ? `0 0 18px ${rgba(accent, 0.35)}, inset 0 0 10px ${rgba(accent, 0.12)}` : 'none',
                        transform: isActive ? 'scale(1.02)' : 'scale(1)',
                      }}
                    >
                      {f}
                    </span>
                    {i < flowLength - 1 && (
                      <span
                        className='relative z-10 text-[9px] leading-none transition-colors duration-500'
                        style={{ color: isDone ? rgba(accent, 0.9) : 'rgba(148,163,184,0.3)' }}
                      >
                        ▼
                      </span>
                    )}
                  </Fragment>
                )
              })}
            </div>
          )}

          {/* Animated learning workflow (hero element) */}
          {section.kind === 'workflow' && (
            <div>
              <WorkflowPipeline steps={project.workflow} isHovered activeStep={activeStep} accent="#FF4500" />
              <ul className='mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2'>
                {project.workflow.map((s, i) => (
                  <li
                    key={s.step}
                    className='flex items-start gap-2.5 rounded-lg border px-3 py-2 text-xs transition-all duration-500'
                    style={{
                      borderColor: i === activeStep ? rgba(accent, 0.45) : 'rgba(255,255,255,0.06)',
                      background: i === activeStep ? rgba(accent, 0.08) : 'rgba(255,255,255,0.02)',
                    }}
                  >
                    <span className='font-mono text-[10px] font-bold' style={{ color: rgba(accent, 0.85) }}>{String(i + 1).padStart(2, '0')}</span>
                    <span className='text-white/60'><b className='text-white/80'>{s.step}</b> — {s.note ?? s.desc}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech pills */}
          {section.kind === 'pills' && section.pills && (
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
              {section.pills.map((p) => (
                <div key={p.label} className='rounded-xl border bg-white/[0.02] px-4 py-3 transition-all duration-300 hover:bg-white/[0.04]'
                  style={{ borderColor: rgba(accent, 0.16) }}>
                  <div className='text-xs font-mono font-bold uppercase tracking-wider' style={{ color: rgba(accent, 0.9) }}>{p.label}</div>
                  <div className='text-xs text-white/50 mt-1'>{p.detail}</div>
                </div>
              ))}
            </div>
          )}
        </section>
      ))}

      {/* Founder credit with animated glow signature */}
      <div className='border-t border-white/[0.07] pt-6 text-center'>
        <div className='text-[10px] font-mono uppercase tracking-[0.3em] text-white/35'>Created &amp; Architected by</div>
        <div className='mt-2 text-xl font-bold text-shimmer'>{founder?.name ?? project.role}</div>
        <div
          className='mx-auto mt-3 h-px w-48 rounded-full'
          style={{ background: 'linear-gradient(90deg, transparent, #D946EF, #818CF8, transparent)', boxShadow: '0 0 12px rgba(217,70,239,0.5)' }}
        />
      </div>
    </div>
  )
}
