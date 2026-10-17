import { createFileRoute } from '@tanstack/react-router'

import { NotFound } from '@/components/site/not-found'
import { seo } from '@/lib/seo'

// Prerendered to `404.html` (see vite.config.ts); the host serves it for unknown URLs.
export const Route = createFileRoute('/404')({
  head: () => ({
    meta: seo({
      title: 'Page not found',
      description: "This page doesn't exist. Try the home page or the work index.",
    }),
  }),
  component: NotFound,
})
