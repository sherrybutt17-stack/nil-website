import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { hero, sides } from '@/content/home'
import { ctas, site } from '@/content/site'
import { cn } from '@/lib/utils'
import { GlyphCheck, GlyphO, GlyphX } from './glyphs'
import { ViewLink } from './view-controls'

type Kind = 'athlete' | 'agency'

const halves: Record<Kind, { index: string; view: 'athletes' | 'agencies'; surface: string; button: string; viewLabel: string }> = {
  athlete: { index: 'A', view: 'athletes', surface: 'surface-flare', button: 'x-btn--ink', viewLabel: 'See the athlete view' },
  agency: { index: 'B', view: 'agencies', surface: 'surface-ultra', button: 'x-btn--chalk', viewLabel: 'See the agency view' },
}

function Half({ kind }: { kind: Kind }) {
  const side = sides[kind]
  const cta = ctas[kind]
  const half = halves[kind]
  const Glyph = kind === 'athlete' ? GlyphO : GlyphX

  return (
    <article aria-labelledby={`x-half-${kind}`} className={cn('x-half', half.surface)}>
      <Glyph className={cn('x-half__glyph', kind === 'athlete' ? 'x-half__glyph--o' : 'x-half__glyph--x')} strokeWidth={1.25} />
      <div className="x-half__inner flex flex-1 flex-col">
        <p className="x-mono flex items-center gap-3">
          <span className="grid size-6 place-items-center rounded-[3px] shadow-[inset_0_0_0_1px_currentColor]">{half.index}</span>
          {side.eyebrow}
        </p>
        <h2 id={`x-half-${kind}`} className="x-half__title mt-8 max-w-[22ch] lg:mt-14">
          {side.altTitle}
        </h2>
        <ul className="x-half__pitch mt-9 max-w-md space-y-3">
          {side.points.map((point) => (
            <li key={point} className="flex gap-3 text-[0.9375rem] leading-snug">
              <GlyphCheck className="mt-0.5 shrink-0" />
              {point}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex flex-wrap items-center gap-3 pt-10">
          <Link href={cta.href} className={cn('x-btn', half.button)}>
            {cta.label}
            <ArrowRight aria-hidden="true" />
          </Link>
          <ViewLink view={half.view} className="x-btn x-btn--line">
            {half.viewLabel}
          </ViewLink>
        </div>
      </div>
    </article>
  )
}

export function Hero() {
  return (
    <section aria-labelledby="x-hero-title">
      <div className="x-wrap x-ruled">
        <div className="x-cols" aria-hidden="true">
          {Array.from({ length: 12 }, (_, i) => (
            <span key={i} style={{ '--i': i } as React.CSSProperties} />
          ))}
        </div>

        <div className="x-pad relative pt-10 pb-12 sm:pt-14 lg:pt-16 lg:pb-14">
          <div className="x-mono x-fade flex items-center justify-between gap-6 text-smoke">
            <p>00 — {site.tagline}</p>
            <p className="hidden shrink-0 sm:block">Two sides · One playbook</p>
          </div>
          <div className="mt-10 grid gap-8 sm:mt-12 lg:grid-cols-12 lg:items-end lg:gap-6">
            <h1 id="x-hero-title" className="x-h1 lg:col-span-8">
              {hero.lines.map((line, i) => (
                <span key={line} className="x-rise">
                  <span style={{ '--i': i } as React.CSSProperties}>
                    {i === hero.lines.length - 1 ? (
                      <>
                        {line.slice(0, -1)}
                        <span className="text-(--x-accent)">{line.slice(-1)}</span>
                      </>
                    ) : (
                      line
                    )}
                  </span>
                </span>
              ))}
            </h1>
            <div className="x-fade max-w-md lg:col-span-4 lg:col-start-9 lg:pb-2" style={{ '--i': 2 } as React.CSSProperties}>
              <p className="x-lead">{hero.intro}</p>
              <p className="x-mono mt-6 text-smoke">{hero.note}</p>
            </div>
          </div>
        </div>

        <div className="x-split relative">
          <Half kind="athlete" />
          <Half kind="agency" />
        </div>

        <ul className="relative grid bg-chalk sm:grid-cols-2 lg:grid-cols-4">
          {hero.points.map((point, i) => (
            <li
              key={point}
              className={cn(
                'x-pad flex gap-4 border-line py-6 lg:py-7',
                i > 0 && 'border-t sm:border-t-0',
                i > 1 && 'sm:border-t lg:border-t-0',
                i % 2 === 1 && 'sm:border-l',
                i > 0 && 'lg:border-l'
              )}
            >
              <span className="x-mono pt-0.5 text-(--x-accent)">0{i + 1}</span>
              <span className="text-[0.9375rem] leading-snug font-medium tracking-[-0.01em]">{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
