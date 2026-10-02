'use client'

import { useState } from 'react'
import Section from './Section'
import { useScrollReveal, useStepCycle, useTilt } from '@/lib/hooks'
import { ChevronRight } from 'lucide-react'
import { Icon as IconifyIcon } from '@iconify/react'
import { HIGHLIGHTS, WORKFLOW_STEPS, BIO, BIO_SKILLS, isBrandIcon, type Highlight } from '@/lib/data/about'

/** Matches any bio skill term, longest first, so overlaps resolve to the longer name. */
const SKILL_PATTERN = new RegExp(
  `(${BIO_SKILLS.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .sort((a, b) => b.length - a.length)
    .join('|')})`,
  'g',
)
const SKILL_TERMS = new Set(BIO_SKILLS)

/** Bio text with the technologies it names emphasised, so the stack stands out. */
function RichBio({ text }: { text: string }) {
  return (
    <>
      {text.split(SKILL_PATTERN).map((part, i) =>
        SKILL_TERMS.has(part) ? (
          <strong key={i} className="font-semibold text-heading">
            {part}
          </strong>
        ) : (
          part
        ),
      )}
    </>
  )
}

export default function About() {
  const ref = useScrollReveal(80)
  const step = useStepCycle(WORKFLOW_STEPS.length, 1800)
  const {
    ref: pipelineRef,
    transform: pipelineTransform,
    handlers: pipelineHandlers,
  } = useTilt({ max: 3.6, resetOnLeave: false })

  return (
    <Section id='about' title='About Me' subtitle='AI Engineer & Data Scientist — B.Tech CSE' revealVariant='3d-up'>
      <div ref={ref} className="reveal">
        {/* Bio + Highlights */}
        <div className="grid gap-10 md:grid-cols-2 md:items-start">
          {/* Left - Bio with glow */}
          <div className="relative">
            {/* Background glow */}
            <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full opacity-30 blur-3xl pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(255,69,0,0.3), transparent 70%)' }} />
            <h3 className="font-display text-2xl font-bold text-heading sm:text-3xl md:text-4xl relative z-10">
              Turning Data Into{' '}
              <span className="text-gradient">Intelligence</span>
            </h3>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-body sm:text-lg relative z-10">
              <RichBio text={BIO.lead} />
            </p>

            {/* Supporting detail — shorter measure and softer tone than the lead */}
            <div className="mt-4 max-w-xl space-y-2.5 relative z-10">
              {BIO.body.map((paragraph) => (
                <p key={paragraph} className="text-sm leading-relaxed text-body sm:text-[15px]">
                  <RichBio text={paragraph} />
                </p>
              ))}
            </div>

            {/* The ask — accented so it reads as a call to action, not body copy */}
            <div
              className="mt-5 max-w-xl rounded-r-xl border-l-2 py-3 pl-4 pr-3 relative z-10"
              style={{
                borderColor: 'rgba(255,69,0,.55)',
                background: 'linear-gradient(90deg, rgba(255,69,0,.09), rgba(255,69,0,.01) 85%)',
              }}
            >
              <p className="text-sm leading-relaxed text-body">
                <RichBio text={BIO.seeking} />
              </p>
            </div>

            <div className="mt-6 relative z-10">
              <a href="#experience" className="group inline-flex items-center gap-2 font-mono text-sm font-medium text-primary-light transition-all hover:text-primary hover:gap-3">
                Read About Me
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
            </div>
          </div>

          {/* Right - 8 Highlight Cards with 3D tilt */}
          <div className="grid grid-cols-2 gap-3">
            {HIGHLIGHTS.map((hl, i) => (
              <HighlightCard key={hl.label} hl={hl} index={i} />
            ))}
          </div>
        </div>

        {/* 3D Workflow Pipeline with Running Animation */}
        <div className="mt-16">
          <h4 className="mb-2 text-center font-display text-lg font-bold text-heading">
            <span className="text-gradient">Complete AI Engineer Pipeline</span>
          </h4>
          <p className="mb-8 text-center text-xs text-body">From data to deployment — every stage of the AI workflow</p>

          <div
            ref={pipelineRef}
            {...pipelineHandlers}
            className="relative rounded-2xl p-6 md:p-8 overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))",
              border: "1px solid rgba(255,255,255,0.06)",
              perspective: "800px",
              transform: pipelineTransform,
            }}
          >
            {/* Background glow */}
            <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
              <div className="absolute top-1/2 left-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
              {/* Running light beam */}
              <div className="absolute top-0 left-0 h-full w-32 animate-pipeline-glow"
                style={{
                  background: `linear-gradient(90deg, transparent, ${WORKFLOW_STEPS[step]?.color || '#FF4500'}20, transparent)`,
                }}
              />
            </div>

            {/* Step counter */}
            <div className="absolute top-3 right-4 flex items-center gap-2 z-20">
              <span className="text-[10px] font-mono text-body-light">STEP</span>
              <span className="text-xs font-mono font-bold" style={{ color: WORKFLOW_STEPS[step]?.color }}>
                {String(step + 1).padStart(2, '0')}/{String(WORKFLOW_STEPS.length).padStart(2, '0')}
              </span>
            </div>

            <div className="relative z-10 flex flex-wrap items-center justify-center gap-2 md:gap-1">
              {WORKFLOW_STEPS.map((wfStep, i) => {
                const isActive = i === step
                const isPast = i < step
                return (
                  <span key={i} className="flex items-center gap-1">
                    <div
                      className="relative flex flex-col items-center gap-1 rounded-xl px-2.5 py-2 md:px-3 md:py-2.5 transition-all duration-500"
                      style={{
                        background: isActive
                          ? `linear-gradient(135deg, ${wfStep.color}30, ${wfStep.color}12)`
                          : isPast
                            ? `${wfStep.color}0a`
                            : "rgba(255,255,255,0.03)",
                        border: `1px solid ${isActive ? wfStep.color + "60" : isPast ? wfStep.color + "20" : "rgba(255,255,255,0.06)"}`,
                        boxShadow: isActive
                          ? `0 0 30px ${wfStep.color}40, 0 0 60px ${wfStep.color}15, inset 0 0 20px ${wfStep.color}10`
                          : "none",
                        transform: isActive ? "scale(1.1) translateY(-2px)" : "scale(1)"
                      }}
                    >
                      {/* Glow ring for active */}
                      {isActive && (
                        <div className="absolute inset-0 rounded-xl animate-pulse-ring pointer-events-none"
                          style={{ border: `2px solid ${wfStep.color}40` }} />
                      )}
                      <span className="text-base md:text-lg">{wfStep.icon}</span>
                      <span className="hidden text-[10px] font-bold md:inline"
                        style={{ color: isActive ? wfStep.color : isPast ? "#94a3b8" : "#475569" }}>
                        {wfStep.label}
                      </span>
                      {/* Detail text for active step */}
                      {isActive && wfStep.detail && (
                        <span className="hidden md:block text-[8px] text-center max-w-[90px] leading-tight"
                          style={{ color: `${wfStep.color}99` }}>
                          {wfStep.detail}
                        </span>
                      )}
                      {isActive && (
                        <div className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full animate-pulse"
                          style={{ background: wfStep.color, boxShadow: `0 0 10px ${wfStep.color}` }} />
                      )}
                    </div>
                    {i < WORKFLOW_STEPS.length - 1 && (
                      <div className="hidden md:flex items-center">
                        {/* Animated connector line */}
                        <div className="relative w-6 h-0.5" style={{ background: `${isPast ? wfStep.color + '40' : 'rgba(255,255,255,0.08)'}` }}>
                          {isPast && (
                            <div className="absolute inset-0 animate-connector-flow"
                              style={{ background: `linear-gradient(90deg, ${wfStep.color}, transparent)` }} />
                          )}
                        </div>
                        <ChevronRight size={10} className="transition-colors duration-500"
                          style={{ color: isPast ? wfStep.color + "80" : "#334155" }} />
                      </div>
                    )}
                  </span>
                )
              })}
            </div>

            {/* Progress bar at bottom */}
            <div className="mt-6 h-1 w-full rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
              <div className="h-full rounded-full transition-all duration-700 ease-out"
                style={{
                  width: `${((step + 1) / WORKFLOW_STEPS.length) * 100}%`,
                  background: `linear-gradient(90deg, ${WORKFLOW_STEPS[0].color}, ${WORKFLOW_STEPS[step].color})`,
                  boxShadow: `0 0 10px ${WORKFLOW_STEPS[step].color}60`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

function HighlightCard({ hl, index }: { hl: Highlight; index: number }) {
  const ref = useScrollReveal(index * 60)
  const { ref: cardRef, hovered, transform, handlers } = useTilt({ max: 15, scale: 1.04 })
  const Icon = hl.icon as Exclude<Highlight['icon'], { body: string }>

  return (
    <div ref={ref} className="reveal" style={{ perspective: '600px' }}>
      <div
        ref={cardRef}
        {...handlers}
        className="group relative overflow-hidden rounded-xl p-4 transition-all duration-300 cursor-pointer"
        style={{
          background: hovered ? `linear-gradient(135deg, ${hl.color}18, ${hl.color}08)` : "rgba(255,255,255,0.03)",
          border: `1px solid ${hovered ? hl.color + "40" : "rgba(255,255,255,0.06)"}`,
          boxShadow: hovered ? `0 12px 40px ${hl.color}20, 0 0 30px ${hl.color}10` : "0 2px 10px rgba(0,0,0,0.1)",
          transform,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Glow blob */}
        <div className="absolute -top-8 -right-8 h-20 w-20 rounded-full opacity-0 transition-all duration-500 group-hover:opacity-60 blur-2xl pointer-events-none"
          style={{ background: hl.color }} />
        {/* Corner glow */}
        <div className="absolute -bottom-4 -left-4 h-12 w-12 rounded-full opacity-0 transition-all duration-700 group-hover:opacity-40 blur-xl pointer-events-none"
          style={{ background: hl.color }} />

        <div className="relative z-10">
          <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg transition-all duration-500 group-hover:scale-115 group-hover:rotate-8"
            style={{
              background: `${hl.color}22`,
              boxShadow: hovered ? `0 0 20px ${hl.color}30` : 'none',
            }}>
            {isBrandIcon(hl.icon) ? (
              <IconifyIcon icon={hl.icon} width={22} height={22} aria-hidden
                style={{
                  filter: hovered ? `drop-shadow(0 0 8px ${hl.color})` : 'none',
                  transition: 'filter 0.3s',
                }} />
            ) : (
              <Icon size={20} style={{
                color: hl.color,
                filter: hovered ? `drop-shadow(0 0 8px ${hl.color})` : 'none',
                transition: 'filter 0.3s',
              }} />
            )}
          </div>
          <p className="text-xs font-bold text-heading">{hl.label}</p>
          <p className="mt-1 text-[11px] leading-relaxed text-body">{hl.desc}</p>
        </div>

        {/* Bottom glow line on hover */}
        <div className="absolute bottom-0 left-0 h-0.5 transition-all duration-500"
          style={{
            width: hovered ? '100%' : '0%',
            background: `linear-gradient(90deg, transparent, ${hl.color}, transparent)`,
            boxShadow: `0 0 8px ${hl.color}`,
          }}
        />
      </div>
    </div>
  )
}
