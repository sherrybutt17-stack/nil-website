import type { MetadataRoute } from 'next'
import { site } from '@/content/site'

// Generated once at build time (required for static hosting).
export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: '', priority: 1 },
    { path: '/athletes', priority: 0.9 },
    { path: '/agencies', priority: 0.9 },
    { path: '/contact', priority: 0.6 },
  ]
  return routes.map(({ path, priority }) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority,
  }))
}
