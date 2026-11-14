// Makes the collage gun photos for the hero (PORT-205): crops each source photo, prints it as a
// duotone halftone in the site blues with paper grain, then cuts it out. A cut-out follows the
// gun with a hand-cut paper border; a clipping is a torn-edged rectangle. Output: public/guns/*.webp.
//
// Run once, locally, after downloading the originals listed in src/content/gun-photos.ts:
//   node scripts/gun-collage.ts <folder with the originals>
// The originals aren't committed; their sources, authors and licences are in gun-photos.ts.

import path from 'node:path'

import sharp from 'sharp'

type Job = {
  out: string
  file: string
  /** Crop as fractions of the original: left, top, width, height. */
  crop: [number, number, number, number]
  style: 'cutout' | 'clipping'
  /** For cut-outs without transparency: pixels this bright and grey are background. */
  bgWhite?: number
  /** Local contrast (CLAHE) first, for busy photos that print muddy. */
  clahe?: boolean
  /** Print from one colour channel instead of luminance, to lift a coloured part off its ground. */
  channel?: 0 | 1 | 2
}

const jobs: Job[] = [
  { out: 'glue-gun', file: 'glue-gun.png', crop: [0, 0, 1, 1], style: 'cutout' },
  {
    out: 'heat-gun',
    file: 'heat-gun.jpg',
    crop: [0.14, 0.04, 0.7, 0.74],
    style: 'cutout',
    bgWhite: 200,
  },
  {
    out: 'nail-gun',
    file: 'nail-gun.webp',
    crop: [0.03, 0.0, 0.95, 0.66],
    style: 'clipping',
    clahe: true,
  },
  {
    out: 'tufting-gun',
    file: 'tufting-gun.jpg',
    crop: [0.13, 0.15, 0.65, 0.66],
    style: 'clipping',
    clahe: true,
    // The blue grip and the grey floor have the same luminance; the blue channel tells them apart.
    channel: 2,
  },
]

const WIDTH = 480 // 2× a ~240px gun
const BORDER = 9 // paper border around a cut-out, px
const CELL = 5 // halftone cell, px
const DEEP = [10, 31, 77]
const ICE = [220, 234, 255]
const PAPER = [247, 247, 243]

// Seeded so a re-run makes the same tears and grain.
let seed = 7
const random = () => (seed = (seed * 16807) % 2147483647) / 2147483647

const mix = (a: number[], b: number[], t: number) => a.map((v, i) => v + (b[i]! - v) * t)

/** The value a pixel prints at: luminance, or one channel when the job asks for it. */
const tone = (data: Buffer, i: number, channel?: number) =>
  channel === undefined
    ? 0.299 * data[i * 4]! + 0.587 * data[i * 4 + 1]! + 0.114 * data[i * 4 + 2]!
    : data[i * 4 + channel]!

async function load(job: Job, dir: string) {
  const source = sharp(path.join(dir, job.file)).rotate()
  const meta = await source.metadata()
  const [l, t, w, h] = job.crop
  const region = {
    left: Math.round(l * meta.width!),
    top: Math.round(t * meta.height!),
    width: Math.round(w * meta.width!),
    height: Math.round(h * meta.height!),
  }
  // A transparent cut-out (the glue gun) is trimmed to its edges instead of cropped; sharp trims
  // before it extracts, so the two can't be combined.
  const full = job.crop.join() === '0,0,1,1'
  const base = sharp(path.join(dir, job.file)).rotate()
  const image = full ? base.trim() : base.extract(region)
  const sized = image.resize({ width: WIDTH - 2 * BORDER })
  const { data, info } = await (
    job.clahe ? sized.clahe({ width: 40, height: 40, maxSlope: 3 }) : sized
  )
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })
  return { data, w: info.width, h: info.height }
}

/**
 * Background mask for a photo on white: every bright, grey pixel. Global rather than a flood fill
 * from the edges, because a cord can enclose white patches; small holes inside the gun (a
 * sticker, a highlight) get covered by the paper border anyway.
 */
function whiteBackground(data: Buffer, w: number, h: number, limit: number) {
  const bg = new Uint8Array(w * h)
  for (let i = 0; i < w * h; i++) {
    const [r, g, b] = [data[i * 4]!, data[i * 4 + 1]!, data[i * 4 + 2]!]
    bg[i] = Math.min(r, g, b) > limit && Math.max(r, g, b) - Math.min(r, g, b) < 28 ? 1 : 0
  }
  return bg
}

