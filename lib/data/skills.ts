// Content: the skills surface — Technical Skills as 11 category cards (one
// entry per skill, real brand logos, honesty badges), plus soft skills and
// career domains.
//
// Logo ownership rule: brand icons come ONLY from `@iconify-icons/logos` and
// `@iconify-icons/simple-icons` deep imports, rendered by `@iconify/react`.
// No inline brand SVGs, no second icon library, no runtime icon fetching.
// Skills with no brand mark (SQL, RAG, …) use a `fallback` text tile.

import pythonIcon from '@iconify-icons/logos/python'
import linuxTuxIcon from '@iconify-icons/logos/linux-tux'
import gitIcon from '@iconify-icons/logos/git'
import githubIcon from '@iconify-icons/logos/github-icon'
import dockerIcon from '@iconify-icons/logos/docker-icon'
import huggingFaceIcon from '@iconify-icons/logos/hugging-face-icon'
import langchainIcon from '@iconify-icons/logos/langchain-icon'
import n8nIcon from '@iconify-icons/logos/n8n-icon'
import powerBiIcon from '@iconify-icons/logos/microsoft-power-bi'
import tableauIcon from '@iconify-icons/logos/tableau-icon'
import sqliteIcon from '@iconify-icons/logos/sqlite'
import postgresqlIcon from '@iconify-icons/logos/postgresql'
import mongodbIcon from '@iconify-icons/logos/mongodb-icon'
import redisIcon from '@iconify-icons/logos/redis'
import elasticsearchIcon from '@iconify-icons/logos/elasticsearch'
import supabaseIcon from '@iconify-icons/logos/supabase-icon'
import kafkaIcon from '@iconify-icons/logos/kafka-icon'
import airflowIcon from '@iconify-icons/logos/airflow-icon'
import sparkIcon from '@iconify-icons/logos/apache-spark'
import flinkIcon from '@iconify-icons/logos/apache-flink-icon'
import dbtIcon from '@iconify-icons/logos/dbt-icon'
import snowflakeIcon from '@iconify-icons/logos/snowflake-icon'
import awsIcon from '@iconify-icons/logos/aws'
import azureIcon from '@iconify-icons/logos/microsoft-azure'
import kubernetesIcon from '@iconify-icons/logos/kubernetes'
import terraformIcon from '@iconify-icons/logos/terraform'
import prometheusIcon from '@iconify-icons/logos/prometheus'
import reactIcon from '@iconify-icons/logos/react'
import nodejsIcon from '@iconify-icons/logos/nodejs-icon'
import nextjsIcon from '@iconify-icons/logos/nextjs-icon'
import flaskIcon from '@iconify-icons/logos/flask'
import fastapiIcon from '@iconify-icons/logos/fastapi'
import streamlitIcon from '@iconify-icons/logos/streamlit'
import gradioIcon from '@iconify-icons/logos/gradio'
import pytorchIcon from '@iconify-icons/logos/pytorch-icon'
import numpyIcon from '@iconify-icons/logos/numpy'
import pandasIcon from '@iconify-icons/logos/pandas-icon'
import geminiIcon from '@iconify-icons/simple-icons/googlegemini'
import colabIcon from '@iconify-icons/simple-icons/googlecolab'
import googleCloudIcon from '@iconify-icons/simple-icons/googlecloud'
import excelIcon from '@iconify-icons/simple-icons/microsoftexcel'
import mysqlIcon from '@iconify-icons/simple-icons/mysql'
import tensorflowIcon from '@iconify-icons/simple-icons/tensorflow'
import scikitlearnIcon from '@iconify-icons/simple-icons/scikitlearn'
import langgraphIcon from '@iconify-icons/simple-icons/langgraph'
import crewaiIcon from '@iconify-icons/simple-icons/crewai'
import mlflowIcon from '@iconify-icons/simple-icons/mlflow'
import wandbIcon from '@iconify-icons/simple-icons/weightsandbiases'
import grafanaIcon from '@iconify-icons/simple-icons/grafana'
import jupyterIcon from '@iconify-icons/simple-icons/jupyter'
import cIcon from '@iconify-icons/logos/c'
import cPlusPlusIcon from '@iconify-icons/logos/c-plusplus'
import html5Icon from '@iconify-icons/logos/html-5'
import css3Icon from '@iconify-icons/simple-icons/css3'
import spacyIcon from '@iconify-icons/simple-icons/spacy'
import zapierIcon from '@iconify-icons/simple-icons/zapier'
import anthropicIcon from '@iconify-icons/simple-icons/anthropic'
import claudeCodeIcon from '@iconify-icons/logos/claude-code'
import figmaIcon from '@iconify-icons/logos/figma'

