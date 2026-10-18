// GA4 via gtag, same property as v3 so history carries over (PORT-502).
// Events and params come from tickets/artifacts/brief.md §4.

const measurementId = 'G-KR5JD1GYC2'

// Only the live domain reports. Dev, PR previews and the v4 project's pre-launch URL stay silent.
const productionHosts = ['bibibran.co', 'www.bibibran.co']

// `?ga_debug=1` turns tracking on for the rest of the tab with debug_mode, for GA4 DebugView.
const debugParam = 'ga_debug'
const debugStorageKey = 'ga-debug'

type Location = 'hero' | 'home' | 'footer' | 'case_study' | 'about'
type Category = 'work' | 'craft'

type Events = {
  case_study_view: { slug: string; category: Category }
  case_study_read: { slug: string; category: Category }
  prototype_click: { slug: string; destination: 'live' | 'repo' }
  contact_click: { method: 'email' | 'linkedin'; location: Location }
  outbound_click: { channel: 'linkedin' | 'medium'; location: Location }
}

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

let enabled = false
let lastPagePath: string | undefined

function isDebug() {
  try {
    if (new URLSearchParams(window.location.search).get(debugParam) === '1') {
      sessionStorage.setItem(debugStorageKey, '1')
    }
    return sessionStorage.getItem(debugStorageKey) === '1'
  } catch {
    return false
  }
}

/** Loads gtag once, on the client, when this host should report. Safe to call repeatedly. */
export function initAnalytics() {
  if (enabled || typeof window === 'undefined') return

  const debug = isDebug()
  if (!debug && !productionHosts.includes(window.location.hostname)) return

  window.dataLayer = window.dataLayer ?? []
  // gtag.js reads the `arguments` object, not an array, so this can't be a rest-param arrow.
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments)
  }
  window.gtag('js', new Date())
  window.gtag('config', measurementId, {
    // page_view is sent by trackPageView, once per navigation including the first.
    send_page_view: false,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    ...(debug && { debug_mode: true }),
  })

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
  document.head.append(script)

  enabled = true
}

/** One page_view per path + query. Hash-only changes (e.g. "Say hi" → #contact) don't count. */
export function trackPageView(pagePath: string) {
  if (!enabled || pagePath === lastPagePath) return
  lastPagePath = pagePath
  window.gtag?.('event', 'page_view', {
    page_location: window.location.href,
    page_path: pagePath,
    page_title: document.title,
  })
}

export function track<E extends keyof Events>(event: E, params: Events[E]) {
  if (!enabled) return
  window.gtag?.('event', event, params)
}
