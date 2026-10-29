import { Instrument_Sans } from 'next/font/google'

/** Concept E's one typeface: a sharp grotesk whose width axis gives the display type its tighter studio voice. */
export const studioSans = Instrument_Sans({
  subsets: ['latin'],
  axes: ['wdth'],
  style: ['normal', 'italic'],
  variable: '--font-studio',
  display: 'swap',
})
