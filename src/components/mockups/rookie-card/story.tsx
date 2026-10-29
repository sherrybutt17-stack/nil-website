import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/motion/reveal'
import { mission, playbook, proof, reasons, sides, whatWeDo } from '@/content/home'
import { partners, showEmptySlots } from '@/content/sample'
import { ctas } from '@/content/site'
import { Deck } from './deck'
import { FlipSlab } from './flip-slab'
import { Label, SectionHead } from './primitives'

/* -------------------------------------------------------------------------
   Partners: honest empty label strips until real logos exist
------------------------------------------------------------------------- */
export function Partners() {
  if (partners.length === 0 && !showEmptySlots) return null
  return (
    <section aria-labelledby="rk-partners" className="border-y border-[var(--rk-hair)] bg-paper/60 py-10">
      <div className="container-x grid items-center gap-6 lg:grid-cols-12">
        <h2 id="rk-partners" className="rk-label text-smoke lg:col-span-2">
          {proof.partnersTitle}
        </h2>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:col-span-10 lg:grid-cols-6">
          {partners.length > 0
            ? partners.map((partner) => (
                <li key={partner.name} className="grid h-14 place-items-center">
                  {partner.href ? (
                    <a href={partner.href} target="_blank" rel="noopener" className="grid h-full w-full place-items-center">
                      <Image src={partner.logo} alt={partner.name} width={140} height={48} className="max-h-9 w-auto max-w-full object-contain" />
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  ) : (
                    <Image src={partner.logo} alt={partner.name} width={140} height={48} className="max-h-9 w-auto max-w-full object-contain" />
                  )}
                </li>
              ))
            : Array.from({ length: 6 }, (_, i) => (
                <li
                  key={i}
                  className="rk-label grid h-14 place-items-center rounded-[0.5rem] border-[1.5px] border-dashed border-smoke/45 text-[0.625rem] text-smoke"
                >
                  [Partner logo]
                </li>
              ))}
        </ul>
        {partners.length === 0 && (
          <p className="text-sm text-smoke lg:col-span-10 lg:col-start-3">{proof.partnersPlaceholder}</p>
        )}
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------
   Mission
------------------------------------------------------------------------- */
export function Mission() {
  const { game, brand, people } = mission.statement
  return (
    <section aria-labelledby="rk-mission" className="py-24 sm:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-3">
          <p className="flex items-center gap-3 text-smoke">
            <span className="rk-label">01</span>
            <span aria-hidden="true" className="h-px w-8 bg-current opacity-40" />
            <span className="rk-label">{mission.eyebrow}</span>
          </p>
        </Reveal>
        <div className="lg:col-span-9">
          <Reveal>
            <h2
              id="rk-mission"
              className="max-w-[18ch] text-[clamp(2.25rem,1.3rem+3.6vw,4.6rem)] leading-[1.02] font-semibold tracking-[-0.035em] text-balance"
            >
              Where <span className="rk-word">{game}</span> meets <span className="rk-word text-ultra">{brand}</span>, and{' '}
              <span className="rk-word text-flare-deep">{people}</span> make the call.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-8 border-t border-[var(--rk-hair)] pt-8 md:grid-cols-2">
            <Reveal>
              <p className="text-[1.0625rem] leading-relaxed text-ink/80">{mission.body}</p>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="rk-label text-ink">{whatWeDo.title}</p>
              <p className="mt-3 text-[1.0625rem] leading-relaxed text-ink/80">{whatWeDo.intro}</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------
   Pick your side: two slabbed cards that flip to their steps
------------------------------------------------------------------------- */
type Side = (typeof sides)['athlete']

function SideFront({ side, glyph }: { side: Side; glyph: 'o' | 'x' }) {
  return (
    <>
      <div className="flex items-start justify-between gap-4">
        <Label>{side.eyebrow}</Label>
        <svg aria-hidden="true" viewBox="0 0 40 40" className="size-10 shrink-0 opacity-90">
          {glyph === 'o' ? (
            <circle cx="20" cy="20" r="15" fill="none" stroke="currentColor" strokeWidth="3.5" />
          ) : (
            <path d="M7 7l26 26M33 7L7 33" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
          )}
        </svg>
      </div>
      <h3 className="rk-display mt-[9cqi] text-[clamp(1.6rem,8.2cqi,2.6rem)]">{side.altTitle}</h3>
      <ul className="mt-[7cqi] grid gap-3 border-t border-current/25 pt-[5cqi]">
        {side.points.map((point) => (
          <li key={point} className="flex gap-3 text-[clamp(0.9375rem,4.1cqi,1.0625rem)] leading-snug">
            <span aria-hidden="true" className="mt-[0.55em] h-[1.5px] w-3 shrink-0 bg-current" />
            {point}
          </li>
        ))}
      </ul>
    </>
  )
}

function SideBack({ side, cta }: { side: Side; cta: { href: string; label: string } }) {
  return (
    <>
      <Label>{side.eyebrow} · How it works</Label>
      <p className="rk-display mt-[6cqi] text-[clamp(1.35rem,6.4cqi,2rem)]">{side.title}</p>
      <ol className="mt-[5cqi] grid">
        {side.steps.map((step, i) => (
          <li key={step} className="flex items-baseline gap-4 border-t border-current/25 py-[2.8cqi] text-[clamp(0.9375rem,4cqi,1.0625rem)] leading-snug">
            <span className="rk-num w-7 shrink-0 text-[1.75rem]">{String(i + 1).padStart(2, '0')}</span>
            {step}
          </li>
        ))}
      </ol>
      <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3 pt-[6cqi]">
        <Link href={cta.href} className="rk-btn rk-btn--chalk min-h-11 px-4">
          {cta.label} <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
        <Link href={side.moreHref} className="rk-link text-[0.9375rem] font-semibold">
          {side.moreLabel}
        </Link>
      </div>
    </>
  )
}

export function Sides() {
  return (
    <section aria-labelledby="rk-sides" className="overflow-x-clip pb-24 sm:pb-32">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-4 lg:pt-6">
          <SectionHead id="rk-sides" index="02" kicker="Two sides, one playbook" title={sides.title} />
          <p className="mt-6 max-w-md text-[1.0625rem] leading-relaxed text-smoke">{sides.intro}</p>
          <p className="mt-8 flex max-w-xs items-start gap-3 border-t border-[var(--rk-hair)] pt-5 text-[0.9375rem] text-ink/80">
            <Label className="shrink-0 pt-0.5 text-ink">Tip</Label>
            Turn either card over to see how its side works, step by step.
          </p>
        </Reveal>
        <div className="grid gap-10 sm:grid-cols-2 sm:gap-6 lg:col-span-8 lg:gap-8">
          <Reveal className="mx-auto w-full max-w-[27rem]">
            <FlipSlab
              tone="ultra"
              title="Campaign brief"
              audience="agencies"
              front={<SideFront side={sides.agency} glyph="x" />}
              back={<SideBack side={sides.agency} cta={ctas.agency} />}
            />
          </Reveal>
          <Reveal delay={0.1} className="mx-auto w-full max-w-[27rem] sm:mt-20">
            <FlipSlab
              tone="flare"
              title="Athlete card"
              audience="athletes"
              front={<SideFront side={sides.athlete} glyph="o" />}
              back={<SideBack side={sides.athlete} cta={ctas.athlete} />}
            />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------
   The playbook, dealt as a deck
------------------------------------------------------------------------- */
export function Playbook() {
  return (
    <section aria-labelledby="rk-playbook" className="overflow-x-clip border-t border-[var(--rk-hair)] bg-paper/50 pt-24 sm:pt-32">
      <div className="container-x grid gap-8 lg:grid-cols-12 lg:items-end">
        <Reveal className="lg:col-span-7">
          <SectionHead id="rk-playbook" index="03" kicker={playbook.eyebrow} title={playbook.title} />
        </Reveal>
        <Reveal className="lg:col-span-5" delay={0.06}>
          <p className="max-w-md text-[1.0625rem] leading-relaxed text-smoke lg:ml-auto">{playbook.intro}</p>
        </Reveal>
      </div>
      <div className="mt-10 lg:mt-4">
        <Deck steps={playbook.steps} labelledBy="rk-playbook" />
      </div>
      <div className="container-x pt-10 pb-24 sm:pb-32 lg:pt-4">
        <Reveal>
          <p className="flex max-w-3xl gap-4 rounded-[0.75rem] bg-paper p-5 text-[1.0625rem] leading-relaxed shadow-[inset_0_0_0_1px_var(--rk-hair)] sm:p-6">
            <Label className="shrink-0 pt-1 text-flare-deep">On timing</Label>
            <span className="text-ink/80">{playbook.timingNote}</span>
          </p>
        </Reveal>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------
   Reasons, set as card backs
------------------------------------------------------------------------- */
export function Reasons() {
  return (
    <section aria-labelledby="rk-reasons" className="py-24 sm:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <SectionHead id="rk-reasons" index="04" kicker={reasons.eyebrow} title={reasons.title} kickerClassName="text-ultra" />
          <p className="mt-6 max-w-sm text-[1.0625rem] leading-relaxed text-smoke">
            The back of a card tells you why it matters. Here’s why athlete partnerships work for brands.
          </p>
        </Reveal>
        <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
          {reasons.items.map((item, i) => (
            <li key={item.title}>
              <Reveal delay={i * 0.06} className="h-full">
                <article className="rk-cardback flex h-full flex-col overflow-hidden rounded-[var(--rk-r-card)] shadow-[inset_0_0_0_1px_var(--rk-hair),var(--rk-shadow)]">
                  <div className="flex items-center justify-between bg-ultra px-5 py-3 text-white">
                    <Label>Card back</Label>
                    <Label className="tabular-nums">
                      {String(i + 1).padStart(2, '0')} / {String(reasons.items.length).padStart(2, '0')}
                    </Label>
                  </div>
                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <h3 className="rk-display text-[1.5rem] sm:text-[1.7rem]">{item.title}</h3>
                    <p className="mt-4 text-[1rem] leading-relaxed text-ink/80">{item.body}</p>
                    <div className="mt-auto flex items-center justify-between pt-8">
                      <span aria-hidden="true" className="rk-bars" />
                      <Label className="text-smoke">Real NIL Agency</Label>
                    </div>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
