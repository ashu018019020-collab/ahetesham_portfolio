'use client'

import { useState, FormEvent, useEffect, useRef } from 'react'
import { useScrollReveal } from '@/lib/hooks'
import { Send, Mail, Phone, CheckCircle, AlertCircle } from 'lucide-react'
import { LinkedinIcon, GithubIcon } from './Icons'
import { CONTACT } from '@/lib/constants'

type Status = 'idle' | 'sending' | 'success' | 'error'

const contactItems = [
  {
    icon: Mail,
    label: 'Email',
    value: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
    color: '#FF4500',
    glowColor: 'rgba(255,69,0,',
    external: false,
    iconType: 'lucide' as const,
  },
  {
    icon: Phone,
    label: 'Phone',
    value: CONTACT.phoneDisplay,
    href: `tel:${CONTACT.phone}`,
    color: '#FF8C00',
    glowColor: 'rgba(255,140,0,',
    external: false,
    iconType: 'lucide' as const,
  },
  {
    label: 'LinkedIn',
    value: CONTACT.linkedinShort,
    href: CONTACT.linkedin,
    color: '#0077b5',
    glowColor: 'rgba(0,119,181,',
    external: true,
    iconType: 'linkedin' as const,
  },
  {
    label: 'GitHub',
    value: CONTACT.githubShort,
    href: CONTACT.github,
    color: '#FF4500',
    glowColor: 'rgba(255,69,0,',
    external: true,
    iconType: 'github' as const,
  },
  {
    label: 'Telegram',
    value: '@ashshu018',
    href: 'http://t.me/ashshu018',
    color: '#0088cc',
    glowColor: 'rgba(0,136,204,',
    external: true,
    iconType: 'telegram' as const,
  },
  {
    label: 'Instagram',
    value: '@ashshu____',
    href: 'https://www.instagram.com/ashshu____?igsi=MXRxYXNlMjE4bW4yYw==',
    color: '#E4405F',
    glowColor: 'rgba(228,64,95,',
    external: true,
    iconType: 'instagram' as const,
  },
  {
    label: 'WhatsApp',
    value: 'Message me',
    href: 'https://wa.me/qr/3Y6XCMDEETSXA1',
    color: '#25D366',
    glowColor: 'rgba(37,211,102,',
    external: true,
    iconType: 'whatsapp' as const,
  },
]

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle')
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const containerRef = useRef<HTMLDivElement>(null)
  const [visibleCards, setVisibleCards] = useState<boolean[]>([])

  useEffect(() => {
    const timers = contactItems.map((_, i) =>
      setTimeout(() => {
        setVisibleCards((prev) => {
          const next = [...prev]
          next[i] = true
          return next
        })
      }, 200 + i * 150)
    )
    return () => timers.forEach(clearTimeout)
  }, [])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch(
        typeof window === 'undefined'
          ? 'https://api.web3forms.com/submit'
          : 'https://api.web3forms.com/submit',
        {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
          subject: `New portfolio message from ${formData.name}`,
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      })
      if (res.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="px-6 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        {/* ── Get in Touch title FIRST ── */}
        <div className="mb-10">
          <h2 className="section-title section-title-glow" data-text="Get in Touch">
            Get in Touch
          </h2>
          <p className="mt-5 max-w-2xl text-base sm:text-lg text-[#94a3b8] leading-relaxed">
            Have a question or want to collaborate? Drop me a message.
          </p>
        </div>

        {/* ── Contact Details Grid — inside section ── */}
        <div ref={containerRef} className="mb-10">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {contactItems.map((item, i) => (
              <ContactCard key={item.label} item={item} index={i} visible={visibleCards[i]} />
            ))}
          </div>
        </div>

        {/* ── Contact Form below ── */}
        <ContactForm
          status={status}
          setStatus={setStatus}
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
        />
      </div>
    </section>
  )
}

