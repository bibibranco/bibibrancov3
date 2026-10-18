import { expect, test } from '@playwright/test'

import { publicPaths } from './pages'

// PORT-504: no third-party requests. Fonts, images and scripts are all self-hosted. GA is the one
// allowed exception, and it only loads on the live domain (src/lib/analytics.ts), so here every
// request must stay on this origin.
for (const path of publicPaths()) {
  test(`${path} only requests its own origin`, async ({ page, baseURL }) => {
    const origin = new URL(baseURL!).origin
    const external: string[] = []
    page.on('request', (request) => {
      const url = new URL(request.url())
      if (url.protocol.startsWith('http') && url.origin !== origin) external.push(request.url())
    })
    await page.goto(path)
    await page.waitForLoadState('networkidle')
    expect(external).toEqual([])
  })
}
