'use client'

import Section from './Section'
import { useScrollReveal, useTilt } from '@/lib/hooks'
import { SOFT_SKILLS, type SoftSkill } from '@/lib/data/skills'
export default function SoftSkills() {
  return (
    <Section id="soft-skills" title="Soft Skills" subtitle="Essential interpersonal and cognitive abilities that drive effective collaboration and continuous growth.">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {SOFT_SKILLS.map((skill, i) => (<SoftSkillCard key={skill.name} skill={skill} i={i} />))}
      </div>
    </Section>
  )
}

function SoftSkillCard({ skill, i }: { skill: SoftSkill; i: number }) {
  const ref = useScrollReveal(i * 100)
  const { ref: cardRef, hovered, transform, handlers } = useTilt({ max: 0, lift: 8, scale: 1.02 })
  const Icon = skill.icon

  return (
    <div
      ref={ref}
      className="reveal-3d-left group relative overflow-hidden rounded-2xl p-6 transition-all duration-500 cursor-pointer"
      style={{
        background: hovered ? "linear-gradient(135deg, " + skill.color + "15, " + skill.color + "08)" : "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
        border: "1px solid " + (hovered ? skill.color + "40" : "rgba(255,255,255,0.06)"),
        boxShadow: hovered ? "0 20px 40px rgba(0,0,0,0.3), 0 0 40px " + skill.color + "15" : "0 4px 24px rgba(0,0,0,0.15)",
        transform,
      }}
      {...handlers}
    >
      <div className="absolute -top-10 -right-10 h-24 w-24 rounded-full opacity-0 transition-all duration-700 group-hover:opacity-20 blur-3xl" style={{ background: skill.color }} />
      <div className="relative z-10 text-center">
        <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6" style={{ background: skill.color + "20" }}>
          <Icon size={30} strokeWidth={1.7} aria-hidden
            style={{
              color: skill.color,
              transform: hovered ? "scale(1.2)" : "scale(1)",
              transition: "transform 0.3s, filter 0.3s",
              filter: hovered ? `drop-shadow(0 0 10px ${skill.color}80)` : "none",
            }} />
        </div>
        <h3 className="mb-2 font-display text-lg font-bold text-heading">{skill.name}</h3>
        <p className="text-xs text-body-light leading-relaxed">{skill.desc}</p>
      </div>
    </div>
  )
}
