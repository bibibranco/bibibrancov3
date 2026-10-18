import fs from 'node:fs/promises'
import path from 'node:path'

import sharp from 'sharp'

// Favicons, app icons and the default share card (PORT-501). Run by hand after a brand change:
// `node scripts/brand-assets.ts`. The outputs in public/ are committed. Interim art until the
// PORT-007 hi-fi: v3's star (the brand motif, PORT-004) and wordmark on brand blue, built from
// vector paths only, so no fonts are needed.

const blue = '#0055d4' // --blue
const star = '#ffe45c' // --star
const ice = '#dceaff' // --ice

// v3 star (legacy/src/assets/star.svg), 32×32.
const starPath =
  'M16 7.25263L21.5565 0L21.2218 9.18292L30.0699 7.25263L24 14.0697L32 18.3691L23.0349 19.6263L26.4435 28.1427L18.7782 23.2559L16 32L13.2218 23.2559L5.55646 28.1427L8.96507 19.6263L0 18.3691L8 14.0697L1.93014 7.25263L10.7782 9.18292L10.4435 0L16 7.25263Z'

// v3 wordmark (src/components/brand/logo.tsx), viewBox "2 2 216 36".
const logoPaths = [
  'M2 32.43V6.41498H6.955V16.01C8.435 14.1 10.545 13.125 12.765 13.125C17.56 13.125 21.11 16.87 21.11 23.03C21.11 29.19 17.52 32.895 12.765 32.895C10.505 32.895 8.435 31.88 6.955 30.01V32.43H2ZM11.205 28.49C14.09 28.49 16 26.305 16 23.03C16 19.755 14.09 17.53 11.205 17.53C9.605 17.53 7.775 18.465 6.955 19.715V26.385C7.775 27.595 9.605 28.49 11.205 28.49Z',
  'M24.345 8.59999C24.345 6.95999 25.71 5.67499 27.31 5.67499C28.91 5.67499 30.275 6.95999 30.275 8.59999C30.275 10.24 28.95 11.565 27.31 11.565C25.67 11.565 24.345 10.24 24.345 8.59999ZM24.855 32.43V13.595H29.81V32.435H24.855V32.43Z',
  'M34.72 32.43V6.41498H39.675V16.01C41.155 14.1 43.265 13.125 45.485 13.125C50.28 13.125 53.83 16.87 53.83 23.03C53.83 29.19 50.24 32.895 45.485 32.895C43.225 32.895 41.155 31.88 39.675 30.01V32.43H34.72ZM43.925 28.49C46.81 28.49 48.72 26.305 48.72 23.03C48.72 19.755 46.81 17.53 43.925 17.53C42.325 17.53 40.495 18.465 39.675 19.715V26.385C40.495 27.595 42.325 28.49 43.925 28.49Z',
  'M57.065 8.59999C57.065 6.95999 58.43 5.67499 60.03 5.67499C61.63 5.67499 62.995 6.95999 62.995 8.59999C62.995 10.24 61.67 11.565 60.03 11.565C58.39 11.565 57.065 10.24 57.065 8.59999ZM57.575 32.43V13.595H62.53V32.435H57.575V32.43Z',
  'M217.935 2H76.3V38.045H217.935V2Z',
]

/** Square icon: blue ground, yellow star. `inset` is the star's margin as a share of the side. */
function iconSvg(size: number, { inset = 0.2, radius = 0.22 } = {}) {
  const starSize = size * (1 - 2 * inset)
  const scale = starSize / 32
  const offset = size * inset
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" rx="${size * radius}" fill="${blue}"/>
  <path transform="translate(${offset} ${offset}) scale(${scale})" fill="${star}" d="${starPath}"/>
</svg>`
}

/** 1200×630 share card: notebook grid, wordmark and star. */
function ogSvg() {
  const w = 1200
  const h = 630
  const grid = Array.from({ length: 50 }, (_, i) => i * 24)
  const lines = [
    ...grid.filter((x) => x <= w).map((x) => `<path d="M${x} 0V${h}"/>`),
    ...grid.filter((y) => y <= h).map((y) => `<path d="M0 ${y}H${w}"/>`),
  ].join('')
  const logoScale = 560 / 216
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <rect width="${w}" height="${h}" fill="${blue}"/>
  <g stroke="${ice}" stroke-opacity="0.08" stroke-width="1">${lines}</g>
  <g transform="translate(96 ${h / 2 - 18 * logoScale}) scale(${logoScale}) translate(-2 -2)" fill="${ice}">
    ${logoPaths.map((d) => `<path d="${d}"/>`).join('')}
  </g>
  <path transform="translate(800 120) rotate(12 120 120) scale(7.5)" fill="${star}" d="${starPath}"/>
</svg>`
}

/** An .ico holding one PNG, which every current browser reads. */
function pngToIco(png: Buffer, size: number) {
  const header = Buffer.alloc(22)
  header.writeUInt16LE(0, 0) // reserved
  header.writeUInt16LE(1, 2) // type: icon
  header.writeUInt16LE(1, 4) // one image
  header.writeUInt8(size, 6) // width
  header.writeUInt8(size, 7) // height
  header.writeUInt8(0, 8) // no palette
  header.writeUInt8(0, 9) // reserved
  header.writeUInt16LE(1, 10) // colour planes
  header.writeUInt16LE(32, 12) // bits per pixel
  header.writeUInt32LE(png.length, 14) // image size
  header.writeUInt32LE(22, 18) // image offset
  return Buffer.concat([header, png])
}

const out = (file: string) => path.resolve('public', file)
const png = (svg: string) => sharp(Buffer.from(svg)).png()

await fs.writeFile(out('favicon.svg'), iconSvg(32))
await fs.writeFile(out('favicon.ico'), pngToIco(await png(iconSvg(32)).toBuffer(), 32))
// iOS rounds the corners itself, so the touch icon is a full square.
await png(iconSvg(180, { radius: 0 })).toFile(out('apple-touch-icon.png'))
await png(iconSvg(192)).toFile(out('icon-192.png'))
await png(iconSvg(512)).toFile(out('icon-512.png'))
// Maskable: Android may crop to a circle, so the star stays inside the central 80%.
await png(iconSvg(512, { inset: 0.28, radius: 0 })).toFile(out('icon-maskable-512.png'))
await sharp(Buffer.from(ogSvg())).jpeg({ quality: 88 }).toFile(out('og.jpg'))

console.log('Brand assets written to public/.')
