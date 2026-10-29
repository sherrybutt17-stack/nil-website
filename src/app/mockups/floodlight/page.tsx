import type { Metadata } from 'next'
import { Footer, Header } from '@/components/mockups/floodlight/chrome'
import { Fold } from '@/components/mockups/floodlight/motion'
import {
  Closing,
  Commitments,
  ContentSupport,
  Faq,
  Hero,
  Mission,
  Partners,
  Playbook,
  Reasons,
  Ribbon,
  Sides,
  Work,
} from '@/components/mockups/floodlight/sections'
import '@/components/mockups/floodlight/floodlight.css'

/*
 * Concept B · Floodlight: the homepage as a night game under stadium lights.
 * Same copy as the live homepage (src/content/home.ts). Not linked from the
 * site, excluded from search.
 */

export const metadata: Metadata = {
  title: 'Concept B · Floodlight',
  robots: { index: false, follow: false },
}

export default function FloodlightPage() {
  return (
    <div className="concept-floodlight surface-ink relative isolate min-h-dvh overflow-x-clip">
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        {/* Each group's first chapter holds while the rest of the group slides over it. */}
        <div>
          <Fold>
            <Hero />
          </Fold>
          <Ribbon />
          <Partners />
          <Mission />
        </div>
        <Sides />
        <div>
          <Fold depth={0.7}>
            <Reasons />
          </Fold>
          <Playbook />
        </div>
        <Commitments />
        <ContentSupport />
        <Work />
        <Faq />
        <Closing />
      </main>
      <Footer />
    </div>
  )
}
