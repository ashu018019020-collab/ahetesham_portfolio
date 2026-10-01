import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react'
import Contact from '@/components/Contact'

vi.mock('@/lib/hooks', () => ({
  useScrollReveal: () => ({ current: null }),
}))

const mockFetch = vi.fn()

beforeEach(() => {
  vi.stubGlobal('fetch', mockFetch)
  vi.stubEnv('NEXT_PUBLIC_WEB3FORMS_KEY', 'test-key')
})

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

/** Render the Contact section and return a helper to submit the form. */
function renderContact() {
  const result = render(<Contact />)
  const fillAndSubmit = async (name: string, email: string, message: string) => {
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: name } })
    fireEvent.change(screen.getByLabelText(/your email/i), { target: { value: email } })
    fireEvent.change(screen.getByLabelText(/^message$/i), { target: { value: message } })
    fireEvent.click(screen.getAllByRole('button', { name: /send message/i })[0])
  }
  return { ...result, fillAndSubmit }
}

describe('Contact form contract', () => {
  it('renders form fields and submit button', () => {
    renderContact()
    expect(screen.getByLabelText(/name/i)).toBeDefined()
    expect(screen.getByLabelText(/your email/i)).toBeDefined()
    expect(screen.getByLabelText(/^message$/i)).toBeDefined()
    expect(screen.getAllByRole('button', { name: /send message/i }).length).toBeGreaterThanOrEqual(1)
  })

  it('renders contact details', () => {
    renderContact()
    expect(screen.getAllByText('aheteshamk2003@gmail.com').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('+91 9021517413').length).toBeGreaterThanOrEqual(1)
  })

  it('updates form fields on input', () => {
    renderContact()
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Alice' } })
    fireEvent.change(screen.getByLabelText(/your email/i), { target: { value: 'alice@test.com' } })
    fireEvent.change(screen.getByLabelText(/^message$/i), { target: { value: 'Hello!' } })

    expect(screen.getByLabelText(/name/i)).toHaveValue('Alice')
    expect(screen.getByLabelText(/your email/i)).toHaveValue('alice@test.com')
    expect(screen.getByLabelText(/^message$/i)).toHaveValue('Hello!')
  })

  it('sends correct payload on submit', async () => {
    mockFetch.mockResolvedValue({ ok: true })
    const { fillAndSubmit } = renderContact()

    await fillAndSubmit('Bob', 'bob@test.com', 'Hi')

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: 'test-key',
          subject: 'New portfolio message from Bob',
          name: 'Bob',
          email: 'bob@test.com',
          message: 'Hi',
        }),
      })
    })
  })

  it('shows success message and resets form on successful submit', async () => {
    mockFetch.mockResolvedValue({ ok: true })
    const { fillAndSubmit } = renderContact()

    await fillAndSubmit('Test', 't@t.com', 'msg')

    await waitFor(() => {
      expect(screen.getByText(/Message sent successfully/)).toBeDefined()
    })
    expect(screen.getByLabelText(/name/i)).toHaveValue('')
    expect(screen.getByLabelText(/your email/i)).toHaveValue('')
    expect(screen.getByLabelText(/^message$/i)).toHaveValue('')
  })

  it('shows error message on failed response', async () => {
    mockFetch.mockResolvedValue({ ok: false })
    const { fillAndSubmit } = renderContact()

    await fillAndSubmit('X', 'x@x.com', 'm')

    await waitFor(() => {
      expect(screen.getByText(/Something went wrong/)).toBeDefined()
    })
  })

  it('shows error message on network failure', async () => {
    mockFetch.mockRejectedValue(new Error('fail'))
    const { fillAndSubmit } = renderContact()

    await fillAndSubmit('X', 'x@x.com', 'm')

    await waitFor(() => {
      expect(screen.getByText(/Something went wrong/)).toBeDefined()
    })
  })

  it('renders the email and phone cards as real mail / dial links', () => {
    renderContact()
    const email = screen.getByRole('link', { name: /email: aheteshamk2003@gmail\.com/i })
    expect(email.getAttribute('href')).toBe('mailto:aheteshamk2003@gmail.com')

    const phone = screen.getByRole('link', { name: /phone: \+91 9021517413/i })
    expect(phone.getAttribute('href')).toBe('tel:+919021517413')
  })

  it('makes the whole card the action, so a tap anywhere opens mail or dial', () => {
    renderContact()
    const email = screen.getByRole('link', { name: /email: aheteshamk2003@gmail\.com/i })
    const phone = screen.getByRole('link', { name: /phone: \+91 9021517413/i })

    // `absolute inset-0` makes the link cover the card instead of just the text.
    for (const link of [email, phone]) {
      expect(link.className).toContain('absolute')
      expect(link.className).toContain('inset-0')
    }
    // Nothing else in the card may sit on top of the action link.
    expect(screen.queryAllByRole('button', { name: /copy/i })).toHaveLength(0)
  })

  it('falls back to a prefilled email when no access key is configured', async () => {
    vi.stubEnv('NEXT_PUBLIC_WEB3FORMS_KEY', '')
    mockFetch.mockClear()
    const { fillAndSubmit } = renderContact()

    await fillAndSubmit('Bob', 'bob@test.com', 'Hello there')

    const cta = await screen.findByRole('link', { name: /open in my email app/i })
    const href = cta.getAttribute('href') || ''
    expect(href).toMatch(/^mailto:aheteshamk2003@gmail\.com\?subject=/)
    expect(decodeURIComponent(href)).toContain('Hello there')
    expect(decodeURIComponent(href)).toContain('bob@test.com')
    // Never POST to an API that cannot accept the message.
    expect(mockFetch).not.toHaveBeenCalled()
  })

  it('disables button while sending', async () => {
    let resolveFetch!: (v: unknown) => void
    mockFetch.mockImplementation(() => new Promise((r) => { resolveFetch = r }))
    const { fillAndSubmit } = renderContact()

    await fillAndSubmit('X', 'x@x.com', 'm')

    await waitFor(() => {
      expect(screen.getAllByRole('button', { name: /sending/i }).length).toBeGreaterThanOrEqual(1)
    })

    resolveFetch({ ok: true })
    await waitFor(() => {
      const buttons = screen.getAllByRole('button', { name: /send message/i })
      expect(buttons.every((b) => !(b as HTMLButtonElement).disabled)).toBe(true)
    })
  })
})
