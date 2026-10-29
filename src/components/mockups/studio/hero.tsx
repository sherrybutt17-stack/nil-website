import { hero } from '@/content/home'
import { ctas } from '@/content/site'
import { HeroWindow } from './hero-window'
import { MagneticLink } from './magnetic'

/*
 * One weight, flush left, and a strip of 9:16 frames set into the last line,
 * so the promise and the content share the headline. The h1 rises out of its
 * line masks with CSS only, so it renders without JS.
 */
export function StudioHero() {
  const [first, second, third] = hero.lines

  return (
    <section aria-labelledby="st-hero-title" className="st-hero">
      <div className="st-wrap">
        <div className="st-hero__meta">
          <p className="st-label">
            <span className="tabular-nums">(00)</span> {hero.eyebrow}
          </p>
          <p className="st-label hidden text-right sm:block">Sports NIL partnerships, matched by people</p>
        </div>

        <h1 id="st-hero-title" className="st-hero__title" data-cursor-text="Scroll">
          <span className="st-mask">
            <span className="st-rise" style={{ '--i': 0 } as React.CSSProperties}>
              {first}
            </span>
          </span>{' '}
          <span className="st-mask">
            <span className="st-rise" style={{ '--i': 1 } as React.CSSProperties}>
              {second}
            </span>
          </span>{' '}
          <span className="st-mask">
            <span className="st-rise st-line3" style={{ '--i': 2 } as React.CSSProperties}>
              <span>{third}</span>
              <HeroWindow />
            </span>
          </span>
        </h1>

        <div className="st-hero__lead">
          <p className="st-fade max-w-[36rem] text-lg leading-relaxed text-pretty text-ink/80 sm:text-[1.3125rem] sm:leading-[1.5]" style={{ '--i': 4 } as React.CSSProperties}>
            {hero.intro}
          </p>
          <div className="st-fade" style={{ '--i': 5 } as React.CSSProperties}>
            <div className="flex flex-col gap-3 xs:flex-row xs:flex-wrap xs:items-center">
              <MagneticLink href={ctas.agency.href} variant="ultra" size="lg">
                {ctas.agency.label}
              </MagneticLink>
              <MagneticLink href={ctas.athlete.href} variant="ghost" size="lg">
                {ctas.athlete.label}
              </MagneticLink>
            </div>
            <p className="mt-4 text-sm text-ink/65">{hero.note}</p>
          </div>
        </div>

        <ol className="st-hero__index" aria-label="What we do">
          {hero.points.map((point, i) => (
            <li key={point}>
              <span className="st-label tabular-nums text-ink/65">({String(i + 1).padStart(2, '0')})</span>
              <span>{point}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
