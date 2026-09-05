'use client'

import { useState, useRef, useEffect } from 'react'
import Section from './Section'
import { useScrollReveal } from '@/lib/hooks'
import { Bot, Sparkles, Code, Layers, Brain, Database, Cloud, Zap, ChevronRight } from 'lucide-react'

const highlights = [
  { icon: Brain, label: 'Machine Learning', color: '#FF4500', desc: 'Predictive models & pattern recognition' },
  { icon: Sparkles, label: 'Generative AI', color: '#8b5cf6', desc: 'LLMs, content generation & Q&A systems' },
  { icon: Bot, label: 'Agentic AI', color: '#FF8C00', desc: 'Autonomous agents & multi-step workflows' },
  { icon: Code, label: 'NLP & Deep Learning', color: '#10b981', desc: 'Transformers, embeddings & neural networks' },
  { icon: Database, label: 'Data Science', color: '#f59e0b', desc: 'SQL, EDA, Power BI dashboards & analytics' },
  { icon: Zap, label: 'Automation', color: '#ef4444', desc: 'n8n, webhooks & REST API integrations' },
  { icon: Cloud, label: 'Cloud & MLOps', color: '#ec4899', desc: 'AWS, Docker & deployment pipelines' },
  { icon: Layers, label: 'Python & Flask', color: '#6366f1', desc: 'Full-stack AI application development' },
]

const workflowSteps = [
  { icon: '🗄️', label: 'Data Sources', color: '#FF4500', detail: 'SQL, APIs, CSV files' },
  { icon: '🐍', label: 'Python', color: '#10b981', detail: 'Pandas, NumPy, Scikit' },
  { icon: '🧹', label: 'Data Cleaning', color: '#FF8C00', detail: 'Missing values, outliers' },
  { icon: '🔍', label: 'EDA', color: '#8b5cf6', detail: 'Patterns, correlations' },
  { icon: '🤖', label: 'ML / DL', color: '#FF4500', detail: 'Train & evaluate models' },
  { icon: '✨', label: 'GenAI / LLM', color: '#f59e0b', detail: 'OpenAI, Gemini, LangChain' },
  { icon: '🧠', label: 'Agentic AI', color: '#ef4444', detail: 'Autonomous reasoning' },
  { icon: '🔗', label: 'APIs & n8n', color: '#ec4899', detail: 'REST, webhooks, flows' },
  { icon: '☁️', label: 'AWS / Docker', color: '#6366f1', detail: 'Containerized deploy' },
  { icon: '🚀', label: 'Deploy', color: '#FF8C00', detail: 'Production live' },
]