// Added for the Other Useful Skills / Web & UI/UX icon pass. Every mark here
// carries its own fill (or fills from currentColor via the simple-icons set),
// so nothing renders black-on-dark and disappears into the card.
import opencvIcon from '@iconify-icons/logos/opencv'
import tailwindIcon from '@iconify-icons/logos/tailwindcss-icon'
import gsapIcon from '@iconify-icons/logos/gsap-dark'
import storybookIcon from '@iconify-icons/logos/storybook-icon'
import vitestIcon from '@iconify-icons/logos/vitest'
import openaiMonoIcon from '@iconify-icons/simple-icons/openai'
import vercelMonoIcon from '@iconify-icons/simple-icons/vercel'

import {
  Brain,
  Globe,
  Palette,
  Workflow,
  DatabaseZap,
  Binary,
  Sigma,
  MonitorCog,
  Network,
  Plug,
  Cable,
  Waypoints,
  Sparkles,
  PencilRuler,
  Wand2,
  Eye,
  Target,
  Users,
  Lightbulb,
  MessageSquareText,
  RefreshCcw,
  ShieldCheck,
  ListChecks,
  RadioTower,
  PenLine,
  BookOpen,
  BadgeCheck,
  Wrench,
  Bot,
  BrainCircuit,
  Zap,
  Database,
  Cloud,
  Layers,
  Rocket,
  FileSearch,
  DatabaseBackup,
  Scale,
  LineChart,
  AudioWaveform,
  Boxes,
  Languages,
  type LucideIcon,
} from 'lucide-react'

/** Minimal Iconify icon-data shape (assignable to @iconify/react's `icon` prop). */
export interface SkillIconData {
  body: string
  width?: number
  height?: number
}

/** Generic icon slot: a lucide stroke icon OR Iconify brand-mark data. */
export type AnyIcon = LucideIcon | SkillIconData

/** True when the value is an Iconify brand-mark data module (not a lucide component). */
export function isBrandIcon(icon: AnyIcon): icon is SkillIconData {
  return typeof icon === 'object' && icon !== null && typeof (icon as SkillIconData).body === 'string'
}

/** 'used' = applied in shipped projects/coursework. 'learning' = actively studying. */
export type SkillStatus = 'used' | 'learning'

export interface SkillLogo {
  name: string
  status: SkillStatus
  /** Icon: lucide stroke icon or Iconify brand-mark data (@iconify-icons). */
  icon?: AnyIcon
  /** Styled text tile for skills with no brand mark. */
  fallback?: string
  /** Accent colour (hex, no alpha) for fallback tiles. */
  tint?: string
  /** Expand-row detail: what it is used for, or what learning focus covers. */
  detail?: string
}

