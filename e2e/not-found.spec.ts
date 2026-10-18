import { expect, test } from '@playwright/test'

import { draftSlugs } from './pages'

// Unknown pages and draft projects answer 404 with the noindex not-found page (PORT-409).
const missing = ['/nope', '/work/does-not-exist', ...draftSlugs().map((slug) => `/work/${slug}`)]

for (const path of missing) {
  test(`${path} is a 404`, async ({ page }) => {
    const response = await page.goto(path)
    expect(response?.status()).toBe(404)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText("This page doesn't exist.")
    await expect(page.locator('meta[name="robots"][content="noindex"]')).toHaveCount(1)
  })
}
