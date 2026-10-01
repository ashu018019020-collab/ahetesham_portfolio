// Content: the About section's bio copy, highlight cards and end-to-end AI pipeline.
import {
  Sparkles,
  Bot,
  Database,
} from 'lucide-react'
import type { ComponentType } from 'react'
import scikitlearnIcon from '@iconify-icons/simple-icons/scikitlearn'
import n8nIcon from '@iconify-icons/logos/n8n-icon'
import flaskIcon from '@iconify-icons/logos/flask'
import awsIcon from '@iconify-icons/logos/aws'
import huggingFaceIcon from '@iconify-icons/logos/hugging-face-icon'

import type { SkillIconData } from './skills'

export type { SkillIconData }

type Icon = ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>

/** Lucide stroke icon OR Iconify brand-mark data (see Skills section logo rule). */
export type HighlightIcon = Icon | SkillIconData

/** True when the value is an Iconify brand-mark data module (not a lucide component). */
export function isBrandIcon(icon: HighlightIcon): icon is SkillIconData {
  return typeof icon === 'object' && icon !== null && typeof (icon as SkillIconData).body === 'string'
}

export interface Highlight {
  icon: HighlightIcon
  label: string
  color: string
  desc: string
}

export const HIGHLIGHTS: Highlight[] = [
  { icon: scikitlearnIcon, label: 'Machine Learning', color: '#FF4500', desc: 'Predictive models & pattern recognition' },
  { icon: Sparkles, label: 'Generative AI', color: '#8b5cf6', desc: 'LLMs, content generation & Q&A systems' },
  { icon: Bot, label: 'Agentic AI', color: '#FF8C00', desc: 'Autonomous agents & multi-step workflows' },
  { icon: huggingFaceIcon, label: 'NLP & Deep Learning', color: '#10b981', desc: 'Transformers, embeddings & neural networks' },
  { icon: Database, label: 'Data Science', color: '#f59e0b', desc: 'SQL, EDA, Power BI dashboards & analytics' },
  { icon: n8nIcon, label: 'Automation', color: '#ef4444', desc: 'n8n, webhooks & REST API integrations' },
  { icon: awsIcon, label: 'Cloud & MLOps', color: '#ec4899', desc: 'AWS, Docker & deployment pipelines' },
  { icon: flaskIcon, label: 'Python & Flask', color: '#6366f1', desc: 'Full-stack AI application development' },
]

/**
 * Bio copy, split into lead / body / closing so the section can style it as a
 * hierarchy instead of one dense paragraph. The words live here; the layout and
 * emphasis live in the component.
 */
export const BIO = {
  /** Opening "who + what" statement. */
  lead: 'AI Engineer and Data Scientist (B.Tech CSE) specializing in Machine Learning, Deep Learning, NLP, Generative AI, and Agentic AI.',
  /** Supporting sentences, one paragraph each. */
  body: [
    'Proven ability to build end-to-end AI systems using Python, Flask, REST APIs, and LLM integrations.',
    'Skilled across the full data lifecycle — from SQL-based data extraction and Python-driven EDA to Power BI dashboard development and predictive modeling.',
    'Hands-on experience with automation workflows using n8n, MLOps practices, and cloud platforms.',
  ],
  /** Closing ask, rendered as a callout. */
  seeking:
    'Seeking an entry-level AI Engineer or Data Scientist role to deliver impactful, data-driven solutions and scalable AI automation systems.',
}

/**
 * Technologies named inside the bio, rendered bold so the stack is scannable.
 * Matched longest-first, so a longer term always wins over a shorter one it
 * contains ('Machine Learning' never breaks mid-phrase).
 */
export const BIO_SKILLS = [
  'Machine Learning',
  'Deep Learning',
  'Generative AI',
  'Agentic AI',
  'REST APIs',
  'Power BI',
  'Python',
  'Flask',
  'MLOps',
  'SQL',
  'EDA',
  'LLM',
  'NLP',
  'n8n',
]

export interface WorkflowStep {
  icon: string
  label: string
  color: string
  detail: string
}

export const WORKFLOW_STEPS: WorkflowStep[] = [
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
