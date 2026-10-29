'use client'

import { useEffect, useRef, useState } from 'react'
import {
  type MotionValue,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react'
import * as m from 'motion/react-m'
import type { Point } from '@/content/home'
import { cn } from '@/lib/utils'
import { pad } from './ui'

/*
 * "How it works" as a play being drawn up. On large screens the chapter pins:
 * scrolling pans across the four steps while the play draws itself alongside.
 * On smaller screens, and under reduced motion, it's a plain sequence and the
 * play draws as it scrolls past (or is shown complete).
 */

// Where each step holds while the chapter is pinned (fractions of its scroll).
const HOLDS = [
  [0, 0.16],
  [0.28, 0.41],
  [0.53, 0.66],
  [0.78, 1],
] as const

const useSegment = (progress: MotionValue<number>, from: number, to: number) =>
  useTransform(progress, [from, to], [0, 1], { clamp: true })

// A round-capped path still paints a dot at zero length, so hide it until it starts.
const useShown = (length: MotionValue<number>) => useTransform(length, (v) => (v > 0.002 ? 1 : 0))

function PlayDiagram({ progress, id, className }: { progress: MotionValue<number>; id: string; className?: string }) {
  const markers = useSegment(progress, 0, 0.06)
  const athleteRoutes = useSegment(progress, 0.03, 0.3)
  const agencyRoutes = useSegment(progress, 0.07, 0.34)
  const review = useSegment(progress, 0.28, 0.4)
  const match = useSegment(progress, 0.5, 0.63)
  const pair = useSegment(progress, 0.58, 0.66)
  const activate = useSegment(progress, 0.75, 0.9)
  const endzone = useSegment(progress, 0.86, 0.97)
  const athleteShown = useShown(athleteRoutes)
  const agencyShown = useShown(agencyRoutes)
  const matchShown = useShown(match)
  const activateShown = useShown(activate)

  return (
    <svg viewBox="0 0 560 600" role="img" aria-labelledby={id} className={cn('h-auto w-full font-sans', className)}>
      <title id={id}>
        Diagram: athletes and agencies sign up on opposite sides, meet at Real NIL Agency for review, are matched in pairs,
        then move together to activation.
      </title>

      {/* Field */}
      <rect x="1" y="1" width="558" height="598" rx="6" fill="none" className="stroke-chalk/20" strokeWidth="1.5" />
      {[100, 160, 220, 280, 340, 400, 460].map((y) => (
        <line key={y} x1="1" x2="559" y1={y} y2={y} className="stroke-chalk/[0.07]" strokeWidth="1.5" />
      ))}
      {[100, 160, 220, 280, 340, 400, 460].map((y) => (
        <path key={y} d={`M200 ${y - 5}v10M360 ${y - 5}v10`} className="stroke-chalk/20" strokeWidth="1.5" />
      ))}
      <rect x="1" y="520" width="558" height="79" className="fill-chalk/[0.04]" />
      <m.rect x="1" y="520" width="558" height="79" className="fill-flare/15" style={{ opacity: endzone }} />
      <text x="280" y="566" textAnchor="middle" className="fill-chalk text-[14px] font-extrabold tracking-[0.3em]">
        04 · ACTIVATE
      </text>

      <text x="28" y="48" className="fill-flare text-[12px] font-extrabold tracking-[0.28em]">
        01 · ATHLETES
      </text>
      <text x="532" y="48" textAnchor="end" className="fill-ultra-soft text-[12px] font-extrabold tracking-[0.28em]">
        AGENCIES · 01
      </text>

      {/* Routes */}
      {['M98 130 C 170 130, 206 196, 246 230', 'M82 250 L 240 250', 'M98 370 C 170 370, 206 304, 246 270'].map((d) => (
        <m.path key={d} d={d} fill="none" className="stroke-flare" strokeWidth="3.5" strokeLinecap="round" style={{ pathLength: athleteRoutes, opacity: athleteShown }} />
      ))}
      {['M470 150 C 400 150, 352 196, 314 230', 'M482 330 C 410 330, 352 300, 316 270'].map((d) => (
        <m.path key={d} d={d} fill="none" className="stroke-ultra-soft" strokeWidth="3.5" strokeLinecap="round" style={{ pathLength: agencyRoutes, opacity: agencyShown }} />
      ))}
      <m.path d="M270 290 C 270 330, 262 360, 262 388" fill="none" className="stroke-flare" strokeWidth="3.5" strokeLinecap="round" style={{ pathLength: match, opacity: matchShown }} />
      <m.path d="M290 290 C 290 330, 298 360, 298 388" fill="none" className="stroke-ultra-soft" strokeWidth="3.5" strokeLinecap="round" style={{ pathLength: match, opacity: matchShown }} />
      <m.path d="M280 430 L 280 502" fill="none" className="stroke-chalk" strokeWidth="4" strokeLinecap="round" style={{ pathLength: activate, opacity: activateShown }} />
      <m.path
        d="M268 490 L280 506 L292 490"
        fill="none"
        className="stroke-chalk"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ opacity: activate }}
      />

      {/* Athletes: O. Agencies: X. */}
      <m.g style={{ opacity: markers }}>
        {[
          [80, 130],
          [64, 250],
          [80, 370],
        ].map(([cx, cy]) => (
          <circle key={cy} cx={cx} cy={cy} r="16" fill="none" className="stroke-flare" strokeWidth="4" />
        ))}
        {[
          [486, 150],
          [498, 330],
        ].map(([x, y]) => (
          <path key={y} d={`M${x - 13} ${y - 13}L${x + 13} ${y + 13}M${x + 13} ${y - 13}L${x - 13} ${y + 13}`} className="stroke-ultra-soft" strokeWidth="4.5" strokeLinecap="round" />
        ))}
      </m.g>

      {/* Review hub */}
      <m.circle cx="280" cy="250" r="58" fill="none" className="stroke-chalk/40" strokeWidth="1.5" strokeDasharray="3 6" style={{ opacity: review }} />
      <circle cx="280" cy="250" r="38" className="fill-chalk" />
      <g transform="translate(262 232) scale(1.125)">
        <path d="M0 0h20L8 32H0z" className="fill-flare" />
        <path d="M24 0h8v32H12z" className="fill-ultra" />
      </g>
      <m.text x="280" y="176" textAnchor="middle" className="fill-chalk text-[12px] font-extrabold tracking-[0.28em]" style={{ opacity: review }}>
        02 · REVIEW
      </m.text>

      {/* The matched pair */}
      <m.g style={{ opacity: pair }}>
        <circle cx="262" cy="408" r="13" fill="none" className="stroke-flare" strokeWidth="3.5" />
        <path d="M288 398L308 418M308 398L288 418" className="stroke-ultra-soft" strokeWidth="4" strokeLinecap="round" />
        <text x="330" y="413" className="fill-chalk text-[12px] font-extrabold tracking-[0.28em]">
          03 · MATCH
        </text>
      </m.g>
    </svg>
  )
}

