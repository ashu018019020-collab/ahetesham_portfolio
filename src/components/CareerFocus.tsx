'use client'

import { useState, useRef, useEffect } from 'react'
import { useScrollReveal } from '@/lib/hooks'
import { ChevronDown, X, ArrowRight } from 'lucide-react'

const careers = [
  {
    emoji: '🤖',
    title: 'AI Engineering',
    desc: 'Building intelligent systems, automation workflows, and AI-powered applications that solve real-world problems and enhance business efficiency.',
    color: '#FF4500',
    details: [
      'End-to-end AI system design and deployment',
      'Machine learning model training & evaluation',
      'REST API development for AI services',
      'Real-time inference pipelines',
    ],
    tools: ['Python', 'TensorFlow', 'Flask', 'Docker', 'AWS'],
    workflow: [
      { icon: '📋', label: 'Problem Definition', detail: 'Identify business requirements & data availability' },
      { icon: '🗄️', label: 'Data Collection', detail: 'Gather, clean & preprocess datasets' },
      { icon: '🤖', label: 'Model Training', detail: 'Select algorithms, train & tune hyperparameters' },
      { icon: '📊', label: 'Evaluation', detail: 'Test accuracy, precision, recall & F1 score' },
      { icon: '🚀', label: 'Deployment', detail: 'Containerize model & deploy to production' },
    ],
  },
  {
    emoji: '🧬',
    title: 'Generative AI & LLMs',
    desc: 'Developing applications powered by Large Language Models, creating chatbots, content generation systems, and agentic AI workflows.',
    color: '#8b5cf6',
    details: [
      'Prompt engineering & chain-of-thought reasoning',
      'RAG (Retrieval Augmented Generation) pipelines',
      'Fine-tuning open-source LLMs',
      'Multi-modal AI applications',
    ],
    tools: ['OpenAI API', 'Gemini', 'LangChain', 'Hugging Face', 'RAG'],
    workflow: [
      { icon: '📝', label: 'Prompt Design', detail: 'Craft effective prompts with few-shot examples' },
      { icon: '📚', label: 'Context Retrieval', detail: 'RAG pipeline fetches relevant documents' },
      { icon: '🧠', label: 'LLM Processing', detail: 'Model generates contextual response' },
      { icon: '✅', label: 'Validation', detail: 'Fact-check & format output for accuracy' },
      { icon: '🔗', label: 'Integration', detail: 'Embed into production application flow' },
    ],
  },
  {
    emoji: '📊',
    title: 'Data Science & Analytics',
    desc: 'Transforming raw data into actionable insights through statistical analysis, predictive modeling, and interactive dashboard development.',
    color: '#10b981',
    details: [
      'Exploratory Data Analysis (EDA) & statistics',
      'Power BI dashboard development with DAX',
      'Predictive modeling & time-series forecasting',
      'A/B testing & hypothesis validation',
    ],
    tools: ['Python', 'Pandas', 'NumPy', 'Power BI', 'SQL', 'Tableau'],
    workflow: [
      { icon: '🗄️', label: 'Data Extraction', detail: 'SQL queries to pull data from databases' },
      { icon: '🧹', label: 'Cleaning', detail: 'Handle missing values, outliers & duplicates' },
      { icon: '🔍', label: 'EDA', detail: 'Statistical analysis & pattern discovery' },
      { icon: '📈', label: 'Visualization', detail: 'Interactive charts & Power BI dashboards' },
      { icon: '💡', label: 'Insights', detail: 'Actionable recommendations for stakeholders' },
    ],
  },
  {
    emoji: '🧠',
    title: 'Agentic AI',
    desc: 'Designing autonomous AI agents that reason, plan, and execute complex multi-step tasks with minimal human intervention using LLM-powered decision frameworks.',
    color: '#FF8C00',
    details: [
      'Multi-step reasoning & planning',
      'Tool-use & function calling',
      'Memory management for long conversations',
      'Self-correcting & reflective agents',
    ],
    tools: ['n8n', 'LLM Agents', 'APIs', 'Webhooks', 'Python'],
    workflow: [
      { icon: '🎯', label: 'Goal Setting', detail: 'Define objective & success criteria' },
      { icon: '🧠', label: 'Reasoning', detail: 'LLM decomposes goal into subtasks' },
      { icon: '🔧', label: 'Tool Selection', detail: 'Choose APIs, databases & services' },
      { icon: '⚡', label: 'Execution', detail: 'Agent performs actions autonomously' },
      { icon: '🔄', label: 'Reflection', detail: 'Self-evaluate & retry if needed' },
    ],
  },
  {
    emoji: '⚙️',
    title: 'Automation Agent AI Workflow',
    desc: 'Building end-to-end intelligent automation workflows using n8n, webhooks, and API integrations to streamline business processes.',
    color: '#ec4899',
    details: [
      'Visual workflow orchestration with n8n',
      'Multi-step conditional branching',
      'Error handling & retry logic',
      'Cross-platform API orchestration',
    ],
    tools: ['n8n', 'Webhooks', 'REST APIs', 'Zapier', 'Python'],
    workflow: [
      { icon: '📩', label: 'Trigger', detail: 'Webhook or scheduled event fires' },
      { icon: '🔀', label: 'Data Parse', detail: 'Extract & validate incoming payload' },
      { icon: '🧠', label: 'AI Processing', detail: 'LLM agent reasons about data' },
      { icon: '🔗', label: 'API Calls', detail: 'Connect to external services' },
      { icon: '✅', label: 'Complete', detail: 'Action performed, results logged' },
    ],
  },
]

