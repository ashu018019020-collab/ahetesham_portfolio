'use client'

import { useState } from 'react'
import { useScrollReveal } from '@/lib/hooks'
import { Lightbulb, Search, Zap, MessageSquare, Users, Shield, RefreshCw, Eye } from 'lucide-react'

const softSkills = [
  { name: "Analytical Thinking", icon: Lightbulb, color: "#f59e0b", emoji: "🧠", desc: "Breaking down complex problems into logical components" },
  { name: "Problem-Solving", icon: Search, color: "#10b981", emoji: "🔍", desc: "Finding creative solutions to technical challenges" },
  { name: "Quick Learner", icon: Zap, color: "#8b5cf6", emoji: "⚡", desc: "Rapidly adapting to new technologies and frameworks" },
  { name: "Effective Communication", icon: MessageSquare, color: "#FF4500", emoji: "💬", desc: "Clearly conveying technical concepts to all stakeholders" },
  { name: "Team Collaboration", icon: Users, color: "#FF8C00", emoji: "🤝", desc: "Working effectively with cross-functional teams" },
  { name: "Ownership & Accountability", icon: Shield, color: "#ec4899", emoji: "🛡️", desc: "Taking responsibility for deliverables and outcomes" },
  { name: "Adaptability", icon: RefreshCw, color: "#14b8a6", emoji: "🔄", desc: "Thriving in dynamic environments with changing requirements" },
  { name: "Detail-Oriented", icon: Eye, color: "#f43f5e", emoji: "👁️", desc: "Maintaining precision and accuracy in all work" },
]

export default function SoftSkills() {
  return (
    <section id="soft-skills" className="relative py-20 px-4">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="section-title mb-4">Soft Skills</h2>
          <p className="mx-auto max-w-2xl text-body-light">Essential interpersonal and cognitive abilities that drive effective collaboration and continuous growth.</p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {softSkills.map((skill, i) => (<SoftSkillCard key={skill.name} skill={skill} i={i} />))}
        </div>
      </div>
    </section>
  )
}

function SoftSkillCard({ skill, i }: { skill: typeof softSkills[0]; i: number }) {
  const ref = useScrollReveal(i * 100)
  const [hovered, setHovered] = useState(false)
  const Icon = skill.icon
  return (
    <div
      ref={ref}
      className="reveal-3d-left group relative overflow-hidden rounded-2xl p-6 transition-all duration-500 cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "linear-gradient(135deg, " + skill.color + "15, " + skill.color + "08)" : "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
        border: "1px solid " + (hovered ? skill.color + "40" : "rgba(255,255,255,0.06)"),
        boxShadow: hovered ? "0 20px 40px rgba(0,0,0,0.3), 0 0 40px " + skill.color + "15" : "0 4px 24px rgba(0,0,0,0.15)",
        transform: hovered ? "translateY(-8px) scale(1.02)" : "none"
      }}
    >
      <div className="absolute -top-10 -right-10 h-24 w-24 rounded-full opacity-0 transition-all duration-700 group-hover:opacity-20 blur-3xl" style={{ background: skill.color }} />
      <div className="relative z-10 text-center">
        <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6" style={{ background: skill.color + "20" }}>
          <span className="text-3xl" style={{ transform: hovered ? "scale(1.2)" : "scale(1)", transition: "transform 0.3s" }}>{skill.emoji}</span>
        </div>
        <h3 className="mb-2 font-display text-lg font-bold text-heading">{skill.name}</h3>
        <p className="text-xs text-body-light leading-relaxed">{skill.desc}</p>
      </div>
    </div>
  )
}