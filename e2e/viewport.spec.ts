import { test, expect } from '@playwright/test'

const VIEWPORTS = [
  { name: 'mobile-320', width: 320, height: 700 },
  { name: 'mobile-390', width: 390, height: 800 },
  { name: 'tablet-768', width: 768, height: 900 },
  { name: 'desktop-1280', width: 1280, height: 800 },
]

// Each viewport gets its OWN describe: test.use() modifies describe-level
// options, so a bare loop would leave every test at the last viewport.
for (const vp of VIEWPORTS) {
  test.describe(`responsive @ ${vp.name}`, () => {
    test.use({ viewport: { width: vp.width, height: vp.height } })

    test('document does not scroll horizontally', async ({ page }) => {
      await page.goto('/')
      await page.waitForLoadState('networkidle')
      const overflow = await page.evaluate(
        () =>
          document.documentElement.scrollWidth >
          document.documentElement.clientWidth + 1
      )
      expect(overflow, `horizontal overflow at ${vp.width}px`).toBe(false)
    })

    test('nav works (hamburger on mobile, links on desktop)', async ({ page }) => {
      await page.goto('/')
      const burger = page.getByRole('button', { name: /open menu/i })
      // "Projects" exists in header nav and footer nav — take the header copy
      const projects = page
        .locator('nav[aria-label="Main navigation"] a[href="#projects"]')
        .locator('visible=true')
        .first()
      if (vp.width < 768) {
        await expect(burger).toBeVisible()
        await burger.click()
        await projects.click()
        await expect(page).toHaveURL(/#projects/)
      } else {
        await expect(burger).toBeHidden()
        await projects.click()
        await expect(page).toHaveURL(/#projects/)
      }
    })

    test('all 11 skill groups render', async ({ page }) => {
      await page.goto('/')
      await page.waitForLoadState('networkidle')
      const headings = page.locator('#skills h3')
      await expect(headings).toHaveCount(11)
    })
  })
}

test.describe('interactions', () => {
  test.use({ viewport: { width: 1280, height: 800 } })

  test('skill tile expands detail on click', async ({ page }) => {
    await page.goto('/')
    const tile = page.getByRole('button', { name: /LangGraph/ })
    await tile.scrollIntoViewIfNeeded()
    await tile.click()
    await expect(page.locator('[aria-expanded="true"]')).toContainText(
      'Graph-based agent orchestration'
    )
  })

  test('certifications modal traps Tab focus and restores it on close', async ({
    page,
  }) => {
    await page.goto('/')
    const openers = page.locator('#certifications button')
    await openers.first().scrollIntoViewIfNeeded()
    await openers.first().click()

    const dialog = page.locator('[role="dialog"]')
    await expect(dialog).toBeVisible()
    // First Tab press lands inside the dialog (trapped)
    await page.keyboard.press('Tab')
    const inside = await dialog.evaluate(
      (el) => el.contains(document.activeElement) || el === document.activeElement
    )
    expect(inside).toBe(true)

    await page.keyboard.press('Escape')
    await expect(dialog).toHaveCount(0)
    // Focus returned to the page
    const restored = await page.evaluate(() => document.activeElement !== document.body)
    expect(restored).toBe(true)
  })

  test('career modal closes on ESC and locks scroll while open', async ({ page }) => {
    await page.goto('/')
    const card = page.locator('#career-focus .cursor-pointer').first()
    await card.scrollIntoViewIfNeeded()
    await card.click()

    const dialog = page.locator('[role="dialog"]').or(
      page.locator('div.max-w-2xl.overflow-y-auto')
    )
    await expect(dialog.first()).toBeVisible()
    const locked = await page.evaluate(() => document.body.style.overflow === 'hidden')
    expect(locked).toBe(true)

    await page.keyboard.press('Escape')
    await page.waitForTimeout(100)
    const unlocked = await page.evaluate(() => document.body.style.overflow !== 'hidden')
    expect(unlocked).toBe(true)
  })

  test('contact form inputs meet the 16px mobile no-zoom rule', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 800 })
    await page.goto('/')
    const font = await page
      .locator('#contact input#name')
      .evaluate((el) => parseFloat(getComputedStyle(el).fontSize))
    expect(font).toBeGreaterThanOrEqual(16)
  })
})
