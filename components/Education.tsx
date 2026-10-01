'use client'

import { useState, useEffect } from 'react'
import Section from './Section'
import { useBodyScrollLock, useModalFocus, useScrollReveal, useTilt } from '@/lib/hooks'
import { Calendar, MapPin, Award, BookOpen, X } from 'lucide-react'
import { EDUCATION, type Education as EducationEntry } from '@/lib/data/resume'

export default function Education() {
  const [sel, setSel] = useState<number | null>(null)

  useBodyScrollLock(sel !== null)
  // Trap Tab focus inside the dialog and restore it to the opener on close
  const modalRef = useModalFocus(sel !== null)

  // Close on ESC key (parity with Certifications modal)
  useEffect(() => {
    if (sel === null) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setSel(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [sel])

  return (
    <Section id='education' title='Education' subtitle='Academic foundation and continuous learning journey.' revealVariant='3d-left'>
      <div className='grid gap-5 md:grid-cols-2'>
        {EDUCATION.map((edu, i) => (
          <EduCard key={edu.degree} edu={edu} index={i} onOpen={() => setSel(i)} />
        ))}
      </div>
      {sel !== null && (
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4' style={{backgroundColor:'rgba(0,0,0,0.6)', backdropFilter:'blur(12px)', WebkitBackdropFilter:'blur(12px)'}} onClick={() => setSel(null)}>
          <button onClick={() => setSel(null)} aria-label='Close details' className='absolute right-4 top-4 z-50 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-colors'><X size={24} /></button>
          <div ref={modalRef} tabIndex={-1} className='relative max-h-[90vh] max-w-2xl w-full overflow-y-auto rounded-2xl p-6' style={{background:'linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))', border:'1px solid rgba(255,255,255,0.1)', backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)'}} onClick={e=>e.stopPropagation()}>
            <div className='mb-4 flex items-center gap-4'>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={EDUCATION[sel].logo} alt={EDUCATION[sel].school} loading='lazy' className='h-20 w-20 rounded-full object-cover' style={{background:'white',padding:'4px'}} />
              <div>
                <h3 className='text-xl font-bold text-white'>{EDUCATION[sel].degree}</h3>
                <p className='text-sm text-gray-300'>{EDUCATION[sel].school}</p>
              </div>
            </div>
            <p className='mb-4 text-sm leading-relaxed text-gray-400'>{EDUCATION[sel].description}</p>
            <div className='flex flex-wrap gap-2'>
              {EDUCATION[sel].highlights.map(h => (
                <span key={h} className='rounded-full px-3 py-1 text-xs font-medium' style={{background:EDUCATION[sel].accentColor+'20',color:EDUCATION[sel].accentColor}}>{h}</span>
              ))}
            </div>
          </div>
        </div>
      )}
    </Section>
  )
}

function EduCard({ edu, index, onOpen }: { edu: EducationEntry; index: number; onOpen: () => void }) {
  const ref = useScrollReveal(index * 100)
  const { ref: cardRef, hovered: hov, transform, handlers } = useTilt({ max: 8, scale: 1.02 })
  const co = edu.accentColor;

  return (
    <div ref={ref} className='reveal' style={{perspective:'1000px'}}>
      <div ref={cardRef} {...handlers} className='group relative overflow-hidden rounded-2xl transition-all duration-200 cursor-pointer' style={{transform,transformStyle:'preserve-3d',background:hov?'linear-gradient(135deg,rgba(255,255,255,.06),rgba(255,255,255,.02))':'linear-gradient(135deg,rgba(255,255,255,.03),rgba(255,255,255,.01))',border:'1px solid '+(hov?co+'33':'rgba(255,255,255,.08)'),boxShadow:hov?'0 25px 50px rgba(0,0,0,.3),0 0 40px '+co+'15':'0 4px 24px rgba(0,0,0,.15)'}}>
        <div className='flex items-start gap-4 p-5'>
          <div className='relative shrink-0'>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={edu.logo} alt={edu.school} loading='lazy' className='h-16 w-16 rounded-full object-cover transition-transform duration-300' style={{background:'white',padding:'3px',transform:hov?'scale(1.1) rotate(5deg)':'scale(1)',boxShadow:hov?'0 0 20px '+co+'30':'none'}} />
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
