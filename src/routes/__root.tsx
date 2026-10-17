import { HeadContent, Outlet, Scripts, createRootRoute } from '@tanstack/react-router'

import { SiteFooter } from '@/components/site/site-footer'
import { SiteHeader, SkipLink } from '@/components/site/site-header'
import appCss from '@/styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Bibi Branco' },
    ],
    links: [{ rel: 'stylesheet', href: appCss }],
  }),
  shellComponent: RootDocument,
  component: RootLayout,
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
    </>
  )
}
