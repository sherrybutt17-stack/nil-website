import type { Metadata } from 'next'
import { site } from '@/content/site'
import { ogImages, type OgImage } from '@/lib/og-images'

type PageMetaInput = { title: string; description: string; path: string; absoluteTitle?: boolean; image: OgImage }

/** Per-page title, description, canonical URL and social metadata, with its share image from /og/<image>.png. */
export function pageMetadata({ title, description, path, absoluteTitle, image }: PageMetaInput): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} · ${site.name}`
  // Absolute URL so the base path (static hosting) is always included.
  const shareImage = { url: `${site.url}/og/${image}.png`, width: 1200, height: 630, alt: ogImages[image].alt }
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: { type: 'website', siteName: site.name, locale: 'en_US', url: path, title: fullTitle, description, images: [shareImage] },
    twitter: { card: 'summary_large_image', title: fullTitle, description, images: [shareImage] },
  }
}
