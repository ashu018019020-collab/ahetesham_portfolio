import { describe, it, expect } from 'vitest'
import { readFileSync, readdirSync } from 'node:fs'
import path from 'node:path'
import {
  SKILL_GROUPS,
  SOFT_SKILLS,
  CAREER_DOMAINS,
  isBrandIcon,
  type AnyIcon,
  type SkillLogo,
} from '@/lib/data/skills'

/**
 * Data contract for the skills surface. These assertions mirror what the
 * renderers in `components/Skills.tsx` actually do, so a data edit that would
 * render a blank/broken tile fails here instead of in the browser:
 *
 *   - a tile renders `icon` as a brand mark (Iconify) or as a lucide glyph,
 *     and falls back to a `fallback` text tile when there is no icon at all.
 *     Note lucide ships `forwardRef` wrapper objects, not plain functions, so
 *     "renderable" is checked against React's component sentinel symbols
 *     rather than `typeof`.
 *   - colours are concatenated as `accent + '18'` / `tint + '1f'`, so they must
 *     be 6-digit hex
 *   - the card badge shows `usedCount/items.length`, so those counts are pinned
 */

const HEX_6 = /^#[0-9a-fA-F]{6}$/

/** Every skill tile flattened with its group, for per-skill assertions. */
const ALL_SKILLS: Array<{ group: string; skill: SkillLogo }> = SKILL_GROUPS.flatMap(
  (group) => group.items.map((skill) => ({ group: group.title, skill })),
)

/** React's sentinel symbols for renderable component wrappers. */
const COMPONENT_TYPES = new Set<symbol>([
  Symbol.for('react.forward_ref'),
  Symbol.for('react.memo'),
])

/**
 * True when the value is a lucide glyph React can actually render: a plain
 * function component, or one of React's wrapper objects. lucide-react 1.x
 * exports `forwardRef` wrappers (`typeof` is "object").
 */
function isLucideIcon(icon: AnyIcon): boolean {
  if (isBrandIcon(icon)) return false
  if (typeof icon === 'function') return true
  if (typeof icon !== 'object' || icon === null) return false
  return COMPONENT_TYPES.has((icon as { $$typeof?: symbol }).$$typeof as symbol)
}

/** Tile shape at render time: exactly one of these three must apply. */
function tileKind(skill: SkillLogo): 'brand' | 'lucide' | 'fallback' | 'none' | 'invalid' {
  if (skill.icon) {
    if (isBrandIcon(skill.icon)) return 'brand'
    if (isLucideIcon(skill.icon)) return 'lucide'
    return 'invalid'
  }
  return skill.fallback ? 'fallback' : 'none'
}

/**
 * The badge numbers rendered in each card header (`usedCount/total`) and the
 * Legend's used/learning split. Changing content here is expected to fail —
 * update the numbers deliberately when the data actually changes.
 */
const EXPECTED_COUNTS: Record<string, [used: number, total: number]> = {
  Foundations: [11, 11],
  'Generative AI': [9, 11],
  'AI Agents & Agentic AI': [8, 10],
  'Data Analysis & BI': [7, 7],
  'Data & Storage': [2, 7],
  'Data Engineering & Streaming': [0, 6],
  'Model Deployment & Infra': [2, 6],
  'MLOps & LLMOps': [4, 8],
  'Application Development': [4, 7],
  'Other Useful Skills': [6, 9],
  'Web & UI/UX': [12, 12],
}

const TOTALS = { groups: 11, skills: 94, used: 65, learning: 29 }

describe('SKILL_GROUPS contract', () => {
  it('renders one category card per group', () => {
    // Mirrors the e2e assertion "all 11 skill groups render".
    expect(SKILL_GROUPS).toHaveLength(TOTALS.groups)
  })

  it('uses unique group titles (they are the React keys)', () => {
    const titles = SKILL_GROUPS.map((g) => g.title)
    expect(new Set(titles).size).toBe(titles.length)
  })

  it.each(SKILL_GROUPS.map((g) => [g.title, g] as const))(
    'group "%s" has chrome and at least one skill',
    (_title, group) => {
      expect(group.title.trim().length).toBeGreaterThan(0)
      expect(group.subtitle.trim().length).toBeGreaterThan(0)
      expect(group.accent).toMatch(HEX_6)
      expect(group.items.length).toBeGreaterThan(0)
    },
  )

  it('declares every group in the pinned badge counts', () => {
    expect(Object.keys(EXPECTED_COUNTS).sort()).toEqual(
      SKILL_GROUPS.map((g) => g.title).sort(),
    )
  })
})