export interface SkillGroup {
  title: string
  subtitle: string
  /** Accent hex used for the card header glow. */
  accent: string
  items: SkillLogo[]
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: 'Foundations',
    subtitle: 'Languages, tooling and the core of how I build',
    accent: '#38bdf8',
    items: [
      { name: 'Python', status: 'used', icon: pythonIcon, detail: 'Primary language across every project — ML pipelines, data processing, APIs and automation.' },
      { name: 'SQL', status: 'used', fallback: 'SQL', tint: '#336791', detail: 'Querying, joins and reporting across MySQL and SQLite in analytics and chatbot projects.' },
      { name: 'Linux', status: 'used', icon: linuxTuxIcon, detail: 'Daily driver for development, shell scripting and server work.' },
      { name: 'Git', status: 'used', icon: gitIcon, detail: 'Branching, history hygiene and collaborative workflow on every repo.' },
      { name: 'GitHub', status: 'used', icon: githubIcon, detail: 'Code hosting, PR-based workflow and static deployment for this portfolio.' },
      { name: 'Docker', status: 'used', icon: dockerIcon, detail: 'Containerizing ML models and services for repeatable local and cloud deploys.' },
      { name: 'REST APIs', status: 'used', fallback: '{ }', tint: '#64748b', detail: 'Designing and integrating REST endpoints — the connective tissue of every project.' },
      { name: 'C', status: 'used', icon: cIcon, detail: 'Core language for DSA coursework — pointers, memory and low-level problem solving.' },
      { name: 'C++', status: 'used', icon: cPlusPlusIcon, detail: 'Data structures & algorithms practice and competitive problem solving.' },
      { name: 'HTML', status: 'used', icon: html5Icon, detail: 'Semantic, accessible markup for every web project and UI build.' },
      { name: 'CSS', status: 'used', icon: css3Icon, detail: 'Layout, responsive design and modern styling behind the interfaces I ship.' },
    ],
  },
  {
    title: 'Generative AI',
    subtitle: 'LLMs, prompting and retrieval-augmented systems',
    accent: '#10b981',
    items: [
      { name: 'OpenAI', status: 'used', icon: openaiMonoIcon, detail: 'GPT-powered chat and generation flows via the OpenAI API.' },
      { name: 'Google Gemini', status: 'used', icon: geminiIcon, detail: 'Gemini models for multimodal prompts and content generation.' },
      { name: 'Hugging Face', status: 'used', icon: huggingFaceIcon, detail: 'Transformers, models and datasets for NLP and fine-tuning experiments.' },
      { name: 'Prompt Engineering', status: 'used', icon: Sparkles, detail: 'System prompts, few-shot examples and chain-of-thought patterns for reliable output.' },
      { name: 'ChatGPT Integration', status: 'used', icon: openaiMonoIcon, detail: 'OpenAI GPT APIs wired into chat products — streaming replies, context windows and function calls.' },
      { name: 'Claude / Anthropic', status: 'learning', icon: anthropicIcon, detail: 'Exploring Claude models and the Anthropic API for long-context reasoning tasks.' },
      { name: 'Claude Code', status: 'learning', icon: claudeCodeIcon, detail: 'Agentic coding assistant for scaffolding, refactoring and reviewing code.' },
      { name: 'Transformers', status: 'used', icon: huggingFaceIcon, detail: 'Attention-based model architecture behind modern NLP — used via Hugging Face.' },
      { name: 'SpaCy', status: 'used', icon: spacyIcon, detail: 'Industrial NLP: tokenization, NER and intent detection in the chatbot project.' },
      { name: 'RAG Pipelines', status: 'used', fallback: 'RAG', tint: '#34d399', detail: 'Retrieval-Augmented Generation: grounding LLM answers in project documents.' },
      { name: 'Fine-Tuning', status: 'used', fallback: 'FT', tint: '#fb923c', detail: 'Adapting open-source LLMs to domain-specific tasks.' },
    ],
  },
  {
    title: 'AI Agents & Agentic AI',
    subtitle: 'Autonomous workflows that reason, plan and act',
    accent: '#f59e0b',
    items: [
      { name: 'LangChain', status: 'used', icon: langchainIcon, detail: 'Chains, tools and memory for LLM-powered applications.' },
      { name: 'n8n', status: 'used', icon: n8nIcon, detail: 'Visual automation workflows connecting LLM agents, APIs and business tools.' },
      { name: 'LLM Agents', status: 'used', fallback: 'AI', tint: '#FF8C00', detail: 'Goal-driven agents that decompose tasks and act across multiple steps.' },
      { name: 'Tool Calling', status: 'used', fallback: 'ƒ(x)', tint: '#fbbf24', detail: 'Function/tool use so models can query APIs and databases mid-conversation.' },
      { name: 'LangGraph', status: 'learning', icon: langgraphIcon, detail: 'Graph-based agent orchestration with cycles and state.' },
      { name: 'CrewAI', status: 'learning', icon: crewaiIcon, detail: 'Multi-agent crews with roles, goals and collaborative task handoff.' },
      { name: 'Zapier', status: 'used', icon: zapierIcon, detail: 'No-code automation connecting apps when a full workflow engine is overkill.' },
      { name: 'Webhooks', status: 'used', icon: Cable, detail: 'Real-time event triggers that kick off automation and agent workflows.' },
      { name: 'API Integration', status: 'used', icon: Plug, detail: 'Wiring third-party services into products — auth, rate limits, retries and all.' },
      { name: 'Workflow Automation', status: 'used', icon: Waypoints, detail: 'End-to-end process automation: triggers, branching, error handling and logging.' },
    ],
  },
  {
    title: 'Data Analysis & BI',
    subtitle: 'From raw data to decisions and dashboards',
    accent: '#f2c811',
    items: [
      { name: 'pandas', status: 'used', icon: pandasIcon, detail: 'EDA, cleaning, wrangling and statistical analysis.' },
      { name: 'NumPy', status: 'used', icon: numpyIcon, detail: 'Vectorized numeric computation underpinning every analysis.' },
      { name: 'Power BI', status: 'used', icon: powerBiIcon, detail: 'Interactive dashboards, data modelling and KPI reporting.' },
      { name: 'DAX', status: 'used', fallback: 'DAX', tint: '#eab308', detail: 'Measures and calculated columns for Power BI business logic.' },
      { name: 'Excel', status: 'used', icon: excelIcon, detail: 'Pivot tables, lookup formulas and stakeholder-friendly reporting.' },
      { name: 'Tableau', status: 'used', icon: tableauIcon, detail: 'Visual analytics dashboards for exploratory storytelling.' },
      { name: 'Google Colab', status: 'used', icon: colabIcon, detail: 'Notebook-driven analysis and model prototyping on GPUs.' },
    ],
  },
  {
    title: 'Data & Storage',
    subtitle: 'Relational, document and vector stores',
    accent: '#34d399',
    items: [
      { name: 'MySQL', status: 'used', icon: mysqlIcon, detail: 'Schema design, querying and storage for application data.' },
      { name: 'SQLite', status: 'used', icon: sqliteIcon, detail: 'Lightweight embedded storage for prototypes and chatbot projects.' },
      { name: 'PostgreSQL', status: 'learning', icon: postgresqlIcon, detail: 'Advanced SQL, constraints and JSONB workloads.' },
      { name: 'MongoDB', status: 'learning', icon: mongodbIcon, detail: 'Document storage and aggregation pipelines.' },
      { name: 'Redis', status: 'learning', icon: redisIcon, detail: 'Caching, sessions and fast key-value lookups.' },
      { name: 'Elasticsearch', status: 'learning', icon: elasticsearchIcon, detail: 'Full-text search and log analytics.' },
      { name: 'Supabase', status: 'learning', icon: supabaseIcon, detail: 'Postgres-as-a-service with auth and realtime subscriptions.' },
    ],
  },
  {
    title: 'Data Engineering & Streaming',
    subtitle: 'Pipelines, orchestration and big-data processing',
    accent: '#fb7185',
    items: [
      { name: 'Apache Kafka', status: 'learning', icon: kafkaIcon, detail: 'Event streaming and pub/sub between services.' },
      { name: 'Apache Airflow', status: 'learning', icon: airflowIcon, detail: 'DAG-based scheduling and orchestration of data pipelines.' },
      { name: 'Apache Spark', status: 'learning', icon: sparkIcon, detail: 'Distributed processing for datasets beyond a single machine.' },
      { name: 'Apache Flink', status: 'learning', icon: flinkIcon, detail: 'Stateful stream processing with low latency.' },
      { name: 'dbt', status: 'learning', icon: dbtIcon, detail: 'SQL-first transformations with tests and documentation.' },
      { name: 'Snowflake', status: 'learning', icon: snowflakeIcon, detail: 'Cloud data warehousing and elastic analytics.' },
    ],
  },
  {
    title: 'Model Deployment & Infra',
    subtitle: 'Where models and apps actually run',
    accent: '#FF9900',
    items: [
      { name: 'AWS Cloud Practitioner', status: 'used', icon: awsIcon, detail: 'Certified Cloud Practitioner — deploying and managing applications on AWS.' },
      { name: 'Vercel', status: 'used', icon: vercelMonoIcon, detail: 'Hosting and CI for this Next.js portfolio.' },
      { name: 'Google Cloud', status: 'learning', icon: googleCloudIcon, detail: 'Managed compute and storage services on GCP.' },
      { name: 'Microsoft Azure', status: 'learning', icon: azureIcon, detail: 'Azure app hosting and AI services.' },
      { name: 'Kubernetes', status: 'learning', icon: kubernetesIcon, detail: 'Container orchestration, scaling and self-healing deployments.' },
      { name: 'Terraform', status: 'learning', icon: terraformIcon, detail: 'Infrastructure as code for reproducible environments.' },
    ],
  },
  {
    title: 'MLOps & LLMOps',
    subtitle: 'Training stack, tracking and observability',
    accent: '#a78bfa',
    items: [
      { name: 'Machine Learning', status: 'used', icon: Brain, detail: 'Regression, classification and clustering — models shipped in analytics and chatbot projects.' },
      { name: 'scikit-learn', status: 'used', icon: scikitlearnIcon, detail: 'Classical ML: regression, classification, clustering and evaluation.' },
      { name: 'TensorFlow', status: 'used', icon: tensorflowIcon, detail: 'Neural networks for time-series forecasting and sequence modelling.' },
      { name: 'PyTorch', status: 'used', icon: pytorchIcon, detail: 'Deep learning research-style training loops and custom models.' },
      { name: 'MLflow', status: 'learning', icon: mlflowIcon, detail: 'Experiment tracking and model registry.' },
      { name: 'Weights & Biases', status: 'learning', icon: wandbIcon, detail: 'Run tracking, hyperparameter sweeps and reports.' },
      { name: 'Grafana', status: 'learning', icon: grafanaIcon, detail: 'Dashboards and alerting for service and model metrics.' },
      { name: 'Prometheus', status: 'learning', icon: prometheusIcon, detail: 'Metrics collection for monitoring deployed systems.' },
    ],
  },
  {
    title: 'Application Development',
    subtitle: 'Backends, frontends and AI-powered products',
    accent: '#60a5fa',
    items: [
      { name: 'Flask', status: 'used', icon: flaskIcon, detail: 'Python web APIs serving ML models and chatbot backends.' },
      { name: 'Next.js', status: 'used', icon: nextjsIcon, detail: 'This portfolio — static export, App Router, server components.' },
      { name: 'React', status: 'used', icon: reactIcon, detail: 'Component architecture and hooks for interactive UIs.' },
      { name: 'Node.js', status: 'used', icon: nodejsIcon, detail: 'JavaScript tooling and API routes for server-side logic.' },
      { name: 'FastAPI', status: 'learning', icon: fastapiIcon, detail: 'Typed, async Python APIs with automatic docs.' },
      { name: 'Streamlit', status: 'learning', icon: streamlitIcon, detail: 'Fast data-app frontends for ML demos.' },
      { name: 'Gradio', status: 'learning', icon: gradioIcon, detail: 'Shareable demo UIs for models and pipelines.' },
    ],
  },
  {
    title: 'Other Useful Skills',
    subtitle: 'Concepts that make the rest of the stack work',
    accent: '#FF8C00',
    items: [
      { name: 'Probability & Statistics', status: 'used', icon: Sigma, tint: '#38bdf8', detail: 'Distributions, hypothesis testing and the math behind model evaluation.' },
      { name: 'Operating Systems', status: 'used', icon: MonitorCog, tint: '#fbbf24', detail: 'Processes, memory, scheduling and shell-level fluency from coursework + daily Linux.' },
      { name: 'NLP', status: 'used', icon: Languages, tint: '#2dd4bf', detail: 'Text processing, embeddings and intent classification for chatbots.' },
      { name: 'Deep Learning', status: 'used', icon: BrainCircuit, tint: '#8b5cf6', detail: 'Neural architectures, training dynamics and evaluation.' },
      { name: 'DSA', status: 'used', icon: Binary, tint: '#f59e0b', detail: 'Data structures & algorithms in C/C++ and Python for problem solving.' },
      { name: 'DBMS', status: 'used', icon: DatabaseZap, tint: '#34d399', detail: 'Normalization, transactions and query planning fundamentals.' },
      { name: 'Computer Vision', status: 'learning', icon: opencvIcon, detail: 'Image classification and detection fundamentals.' },
      { name: 'Voice AI', status: 'learning', icon: AudioWaveform, tint: '#ec4899', detail: 'Speech-to-text, voice agents and realtime audio pipelines.' },
      { name: 'System Design', status: 'learning', icon: Boxes, tint: '#a78bfa', detail: 'Scalable architecture patterns and trade-off reasoning.' },
    ],
  },
  {
    title: 'Web & UI/UX',
    subtitle: 'Design sense, modern interfaces and how users experience them',
    accent: '#e879f9',
    items: [
      { name: 'UI/UX Design', status: 'used', icon: Palette, tint: '#e879f9', detail: 'User-centred design thinking — layouts, hierarchy and interaction patterns.' },
      { name: 'Web Design', status: 'used', icon: Globe, tint: '#22d3ee', detail: 'Designing and building polished, modern websites end to end.' },
      { name: 'Frontend Development', status: 'used', icon: reactIcon, detail: 'HTML, CSS, JavaScript and React interfaces with clean component structure.' },
      { name: 'Responsive Design', status: 'used', icon: tailwindIcon, detail: 'Mobile-first layouts that hold up from 320px phones to 4K desktops.' },
      { name: 'Figma Design', status: 'used', icon: figmaIcon, detail: 'Wireframes, mockups and design handoff in Figma.' },
      { name: 'UI/UX Prototyping', status: 'used', icon: PencilRuler, tint: '#fbbf24', detail: 'Clickable prototypes and design iteration before writing production code.' },
      { name: 'Modern UI Design', status: 'used', icon: Wand2, tint: '#c084fc', detail: 'Contemporary visual language — gradients, depth, micro-interactions.' },
      { name: 'Glassmorphism', status: 'used', icon: Layers, tint: '#67e8f9', detail: 'Frosted-glass surfaces, blur layers and translucency effects.' },
      { name: 'Web Animations', status: 'used', icon: gsapIcon, detail: 'CSS/JS motion — scroll reveals, transitions and pipeline animations.' },
      { name: 'Component-Based Design', status: 'used', icon: storybookIcon, detail: 'Reusable, composable component systems with a shared design language.' },
      { name: 'AI-Assisted Development', status: 'used', icon: claudeCodeIcon, detail: 'Pair-programming with AI tools to scaffold, refactor and review faster.' },
      { name: 'Testing & Debugging', status: 'used', icon: vitestIcon, detail: 'Systematic debugging and test discipline — this portfolio ships with unit + e2e tests.' },
    ],
  },
]

