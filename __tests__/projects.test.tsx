import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, cleanup } from '@testing-library/react'
import Projects from '@/components/Projects'
import { PROJECTS } from '@/lib/data/projects'
import { isBrandIcon } from '@/lib/data/skills'

vi.mock('@/lib/hooks', () => ({
  useScrollReveal: () => ({ current: null }),
  useTilt: () => ({ ref: { current: null }, hovered: false, transform: '', handlers: {} }),
  useStepCycle: () => 0,
  useBodyScrollLock: () => {},
  useModalFocus: () => ({ current: null }),
}))

/** React's sentinel symbols for renderable component wrappers (lucide ships forwardRef). */
const COMPONENT_TYPES = new Set<symbol>([
  Symbol.for('react.forward_ref'),
  Symbol.for('react.memo'),
])

function isRenderableGlyph(icon: unknown): boolean {
  if (typeof icon === 'function') return true
  if (typeof icon !== 'object' || icon === null) return false
  return COMPONENT_TYPES.has((icon as { $$typeof?: symbol }).$$typeof as symbol)
}

afterEach(cleanup)

describe('PROJECTS contract', () => {
  it('every project has a header icon the grid can render', () => {
    for (const project of PROJECTS) {
      const ok = isBrandIcon(project.icon) || isRenderableGlyph(project.icon)
      expect(ok, `${project.title} has an unrenderable icon`).toBe(true)
    }
  })

  it('ids and titles are unique (they are the React keys)', () => {
    const ids = PROJECTS.map((p) => p.id)
    const titles = PROJECTS.map((p) => p.title)
    expect(new Set(ids).size).toBe(ids.length)
    expect(new Set(titles).size).toBe(titles.length)
  })

  it.each(PROJECTS.map((p) => [p.title, p] as const))(
    '"%s" has copy for every block of its card',
    (_title, project) => {
      expect(project.description.trim().length).toBeGreaterThan(0)
      expect(project.outcome.trim().length).toBeGreaterThan(0)
      expect(project.tags.length).toBeGreaterThan(0)
      expect(project.highlights.length).toBeGreaterThan(0)
      expect(project.metrics.length).toBeGreaterThan(0)
      expect(project.architecture.length).toBeGreaterThan(0)
      expect(project.workflow.length).toBeGreaterThan(0)
      expect(project.role.trim().length).toBeGreaterThan(0)
      expect(project.year.trim().length).toBeGreaterThan(0)
    },
  )

  it('the chatbot project shows a chat glyph instead of a vendor logo', () => {
    const chatbot = PROJECTS.find((p) => p.title.toLowerCase().includes('chatbot'))!
    expect(isBrandIcon(chatbot.icon)).toBe(false)
    expect(isRenderableGlyph(chatbot.icon)).toBe(true)
  })

  it('renders a glyph for the chatbot tile rather than a blank tile', () => {
    const { container } = render(<Projects />)
    expect(container.querySelector('.lucide-bot-message-square')).not.toBeNull()
  })
})
