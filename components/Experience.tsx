'use client'

import { useState, type ReactNode } from 'react'
import Section from './Section'
import { useScrollReveal, useTilt } from '@/lib/hooks'
import { Briefcase, TrendingUp, Award, Rocket, ExternalLink } from 'lucide-react'
import { EXPERIENCES, type Experience as ExperienceEntry } from '@/lib/data/resume'
import { liveHost } from '@/lib/constants'

export default function Experience() {
  // Founder work leads the timeline; internships follow under their own heading.
  const founderRoles = EXPERIENCES.filter((e) => e.kind === 'founder')
  const internships = EXPERIENCES.filter((e) => e.kind !== 'founder')

  return (
    <Section id='experience' title='Experience' subtitle='Founder work and internship journey.' revealVariant='3d-up'>
      <div className="mb-6">
        <div className="relative space-y-8">
          {/* Animated timeline line */}
          <div className="absolute left-6 top-0 hidden h-full w-px md:block overflow-hidden">
            <div className="h-full w-full bg-gradient-to-b from-[#3B9EFF]/40 via-[#FF4500]/30 to-[#10b981]/20" />
            {/* Running light */}
            <div className="absolute top-0 left-0 w-full h-16 animate-timeline-pulse"
              style={{ background: 'linear-gradient(to bottom, rgba(255,69,0,0.6), transparent)' }} />
          </div>

          {founderRoles.length > 0 && (
            <GroupHeading icon={<Rocket size={20} className="text-[#3B9EFF]" />} label="Founder Experience" />
          )}
          {founderRoles.map((exp) => (
            <ExpCard key={exp.role} exp={exp} i={EXPERIENCES.indexOf(exp)} />
          ))}

          <GroupHeading icon={<Briefcase size={20} className="text-primary" />} label="Internships & Experience" />
          {internships.map((exp) => (
            <ExpCard key={exp.role} exp={exp} i={EXPERIENCES.indexOf(exp)} />
          ))}
        </div>
      </div>
    </Section>
  )
}

/** Group label that sits on the timeline, aligned with the card text column. */
function GroupHeading({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <h3 className="flex items-center gap-2 font-display text-xl font-bold text-heading md:pl-16">
      {icon}
      {label}
    </h3>
  )
}

