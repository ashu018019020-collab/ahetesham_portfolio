'use client'

import { useState, useEffect } from 'react'
import Section from './Section'
import { useBodyScrollLock, useModalFocus, useScrollReveal, useStepCycle, useTilt } from '@/lib/hooks'
import { ChevronDown, X, ArrowRight } from 'lucide-react'
import { CAREER_DOMAINS, type CareerDomain } from '@/lib/data/skills'

export default function CareerFocus() {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null)

  useBodyScrollLock(expandedIdx !== null)

  // Close on ESC key (parity with Certifications modal)
  useEffect(() => {
    if (expandedIdx === null) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setExpandedIdx(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [expandedIdx])

  return (
    <>
      <Section
        id="career-focus"
        title="Career Focus"
        subtitle="The domains where I aim to create the most impact."
        revealVariant="3d-left"
        containerClassName="shell"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CAREER_DOMAINS.map((c, i) => (
            <CareerCard key={c.title} career={c} index={i} onExpand={() => setExpandedIdx(i)} />
          ))}
        </div>
      </Section>

      {/* Expand Modal */}
      {expandedIdx !== null && (
        <CareerModal career={CAREER_DOMAINS[expandedIdx]} onClose={() => setExpandedIdx(null)} />
      )}
    </>
  )
}

