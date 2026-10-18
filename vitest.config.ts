import path from 'node:path'

import { defineConfig } from 'vitest/config'

// Unit tests (PORT-505). Separate from vite.config.ts so the TanStack Start and content plugins
// don't load. Browser tests live in e2e/ and run with Playwright.
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve('src'),
      'content-collections': path.resolve('.content-collections/generated'),
    },
  },
  test: {
    include: ['src/**/*.test.ts', 'scripts/**/*.test.ts'],
    environment: 'node',
  },
})
