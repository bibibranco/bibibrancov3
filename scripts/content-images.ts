import { createHash } from 'node:crypto'
import fs from 'node:fs/promises'
import path from 'node:path'

import sharp from 'sharp'

// Build-time image pipeline (PORT-304), run from the content-collections transform.
// Every image in content/work/<slug>/ becomes AVIF + WebP variants in public/_img/<slug>/
// (git-ignored), and the project document carries their srcsets, size and a placeholder colour.

/** Variant widths. A 375px phone at 3× DPR picks 1200, which stays under the 200 KB budget. */
const WIDTHS = [480, 800, 1200, 1600, 2400]
/** The `<img src>` fallback width, for the rare browser that ignores srcset. */
const FALLBACK_WIDTH = 800
const IMAGE_FILE = /\.(jpe?g|png|webp|avif)$/i

type ResolvedImage = {
  /** WebP fallback for `<img src>`. */
  src: string
  srcset: { avif: string; webp: string }
  width: number
  height: number
  /** Dominant colour, painted behind the image while it loads. `transparent` for images with
   * an alpha channel, so cut-out shapes (the portrait) don't get a coloured box. */
  color: string
}

const publicDir = path.resolve('public')

async function exists(file: string) {
  return fs.stat(file).then(
    () => true,
    () => false,
  )
}

/** Writes any missing variants of one image and returns how to render it. */
async function processImage(file: string, slug: string): Promise<ResolvedImage> {
  // Sizes after EXIF orientation, so they match what's displayed (variants use `autoOrient()` too).
  const { autoOrient, hasAlpha } = await sharp(file).metadata()
  const { width, height } = autoOrient
  const { dominant } = await sharp(file).stats()
  // A content hash in the file name: a replaced image gets new URLs, so variants can be cached forever.
  const hash = createHash('sha256')
    .update(await fs.readFile(file))
    .digest('hex')
    .slice(0, 8)
  const name = `${path.parse(file).name}-${hash}`

  const widths = WIDTHS.filter((w) => w < width).concat(width)
  const variants = { avif: [] as string[], webp: [] as string[] }
  for (const w of widths) {
    for (const format of ['avif', 'webp'] as const) {
      const url = `/_img/${slug}/${name}-${w}.${format}`
      const out = path.join(publicDir, url)
      if (!(await exists(out))) {
        await fs.mkdir(path.dirname(out), { recursive: true })
        const resized = sharp(file).autoOrient().resize({ width: w })
        await (
          format === 'avif'
            ? resized.avif({ quality: 50, effort: 4 })
            : resized.webp({ quality: 72 })
        ).toFile(out)
      }
      variants[format].push(`${url} ${w}w`)
    }
  }

  const fallback = widths.find((w) => w >= FALLBACK_WIDTH) ?? width
  const hex = (n: number) => n.toString(16).padStart(2, '0')
  return {
    src: `/_img/${slug}/${name}-${fallback}.webp`,
    srcset: { avif: variants.avif.join(', '), webp: variants.webp.join(', ') },
    width,
    height,
    color: hasAlpha ? 'transparent' : `#${hex(dominant.r)}${hex(dominant.g)}${hex(dominant.b)}`,
  }
}

// One run per folder: `projects` and `projectBodies` both ask for a project's images, and two
// concurrent runs would write the same variant files at once.
const processed = new Map<string, Promise<Record<string, ResolvedImage>>>()

/** Every image in a folder (content/<directory>/<slug>/), keyed by `./file.jpg` as written in content. */
function processProjectImages(
  directory: string,
  slug: string,
): Promise<Record<string, ResolvedImage>> {
  const folder = path.join(directory, slug)
  let images = processed.get(folder)
  if (!images) {
    images = processFolder(folder, slug)
    processed.set(folder, images)
  }
  return images
}

async function processFolder(folder: string, slug: string): Promise<Record<string, ResolvedImage>> {
  if (!(await exists(folder))) return {}
  const files = (await fs.readdir(folder)).filter((f) => IMAGE_FILE.test(f)).sort()
  const entries = await Promise.all(
    files.map(async (f) => [`./${f}`, await processImage(path.join(folder, f), slug)] as const),
  )
  return Object.fromEntries(entries)
}

/**
 * 1200×630 JPEG share image (og:image) cropped from a project's cover. JPEG because some link
 * previews (LinkedIn, WhatsApp) still skip WebP and AVIF. Named by content hash like the variants.
 */
async function processOgImage(directory: string, slug: string, src: string): Promise<string> {
  const file = path.join(directory, slug, src)
  const hash = createHash('sha256')
    .update(await fs.readFile(file))
    .digest('hex')
    .slice(0, 8)
  const url = `/_img/${slug}/og-${hash}.jpg`
  const out = path.join(publicDir, url)
  if (!(await exists(out))) {
    await fs.mkdir(path.dirname(out), { recursive: true })
    await sharp(file)
      .autoOrient()
      .resize({ width: 1200, height: 630, fit: 'cover', position: 'attention' })
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(out)
  }
  return url
}

export { processProjectImages, processOgImage, IMAGE_FILE }
export type { ResolvedImage }
