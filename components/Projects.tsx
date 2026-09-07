'use client'

import Section from './Section'
import { useState, useEffect, useRef } from 'react'
import { GithubIcon } from './Icons'
import { CONTACT } from '@/lib/constants'

const projects = [
  {
    id: 1,
    title: 'Agentic AI Automation Workflow',
    tag: 'AUTOMATION',
    tagColor: 'from-orange-500 to-amber-500',
    year: '2024-25',
    role: 'AI Automation Engineer',
    description: 'End-to-end agentic automation with LLM agents. Multi-step workflows with conditional branching and autonomous decision-making that replaces manual operational tasks.',
    highlights: ['Multi-step workflows with conditional branching', 'Reduced manual intervention by ~60%', 'Real-time webhook triggers & API integrations', 'Autonomous error handling with retry logic'],
    tags: ['n8n', 'LLM Agents', 'Webhooks', 'REST APIs', 'Python'],
    metrics: [
      { value: '60%', label: 'Less manual work' },
      { value: '24/7', label: 'Auto execution' },
      { value: '10+', label: 'Integrated APIs' },
    ],
    architecture: [
      { name: 'Orchestration', detail: 'n8n workflow engine with LLM-driven branching' },
      { name: 'Agent Layer', detail: 'OpenAI-powered reasoning for decisions' },
      { name: 'Connectivity', detail: 'Webhooks + REST for real-time triggers' },
    ],
    outcome: 'Cut manual ops hours drastically and enabled fully autonomous, error-resilient business workflows.',
    code: '#',
    icon: '🤖',
    gradient: 'from-orange-600/20 to-amber-600/10',
    accent: 'orange',
    workflow: [
      { step: 'Webhook', icon: '📧', desc: 'Trigger' },
      { step: 'Parse', icon: '📦', desc: 'Extract data' },
      { step: 'AI Agent', icon: '🧠', desc: 'LLM reasoning' },
      { step: 'Decision', icon: '🔄', desc: 'Route flow' },
      { step: 'Execute', icon: '⚡', desc: 'Action' },
    ],
  },
  {
    id: 2,
    title: 'AI-Powered Professional Chatbot',
    tag: 'NLP',
    tagColor: 'from-purple-500 to-pink-500',
    year: '2024-25',
    role: 'Backend AI Developer',
    description: 'Production chatbot with Python/Flask and NLP. MySQL/SQLite chat history persistence with SpaCy and Transformers for intelligent intent routing and natural responses.',
    highlights: ['SpaCy tokenization & intent detection', 'MySQL conversation history persistence', 'Transformer-based response generation', 'Context-aware multi-turn conversations'],
    tags: ['Python', 'Flask', 'NLP', 'SpaCy', 'Transformers', 'SQL'],
    metrics: [
      { value: '95%', label: 'Intent accuracy' },
      { value: '1.2s', label: 'Avg response' },
      { value: '1k+', label: 'Sessions stored' },
    ],
    architecture: [
      { name: 'API Layer', detail: 'Flask REST endpoints for query/response' },
      { name: 'NLP Engine', detail: 'SpaCy parsing + Transformer intent routing' },
      { name: 'Persistence', detail: 'MySQL/SQLite chat history with context' },
    ],
    outcome: 'Delivered a fast, production-grade assistant that remembers context across conversations and routes intents with high accuracy.',
    code: '#',
    icon: '💬',
    gradient: 'from-purple-600/20 to-pink-600/10',
    accent: 'purple',
    workflow: [
      { step: 'Query', icon: '👤', desc: 'User input' },
      { step: 'Interface', icon: '🌐', desc: 'Flask API' },
      { step: 'NLP', icon: '🔬', desc: 'SpaCy parse' },
      { step: 'LLM', icon: '🧠', desc: 'Transformers' },
      { step: 'Response', icon: '✅', desc: 'Output' },
    ],
  },
  {
    id: 3,
    title: 'Power BI Analytics Dashboard',
    tag: 'DATA VIZ',
    tagColor: 'from-emerald-500 to-teal-500',
    year: '2024',
    role: 'Data Analyst',
    description: 'Interactive Power BI dashboards for business intelligence reporting. Built data models with DAX calculations and visualization best practices for decision-ready insights.',
    highlights: ['Interactive DAX-powered dashboards', 'Automated report refresh pipelines', 'Cross-functional business insights', 'Drill-through & filterable KPI views'],
    tags: ['Power BI', 'DAX', 'Data Modeling', 'SQL', 'Visualization'],
    metrics: [
      { value: '15+', label: 'Dashboards built' },
      { value: '40%', label: 'Faster reporting' },
      { value: '8+', label: 'Data sources' },
    ],
    architecture: [
      { name: 'Data Layer', detail: 'SQL extraction with scheduled refresh' },
      { name: 'Modeling', detail: 'Star-schema + DAX calculated measures' },
      { name: 'Visual Layer', detail: 'Interactive KPI, trend & drill-down views' },
    ],
    outcome: 'Turned raw business data into interactive dashboards, cutting reporting time and giving stakeholders real-time visibility.',
    code: '#',
    icon: '📊',
    gradient: 'from-emerald-600/20 to-teal-600/10',
    accent: 'emerald',
    workflow: [
      { step: 'Extract', icon: '🗄️', desc: 'SQL sources' },
      { step: 'Transform', icon: '🔧', desc: 'Clean data' },
      { step: 'Model', icon: '📐', desc: 'DAX models' },
      { step: 'Visualize', icon: '📈', desc: 'Dashboard' },
      { step: 'Insight', icon: '💡', desc: 'Report' },
    ],
  },
]

