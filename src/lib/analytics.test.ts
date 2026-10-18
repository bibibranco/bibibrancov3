// @vitest-environment jsdom
import { beforeEach, describe, expect, it, vi } from 'vitest'

// analytics.ts keeps module state (enabled, last page path), so each test loads a fresh copy.
async function load(url: string) {
  window.history.replaceState(null, '', url)
  vi.resetModules()
  return import('./analytics')
}

/** gtag calls as plain arrays (gtag pushes `arguments` objects). */
function calls() {
  return (window.dataLayer ?? []).map((entry) => Array.from(entry as ArrayLike<unknown>))
}

beforeEach(() => {
  delete window.dataLayer
  delete window.gtag
  sessionStorage.clear()
  document.head.innerHTML = ''
})

describe('analytics off the production domain', () => {
  it('loads nothing and sends nothing', async () => {
    const { initAnalytics, track } = await load('/')
    initAnalytics()
    track('contact_click', { method: 'email', location: 'footer' })
    expect(window.dataLayer).toBeUndefined()
    expect(document.querySelector('script[src*="googletagmanager"]')).toBeNull()
  })
})

describe('analytics with ?ga_debug=1', () => {
  it('loads gtag once with debug_mode and privacy settings', async () => {
    const { initAnalytics } = await load('/?ga_debug=1')
    initAnalytics()
    initAnalytics()
    expect(document.querySelectorAll('script[src*="googletagmanager"]')).toHaveLength(1)
    const config = calls().find((call) => call[0] === 'config')
    expect(config?.[2]).toMatchObject({
      send_page_view: false,
      allow_google_signals: false,
      debug_mode: true,
    })
  })

  it('stays on for the tab after the param is gone', async () => {
    const first = await load('/?ga_debug=1')
    first.initAnalytics()
    delete window.dataLayer
    const { initAnalytics } = await load('/work')
    initAnalytics()
    expect(window.dataLayer).toBeDefined()
  })

  it('sends typed events', async () => {
    const { initAnalytics, track } = await load('/?ga_debug=1')
    initAnalytics()
    track('contact_click', { method: 'linkedin', location: 'about' })
    expect(calls()).toContainEqual([
      'event',
      'contact_click',
      { method: 'linkedin', location: 'about' },
    ])
  })

  it('sends one page_view per path, ignoring repeats', async () => {
    const { initAnalytics, trackPageView } = await load('/?ga_debug=1')
    initAnalytics()
    trackPageView('/work')
    trackPageView('/work')
    trackPageView('/about')
    const pageViews = calls().filter((call) => call[1] === 'page_view')
    expect(pageViews.map((call) => (call[2] as { page_path: string }).page_path)).toEqual([
      '/work',
      '/about',
    ])
  })
})
