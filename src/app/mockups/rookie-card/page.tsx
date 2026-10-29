import type { Metadata } from 'next'
import { Certificate, Closing, ContentSupport, Faq, Footer, Work } from '@/components/mockups/rookie-card/finish'
import { Header } from '@/components/mockups/rookie-card/header'
import { Hero } from '@/components/mockups/rookie-card/hero'
import { Mission, Partners, Playbook, Reasons, Sides } from '@/components/mockups/rookie-card/story'
import { InViewSweeps } from '@/components/mockups/rookie-card/sweeps'
import '@/components/mockups/rookie-card/rookie-card.css'

/*
 * Concept D · Rookie Card. NIL is an athlete's name, image and likeness, and the
 * trading card is how athletes are collected. Set like a premium collectibles
 * house: holographic cards in clear slabs on a chalk ground, cards that flip,
 * and a deck that deals out the process. Same copy and honest placeholders as
 * the live homepage; every card is blank.
 */

export const metadata: Metadata = {
  title: 'Concept D · Rookie Card',
  robots: { index: false, follow: false },
}

export default function RookieCardPage() {
  return (
    <div className="concept-rookie min-h-dvh">
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <Partners />
        <Mission />
        <Sides />
        <Playbook />
        <Reasons />
        <Certificate />
        <ContentSupport />
        <Work />
        <Faq />
        <Closing />
      </main>
      <Footer />
      <InViewSweeps />
    </div>
  )
}
