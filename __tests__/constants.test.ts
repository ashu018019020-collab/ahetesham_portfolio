import { describe, it, expect } from 'vitest'
import { CONTACT } from '@/lib/constants'

describe('CONTACT contract', () => {
  const requiredKeys = [
    'phone', 'phoneDisplay', 'email', 'linkedin',
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
