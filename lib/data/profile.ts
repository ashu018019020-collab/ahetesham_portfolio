// Content: the "who I am / where to find me" surface. No rendering, no JSX.
import { CONTACT } from '@/lib/constants'

export interface NavLink {
  label: string
  href: string
}

/** Primary navigation — also the source of the scroll-spy section order. */
export const NAV_LINKS: NavLink[] = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
]

/** Footer navigation — deliberately a different subset from the nav bar. */
export const FOOTER_LINKS: NavLink[] = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Career Focus', href: '#career-focus' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
]

export type SocialIcon = 'linkedin' | 'github' | 'email'

export interface SocialLink {
  label: string
  href: string
  icon: SocialIcon
  /** Tailwind hover classes: colour, border, shadow, background. */
  glow: string
}

export const SOCIALS: SocialLink[] = [
  {
    label: 'LinkedIn',
    href: CONTACT.linkedin,
    icon: 'linkedin',
    glow:
      'hover:text-[#0A66C2] hover:border-[#0A66C2]/40 hover:shadow-[0_0_20px_rgba(10,102,194,0.35)] hover:bg-[#0A66C2]/10',
  },
  {
    label: 'GitHub',
    href: CONTACT.github,
    icon: 'github',
    glow:
      'hover:text-[#e6edf3] hover:border-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:bg-white/10',
  },
  {
    label: 'Email',
    href: `mailto:${CONTACT.email}`,
    icon: 'email',
    glow:
      'hover:text-[#FF8C00] hover:border-[#FF8C00]/40 hover:shadow-[0_0_20px_rgba(255,140,0,0.35)] hover:bg-[#FF8C00]/10',
  },
]

export type ContactIcon =
  | 'email'
  | 'phone'
  | 'linkedin'
  | 'github'
  | 'telegram'
  | 'instagram'
  | 'whatsapp'

export interface ContactItem {
  label: string
  value: string
  href: string
  color: string
  /** rgb() prefix, e.g. `rgba(255,69,0,` — callers append the alpha and `)`. */
  glowColor: string
  external: boolean
  iconType: ContactIcon
}

export const CONTACT_ITEMS: ContactItem[] = [
  {
    label: 'Email',
    value: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
    color: '#FF4500',
    glowColor: 'rgba(255,69,0,',
    external: false,
    iconType: 'email',
  },
  {
    label: 'Phone',
    value: CONTACT.phoneDisplay,
    href: `tel:${CONTACT.phoneE164}`,    color: '#FF8C00',
    glowColor: 'rgba(255,140,0,',
    external: false,
    iconType: 'phone',
  },
  {
    label: 'LinkedIn',
    value: CONTACT.linkedinShort,
    href: CONTACT.linkedin,
    color: '#3b9bd6',
    glowColor: 'rgba(0,119,181,',
    external: true,
    iconType: 'linkedin',
  },
  {
    label: 'GitHub',
    value: CONTACT.githubShort,
    href: CONTACT.github,
    color: '#FF4500',
    glowColor: 'rgba(255,69,0,',
    external: true,
    iconType: 'github',
  },
  {
    label: 'Telegram',
    value: '@ashshu018',
    href: 'https://t.me/ashshu018',
    color: '#0088cc',
    glowColor: 'rgba(0,136,204,',
    external: true,
    iconType: 'telegram',
  },
  {
    label: 'Instagram',
    value: '@ashshu____',
    href: 'https://www.instagram.com/ashshu____?igsi=MXRxYXNlMjE4bW4yYw==',
    color: '#E4405F',
    glowColor: 'rgba(228,64,95,',
    external: true,
    iconType: 'instagram',
  },
  {
    label: 'WhatsApp',
    value: 'Message me',
    // wa.me/<number> opens a chat straight away; the old /qr/ link needed a scan.
    href: `https://wa.me/${CONTACT.phoneE164.replace('+', '')}`,
    color: '#25D366',
    glowColor: 'rgba(37,211,102,',
    external: true,
    iconType: 'whatsapp',
  },
]
