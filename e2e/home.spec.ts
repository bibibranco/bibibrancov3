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

const star = (page: import('@playwright/test').Page) =>
  page.getByRole('button', { name: 'Drop a tool from the star' }).and(page.locator(':visible'))
const status = (page: import('@playwright/test').Page) =>
  page.locator('section[aria-labelledby="hero-heading"] [role="status"]:visible')

test('the hero star spins only without reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  const svg = star(page).locator('svg')
  await expect(svg).toHaveAttribute('aria-hidden', 'true')
  await expect(svg).toHaveCSS('animation-name', 'none')
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await expect(svg).toHaveCSS('animation-name', 'star-spin')
})

// PORT-410: hero play, option A. The star drops tools; "tidy up" clears them.
test.describe('hero play', () => {
  test('the star drops tools, the status line counts them, tidy up clears them', async ({
    page,
    isMobile,
  }) => {
    await page.goto('/')
    const area = page.getByTestId(isMobile ? 'hero-tray' : 'hero-layer')
    await expect(status(page)).toContainText('the star. it has things to show you.')

    await star(page).click()
    await expect(status(page)).toHaveText('1 thing out · latest: a pencil')
    await star(page).click()
    await star(page).click()
    await expect(status(page)).toHaveText('3 things out · latest: a terminal')
    await expect(area.locator('.hero-tool')).toHaveCount(3)
    await expect(area.locator('.hero-tool').first()).toHaveAttribute('aria-hidden', 'true')

    await page.getByRole('button', { name: 'tidy up' }).and(page.locator(':visible')).click()
    await expect(status(page)).toContainText('the star. it has things to show you.')
    await expect(page.locator('.hero-tool')).toHaveCount(0)
  })

  test('with reduced motion, tools land stacked and stay put', async ({ page, isMobile }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/')
    for (let i = 0; i < 4; i++) await star(page).click()
    const area = page.getByTestId(isMobile ? 'hero-tray' : 'hero-layer')
    const tools = area.locator('.hero-tool')
    await expect(tools).toHaveCount(4)

    const boxes = async () => tools.evaluateAll((els) => els.map((el) => el.style.transform))
    const before = await boxes()
    await page.waitForTimeout(300)
    expect(await boxes()).toEqual(before)

    // Every tool sits inside the play area, on the floor or on the pile. The tilt (up to 5°) lets a
    // long tool's rotated corner reach a few pixels past its box.
    const areaBox = (await area.boundingBox())!
    for (const box of await tools.evaluateAll((els) =>
      els.map((el) => el.getBoundingClientRect().toJSON()),
    )) {
      expect(box.bottom).toBeLessThanOrEqual(areaBox.y + areaBox.height + 10)
    }
  })

  test('tools never cover the copy or the buttons', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Phones use a tray below the buttons')
    await page.goto('/')
    for (let i = 0; i < 8; i++) await star(page).click()
    await page.waitForTimeout(1500)
    await page.getByRole('link', { name: 'See my work' }).click({ trial: true })
    await page.getByRole('link', { name: 'Say hi' }).first().click({ trial: true })
  })
})
