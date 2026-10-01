import { defineConfig } from '@playwright/test'

/**
 * Viewport regression suite. Runs against the static export in ./out via the
 * tiny local server in e2e/static-server.mjs (Next `start` is unavailable for
 * `output: 'export'`). `npx playwright test` — install browsers first with
 * `npx playwright install chromium`.
 */
export default defineConfig({
  testDir: './e2e',
  timeout: 30_000,
  // The page is animation-heavy (canvas particles, many blurs) — full parallel
  // workers crashed Chromium tabs under memory pressure. Serial-ish is plenty
  // for a suite this size.
  fullyParallel: false,
  workers: 2,
  retries: 1,
  use: {
    baseURL: 'http://localhost:4173',
    headless: true,
  },
  webServer: {
    command: 'node e2e/static-server.mjs',
    url: 'http://localhost:4173',
    reuseExistingServer: true,
    timeout: 15_000,
  },
  projects: [{ name: 'chromium', use: { browserName: 'chromium' } }],
})