/* ── Soft skills ── */

export interface SoftSkill {
  name: string
  color: string
  icon: LucideIcon
  desc: string
}

export const SOFT_SKILLS: SoftSkill[] = [
  { name: "Analytical Thinking", color: "#f59e0b", icon: Brain, desc: "Breaking down complex problems into logical components" },
  { name: "Problem-Solving", color: "#10b981", icon: Lightbulb, desc: "Finding creative solutions to technical challenges" },
  { name: "Quick Learner", color: "#8b5cf6", icon: Zap, desc: "Rapidly adapting to new technologies and frameworks" },
  { name: "Effective Communication", color: "#FF4500", icon: MessageSquareText, desc: "Clearly conveying technical concepts to all stakeholders" },
  { name: "Team Collaboration", color: "#FF8C00", icon: Users, desc: "Working effectively with cross-functional teams" },
  { name: "Ownership & Accountability", color: "#ec4899", icon: ShieldCheck, desc: "Taking responsibility for deliverables and outcomes" },
  { name: "Adaptability", color: "#14b8a6", icon: RefreshCcw, desc: "Thriving in dynamic environments with changing requirements" },
  { name: "Detail-Oriented", color: "#f43f5e", icon: Eye, desc: "Maintaining precision and accuracy in all work" },
]