function ExpCard({ exp, i }: { exp: ExperienceEntry; i: number }) {
  const ref = useScrollReveal(i * 80)
  const [expanded, setExpanded] = useState(false)
  const { ref: cardRef, hovered, transform, handlers } = useTilt({ max: 8, scale: 1.01 })
  const Icon = exp.icon

  return (
    <div ref={ref} className="reveal relative flex gap-6 md:pl-16" style={{ perspective: '800px' }}>
      {/* Timeline dot with glow */}
      <div className="absolute left-4 top-6 hidden md:block">
        <div className="relative">
          <div className="flex h-5 w-5 items-center justify-center rounded-full ring-4 ring-[#080808]"
            style={{ background: exp.color + "25" }}>
            <div className="h-2 w-2 rounded-full"
              style={{ background: exp.color, boxShadow: `0 0 10px ${exp.color}` }} />
          </div>
          {hovered && (
            <div className="absolute inset-0 rounded-full animate-pulse"
              style={{ boxShadow: `0 0 20px ${exp.color}50` }} />
          )}
        </div>
      </div>

      <div
        ref={cardRef}
        {...handlers}
        onClick={() => setExpanded(!expanded)}
        className="flex-1 rounded-2xl p-6 transition-all duration-300 cursor-pointer relative overflow-hidden"
        style={{
          background: hovered
            ? `linear-gradient(135deg, ${exp.color}10, ${exp.color}05)`
            : "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
          border: `1px solid ${hovered ? exp.color + "35" : "rgba(255,255,255,0.06)"}`,
          boxShadow: hovered
            ? `0 20px 40px rgba(0,0,0,0.3), 0 0 40px ${exp.color}15`
            : "0 4px 24px rgba(0,0,0,0.15)",
          transform,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Glow blobs */}
        <div className="absolute -top-8 -right-8 h-20 w-20 rounded-full blur-3xl pointer-events-none transition-all duration-500"
          style={{ background: exp.color, opacity: hovered ? 0.2 : 0 }} />

        {/* Top row */}
        <div className="flex items-start gap-4 relative z-10">
          {exp.logo ? (
            /* Real product logo — soft at rest, neon on hover */
            <div className="relative h-12 w-12 shrink-0 transition-all duration-300"
              style={{ transform: hovered ? 'scale(1.08) rotate(3deg)' : 'scale(1)' }}>
              <span
                aria-hidden
                className="absolute -inset-1 rounded-2xl blur-md transition-opacity duration-500"
                style={{ background: `linear-gradient(135deg, ${exp.color}, #E879F9)`, opacity: hovered ? 0.7 : 0.35 }}
              />
              <span className="relative block h-12 w-12 overflow-hidden rounded-xl border"
                style={{
                  borderColor: `${exp.color}55`,
                  background: '#000',
                  boxShadow: `0 0 16px ${exp.color}40, inset 0 0 8px rgba(0,0,0,0.4)`,
                }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={exp.logo} alt={`${exp.org} logo`} className="h-full w-full object-cover" />
              </span>
            </div>
          ) : (
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-all duration-300"
              style={{
                background: `${exp.color}15`,
                boxShadow: hovered ? `0 0 20px ${exp.color}25` : 'none',
                transform: hovered ? 'scale(1.1) rotate(5deg)' : 'scale(1)',
              }}>
              <Icon size={24} strokeWidth={1.7} aria-hidden style={{ color: exp.color }} />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <h4 className="font-display text-lg font-bold text-heading">{exp.role}</h4>
              <div className="flex items-center gap-2">
                {/* Impact metric badge */}
                {hovered && (
                  <span className="hidden sm:inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold animate-fade-in"
                    style={{ background: `${exp.color}20`, color: exp.color }}>
                    <TrendingUp size={10} />
                    {exp.impact.metric} {exp.impact.label}
                  </span>
                )}
                <span className="font-mono text-xs" style={{ color: exp.color }}>{exp.period}</span>
              </div>
            </div>
            <div className="mt-1 flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
              <p className="font-mono text-sm" style={{ color: exp.color }}>{exp.org}</p>
              {exp.link && (
                <a
                  href={exp.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  title={exp.link}
                  aria-label={`Visit live platform — ${liveHost(exp.link)}`}
                  className="live-pill px-2.5 py-[3px] text-[10px]"
                >
                  <span className="live-dot" aria-hidden />
                  <span className="font-bold uppercase tracking-widest">Visit Live Platform</span>
                  <ExternalLink size={11} />
                </a>
              )}
            </div>
            <p className="mt-3 text-sm text-body leading-relaxed">{exp.desc}</p>

            {/* Skills tags */}
            <div className="mt-3 flex flex-wrap gap-1.5">
              {exp.skills.map(s => (
                <span key={s} className="rounded-full px-2.5 py-1 text-[10px] font-medium transition-all duration-300"
                  style={{
                    background: hovered ? `${exp.color}20` : `${exp.color}12`,
                    color: exp.color,
                    border: `1px solid ${hovered ? exp.color + '30' : 'transparent'}`,
                  }}>
                  {s}
                </span>
              ))}
            </div>

            {/* Expandable achievements */}
            {expanded && (
              <div className="mt-4 pt-4 border-t border-white/5 animate-slide-down">
                <div className="flex items-center gap-1.5 mb-2">
                  <Award size={12} style={{ color: exp.color }} />
                  <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: exp.color }}>Key Achievements</span>
                </div>
                <ul className="space-y-2">
                  {exp.achievements.map((a, ai) => (
                    <li key={ai} className="flex gap-2 text-xs text-body-light leading-relaxed">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full" style={{ background: exp.color }} />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Expand hint */}
            <div className="mt-3 text-[10px] font-mono transition-colors"
              style={{ color: hovered ? exp.color : 'transparent' }}>
              {expanded ? '▲ Click to collapse' : '▼ Click for achievements'}
            </div>
          </div>
        </div>

        {/* Bottom glow line */}
        <div className="absolute bottom-0 left-0 h-0.5 transition-all duration-500"
          style={{
            width: hovered ? '100%' : '0%',
            background: `linear-gradient(90deg, transparent, ${exp.color}, transparent)`,
            boxShadow: `0 0 10px ${exp.color}`,
          }}
        />
      </div>
    </div>
  )
}
