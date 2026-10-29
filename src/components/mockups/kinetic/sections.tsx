import Image from 'next/image'
import Link from 'next/link'
import { closing, commitments, contentSupport, mission, proof, reasons } from '@/content/home'
import { campaignPosts, partners, showEmptySlots } from '@/content/sample'
import { ctas } from '@/content/site'
import { cn } from '@/lib/utils'
import { VelocitySkew } from './motion'
import { KButton, Kicker, pad, SplitText, Stretch, type CSSVars } from './primitives'

/** Splits a title after its nth word, for two-line fit-to-width headings. */
function splitAfter(text: string, n: number) {
  const words = text.split(' ')
  return [words.slice(0, n).join(' '), words.slice(n).join(' ')]
}

/* ---------------------------------------------------------------------------
   Proof: partner slots, honest until real logos exist
--------------------------------------------------------------------------- */
export function Proof() {
  if (partners.length === 0 && !showEmptySlots) return null
  return (
    <section aria-labelledby="k-proof" className="border-b-2 border-ink">
      <div className="container-x grid gap-6 py-10 lg:grid-cols-12 lg:items-center lg:gap-8">
        <h2 id="k-proof" className="k-label lg:col-span-3">
          {proof.partnersTitle}
        </h2>
        <ul className="grid grid-cols-2 border-t border-l border-ink/20 sm:grid-cols-3 lg:col-span-9 lg:grid-cols-6">
          {partners.length > 0
            ? partners.map((partner) => (
                <li key={partner.name} className="grid h-20 place-items-center border-r border-b border-ink/20 px-4">
                  {partner.href ? (
                    <a href={partner.href} target="_blank" rel="noopener" className="grid h-full w-full place-items-center">
                      <Image src={partner.logo} alt={partner.name} width={140} height={48} className="max-h-9 w-auto max-w-full object-contain" />
                    </a>
                  ) : (
                    <Image src={partner.logo} alt={partner.name} width={140} height={48} className="max-h-9 w-auto max-w-full object-contain" />
                  )}
                </li>
              ))
            : Array.from({ length: 6 }, (_, i) => (
                <li key={i} className="flex h-20 items-center justify-between gap-2 border-r border-b border-ink/20 px-4 text-sm font-semibold text-smoke">
                  <span className="placeholder-chip">[Partner logo]</span>
                  <span className="k-label text-[0.625rem] tabular-nums" aria-hidden="true">
                    {pad(i + 1)}
                  </span>
                </li>
              ))}
        </ul>
        {partners.length === 0 && <p className="text-sm text-smoke lg:col-span-9 lg:col-start-4">{proof.partnersPlaceholder}</p>}
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------------------
   Mission: the three key words widen as you scroll through the statement
--------------------------------------------------------------------------- */
export function Mission() {
  const { game, brand, people } = mission.statement
  const key = 'k-display text-[1.3em] leading-[0.8]'
  return (
    <section aria-labelledby="k-mission" className="py-24 sm:py-32 lg:py-40">
      <div className="container-x">
        <Kicker n="01">{mission.eyebrow}</Kicker>
        <h2
          id="k-mission"
          className="k-scrub-stretch mt-10 max-w-[18ch] text-[clamp(2.4rem,6.4vw,6.75rem)] leading-[1.02] font-medium tracking-[-0.035em] sm:mt-14"
        >
          where{' '}
          <Stretch from={125} to={125} center className={key}>
            {game}
          </Stretch>{' '}
          meets{' '}
          <Stretch from={125} to={125} center className={cn(key, 'text-ultra')}>
            {`${brand},`}
          </Stretch>{' '}
          and{' '}
          <Stretch from={125} to={125} center className={cn(key, 'text-flare-deep')}>
            {people}
          </Stretch>{' '}
          make the call.
        </h2>
        <div className="mt-12 grid gap-8 border-t-2 border-ink pt-6 lg:mt-16 lg:grid-cols-12">
          <p className="k-label lg:col-span-3">Matched by people</p>
          <p className="k-body max-w-2xl text-[1.1875rem] lg:col-span-6 lg:col-start-5 lg:text-[1.375rem] lg:leading-[1.5]">
            {mission.body}
          </p>
        </div>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------------------
   Reasons: a tight typographic list
--------------------------------------------------------------------------- */
export function Reasons() {
  return (
    <section aria-labelledby="k-reasons" className="py-24 sm:py-32">
      <div className="container-x">
        <Kicker n="03" className="text-ultra">
          {reasons.eyebrow}
        </Kicker>
        <h2 id="k-reasons" className="k-display k-scrub mt-8 max-w-[14ch] text-[clamp(3.25rem,9vw,9rem)]">
          <SplitText text={reasons.title} />
        </h2>
        <ol className="k-rows mt-14 sm:mt-20">
          {reasons.items.map((item, i) => (
            <li key={item.title} className="k-hover grid gap-3 py-7 sm:grid-cols-12 sm:items-baseline sm:gap-6 sm:py-9">
              <span className="k-label tabular-nums sm:col-span-1" aria-hidden="true">
                {pad(i + 1)}
              </span>
              <h3 className="k-row-title k-display text-[clamp(2.25rem,4.6vw,4.25rem)] sm:col-span-6">{item.title}</h3>
              <p className="k-body max-w-md text-smoke sm:col-span-5">{item.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------------------
   Commitments: a manifesto, one hard-cut colour band per promise
--------------------------------------------------------------------------- */
const bandTones = [
  { band: 'surface-ultra', body: 'text-white/90', label: 'text-white/85' },
  { band: 'surface-ink', body: 'text-chalk/80', label: 'text-flare' },
  { band: 'surface-flare', body: 'text-ink', label: 'text-ink' },
  { band: 'bg-paper text-ink', body: 'text-smoke', label: 'text-ultra' },
]

export function Commitments() {
  const [top, bottom] = splitAfter(commitments.title, 3)
  return (
    <section aria-labelledby="k-commit">
      <div className="container-x py-24 sm:py-32">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-9">
            <Kicker n="05">{commitments.eyebrow}</Kicker>
            <div className="k-fit mt-8" style={{ '--w': 7.44 } as CSSVars}>
              <h2 id="k-commit" className="k-display">
                <span className="sr-only">{commitments.title}</span>
                <span aria-hidden="true" className="k-fit__line" style={{ '--s': '85.7%', '--s-sm': '86%' } as CSSVars}>
                  {top}
                </span>
                <span aria-hidden="true" className="k-fit__line" style={{ '--s': '123.2%', '--s-sm': '123.5%' } as CSSVars}>
                  {bottom}
                </span>
              </h2>
            </div>
          </div>
          <p className="k-body max-w-sm text-smoke lg:col-span-3">{commitments.intro}</p>
        </div>
      </div>
      <ol>
        {commitments.items.map((item, i) => {
          const tone = bandTones[i % bandTones.length]
          return (
            <li key={item.title} className={cn(tone.band, i === bandTones.length - 1 && 'border-t-2 border-ink')}>
              <div className="container-x grid gap-6 py-14 sm:py-20 lg:grid-cols-12 lg:items-end lg:gap-8">
                <p className={cn('k-label tabular-nums lg:col-span-2 lg:self-start lg:pt-3', tone.label)} aria-hidden="true">
                  {pad(i + 1)} / {pad(commitments.items.length)}
                </p>
                <h3 className="k-display k-scrub text-[clamp(2.75rem,7vw,7.25rem)] lg:col-span-7">
                  <SplitText text={item.title} />
                </h3>
                <p className={cn('k-body max-w-sm lg:col-span-3', tone.body)}>{item.body}</p>
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}

/* ---------------------------------------------------------------------------
   Content support and the work
--------------------------------------------------------------------------- */
export function ContentSupport() {
  return (
    <section aria-labelledby="k-content" className="surface-ink pt-24 pb-16 sm:pt-32 sm:pb-20">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Kicker n="06" className="text-flare">
              {contentSupport.eyebrow}
            </Kicker>
            <h2 id="k-content" className="k-display k-scrub mt-8 text-[clamp(3.25rem,9vw,9rem)]">
              <SplitText text={contentSupport.title} />
            </h2>
          </div>
          <p className="k-body max-w-lg text-chalk/80 lg:col-span-5">{contentSupport.intro}</p>
        </div>
        <ol className="k-rows k-rows--chalk mt-14 sm:mt-20">
          {contentSupport.items.map((item, i) => (
            <li key={item.title} className="k-hover grid gap-3 py-7 sm:grid-cols-12 sm:items-baseline sm:gap-6 sm:py-9">
              <span className="k-label text-flare tabular-nums sm:col-span-1" aria-hidden="true">
                {pad(i + 1)}
              </span>
              <h3 className="k-row-title k-display text-[clamp(2.5rem,6vw,5.75rem)] sm:col-span-7">{item.title}</h3>
              <p className="k-body max-w-sm text-chalk/80 sm:col-span-4">{item.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export function Work() {
  if (campaignPosts.length === 0 && !showEmptySlots) return null
  return (
    <section aria-labelledby="k-work" className="surface-ink pb-24 sm:pb-32">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 border-t-2 border-chalk pt-8 sm:flex-row sm:items-end">
          <div>
            <Kicker n="07" className="text-chalk/80">
              {proof.workEyebrow}
            </Kicker>
            <h2 id="k-work" className="k-display mt-6 text-[clamp(2.75rem,6vw,5.5rem)] [--s:100%]">
              {proof.workTitle}
            </h2>
          </div>
          {campaignPosts.length === 0 && <p className="max-w-sm text-sm text-chalk/75">{proof.workPlaceholder}</p>}
        </div>
        <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {campaignPosts.length > 0
            ? campaignPosts.map((post) => (
                <li key={post.href}>
                  <a href={post.href} target="_blank" rel="noopener" className="block overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.alt}
                      width={360}
                      height={640}
                      sizes="(min-width: 1024px) 16vw, (min-width: 640px) 33vw, 50vw"
                      className="aspect-[9/16] w-full object-cover"
                    />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))
            : Array.from({ length: 6 }, (_, i) => (
                <li
                  key={i}
                  className={cn(
                    'relative flex aspect-[9/16] flex-col justify-between border-2 border-dashed p-3 text-sm font-semibold',
                    i % 3 === 0 ? 'border-flare/60' : i % 3 === 1 ? 'border-ultra-soft/60' : 'border-chalk/40'
                  )}
                >
                  <span className="k-label text-[0.625rem] text-chalk/75 tabular-nums" aria-hidden="true">
                    Post {pad(i + 1)}
                  </span>
                  <span className="text-chalk/80">[Campaign post]</span>
                </li>
              ))}
        </ul>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------------------
   Closing: fit-to-width, with the light streak scrubbed by scroll
--------------------------------------------------------------------------- */
export function Closing() {
  const lines = splitAfter(closing.title, 2)
  const stretch = [122.9, 82.1]
  const stretchSm = [123.2, 82.4]
  return (
    <section aria-labelledby="k-close" className="k-close overflow-x-clip">
      <div className="container-x py-20 sm:py-28 lg:py-32">
        <Kicker n="09">Two signups, one team</Kicker>
        <VelocitySkew className="mt-10 sm:mt-12">
          <div className="k-fit" style={{ '--w': 6.76 } as CSSVars}>
            <h2 id="k-close" className="k-close__title k-display">
              <span className="sr-only">{closing.title}</span>
              {lines.map((line, n) => (
                <span
                  key={line}
                  aria-hidden="true"
                  className="k-fit__line k-glint-text"
                  style={{ '--s': `${stretch[n]}%`, '--s-sm': `${stretchSm[n]}%`, '--line': n } as CSSVars}
                >
                  {line}
                </span>
              ))}
            </h2>
          </div>
        </VelocitySkew>
        <div className="mt-12 grid gap-8 border-t-2 border-chalk/50 pt-6 lg:mt-16 lg:grid-cols-12 lg:items-start">
          <p className="k-body max-w-md text-[1.1875rem] lg:col-span-5">{closing.body}</p>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:col-span-7 lg:justify-end">
            <KButton href={ctas.agency.href} tone="chalk-ultra">
              {ctas.agency.label}
            </KButton>
            <KButton href={ctas.athlete.href} tone="athlete">
              {ctas.athlete.label}
            </KButton>
            <KButton href="/contact" tone="outline" external>
              {closing.contactLabel}
            </KButton>
          </div>
        </div>
        <p className="mt-8 text-sm">
          Questions first?{' '}
          <Link href="/contact" className="k-link">
            Contact the team
          </Link>
        </p>
      </div>
    </section>
  )
}
