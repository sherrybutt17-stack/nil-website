import type { MetadataRoute } from 'next'
import { site } from '@/content/site'
import { brandColors } from '@/content/variant'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} · ${site.tagline}`,
    short_name: site.name,
    description: site.description,
    start_url: '/',
    display: 'browser',
    background_color: brandColors.chalk,
    theme_color: brandColors.ink,
    icons: [
      { src: '/icon', type: 'image/png', sizes: '64x64' },
      { src: '/apple-icon', type: 'image/png', sizes: '180x180' },
    ],
  }
}
