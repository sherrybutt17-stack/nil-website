import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FieldLines } from '@/components/graphics/field-lines'
import { ctas } from '@/content/site'

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false },
}

export default function NotFound() {
  return (
    <section aria-labelledby="nf-title" className="surface-ink relative isolate overflow-hidden">
      <FieldLines id="not-found" className="-z-10 opacity-[0.07]" />
      <div className="container-x py-24 sm:py-32">
        <p className="eyebrow text-flare">Error 404</p>
        <h1 id="nf-title" className="display mt-5 text-7xl sm:text-9xl">
          Out of bounds.
        </h1>
        <p className="mt-6 max-w-lg text-lg text-chalk/80">
          That page doesn’t exist or has moved. Pick a path and get back in the game.
        </p>
        <div className="mt-10 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
          <Button asChild variant="athlete" size="lg">
            <Link href={ctas.athlete.href}>
              {ctas.athlete.label} <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
          <Button asChild variant="agency" size="lg">
            <Link href={ctas.agency.href}>
              {ctas.agency.label} <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/">Back to home</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
