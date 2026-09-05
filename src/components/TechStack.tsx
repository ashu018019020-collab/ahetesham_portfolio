'use client'
import { useState } from 'react'
import { useScrollReveal } from '@/lib/hooks'

import {
  PythonOriginal, CplusplusOriginal, COriginal, Html5Original, Css3Original,
  FlaskOriginal, NumpyOriginal, PandasOriginal, TensorflowOriginal, PytorchOriginal,
  MysqlOriginal, SqliteOriginal, ScikitlearnOriginal,
  DockerOriginal, GitOriginal, GithubOriginal,
  GooglecolabOriginal, GoogleOriginal,
} from 'devicons-react'

interface TechItem { name: string; Icon?: any; fallback?: string; color: string }
interface CatGroup { title: string; color: string; items: TechItem[] }

const categories: CatGroup[] = [
  { title: 'PROGRAMMING LANGUAGES', color: '#FF4500', items: [
    { name: 'Python', Icon: PythonOriginal, color: '#3776AB' },
    { name: 'SQL', fallback: 'SQL', color: '#336791' },
    { name: 'C', Icon: COriginal, color: '#A8B9CC' },
    { name: 'C++', Icon: CplusplusOriginal, color: '#00599C' },
    { name: 'HTML', Icon: Html5Original, color: '#E34F26' },
    { name: 'CSS', Icon: Css3Original, color: '#1572B6' },
  ]},
  { title: 'AI / ML', color: '#8b5cf6', items: [
    { name: 'Machine Learning', fallback: '🧠', color: '#8b5cf6' },
    { name: 'Deep Learning', fallback: '🔬', color: '#a855f7' },
    { name: 'NLP', fallback: '💬', color: '#FF8C00' },
    { name: 'LLMs', fallback: 'LLM', color: '#10b981' },
    { name: 'Generative AI', fallback: '✨', color: '#f59e0b' },
    { name: 'Agentic AI', fallback: '🎭', color: '#ef4444' },
    { name: 'MLOps', fallback: '⚙️', color: '#6366f1' },
  ]},
  { title: 'FRAMEWORKS & LIBRARIES', color: '#10b981', items: [
    { name: 'Flask', Icon: FlaskOriginal, color: '#000000' },
    { name: 'Scikit-learn', Icon: ScikitlearnOriginal, color: '#F7931E' },
    { name: 'Pandas', Icon: PandasOriginal, color: '#150458' },
    { name: 'NumPy', Icon: NumpyOriginal, color: '#4DABCF' },
    { name: 'TensorFlow', Icon: TensorflowOriginal, color: '#FF6F00' },
    { name: 'PyTorch', Icon: PytorchOriginal, color: '#EE4C2C' },
    { name: 'REST APIs', fallback: '{ }', color: '#64748b' },
  ]},
  { title: 'AUTOMATION & WORKFLOW', color: '#f59e0b', items: [
    { name: 'n8n', fallback: 'n8n', color: '#ea4b71' },
    { name: 'Zapier', fallback: '⚡', color: '#ff4a00' },
    { name: 'Webhooks', fallback: '🔗', color: '#FF4500' },
    { name: 'API Integration', fallback: '🔌', color: '#8b5cf6' },
  ]},
  { title: 'BI & ANALYTICS TOOLS', color: '#f59e0b', items: [
    { name: 'Power BI', fallback: '📊', color: '#f2c811' },
    { name: 'Microsoft Excel', fallback: '📗', color: '#217346' },
    { name: 'Tableau', fallback: '📈', color: '#E97627' },
    { name: 'MySQL', Icon: MysqlOriginal, color: '#4479A1' },
    { name: 'SQLite', Icon: SqliteOriginal, color: '#003B57' },
    { name: 'Google Colab', Icon: GooglecolabOriginal, color: '#F9AB00' },
  ]},
  { title: 'AI PLATFORMS', color: '#FF8C00', items: [
    { name: 'OpenAI API', fallback: '🤖', color: '#10a37f' },
    { name: 'Google Gemini', Icon: GoogleOriginal, color: '#4285F4' },
    { name: 'LangChain', fallback: '🦜', color: '#293038' },
    { name: 'Hugging Face', fallback: '🤗', color: '#ffd21e' },
    { name: 'ChatGPT', fallback: '💬', color: '#10a37f' },
  ]},
  { title: 'CORE CS CONCEPTS', color: '#FF8C00', items: [
    { name: 'Data Structures & Algorithms', fallback: '📐', color: '#FF8C00' },
    { name: 'DBMS', fallback: '🗄️', color: '#f59e0b' },
    { name: 'Probability & Statistics', fallback: '📊', color: '#8b5cf6' },
    { name: 'Operating Systems', fallback: '💻', color: '#6366f1' },
  ]},
  { title: 'CLOUD & DEVOPS', color: '#f59e0b', items: [
    { name: 'AWS', fallback: '☁️', color: '#FF9900' },
    { name: 'Docker', Icon: DockerOriginal, color: '#2496ED' },
    { name: 'Git', Icon: GitOriginal, color: '#F05032' },
    { name: 'GitHub', Icon: GithubOriginal, color: '#ffffff' },
  ]},
]

