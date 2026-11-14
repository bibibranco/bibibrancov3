import { goodGuns } from './good-guns'

// "Wall of shame" (PORT-205): projects started and never finished, shown under the desk on home.
// `progress` is a rough, honest guess in percent. Draft copy; edit freely.

export type ShameItem = {
  slug: string
  name: string
  line: string
  status: string
  progress: number
}

export const wallOfShame: ShameItem[] = [
  {
    slug: 'good-guns',
    name: goodGuns.title,
    line: goodGuns.intro,
    status: 'still in the box',
    progress: 10,
  },
  {
    slug: 'cafune',
    name: 'cafuné',
    line: 'Trying to map how people give cafuné: where the fingers go, how hard, how fast, for how long.',
    status: 'collecting data',
    progress: 25,
  },
]
