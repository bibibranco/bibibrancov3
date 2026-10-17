import { createRouter as createTanStackRouter } from '@tanstack/react-router'
import { NotFound } from './components/site/not-found'
import { RouteError } from './components/site/route-error'
import { routeTree } from './routeTree.gen'

export function getRouter() {
  const router = createTanStackRouter({
    routeTree,
    // Rendered inside the root layout, so the header and footer stay.
    defaultErrorComponent: RouteError,
    defaultNotFoundComponent: NotFound,
    scrollRestoration: true,
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 0,
  })

  return router
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
