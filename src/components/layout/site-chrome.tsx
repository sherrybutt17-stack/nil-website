'use client'

import { usePathname } from 'next/navigation'
import { ConceptSwitcher } from '@/components/mockups/concept-switcher'
import { conceptForPath } from '@/content/concepts'

type SiteChromeProps = { header: React.ReactNode; footer: React.ReactNode; children: React.ReactNode }

/**
 * Wraps pages in the site header, main landmark and footer. Design concepts
 * (src/content/concepts.ts) render their own header, <main id="main"> and footer
 * instead, plus a small switcher for comparing them.
 */
export function SiteChrome({ header, footer, children }: SiteChromeProps) {
  const concept = conceptForPath(usePathname())

  if (concept) {
    return (
      <>
        {children}
        <ConceptSwitcher current={concept.slug} />
      </>
    )
  }

  return (
    <>
      {header}
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        {children}
      </main>
      {footer}
    </>
  )
}
