import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import contentCollections from '@content-collections/vite'

// Every case study is prerendered, whether or not another page links to it yet. `pnpm build`
// generates the content (scripts/content-build.ts, drafts excluded) before Vite starts.
async function caseStudyPages(command: 'build' | 'serve') {
  if (command !== 'build') return []
  const { allProjects } = await import('./.content-collections/generated/index.js')
  return allProjects.map((project) => ({ path: `/work/${project.slug}` }))
}

export default defineConfig(async ({ command }) => ({
  resolve: { tsconfigPaths: true },
  plugins: [
    // Generates `content-collections` from content/work/*.mdx and watches it, in dev only.
    // `pnpm build` generates it with scripts/content-build.ts (fails on bad content, drops drafts)
    // before Vite starts; letting the plugin rebuild here brought drafts back, since NODE_ENV
    // isn't "production" yet when it runs. The plugin still sets the `content-collections` alias.
    contentCollections({ isEnabled: () => command === 'serve' }),
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
      pages: [
        { path: '/404', prerender: { outputPath: '/404.html', crawlLinks: false } },
        ...(await caseStudyPages(command)),
      ],
    }),
    viteReact(),
    tailwindcss(),
  ],
}))