/* ── Glowing Contact Card with animated icon ── */
function ContactCard({
  item,
  index,
  visible,
}: {
  item: (typeof contactItems)[0]
  index: number
  visible: boolean
}) {
  const ref = useScrollReveal(index * 100)
  const [hovered, setHovered] = useState(false)
  const Icon = item.icon

  return (
    <div
      ref={ref}
      className="reveal"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: `all 0.6s cubic-bezier(0.22, 1, 0.36, 1)`,
        transitionDelay: `${index * 150}ms`,
      }}
    >
      <a
        href={item.href}
        target={item.external ? '_blank' : undefined}
        rel={item.external ? 'noopener noreferrer' : undefined}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="group relative block overflow-hidden rounded-2xl p-5 transition-all duration-500"
        style={{
          background: hovered
            ? `linear-gradient(135deg, ${item.glowColor}0.12), ${item.glowColor}0.04))`
            : 'linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))',
          border: `1px solid ${hovered ? item.glowColor + '0.4)' : 'rgba(255,255,255,0.06)'}`,
          boxShadow: hovered
            ? `0 20px 40px rgba(0,0,0,0.3), 0 0 40px ${item.glowColor}0.15)`
            : '0 4px 24px rgba(0,0,0,0.15)',
          transform: hovered ? 'translateY(-6px) scale(1.03)' : 'translateY(0) scale(1)',
        }}
      >
        {/* Background glow blob */}
        <div
          className="absolute -top-8 -right-8 h-24 w-24 rounded-full transition-all duration-700"
          style={{
            background: `radial-gradient(circle, ${item.glowColor}0.3), transparent 70%)`,
            opacity: hovered ? 1 : 0,
            filter: 'blur(20px)',
          }}
        />

        {/* Icon with glow ring */}
        <div className="relative mb-4 flex justify-center">
          <div
            className="relative flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-500"
            style={{
              background: `linear-gradient(135deg, ${item.glowColor}0.25), ${item.glowColor}0.08))`,
              boxShadow: hovered
                ? `0 0 25px ${item.glowColor}0.4), 0 0 50px ${item.glowColor}0.15)`
                : `0 0 10px ${item.glowColor}0.1)`,
              transform: hovered ? 'scale(1.15) rotate(5deg)' : 'scale(1) rotate(0)',
            }}
          >
            {/* Animated glow ring */}
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                animation: hovered ? 'iconPulseRing 1.5s ease-in-out infinite' : 'none',
                border: `2px solid ${item.glowColor}0.3)`,
              }}
            />
            {item.iconType === 'lucide' && Icon && (
              <span
                style={{
                  color: item.color,
                  filter: hovered ? `drop-shadow(0 0 10px ${item.color})` : 'none',
                  transition: 'all 0.3s',
                }}
              >
                <Icon size={28} />
              </span>
            )}
            {item.iconType === 'linkedin' && (
              <span
                style={{
                  color: item.color,
                  filter: hovered ? `drop-shadow(0 0 10px ${item.color})` : 'none',
                  transition: 'all 0.3s',
                }}
              >
                <LinkedinIcon size={28} />
              </span>
            )}
            {item.iconType === 'github' && (
              <span
                style={{
                  color: item.color,
                  filter: hovered ? `drop-shadow(0 0 10px ${item.color})` : 'none',
                  transition: 'all 0.3s',
                }}
              >
                <GithubIcon size={28} />
              </span>
            )}
            {item.iconType === 'telegram' && (
              <svg width={28} height={28} viewBox="0 0 24 24" fill="currentColor" style={{color: item.color, filter: hovered ? `drop-shadow(0 0 10px ${item.color})` : 'none', transition: 'all 0.3s'}}>
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
            )}
            {item.iconType === 'instagram' && (
              <svg width={28} height={28} viewBox="0 0 24 24" fill="currentColor" style={{color: item.color, filter: hovered ? `drop-shadow(0 0 10px ${item.color})` : 'none', transition: 'all 0.3s'}}>
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
              </svg>
            )}
            {item.iconType === 'whatsapp' && (
              <svg width={28} height={28} viewBox="0 0 24 24" fill="currentColor" style={{color: item.color, filter: hovered ? `drop-shadow(0 0 10px ${item.color})` : 'none', transition: 'all 0.3s'}}>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
              </svg>
            )}
          </div>
        </div>

        {/* Label & value */}
        <div className="text-center">
          <p
            className="mb-1 text-xs font-semibold uppercase tracking-widest"
            style={{ color: item.color }}
          >
            {item.label}
          </p>
          <p className="text-sm font-medium text-heading leading-snug">{item.value}</p>
        </div>

        {/* Hover glow line at bottom */}
        <div
          className="absolute bottom-0 left-0 h-0.5 transition-all duration-500"
          style={{
            width: hovered ? '100%' : '0%',
            background: `linear-gradient(90deg, transparent, ${item.color}, transparent)`,
            boxShadow: `0 0 10px ${item.color}`,
          }}
        />

        {/* Corner accent dots */}
        <div
          className="absolute top-3 right-3 h-1.5 w-1.5 rounded-full transition-all duration-500"
          style={{
            background: hovered ? item.color : 'transparent',
            boxShadow: hovered ? `0 0 6px ${item.color}` : 'none',
          }}
        />
        <div
          className="absolute bottom-3 left-3 h-1.5 w-1.5 rounded-full transition-all duration-500"
          style={{
            background: hovered ? item.color : 'transparent',
            boxShadow: hovered ? `0 0 6px ${item.color}` : 'none',
          }}
        />
      </a>

      <style jsx>{`
        @keyframes iconPulseRing {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.08);
          }
        }
      `}</style>
    </div>
  )
}

