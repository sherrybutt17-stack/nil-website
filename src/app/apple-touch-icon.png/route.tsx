import { renderBrandMark } from '@/lib/brand-mark'

export const dynamic = 'force-static'

export function GET() {
  return renderBrandMark(180, 0)
}
