import { ctas, site } from '@/content/site'
import { hero } from '@/content/home'
import { HeroLine } from './motion'
import { KButton, Kicker, SplitChars, pad, type CSSVars } from './primitives'

/*
 * Three lines, one size, perfectly justified: each line's width axis is tuned
 * (from measured Archivo widths) so all three span the container. "Real fit."
 * is set at nearly full width, so it breathes out the most as it arrives.
 */
const FIT_WIDTH = 6.27
const lineStretch = [63.9, 67.7, 123.9]
/** Phones round glyph widths slightly differently. */
const lineStretchSm = [64.2, 68, 124.3]

export function Hero() {
  return (
    <section aria-labelledby="k-hero-title" className="k-hero overflow-x-clip">
      <div className="container-x flex min-h-[calc(100svh-4rem)] flex-col pt-6 pb-8 sm:pt-8 lg:pb-10">
        <div className="flex items-center justify-between gap-6">
          <Kicker n="00">{hero.eyebrow}</Kicker>
          <p className="k-label hidden text-right md:block">{site.tagline}</p>
        </div>

        <div className="k-fit mt-8 sm:mt-10" style={{ '--w': FIT_WIDTH } as CSSVars}>
          <h1 id="k-hero-title" className="k-hero__title k-display">
            <span className="sr-only">{hero.lines.join(' ')}</span>
            {hero.lines.map((line, n) => (
              <HeroLine key={line} direction={n % 2 === 0 ? -1 : 1}>
                <span
                  aria-hidden="true"
                  className="k-fit__line"
                  style={{ '--s': `${lineStretch[n]}%`, '--s-sm': `${lineStretchSm[n]}%`, '--line': n } as CSSVars}
                >
                  <span className="k-fit__clip">
                    <SplitChars text={line} glint />
                  </span>
                </span>
              </HeroLine>
            ))}
          </h1>
        </div>

        <div className="mt-auto grid gap-8 border-t-2 border-ink pt-6 sm:pt-7 lg:grid-cols-12 lg:gap-6">
          <p className="k-body max-w-xl font-medium lg:col-span-5 lg:pr-6 lg:text-[1.25rem] lg:leading-[1.5]">{hero.intro}</p>
          <ul className="k-hero__points lg:col-span-4">
            {hero.points.map((point, i) => (
              <li key={point} className="flex gap-4 py-2.5 text-[0.9375rem] leading-snug font-medium first:pt-0">
                <span className="k-label pt-[0.15rem] tabular-nums" aria-hidden="true">
                  {pad(i + 1)}
                </span>
                {point}
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-3 lg:col-span-3">
            <KButton href={ctas.agency.href} tone="agency" intro>
              {ctas.agency.label}
            </KButton>
            <KButton href={ctas.athlete.href} tone="athlete-ink">
              {ctas.athlete.label}
            </KButton>
            <p className="mt-1 text-sm font-medium">{hero.note}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
