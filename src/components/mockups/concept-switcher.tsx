import Link from 'next/link'
import { conceptPath, concepts, type ConceptSlug } from '@/content/concepts'
import { cn } from '@/lib/utils'

/** Floating pill for flipping between design concepts while reviewing them. */
export function ConceptSwitcher({ current }: { current: ConceptSlug }) {
  return (
    <nav
      aria-label="Design concepts"
      className="fixed right-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-[60] flex items-center gap-1 rounded-full bg-ink/90 p-1 text-chalk shadow-[0_12px_32px_-12px_rgb(0_0_0/0.6)] ring-1 ring-chalk/15 backdrop-blur-md [--focus:var(--color-flare)] print:hidden"
    >
      <Link
        href="/mockups"
        className="flex min-h-9 items-center rounded-full px-3 text-[0.6875rem] font-bold tracking-[0.14em] text-chalk/70 uppercase hover:text-chalk"
      >
        Concepts
      </Link>
      {concepts.map((concept) => {
        const active = concept.slug === current
        return (
          <Link
            key={concept.slug}
            href={conceptPath(concept.slug)}
            aria-current={active ? 'page' : undefined}
            title={concept.name}
            className={cn(
              'grid size-9 place-items-center rounded-full text-sm font-bold transition-colors',
              active ? 'bg-chalk text-ink' : 'text-chalk/80 hover:bg-chalk/15 hover:text-chalk'
            )}
          >
            {concept.letter}
            <span className="sr-only">: {concept.name}</span>
          </Link>
        )
      })}
    </nav>
  )
}