describe('skill tile contract', () => {
  it.each(ALL_SKILLS.map(({ group, skill }) => [`${group} / ${skill.name}`, skill] as const))(
    '%s resolves to exactly one icon source',
    (_label, skill) => {
      const kind = tileKind(skill)

      // Every entry needs an icon OR a fallback text tile — never both, never neither.
      expect(
        kind,
        kind === 'none'
          ? `"${skill.name}" has no icon and no fallback tile — add a brand icon or a fallback + tint`
          : kind === 'invalid'
            ? `"${skill.name}".icon is neither a renderable lucide component nor Iconify brand data (body must be a non-empty string)`
            : undefined,
      ).not.toBe('none')
      expect(kind).not.toBe('invalid')

      if (skill.icon) expect(skill.fallback).toBeUndefined()
      if (skill.fallback) expect(skill.icon).toBeUndefined()
    },
  )

  it.each(ALL_SKILLS.map(({ group, skill }) => [`${group} / ${skill.name}`, skill] as const))(
    '%s has valid status, name, colour and detail',
    (_label, skill) => {
      expect(skill.name.trim().length).toBeGreaterThan(0)
      expect(['used', 'learning']).toContain(skill.status)
      // Tints are concatenated with alpha suffixes in the tile styles.
      if (skill.tint !== undefined) expect(skill.tint).toMatch(HEX_6)
      // Drives the tooltip and the click-to-expand row.
      expect(skill.detail?.trim().length ?? 0).toBeGreaterThan(0)
    },
  )

  it.each(
    ALL_SKILLS.filter(({ skill }) => skill.fallback).map(
      ({ group, skill }) => [`${group} / ${skill.name}`, skill.fallback!] as const,
    ),
  )('%s has a tile-sized fallback (%s)', (_label, fallback) => {
    // Fallback text sits in a fixed 30x30 box at text-[10px].
    const glyphs = [...fallback]
    expect(glyphs.length).toBeGreaterThan(0)
    expect(glyphs.length).toBeLessThanOrEqual(4)
  })

  it('uses unique skill names (each tile is its own key, no duplication)', () => {
    const names = ALL_SKILLS.map(({ skill }) => skill.name)
    const duplicates = names.filter((n, i) => names.indexOf(n) !== i)
    expect(duplicates).toEqual([])
  })

  it('keeps brand logo data well formed', () => {
    const brands = ALL_SKILLS.filter(({ skill }) => skill.icon && isBrandIcon(skill.icon))
    expect(brands.length).toBeGreaterThan(0)
    for (const { skill } of brands) {
      if (!isBrandIcon(skill.icon!)) continue
      expect(skill.icon.body.trim().length).toBeGreaterThan(0)
    }
  })
})

describe('status counts stay consistent', () => {
  it.each(
    Object.entries(EXPECTED_COUNTS).map(
      ([title, [used, total]]) => [title, used, total] as const,
    ),
  )('"%s" badge shows %i of %i used', (title, used, total) => {
    const group = SKILL_GROUPS.find((g) => g.title === title)
    expect(group, `missing group "${title}"`).toBeDefined()
    expect(group!.items.length).toBe(total)
    expect(group!.items.filter((s) => s.status === 'used').length).toBe(used)
  })

  it('pins the overall used/learning split', () => {
    const used = ALL_SKILLS.filter(({ skill }) => skill.status === 'used').length
    const learning = ALL_SKILLS.length - used
    expect({
      groups: SKILL_GROUPS.length,
      skills: ALL_SKILLS.length,
      used,
      learning,
    }).toEqual(TOTALS)
  })
})

describe('isBrandIcon', () => {
  const lucide = SOFT_SKILLS[0].icon

  it('accepts Iconify icon data', () => {
    expect(isBrandIcon({ body: '<path d="M0 0h1v1H0z"/>', width: 24, height: 24 })).toBe(true)
  })

  it('rejects lucide components', () => {
    expect(isBrandIcon(lucide)).toBe(false)
  })

  it('rejects object-like junk without a body', () => {
    expect(isBrandIcon({} as AnyIcon)).toBe(false)
    expect(isBrandIcon(null as unknown as AnyIcon)).toBe(false)
  })

  it('separates brand data from lucide components', () => {
    expect(isLucideIcon({ body: '<path/>' })).toBe(false)
    expect(isLucideIcon(lucide)).toBe(true)
    expect(isLucideIcon({} as AnyIcon)).toBe(false)
  })

  it('every skill icon is either a renderable lucide component or brand data', () => {
    for (const { skill } of ALL_SKILLS) {
      if (!skill.icon) continue
      const ok = isBrandIcon(skill.icon) || isLucideIcon(skill.icon)
      expect(ok, `"${skill.name}" icon is neither renderable nor brand data`).toBe(true)
    }
  })
})

describe('icon dependency rule', () => {
  // ARCHITECTURE.md: brand logos come only from @iconify-icons/logos and
  // @iconify-icons/simple-icons, rendered by @iconify/react — no second icon
  // library. `lucide-react` is allowed for generic glyphs.
  const ALLOWED = [
    '@iconify-icons/logos/',
    '@iconify-icons/simple-icons/',
    '@iconify/react',
    'lucide-react',
  ]

  const dataDir = path.join(process.cwd(), 'lib', 'data')

  it.each(readdirSync(dataDir).filter((f) => f.endsWith('.ts')))(
    'lib/data/%s only imports approved icon packages',
    (file) => {
      const source = readFileSync(path.join(dataDir, file), 'utf8')
      const specifiers = [...source.matchAll(/from\s+'([^']+)'/g)].map((m) => m[1])
      const iconImports = specifiers.filter((s) => /icons?/i.test(s))
      const offenders = iconImports.filter((s) => !ALLOWED.some((a) => s.startsWith(a)))
      expect(offenders).toEqual([])
    },
  )
})

describe('soft skills & career domains icons', () => {
  it('soft skills each carry a renderable lucide icon', () => {
    for (const skill of SOFT_SKILLS) {
      expect(isLucideIcon(skill.icon), `${skill.name} needs a renderable icon`).toBe(true)
      expect(skill.color).toMatch(HEX_6)
    }
  })

  it('career domains each carry an icon and icon-bearing workflow steps', () => {
    for (const domain of CAREER_DOMAINS) {
      expect(isLucideIcon(domain.icon), `${domain.title} needs a renderable icon`).toBe(true)
      expect(domain.color).toMatch(HEX_6)
      expect(domain.workflow.length).toBeGreaterThan(0)
      for (const step of domain.workflow) {
        expect(isLucideIcon(step.icon), `${domain.title} / ${step.label} needs a renderable icon`).toBe(true)
      }
    }
  })
})
