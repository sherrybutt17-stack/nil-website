/**
 * Site-wide settings and contact details.
 *
 * Anything marked TODO(placeholder) is unknown and must come from the agency.
 * A `null` value renders as a visible dashed placeholder on the site rather
 * than invented data. Fill these in before launch.
 */

export type SocialLink = { label: string; href: string }

export const site = {
  name: 'Real NIL Agency',
  /** For tight spaces such as the home-screen icon label. */
  shortName: 'Real NIL',
  tagline: 'Sports NIL partnerships, matched by people',
  description:
    'Real NIL Agency connects student athletes and sports creators with agencies running brand campaigns. Our team reviews every athlete profile and agency request, then proposes partnerships that fit both sides.',

  /** Canonical origin. Set NEXT_PUBLIC_SITE_URL in production (e.g. https://www.example.com). */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').replace(/\/$/, ''),

  contact: {
    // TODO(placeholder): the agency's public contact email, e.g. "hello@yourdomain.com"
    email: null as string | null,
    // TODO(placeholder): optional public phone number, or leave null to hide
    phone: null as string | null,
    // TODO(placeholder): city/region or mailing address
    location: null as string | null,
    // TODO(placeholder): honest response-time commitment, e.g. "within two business days".
    // Leave null to avoid promising a timeline.
    responseTime: null as string | null,
  },

  // TODO(placeholder): add the agency's real profiles, e.g. { label: 'Instagram', href: 'https://www.instagram.com/…' }
  social: [] as SocialLink[],
} as const

export const nav = [
  { href: '/', label: 'Home' },
  { href: '/athletes', label: 'For Athletes' },
  { href: '/agencies', label: 'For Agencies' },
  { href: '/contact', label: 'Contact' },
] as const

export const ctas = {
  athlete: { href: '/athletes#athlete-signup', label: 'Join as an Athlete' },
  agency: { href: '/agencies#agency-signup', label: 'Partner as an Agency' },
} as const

/**
 * Consent and privacy copy shown on forms.
 * TODO(placeholder): have qualified counsel review this wording and the
 * privacy policy before collecting real submissions. Bump `version` whenever
 * the wording changes — it is sent with each submission for your records.
 */
export const legal = {
  privacyPath: '/privacy',
  version: 'placeholder-2026-10-r2',
  consent: {
    athlete:
      'I agree that Real NIL Agency may keep the information in this form in its private athlete database and contact me about partnership opportunities.',
    agency: 'I agree that Real NIL Agency may use the information in this form to review my request and contact me about it.',
    contact: 'I agree that Real NIL Agency may use the information in this form to respond to my inquiry.',
  },
  minorsNote: 'Under 18? Please have a parent or guardian review this form with you before you submit it.',
} as const
