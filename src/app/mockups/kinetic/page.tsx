import type { Metadata } from 'next'
import { Bands } from '@/components/mockups/kinetic/bands'
import { Faq } from '@/components/mockups/kinetic/faq'
import { Footer } from '@/components/mockups/kinetic/footer'
import { Header } from '@/components/mockups/kinetic/header'
import { Hero } from '@/components/mockups/kinetic/hero'
import { Playbook } from '@/components/mockups/kinetic/playbook'
import {
  Closing,
  Commitments,
  ContentSupport,
  Mission,
  Proof,
  Reasons,
  Work,
} from '@/components/mockups/kinetic/sections'
import { Sides } from '@/components/mockups/kinetic/sides'
import { sports } from '@/content/options'
import '@/components/mockups/kinetic/kinetic.css'

/*
 * Concept A, "Kinetic": a sports-campaign homepage. Hard-cut colour blocks,
 * and Archivo's width axis as the main instrument: type stretches as it
 * arrives, leans with scroll speed and breathes on hover. Same copy as the
 * live homepage (src/content/home.ts). Not linked from the site; excluded from search.
 */

export const metadata: Metadata = {
  title: 'Concept A · Kinetic',
  robots: { index: false, follow: false },
}

export default function KineticPage() {
  return (
    <div className="concept-kinetic flex min-h-dvh flex-col">
      <Header />
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        <Hero />
        <Bands sports={sports} />
        <Proof />
        <Mission />
        <Sides />
        <Reasons />
        <Playbook />
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