/* ── Career focus domains ── */

export interface CareerWorkflowStep {
  icon: LucideIcon
  label: string
  detail: string
}

export interface CareerDomain {
  icon: LucideIcon
  title: string
  desc: string
  color: string
  details: string[]
  tools: string[]
  workflow: CareerWorkflowStep[]
}

export const CAREER_DOMAINS: CareerDomain[] = [
  {
    icon: Bot,
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
      { icon: ListChecks, label: 'Problem Definition', detail: 'Identify business requirements & data availability' },
      { icon: DatabaseBackup, label: 'Data Collection', detail: 'Gather, clean & preprocess datasets' },
      { icon: BrainCircuit, label: 'Model Training', detail: 'Select algorithms, train & tune hyperparameters' },
      { icon: Scale, label: 'Evaluation', detail: 'Test accuracy, precision, recall & F1 score' },
      { icon: Rocket, label: 'Deployment', detail: 'Containerize model & deploy to production' },
    ],
  },
  {
    icon: Sparkles,
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
      { icon: PenLine, label: 'Prompt Design', detail: 'Craft effective prompts with few-shot examples' },
      { icon: BookOpen, label: 'Context Retrieval', detail: 'RAG pipeline fetches relevant documents' },
      { icon: Brain, label: 'LLM Processing', detail: 'Model generates contextual response' },
      { icon: BadgeCheck, label: 'Validation', detail: 'Fact-check & format output for accuracy' },
      { icon: Network, label: 'Integration', detail: 'Embed into production application flow' },
    ],
  },
  {
    icon: LineChart,
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
      { icon: Database, label: 'Data Extraction', detail: 'SQL queries to pull data from databases' },
      { icon: Sparkles, label: 'Cleaning', detail: 'Handle missing values, outliers & duplicates' },
      { icon: FileSearch, label: 'EDA', detail: 'Statistical analysis & pattern discovery' },
      { icon: LineChart, label: 'Visualization', detail: 'Interactive charts & Power BI dashboards' },
      { icon: Lightbulb, label: 'Insights', detail: 'Actionable recommendations for stakeholders' },
    ],
  },
  {
    icon: BrainCircuit,
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
      { icon: Target, label: 'Goal Setting', detail: 'Define objective & success criteria' },
      { icon: Brain, label: 'Reasoning', detail: 'LLM decomposes goal into subtasks' },
      { icon: Wrench, label: 'Tool Selection', detail: 'Choose APIs, databases & services' },
      { icon: Zap, label: 'Execution', detail: 'Agent performs actions autonomously' },
      { icon: RefreshCcw, label: 'Reflection', detail: 'Self-evaluate & retry if needed' },
    ],
  },
  {
    icon: Workflow,
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
      { icon: RadioTower, label: 'Trigger', detail: 'Webhook or scheduled event fires' },
      { icon: FileSearch, label: 'Data Parse', detail: 'Extract & validate incoming payload' },
      { icon: Brain, label: 'AI Processing', detail: 'LLM agent reasons about data' },
      { icon: Plug, label: 'API Calls', detail: 'Connect to external services' },
      { icon: BadgeCheck, label: 'Complete', detail: 'Action performed, results logged' },
    ],
  },
]
