import type { Metadata } from 'next'
import { IBM_Plex_Mono } from 'next/font/google'
import { Benefits } from '@/components/mockups/crossover/benefits'
import { Closing, Faqs } from '@/components/mockups/crossover/faq-and-close'
import { Footer } from '@/components/mockups/crossover/footer'
import { Header } from '@/components/mockups/crossover/header'
import { Hero } from '@/components/mockups/crossover/hero'
import { MatchConsole } from '@/components/mockups/crossover/match-console'
import { Overview } from '@/components/mockups/crossover/overview'
import { Commitments, Mission, Proof } from '@/components/mockups/crossover/shared-sections'
import { ViewBar, ViewRoot } from '@/components/mockups/crossover/view-controls'
import '@/components/mockups/crossover/crossover.css'

/*
 * Concept C · Crossover. Swiss-precise and interactive: the visitor picks a side
 * (athletes or agencies) and the page crosses over to that side's copy, steps,
 * FAQ and colour. Same copy and honest placeholders as the live homepage.
 */

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-x-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Concept C · Crossover',
  robots: { index: false, follow: false },
}

export default function CrossoverPage() {
  return (
    <ViewRoot className={`concept-crossover ${plexMono.variable} min-h-dvh`}>
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <div className="relative">
          <ViewBar />
          <Overview />
          <MatchConsole />
          <Benefits />
          <Mission />
          <Commitments />
          <Proof />
          <Faqs />
          <Closing />
        </div>
      </main>
      <Footer />
    </ViewRoot>
  )
}
