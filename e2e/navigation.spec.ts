import { expect, test } from '@playwright/test'

test.describe('mobile menu', () => {
  test.skip(({ isMobile }) => !isMobile, 'The menu button only shows below md')

  test('opens and closes with the keyboard, and gives focus back', async ({ page }) => {
    await page.goto('/')
    const menuButton = page.getByRole('button', { name: 'Menu' })
    await menuButton.focus()
    await page.keyboard.press('Enter')

    const dialog = page.getByRole('dialog')
    await expect(dialog).toBeVisible()
    await expect(dialog.getByRole('link', { name: 'Work' })).toBeVisible()

    await page.keyboard.press('Escape')
    await expect(dialog).toBeHidden()
    await expect(menuButton).toBeFocused()
  })

  test('navigates and closes when a link is chosen', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: 'Menu' }).click()
    await page.getByRole('dialog').getByRole('link', { name: 'About' }).click()
    await expect(page).toHaveURL(/\/about$/)
    await expect(page.getByRole('dialog')).toBeHidden()
  })
})

test('"Say hi" lands on the contact block of a case study', async ({ page, isMobile }) => {
  await page.goto('/work/woodworking')
  if (isMobile) {
    await page.getByRole('button', { name: 'Menu' }).click()
    await page.getByRole('dialog').getByRole('link', { name: 'Say hi' }).click()
  } else {
    await page.getByRole('banner').getByRole('link', { name: 'Say hi' }).click()
  }
  await expect(page).toHaveURL(/#contact$/)
  await expect(page.getByRole('heading', { name: 'get in touch' })).toBeInViewport()
})

test('case studies link to their neighbours in the same group', async ({ page }) => {
  await page.goto('/work/woodworking')
  const more = page.getByRole('navigation', { name: 'More projects' })
  await more.getByRole('link').last().click()
  await expect(page).toHaveURL(/\/work\/[a-z0-9-]+$/)
  await expect(page.locator('h1')).toHaveCount(1)
})