function CareerCard({ career, index, onExpand }: { career: CareerDomain; index: number; onExpand: () => void }) {
  const ref = useScrollReveal(index * 80)
  const { ref: cardRef, hovered, transform, handlers } = useTilt({ max: 12, scale: 1.03 })
  const CareerIcon = career.icon

  return (
    <div ref={ref} className="reveal" style={{ perspective: '800px' }}>
      <div
        ref={cardRef}
        {...handlers}
        onClick={onExpand}
        className="relative overflow-hidden rounded-2xl p-6 transition-all duration-300 cursor-pointer"
        style={{
          background: hovered
            ? `linear-gradient(135deg, ${career.color}15, ${career.color}08)`
            : "rgba(255,255,255,0.03)",
          border: `1px solid ${hovered ? career.color + "40" : "rgba(255,255,255,0.06)"}`,
          boxShadow: hovered
            ? `0 20px 40px rgba(0,0,0,0.3), 0 0 40px ${career.color}20`
            : "0 4px 20px rgba(0,0,0,0.1)",
          transform,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Glow blobs */}
        <div className="absolute -top-10 -right-10 h-24 w-24 rounded-full blur-3xl pointer-events-none transition-all duration-700"
          style={{ background: career.color, opacity: hovered ? 0.3 : 0 }} />
        <div className="absolute -bottom-6 -left-6 h-16 w-16 rounded-full blur-2xl pointer-events-none transition-all duration-700"
          style={{ background: career.color, opacity: hovered ? 0.2 : 0 }} />

        {/* Icon badge with glow */}
        <div className="relative mb-4 inline-flex">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-500"
            style={{
              background: `${career.color}1a`,
              border: `1px solid ${career.color}33`,
              transform: hovered ? 'scale(1.12) rotate(8deg)' : 'scale(1) rotate(0)',
              boxShadow: hovered ? `0 0 24px ${career.color}45` : 'none',
            }}>
            <CareerIcon size={28} strokeWidth={1.7} aria-hidden style={{ color: career.color, filter: hovered ? `drop-shadow(0 0 8px ${career.color}90)` : 'none', transition: 'filter 0.3s' }} />
          </div>
          {hovered && (
            <div className="absolute inset-0 rounded-full animate-pulse-ring pointer-events-none"
              style={{ boxShadow: `0 0 20px ${career.color}40` }} />
          )}
        </div>

        <h3 className="font-display text-lg font-bold text-[#D9D9D9]">{career.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-[#94a3b8]">{career.desc}</p>

        {/* Mini workflow preview */}
        <div className="mt-4 flex items-center gap-1 flex-wrap">
          {career.workflow.slice(0, 4).map((step, si) => {
            const MiniIcon = step.icon
            return (
            <span key={si} className="flex items-center gap-1">
              <MiniIcon size={13} aria-hidden style={{ color: career.color + 'b0' }} />
              {si < 3 && <ArrowRight size={8} className="text-body-light/30" />}
            </span>
            )
          })}
          <span className="text-[10px] font-mono ml-1" style={{ color: career.color }}>+{career.workflow.length - 4}</span>
        </div>

        {/* Click hint */}
        <div className="mt-4 flex items-center gap-1.5 text-xs font-medium transition-all duration-300"
          style={{ color: hovered ? career.color : 'transparent' }}>
          <span>View Details</span>
          <ChevronDown size={14} style={{ transform: 'rotate(-90deg)' }} />
        </div>

        {/* Bottom glow line */}
        <div className="absolute bottom-0 left-0 h-0.5 transition-all duration-500"
          style={{
            width: hovered ? '100%' : '0%',
            background: `linear-gradient(90deg, transparent, ${career.color}, transparent)`,
            boxShadow: `0 0 10px ${career.color}`,
          }}
        />
      </div>
    </div>
  )
}

function CareerModal({ career, onClose }: { career: CareerDomain; onClose: () => void }) {
  const activeStep = useStepCycle(career.workflow.length, 2200)
  // Modal only mounts while open: trap Tab focus, restore it to the opener on close
  const modalRef = useModalFocus(true)
  const ModalIcon = career.icon

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)' }}
      onClick={onClose}>
      <div ref={modalRef} tabIndex={-1} className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl p-6 md:p-8"
        style={{
          background: 'linear-gradient(135deg, rgba(15,23,42,0.98), rgba(30,41,59,0.98))',
          border: `1px solid ${career.color}30`,
          boxShadow: `0 0 60px ${career.color}20`,
        }}
        onClick={e => e.stopPropagation()}>

        <button onClick={onClose} aria-label='Close details'
          className="absolute right-4 top-4 rounded-full p-2 text-body-light/50 transition-colors hover:bg-white/5 hover:text-heading z-10">
          <X size={20} />
        </button>

        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl"
            style={{ background: `${career.color}1a`, border: `1px solid ${career.color}40`, boxShadow: `0 0 30px ${career.color}25` }}>
            <ModalIcon size={32} strokeWidth={1.6} aria-hidden style={{ color: career.color, filter: `drop-shadow(0 0 10px ${career.color}90)` }} />
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-heading">{career.title}</h2>
            <p className="text-sm text-body-light mt-1">{career.desc}</p>
          </div>
        </div>

        {/* Tools */}
        <div className="flex flex-wrap gap-2 mb-6">
          {career.tools.map(t => (
            <span key={t} className="font-mono rounded-full px-3 py-1 text-xs font-medium"
              style={{ background: `${career.color}15`, color: career.color }}>
              {t}
            </span>
          ))}
        </div>

        {/* Key Details */}
        <div className="mb-6">
          <h3 className="text-sm font-bold uppercase tracking-wider text-heading/80 mb-3">Key Capabilities</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {career.details.map((d, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-body-light">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: career.color }} />
                {d}
              </div>
            ))}
          </div>
        </div>

        {/* Animated Workflow */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-heading/80">Workflow Pipeline</h3>
            <span className="text-xs font-mono font-bold" style={{ color: career.color }}>
              {activeStep + 1}/{career.workflow.length}
            </span>
          </div>

          {/* Progress bar */}
          <div className="mb-4 h-1 w-full rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
            <div className="h-full rounded-full transition-all duration-700 ease-out"
              style={{
                width: `${((activeStep + 1) / career.workflow.length) * 100}%`,
                background: `linear-gradient(90deg, ${career.color}80, ${career.color})`,
                boxShadow: `0 0 10px ${career.color}60`,
              }} />
          </div>

          <div className="flex flex-wrap items-start gap-2">
            {career.workflow.map((step, si) => {
              const isActive = si === activeStep
              const isPast = si < activeStep
              const StepIcon = step.icon
              return (
                <div key={si} className="flex items-center gap-2">
                  <div className="relative flex flex-col items-center gap-1.5 rounded-xl px-3 py-3 transition-all duration-500"
                    style={{
                      background: isActive
                        ? `linear-gradient(135deg, ${career.color}30, ${career.color}10)`
                        : isPast ? `${career.color}0a` : 'rgba(255,255,255,0.02)',
                      border: `1px solid ${isActive ? career.color + '50' : isPast ? career.color + '15' : 'rgba(255,255,255,0.06)'}`,
                      boxShadow: isActive ? `0 0 25px ${career.color}30, 0 4px 15px ${career.color}15` : 'none',
                      transform: isActive ? 'scale(1.1) translateY(-2px)' : 'scale(1)',
                    }}>
                    <StepIcon size={22} strokeWidth={1.8} aria-hidden className="transition-transform duration-300"
                      style={{ color: isActive ? career.color : isPast ? '#94a3b8' : '#64748b', transform: isActive ? 'scale(1.2)' : 'scale(1)' }} />
                    <span className="font-mono text-[10px] font-medium whitespace-nowrap"
                      style={{ color: isActive ? career.color : isPast ? '#94a3b8' : '#475569' }}>
                      {step.label}
                    </span>
                    {isActive && (
                      <span className="text-[8px] text-center max-w-[90px] leading-tight"
                        style={{ color: `${career.color}cc` }}>
                        {step.detail}
                      </span>
                    )}
                    {isActive && (
                      <div className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full animate-pulse"
                        style={{ background: career.color, boxShadow: `0 0 10px ${career.color}` }} />
                    )}
                  </div>
                  {si < career.workflow.length - 1 && (
                    <div className="hidden sm:flex items-center">
                      <div className="w-3 h-0.5" style={{ background: isPast ? `${career.color}40` : 'rgba(255,255,255,0.08)' }} />
                      <ArrowRight size={10} style={{ color: isPast ? career.color + '60' : '#334155' }} />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
