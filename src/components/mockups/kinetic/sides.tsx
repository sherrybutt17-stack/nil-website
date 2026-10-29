import Link from 'next/link'
import { sides, whatWeDo } from '@/content/home'
import { ctas } from '@/content/site'
import { cn } from '@/lib/utils'
import { KButton, Kicker, pad, Stretch, type CSSVars } from './primitives'

/*
 * "What we do": a fit-to-width headline, then the two sides split by the
 * logo's slash. Hovering or focusing a side pushes its colour across the seam
 * and stretches its giant background word. Content sits clear of the seam, so
 * nothing is ever covered.
 */
export function Sides() {
  return (
    <section aria-labelledby="k-sides" className="overflow-x-clip">
      <div className="container-x pb-14 sm:pb-20">
        <div className="border-t-2 border-ink pt-8">
          <Kicker n="02">{whatWeDo.eyebrow}</Kicker>
        </div>
        <div
          className="k-fit mt-8 sm:mt-10"
          style={{ '--w': 11.36, '--w-sm': 8.04 } as CSSVars}
        >
          <h2 id="k-sides" className="k-display">
            <span className="sr-only">{whatWeDo.title}</span>
            <span aria-hidden="true" className="k-fit__line" style={{ '--s': '123.3%', '--s-sm': '83.2%' } as CSSVars}>
              Hand-matched,
            </span>
            <span aria-hidden="true" className="k-fit__line text-ultra" style={{ '--s': '93.5%', '--s-sm': '62.6%' } as CSSVars}>
              not mass-matched.
            </span>
          </h2>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-12">
          <p className="k-label lg:col-span-3">Two sides, one playbook</p>
          <p className="k-body max-w-2xl text-[1.1875rem] lg:col-span-6 lg:col-start-5 lg:text-[1.375rem] lg:leading-[1.5]">
            {whatWeDo.intro}
          </p>
        </div>
      </div>

      <div className="k-sides">
        <Side
          id="k-side-agency"
          tone="agency"
          eyebrow={sides.agency.eyebrow}
          title={sides.agency.title}
          steps={sides.agency.steps}
          word="Agencies"
          cta={<KButton href={ctas.agency.href} tone="chalk-ultra">{ctas.agency.label}</KButton>}
          more={{ href: sides.agency.moreHref, label: sides.agency.moreLabel }}
        />
        <Side
          id="k-side-athlete"
          tone="athlete"
          eyebrow={sides.athlete.eyebrow}
          title={sides.athlete.title}
          steps={sides.athlete.steps}
          word="Athletes"
          cta={<KButton href={ctas.athlete.href} tone="athlete-ink">{ctas.athlete.label}</KButton>}
          more={{ href: sides.athlete.moreHref, label: sides.athlete.moreLabel }}
        />
      </div>
    </section>
  )
}

function Side({
  id,
  tone,
  eyebrow,
  title,
  steps,
  word,
  cta,
  more,
}: {
  id: string
  tone: 'agency' | 'athlete'
  eyebrow: string
  title: string
  steps: readonly string[]
  word: string
  cta: React.ReactNode
  more: { href: string; label: string }
}) {
  return (
    <article
      aria-labelledby={id}
      className={cn('k-side', tone === 'agency' ? 'k-side--agency surface-ultra' : 'k-side--athlete surface-flare')}
    >
      <div className="k-side__inner relative z-10 flex flex-col py-16 sm:py-20">
        <p className="k-label">{eyebrow}</p>
        <h3 id={id} className="k-display mt-6 max-w-[12ch] text-[clamp(3rem,5vw,5.25rem)]">
          {title}
        </h3>
        <ol className="k-side__steps mt-10 max-w-lg">
          {steps.map((step, i) => (
            <li key={step} className="k-hover flex items-center gap-5 py-3">
              <span aria-hidden="true" className="k-display k-num w-[1.5em] shrink-0 text-[2.6rem] leading-none">
                <Stretch from={62} to={125}>
                  {pad(i + 1)}
                </Stretch>
              </span>
              <span className="text-[1.0625rem] leading-snug font-medium">{step}</span>
            </li>
          ))}
        </ol>
        <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4">
          {cta}
          <Link href={more.href} className="k-link text-[0.9375rem]">
            {more.label}
          </Link>
        </div>
      </div>
      <span aria-hidden="true" className="k-side__word k-display">
        {word}
      </span>
    </article>
  )
}
