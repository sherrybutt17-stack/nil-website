import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { hero } from '@/content/home'
import { ctas } from '@/content/site'
import { AthleteCardFace, CardBackFace } from './cards'
import { HoloTilt } from './holo'
import { Label, RegMarks, Slab } from './primitives'

const rise = (i: number) => ({ '--rk-i': i }) as React.CSSProperties

/** "Real fit." → "Real " + "fit." so the last word can carry the foil. */
function splitLast(line: string) {
  const at = line.lastIndexOf(' ')
  return [line.slice(0, at + 1), line.slice(at + 1)]
}

function HeroDisplay() {
  return (
    <div className="relative mx-auto w-full max-w-[34rem] px-6 pt-6 pb-4 sm:px-10">
      <RegMarks />
      <div className="relative isolate mx-auto w-[min(100%,21.5rem)] pt-10 sm:pt-12 lg:w-[min(100%,23rem)]">
        <span aria-hidden="true" className="rk-spot" />
        {/* The agency's brief, tucked behind the athlete card, face down. */}
        <div
          aria-hidden="true"
          className="rk-deal-in absolute top-0 -left-[7%] w-[80%] -rotate-[10deg] sm:-left-[26%]"
          style={{ ...rise(1), '--rk-from-rot': '-16deg' } as React.CSSProperties}
        >
          <CardBackFace tone="ultra" label="Campaign brief" className="shadow-[var(--rk-shadow)]" />
        </div>
        <div className="rk-deal-in relative isolate" style={{ ...rise(2), '--rk-from-rot': '5deg' } as React.CSSProperties}>
          <span aria-hidden="true" className="rk-contact" />
          <HoloTilt className="rounded-[var(--rk-r-slab)]">
            <div aria-hidden="true">
              <Slab title="Your athlete card" status="Under review">
                <AthleteCardFace holo introSweep />
              </Slab>
            </div>
          </HoloTilt>
        </div>
      </div>
      <p className="mt-7 flex items-baseline justify-center gap-3 text-[0.8125rem] text-smoke sm:text-center">
        <Label className="shrink-0 whitespace-nowrap text-ink">Fig. 01</Label>
        <span>
          Athlete profile, under review.{' '}
          <span className="hidden pointer-fine:inline">Move your cursor across the card.</span>
          <span className="pointer-fine:hidden">Drag across the card.</span>
        </span>
      </p>
    </div>
  )
}

export function Hero() {
  return (
    <section aria-labelledby="rk-hero-title" className="relative overflow-x-clip">
      <div className="container-x grid items-center gap-14 pt-10 pb-16 sm:pt-14 lg:grid-cols-12 lg:gap-6 lg:pt-16 lg:pb-20">
        <div className="@container lg:col-span-7">
          <p className="rk-rise flex flex-wrap items-center gap-3" style={rise(0)}>
            <span className="rk-label rounded-[0.375rem] bg-ink px-2.5 py-1.5 text-chalk">Real NIL Agency</span>
            <span className="rk-label text-smoke">{hero.eyebrow}</span>
          </p>
          <h1 id="rk-hero-title" className="rk-display rk-h1 mt-7">
            {hero.lines.map((line, i) => {
              if (i < hero.lines.length - 1) {
                return (
                  <span key={line} className="rk-rise block" style={rise(i + 1)}>
                    {line}
                  </span>
                )
              }
              const [lead, last] = splitLast(line)
              return (
                <span key={line} className="rk-rise block" style={rise(i + 1)}>
                  {lead}
                  <span className="rk-foil-text">{last}</span>
                </span>
              )
            })}
          </h1>
          <p className="rk-rise mt-8 max-w-[34rem] text-lg leading-relaxed text-ink/80 sm:text-[1.1875rem]" style={rise(4)}>
            {hero.intro}
          </p>
          <div className="rk-rise mt-9 flex flex-col gap-3 xs:flex-row xs:flex-wrap xs:items-center" style={rise(5)}>
            <Link href={ctas.agency.href} className="rk-btn rk-btn--ultra">
              {ctas.agency.label} <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link href={ctas.athlete.href} className="rk-btn rk-btn--outline">
              <span aria-hidden="true" className="size-2 rounded-full bg-flare shadow-[0_0_0_1.5px_var(--color-ink)]" />
              {ctas.athlete.label}
            </Link>
          </div>
          <p className="rk-rise mt-5 text-sm text-smoke" style={rise(6)}>
            {hero.note}
          </p>
        </div>
        <div className="lg:col-span-5">
          <HeroDisplay />
        </div>
      </div>

      {/* Hero points set as nameplates along the bottom edge. */}
      <div className="container-x pb-16 sm:pb-20">
        <ul className="grid gap-px overflow-hidden rounded-[0.75rem] bg-[var(--rk-hair)] shadow-[inset_0_0_0_1px_var(--rk-hair)] sm:grid-cols-2 lg:grid-cols-4">
          {hero.points.map((point, i) => (
            <li key={point} className="flex items-start gap-4 bg-paper px-5 py-5">
              <span className="rk-num pt-0.5 text-[1.75rem] text-ultra">{String(i + 1).padStart(2, '0')}</span>
              <span className="text-[0.9375rem] leading-snug font-medium">{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
