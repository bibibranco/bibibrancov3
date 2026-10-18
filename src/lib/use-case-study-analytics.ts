import { useEffect, type RefObject } from 'react'

import { track } from '@/lib/analytics'
import type { Category } from '@/lib/content'

/**
 * case_study_view once per visit to a slug, and case_study_read once when `readMarker` (placed
 * at 75% of the body) scrolls into view (PORT-502, brief §4).
 */
function useCaseStudyAnalytics(
  slug: string,
  category: Category,
  readMarker: RefObject<HTMLElement | null>,
) {
  // Deferred a tick: this effect runs before the root <Analytics> one that loads gtag and sends
  // page_view, so the event would be dropped on a first load. The cleanup also keeps strict
  // mode's double effect run from counting twice.
  useEffect(() => {
    const id = setTimeout(() => track('case_study_view', { slug, category }))
    return () => clearTimeout(id)
  }, [slug, category])

  useEffect(() => {
    const marker = readMarker.current
    if (!marker) return
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        track('case_study_read', { slug, category })
        observer.disconnect()
      }
    })
    observer.observe(marker)
    return () => observer.disconnect()
  }, [slug, category, readMarker])
}

export { useCaseStudyAnalytics }
