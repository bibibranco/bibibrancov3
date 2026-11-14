import { expect, test } from '@playwright/test'

// PORT-402: the hero is in the prerendered HTML and its gun drawing is decoration only.
test.describe('home hero', () => {
  test.use({ javaScriptEnabled: false })

  test('headline, name and calls to action render without JavaScript', async ({ page }) => {
    await page.goto('/')
    const heading = page.getByRole('heading', { level: 1 })
    await expect(heading).toContainText('Bibi Branco, product designer')
    await expect(heading).toContainText('Design, and other incidents.')
    await expect(page.getByRole('link', { name: 'See my work' })).toHaveAttribute('href', '/work')
    await expect(page.getByRole('link', { name: 'Say hi' }).first()).toHaveAttribute(
      'href',
      /#contact$/,
    )
  })
})

const star = (page: import('@playwright/test').Page) =>
  page.getByRole('button', { name: 'Reveal a gun from my arsenal' }).and(page.locator(':visible'))
// The mystery gun moves once on load, then stays still until hovered; reduced motion keeps it still.
test('the hero gun moves on load and on hover only, and not with reduced motion', async ({
  page,
  isMobile,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  const button = star(page)
  await expect(button.locator('svg').first()).toHaveAttribute('aria-hidden', 'true')
  const intro = button.locator('[data-intro]')
  const recoil = button.locator('[data-recoil]')
  await expect(intro).toHaveCSS('animation-name', 'none')

  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await expect(intro).toHaveCSS('animation-name', 'gun-intro')
  await expect(intro).toHaveCSS('animation-iteration-count', '1')
  await expect(recoil).toHaveCSS('animation-name', 'none')
  if (!isMobile) {
    await button.hover()
    await expect(recoil).toHaveCSS('animation-name', 'gun-wiggle')
  }
})

const status = (page: import('@playwright/test').Page) =>
  page.locator('section[aria-labelledby="hero-heading"] [role="status"]:visible')

// PORT-205 (engine from PORT-410): the toy gun fires the good guns; "tidy up" clears them.
test.describe('hero gun', () => {
  test('the gun fires good guns, the status line names them, tidy up clears them', async ({
    page,
    isMobile,
  }) => {
    await page.goto('/')
    const area = page.getByTestId(isMobile ? 'hero-tray' : 'hero-layer')
    await expect(status(page)).toContainText('check out a really cool gun from my arsenal')

    await star(page).click()
    await expect(status(page)).toContainText('heat gun:')
    await star(page).click()
    await star(page).click()
    await expect(status(page)).toContainText('nail gun:')
    await expect(area.locator('.hero-tool')).toHaveCount(3)
    await expect(area.locator('.hero-tool').first()).toHaveAttribute('aria-hidden', 'true')

    await page.getByRole('button', { name: 'tidy up' }).and(page.locator(':visible')).click()
    await expect(status(page)).toContainText('check out a really cool gun from my arsenal')
    await expect(page.locator('.hero-tool')).toHaveCount(0)
  })

  test('guns land apart, inside the hero, and stay where they are dragged', async ({
    page,
    isMobile,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/')
    const clicks = isMobile ? 3 : 4
    for (let i = 0; i < clicks; i++) await star(page).click()
    const area = page.getByTestId(isMobile ? 'hero-tray' : 'hero-layer')
    const guns = area.locator('.hero-tool')
    await expect(guns).toHaveCount(clicks)

    const areaBox = (await area.boundingBox())!
    const boxes = await guns.evaluateAll((els) =>
      els.map((el) => el.getBoundingClientRect().toJSON()),
    )
    for (const box of boxes) {
      expect(box.top).toBeGreaterThanOrEqual(areaBox.y - 20)
      expect(box.bottom).toBeLessThanOrEqual(areaBox.y + areaBox.height + 20)
    }

    // Drag the last gun (on top, so nothing covers it) 50px toward the middle; it stays there.
    const gun = guns.last()
    const before = (await gun.boundingBox())!
    const dx = before.x + before.width / 2 > areaBox.x + areaBox.width / 2 ? -50 : 50
    const cx = before.x + before.width / 2
    const cy = before.y + before.height / 2
    await page.mouse.move(cx, cy)
    await page.mouse.down()
    await page.mouse.move(cx + dx, cy, { steps: 5 })
    await page.mouse.up()
    await page.waitForTimeout(300)
    const after = (await gun.boundingBox())!
    expect(Math.abs(after.x - before.x - dx)).toBeLessThan(5)
  })
})

// PORT-205: unfinished projects under the desk. Not case studies, so no links.
test('the wall of shame lists unfinished projects without links', async ({ page }) => {
  await page.goto('/')
  const wall = page.getByRole('region', { name: 'wall of shame' })
  await expect(wall.getByRole('listitem')).toHaveCount(2)
  await expect(wall).toContainText('good guns')
  await expect(wall).toContainText('cafuné')
  await expect(wall.getByRole('link')).toHaveCount(0)
})
