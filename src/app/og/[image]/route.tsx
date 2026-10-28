import { renderOg } from '@/lib/og'
import { ogImages, type OgImage } from '@/lib/og-images'

/*
 * Open Graph images as real .png files (e.g. /og/home.png), so static hosts like
 * GitHub Pages serve them with an image content type. Referenced from pageMetadata().
 */

export const dynamic = 'force-static'
export const dynamicParams = false

export function generateStaticParams() {
  return Object.keys(ogImages).map((name) => ({ image: `${name}.png` }))
}

export async function GET(_request: Request, { params }: { params: Promise<{ image: string }> }) {
  const { image } = await params
  const config = ogImages[image.replace(/\.png$/, '') as OgImage]
  if (!config) return new Response('Not found', { status: 404 })
  return renderOg(config)
}
