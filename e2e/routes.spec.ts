import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

import { publicPaths } from './pages'

// Every public page: 200, one h1, no horizontal scroll, and no axe violations (WCAG 2.2 A/AA
// rules, the automated part of PORT-503).
for (const path of publicPaths()) {
  test(`${path} renders`, async ({ page }) => {
    const response = await page.goto(path)
    expect(response?.status()).toBe(200)
    await expect(page.locator('h1')).toHaveCount(1)

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    )
    expect(overflow, 'horizontal scroll').toBeLessThanOrEqual(0)

    const { violations } = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze()
    expect(
      violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`),
    ).toEqual([])
  })
}
