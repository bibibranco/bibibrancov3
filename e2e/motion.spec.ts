import { expect, test } from '@playwright/test'

import { publicPaths } from './pages'

// PORT-204: motion is the enhancement, reduced motion the default, and nothing waits on JS.
test.describe('reduced motion', () => {
  test.use({ reducedMotion: 'reduce' })

  test('anchors jump instead of scrolling smoothly', async ({ page }) => {
    await page.goto('/')
    const behavior = await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    )
    expect(behavior).toBe('auto')
  })
})

test.describe('no motion preference', () => {
  test.use({ reducedMotion: 'no-preference' })

  test('anchors scroll smoothly', async ({ page }) => {
    await page.goto('/')
    const behavior = await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    )
    expect(behavior).toBe('smooth')
  })
})

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false })

  for (const path of publicPaths()) {
    test(`${path} has no content hidden at opacity 0`, async ({ page }) => {
      await page.goto(path)
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
      const hidden = await page.evaluate(() =>
        [...document.querySelectorAll('main *')]
          .filter((el) => getComputedStyle(el).opacity === '0')
          .map((el) => el.outerHTML.slice(0, 80)),
      )
      expect(hidden).toEqual([])
    })
  }
})
