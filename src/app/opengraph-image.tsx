import { renderOg } from '@/lib/og'

export const alt = 'NIL: Real athletes. Real content. Real fit.'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return renderOg({ eyebrow: 'Athlete-powered campaigns · Matched by people', title: 'Real athletes. Real content. Real fit.', accent: 'split' })
}
