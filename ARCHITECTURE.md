# Architecture

A four-layer split. Each concern has exactly one home, and data flows one way:
**content / integration → behaviour → presentation**.

```
app/
  layout.tsx        page chrome only (fonts, metadata, global overlays)
  page.tsx          composition only — the list of sections, in order
  globals.css       design tokens, .reveal classes, ALL animation keyframes

components/         presentation only
  Section.tsx       the single owner of section chrome
  LazySections.tsx  code-splits the below-fold sections (still SSR'd; SEO unchanged)
  <Section>.tsx     one file per section: render + local UI state, nothing else

e2e/                Playwright viewport regression suite (static export + tiny server)

lib/
  constants.ts      CONTACT — identity handles (contract-tested)
  hooks.ts          reusable browser behaviour
  contact.ts        web3forms integration
  github.ts         GitHub integration
  data/             static content
    profile.ts      nav links, footer links, socials, contact cards
    about.ts        highlights, AI workflow steps
    resume.ts       experience, education, certifications (+ types)
    projects.ts     project case studies
    skills.ts       skill groups (one entry per skill), soft skills, career domains
```

## Ownership rules

- **Content** lives in `lib/data/*`. A section component maps over imported data; it
  never declares an array of copy. Each item's TypeScript type sits next to its data.
- **Network / business rules** live in `lib/*.ts` (`contact.ts`, `github.ts`). A
  component never builds a URL, a payload, or decides what a response means. It holds
  only render state (`idle | sending | success | error`, `loading`, `error`).
- **Reusable browser behaviour** lives in `lib/hooks.ts`:
  - `useScrollReveal(stagger)` — adds `.visible` on intersection (class-driven reveal)
  - `useScrollSpy(ids, offset)` — active nav section
  - `useTilt({ max, scale, lift, perspective, resetOnLeave })` — card hover flag plus the
    3D transform that follows the cursor. Cards keep their own colour/glow styling.
  - `useModalFocus(active)` — modal dialog a11y: moves focus in on open, traps
    Tab inside, restores focus to the opener on close. Container gets `ref` +
    `tabIndex={-1}` + `role='dialog'` + `aria-modal='true'`.
  - `useBodyScrollLock(active)` — locks body scroll, restores the previous value
  - `useStepCycle(length, intervalMs)` — auto-advancing pipeline index
- **Section chrome** lives in `Section.tsx` only: outer padding, centred container,
  glowing title, optional subtitle, scroll-reveal wrapper. Escape hatches
  (`containerClassName`, `titleClassName`) exist for the rare section that needs them.
- **Per-section UI state** (which modal is open, which filter is active) stays in that
  section component. Nothing in `components/` imports from another section.
- **Brand logos** come only from `@iconify-icons/logos` and `@iconify-icons/simple-icons`
  deep imports (typed icon data), rendered via `@iconify/react`'s `<Icon>` in the data
  layer's own `SkillIconData` shape — never inline brand SVG copies and never a second
  icon library. Brands with no available mark (SQL, DAX, RAG…) use a styled `fallback`
  text tile instead of a fake logo. Status badges (`used` / `learning`) live in the
  data, not the component. The rule is enforced by `__tests__/skills.test.ts`,
  which scans `lib/data/` imports for any other icon package.
- **Icons are dual-typed.** Any slot that accepts either a brand mark or a generic
  glyph is typed as `AnyIcon` (`LucideIcon | SkillIconData`), narrowed at render time
  by `isBrandIcon()` (checks `typeof icon.body === 'string'`, exported from
  `lib/data/skills.ts`). Renderers branch **brand → lucide → text fallback** so a
  missing icon degrades instead of crashing. A section component never chooses a
  glyph, never draws a decorative inline SVG, and never uses emoji as an icon — the
  only surviving emoji are the pipeline-step glyphs in the About / project workflows
  (`ProjectWorkflowStep.icon`, `WORKFLOW_STEPS[].icon`), sized as text inside the
  pipeline rows.
- **Icon slots outside the skills grid** follow the same rule: `Highlight.icon`
  (About), `Experience.icon`, `Certification.badgeIcon`, `SoftSkill.icon`,
  `CareerDomain.icon` / `CareerWorkflowStep.icon` (all `LucideIcon`), and
  `Project.icon` (`SkillIconData`). Adding a tile means picking an icon in the data
  layer — components never choose a glyph.

## Adding a section

1. Add the content to `lib/data/<area>.ts` with its type.
2. Write `components/MySection.tsx`: import `Section`, import the data, map over it.
3. If it needs a modal, use `useBodyScrollLock(open)`; if items tilt, use `useTilt`.
4. Add it to `app/page.tsx` and, if navigable, to `NAV_LINKS` in `lib/data/profile.ts`.
5. Add any new keyframe to `app/globals.css` — never an inline `<style jsx>` block.

## Checks

- `npm test` — vitest, suites in `__tests__/` (aliased `@` → repo root).
  `skills.test.ts` is the data contract for the skills surface: every tile must
  resolve to exactly one icon source (brand data, lucide component, or fallback
  text), colours must be 6-digit hex (they get alpha suffixes concatenated),
  skill names stay unique, and the per-group `used/total` badge counts plus the
  overall used/learning split are pinned so content edits can't drift silently.
- `npx tsc --noEmit` — covers `app/`, `components/`, `lib/`, `__tests__/`
- `npm run build` — static export (`output: 'export'`), runs TypeScript as part of the build
- `npx playwright test` — e2e viewport suite (320/390/768/1280): overflow, nav,
  skills grid (asserts all 11 groups render), modal focus trap, 16px input rule.
  Serves `out/` via
  `e2e/static-server.mjs` (`output: 'export'` has no `next start`). Install
  browsers once with `npx playwright install chromium`.
