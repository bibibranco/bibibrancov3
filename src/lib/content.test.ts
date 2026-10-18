import { describe, expect, it, vi } from 'vitest'

import {
  getAdjacentProjects,
  getAllProjects,
  getFeaturedFragments,
  getFeaturedProjects,
} from './content'

// Fixture projects instead of the real content, so the tests don't move when drafts change.
// Only the fields the helpers read are filled in.
vi.mock('content-collections', () => {
  const project = (slug: string, category: 'work' | 'craft', order: number, extra = {}) => ({
    slug,
    title: slug,
    category,
    order,
    featured: false,
    fragments: [],
    ...extra,
  })
  return {
    allProjects: [
      project('craft-b', 'craft', 2),
      project('work-c', 'work', 3, { featured: true }),
      project('work-a', 'work', 1, {
        fragments: [
          { type: 'code', lines: ['a'], featured: true, order: 2 },
          { type: 'quote', text: 'not on the desk', featured: false },
        ],
      }),
      project('craft-a', 'craft', 1, {
        featured: true,
        fragments: [{ type: 'spec', rows: [], featured: true }],
      }),
      project('work-b', 'work', 2, {
        fragments: [{ type: 'quote', text: 'first', featured: true, order: 1 }],
      }),
    ],
  }
})

const slugs = (projects: { slug: string }[]) => projects.map((project) => project.slug)

describe('getAllProjects', () => {
  it('lists Work before Craft, each by order', () => {
    expect(slugs(getAllProjects())).toEqual(['work-a', 'work-b', 'work-c', 'craft-a', 'craft-b'])
  })

  it('filters by category', () => {
    expect(slugs(getAllProjects('craft'))).toEqual(['craft-a', 'craft-b'])
  })
})

describe('getFeaturedProjects', () => {
  it('follows /work order, so order only has to be unique within a group', () => {
    expect(slugs(getFeaturedProjects())).toEqual(['work-c', 'craft-a'])
  })
})

describe('getAdjacentProjects', () => {
  it('stays within the group', () => {
    const { prev, next } = getAdjacentProjects('work-c')
    expect(prev?.slug).toBe('work-b')
    expect(next).toBeUndefined()
  })

  it('has no previous project at the start of a group', () => {
    const { prev, next } = getAdjacentProjects('craft-a')
    expect(prev).toBeUndefined()
    expect(next?.slug).toBe('craft-b')
  })

  it('returns nothing for an unknown slug', () => {
    expect(getAdjacentProjects('nope')).toEqual({})
  })
})

describe('getFeaturedFragments', () => {
  it('collects featured fragments by order, unordered ones last, with their project', () => {
    const fragments = getFeaturedFragments()
    expect(fragments.map((fragment) => [fragment.type, fragment.project.slug])).toEqual([
      ['quote', 'work-b'],
      ['code', 'work-a'],
      ['spec', 'craft-a'],
    ])
  })
})
