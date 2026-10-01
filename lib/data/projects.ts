// Content: the portfolio project case studies.
import { BotMessageSquare, GraduationCap } from 'lucide-react'
import type { AnyIcon } from './skills'

import n8nIcon from '@iconify-icons/logos/n8n-icon'
import powerBiIcon from '@iconify-icons/logos/microsoft-power-bi'

export interface ProjectMetric {
  value: string
  label: string
  /**
   * Hue for this fact tile. Defaults to the card accent; a project can tint
   * each fact differently so the row reads as a colourful spec strip.
   */
  tone?: string
  /** Renders as a status tile: live dot + breathing green glow. */
  live?: boolean
}

export interface ProjectArchitecture {
  name: string
  detail: string
}

export interface ProjectWorkflowStep {
  step: string
  icon: string
  desc: string
  /** Longer stage explanation shown in the detail modal (flagship projects). */
  note?: string
}

export interface ProjectFounder {
  name: string
  role: string
  statement: string
  facts: string[]
}

export interface ProjectDetailPill {
  label: string
  detail: string
}

export interface ProjectDetailSection {
  title: string
  kind: 'text' | 'founder' | 'flow' | 'workflow' | 'pills' | 'list'
  body?: string
  bullets?: string[]
  flow?: string[]
  pills?: ProjectDetailPill[]
}

export interface Project {
  id: number
  title: string
  tag: string
  tagColor: string
  year: string
  role: string
  description: string
  highlights: string[]
  tags: string[]
  metrics: ProjectMetric[]
  architecture: ProjectArchitecture[]
  outcome: string
  code: string
  /**
   * Header tile icon: a real brand mark (@iconify-icons) or a lucide glyph when
   * the project is better described by what it does than by one vendor logo.
   */
  icon: AnyIcon
  gradient: string
  workflow: ProjectWorkflowStep[]
  /** Flagship extras — only present on founder/flagship projects. */
  /** Logo image for the header tile (overrides the glyph tile). */
  image?: string
  /** Card spans the full Projects grid width. */
  spanFull?: boolean
  /** Overrides the card's accent colour (borders, glows, pills, pipeline). */
  accent?: string
  /** Bottom-row status text (default: DEPLOYED). */
  statusLabel?: string
  statusTone?: 'live' | 'founder'
  /** Live URL, rendered as a "Live Project" button when present. */
  live?: string
  founder?: ProjectFounder
  /** Compact vertical architecture flow shown on the card. */
  flow?: string[]
  /** Detail-modal sections (case study). */
  detail?: ProjectDetailSection[]
}

