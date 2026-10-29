/**
 * Homepage design concepts for review, each a full page under /mockups/<slug>.
 * They bring their own header and footer (see src/components/layout/site-chrome.tsx),
 * aren't linked from the site, and are excluded from search (robots.ts disallows /mockups/).
 */

export const concepts = [
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
] as const

export type ConceptSlug = (typeof concepts)[number]['slug']

export const conceptPath = (slug: ConceptSlug) => `/mockups/${slug}`

/** The concept a pathname belongs to, if any. Handles the trailing slash used by the static export. */
export function conceptForPath(pathname: string) {
  const path = pathname.replace(/\/$/, '')
  return concepts.find((concept) => path === conceptPath(concept.slug))
}
