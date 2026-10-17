import { useRouterState } from '@tanstack/react-router'
import { useEffect } from 'react'

import { initAnalytics, trackPageView } from '@/lib/analytics'

/**
 * Sends a page_view after each navigation resolves, first load included. Runs in an effect so
 * the new page's <title> has already rendered.
 */
function Analytics() {
  const pagePath = useRouterState({
    select: (s) => {
      const location = s.resolvedLocation ?? s.location
      return location.pathname + location.searchStr
    },
  })

  useEffect(() => {
    initAnalytics()
    trackPageView(pagePath)
  }, [pagePath])

  return null
}

export { Analytics }
