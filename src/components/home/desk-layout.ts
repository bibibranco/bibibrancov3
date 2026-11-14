// Hand-placed desk slots, first drawn on the PORT-007 canvas ("Home · 1440"). From PORT-205 the
// desk fits one screen at xl with its heading, and shares the panel with the wall of shame, so
// the seven slots sit in a row of three over a row of four: `x` and `w` are px on a 900px-wide object area, `y` is a
// percentage of one desk's height, and that height follows the viewport (`deskHeightFor`). Past
// seven, the pattern repeats one desk lower, so adding a featured fragment never needs a code
// change (PORT-403).

type Slot = {
  x: number
  /** Top edge, % of one desk's height. */
  y: number
  w: number
  /** Tilt from xl (absolute layout) and below xl (masonry columns). */
  r: number
  rm: number
  z: number
}

const deskWidth = 900

/** One desk's height: the viewport minus the section chrome (heading, padding), within limits. */
const oneDesk = 'clamp(480px, 100svh - 15rem, 760px)'

const slots: Slot[] = [
  { x: 10, y: 5, w: 220, r: 3, rm: 3, z: 4 },
  { x: 290, y: 2, w: 270, r: -2.5, rm: -3, z: 2 },
  { x: 620, y: 6, w: 260, r: 2, rm: 2, z: 5 },
  { x: 15, y: 53, w: 215, r: -3, rm: 1.5, z: 6 },
  { x: 250, y: 56, w: 215, r: 1.5, rm: -2, z: 4 },
  { x: 485, y: 50, w: 190, r: -4, rm: 3, z: 7 },
  { x: 695, y: 54, w: 205, r: 2, rm: -1.5, z: 5 },
]

/** The star sticker on the first desk, in the gap between the rows. */
const sticker = { x: 565, y: 42, w: 64, r: 14 }

function pagesFor(count: number) {
  return Math.max(1, Math.ceil(count / slots.length))
}

/** CSS custom properties for the fragment at `index` of `count`. */
function slotStyle(index: number, count: number) {
  const slot = slots[index % slots.length]!
  const page = Math.floor(index / slots.length)
  const pages = pagesFor(count)
  return {
    '--x': `${(slot.x / deskWidth) * 100}%`,
    '--y': `${(page * 100 + slot.y) / pages}%`,
    '--w': `${(slot.w / deskWidth) * 100}%`,
    '--r': `${slot.r}deg`,
    '--rm': `${slot.rm}deg`,
    '--z': String(slot.z),
  }
}

/** Height of the absolute desk for `count` fragments: one viewport-sized desk per ten. */
function deskHeightFor(count: number) {
  const pages = pagesFor(count)
  return pages === 1 ? oneDesk : `calc(${pages} * ${oneDesk})`
}

function stickerStyleFor(count: number) {
  return {
    '--x': `${(sticker.x / deskWidth) * 100}%`,
    '--y': `${sticker.y / pagesFor(count)}%`,
    '--w': `${sticker.w}px`,
    '--r': `${sticker.r}deg`,
  }
}

export { deskHeightFor, slotStyle, slots, stickerStyleFor }
