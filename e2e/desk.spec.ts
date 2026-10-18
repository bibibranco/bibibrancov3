import { expect, test } from '@playwright/test'

import { featuredFragmentCount } from './pages'

// PORT-403: "bits and pieces on my desk". One real link per featured fragment, named by its
// caption so the project title is always link text.
test.describe('home desk', () => {
  test('renders one link per featured fragment, each to a case study', async ({ page }) => {
    await page.goto('/')
    const desk = page.getByRole('region', { name: 'bits and pieces on my desk' })
    const links = desk.getByRole('link')
    await expect(links).toHaveCount(featuredFragmentCount())
    for (const link of await links.all()) {
      await expect(link).toHaveAttribute('href', /^\/work\/[a-z0-9-]+$/)
      await expect(link).toHaveAccessibleName(/\S/)
    }
    await expect(desk.getByRole('link', { name: /momoProto/ })).toHaveCount(2)
  })

  test('objects are reachable with Tab and open with Enter', async ({ page }) => {
    await page.goto('/')
    const first = page
      .getByRole('region', { name: 'bits and pieces on my desk' })
      .getByRole('link')
      .first()
    await first.focus()
    await expect(first).toBeFocused()
    const href = await first.getAttribute('href')
    await page.keyboard.press('Enter')
    await expect(page).toHaveURL(new RegExp(`${href}$`))
  })

  test('links to the full list', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('link', { name: 'Everything, tidy →' })).toHaveAttribute(
      'href',
      '/work',
    )
  })
})

test('desk objects lift on hover only without reduced motion', async ({ page, isMobile }) => {
  test.skip(isMobile, 'Hover')
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  const link = page
    .getByRole('region', { name: 'bits and pieces on my desk' })
    .getByRole('link')
    .first()
  await link.hover()
  await expect(link).toHaveCSS('translate', 'none')
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.mouse.move(0, 0)
  await link.hover()
  await expect(link).toHaveCSS('translate', '0px -6px')
})
