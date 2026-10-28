import { renderOg } from '@/lib/og'

export const alt = 'Contact NIL — talk to the team.'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return renderOg({ eyebrow: 'Contact', title: 'Talk to the NIL team.', accent: 'split' })
}
