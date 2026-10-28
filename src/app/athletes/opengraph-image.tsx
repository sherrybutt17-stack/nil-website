import { renderOg } from '@/lib/og'

export const alt = 'NIL for athletes — your game has value off the field.'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return renderOg({ eyebrow: 'For student athletes & sports creators', title: 'Your game has value off the field.', accent: 'flare' })
}