/* ── Contact Form ── */
function ContactForm({
  status,
  setStatus,
  formData,
  setFormData,
  handleSubmit,
}: {
  status: Status
  setStatus: (s: Status) => void
  formData: { name: string; email: string; message: string }
  setFormData: (f: { name: string; email: string; message: string }) => void
  handleSubmit: (e: FormEvent) => void
}) {
  const ref = useScrollReveal(200)

  return (
    <div ref={ref} className="reveal">
      <form
          onSubmit={handleSubmit}
          className="relative overflow-hidden rounded-2xl p-6 md:p-8"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          {/* Background glow */}
          <div
            className="pointer-events-none absolute -top-20 -right-20 h-60 w-60 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(255,69,0,0.08), transparent 70%)',
              filter: 'blur(40px)',
            }}
          />

          <div className="relative z-10 grid gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium text-heading">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-xl border border-white/8 bg-white/5 px-4 py-3.5 text-sm text-heading placeholder:text-body-light transition-all focus:border-[#FF4500]/40 focus:bg-white/8 focus:outline-none focus:ring-2 focus:ring-[#FF4500]/20"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-heading">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full rounded-xl border border-white/8 bg-white/5 px-4 py-3.5 text-sm text-heading placeholder:text-body-light transition-all focus:border-[#FF4500]/40 focus:bg-white/8 focus:outline-none focus:ring-2 focus:ring-[#FF4500]/20"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div className="relative z-10 mt-5">
            <label htmlFor="message" className="mb-2 block text-sm font-medium text-heading">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full resize-none rounded-xl border border-white/8 bg-white/5 px-4 py-3.5 text-sm text-heading placeholder:text-body-light transition-all focus:border-[#FF4500]/40 focus:bg-white/8 focus:outline-none focus:ring-2 focus:ring-[#FF4500]/20"
              placeholder="Your message..."
            />
          </div>

          {status === 'success' && (
            <div className="relative z-10 mt-4 flex items-center gap-2 rounded-xl border border-green-500/20 bg-green-500/10 p-3 text-sm text-green-400">
              <CheckCircle size={18} />
              Message sent successfully! I&apos;ll get back to you soon.
            </div>
          )}
          {status === 'error' && (
            <div className="relative z-10 mt-4 flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400">
              <AlertCircle size={18} />
              Something went wrong. Please try again or email me directly.
            </div>
          )}

          <div className="relative z-10 mt-6">
            <button
              type="submit"
              disabled={status === 'sending'}
              className="group inline-flex items-center gap-2.5 rounded-xl px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
              style={{
                background: 'linear-gradient(135deg, #FF4500, #FF6B00)',
                boxShadow: '0 0 20px rgba(255,69,0,0.25), 0 4px 15px rgba(255,69,0,0.15)',
              }}
            >
              <Send size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        </form>
    </div>
  )
}
