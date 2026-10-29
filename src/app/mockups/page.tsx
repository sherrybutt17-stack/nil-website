import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { conceptPath, concepts } from '@/content/concepts'

/*
 * Index of homepage design concepts for review. Not linked from the site,
 * excluded from search.
 */

export const metadata: Metadata = {
  title: 'Homepage concepts (review)',
  robots: { index: false, follow: false },
}

export default function ConceptsIndexPage() {
  return (
    <section aria-labelledby="concepts-title" className="py-16 sm:py-24">
      <div className="container-x">
        <p className="eyebrow text-flare-deep">For review · not linked from the site</p>
        <h1 id="concepts-title" className="display mt-5 text-6xl sm:text-8xl">
          Homepage concepts
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-smoke">
          Design directions for the homepage, built with the live site’s copy and colours. Each has its own header,
          navigation, motion and footer, and the lettered switcher at the bottom of each concept flips between them.
          Partner logos, campaign posts, athletes and contact details on these pages are fictional sample data.
        </p>

        <ul className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {concepts.map((concept) => (
            <li key={concept.slug}>
              <Link
                href={conceptPath(concept.slug)}
                className="group flex h-full flex-col rounded-md border-2 border-ink bg-paper p-7 transition-colors hover:bg-white"
              >
                <span className="numeral-outline text-[5.5rem] text-ink" aria-hidden="true">
                  {concept.letter}
                </span>
                <span className="display mt-6 text-5xl">{concept.name}</span>
                <span className="mt-3 text-base leading-relaxed text-smoke">{concept.summary}</span>
                <span className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-bold tracking-[0.08em] uppercase">
                  View concept {concept.letter}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-base text-smoke">
          Also kept for reference:{' '}
          <Link href="/" className="font-semibold text-ink underline decoration-2 underline-offset-4">
            the live homepage
          </Link>{' '}
          and{' '}
          <Link href="/mockups/original-home" className="font-semibold text-ink underline decoration-2 underline-offset-4">
            the original homepage
          </Link>
          .
        </p>
      </div>
    </section>
  )
}
