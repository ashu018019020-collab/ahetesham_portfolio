import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act, render, cleanup, fireEvent } from '@testing-library/react'
import { useScrollReveal, useScrollSpy, useModalFocus } from '@/lib/hooks'

let capturedCb: IntersectionObserverCallback | null = null

beforeEach(() => {
  capturedCb = null
  vi.useFakeTimers()
  vi.stubGlobal('IntersectionObserver', class {
    constructor(cb: IntersectionObserverCallback) { capturedCb = cb }
    observe() {}
    unobserve() {}
    disconnect() {}
  })
  window.matchMedia = vi.fn().mockReturnValue({ matches: false })
})

afterEach(() => {
  cleanup()
  vi.useRealTimers()
  vi.restoreAllMocks()
})

function triggerIntersection(target: Element) {
  capturedCb!(
    [{ isIntersecting: true, target } as IntersectionObserverEntry],
    {} as IntersectionObserver
  )
}

function ScrollRevealTest({ stagger }: { stagger?: number }) {
  const ref = useScrollReveal(stagger)
  return <div ref={ref} data-testid="box" />
}

describe('useScrollReveal contract', () => {
  it('adds "visible" class when element intersects', () => {
    const { getByTestId } = render(<ScrollRevealTest />)
    act(() => triggerIntersection(getByTestId('box')))
    act(() => vi.advanceTimersByTime(0)) // flush setTimeout(fn, 0)
    expect(getByTestId('box')).toHaveClass('visible')
  })

  it('respects stagger delay', () => {
    const { getByTestId } = render(<ScrollRevealTest stagger={200} />)
    act(() => triggerIntersection(getByTestId('box')))
    act(() => vi.advanceTimersByTime(0))
    expect(getByTestId('box')).not.toHaveClass('visible')

    act(() => vi.advanceTimersByTime(200))
    expect(getByTestId('box')).toHaveClass('visible')
  })
})

describe('useScrollSpy contract', () => {
  beforeEach(() => { document.body.innerHTML = '' })

  it('defaults to first section', () => {
    const { result } = renderHook(() => useScrollSpy(['a', 'b', 'c']))
    expect(result.current).toBe('a')
  })

  it('returns "" for empty ids', () => {
    const { result } = renderHook(() => useScrollSpy([]))
    expect(result.current).toBe('')
  })

  it('picks last section when scrolled past all', () => {
    const a = document.createElement('div')
    a.id = 'a'
    const b = document.createElement('div')
    b.id = 'b'
    document.body.appendChild(a)
    document.body.appendChild(b)
    Object.defineProperty(a, 'offsetTop', { value: 0 })
    Object.defineProperty(b, 'offsetTop', { value: 100 })

    const { result } = renderHook(() => useScrollSpy(['a', 'b'], 50))

    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 200, writable: true })
      window.dispatchEvent(new Event('scroll'))
    })

    expect(result.current).toBe('b')
  })

  it('cleans up scroll listener on unmount', () => {
    const spy = vi.spyOn(window, 'removeEventListener')
    const { unmount } = renderHook(() => useScrollSpy(['a']))
    unmount()
    expect(spy).toHaveBeenCalledWith('scroll', expect.any(Function))
    spy.mockRestore()
  })
})

function ModalHarness({ open }: { open: boolean }) {
  const ref = useModalFocus(open)
  return (
    <div>
      <button data-testid='opener'>opener</button>
      {open && (
        <div ref={ref} role='dialog' aria-modal='true' data-testid='dialog'>
          <button data-testid='first'>First</button>
          <button data-testid='middle'>Middle</button>
          <button data-testid='last'>Last</button>
        </div>
      )}
    </div>
  )
}

describe('useModalFocus contract', () => {
  it('moves focus into the dialog when it opens', () => {
    const { getByTestId } = render(<ModalHarness open />)
    expect(document.activeElement).toBe(getByTestId('first'))
  })

  it('traps Shift+Tab on the first item back to the last item', () => {
    const { getByTestId } = render(<ModalHarness open />)
    expect(document.activeElement).toBe(getByTestId('first'))
    fireEvent.keyDown(document, { key: 'Tab', shiftKey: true })
    expect(document.activeElement).toBe(getByTestId('last'))
  })

  it('traps Tab on the last item back to the first item', () => {
    const { getByTestId } = render(<ModalHarness open />)
    const last = getByTestId('last')
    last.focus()
    fireEvent.keyDown(document, { key: 'Tab' })
    expect(document.activeElement).toBe(getByTestId('first'))
  })

  it('returns focus to the opener element on close', () => {
    const { getByTestId, rerender } = render(<ModalHarness open={false} />)
    const opener = getByTestId('opener')
    opener.focus()

    rerender(<ModalHarness open />)
    expect(document.activeElement).toBe(getByTestId('first'))

    rerender(<ModalHarness open={false} />)
    expect(document.activeElement).toBe(opener)
  })
})
