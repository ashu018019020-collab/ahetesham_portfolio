'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Section from './Section'
import { useScrollReveal } from '@/lib/hooks'
import { Award, ExternalLink, Calendar, Building2, CheckCircle2, X, ZoomIn, Medal, Trophy, Star } from 'lucide-react'

interface Certification {
  name: string; issuer: string; date: string;
  credentialId?: string; url?: string; image: string;
  description: string; accentColor: string;
}

const certifications: Certification[] = [
  { name: 'Ace a Data Scientist Interview in 2025', issuer: 'Analytics Vidhya', date: 'Feb 2026', credentialId: '5vqcdllllu', url: 'https://courses.analyticsvidhya.com/certificates/5vqcdllllu', image: '/certificates/ace-data-scientist.jpg', description: 'Comprehensive data science interview preparation covering ML, statistics, and problem-solving.', accentColor: '#10b981' },
  { name: 'AWS Cloud Practitioner Foundation', issuer: 'ScholarHat', date: 'Aug 2026', credentialId: 'IVLC280826', url: 'https://www.scholarhat.com/user/app/training/details/3/234330/0/certificate', image: '/certificates/aws-cloud-practitioner.jpg', description: 'AWS cloud services fundamentals including compute, storage, and networking basics.', accentColor: '#FF4500' },
  { name: 'Machine Learning with Python', issuer: 'ScholarHat', date: 'Aug 2026', credentialId: 'TUMU280826', url: 'https://www.scholarhat.com/user/app/training/details/580/234332/0/certificate', image: '/certificates/machine-learning-python.jpg', description: 'Python-based ML algorithms, model training, and predictive analytics techniques.', accentColor: '#8b5cf6' },
  { name: 'Microsoft Power BI', issuer: 'Skill Course', date: 'Nov 2025', credentialId: 'SC-173F76BBCE', url: 'https://exam.skillcourse.in/student/view_certificate?uid=SC-173F76BBCE', image: '/certificates/microsoft-power-bi.jpg', description: 'Data visualization, DAX formulas, and interactive dashboard creation with Power BI.', accentColor: '#f59e0b' },
  { name: 'Data Analytics Essentials', issuer: 'Cisco Networking Academy', date: 'Jan 2025', credentialId: 'netacad', url: 'https://www.netacad.com/courses/data-analytics', image: '/certificates/data-analytics-essentials.jpg', description: 'Core analytics concepts including data cleaning, transformation, and visualization.', accentColor: '#FF8C00' },
  { name: 'Python Programming', issuer: 'Cursa', date: 'Mar 2024', credentialId: 'u5360149', image: '/certificates/python-certificate.jpg', description: 'Python programming fundamentals including variables, loops, functions, and OOP concepts.', accentColor: '#22c55e' },
]

