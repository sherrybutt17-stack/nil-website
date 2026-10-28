import { renderOg } from '@/lib/og'

export const alt = 'NIL for agencies — athletes who fit the brief.'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return renderOg({ eyebrow: 'For agencies & brand teams', title: 'Athletes who fit the brief.', accent: 'ultra' })
}