function WorkflowPipeline({ steps, accent, isHovered, activeStep }: { steps: any[], accent: string, isHovered: boolean, activeStep: number }) {
  const progress = Math.round(((activeStep + 1) / steps.length) * 100)

  return (
    <div className="mt-5 pt-5 border-t border-white/5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
          <span className="text-[10px] font-mono text-orange-400/70 uppercase tracking-widest">Live Pipeline</span>
        </div>
        <span className="text-[9px] font-mono text-white/30">
          STEP {String(activeStep + 1).padStart(2, '0')}/{String(steps.length).padStart(2, '0')}
        </span>
      </div>

      {/* Grid — every step always fully visible, no scroll */}
      <div className="grid grid-cols-5 gap-1.5">
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
                  background: isActive ? 'rgba(255,69,0,.15)' : isPassed ? 'rgba(255,69,0,.05)' : 'rgba(255,255,255,.03)',
                  borderColor: isActive ? 'rgba(255,69,0,.55)' : isPassed ? 'rgba(255,69,0,.18)' : 'rgba(255,255,255,.07)',
                  boxShadow: isActive ? '0 0 25px rgba(255,69,0,.25), inset 0 0 12px rgba(255,69,0,.08)' : 'none',
                }}
              >
                {isActive && <div className="absolute inset-0 rounded-xl border border-[#FF4500]/25 animate-ping" style={{animationDuration:'2s'}} />}
                <span className="text-sm leading-none mb-1">{s.icon}</span>
                <span
                  className="text-[9px] font-bold leading-tight whitespace-nowrap sm:text-[10px]"
                  style={{ color: isActive ? '#FF8C00' : isPassed ? '#FF4500' : '#64748b' }}
                >
                  {s.step}
                </span>
                <span className="mt-0.5 text-[7px] leading-tight text-white/30 whitespace-nowrap sm:text-[8px]">{s.desc}</span>
                {isActive && (
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-[2px] rounded-full bg-gradient-to-r from-transparent via-[#FF4500] to-transparent" style={{boxShadow:'0 0 8px #FF4500'}} />
                )}
              </div>
              {/* Arrow overlay — no layout width, always fits */}
              {i < steps.length - 1 && (
                <div className="pointer-events-none absolute top-1/2 -right-[7px] z-10 -translate-y-1/2">
                  <span className="text-[9px]" style={{ color: isPassed || isActive ? '#FF4500' : '#334155' }}>▶</span>
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
            className="h-full rounded-full bg-gradient-to-r from-[#FF4500] to-[#FF8C00] transition-all duration-700"
            style={{ width: `${progress}%`, boxShadow: '0 0 10px rgba(255,69,0,.5)' }}
          />
        </div>
        <span className="text-[9px] font-mono text-orange-400/70">{progress}%</span>
      </div>
    </div>
  )
}

function ProjectCard({ project, index }: { project: any, index: number }) {
  const [isHovered, setIsHovered] = useState(false)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [activeStep, setActiveStep] = useState(0)
  const cardRef = useRef<HTMLDivElement>(null)

  // Running pipeline animation — auto-advances even without hover so it's always alive
  useEffect(() => {
    const iv = setInterval(() => {
      setActiveStep(p => (p + 1) % project.workflow.length)
    }, isHovered ? 800 : 1400)
    return () => clearInterval(iv)
  }, [isHovered, project.workflow.length])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    setTilt({ x: (y - 0.5) * -8, y: (x - 0.5) * 8 })
  }

  return (
    <div ref={cardRef} className="group flex">
      <div
        className={`relative flex-1 overflow-hidden rounded-2xl border transition-all duration-500 cursor-pointer ${
          isHovered
            ? 'border-orange-500/40 shadow-[0_0_40px_rgba(255,69,0,0.15)] scale-[1.01]'
            : 'border-white/[0.06] hover:border-orange-500/20'
        }`}
        style={{
          background: isHovered
            ? 'linear-gradient(135deg, rgba(255,69,0,0.08), rgba(0,0,0,0.4))'
            : 'linear-gradient(135deg, rgba(255,255,255,0.03), rgba(0,0,0,0.3))',
          transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transformStyle: 'preserve-3d',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => { setIsHovered(false); setTilt({ x: 0, y: 0 }) }}
        onMouseMove={handleMouseMove}
      >
        {/* Ambient glow */}
        <div className={`absolute -inset-1 bg-gradient-to-br ${project.gradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl`} />

        <div className="relative p-6 lg:p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${project.tagColor} flex items-center justify-center text-3xl shadow-lg transition-all duration-300 ${isHovered ? 'scale-115 rotate-3 shadow-[0_0_20px_rgba(255,69,0,0.3)]' : ''}`}>
                {project.icon}
              </div>
              <div>
                <div className={`text-[10px] font-mono uppercase tracking-widest bg-gradient-to-r ${project.tagColor} bg-clip-text text-transparent font-bold`}>
                  [{project.tag}]
                </div>
                <h3 className="text-white font-bold text-xl mt-0.5">{project.title}</h3>
                <div className="flex items-center gap-2 mt-1 text-[10px] text-white/35 font-mono">
                  <span className="text-orange-400">●</span>
                  {project.role}
                </div>
              </div>
            </div>
            <span className="text-white/30 text-xs font-mono mt-1 px-2 py-1 rounded-lg bg-white/[0.03] border border-white/[0.06]">{project.year}</span>
          </div>

          {/* Description */}
          <p className="text-white/50 text-sm leading-relaxed mb-4">{project.description}</p>

          {/* Highlights */}
          <ul className="space-y-2 mb-4">
            {project.highlights.map((h: string, i: number) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-white/60">
                <span className="text-orange-500 mt-1.5 text-[6px]">●</span>
                <span>{h}</span>
              </li>
            ))}
          </ul>

          {/* Impact metrics */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            {project.metrics.map((m: any, i: number) => (
              <div
                key={i}
                className={`rounded-xl border px-3 py-2.5 text-center transition-all duration-300 ${
                  isHovered ? 'border-orange-500/25 bg-orange-500/5' : 'border-white/[0.06] bg-white/[0.02]'
                }`}
              >
                <div className="text-lg font-bold text-white">{m.value}</div>
                <div className="text-[9px] text-white/40 uppercase tracking-wider mt-0.5">{m.label}</div>
              </div>
            ))}
          </div>

          {/* Architecture */}
          <div className="mb-4 space-y-2">
            {project.architecture.map((a: any, i: number) => (
              <div key={i} className="flex items-start gap-2.5 text-xs">
                <span className="shrink-0 mt-0.5 font-mono text-[10px] text-orange-400/80 border border-orange-500/20 rounded px-1.5 py-0.5 bg-orange-500/5">
                  {a.name}
                </span>
                <span className="text-white/45 leading-relaxed">{a.detail}</span>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((t: string, i: number) => (
              <span
                key={i}
                className={`px-3 py-1 rounded-full text-xs font-mono border transition-all duration-300 ${
                  isHovered ? 'border-orange-500/30 text-orange-300 bg-orange-500/10' : 'border-white/10 text-white/50 bg-white/[0.03]'
                }`}
              >
                {t}
              </span>
            ))}
          </div>

          {/* Mini workflow pipeline - with running animation */}
          <WorkflowPipeline steps={project.workflow} accent={project.accent} isHovered={isHovered} activeStep={activeStep} />

          {/* Outcome */}
          <div className={`mt-4 rounded-xl border px-4 py-3 flex items-start gap-2.5 transition-all duration-300 ${
            isHovered ? 'border-emerald-500/25 bg-emerald-500/5' : 'border-white/[0.06] bg-white/[0.02]'
          }`}>
            <span className="mt-0.5 text-emerald-400">✦</span>
            <p className="text-xs text-white/50 leading-relaxed">{project.outcome}</p>
          </div>

          {/* Bottom row */}
          <div className="flex items-center justify-between mt-5">
            <a
              href={CONTACT.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white/40 hover:text-orange-400 transition-colors text-sm group/link"
            >
              <GithubIcon size={18} />
              <span className="group-hover/link:underline">Code</span>
            </a>
            <div className="flex items-center gap-1.5 text-[10px] text-white/20">
              <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono">DEPLOYED</span>
            </div>
          </div>
        </div>

        {/* Corner accents */}
        <div className={`absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 rounded-tl-2xl transition-colors duration-300 ${isHovered ? 'border-orange-500/60' : 'border-white/5'}`} />
        <div className={`absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 rounded-tr-2xl transition-colors duration-300 ${isHovered ? 'border-orange-500/60' : 'border-white/5'}`} />
        <div className={`absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 rounded-bl-2xl transition-colors duration-300 ${isHovered ? 'border-orange-500/60' : 'border-white/5'}`} />
        <div className={`absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 rounded-br-2xl transition-colors duration-300 ${isHovered ? 'border-orange-500/60' : 'border-white/5'}`} />
      </div>
    </div>
  )
}

export default function Projects() {
  return (
    <Section id='projects' title='Projects' subtitle='Selected work demonstrating end-to-end AI system design.' revealVariant='3d-up'>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </Section>
  )
}