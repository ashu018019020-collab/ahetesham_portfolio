'use client'

import { useState } from 'react'
import Section from './Section'
import { useScrollReveal, useTilt } from '@/lib/hooks'
import { Icon as IconifyIcon } from '@iconify/react'
import { ChevronDown, type LucideIcon } from 'lucide-react'
import { SKILL_GROUPS, isBrandIcon, type SkillGroup, type SkillLogo } from '@/lib/data/skills'

const STATUS_META = {
  used: { label: 'Used in projects', dot: '#10b981' },
  learning: { label: 'Learning now', dot: '#f59e0b' },
} as const

export default function Skills() {
  return (
    <Section
      id='skills'
      title='Technical Skills'
      subtitle='Every technology I work with — honest about what I have shipped with and what I am actively learning. Click any skill for how I use it.'
      revealVariant='3d-right'
    >
      <Legend />
      <div className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3'>
        {SKILL_GROUPS.map((group, i) => (
          <SkillGroupCard key={group.title} group={group} index={i} />
        ))}
      </div>
    </Section>
  )
}

function Legend() {
  return (
    <div className='mb-8 flex flex-wrap items-center justify-center gap-5 text-xs text-[#94a3b8]'>
      {(Object.keys(STATUS_META) as Array<keyof typeof STATUS_META>).map((key) => (
        <span key={key} className='flex items-center gap-2'>
          <span
            className='inline-block h-2 w-2 rounded-full'
            style={{ background: STATUS_META[key].dot, boxShadow: `0 0 8px ${STATUS_META[key].dot}` }}
          />
          {STATUS_META[key].label}
        </span>
      ))}
    </div>
  )
}

function SkillGroupCard({ group, index }: { group: SkillGroup; index: number }) {
  const ref = useScrollReveal(index * 70)
  const { ref: cardRef, hovered, transform, handlers } = useTilt({ max: 5, scale: 1.01 })
  const [openSkill, setOpenSkill] = useState<string | null>(null)
  const usedCount = group.items.filter((s) => s.status === 'used').length

  return (
    <div ref={ref} className='reveal' style={{ perspective: '1000px' }}>
      <div
        ref={cardRef}
        {...handlers}
        className='flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-200'
        style={{
          transform,
          transformStyle: 'preserve-3d',
          background: hovered
            ? 'linear-gradient(160deg,rgba(255,255,255,.06),rgba(255,255,255,.02))'
            : 'linear-gradient(160deg,rgba(255,255,255,.035),rgba(255,255,255,.012))',
          border: `1px solid ${hovered ? group.accent + '40' : 'rgba(255,255,255,.08)'}`,
          boxShadow: hovered
            ? `0 24px 48px rgba(0,0,0,.3), 0 0 36px ${group.accent}14`
            : '0 4px 24px rgba(0,0,0,.15)',
        }}
      >
        {/* Tinted header */}
        <div
          className='flex items-start gap-3 border-b px-5 py-4'
          style={{
            borderColor: 'rgba(255,255,255,.06)',
            background: `linear-gradient(135deg, ${group.accent}14, transparent 70%)`,
          }}
        >
          <span
            className='mt-0.5 text-[11px] font-mono font-bold'
            style={{ color: group.accent }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          <div className='min-w-0 flex-1'>
            <h3 className='text-sm font-bold leading-tight text-[#f0f4ff]'>{group.title}</h3>
            <p className='mt-0.5 text-[11px] leading-snug text-[#64748b]'>{group.subtitle}</p>
          </div>
          <span
            className='shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold'
            style={{ background: group.accent + '18', color: group.accent }}
            title={`${usedCount} of ${group.items.length} used in projects`}
          >
            {usedCount}/{group.items.length}
          </span>
        </div>

        {/* Logo grid — every skill its own entry */}
        <div className='grid flex-1 grid-cols-2 gap-1.5 p-3 sm:grid-cols-3'>
          {group.items.map((skill) => (
            <SkillTile
              key={skill.name}
              skill={skill}
              accent={group.accent}
              expanded={openSkill === skill.name}
              onToggle={() => setOpenSkill(openSkill === skill.name ? null : skill.name)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function SkillTile({
  skill,
  accent,
  expanded,
  onToggle,
}: {
  skill: SkillLogo
  accent: string
  expanded: boolean
  onToggle: () => void
}) {
  const status = STATUS_META[skill.status]
  const icon = skill.icon
  const brandData = icon && isBrandIcon(icon) ? icon : undefined
  const LucideComponent = icon && !isBrandIcon(icon) ? icon : undefined

  return (
    <div
      role='button'
      tabIndex={0}
      aria-expanded={expanded}
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onToggle()
        }
      }}
      title={skill.detail || `${skill.name} — ${status.label}`}
      className='group relative flex cursor-pointer flex-col items-center gap-1.5 rounded-xl px-2 py-3 outline-none transition-all duration-200 focus-visible:ring-2 hover:bg-white/[.04]'
      style={{ border: `1px solid ${expanded ? accent + '45' : 'transparent'}` }}
    >
      {/* Status dot */}
      <span
        aria-label={status.label}
        className='absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full'
        style={{ background: status.dot, boxShadow: `0 0 6px ${status.dot}` }}
      />

      {brandData ? (
        <IconifyIcon
          icon={brandData}
          width={30}
          height={30}
          aria-hidden
          className='transition-transform duration-200 group-hover:scale-110'
        />
      ) : LucideComponent ? (
        <LucideComponent
          size={30}
          strokeWidth={1.7}
          aria-hidden
          className='transition-transform duration-200 group-hover:scale-110'
          style={{ color: skill.tint || accent }}
        />
      ) : (
        <span
          aria-hidden
          className='flex h-[30px] w-[30px] items-center justify-center rounded-lg text-[10px] font-bold transition-transform duration-200 group-hover:scale-110'
          style={{ background: (skill.tint || accent) + '1f', color: skill.tint || accent }}
        >
          {skill.fallback}
        </span>
      )}

      <span className='text-center text-[10.5px] font-medium leading-tight text-[#94a3b8] transition-colors duration-200 group-hover:text-[#f0f4ff]'>
        {skill.name}
      </span>

      {/* Expand row — detail preserved from the old skill cards */}
      {expanded && skill.detail && (
        <div
          className='mt-1 w-full border-t px-1 pt-2 text-left text-[10px] leading-relaxed text-[#8b98b8]'
          style={{ borderColor: 'rgba(255,255,255,.07)' }}
        >
          {skill.detail}
        </div>
      )}
    </div>
  )
}
