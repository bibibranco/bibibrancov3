import { HeadContent, Outlet, Scripts, createRootRoute } from '@tanstack/react-router'

import { Analytics } from '@/components/site/analytics'
import { NotFound } from '@/components/site/not-found'
import { SiteFooter } from '@/components/site/site-footer'
import { SiteHeader, SkipLink } from '@/components/site/site-header'
import { seo, themeColor } from '@/lib/seo'
import appCss from '@/styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'theme-color', content: themeColor },
      ...seo(),
    ],
    // Icons and manifest from scripts/brand-assets.ts (PORT-501).
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', href: '/favicon.ico', sizes: '32x32' },
      { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
      { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      { rel: 'manifest', href: '/site.webmanifest' },
    ],
  }),
  shellComponent: RootDocument,
  component: RootLayout,
  notFoundComponent: NotFound,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}

function RootLayout() {
  return (
    <>
      <SkipLink />
      <SiteHeader />
      {/* tabIndex lets the skip link move focus here; main itself shows no ring. */}
      <main id="main" tabIndex={-1} className="focus-visible:outline-none">
        <Outlet />
      </main>
      <SiteFooter />
      <Analytics />
    </>
  )
}
