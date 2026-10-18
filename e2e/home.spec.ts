import { expect, test } from '@playwright/test'

// PORT-402: the hero is in the prerendered HTML and its star is decoration only.
test.describe('home hero', () => {
  test.use({ javaScriptEnabled: false })

  test('headline, name and calls to action render without JavaScript', async ({ page }) => {
    await page.goto('/')
    const heading = page.getByRole('heading', { level: 1 })
    await expect(heading).toContainText('Bibi Branco, product designer')
    await expect(heading).toContainText('I started with design. Got a little carried away.')
    await expect(page.getByRole('link', { name: 'See my work' })).toHaveAttribute('href', '/work')
    await expect(page.getByRole('link', { name: 'Say hi' }).first()).toHaveAttribute(
      'href',
      /#contact$/,
    )
  })
})

test('the hero star spins only without reduced motion', async ({ page, isMobile }) => {
  test.skip(isMobile, 'The star only shows from lg')
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  const star = page.locator('section[aria-labelledby="hero-heading"] svg')
  await expect(star).toHaveAttribute('aria-hidden', 'true')
  await expect(star).toHaveCSS('animation-name', 'none')
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await expect(star).toHaveCSS('animation-name', 'star-spin')
})