export default function Certifications() {
  const [sel, setSel] = useState<Certification | null>(null)

  const close = useCallback(() => setSel(null), [])

  // Lock body scroll while modal is open
  useEffect(() => {
    if (sel) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = prev }
    }
  }, [sel])

  // Close on ESC key
  useEffect(() => {
    if (!sel) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [sel, close])

  return (
    <Section id='certifications' title='Certifications' subtitle='Continuous learning and professional development — verified achievements.' revealVariant='3d-right'>
      {/* Stats bar */}
      <div className='mb-8 flex items-center justify-center gap-6'>
        <div className='flex items-center gap-2 rounded-xl border border-[#FFD700]/20 bg-[#FFD700]/[0.05] px-4 py-2.5'>
          <Trophy size={16} className='text-[#FFD700]' />
          <span className='text-sm font-bold text-[#FFD700]'>{certifications.length}+ Certifications</span>
        </div>
        <div className='flex items-center gap-2 rounded-xl border border-[#FF4500]/20 bg-[#FF4500]/[0.05] px-4 py-2.5'>
          <Medal size={16} className='text-[#FF4500]' />
          <span className='text-sm font-bold text-[#FF4500]'>All Verified</span>
        </div>
      </div>

      <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3'>
        {certifications.map((cert, i) => (
          <Card key={cert.name} cert={cert} index={i} onOpen={() => setSel(cert)} number={i + 1} />
        ))}
      </div>

      {/* ── Modal ── */}
      {sel && (
        <div
          className='fixed inset-0 z-[999] flex items-center justify-center p-4 animate-fade-in'
          style={{backgroundColor:'rgba(0,0,0,0.75)', backdropFilter:'blur(14px)', WebkitBackdropFilter:'blur(14px)'}}
          onClick={close}
          role='dialog'
          aria-modal='true'
        >
          {/* Prominent glowing cross button */}
          <button
            onClick={close}
            aria-label='Close'
            className='absolute right-5 top-5 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#FF4500] to-[#FF6B00] text-white shadow-[0_0_25px_rgba(255,69,0,0.5)] transition-all duration-300 hover:scale-110 hover:rotate-90 hover:shadow-[0_0_40px_rgba(255,69,0,0.7)] active:scale-95'
          >
            <X size={26} strokeWidth={2.5} />
          </button>

          {/* Modal content - scrollable */}
          <div
            className='relative max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-2xl scroll-smooth'
            style={{background:'linear-gradient(135deg,rgba(20,16,12,0.95),rgba(8,8,8,0.92))', border:'1px solid rgba(255,69,0,0.25)', backdropFilter:'blur(24px)', WebkitBackdropFilter:'blur(24px)', boxShadow:'0 0 60px rgba(255,69,0,0.15), 0 25px 60px rgba(0,0,0,0.5)'}}
            onClick={e=>e.stopPropagation()}
          >
            {/* Top accent line */}
            <div className='h-1 w-full bg-gradient-to-r from-[#FF4500] via-[#FF8C00] to-[#FF4500]' />

            <div className='relative p-4 sm:p-6'>
              <img src={sel.image} alt={sel.name} className='h-auto w-full rounded-xl object-contain border border-white/10' />
            </div>

            <div className='border-t border-white/[0.08] p-5 sm:p-6'>
              <div className='flex items-center gap-4'>
                {/* Professional glowing medal badge */}
                <div className='relative flex h-16 w-16 shrink-0 items-center justify-center'>
                  {/* Outer glow ring */}
                  <div className='absolute inset-0 rounded-full animate-pulse-ring' style={{border:'2px solid '+sel.accentColor+'55'}} />
                  {/* Medal body */}
                  <div className='absolute inset-1 rounded-full bg-gradient-to-br from-[#FFD700] via-[#FFA500] to-[#FF8C00] flex items-center justify-center' style={{boxShadow:'0 0 30px rgba(255,215,0,0.4), inset 0 2px 4px rgba(255,255,255,0.4)'}}>
                    <Medal size={28} className='text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]' />
                  </div>
                  {/* Shine sweep */}
                  <div className='absolute inset-0 rounded-full overflow-hidden'>
                    <div className='absolute top-0 left-0 h-full w-full animate-medal-shine' style={{background:'linear-gradient(120deg, transparent 20%, rgba(255,255,255,0.35) 50%, transparent 80%)'}} />
                  </div>
                </div>
                <div className='min-w-0 flex-1'>
                  <h3 className='text-lg sm:text-xl font-bold text-white'>{sel.name}</h3>
                  <p className='mt-1 text-sm text-gray-300'>{sel.issuer} • {sel.date}</p>
                  <div className='mt-2 flex items-center gap-2'>
                    <div className='flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium' style={{backgroundColor:sel.accentColor+'20',color:sel.accentColor}}><CheckCircle2 size={12} /> Verified</div>
                    {sel.credentialId && <span className='font-mono text-[10px] text-gray-500'>ID: {sel.credentialId}</span>}
                  </div>
                </div>
              </div>

              <p className='mt-4 text-sm leading-relaxed text-gray-400'>{sel.description}</p>

              <div className='mt-5 flex flex-col gap-3 border-t border-white/[0.08] pt-4 sm:flex-row sm:items-center sm:justify-between'>
                <div className='flex items-center gap-1.5 text-xs text-gray-500'><Calendar size={12} /> {sel.date}</div>
                {sel.url && (
                  <a href={sel.url} target='_blank' rel='noopener noreferrer' className='inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#FF4500] to-[#FF6B00] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#FF4500]/25 transition-all hover:-translate-y-0.5 hover:shadow-[#FF4500]/40'>
                    <ExternalLink size={15} /> View Original Certificate
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes medal-shine {
          0% { transform: translateX(-120%); }
          100% { transform: translateX(120%); }
        }
        .animate-medal-shine {
          animation: medal-shine 3s ease-in-out infinite;
        }
        @keyframes pulse-ring {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        .animate-pulse-ring {
          animation: pulse-ring 1.5s ease-in-out infinite;
        }
      `}</style>
    </Section>
  )
}

function Card({ cert, index, onOpen, number }: { cert: Certification; index: number; onOpen: () => void; number: number }) {
  const ref = useScrollReveal(index * 100)
  const cr = useRef<HTMLDivElement>(null)
  const [rot, setRot] = useState({ x: 0, y: 0 })
  const [hov, setHov] = useState(false)
  useEffect(() => {
    const el = cr.current; if (!el) return
    const mv = (e: MouseEvent) => {
      if (!hov) return
      const r = el.getBoundingClientRect(); setRot({ x: -(e.clientY-r.top-r.height/2)/(r.height/2)*8, y: (e.clientX-r.left-r.width/2)/(r.width/2)*8 })
    }
    const ml = () => { setHov(false); setRot({x:0,y:0}) }
    window.addEventListener('mousemove', mv); el.addEventListener('mouseleave', ml)
    return () => { window.removeEventListener('mousemove', mv); el.removeEventListener('mouseleave', ml) }
  }, [hov])
  const co = cert.accentColor;
  const t = 'rotateX('+rot.x+'deg) rotateY('+rot.y+'deg) scale('+(hov?1.02:1)+')';

  // Golden medal badge colors for top 3
  const medalColors = ['#FFD700', '#C0C0C0', '#CD7F32']
  const medalLabels = ['🥇', '🥈', '🥉']
  const isTopThree = number <= 3

  return (
    <div ref={ref} className='reveal' style={{perspective:'1000px'}}>
      <div ref={cr} onMouseEnter={()=>setHov(true)} className='group relative flex flex-col overflow-hidden rounded-2xl transition-all duration-300 cursor-pointer'
        style={{transform:t,transformStyle:'preserve-3d',
          background:hov?'linear-gradient(135deg,rgba(255,255,255,.06),rgba(255,255,255,.02))':'linear-gradient(135deg,rgba(255,255,255,.03),rgba(255,255,255,.01))',
          border:'1px solid '+(hov?co+'33':'rgba(255,255,255,.08)'),
          boxShadow:hov?'0 25px 50px rgba(0,0,0,.3),0 0 40px '+co+'15':'0 4px 24px rgba(0,0,0,.15)'}}>

        {/* Number badge - top right */}
        <div className='absolute right-3 top-3 z-20 flex items-center justify-center w-8 h-8 rounded-full font-bold text-xs'
          style={{
            background: isTopThree ? `linear-gradient(135deg, ${medalColors[number-1]}, ${medalColors[number-1]}99)` : 'rgba(255,255,255,0.08)',
            color: isTopThree ? '#000' : '#94a3b8',
            border: `1px solid ${isTopThree ? medalColors[number-1] : 'rgba(255,255,255,0.1)'}`,
            boxShadow: isTopThree ? `0 0 15px ${medalColors[number-1]}50, 0 2px 8px rgba(0,0,0,0.3)` : 'none',
          }}>
          {isTopThree ? medalLabels[number-1] : `#${number}`}
        </div>

        <div className='relative h-40 overflow-hidden bg-gray-900/50'>
          <img src={cert.image} alt={cert.name} className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-110' />
          <div className='absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent' />

          {/* Gold shimmer line on hover */}
          {isTopThree && (
            <div className='absolute top-0 left-0 w-full h-[2px]' style={{background:`linear-gradient(90deg, transparent, ${medalColors[number-1]}, transparent)`}} />
          )}

          <button onClick={(e) => { e.stopPropagation(); onOpen(); }} className='absolute right-3 top-3 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all z-20' style={{backgroundColor:co+'30',color:co, boxShadow: `0 0 15px ${co}40`}}><ZoomIn size={18} /></button>
          <div className='absolute left-3 top-3 flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium z-20' style={{backgroundColor:co+'20',color:co, boxShadow: `0 0 10px ${co}20`}}><CheckCircle2 size={12} /> Verified</div>
        </div>

        <div className='flex flex-1 flex-col p-5'>
          <div className='mb-2 flex items-start gap-3'>
            <div className='relative flex h-12 w-12 shrink-0 items-center justify-center'>
              {/* Glow ring */}
              <div className='absolute inset-0 rounded-xl transition-opacity duration-300' style={{border:'1px solid ',opacity:hov?1:0.4,boxShadow:hov?`0 0 18px ${co}40`:'none'}} />
              {/* Icon badge */}
              <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br' style={{background:`linear-gradient(135deg, ${isTopThree ? '#FFD700' : co}+22, ${isTopThree ? '#FFA500' : co}+08)`, boxShadow:hov?`0 0 16px ${isTopThree ? '#FFD700' : co}40`:'none'}}>
                {isTopThree ? (
                  <Medal size={22} style={{color: medalColors[number-1], filter: `drop-shadow(0 0 6px ${medalColors[number-1]}60)`}} />
                ) : (
                  <Award size={22} style={{color:co}} />
                )}
              </div>
            </div>
            <div className='min-w-0 flex-1'>
              <h3 className='text-sm font-bold leading-snug transition-colors' style={{color:hov?co:'#f0f4ff'}}>{cert.name}</h3>
              <div className='mt-1 flex items-center gap-1.5 text-xs text-gray-400'><Building2 size={11} style={{color:co+'80'}} /> {cert.issuer}</div>
            </div>
          </div>
          <p className='mb-3 flex-1 text-xs leading-relaxed text-gray-400'>{cert.description}</p>

          {/* Credential ID */}
          {cert.credentialId && (
            <div className='mb-3 flex items-center gap-2 rounded-lg bg-white/[0.03] border border-white/[0.05] px-3 py-1.5'>
              <span className='text-[9px] font-mono text-gray-500'>ID:</span>
              <span className='text-[10px] font-mono font-bold' style={{color: co+'cc'}}>{cert.credentialId}</span>
            </div>
          )}

          <div className='flex items-center justify-between border-t border-white/5 pt-3'>
            <div className='flex items-center gap-1.5 text-xs text-gray-500'><Calendar size={11} /> {cert.date}</div>
            <div className='flex gap-2'>
              {cert.url && <a href={cert.url} target='_blank' rel='noopener noreferrer' className='inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-medium transition-all hover:scale-105' style={{color:co,background:co+'10',boxShadow: hov ? `0 0 10px ${co}20` : 'none'}}><ExternalLink size={11} /> Verify</a>}
              <button onClick={(e) => { e.stopPropagation(); onOpen(); }} className='inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-medium transition-all hover:scale-105' style={{color:co,background:co+'10'}}><ZoomIn size={11} /> View</button>
            </div>
          </div>
        </div>

        {/* Bottom glow line */}
        <div className='absolute bottom-0 left-0 h-[2px] transition-all duration-500' style={{width: hov ? '100%' : '0%', background: `linear-gradient(90deg, transparent, ${co}, transparent)`, boxShadow: `0 0 8px ${co}`}} />
      </div>
    </div>
  )
}
