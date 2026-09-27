import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'

export default defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [
    tanstackStart({
      // Every page ships as static HTML so crawlers and link previews see real content.
      prerender: {
        enabled: true,
        crawlLinks: true,
        failOnError: true,
      },
    }),
    viteReact(),
  ],
})
