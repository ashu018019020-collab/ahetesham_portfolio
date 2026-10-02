import { describe, it, expect } from 'vitest'
import { CONTACT } from '@/lib/constants'
import { CONTACT_ITEMS, SOCIALS } from '@/lib/data/profile'

describe('CONTACT contract', () => {
  const requiredKeys = [
    'phone', 'phoneE164', 'phoneDisplay', 'email', 'linkedin',
    'linkedinShort', 'github', 'githubShort', 'resumePath',
  ] as const

  it.each(requiredKeys)('has %s', (key) => {
    expect(typeof CONTACT[key]).toBe('string')
    expect(CONTACT[key].length).toBeGreaterThan(0)
  })

  it('email is valid', () => {
    expect(CONTACT.email).toMatch(/@.+\..+/)
  })

  it('linkedin points to ahetesham-khan profile', () => {
    expect(CONTACT.linkedin).toContain('ahetesham-khan')
    expect(CONTACT.linkedinShort).toContain('ahetesham-khan')
  })

  it('github username matches', () => {
    expect(CONTACT.github).toContain('aheteshamkhan')
    expect(CONTACT.githubShort).toContain('aheteshamkhan')
  })

  it('resume is a public path', () => {
    expect(CONTACT.resumePath).toMatch(/^\//)
  })
})

// The Get in Touch section is only useful if every card actually reaches its
// destination, so the hrefs below are part of the contract.
describe('contact link contract', () => {
  it('every contact card links with a working scheme', () => {
    for (const item of CONTACT_ITEMS) {
      expect(item.href, `${item.label} href`).toMatch(/^(mailto:|tel:|https:\/\/)/)
    }
    for (const social of SOCIALS) {
      expect(social.href, `${social.label} href`).toMatch(/^(mailto:|https:\/\/)/)
    }
  })

  it('nothing links over insecure http', () => {
    for (const item of CONTACT_ITEMS) expect(item.href.startsWith('http://')).toBe(false)
    for (const social of SOCIALS) expect(social.href.startsWith('http://')).toBe(false)
  })

  it('the email card opens the mail app with the real address', () => {
    const email = CONTACT_ITEMS.find((i) => i.iconType === 'email')!
    expect(email.value).toBe(CONTACT.email)
    expect(email.href).toBe(`mailto:${CONTACT.email}`)
    expect(email.external).toBe(false)
  })

  it('the phone card dials the full international number', () => {
    const phone = CONTACT_ITEMS.find((i) => i.iconType === 'phone')!
    expect(phone.value).toBe(CONTACT.phoneDisplay)
    expect(phone.href).toBe(`tel:${CONTACT.phoneE164}`)
    // tel: needs country code + digits only, or it cannot be dialled.
    expect(phone.href).toMatch(/^tel:\+\d{10,15}$/)
    expect(phone.href.replace(/\D/g, '')).toContain(CONTACT.phone)
  })

  it('whatsapp targets the same number as the dial link', () => {
    const whatsapp = CONTACT_ITEMS.find((i) => i.iconType === 'whatsapp')!
    expect(whatsapp.href).toBe(`https://wa.me/${CONTACT.phoneE164.replace('+', '')}`)
  })

  it('socials point at the real profiles', () => {
    const linkedin = SOCIALS.find((s) => s.icon === 'linkedin')!
    const github = SOCIALS.find((s) => s.icon === 'github')!
    const email = SOCIALS.find((s) => s.icon === 'email')!
    expect(linkedin.href).toContain('linkedin.com/in/')
    expect(github.href).toContain('github.com/')
    expect(email.href).toBe(`mailto:${CONTACT.email}`)
  })

  it('every card has a label and value to show', () => {
    for (const item of CONTACT_ITEMS) {
      expect(item.label.trim().length).toBeGreaterThan(0)
      expect(item.value.trim().length).toBeGreaterThan(0)
    }
  })
})
