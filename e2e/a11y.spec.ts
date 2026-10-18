import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

import { publicPaths } from './pages'

// PORT-503: the keyboard, narrow-screen and forced-colours checks that axe alone doesn't make.
// routes.spec.ts runs axe on every page at the two device sizes.

const wcag = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']

for (const path of publicPaths()) {
  test(`${path}: every Tab stop is visible and shows the focus ring`, async ({ page }) => {
    await page.goto(path)
    const seen = new Set<string>()
    for (let i = 0; i < 100; i++) {
      await page.keyboard.press('Tab')
      const stop = await page.evaluate(() => {
        const el = document.activeElement
        if (!el || el === document.body) return null
        const box = el.getBoundingClientRect()
        return {
          key: `${el.tagName} ${box.x + scrollX},${box.y + scrollY}`,
          label: `${el.tagName} "${(el.getAttribute('aria-label') ?? el.textContent ?? '').trim().slice(0, 40)}"`,
          outline: getComputedStyle(el).outlineStyle,
          size: box.width * box.height,
          hidden: Boolean(el.closest('[aria-hidden="true"]')),
        }
      })
      // Focus has left the page, or wrapped round to the first stop.
      if (!stop || seen.has(stop.key)) break
      seen.add(stop.key)
      expect.soft(stop.outline, `${stop.label} focus ring`).not.toBe('none')
      expect.soft(stop.size, `${stop.label} size`).toBeGreaterThan(0)
      expect.soft(stop.hidden, `${stop.label} inside aria-hidden`).toBe(false)
    }
    expect(seen.size).toBeGreaterThan(3)
  })

  test(`${path}: no horizontal scroll at 320px`, async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 640 })
    await page.goto(path)
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    )
    expect(overflow).toBeLessThanOrEqual(0)
  })

  test(`${path}: no axe violations with forced colours`, async ({ page }) => {
    await page.emulateMedia({ forcedColors: 'active' })
    await page.goto(path)
    // The system palette replaces author colours, so axe's contrast maths no longer describes what
    // is painted; contrast is the user's theme here. Every other rule still runs.
    const { violations } = await new AxeBuilder({ page })
      .withTags(wcag)
      .disableRules(['color-contrast'])
      .analyze()
    expect(
      violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`),
    ).toEqual([])
  })
}

test('the skip link is the first stop and moves focus to main', async ({ page }) => {
  await page.goto('/')
  await page.keyboard.press('Tab')
  const skip = page.getByRole('link', { name: 'Skip to content' })
  await expect(skip).toBeFocused()
  await expect(skip).toBeInViewport()
  await page.keyboard.press('Enter')
  await expect(page.locator('main')).toBeFocused()
})

test('desk objects keep an edge with forced colours', async ({ page }) => {
  await page.emulateMedia({ forcedColors: 'active' })
  await page.goto('/')
  const object = page.locator('.desk-object').first()
  await expect(object).toHaveCSS('border-top-style', 'solid')
})