async function make(job: Job, dir: string) {
  const { data, w, h } = await load(job, dir)
  const W = w + 2 * BORDER
  const H = h + 2 * BORDER

  // Object mask (1 = gun), in the bordered canvas.
  const object = new Uint8Array(W * H)
  const bg = job.bgWhite ? whiteBackground(data, w, h, job.bgWhite) : undefined
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++) {
      const i = y * w + x
      const inside = job.style === 'clipping' ? true : bg ? !bg[i] : data[i * 4 + 3]! > 128
      if (inside) object[(y + BORDER) * W + x + BORDER] = 1
    }

  // Luminance, contrast-stretched, for the halftone and the duotone.
  const lum = new Float32Array(W * H).fill(1)
  // Stretch between the 2nd and 98th percentile of the gun's own pixels, so one specular glint
  // or a black shadow doesn't flatten everything else.
  const values: number[] = []
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++) {
      if (!object[(y + BORDER) * W + x + BORDER]) continue
      const i = y * w + x
      values.push(tone(data, i, job.channel))
    }
  values.sort((a, b) => a - b)
  const lo = values[Math.floor(values.length * 0.02)] ?? 0
  const hi = values[Math.floor(values.length * 0.98)] ?? 255
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++) {
      const i = y * w + x
      const v = tone(data, i, job.channel)
      lum[(y + BORDER) * W + x + BORDER] = Math.pow(
        Math.max(0, Math.min(1, (v - lo) / Math.max(1, hi - lo))),
        0.85,
      )
    }

  // Paper shape: the object grown by a jittery border (cut-out) or a torn rectangle (clipping).
  const paper = new Uint8Array(W * H)
  if (job.style === 'cutout') {
    const radius = new Float32Array(W * H)
    for (let i = 0; i < W * H; i++) radius[i] = BORDER - 2 + random() * 3
    // Grow by distance to the nearest object pixel (chamfer distance, two passes).
    const dist = new Float32Array(W * H).fill(1e9)
    for (let i = 0; i < W * H; i++) if (object[i]) dist[i] = 0
    for (let y = 0; y < H; y++)
      for (let x = 0; x < W; x++) {
        const i = y * W + x
        if (x > 0) dist[i] = Math.min(dist[i]!, dist[i - 1]! + 1)
        if (y > 0) dist[i] = Math.min(dist[i]!, dist[i - W]! + 1)
        if (x > 0 && y > 0) dist[i] = Math.min(dist[i]!, dist[i - W - 1]! + 1.414)
        if (x < W - 1 && y > 0) dist[i] = Math.min(dist[i]!, dist[i - W + 1]! + 1.414)
      }
    for (let y = H - 1; y >= 0; y--)
      for (let x = W - 1; x >= 0; x--) {
        const i = y * W + x
        if (x < W - 1) dist[i] = Math.min(dist[i]!, dist[i + 1]! + 1)
        if (y < H - 1) dist[i] = Math.min(dist[i]!, dist[i + W]! + 1)
        if (x < W - 1 && y < H - 1) dist[i] = Math.min(dist[i]!, dist[i + W + 1]! + 1.414)
        if (x > 0 && y < H - 1) dist[i] = Math.min(dist[i]!, dist[i + W - 1]! + 1.414)
      }
    for (let i = 0; i < W * H; i++) paper[i] = dist[i]! <= radius[i]! ? 1 : 0
  } else {
    // Torn edges: each side wanders inwards by a smoothed random walk.
    const walk = (n: number) => {
      const out = new Float32Array(n)
      let v = 4
      for (let i = 0; i < n; i++) {
        v = Math.max(1, Math.min(BORDER, v + (random() - 0.5) * 3))
        out[i] = v
      }
      return out
    }
    const top = walk(W)
    const bottom = walk(W)
    const left = walk(H)
    const right = walk(H)
    for (let y = 0; y < H; y++)
      for (let x = 0; x < W; x++)
        paper[y * W + x] =
          y >= top[x]! && y < H - bottom[x]! && x >= left[y]! && x < W - right[y]! ? 1 : 0
    // Inside the tear, the photo starts a little in: a thin white fibre edge.
    for (let y = 0; y < H; y++)
      for (let x = 0; x < W; x++) {
        const i = y * W + x
        const edge =
          y < top[x]! + 3 || y >= H - bottom[x]! - 3 || x < left[y]! + 3 || x >= W - right[y]! - 3
        if (edge) object[i] = 0
      }
  }

  // Print: duotone underneath, halftone dots on top, then grain. Paper shows outside the gun.
  const out = Buffer.alloc(W * H * 4)
  for (let y = 0; y < H; y++)
    for (let x = 0; x < W; x++) {
      const i = y * W + x
      if (!paper[i]) continue
      let rgb = PAPER
      if (object[i]) {
        const L = lum[i]!
        const base = mix(DEEP, ICE, L)
        // Halftone: cell centre, dot radius by the cell's darkness.
        const cx = Math.floor(x / CELL) * CELL + CELL / 2
        const cy = Math.floor(y / CELL) * CELL + CELL / 2
        const cellL = lum[Math.min(H - 1, Math.round(cy)) * W + Math.min(W - 1, Math.round(cx))]!
        const r = (CELL / 2) * Math.sqrt(1 - cellL) * 1.35
        const inDot = Math.hypot(x + 0.5 - cx, y + 0.5 - cy) < r
        rgb = mix(base, inDot ? DEEP : mix(base, ICE, 0.35), 0.55)
      }
      const grain = (random() - 0.5) * 18
      out[i * 4] = Math.max(0, Math.min(255, rgb[0]! + grain))
      out[i * 4 + 1] = Math.max(0, Math.min(255, rgb[1]! + grain))
      out[i * 4 + 2] = Math.max(0, Math.min(255, rgb[2]! + grain))
      out[i * 4 + 3] = 255
    }

  const file = path.resolve('public/guns', `${job.out}.webp`)
  const result = await sharp(out, { raw: { width: W, height: H, channels: 4 } })
    .webp({ quality: 82, alphaQuality: 90 })
    .toFile(file)
  console.log(`${job.out}.webp  ${W}×${H}  ${(result.size / 1024).toFixed(1)} KB`)
}

const dir = process.argv[2]
if (!dir) {
  console.error('Usage: node scripts/gun-collage.ts <folder with the originals>')
  process.exit(1)
}
for (const job of jobs) await make(job, dir)
