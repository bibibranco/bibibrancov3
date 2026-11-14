// The good-gun photos (PORT-205): real photos from Wikimedia Commons, printed as collage cut-outs
// by scripts/gun-collage.ts into public/guns/<slug>.webp. The originals aren't committed.
// CC BY-SA photos need visible credit and share alike; the processed images are shared under the
// same licence (CC BY-SA 4.0). Credits render in the footer (gunCredits).

export type GunPhoto = {
  slug: string
  /** Rendered size in public/guns, px (2× the ~240px it shows at). */
  w: number
  h: number
  title: string
  author: string
  license: 'CC0' | 'CC BY-SA 4.0'
  source: string
}

export const gunPhotos: Record<string, GunPhoto> = {
  'heat gun': {
    slug: 'heat-gun',
    w: 480,
    h: 344,
    title: 'Hot air gun (1)',
    author: 'Suyash Dwivedi',
    license: 'CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Hot_air_gun_(1).jpg',
  },
  'tufting gun': {
    slug: 'tufting-gun',
    w: 480,
    h: 370,
    title: 'TD-01 tufting gun',
    author: 'KnowledgeBySean',
    license: 'CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:TD-01_tufting_gun.jpg',
  },
  'nail gun': {
    slug: 'nail-gun',
    w: 480,
    h: 348,
    title: 'Nail gun',
    author: 'Wikideas1',
    license: 'CC0',
    source: 'https://commons.wikimedia.org/wiki/File:Nail_gun.webp',
  },
  'glue gun': {
    slug: 'glue-gun',
    w: 480,
    h: 318,
    title: 'Pistola termofusible',
    author: 'MdeVicente',
    license: 'CC0',
    source: 'https://commons.wikimedia.org/wiki/File:Pistola_termofusible.png',
  },
}

export const gunPhotoSrc = (slug: string) => `/guns/${slug}.webp`

/** Photos that need attribution (CC BY-SA), for the footer credits line. */
export const gunCredits = Object.values(gunPhotos).filter((photo) => photo.license !== 'CC0')