function StepCopy({ step, index }: { step: Point; index: number }) {
  return (
    <>
      <p className="fl-label text-chalk/60">
        Step {index + 1} of 4
      </p>
      <h3 className="display mt-4 text-[3.25rem] sm:text-[4.5rem] lg:text-[clamp(4rem,5.6vw,6.25rem)]">{step.title}</h3>
      <p className="mt-5 max-w-md text-lg leading-relaxed text-chalk/75 text-pretty">{step.body}</p>
    </>
  )
}

function PinnedChapter({ steps }: { steps: Point[] }) {
  const stage = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: stage, offset: ['start start', 'end end'] })
  const x = useTransform(
    scrollYProgress,
    HOLDS.flat(),
    ['0%', '0%', '-25%', '-25%', '-50%', '-50%', '-75%', '-75%']
  )
  const fills = [
    useSegment(scrollYProgress, 0, 0.22),
    useSegment(scrollYProgress, 0.22, 0.47),
    useSegment(scrollYProgress, 0.47, 0.72),
    useSegment(scrollYProgress, 0.72, 0.97),
  ]
  const [active, setActive] = useState(0)
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const next = v < 0.22 ? 0 : v < 0.47 ? 1 : v < 0.72 ? 2 : 3
    setActive((current) => (current === next ? current : next))
  })

  const goTo = (index: number) => {
    const el = stage.current
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY
    const distance = el.offsetHeight - window.innerHeight
    const [start, end] = HOLDS[index]
    window.scrollTo({ top: top + distance * ((start + end) / 2), behavior: 'smooth' })
  }

  return (
    <div ref={stage} className="relative hidden h-[460vh] lg:motion-safe:block">
      <div className="sticky top-0 flex h-svh flex-col overflow-hidden pt-[calc(var(--fl-h)+1.75rem)] pb-10">
        <div className="container-x flex min-h-0 flex-1 flex-col">
          {/* Progress rail */}
          <ol className="grid grid-cols-4 gap-3">
            {steps.map((step, i) => (
              <li key={step.title}>
                <button
                  type="button"
                  onClick={() => goTo(i)}
                  aria-current={active === i ? 'step' : undefined}
                  className={cn(
                    'group flex min-h-11 w-full flex-col justify-end gap-3 text-left transition-colors duration-500',
                    active === i ? 'text-chalk' : 'text-chalk/60 hover:text-chalk'
                  )}
                >
                  <span className="fl-label">
                    <span className={active === i ? 'text-flare' : undefined}>{pad(i + 1)}</span>
                    <span aria-hidden="true"> · </span>
                    {step.title}
                  </span>
                  <span className="relative block h-[2px] overflow-hidden bg-chalk/15">
                    <m.span className="absolute inset-0 origin-left bg-flare" style={{ scaleX: fills[i] }} />
                  </span>
                </button>
              </li>
            ))}
          </ol>

          <div className="mt-10 grid min-h-0 flex-1 grid-cols-12 gap-10">
            <div className="col-span-7 min-h-0 overflow-hidden">
              <m.ol style={{ x }} className="flex h-full w-[400%]">
                {steps.map((step, i) => (
                  <li key={step.title} data-active={active === i} className="fl-step flex h-full w-1/4 shrink-0 flex-col justify-between pr-14">
                    <span aria-hidden="true" className="fl-step__num numeral-outline text-[clamp(10rem,38vh,24rem)]">
                      {pad(i + 1)}
                    </span>
                    <div className="fl-step__copy">
                      <StepCopy step={step} index={i} />
                    </div>
                  </li>
                ))}
              </m.ol>
            </div>
            <div className="col-span-5 flex min-h-0 items-center justify-center">
              <PlayDiagram id="fl-play-pinned" progress={scrollYProgress} className="max-h-full w-auto max-w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function StackedChapter({ steps }: { steps: Point[] }) {
  const diagram = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: diagram, offset: ['start 85%', 'end 35%'] })
  // Starts undrawn like the server render, then follows the scroll (or shows complete).
  const progress = useMotionValue(0)
  useEffect(() => {
    progress.set(reduce ? 1 : scrollYProgress.get())
  }, [reduce, progress, scrollYProgress])
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (!reduce) progress.set(v)
  })

  return (
    <div className="container-x mt-16 grid gap-14 md:grid-cols-12 lg:motion-safe:hidden">
      <div ref={diagram} className="md:col-span-5 md:col-start-8 md:row-start-1">
        <div className="mx-auto max-w-[26rem] md:sticky md:top-24">
          <PlayDiagram id="fl-play-stacked" progress={progress} />
        </div>
      </div>
      <ol className="md:col-span-7 md:row-start-1">
        {steps.map((step, i) => (
          <li key={step.title} className="border-t border-chalk/10 py-10 first:border-t-0 first:pt-0">
            <span aria-hidden="true" className="numeral-outline block text-[7rem] text-flare sm:text-[9rem]">
              {pad(i + 1)}
            </span>
            <div className="mt-6">
              <StepCopy step={step} index={i} />
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

export function PlaybookChapter({ steps }: { steps: Point[] }) {
  return (
    <>
      <PinnedChapter steps={steps} />
      <StackedChapter steps={steps} />
    </>
  )
}
