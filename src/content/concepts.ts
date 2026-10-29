/**
 * Homepage design concepts for review, each a full page under /mockups/<slug>.
 * They bring their own header and footer (see src/components/layout/site-chrome.tsx),
 * aren't linked from the site, and are excluded from search (robots.ts disallows /mockups/).
 */

export const concepts = [
  {
    slug: 'kinetic',
    letter: 'A',
    name: 'Kinetic',
    summary: 'Loud and athletic, like a sports-brand campaign: full-bleed colour blocks and giant type that stretches and moves as you scroll.',
  },
  {
    slug: 'floodlight',
    letter: 'B',
    name: 'Floodlight',
    summary: 'Cinematic and dark, a night game under stadium lights, with a scroll-driven playbook.',
  },
  {
    slug: 'crossover',
    letter: 'C',
    name: 'Crossover',
    summary: 'Precise and interactive: pick your side and the whole page switches to athlete or agency content.',
  },
  {
    slug: 'rookie-card',
    letter: 'D',
    name: 'Rookie Card',
    summary: 'Built around the collectible athlete card: holographic cards that tilt and shimmer under your cursor, and a deck that deals out the process.',
  },
  {
    slug: 'studio',
    letter: 'E',
    name: 'Studio',
    summary: 'An award-style creative studio site: smooth stacking panels, a cursor that reacts to what it touches, magnetic buttons and masked type reveals.',
  },
] as const

export type ConceptSlug = (typeof concepts)[number]['slug']

export const conceptPath = (slug: ConceptSlug) => `/mockups/${slug}`

/** The concept a pathname belongs to, if any. Handles the trailing slash used by the static export. */
export function conceptForPath(pathname: string) {
  const path = pathname.replace(/\/$/, '')
  return concepts.find((concept) => path === conceptPath(concept.slug))
}
