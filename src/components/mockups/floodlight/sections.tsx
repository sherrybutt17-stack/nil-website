import { Fragment, Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { homeFaqs } from '@/content/faqs'
import {
  closing,
  commitments,
  contentSupport,
  hero,
  mission,
  playbook,
  proof,
  reasons,
  sides,
  whatWeDo,
} from '@/content/home'
import { sports } from '@/content/options'
import { campaignPosts, partners, showEmptySlots } from '@/content/sample'
import { ctas, site } from '@/content/site'
import { cn } from '@/lib/utils'
import { LedRibbon, LowerThird, SpotPanel } from './interactive'
import { FieldPerspective, LightRig } from './light-rig'
import { HeroTitle, RevealHeading, Rise } from './motion'
import { PlaybookChapter } from './playbook'
import { FlButton, Kicker, pad } from './ui'

/* ---------------------------------------------------------------------------
   Hero
--------------------------------------------------------------------------- */
export function Hero() {
  return (
    <section aria-labelledby="fl-hero" className="fl-surface relative isolate flex min-h-[max(100svh,46rem)] flex-col overflow-hidden pt-(--fl-h)">
        <LightRig variant="hero" />
        <FieldPerspective className="absolute inset-x-0 bottom-0 -z-0 h-[52%] w-full" />
        <div className="container-x relative z-10 flex flex-1 flex-col justify-end pt-32 pb-10 sm:pt-36 lg:pt-28 lg:pb-12">
          <div className="flex items-end justify-between gap-6">
            <Kicker>{hero.eyebrow}</Kicker>
            <p className="fl-label hidden text-chalk/60 lg:block">{site.tagline}</p>
          </div>
          <HeroTitle
            id="fl-hero"
            lines={hero.lines}
            className="mt-6 text-[clamp(3.2rem,calc(56/375*100vw),7rem)] md:text-[clamp(5.5rem,calc(147/1440*100vw),12.5rem)]"
          />
          <div className="mt-10 grid gap-10 border-t border-chalk/15 pt-8 lg:mt-11 lg:grid-cols-12 lg:gap-8">
            <p className="max-w-xl text-lg leading-relaxed text-chalk/80 text-pretty lg:col-span-5 lg:text-[1.1875rem]">
              {hero.intro}
            </p>
            <ul className="order-3 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:order-none lg:col-span-4 lg:grid-cols-1 lg:gap-y-2.5">
              {hero.points.map((point) => (
                <li key={point} className="flex gap-3 text-[0.9375rem] leading-snug text-chalk/80">
                  <span aria-hidden="true" className="mt-[0.55em] h-0.5 w-3.5 shrink-0 bg-flare" />
                  {point}
                </li>
              ))}
            </ul>
            <div className="order-2 flex flex-col gap-3 xs:flex-row xs:flex-wrap lg:order-none lg:col-span-3 lg:flex-col lg:flex-nowrap">
              <FlButton href={ctas.agency.href} tone="ultra">
                {ctas.agency.label}
              </FlButton>
              <FlButton href={ctas.athlete.href} tone="line-flare">
                {ctas.athlete.label}
              </FlButton>
              <p className="mt-1 text-sm text-chalk/60 xs:basis-full">{hero.note}</p>
            </div>
          </div>
        </div>
    </section>
  )
}

export function Ribbon() {
  return <LedRibbon items={sports} />
}

/* ---------------------------------------------------------------------------
   Partners (placeholders until real ones exist)
--------------------------------------------------------------------------- */
export function Partners() {
  if (partners.length === 0 && !showEmptySlots) return null
  return (
    <section aria-labelledby="fl-proof" className="fl-surface relative py-14 sm:py-16">
      <div className="container-x grid gap-8 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-3">
          <h2 id="fl-proof" className="fl-label text-chalk/70">
            {proof.partnersTitle}
          </h2>
          {partners.length === 0 && <p className="mt-3 max-w-xs text-sm leading-relaxed text-chalk/60">{proof.partnersPlaceholder}</p>}
        </div>
        <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-[3px] bg-chalk/10 ring-1 ring-chalk/10 sm:grid-cols-3 lg:col-span-9 lg:grid-cols-6">
          {partners.length > 0
            ? partners.map((partner) => (
                <li key={partner.name} className="grid h-24 place-items-center bg-ink px-4">
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
                <li key={i} className="grid h-24 place-items-center bg-ink p-3">
                  <span className="grid h-full w-full place-items-center rounded-[2px] border border-dashed border-chalk/25 text-sm font-semibold text-chalk/60">
                    [Partner logo]
                  </span>
                </li>
              ))}
        </ul>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------------------
   Mission
--------------------------------------------------------------------------- */
export function Mission() {
  const { game, brand, people } = mission.statement
  // "where game meets brand, and people make the call." Key words in display caps.
  const words: { text: string; key?: boolean; tone?: string }[] = [
    { text: 'where' },
    { text: game, key: true },
    { text: 'meets' },
    { text: `${brand},`, key: true, tone: 'text-ultra-soft' },
    { text: 'and' },
    { text: people, key: true, tone: 'text-flare' },
    { text: 'make' },
    { text: 'the' },
    { text: 'call.' },
  ]
  return (
    <section aria-labelledby="fl-mission" className="fl-surface relative border-t border-chalk/10 py-28 sm:py-36 lg:py-44">
      <div className="container-x grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <Kicker index={1}>{mission.eyebrow}</Kicker>
        </div>
        <div className="lg:col-span-9">
          <h2
            id="fl-mission"
            className="fl-scrub text-[clamp(2.6rem,calc(104/1440*100vw),7.25rem)] leading-[0.98] font-medium tracking-[-0.04em] text-balance"
          >
            {words.map((word, i) => (
              <Fragment key={word.text}>
                <span
                  className={cn(
                    'fl-scrub__word inline-block',
                    word.key && 'fl-scrub__word--key display text-[1.22em] leading-[0.8] tracking-[-0.01em]',
                    word.tone
                  )}
                  style={{ '--w': i } as React.CSSProperties}
                >
                  {word.text}
                </span>
                {i < words.length - 1 && ' '}
              </Fragment>
            ))}
          </h2>
          <div className="mt-14 grid gap-10 md:grid-cols-9">
            <Rise className="md:col-span-5 md:col-start-5">
              <p className="text-lg leading-relaxed text-chalk/75 text-pretty sm:text-xl">{mission.body}</p>
            </Rise>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------------------
   Two sides
--------------------------------------------------------------------------- */
function SideGlyph({ kind }: { kind: 'x' | 'o' }) {
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true" className="size-24 shrink-0 sm:size-32">
      {kind === 'o' ? (
        <circle cx="60" cy="60" r="44" fill="none" stroke="currentColor" strokeWidth="9" />
      ) : (
        <path d="M22 22L98 98M98 22L22 98" stroke="currentColor" strokeWidth="10" strokeLinecap="round" />
      )}
    </svg>
  )
}

export function Sides() {
  const panels = [
    { side: sides.agency, tone: 'ultra' as const, glyph: 'x' as const, cta: ctas.agency, button: 'ultra' as const },
    { side: sides.athlete, tone: 'flare' as const, glyph: 'o' as const, cta: ctas.athlete, button: 'flare' as const },
  ]
  return (
    <section aria-labelledby="fl-sides" className="fl-surface relative border-t border-chalk/10 py-28 sm:py-36">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-9">
            <Kicker index={2}>{whatWeDo.eyebrow}</Kicker>
            <RevealHeading
              id="fl-sides"
              className="display mt-7 text-[min(calc(56/375*100vw),3.75rem)] md:text-[clamp(3.4rem,calc(116/1440*100vw),9rem)]"
              lines={['Hand‑matched,', <span key="b" className="text-chalk/45">not mass‑matched.</span>]}
            />
          </div>
          <Rise className="lg:col-span-3" delay={0.15}>
            <p className="max-w-md text-lg leading-relaxed text-chalk/75 text-pretty">{whatWeDo.intro}</p>
          </Rise>
        </div>

        <div className="mt-16 grid gap-4 lg:mt-20 lg:grid-cols-2">
          {panels.map(({ side, tone, glyph, cta, button }, p) => (
            <Rise key={side.eyebrow} delay={p * 0.12} className="h-full">
              <SpotPanel tone={tone} className="h-full">
                <article className="@container relative flex h-full flex-col p-7 sm:p-10 xl:p-12">
                  <div className="flex items-start justify-between gap-6">
                    <p className={cn('fl-label', tone === 'ultra' ? 'text-ultra-soft' : 'text-flare')}>{side.eyebrow}</p>
                    <span className={cn('-mt-2 -mr-2', tone === 'ultra' ? 'text-ultra-soft/30' : 'text-flare/30')}>
                      <SideGlyph kind={glyph} />
                    </span>
                  </div>
                  <h3 className="display mt-6 max-w-[13ch] text-[2.9rem] leading-[0.92] @md:text-[4rem] @xl:text-[4.75rem]">{side.title}</h3>
                  <ol className="mt-10">
                    {side.steps.map((step, i) => (
                      <li key={step} className="grid grid-cols-[3rem_1fr] items-baseline border-t border-chalk/10 py-4 text-[1.0625rem] leading-snug text-chalk/85">
                        <span aria-hidden="true" className={cn('fl-label', tone === 'ultra' ? 'text-ultra-soft' : 'text-flare')}>
                          {pad(i + 1)}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                  <div className="mt-auto flex flex-col gap-5 pt-10 xs:flex-row xs:items-center">
                    <FlButton href={cta.href} tone={button}>
                      {cta.label}
                    </FlButton>
                    <Link href={side.moreHref} className="fl-navlink text-[0.9375rem] font-semibold text-chalk">
                      {side.moreLabel}
                    </Link>
                  </div>
                </article>
              </SpotPanel>
            </Rise>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------------------
   Why brands team up with athletes: broadcast lower thirds
--------------------------------------------------------------------------- */
export function Reasons() {
  return (
    <section aria-labelledby="fl-reasons" className="fl-surface relative border-t border-chalk/10 py-28 sm:py-36">
      <div className="container-x grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Kicker index={3} tone="ultra">
              {reasons.eyebrow}
            </Kicker>
            <RevealHeading
              id="fl-reasons"
              className="display mt-7 text-[clamp(3.4rem,7vw,7.5rem)]"
              lines={['Why brands', 'team up with', <span key="a" className="text-ultra-soft">athletes.</span>]}
            />
          </div>
        </div>
        <ul className="grid gap-x-10 gap-y-16 sm:grid-cols-2 lg:col-span-7 lg:pt-28">
          {reasons.items.map((item, i) => (
            <li key={item.title} className={cn(i % 2 === 1 && 'sm:mt-20')}>
              <LowerThird index={i + 1} title={item.title} />
              <Rise delay={0.35}>
                <p className="mt-6 max-w-sm border-l border-ultra-soft/50 pl-5 text-base leading-relaxed text-chalk/75">{item.body}</p>
              </Rise>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------------------
   How it works: the pinned playbook chapter
--------------------------------------------------------------------------- */
export function Playbook() {
  return (
    <section aria-labelledby="fl-playbook" className="fl-surface fl-surface--raised relative border-t border-chalk/10 pt-28 sm:pt-36">
      <div className="container-x grid gap-8 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <Kicker index={4}>{playbook.eyebrow}</Kicker>
          <RevealHeading
            id="fl-playbook"
            className="display mt-7 text-[clamp(3.4rem,9vw,9rem)]"
            lines={[
              'Every match is',
              <Fragment key="hand">
                drawn up by <span className="accent-serif text-[1.1em] text-flare">hand.</span>
              </Fragment>,
            ]}
          />
        </div>
        <Rise className="lg:col-span-4" delay={0.15}>
          <p className="max-w-md text-lg leading-relaxed text-chalk/75 text-pretty">{playbook.intro}</p>
        </Rise>
      </div>
      <PlaybookChapter steps={playbook.steps} />
      <div className="container-x pt-16 pb-28 sm:pb-36 lg:pt-8">
        <Rise>
          <div className="flex max-w-4xl items-stretch">
            <span aria-hidden="true" className="w-1.5 shrink-0 bg-flare" />
            <p className="bg-chalk/[0.06] px-6 py-5 text-lg leading-relaxed text-chalk/85 text-pretty sm:px-8 sm:py-6">
              {playbook.timingNote}
            </p>
          </div>
        </Rise>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------------------
   What you can count on: the scoreboard
--------------------------------------------------------------------------- */
export function Commitments() {
  return (
    <section aria-labelledby="fl-commit" className="fl-surface relative border-t border-chalk/10 py-28 sm:py-36">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Kicker index={5}>{commitments.eyebrow}</Kicker>
            <RevealHeading id="fl-commit" className="display mt-7 text-[clamp(3.4rem,9vw,9rem)]" lines={['What you can', 'count on.']} />
          </div>
          <Rise className="lg:col-span-4" delay={0.15}>
            <p className="max-w-md text-lg leading-relaxed text-chalk/75">{commitments.intro}</p>
          </Rise>
        </div>

        <Rise className="mt-16 lg:mt-20">
          <div className="fl-board">
            <div aria-hidden="true" className="flex items-center justify-between gap-6 border-b border-chalk/10 px-6 py-4 sm:px-8">
              <span className="fl-dots text-[1.25rem] leading-none font-black tracking-[0.12em] text-flare uppercase [font-stretch:125%] sm:text-[2rem]">
                {site.name}
              </span>
              <span className="fl-label hidden items-center gap-5 text-chalk/70 sm:flex">
                <span className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-flare shadow-[0_0_12px_var(--color-flare)]" />
                  Athletes
                </span>
                <span className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-ultra-soft shadow-[0_0_12px_var(--color-ultra-soft)]" />
                  Agencies
                </span>
              </span>
            </div>
            <ul className="grid sm:grid-cols-2 lg:grid-cols-4">
              {commitments.items.map((item, i) => (
                <li
                  key={item.title}
                  className={cn(
                    'border-chalk/10 p-6 sm:p-8',
                    i > 0 && 'border-t sm:border-t-0',
                    i % 2 === 1 && 'sm:border-l',
                    i >= 2 && 'sm:border-t lg:border-t-0',
                    i === 2 && 'lg:border-l'
                  )}
                >
                  <span aria-hidden="true" className="fl-dots fl-board__digit block text-[5.5rem] sm:text-[6.5rem]">
                    {pad(i + 1)}
                  </span>
                  <h3 className="mt-8 text-xl leading-snug font-semibold">{item.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-chalk/70">{item.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </Rise>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------------------
   Content support, with a camera viewfinder
--------------------------------------------------------------------------- */
function Viewfinder() {
  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-[22rem]">
      {/* A single spot from above. */}
      <div className="absolute -top-24 left-1/2 h-[130%] w-[160%] -translate-x-1/2 bg-[conic-gradient(from_166deg_at_50%_0,transparent_0deg,color-mix(in_oklab,var(--color-flare)_14%,transparent)_14deg,transparent_28deg)] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
      <div className="relative aspect-[9/16] overflow-hidden rounded-[6px] bg-ink-raised ring-1 ring-chalk/15">
        {/* Thirds */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_33.2%,var(--fl-line-soft)_33.2%,var(--fl-line-soft)_33.5%,transparent_33.5%,transparent_66.5%,var(--fl-line-soft)_66.5%,var(--fl-line-soft)_66.8%,transparent_66.8%),linear-gradient(to_bottom,transparent_33.2%,var(--fl-line-soft)_33.2%,var(--fl-line-soft)_33.4%,transparent_33.4%,transparent_66.6%,var(--fl-line-soft)_66.6%,var(--fl-line-soft)_66.8%,transparent_66.8%)]" />
        <span className="fl-corner top-4 left-4 border-t-2 border-l-2" />
        <span className="fl-corner top-4 right-4 border-t-2 border-r-2" />
        <span className="fl-corner bottom-4 left-4 border-b-2 border-l-2" />
        <span className="fl-corner right-4 bottom-4 border-r-2 border-b-2" />
        <div className="fl-label absolute inset-x-8 top-8 flex items-center justify-between text-chalk/70">
          <span className="flex items-center gap-2 text-flare">
            <span className="size-2 rounded-full bg-flare" />
            Rec
          </span>
          <span>9:16</span>
        </div>
        <div className="absolute inset-0 grid place-items-center">
          <span className="numeral-outline text-[9rem] text-chalk/25">00</span>
        </div>
        <div className="absolute inset-x-8 bottom-9">
          <div className="fl-label flex justify-between text-chalk/60">
            <span>Reel</span>
            <span>Draft</span>
          </div>
          <div className="relative mt-3 h-[3px] rounded-full bg-chalk/15">
            <span className="absolute inset-y-0 left-0 w-[38%] rounded-full bg-flare" />
            <span className="absolute top-1/2 left-[38%] size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-chalk" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function ContentSupport() {
  return (
    <section aria-labelledby="fl-content" className="fl-surface relative overflow-hidden border-t border-chalk/10 py-28 sm:py-36">
      <div className="container-x grid gap-20 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-6">
          <Kicker index={6}>{contentSupport.eyebrow}</Kicker>
          <RevealHeading id="fl-content" className="display mt-7 text-[clamp(3.4rem,8vw,8.25rem)]" lines={['Content', 'that lands.']} />
          <Rise delay={0.1}>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-chalk/75 text-pretty">{contentSupport.intro}</p>
          </Rise>
          <ul className="mt-12 border-t border-chalk/10">
            {contentSupport.items.map((item, i) => (
              <Rise as="li" key={item.title} delay={0.08 * i} className="grid gap-2 border-b border-chalk/10 py-5 sm:grid-cols-[13rem_1fr] sm:gap-8">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-base leading-relaxed text-chalk/70">{item.body}</p>
              </Rise>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-5 lg:col-start-8">
          <Rise delay={0.1}>
            <Viewfinder />
          </Rise>
        </div>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------------------
   The work (placeholders until there are posts to show)
--------------------------------------------------------------------------- */
export function Work() {
  if (campaignPosts.length === 0 && !showEmptySlots) return null
  return (
    <section aria-labelledby="fl-work" className="fl-surface relative pb-28 sm:pb-36">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 border-t border-chalk/10 pt-16 sm:flex-row sm:items-end">
          <div>
            <Kicker index={7}>{proof.workEyebrow}</Kicker>
            <RevealHeading id="fl-work" className="display mt-7 text-[clamp(3rem,6vw,6rem)]" lines={[proof.workTitle]} />
          </div>
          {campaignPosts.length === 0 && <p className="max-w-sm text-sm leading-relaxed text-chalk/60">{proof.workPlaceholder}</p>}
        </div>
        <ul className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {campaignPosts.length > 0
            ? campaignPosts.map((post) => (
                <li key={post.href}>
                  <a href={post.href} target="_blank" rel="noopener" className="block overflow-hidden rounded-[6px]">
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
                <Rise as="li" key={i} delay={0.06 * i}>
                  <div
                    className={cn(
                      'relative grid aspect-[9/16] place-items-center overflow-hidden rounded-[6px] border border-dashed text-sm font-semibold text-chalk/60',
                      i % 2 === 0 ? 'border-flare/40 bg-flare/[0.05]' : 'border-ultra-soft/40 bg-ultra-soft/[0.06]'
                    )}
                  >
                    <span aria-hidden="true" className="absolute inset-x-3 top-3 flex gap-1">
                      {[0, 1, 2].map((s) => (
                        <span key={s} className={cn('h-[2px] flex-1 rounded-full', s === 0 ? 'bg-chalk/50' : 'bg-chalk/15')} />
                      ))}
                    </span>
                    <span aria-hidden="true" className="absolute right-3 bottom-14 flex flex-col gap-2.5">
                      {[0, 1, 2].map((s) => (
                        <span key={s} className="size-5 rounded-full border border-chalk/30" />
                      ))}
                    </span>
                    <span aria-hidden="true" className="absolute inset-x-3 bottom-4 space-y-1.5">
                      <span className="block h-1.5 w-2/3 rounded-full bg-chalk/15" />
                      <span className="block h-1.5 w-5/12 rounded-full bg-chalk/10" />
                    </span>
                    [Campaign post]
                  </div>
                </Rise>
              ))}
        </ul>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------------------
   FAQ
--------------------------------------------------------------------------- */
export function Faq() {
  return (
    <section id="faq" aria-labelledby="fl-faq" className="fl-surface relative border-t border-chalk/10 py-28 sm:py-36">
      <div className="container-x grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Kicker index={8}>FAQ</Kicker>
            <RevealHeading id="fl-faq" className="display mt-7 text-[clamp(3.4rem,7vw,7.5rem)]" lines={['Questions,', 'answered.']} />
            <p className="mt-8 text-base text-chalk/70">
              Still have a question?{' '}
              <Link href="/contact" className="font-semibold text-chalk underline decoration-chalk/40 underline-offset-4 hover:decoration-chalk">
                Contact the team
              </Link>
              .
            </p>
          </div>
        </div>
        {/* Suspense lets React hydrate this below-the-fold widget in its own task. */}
        <Suspense>
          <Accordion type="single" collapsible className="lg:col-span-7">
            {homeFaqs.map((faq, i) => (
              <AccordionItem key={faq.q} value={`faq-${i}`} className="border-b border-chalk/12 first:border-t">
                <AccordionTrigger className="gap-6 py-7 text-xl sm:text-2xl [&[data-state=open]>span:first-child]:rotate-0 [&[data-state=open]>span:last-child]:bg-flare [&[data-state=open]>span:last-child]:text-ink [&>span:last-child]:size-10 [&>span:last-child]:border-chalk/30">
                  <span className="flex gap-5 sm:gap-8">
                    <span aria-hidden="true" className="fl-label pt-[0.55em] text-flare">
                      {pad(i + 1)}
                    </span>
                    <span className="font-semibold tracking-[-0.01em]">{faq.q}</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pl-[calc(1.25rem+1.4rem)] text-lg text-chalk/80 opacity-100 sm:pl-[calc(2rem+1.4rem)]">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Suspense>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------------------
   Closing: the lights meet
--------------------------------------------------------------------------- */
export function Closing() {
  return (
    <section aria-labelledby="fl-close" className="fl-surface relative isolate overflow-hidden border-t border-chalk/10 pt-44 pb-28 sm:pt-52 sm:pb-36">
      <LightRig variant="close" />
      <FieldPerspective className="absolute inset-x-0 bottom-0 h-[55%] w-full" />
      <div className="container-x relative z-10 flex flex-col items-center text-center">
        <Kicker>Your move</Kicker>
        <RevealHeading
          id="fl-close"
          className="display mt-8 text-[clamp(3.6rem,13.5vw,13.5rem)]"
          lines={[
            'Ready to',
            <Fragment key="play">
              make a <span className="accent-serif text-[1.04em] text-flare">play?</span>
            </Fragment>,
          ]}
        />
        <Rise delay={0.2}>
          <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-chalk/80 sm:text-xl">{closing.body}</p>
        </Rise>
        <Rise delay={0.3} className="mt-12 flex w-full flex-col justify-center gap-3 xs:w-auto xs:flex-row xs:flex-wrap">
          <FlButton href={ctas.agency.href} tone="ultra">
            {ctas.agency.label}
          </FlButton>
          <FlButton href={ctas.athlete.href} tone="flare">
            {ctas.athlete.label}
          </FlButton>
          <FlButton href="/contact" tone="line" icon={ArrowUpRight}>
            {closing.contactLabel}
          </FlButton>
        </Rise>
      </div>
    </section>
  )
}
