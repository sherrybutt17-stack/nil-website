/**
 * Which colour version of the site this build produces, set at build time:
 *
 *   NEXT_PUBLIC_SITE_VARIANT=flare  (default) Flare & Ultra: orange + ultramarine
 *   NEXT_PUBLIC_SITE_VARIANT=night            Night Game: volt + magenta
 *
 * Page colours come from CSS tokens in src/app/globals.css (`[data-palette="night"]`
 * overrides the defaults). The hex values below are only for generated images
 * (favicon, Apple icon, Open Graph) and the browser theme colour, which can't
 * read CSS. Keep them in sync with globals.css.
 */

export type Variant = 'flare' | 'night'

export const variant: Variant = process.env.NEXT_PUBLIC_SITE_VARIANT === 'night' ? 'night' : 'flare'

const colors = {
  flare: { ink: '#0e0e10', chalk: '#f3f0e8', athlete: '#ff5a1f', agency: '#3a2dff', agencyOnInk: '#8f87ff' },
  night: { ink: '#0a0a0b', chalk: '#f1f2ec', athlete: '#d4ff3a', agency: '#c2185b', agencyOnInk: '#ff7ab6' },
} as const

export const brandColors = colors[variant]
