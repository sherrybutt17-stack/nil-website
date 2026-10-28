/** Share-image content for each page, rendered at /og/<name>.png. */

export const ogImages = {
  home: {
    alt: 'NIL: Real athletes. Real content. Real fit.',
    eyebrow: 'Athlete-powered campaigns · Matched by people',
    title: 'Real athletes. Real content. Real fit.',
    accent: 'split',
  },
  athletes: {
    alt: 'NIL for athletes: your game has value off the field.',
    eyebrow: 'For student athletes & sports creators',
    title: 'Your game has value off the field.',
    accent: 'flare',
  },
  agencies: {
    alt: 'NIL for agencies: athletes who fit the brief.',
    eyebrow: 'For agencies & brand teams',
    title: 'Athletes who fit the brief.',
    accent: 'ultra',
  },
  contact: {
    alt: 'Contact NIL: talk to the team.',
    eyebrow: 'Contact',
    title: 'Talk to the NIL team.',
    accent: 'split',
  },
} as const

export type OgImage = keyof typeof ogImages
