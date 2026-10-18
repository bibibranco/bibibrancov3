import { defineCollection, defineConfig, defineSingleton } from '@content-collections/core'
import { compileMDX } from '@content-collections/mdx'
import { z } from 'zod'

import {
  IMAGE_FILE,
  processOgImage,
  processProjectImages,
  type ResolvedImage,
} from './scripts/content-images'

// One MDX file per project in content/work. The file name is the slug (sitemap §3: lowercase
// ASCII kebab-case, permanent once published), so there's no `slug` field to drift from it.

const image = z.object({
  /** A file in the project's folder, content/work/<slug>/, written as `./cover.jpg`. */
  src: z
    .string()
    .regex(/^\.\/[^/]+$/, 'use a file next to the MDX, like ./cover.jpg')
    .regex(IMAGE_FILE),
  /** Required. Describe what's in the image, never "Project 1" (LP7). */
  alt: z.string(),
})

const row = z.object({ label: z.string().min(1), value: z.string().min(1) })

// Home "bits and pieces on my desk" (PORT-005 A + C). The fragment type picks the desk object.
const fragmentBase = {
  /** Shown on the home desk. A project with no featured fragment still appears on /work. */
  featured: z.boolean().default(false),
  /** Position on the desk (and in DOM order on mobile). Lower comes first. */
  order: z.number().optional(),
}

const fragment = z.discriminatedUnion('type', [
  z.object({ ...fragmentBase, type: z.literal('code'), lines: z.array(z.string()).min(1) }),
  z.object({
    ...fragmentBase,
    type: z.literal('quote'),
    text: z.string().min(1),
    cite: z.string().optional(),
  }),
  z.object({
    ...fragmentBase,
    type: z.literal('stat'),
    /** Receipt heading, e.g. "ITAÚ · CARD FEES". NDA-cleared numbers only. */
    title: z.string().min(1),
    rows: z.array(row).min(1),
    total: row.optional(),
  }),
  z.object({ ...fragmentBase, type: z.literal('spec'), rows: z.array(row).min(1) }),
  z.object({
    ...fragmentBase,
    type: z.literal('image'),
    image,
    /** `print` is a printed screenshot, for UI. */
    object: z.enum(['polaroid', 'print']).default('polaroid'),
  }),
  z.object({
    ...fragmentBase,
    type: z.literal('writing'),
    title: z.string().min(1),
    body: z.string().optional(),
    /** Kicker on a clipping, e.g. "MEDIUM · 2024.05". */
    source: z.string().optional(),
    object: z.enum(['clipping', 'index-card']).default('index-card'),
  }),
  z.object({ ...fragmentBase, type: z.literal('sketch'), image }),
])

const projects = defineCollection({
  name: 'projects',
  directory: 'content/work',
  include: '*.mdx',
  schema: z.object({
    title: z.string().min(1),
    /** One line (copy.md "Project summaries"): /work, meta description, summary block. */
    summary: z.string().min(1).max(155),
    year: z.number().int().min(2000).max(2100),
    role: z.string().min(1),
    /** Notebook date form, e.g. "2024.03 – 2025.01" (design-system README). */
    timeline: z.string().min(1),
    team: z.string().optional(),
    outcome: z.string().optional(),
    category: z.enum(['work', 'craft']),
    tags: z.array(z.string()).default([]),
    cover: image,
    featured: z.boolean().default(false),
    /** Sort order within the category, on /work and for prev/next. */
    order: z.number(),
    links: z
      .object({
        live: z.url().optional(),
        repo: z.url().optional(),
        /** Medium post, TikTok video, etc. Short pages lead with it. */
        external: z.url().optional(),
      })
      .default({}),
    fragments: z.array(fragment).default([]),
    /** Shows in dev, left out of production builds. */
    draft: z.boolean().default(false),
    content: z.string(),
  }),
  transform: async (document, context) => {
    if (document.draft && process.env.NODE_ENV === 'production') {
      return context.skip('draft')
    }
    // The raw MDX source stays out of the bundle; only the compiled code ships.
    const { content, _meta, ...data } = document
    const slug = _meta.path
    const mdx = await compileMDX(context, { content, _meta })

    // Frontmatter images are resolved here, so a missing file fails the build. MDX body images
    // resolve at render from `images` (MdxContent), and a missing one fails the prerender.
    const images = await processProjectImages(context.collection.directory, slug)
    const resolve = ({ src, alt }: z.infer<typeof image>): ResolvedImage & { alt: string } => {
      const found = images[src]
      if (!found) throw new Error(`${slug}.mdx: no image ${src} in content/work/${slug}/`)
      return { ...found, alt }
    }
    const cover = resolve(data.cover)
    const fragments = data.fragments.map((fragment) =>
      'image' in fragment ? { ...fragment, image: resolve(fragment.image) } : fragment,
    )
    // Share image for og:image, cropped from the cover (PORT-501).
    const og = await processOgImage(context.collection.directory, slug, data.cover.src)
    return { ...data, slug, cover, fragments, images, og, mdx }
  },
})

// About-page portrait (PORT-407), through the same image pipeline as project images.
const portrait = defineSingleton({
  name: 'portrait',
  filePath: 'content/profile/portrait.yaml',
  parser: 'yaml',
  schema: image,
  transform: async ({ src, alt }) => {
    const images = await processProjectImages('content/profile', 'portrait')
    const found = images[src]
    if (!found) throw new Error(`portrait.yaml: no image ${src} in content/profile/portrait/`)
    return { ...found, alt }
  },
})

export default defineConfig({ content: [projects, portrait] })