function TI({ item, delay }: { item: TechItem; delay: number }) {
  const ref = useScrollReveal(delay);
  const [hover, setHover] = useState(false);
  const hasIcon = !!item.Icon;
  return (
    <div ref={ref} className='reveal'>
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className='flex flex-col items-center gap-2 rounded-xl p-3 transition-all duration-300 cursor-default'
        style={{
          background: hover ? 'rgba(255,255,255,.06)' : 'rgba(255,255,255,.02)',
          border: '1px solid ' + (hover ? item.color + '44' : 'rgba(255,255,255,.05)'),
          transform: hover ? 'translateY(-4px) scale(1.05)' : 'translateY(0) scale(1)',
          boxShadow: hover ? '0 8px 30px rgba(0,0,0,.2), 0 0 20px ' + item.color + '15' : 'none',
        }}
      >
        {hasIcon ? (
          <item.Icon size={40} className='transition-transform duration-300' style={{ transform: hover ? 'scale(1.15)' : 'scale(1)' }} />
        ) : (
          <div
            className='flex h-10 w-10 items-center justify-center rounded-lg text-lg font-bold transition-all duration-300'
            style={{
              background: item.color + '18',
              color: item.color,
              transform: hover ? 'scale(1.15)' : 'scale(1)',
              boxShadow: hover ? '0 0 15px ' + item.color + '30' : 'none',
            }}
          >
            {item.fallback || item.name.charAt(0)}
          </div>
        )}
        <span
          className='text-center text-[11px] font-medium leading-tight transition-colors duration-300'
          style={{ color: hover ? '#f0f4ff' : '#94a3b8' }}
        >
          {item.name}
        </span>
      </div>
    </div>
  );
}

function CG({ group, baseDelay }: { group: CatGroup; baseDelay: number }) {
  const ref = useScrollReveal(baseDelay);
  return (
    <div ref={ref} className='reveal'>
      <div
        className='mb-4 rounded-full px-4 py-1.5 inline-block text-xs font-bold uppercase tracking-widest'
        style={{
          background: group.color + '20',
          color: group.color,
          border: '1px solid ' + group.color + '33',
        }}
      >
        {group.title}
      </div>
      <div className='grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6'>
        {group.items.map((item, i) => (
          <TI key={item.name} item={item} delay={baseDelay + (i + 1) * 40} />
        ))}
      </div>
    </div>
  );
}

export default function TechStack() {
  const ref = useScrollReveal(0);
  return (
    <section className='relative py-20' id='techstack'>
      <div className='mx-auto max-w-6xl px-6'>
        <div ref={ref} className='reveal mb-12 text-center'>
          <h2 className='mb-3 text-3xl font-bold text-white md:text-4xl'>My Technical Skills</h2>
          <p className='text-gray-400'>Technologies & Tools I work with</p>
        </div>
        <div className='space-y-10'>
          {categories.map((cat, ci) => (
            <CG key={cat.title} group={cat} baseDelay={ci * 80} />
          ))}
        </div>
      </div>
    </section>
  );
}