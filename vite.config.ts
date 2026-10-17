import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [
    tanstackStart({
      // Every page ships as static HTML so crawlers and link previews see real content.
      prerender: {
        enabled: true,
        crawlLinks: true,
        failOnError: true,
        // Dev-only routes (PORT-202 kitchen sink) return not-found in production.
        filter: ({ path }) => !path.startsWith('/_'),
      },
      // Prerendering stops on non-200 responses, so the 404 page has a real route.
      // Vercel serves `404.html` with a 404 status for any path it can't match.
      pages: [{ path: '/404', prerender: { outputPath: '/404.html', crawlLinks: false } }],
    }),
    viteReact(),
    tailwindcss(),
  ],
})
