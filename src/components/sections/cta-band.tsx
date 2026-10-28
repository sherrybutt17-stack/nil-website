import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { ctas } from '@/content/site'
import { cn } from '@/lib/utils'

type Side = 'athlete' | 'agency'

const sides: Record<Side, { surface: string; kicker: string; line: string }> = {
  athlete: {
    surface: 'surface-flare',
    kicker: 'Athletes & sports creators',
    line: 'Get your profile in front of our team.',
  },
  agency: {
    surface: 'surface-ultra',
    kicker: 'Agencies & brand teams',
    line: 'Tell us what your campaign needs.',
  },
}

/** Two oversized, audience-coloured calls to action. Pass `only` to show one side. */
export function CtaBand({ only, heading = 'Choose your side' }: { only?: Side; heading?: string }) {
  const shown: Side[] = only ? [only] : ['athlete', 'agency']

  return (
    <section aria-label={heading} className={cn('grid', shown.length === 2 && 'md:grid-cols-2')}>
      {shown.map((side) => {
        const cta = ctas[side]
        const copy = sides[side]
        return (
          <Link
            key={side}
            href={cta.href}
            className={cn(
              copy.surface,
              'group relative flex min-h-[19rem] flex-col justify-between gap-10 overflow-hidden p-8 outline-offset-[-6px] sm:p-12 lg:min-h-[24rem] lg:p-16'
            )}
          >
            <span className="eyebrow">{copy.kicker}</span>
            <span>
              <span className="display block text-6xl transition-transform duration-500 group-hover:translate-x-2 sm:text-7xl xl:text-8xl">
                {cta.label}
              </span>
              <span className="mt-5 flex items-center justify-between gap-6 text-lg font-medium">
                {copy.line}
                <span className="grid size-14 shrink-0 place-items-center rounded-full border-2 border-current transition-transform duration-500 group-hover:rotate-45">
                  <ArrowUpRight className="size-6" aria-hidden="true" />
                </span>
              </span>
            </span>
          </Link>
        )
      })}
    </section>
  )
}
