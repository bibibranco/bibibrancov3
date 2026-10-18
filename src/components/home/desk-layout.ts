// Hand-placed desk slots from the PORT-007 canvas ("Home · 1440", desk section), in px on a
// 1200px-wide desk. Fragments fill them in `order`; past ten, the pattern repeats one desk-height
// lower, so adding a featured fragment never needs a code change (PORT-403).

type Slot = {
  x: number
  y: number
  w: number
  /** Tilt from xl (absolute layout) and below xl (masonry columns). */
  r: number
  rm: number
  z: number
}

const deskWidth = 1200
const deskHeight = 900

const slots: Slot[] = [
  { x: 0, y: 20, w: 360, r: -2, rm: -2, z: 3 },
  { x: 400, y: 50, w: 230, r: 4, rm: 3, z: 4 },
  { x: 670, y: 10, w: 270, r: -3, rm: -3, z: 2 },
  { x: 980, y: 60, w: 220, r: 3, rm: 2, z: 3 },
  { x: 30, y: 340, w: 250, r: 5, rm: -3, z: 5 },
  { x: 320, y: 360, w: 330, r: -1.5, rm: 1.5, z: 6 },
  { x: 690, y: 320, w: 290, r: -5, rm: -2, z: 4 },
  { x: 1010, y: 360, w: 190, r: 2, rm: 3, z: 3 },
  { x: 140, y: 610, w: 320, r: 3, rm: -1.5, z: 7 },
  { x: 540, y: 640, w: 300, r: -3, rm: 2, z: 5 },
]

/** The star sticker that sits on the first desk, between the last objects. */
const sticker = { x: 910, y: 690, w: 96, r: 14 }

/** CSS custom properties for the fragment at `index`, as percentages of the desk width. */
function slotStyle(index: number) {
  const slot = slots[index % slots.length]!
  const page = Math.floor(index / slots.length)
  return {
    '--x': `${(slot.x / deskWidth) * 100}%`,
    '--y': `${slot.y + page * deskHeight}px`,
    '--w': `${(slot.w / deskWidth) * 100}%`,
    '--r': `${slot.r}deg`,
    '--rm': `${slot.rm}deg`,
    '--z': String(slot.z),
  }
}

/** Height of the absolute desk for `count` fragments: one desk per ten. */
function deskHeightFor(count: number) {
  return `${Math.max(1, Math.ceil(count / slots.length)) * deskHeight}px`
}

const stickerStyle = {
  '--x': `${(sticker.x / deskWidth) * 100}%`,
  '--y': `${sticker.y}px`,
  '--w': `${sticker.w}px`,
  '--r': `${sticker.r}deg`,
}

export { deskHeightFor, slotStyle, slots, stickerStyle }
