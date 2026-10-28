import type { Metadata } from 'next'
import { site } from '@/content/site'

type PageMetaInput = { title: string; description: string; path: string; absoluteTitle?: boolean }

/** Per-page title, description, canonical URL and social metadata. OG images come from opengraph-image.tsx files. */
export function pageMetadata({ title, description, path, absoluteTitle }: PageMetaInput): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} · ${site.name}`
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: { type: 'website', siteName: site.name, locale: 'en_US', url: path, title: fullTitle, description },
    twitter: { card: 'summary_large_image', title: fullTitle, description },
  }
}
