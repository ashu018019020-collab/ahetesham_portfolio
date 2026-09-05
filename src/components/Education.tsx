'use client'

import { useState, useRef, useEffect } from 'react'
import Section from './Section'
import { useScrollReveal } from '@/lib/hooks'
import { Calendar, MapPin, Award, BookOpen, X } from 'lucide-react'

interface Education { degree: string; school: string; location: string; period: string; logo: string; description: string; highlights: string[]; accentColor: string }

const educationData: Education[] = [
  { degree: 'B.Tech — Computer Science Engineering', school: 'Dr. Babasaheb Ambedkar Technological University', location: 'Latur, Maharashtra', period: '2021–2025', logo: '/logos/dbatu.png', description: 'State technical university established in 2009, recognized by UGC and AICTE, offering engineering and technology programs across Maharashtra.', highlights: ['UGC Recognized', 'AICTE Approved', 'NAAC Accredited'], accentColor: '#FF4500' },
  { degree: 'HSC Science', school: 'BZ High School and Junior College', location: 'Maharashtra', period: '2018–2020', logo: '/logos/hsc-board.png', description: 'Higher secondary education under Maharashtra State Board with focus on Science stream.', highlights: ['Maharashtra Board', 'Science Stream'], accentColor: '#FF8C00' },
]

export default function Education() {
  const [sel, setSel] = useState<number | null>(null)
  useEffect(() => {
    document.body.style.overflow = sel !== null ? 'hidden' : 'unset'
    return () => { document.body.style.overflow = 'unset' }
  }, [sel])

  return (
    <Section id='education' title='Education' subtitle='Academic foundation and continuous learning journey.' revealVariant='3d-left'>
      <div className='grid gap-5 md:grid-cols-2'>
        {educationData.map((edu, i) => (
          <EduCard key={edu.degree} edu={edu} index={i} onOpen={() => setSel(i)} />
        ))}
      </div>
      {sel !== null && (
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4' style={{backgroundColor:'rgba(0,0,0,0.6)', backdropFilter:'blur(12px)', WebkitBackdropFilter:'blur(12px)'}} onClick={() => setSel(null)}>
          <button onClick={() => setSel(null)} className='absolute right-4 top-4 z-50 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-colors'><X size={24} /></button>
          <div className='relative max-h-[90vh] max-w-2xl w-full overflow-y-auto rounded-2xl p-6' style={{background:'linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))', border:'1px solid rgba(255,255,255,0.1)', backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)'}} onClick={e=>e.stopPropagation()}>
            <div className='mb-4 flex items-center gap-4'>
              <img src={educationData[sel].logo} alt={educationData[sel].school} className='h-20 w-20 rounded-full object-cover' style={{background:'white',padding:'4px'}} />
              <div>
                <h3 className='text-xl font-bold text-white'>{educationData[sel].degree}</h3>
                <p className='text-sm text-gray-300'>{educationData[sel].school}</p>
              </div>
            </div>
            <p className='mb-4 text-sm leading-relaxed text-gray-400'>{educationData[sel].description}</p>
            <div className='flex flex-wrap gap-2'>
              {educationData[sel].highlights.map(h => (
                <span key={h} className='rounded-full px-3 py-1 text-xs font-medium' style={{background:educationData[sel].accentColor+'20',color:educationData[sel].accentColor}}>{h}</span>
              ))}
            </div>
          </div>
        </div>
      )}
    </Section>
  )
}

function EduCard({ edu, index, onOpen }: { edu: Education; index: number; onOpen: () => void }) {
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
  const co = edu.accentColor;
  const t = 'rotateX('+rot.x+'deg) rotateY('+rot.y+'deg) scale('+(hov?1.02:1)+')';
  return (
    <div ref={ref} className='reveal' style={{perspective:'1000px'}}>
      <div ref={cr} onMouseEnter={()=>setHov(true)} className='group relative overflow-hidden rounded-2xl transition-all duration-200 cursor-pointer' style={{transform:t,transformStyle:'preserve-3d',background:hov?'linear-gradient(135deg,rgba(255,255,255,.06),rgba(255,255,255,.02))':'linear-gradient(135deg,rgba(255,255,255,.03),rgba(255,255,255,.01))',border:'1px solid '+(hov?co+'33':'rgba(255,255,255,.08)'),boxShadow:hov?'0 25px 50px rgba(0,0,0,.3),0 0 40px '+co+'15':'0 4px 24px rgba(0,0,0,.15)'}}>
        <div className='flex items-start gap-4 p-5'>
          <div className='relative shrink-0'>
            <img src={edu.logo} alt={edu.school} className='h-16 w-16 rounded-full object-cover transition-transform duration-300' style={{background:'white',padding:'3px',transform:hov?'scale(1.1) rotate(5deg)':'scale(1)',boxShadow:hov?'0 0 20px '+co+'30':'none'}} />
            <div className='absolute -bottom-1 -right-1 rounded-full p-1' style={{background:co}}><Award size={12} className='text-white' /></div>
          </div>
          <div className='flex-1 min-w-0'>
            <h3 className='font-display text-base font-bold transition-colors' style={{color:hov?co:'#f0f4ff'}}>{edu.degree}</h3>
            <p className='mt-1 text-sm text-gray-300'>{edu.school}</p>
            <div className='mt-2 flex flex-wrap items-center gap-3 text-xs text-gray-500'>
              <span className='flex items-center gap-1'><Calendar size={12} /> {edu.period}</span>
              {edu.location && <span className='flex items-center gap-1'><MapPin size={12} /> {edu.location}</span>}
            </div>
            <div className='mt-3 flex flex-wrap gap-1.5'>
              {edu.highlights.map(hl => (
                <span key={hl} className='rounded-full px-2 py-0.5 text-[10px] font-medium' style={{background:co+'15',color:co}}>{hl}</span>
              ))}
            </div>
          </div>
          <button onClick={(e) => { e.stopPropagation(); onOpen(); }} className='shrink-0 rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-all' style={{background:co+'20',color:co}}><BookOpen size={16} /></button>
        </div>
      </div>
    </div>
  )
}
