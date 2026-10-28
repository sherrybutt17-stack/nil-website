import { renderBrandMark } from '@/lib/brand-mark'

// A real .png file (not the icon.tsx convention) so the link carries the base path on static hosts.
export const dynamic = 'force-static'

export function GET() {
  return renderBrandMark(64, 14)
}
