'use client'

import { useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, Pause, Play } from 'lucide-react'
import { AnimatePresence, useInView, useMotionValueEvent, useScroll, useTransform, type MotionValue } from 'motion/react'
import * as m from 'motion/react-m'
import { LogoMark } from '@/components/graphics/logo'
import { playbook } from '@/content/home'
import { sampleAthlete, sampleBrief } from '@/content/sample'
import { cn } from '@/lib/utils'
import { GlyphCheck, GlyphO, GlyphX } from './glyphs'
import { EASE, pad2, SectionIndex } from './parts'
import { STICKY_CONSOLE_QUERY, useMediaQuery, useReducedMotionSafe, useView, type View } from './view-store'

/*
 * 02: the human matching process drawn as a product interface. On desktop the
 * page scroll drives the four steps (sticky stage); elsewhere it is a stepper
 * that auto-advances while in view, with pause, and stops on any interaction.
 * The console itself is decorative; the step list beside it carries the text.
 */

const steps = playbook.steps
const last = steps.length - 1
const statuses = ['Submitted', 'In review', 'Match proposed', 'Live']
const reviewChecks = ['Sport', 'Audience', 'Style', 'Interests']

type Mode = 'scroll' | 'auto' | 'static'

export function MatchConsole() {
  const view = useView()
  const reduce = useReducedMotionSafe()
  const sticky = useMediaQuery(STICKY_CONSOLE_QUERY)
  const trackRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const inView = useInView(stageRef, { amount: 0.45 })
  const [scrollStep, setScrollStep] = useState(0)
  const [manualStep, setManualStep] = useState(0)
  const [playing, setPlaying] = useState(true)

  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start start', 'end end'] })
  useMotionValueEvent(scrollYProgress, 'change', (v) => setScrollStep(Math.min(last, Math.floor(v * steps.length))))

  const step = sticky ? scrollStep : manualStep
  const mode: Mode = sticky ? (reduce ? 'static' : 'scroll') : !reduce && playing ? 'auto' : 'static'

  const goTo = (i: number) => {
    if (sticky && trackRef.current) {
      const track = trackRef.current
      const top = track.getBoundingClientRect().top + window.scrollY
      const range = track.offsetHeight - window.innerHeight
      window.scrollTo({ top: top + range * ((i + 0.5) / steps.length), behavior: reduce ? 'auto' : 'smooth' })
    } else {
      setPlaying(false)
      setManualStep(i)
    }
  }

  return (
    <section aria-labelledby="x-console-title">
      <div className="x-wrap x-ruled">
        <div ref={trackRef} className="x-track">
          <div ref={stageRef} className="x-track__stage">
            <div className="x-pad grid w-full gap-10 py-20 sm:py-28 lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-x-6 lg:gap-y-8 lg:py-10">
              <div className="lg:col-span-4">
                <SectionIndex n="02" label={playbook.eyebrow} />
                <h2 id="x-console-title" className="x-h2 mt-8 max-w-[13ch] lg:mt-10 lg:text-[clamp(2.25rem,0.4rem+3.1vw,4rem)]">
                  {playbook.title}
                </h2>
                <p className="x-body mt-5 max-w-sm">{playbook.intro}</p>
              </div>

              <div className="lg:col-span-8 lg:col-start-5 lg:row-span-2 lg:row-start-1 lg:self-center">
                <Console step={step} view={view} mode={mode} progress={scrollYProgress} paused={!inView} onRunEnd={() => setManualStep((s) => (s === last ? 0 : s + 1))} />
                <div className="x-manual">
                <div className="mt-4 flex items-center justify-between gap-3">
                  {!reduce && (
                    <button
                      type="button"
                      onClick={() => setPlaying((p) => !p)}
                      className="x-btn x-btn--line x-btn--sm"
                    >
                      {playing ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
                      {playing ? 'Pause' : 'Play'}
                    </button>
                  )}
                  <div className="ml-auto flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => goTo(step === 0 ? last : step - 1)}
                      className="x-btn x-btn--line x-btn--sm w-11 px-0"
                    >
                      <ArrowLeft aria-hidden="true" />
                      <span className="sr-only">Previous step</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => goTo(step === last ? 0 : step + 1)}
                      className="x-btn x-btn--line x-btn--sm w-11 px-0"
                    >
                      <ArrowRight aria-hidden="true" />
                      <span className="sr-only">Next step</span>
                    </button>
                  </div>
                </div>
                </div>
              </div>

              <ol className="border-t border-line lg:col-span-4 lg:row-start-2 lg:self-start">
                {steps.map((s, i) => {
                  const active = i === step
                  return (
                    <li key={s.title} data-active={active} className="relative border-b border-line">
                      <span aria-hidden="true" className="x-step-bar absolute top-0 bottom-0 left-0 w-[2px] bg-(--x-fill)" />
                      <button
                        type="button"
                        onClick={() => goTo(i)}
                        aria-current={active ? 'step' : undefined}
                        className={cn(
                          'flex min-h-14 w-full items-center gap-4 pr-2 pl-5 text-left transition-colors',
                          active ? 'text-ink' : 'text-smoke hover:text-ink'
                        )}
                      >
                        <span className="x-mono w-6 shrink-0">{pad2(i + 1)}</span>
                        <span className="text-[1.0625rem] font-semibold tracking-[-0.015em]">{s.title}</span>
                        <span className={cn('x-mono ml-auto transition-opacity duration-300', active ? 'text-(--x-accent)' : 'opacity-0')}>
                          {statuses[i]}
                        </span>
                      </button>
                      <div className="x-step-body">
                        <div>
                          <p className="x-body pr-4 pb-5 pl-[3.75rem] text-[0.9375rem]">{s.body}</p>
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ol>
            </div>
          </div>
        </div>

        <div className="x-pad grid gap-4 border-t border-line py-9 lg:grid-cols-12 lg:gap-6">
          <p className="x-mono text-(--x-accent) lg:col-span-4">A note on timing</p>
          <p className="max-w-3xl text-lg leading-relaxed tracking-[-0.01em] text-pretty lg:col-span-8 lg:col-start-5">
            {playbook.timingNote}
          </p>
        </div>
      </div>
      <p className="sr-only" aria-live="polite">
        {`Step ${step + 1} of ${steps.length}: ${steps[step].title}. ${statuses[step]}.`}
      </p>
    </section>
  )
}

type ConsoleProps = {
  step: number
  view: View
  mode: Mode
  progress: MotionValue<number>
  paused: boolean
  onRunEnd: () => void
}

function Console({ step, view, mode, progress, paused, onRunEnd }: ConsoleProps) {
  const athleteView = view === 'athletes'

  return (
    <div
      aria-hidden="true"
      data-step={step}
      className="x-console overflow-hidden rounded-[0.625rem] bg-paper shadow-[0_0_0_1px_var(--color-line),0_1px_2px_rgb(0_0_0/0.04),0_36px_70px_-44px_rgb(0_0_0/0.4)]"
    >
      <div className="flex items-center justify-between gap-3 border-b border-line px-3.5 py-3 sm:px-5">
        <div className="flex min-w-0 items-center gap-2.5">
          <LogoMark className="size-4 shrink-0" />
          <span className="x-mono">Match desk</span>
          <span className="x-mono hidden truncate text-smoke md:inline">/ {athleteView ? 'Athlete view' : 'Agency view'}</span>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <span className="x-mono hidden items-center gap-[0.6ch] text-smoke sm:inline-flex">
            Step <Tick n={step} /> / {pad2(steps.length)}
          </span>
          <span key={step} className="x-mono x-fade rounded-[3px] bg-(--x-fill) px-2 py-1 text-(--x-on-fill) [--i:-5]">
            {statuses[step]}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2.5 p-2.5 sm:gap-4 sm:p-5 md:grid-cols-[minmax(0,1fr)_1.75rem_minmax(0,1.08fr)_1.75rem_minmax(0,1fr)] md:gap-0 xl:grid-cols-[minmax(0,1fr)_2.5rem_minmax(0,1.08fr)_2.5rem_minmax(0,1fr)]">
        <ProfileCard mine={athleteView} step={step} />
        <span className="x-wire hidden md:block" />
        <ReviewPanel step={step} className="order-last col-span-2 md:order-none md:col-span-1" />
        <span className="x-wire x-wire--rtl hidden md:block" />
        <BriefCard mine={!athleteView} step={step} />
      </div>

      <div className="grid grid-cols-4 border-t border-line">
        {steps.map((s, i) => (
          <Segment key={s.title} i={i} step={step} mode={mode} progress={progress} paused={paused} onRunEnd={onRunEnd} />
        ))}
      </div>
    </div>
  )
}

function Tick({ n }: { n: number }) {
  return (
    <span className="x-tick">
      <span style={{ '--n': n } as React.CSSProperties}>
        {steps.map((_, i) => (
          <span key={i}>{pad2(i + 1)}</span>
        ))}
      </span>
    </span>
  )
}

function Segment({ i, step, mode, progress, paused, onRunEnd }: { i: number } & Omit<ConsoleProps, 'view'>) {
  const scaleX = useTransform(progress, [i / steps.length, (i + 1) / steps.length], [0, 1])
  const running = mode === 'auto' && i === step

  return (
    <div className={cn('px-2.5 py-3 sm:px-4', i > 0 && 'border-l border-line')}>
      <div className="relative h-[2px] overflow-hidden bg-line">
        {mode === 'scroll' ? (
          <m.span className="absolute inset-0 origin-left bg-(--x-fill)" style={{ scaleX }} />
        ) : running ? (
          <span
            key={`run-${step}`}
            data-paused={paused || undefined}
            onAnimationEnd={(event) => {
              if (event.target === event.currentTarget) onRunEnd()
            }}
            className="x-run absolute inset-0 origin-left bg-(--x-fill)"
          />
        ) : (
          <m.span
            className="absolute inset-0 origin-left bg-(--x-fill)"
            initial={false}
            animate={{ scaleX: i <= step ? 1 : 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          />
        )}
      </div>
      <p className={cn('x-mono mt-2.5 truncate text-[0.625rem] sm:text-[0.6875rem]', i <= step ? 'text-ink' : 'text-smoke')}>
        <span className="text-smoke">{pad2(i + 1)}</span> {steps[i].title}
      </p>
    </div>
  )
}

function CardShell({ mine, tone, className, children }: { mine: boolean; tone: 'athlete' | 'agency'; className?: string; children: React.ReactNode }) {
  return (
    <div
      data-mine={mine || undefined}
      className={cn(
        'x-card relative flex min-w-0 flex-col rounded-[0.375rem] bg-chalk p-3 transition-shadow duration-500 sm:p-4',
        mine
          ? tone === 'athlete'
            ? 'shadow-[inset_0_0_0_1.5px_var(--color-flare),0_18px_36px_-24px_color-mix(in_srgb,var(--color-flare)_70%,transparent)]'
            : 'shadow-[inset_0_0_0_1.5px_var(--color-ultra),0_18px_36px_-24px_color-mix(in_srgb,var(--color-ultra)_70%,transparent)]'
          : 'shadow-[inset_0_0_0_1px_var(--color-line)]',
        className
      )}
    >
      {children}
    </div>
  )
}

function Fields({ labels, widths }: { labels: string[]; widths: string[] }) {
  return (
    <div className="mt-4 space-y-3">
      {labels.map((label, i) => (
        <div key={label}>
          <span className="x-mono block text-[0.625rem] text-smoke">{label}</span>
          <span className="x-skel mt-1.5" style={{ '--d': i, width: widths[i] } as React.CSSProperties} />
        </div>
      ))}
    </div>
  )
}

function CardFoot({ step, approvedLabel }: { step: number; approvedLabel: string }) {
  const label = step === 0 ? 'Received' : step === 1 ? 'In review' : step === 2 ? 'Proposed' : approvedLabel
  return (
    <div className="mt-auto flex items-center justify-between gap-2 border-t border-line pt-3">
      <span className={cn('x-mono text-[0.625rem]', step === 3 ? 'text-ink' : 'text-smoke')}>{label}</span>
      {step === 3 && (
        <span className="x-check-pop grid size-5 place-items-center rounded-full bg-ink text-chalk">
          <GlyphCheck className="size-3" />
        </span>
      )}
    </div>
  )
}

function OwnerTag({ mine, tone }: { mine: boolean; tone: 'athlete' | 'agency' }) {
  return (
    <span
      className={cn(
        'x-mono rounded-[3px] px-1.5 py-0.5 text-[0.625rem]',
        mine ? (tone === 'athlete' ? 'bg-flare text-ink' : 'bg-ultra text-white') : 'text-smoke shadow-[inset_0_0_0_1px_var(--color-line)]'
      )}
    >
      {mine ? 'You' : tone === 'athlete' ? 'Private' : 'Agency'}
    </span>
  )
}

function ProfileCard({ mine, step }: { mine: boolean; step: number }) {
  return (
    <CardShell mine={mine} tone="athlete" className="min-h-[17rem]">
      <div className="flex items-center justify-between gap-2">
        <span className="x-mono flex items-center gap-1.5 text-[0.625rem] sm:text-[0.6875rem]">
          <GlyphO className="size-2.5 text-flare-deep" strokeWidth={2.5} />
          Athlete
        </span>
        <OwnerTag mine={mine} tone="athlete" />
      </div>
      <p className="mt-3 text-[0.9375rem] leading-tight font-semibold tracking-[-0.03em] text-balance sm:text-[1.0625rem]">
        {mine ? `${sampleAthlete.name}, ${sampleAthlete.sport}` : 'From our private database.'}
      </p>
      <Fields labels={['Sport', 'School / team', 'Socials', 'Interests']} widths={['72%', '88%', '60%', '80%']} />
      <CardFoot step={step} approvedLabel="Athlete approves" />
    </CardShell>
  )
}

function BriefCard({ mine, step }: { mine: boolean; step: number }) {
  return (
    <CardShell mine={mine} tone="agency" className="min-h-[17rem]">
      <div className="flex items-center justify-between gap-2">
        <span className="x-mono flex items-center gap-1.5 text-[0.625rem] sm:text-[0.6875rem]">
          <GlyphX className="size-2.5 text-ultra" strokeWidth={2.5} />
          Brief
        </span>
        <OwnerTag mine={mine} tone="agency" />
      </div>
      <p className="mt-3 text-[0.9375rem] leading-tight font-semibold tracking-[-0.03em] text-balance sm:text-[1.0625rem]">
        {mine ? sampleBrief.title : 'A campaign brief.'}
      </p>
      <Fields labels={['Goal', 'Sports', 'Audience']} widths={['84%', '64%', '76%']} />
      <div className="mt-3 mb-4 flex flex-wrap gap-1">
        {['Reels', 'Posts', 'Events'].map((chip, i) => (
          <span
            key={chip}
            className={cn(
              'x-mono rounded-full px-1.5 py-0.5 text-[0.5625rem] sm:text-[0.625rem]',
              i === 0 ? 'bg-ink text-chalk' : 'text-smoke shadow-[inset_0_0_0_1px_var(--color-line)]'
            )}
          >
            {chip}
          </span>
        ))}
      </div>
      <CardFoot step={step} approvedLabel="Agency approves" />
    </CardShell>
  )
}

function ReviewPanel({ step, className }: { step: number; className?: string }) {
  return (
    <div className={cn('relative flex min-h-[15rem] flex-col rounded-[0.375rem] bg-ink p-4 text-chalk sm:p-5 md:min-h-0', className)}>
      <div className="flex items-center justify-between gap-2">
        <span className="x-mono text-[0.625rem] text-chalk/70 sm:text-[0.6875rem]">Our team</span>
        <span className="x-mono flex items-center gap-1.5 text-[0.625rem] text-chalk/70 sm:text-[0.6875rem] md:hidden xl:flex">
          <span className={cn('size-1.5 rounded-full', step === 3 ? 'bg-(--x-fill)' : 'bg-chalk/50')} />
          Human review
        </span>
      </div>
      <AnimatePresence mode="wait" initial={false}>
        <m.div
          key={step}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE } }}
          exit={{ opacity: 0, transition: { duration: 0.1 } }}
          className="mt-5 flex flex-1 flex-col"
        >
          {step === 0 && (
            <>
              <p className="text-xl leading-tight font-semibold tracking-[-0.03em]">Both forms received.</p>
              <ul className="mt-auto space-y-2 pt-6">
                {['Athlete profile', 'Campaign brief'].map((item) => (
                  <li key={item} className="flex items-center justify-between border-t border-chalk/15 pt-2">
                    <span className="text-sm">{item}</span>
                    <span className="x-mono text-[0.625rem] text-chalk/70">Received</span>
                  </li>
                ))}
              </ul>
            </>
          )}
          {step === 1 && (
            <>
              <p className="text-xl leading-tight font-semibold tracking-[-0.03em]">Reviewed by a person.</p>
              <ul className="mt-auto space-y-2.5 pt-6">
                {reviewChecks.map((check, i) => (
                  <li key={check} className="grid grid-cols-[4.5rem_1fr_1.25rem] items-center gap-3">
                    <span className="x-mono text-[0.625rem] text-chalk/70">{check}</span>
                    <span className="x-skel x-skel--ink" style={{ '--d': i } as React.CSSProperties} />
                    <span
                      className="x-check-pop grid size-5 place-items-center rounded-full bg-(--x-fill) text-(--x-on-fill)"
                      style={{ '--d': i } as React.CSSProperties}
                    >
                      <GlyphCheck className="size-3" />
                    </span>
                  </li>
                ))}
              </ul>
            </>
          )}
          {step === 2 && (
            <>
              <p className="text-xl leading-tight font-semibold tracking-[-0.03em]">Match proposed.</p>
              <div className="relative my-auto flex items-center justify-center gap-2 py-6 sm:gap-3">
                <GlyphO className="size-8 shrink-0 text-flare xl:size-10" strokeWidth={2} />
                <span className="h-px max-w-8 min-w-2 flex-1 bg-chalk/40" />
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-chalk xl:size-12">
                  <LogoMark className="size-5 xl:size-6" />
                </span>
                <span className="h-px max-w-8 min-w-2 flex-1 bg-chalk/40" />
                <GlyphX className="size-7 shrink-0 text-ultra-soft xl:size-9" strokeWidth={2} />
              </div>
              <p className="x-mono text-[0.625rem] text-chalk/70">Sport · Audience · Style</p>
            </>
          )}
          {step === 3 && (
            <>
              <p className="text-xl leading-tight font-semibold tracking-[-0.03em]">Both sides approve.</p>
              <ul className="mt-5 space-y-2">
                {['Athlete', 'Agency'].map((who, i) => (
                  <li key={who} className="flex items-center justify-between border-t border-chalk/15 pt-2">
                    <span className="text-sm">{who}</span>
                    <span className="x-check-pop flex items-center gap-1.5" style={{ '--d': i } as React.CSSProperties}>
                      <span className="x-mono text-[0.625rem] text-chalk/70">Approved</span>
                      <GlyphCheck className="size-3.5" />
                    </span>
                  </li>
                ))}
              </ul>
              <span className="x-check-pop x-mono mt-auto self-start rounded-[3px] bg-(--x-fill) px-2.5 py-1.5 text-(--x-on-fill) [--d:2]">
                Campaign live
              </span>
            </>
          )}
        </m.div>
      </AnimatePresence>
    </div>
  )
}
