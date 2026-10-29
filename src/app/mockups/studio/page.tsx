import type { Metadata } from 'next'
import { CursorFollower } from '@/components/mockups/studio/cursor'
import { studioSans } from '@/components/mockups/studio/fonts'
import { StudioFooter } from '@/components/mockups/studio/footer'
import { StudioHeader } from '@/components/mockups/studio/header'
import { StudioHero } from '@/components/mockups/studio/hero'
import { Closing, Commitments, ContentSupport, Faq, Mission, PartnersStrip, TheWork } from '@/components/mockups/studio/sections'
import { ServicesList } from '@/components/mockups/studio/services-list'
import { SidesFold } from '@/components/mockups/studio/sides-fold'
import { StepsStack } from '@/components/mockups/studio/steps-stack'
import '@/components/mockups/studio/studio.css'

/*
 * Concept E, "Studio": an award-style creative studio site. Light Chalk ground,
 * Instrument Sans at editorial scale, one accent at a time, full-bleed Ink and
 * colour chapters, a cursor that reacts to what it touches, magnetic buttons
 * and stacking panels. Copy comes from src/content/home.ts like every concept.
 */

export const metadata: Metadata = {
  title: 'Concept E · Studio',
  robots: { index: false, follow: false },
}

export default function StudioPage() {
  return (
    <div className={`concept-studio ${studioSans.variable}`}>
      <StudioHeader />
      <main id="main" tabIndex={-1} className="outline-none">
        <StudioHero />
        <PartnersStrip />
        <Mission />
        <SidesFold />
        <ServicesList />
        <StepsStack />
        <ContentSupport />
        <Commitments />
        <TheWork />
        <Faq />
        <Closing />
      </main>
      <StudioFooter />
      <CursorFollower />
    </div>
  )
}