export default function CareerFocus() {
  const ref = useScrollReveal(80)
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null)

  useEffect(() => {
    document.body.style.overflow = expandedIdx !== null ? 'hidden' : 'unset'
    return () => { document.body.style.overflow = 'unset' }
  }, [expandedIdx])

  return (
    <section id="career-focus" className="relative py-20 px-6 lg:px-12">
      <div ref={ref} className="reveal-3d-left mx-auto max-w-7xl">
        <h2 className="font-display text-3xl font-bold text-[#D9D9D9] sm:text-4xl">
          <span className="section-title section-title-glow" data-text="Career Focus">Career Focus</span>
        </h2>
        <p className="mt-3 text-[#94a3b8] text-base">The domains where I aim to create the most impact.</p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {careers.map((c, i) => (
            <CareerCard key={c.title} career={c} index={i} onExpand={() => setExpandedIdx(i)} />
          ))}
        </div>
      </div>

      {/* Expand Modal */}
      {expandedIdx !== null && (
        <CareerModal career={careers[expandedIdx]} onClose={() => setExpandedIdx(null)} />
      )}
    </section>
  )
}

function CareerCard({ career, index, onExpand }: { career: typeof careers[0]; index: number; onExpand: () => void }) {
  const ref = useScrollReveal(index * 80)
  const cardRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setTilt({
      x: ((e.clientY - rect.top) / rect.height - 0.5) * -12,
      y: ((e.clientX - rect.left) / rect.width - 0.5) * 12,
    })
  }

  return (
    <div ref={ref} className="reveal" style={{ perspective: '800px' }}>
      <div
        ref={cardRef}
        onClick={onExpand}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }) }}
        onMouseMove={handleMouseMove}
        className="relative overflow-hidden rounded-2xl p-6 transition-all duration-300 cursor-pointer"
        style={{
          background: hovered
            ? `linear-gradient(135deg, ${career.color}15, ${career.color}08)`
            : "rgba(255,255,255,0.03)",
          border: `1px solid ${hovered ? career.color + "40" : "rgba(255,255,255,0.06)"}`,
          boxShadow: hovered
            ? `0 20px 40px rgba(0,0,0,0.3), 0 0 40px ${career.color}20`
            : "0 4px 20px rgba(0,0,0,0.1)",
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${hovered ? 1.03 : 1})`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Glow blobs */}
        <div className="absolute -top-10 -right-10 h-24 w-24 rounded-full blur-3xl pointer-events-none transition-all duration-700"
          style={{ background: career.color, opacity: hovered ? 0.3 : 0 }} />
        <div className="absolute -bottom-6 -left-6 h-16 w-16 rounded-full blur-2xl pointer-events-none transition-all duration-700"
          style={{ background: career.color, opacity: hovered ? 0.2 : 0 }} />

        {/* Emoji icon with glow */}
        <div className="relative mb-4 inline-flex">
          <div className="text-4xl transition-all duration-500"
            style={{
              transform: hovered ? 'scale(1.2) rotate(8deg)' : 'scale(1) rotate(0)',
              filter: hovered ? `drop-shadow(0 0 12px ${career.color})` : 'none',
            }}>
            {career.emoji}
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
          {career.workflow.slice(0, 4).map((step, si) => (
            <span key={si} className="flex items-center gap-1">
              <span className="text-xs">{step.icon}</span>
              {si < 3 && <ArrowRight size={8} className="text-body-light/30" />}
            </span>
          ))}
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

function CareerModal({ career, onClose }: { career: typeof careers[0]; onClose: () => void }) {
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const iv = setInterval(() => {
      setActiveStep(p => (p + 1) % career.workflow.length)
    }, 2200)
    return () => clearInterval(iv)
  }, [career.workflow.length])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)' }}
      onClick={onClose}>
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl p-6 md:p-8"
        style={{
          background: 'linear-gradient(135deg, rgba(15,23,42,0.98), rgba(30,41,59,0.98))',
          border: `1px solid ${career.color}30`,
          boxShadow: `0 0 60px ${career.color}20`,
        }}
        onClick={e => e.stopPropagation()}>

        <button onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-body-light/50 transition-colors hover:bg-white/5 hover:text-heading z-10">
          <X size={20} />
        </button>

        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="text-5xl" style={{ filter: `drop-shadow(0 0 15px ${career.color})` }}>{career.emoji}</div>
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
                    <span className="text-lg transition-transform duration-300"
                      style={{ transform: isActive ? 'scale(1.2)' : 'scale(1)' }}>
                      {step.icon}
                    </span>
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