export default function About() {
  const ref = useScrollReveal(80)
  const [particlePos, setParticlePos] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const iv = setInterval(() => setParticlePos(p => (p + 1) % workflowSteps.length), 1800)
    return () => clearInterval(iv)
  }, [])

  const handleMouse = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 12,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * -12
    })
  }

  return (
    <Section id='about' title='About Me' subtitle='AI Engineer & Data Scientist — B.Tech CSE, 2025' revealVariant='3d-up'>
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
              AI Engineer and Data Scientist (B.Tech CSE, 2025) specializing in Machine Learning, Deep Learning, NLP, Generative AI, and Agentic AI. Proven ability to build end-to-end AI systems using Python, Flask, REST APIs, and LLM integrations. Skilled across the full data lifecycle — from SQL-based data extraction and Python-driven EDA to Power BI dashboard development and predictive modeling. Hands-on experience with automation workflows using n8n, MLOps practices, and cloud platforms. Seeking an entry-level AI Engineer or Data Scientist role to deliver impactful, data-driven solutions and scalable AI automation systems.
            </p>
            <div className="mt-6 relative z-10">
              <a href="#experience" className="group inline-flex items-center gap-2 font-mono text-sm font-medium text-primary-light transition-all hover:text-primary hover:gap-3">
                Read About Me
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
            </div>
          </div>

          {/* Right - 8 Highlight Cards with 3D tilt */}
          <div className="grid grid-cols-2 gap-3">
            {highlights.map((hl, i) => {
              const Icon = hl.icon
              return (
                <HighlightCard key={hl.label} hl={hl} Icon={Icon} index={i} />
              )
            })}
          </div>
        </div>

        {/* 3D Workflow Pipeline with Running Animation */}
        <div className="mt-16" ref={containerRef}>
          <h4 className="mb-2 text-center font-display text-lg font-bold text-heading">
            <span className="text-gradient">Complete AI Engineer Pipeline</span>
          </h4>
          <p className="mb-8 text-center text-xs text-body-light">From data to deployment — every stage of the AI workflow</p>

          <div
            className="relative rounded-2xl p-6 md:p-8 overflow-hidden"
            onMouseMove={handleMouse}
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))",
              border: "1px solid rgba(255,255,255,0.06)",
              perspective: "800px",
              transform: `rotateX(${mousePos.y * 0.3}deg) rotateY(${mousePos.x * 0.3}deg)`
            }}
          >
            {/* Background glow */}
            <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
              <div className="absolute top-1/2 left-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
              {/* Running light beam */}
              <div className="absolute top-0 left-0 h-full w-32 animate-pipeline-glow"
                style={{
                  background: `linear-gradient(90deg, transparent, ${workflowSteps[particlePos]?.color || '#FF4500'}20, transparent)`,
                }}
              />
            </div>

            {/* Step counter */}
            <div className="absolute top-3 right-4 flex items-center gap-2 z-20">
              <span className="text-[10px] font-mono text-body-light/50">STEP</span>
              <span className="text-xs font-mono font-bold" style={{ color: workflowSteps[particlePos]?.color }}>
                {String(particlePos + 1).padStart(2, '0')}/{String(workflowSteps.length).padStart(2, '0')}
              </span>
            </div>

            <div className="relative z-10 flex flex-wrap items-center justify-center gap-2 md:gap-1">
              {workflowSteps.map((step, i) => {
                const isActive = i === particlePos
                const isPast = i < particlePos
                return (
                  <span key={i} className="flex items-center gap-1">
                    <div
                      className="relative flex flex-col items-center gap-1 rounded-xl px-2.5 py-2 md:px-3 md:py-2.5 transition-all duration-500"
                      style={{
                        background: isActive
                          ? `linear-gradient(135deg, ${step.color}30, ${step.color}12)`
                          : isPast
                            ? `${step.color}0a`
                            : "rgba(255,255,255,0.03)",
                        border: `1px solid ${isActive ? step.color + "60" : isPast ? step.color + "20" : "rgba(255,255,255,0.06)"}`,
                        boxShadow: isActive
                          ? `0 0 30px ${step.color}40, 0 0 60px ${step.color}15, inset 0 0 20px ${step.color}10`
                          : "none",
                        transform: isActive ? "scale(1.1) translateY(-2px)" : "scale(1)"
                      }}
                    >
                      {/* Glow ring for active */}
                      {isActive && (
                        <div className="absolute inset-0 rounded-xl animate-pulse-ring pointer-events-none"
                          style={{ border: `2px solid ${step.color}40` }} />
                      )}
                      <span className="text-base md:text-lg">{step.icon}</span>
                      <span className="hidden text-[10px] font-bold md:inline"
                        style={{ color: isActive ? step.color : isPast ? "#94a3b8" : "#475569" }}>
                        {step.label}
                      </span>
                      {/* Detail text for active step */}
                      {isActive && step.detail && (
                        <span className="hidden md:block text-[8px] text-center max-w-[90px] leading-tight"
                          style={{ color: `${step.color}99` }}>
                          {step.detail}
                        </span>
                      )}
                      {isActive && (
                        <div className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full animate-pulse"
                          style={{ background: step.color, boxShadow: `0 0 10px ${step.color}` }} />
                      )}
                    </div>
                    {i < workflowSteps.length - 1 && (
                      <div className="hidden md:flex items-center">
                        {/* Animated connector line */}
                        <div className="relative w-6 h-0.5" style={{ background: `${isPast ? step.color + '40' : 'rgba(255,255,255,0.08)'}` }}>
                          {isPast && (
                            <div className="absolute inset-0 animate-connector-flow"
                              style={{ background: `linear-gradient(90deg, ${step.color}, transparent)` }} />
                          )}
                        </div>
                        <ChevronRight size={10} className="transition-colors duration-500"
                          style={{ color: isPast ? step.color + "80" : "#334155" }} />
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
                  width: `${((particlePos + 1) / workflowSteps.length) * 100}%`,
                  background: `linear-gradient(90deg, ${workflowSteps[0].color}, ${workflowSteps[particlePos].color})`,
                  boxShadow: `0 0 10px ${workflowSteps[particlePos].color}60`,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes animate-pipeline-glow {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(calc(100vw + 100%)); }
        }
        @keyframes pulse-ring {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        @keyframes connector-flow {
          0% { transform: scaleX(0); transform-origin: left; }
          100% { transform: scaleX(1); transform-origin: left; }
        }
        .animate-pipeline-glow {
          animation: animate-pipeline-glow 4s linear infinite;
        }
        .animate-pulse-ring {
          animation: pulse-ring 1.5s ease-in-out infinite;
        }
        .animate-connector-flow {
          animation: connector-flow 0.5s ease-out forwards;
        }
      `}</style>
    </Section>
  )
}

function HighlightCard({ hl, Icon, index }: { hl: typeof highlights[0]; Icon: any; index: number }) {
  const ref = useScrollReveal(index * 60)
  const [hovered, setHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setTilt({
      x: ((e.clientY - rect.top) / rect.height - 0.5) * -15,
      y: ((e.clientX - rect.left) / rect.width - 0.5) * 15
    })
  }

  return (
    <div ref={ref} className="reveal" style={{ perspective: '600px' }}>
      <div
        ref={cardRef}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }) }}
        onMouseMove={handleMouseMove}
        className="group relative overflow-hidden rounded-xl p-4 transition-all duration-300 cursor-pointer"
        style={{
          background: hovered ? `linear-gradient(135deg, ${hl.color}18, ${hl.color}08)` : "rgba(255,255,255,0.03)",
          border: `1px solid ${hovered ? hl.color + "40" : "rgba(255,255,255,0.06)"}`,
          boxShadow: hovered ? `0 12px 40px ${hl.color}20, 0 0 30px ${hl.color}10` : "0 2px 10px rgba(0,0,0,0.1)",
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${hovered ? 1.04 : 1})`,
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
            <Icon size={20} style={{
              color: hl.color,
              filter: hovered ? `drop-shadow(0 0 8px ${hl.color})` : 'none',
              transition: 'filter 0.3s',
            }} />
          </div>
          <p className="text-xs font-bold text-heading">{hl.label}</p>
          <p className="mt-1 text-[10px] leading-relaxed text-body-light">{hl.desc}</p>
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
