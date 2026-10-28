import type { MetadataRoute } from 'next'
import { site } from '@/content/site'
import { brandColors } from '@/content/variant'

// Generated once at build time (required for static hosting).
export const dynamic = 'force-static'

// Static hosting may serve the site from a sub-path (e.g. GitHub Pages).
const base = process.env.NEXT_PUBLIC_BASE_PATH || ''

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} · ${site.tagline}`,
    short_name: site.name,
    description: site.description,
    start_url: `${base}/`,
    display: 'browser',
    background_color: brandColors.chalk,
    theme_color: brandColors.ink,
    icons: [
      { src: `${base}/favicon.png`, type: 'image/png', sizes: '64x64' },
      { src: `${base}/apple-touch-icon.png`, type: 'image/png', sizes: '180x180' },
    ],
  }
}
