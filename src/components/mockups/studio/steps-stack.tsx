'use client'

import { useRef } from 'react'
import { useScroll, useTransform, type MotionValue } from 'motion/react'
import * as m from 'motion/react-m'
import { playbook } from '@/content/home'
import { cn } from '@/lib/utils'
import { MaskLines } from './reveal'
import { useReducedMotionSafe } from './use-media'

const surfaces = ['st-card--paper', 'st-card--ink', 'st-card--paper', 'st-card--flare'] as const

/** The four playbook steps as cards that stack as you scroll; covered cards shrink back and dim. */
export function StepsStack() {
  const listRef = useRef<HTMLOListElement>(null)
  const reduced = useReducedMotionSafe()
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start start', 'end end'] })
  const total = playbook.steps.length

  return (
    <section aria-labelledby="st-how-title" className="st-section">
      <div className="st-wrap grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <p className="st-label">
              <span className="tabular-nums">(04)</span> {playbook.eyebrow}
            </p>
            <h2 id="st-how-title" className="st-h2 mt-8">
              <MaskLines lines={['Every match is', 'drawn up', <em key="h" className="st-accent">by hand.</em>]} />
            </h2>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-pretty text-ink/75">{playbook.intro}</p>
            <p className="st-note mt-10 max-w-md">{playbook.timingNote}</p>
          </div>
        </div>

        <ol ref={listRef} className="st-stack lg:col-span-7">
          {playbook.steps.map((step, i) => (
            <StepCard key={step.title} index={i} total={total} progress={scrollYProgress} reduced={reduced} surface={surfaces[i]}>
              <div className="flex items-start justify-between gap-6">
                <span className="st-label tabular-nums">Step {String(i + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
                <StepGlyph index={i} />
              </div>
              <div className="mt-auto">
                <h3 className="st-card__title">{step.title}</h3>
                <p className="mt-4 max-w-md text-base leading-relaxed text-pretty opacity-80 sm:text-lg">{step.body}</p>
              </div>
            </StepCard>
          ))}
        </ol>
      </div>
    </section>
  )
}

function StepCard({
  index,
  total,
  progress,
  reduced,
  surface,
  children,
}: {
  index: number
  total: number
  progress: MotionValue<number>
  reduced: boolean
  surface: string
  children: React.ReactNode
}) {
  const start = index / total
  const target = 1 - (total - 1 - index) * 0.045
  const scale = useTransform(progress, [start, 1], [1, target])
  const shade = useTransform(progress, [start, Math.min(1, start + 1 / total)], [0, index < total - 1 ? 0.28 : 0])

  return (
    <li className="st-stack__item" style={{ '--i': index } as React.CSSProperties}>
      <m.article
        className={cn('st-card', surface)}
        data-cursor-tone={surface === 'st-card--ink' ? 'chalk' : 'ink'}
        style={reduced ? undefined : { scale }}
      >
        {children}
        <m.span aria-hidden="true" className="st-card__shade" style={{ opacity: reduced ? 0 : shade }} />
      </m.article>
    </li>
  )
}

/** One small diagram per step: two marks arriving, a look, a line between them, a shared mark. */
function StepGlyph({ index }: { index: number }) {
  return (
    <svg viewBox="0 0 96 48" aria-hidden="true" className="h-10 w-20 shrink-0 sm:h-12 sm:w-24">
      <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        {index === 0 && (
          <>
            <circle cx="20" cy="24" r="9" />
            <path d="M70 15 l18 18 M88 15 l-18 18" />
          </>
        )}
        {index === 1 && (
          <>
            <circle cx="20" cy="24" r="9" />
            <path d="M70 15 l18 18 M88 15 l-18 18" />
            <circle cx="48" cy="24" r="5" fill="currentColor" />
          </>
        )}
        {index === 2 && (
          <>
            <circle cx="20" cy="24" r="9" />
            <path d="M70 15 l18 18 M88 15 l-18 18" />
            <path d="M31 24 H67" strokeDasharray="3 5" />
          </>
        )}
        {index === 3 && (
          <>
            <circle cx="48" cy="24" r="16" />
            <path d="M40 16 l16 16 M56 16 l-16 16" />
          </>
        )}
      </g>
    </svg>
  )
}
