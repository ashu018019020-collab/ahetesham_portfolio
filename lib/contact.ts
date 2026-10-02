// Integration layer: the web3forms contract lives here, not in the component.
import { CONTACT } from './constants'

export type ContactStatus = 'idle' | 'sending' | 'success' | 'error' | 'unconfigured'

export interface ContactForm {
  name: string
  email: string
  message: string
}

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit'

/**
 * True when a web3forms access key is present at build time. Without it the API
 * rejects every submission, so the form must not pretend to send.
 */
export function isContactFormConfigured(): boolean {
  const key = process.env.NEXT_PUBLIC_WEB3FORMS_KEY
  return typeof key === 'string' && key.trim().length > 0
}

/**
 * Prefilled `mailto:` URL carrying the same message the form would have posted,
 * used when the API key is missing so a visitor can still reach the inbox.
 */
export function buildMailtoFallback(form: ContactForm): string {
  const subject = `Portfolio message from ${form.name}`
  const body = `${form.message}\n\n— ${form.name}${form.email ? ` (${form.email})` : ''}`
  return `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

/** POST the contact form to web3forms. Returns success; throws only on network failure. */
export async function submitContact(form: ContactForm): Promise<boolean> {
  const res = await fetch(WEB3FORMS_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
      subject: `New portfolio message from ${form.name}`,
      name: form.name,
      email: form.email,
      message: form.message,
    }),
  })
  return res.ok
}