export const PROJECTS: Project[] = [
  {
    id: 4,
    title: 'BroCode',
    tag: 'FOUNDER PROJECT',
    tagColor: 'from-sky-400 via-blue-500 to-fuchsia-500',
    accent: '#3B9EFF',
    year: '2026',
    role: 'Founder & Creator',
    description:
      'BroCode is a modern learning platform created by Ahetesham Khan to help developers and aspiring AI professionals learn, practice, build real-world projects and progress toward career-ready skills.',
    highlights: [
      'Product Vision — created the concept and overall direction',
      'Architecture — learning structure, progression system & platform design',
      'Development — built and integrated the core web experience',
      'AI Layer — Generative AI, LLM and automation concepts integrated',
      'Learning System — roadmaps, lessons, practice, projects & progression',
      'Product Experience — designed around Learn → Practice → Build → Improve',
    ],
    tags: ['AI / GenAI', 'Automation', 'Python', 'Flask APIs', 'Learning Intelligence'],
    metrics: [
      { value: 'Ahetesham Khan', label: 'Founder', tone: '#7DD3FC' },
      { value: 'AI + Dev Ed', label: 'Focus', tone: '#A78BFA' },
      { value: 'Learn → Build', label: 'Model', tone: '#F0ABFC' },
      { value: 'LIVE', label: 'Status', tone: '#34D399', live: true },
    ],
    architecture: [
      { name: 'Learning Paths', detail: 'Guided roadmaps that choose your track' },
      { name: 'AI + Tech', detail: 'Generative AI, LLM & automation curriculum' },
      { name: 'Build Loop', detail: 'Learn → Practice → Build → Improve cycle' },
    ],
    flow: [
      'Learning Paths',
      'Lessons',
      'Practice',
      'Projects',
      'Assessment',
      'Skill Progression',
      'Career Preparation',
    ],
    live: 'https://mybrocode.vercel.app',
    outcome:
      'A founder-led EdTech platform that turns structured learning into career-ready, portfolio-worthy real-world projects.',
    code: '#',
    icon: GraduationCap,
    image: '/logos/brocode.png',
    spanFull: true,
    statusLabel: 'FOUNDER PROJECT',
    statusTone: 'founder',
    gradient: 'from-blue-600/25 via-cyan-500/10 to-fuchsia-600/10',
    founder: {
      name: 'Ahetesham Khan',
      role: 'Founder & Creator of BroCode',
      statement:
        'Built BroCode to create a structured, practical and career-focused learning environment for the next generation of developers and AI professionals.',
      facts: [
        'B.Tech Computer Science graduate — 2025',
        'AI Engineer / Generative AI focused developer',
        'Interested in AI, automation, data science and intelligent applications',
        'Python · Flask · REST APIs · SQL · Generative AI · AI automation',
        'Experience with n8n, LangChain and LLM-based systems',
      ],
    },
    workflow: [
      { step: 'DISCOVER', icon: '🧭', desc: 'Roadmap', note: 'Choose a roadmap and learning path' },
      { step: 'LEARN', icon: '📚', desc: 'Lessons', note: 'Understand concepts through structured lessons' },
      { step: 'PRACTICE', icon: '⌨️', desc: 'Challenges', note: 'Solve coding challenges and practice skills' },
      { step: 'BUILD', icon: '🛠️', desc: 'Projects', note: 'Create practical real-world projects' },
      { step: 'TEST', icon: '🧪', desc: 'Evaluate', note: 'Evaluate knowledge and identify gaps' },
      { step: 'LEVEL UP', icon: '🚀', desc: 'Progress', note: 'Unlock advanced learning and career-focused progression' },
    ],
    detail: [
      {
        title: 'BroCode Overview',
        kind: 'text',
        body: 'BroCode is a modern learning platform created by Ahetesham Khan to help developers and aspiring AI professionals learn, practice, build real-world projects and progress toward career-ready skills.',
        bullets: [
          'Category — AI Learning Platform · EdTech · Developer Education',
          'Status — Founder Project · Live Platform',
          'Role — Founder & Creator, Ahetesham Khan',
        ],
      },
      { title: 'Founder & Creator', kind: 'founder' },
      {
        title: 'Why I Built BroCode',
        kind: 'text',
        body: 'Built BroCode to create a structured, practical and career-focused learning environment for the next generation of developers and AI professionals — bridging the gap between theoretical courses and real, career-ready skills.',
      },
      { title: 'Product Architecture', kind: 'flow' },
      { title: 'Learning Workflow', kind: 'workflow' },
      {
        title: 'AI & Automation',
        kind: 'pills',
        pills: [
          { label: 'AI / GenAI', detail: 'Generative AI & LLM learning' },
          { label: 'Automation', detail: 'Workflow automation concepts' },
          { label: 'Learning Intelligence', detail: 'Structured progression & practical learning' },
        ],
      },
      {
        title: 'Technologies',
        kind: 'pills',
        pills: [
          { label: 'Development', detail: 'Python · Web Development' },
          { label: 'Backend', detail: 'APIs · Flask · REST' },
          { label: 'AI / GenAI', detail: 'Generative AI & LLM learning' },
          { label: 'Automation', detail: 'Workflow automation concepts' },
        ],
      },
      {
        title: 'Development Pipeline',
        kind: 'list',
        bullets: [
          'Product Vision — created the concept and overall direction of BroCode',
          'Architecture — designed the learning structure, progression system and platform architecture',
          'Development — built and integrated the core web experience and learning functionality',
          'AI Layer — integrated AI-focused learning, Generative AI, LLM and automation concepts',
          'Learning System — structured roadmaps, lessons, practice, projects and progression',
          'Product Experience — designed the experience around Learn → Practice → Build → Improve',
        ],
      },
      {
        title: 'Future Vision',
        kind: 'text',
        body: 'Evolve BroCode into a career launchpad: deeper AI specializations, mentorship-driven projects, certification tracks and a community of developers leveling up together.',
      },
    ],
  },
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
    icon: n8nIcon,
    gradient: 'from-orange-600/20 to-amber-600/10',
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
    icon: BotMessageSquare,
    gradient: 'from-purple-600/20 to-pink-600/10',
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
    icon: powerBiIcon,
    gradient: 'from-emerald-600/20 to-teal-600/10',
    workflow: [
      { step: 'Extract', icon: '🗄️', desc: 'SQL sources' },
      { step: 'Transform', icon: '🔧', desc: 'Clean data' },
      { step: 'Model', icon: '📐', desc: 'DAX models' },
      { step: 'Visualize', icon: '📈', desc: 'Dashboard' },
      { step: 'Insight', icon: '💡', desc: 'Report' },
    ],
  },
]
