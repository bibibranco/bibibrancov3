import { defineConfig, devices } from '@playwright/test'

// Browser tests (PORT-505) against the production build: run `pnpm build` first. `vite preview`
// serves dist/ with the same prerendered pages and 404s as the host, but not vercel.json's
// redirects (those are unit-tested in scripts/vercel-redirects.test.ts).
const port = 4173

export default defineConfig({
  testDir: 'e2e',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['github'], ['list']] : 'list',
  use: { baseURL: `http://localhost:${port}`, trace: 'retain-on-failure' },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    // Chromium at phone size (no WebKit download needed in CI).
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],
  webServer: {
    command: `pnpm exec vite preview --port ${port} --strictPort`,
    port,
    reuseExistingServer: !process.env.CI,
  },
})
