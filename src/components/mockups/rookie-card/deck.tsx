'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useScroll, useTransform, type MotionValue } from 'motion/react'
import * as m from 'motion/react-m'
import type { Point } from '@/content/home'
import { cn } from '@/lib/utils'
import { StepCardFace } from './cards'
import { HoloTilt } from './holo'
import { useMediaQuery, useMotionAllowed } from './hooks'
import { Label } from './primitives'

/*
 * The playbook as a deck of four cards.
 * - Desktop with motion: the cards start stacked in the middle of a sticky stage
 *   and are dealt into a row as you scroll (rookie-card.css makes the track tall).
 * - Smaller screens: a scroll-snap row with Prev/Next buttons.
 * - Reduced motion or no JS: the cards simply sit in their row.
 * Server and first client render are identical; transforms start after hydration.
 */

const STACK_ROT = [-4, 3, -7, 6]
const STACK_Y = [0, 8, 16, 24]
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)

function DealtCard({
  progress,
  index,
  enabled,
  children,
}: {
  progress: MotionValue<number>
  index: number
  enabled: boolean
  children: React.ReactNode
}) {
  const start = 0.06 + index * 0.13
  const dealt = useTransform(progress, [start, start + 0.3], [0, 1], { clamp: true })
  // Offset from this card's slot to the middle of the row, in card widths (gap included).
  const toCenter = (1.5 - index) * 108
  const x = useTransform(dealt, (v) => `${(1 - easeOut(v)) * toCenter}%`)
  const y = useTransform(dealt, (v) => (1 - easeOut(v)) * STACK_Y[index] - Math.sin(v * Math.PI) * 34)
  const rotate = useTransform(dealt, (v) => (1 - easeOut(v)) * STACK_ROT[index] + Math.sin(v * Math.PI) * (index % 2 ? 5 : -5))

  return (
    <m.li
      className="relative w-[min(78%,19rem)] shrink-0 snap-start md:w-[44%] lg:w-auto"
      style={enabled ? { x, y, rotate, zIndex: 4 - index } : undefined}
    >
      {children}
    </m.li>
  )
}

export function Deck({ steps, labelledBy }: { steps: Point[]; labelledBy: string }) {
  const track = useRef<HTMLDivElement>(null)
  const list = useRef<HTMLOListElement>(null)
  const desktop = useMediaQuery('(min-width: 64rem)')
  const allowed = useMotionAllowed()
  const enabled = desktop && allowed
  const [current, setCurrent] = useState(0)

  const { scrollYProgress } = useScroll({ target: track, offset: ['start start', 'end end'] })

  const syncIndex = useCallback(() => {
    const el = list.current
    if (!el) return
    const items = Array.from(el.children) as HTMLElement[]
    const origin = items[0].offsetLeft
    const distance = (item: HTMLElement) => Math.abs(item.offsetLeft - origin - el.scrollLeft)
    let nearest = 0
    items.forEach((item, i) => {
      if (distance(item) < distance(items[nearest])) nearest = i
    })
    setCurrent(nearest)
  }, [])

  useEffect(() => {
    const el = list.current
    if (!el || desktop) return
    el.addEventListener('scroll', syncIndex, { passive: true })
    return () => el.removeEventListener('scroll', syncIndex)
  }, [desktop, syncIndex])

  const go = (delta: number) => {
    const el = list.current
    if (!el) return
    const items = Array.from(el.children) as HTMLElement[]
    const next = Math.min(items.length - 1, Math.max(0, current + delta))
    el.scrollTo({ left: items[next].offsetLeft - items[0].offsetLeft, behavior: allowed ? 'smooth' : 'auto' })
    setCurrent(next)
  }

  return (
    <div ref={track} className="rk-deck__track relative">
      <div className="rk-deck__stage">
        <div className="w-full">
          <div className="container-x mb-6 hidden items-center justify-between lg:motion-safe:flex">
            <Label className="text-smoke">The deck · scroll to deal</Label>
            <Label className="text-smoke tabular-nums">04 cards</Label>
          </div>
          <ol
            ref={list}
            aria-labelledby={labelledBy}
            tabIndex={desktop ? undefined : 0}
            className="rk-deck__list container-x relative flex snap-x snap-mandatory gap-4 overflow-x-auto pt-4 pb-6 [--rk-deck-pad:1rem] sm:[--rk-deck-pad:1.5rem] lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-visible lg:pb-0"
          >
            {steps.map((step, i) => (
              <DealtCard key={step.title} progress={scrollYProgress} index={i} enabled={enabled}>
                <HoloTilt max={7} className="rounded-[var(--rk-r-card)]">
                  <StepCardFace index={i} total={steps.length} title={step.title} body={step.body} className="shadow-[var(--rk-shadow)]" />
                </HoloTilt>
              </DealtCard>
            ))}
          </ol>
          <div className="container-x mt-2 flex items-center justify-between gap-4 lg:hidden">
            <Label className="text-smoke tabular-nums">
              Card {String(current + 1).padStart(2, '0')} of {String(steps.length).padStart(2, '0')}
            </Label>
            <div className="flex gap-2">
              {[
                { delta: -1, label: 'Previous card', icon: ArrowLeft, disabled: current === 0 },
                { delta: 1, label: 'Next card', icon: ArrowRight, disabled: current === steps.length - 1 },
              ].map(({ delta, label, icon: Icon, disabled }) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => go(delta)}
                  disabled={disabled}
                  className={cn(
                    'grid size-11 place-items-center rounded-[0.5rem] shadow-[inset_0_0_0_1.5px_color-mix(in_oklab,var(--color-ink)_28%,transparent)] transition-[box-shadow,opacity] hover:shadow-[inset_0_0_0_1.5px_var(--color-ink)] disabled:opacity-40'
                  )}
                >
                  <Icon className="size-4" aria-hidden="true" />
                  <span className="sr-only">{label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
