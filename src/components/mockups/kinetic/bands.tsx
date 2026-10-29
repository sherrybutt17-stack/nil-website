'use client'

import { Fragment, useRef, useState } from 'react'
import { Pause, Play } from 'lucide-react'
import { useAnimationFrame, useInView, useScroll, useVelocity } from 'motion/react'
import { cn } from '@/lib/utils'
import { useReducedMotionSafe } from './motion'
import { SlashMark } from './primitives'

type Row = { items: readonly string[]; tone: 'solid' | 'outline' | 'soft'; direction: 1 | -1; speed: number }

/**
 * Three bands of sport names running in opposite directions. They move only
 * while on screen, speed up and lean with the scroll (after Darkroom's
 * marquee), hold on hover or focus, and have a pause button. Still under
 * reduced motion. Decorative: the button is the only control.
 */
export function Bands({ sports }: { sports: readonly string[] }) {
  const third = Math.ceil(sports.length / 3)
  const rows: Row[] = [
    { items: sports.slice(0, third), tone: 'solid', direction: -1, speed: 0.05 },
    { items: sports.slice(third, third * 2), tone: 'outline', direction: 1, speed: 0.04 },
    { items: sports.slice(third * 2), tone: 'soft', direction: -1, speed: 0.06 },
  ]

  const [paused, setPaused] = useState(false)
  const root = useRef<HTMLDivElement>(null)
  const tracks = useRef<(HTMLDivElement | null)[]>([])
  const offsets = useRef(rows.map(() => 0))
  const skew = useRef(0)
  const held = useRef(false)
  const reduce = useReducedMotionSafe()
  const inView = useInView(root)
  const { scrollY } = useScroll()
  const velocity = useVelocity(scrollY)

  useAnimationFrame((_, delta) => {
    if (reduce || paused || held.current || !inView) return
    const v = velocity.get()
    const dt = Math.min(delta, 64)
    // Up to five times faster while scrolling; scrolling up reverses the drift.
    const boost = 1 + Math.min(Math.abs(v) / 500, 4)
    const sign = v < -40 ? -1 : 1
    // Ease the lean towards the scroll speed, so it settles smoothly at rest.
    skew.current += (Math.max(-7, Math.min(7, -v / 260)) - skew.current) * 0.12
    tracks.current.forEach((el, i) => {
      if (!el) return
      const row = rows[i]
      const loop = el.scrollWidth / 2
      let next = offsets.current[i] + row.direction * sign * row.speed * boost * dt
      if (next <= -loop) next += loop
      if (next > 0) next -= loop
      offsets.current[i] = next
      el.style.transform = `translate3d(${next}px, 0, 0) skewX(${skew.current.toFixed(2)}deg)`
    })
  })

  return (
    <div
      ref={root}
      className="k-bands relative"
      onPointerEnter={() => {
        held.current = true
      }}
      onPointerLeave={() => {
        held.current = false
      }}
      onFocus={() => {
        held.current = true
      }}
      onBlur={() => {
        held.current = false
      }}
    >
      <div aria-hidden="true" className="pt-3 pb-4 sm:pb-6">
        {rows.map((row, i) => (
          <div key={row.tone} className={cn('k-band k-display', `k-band--${row.tone}`, i === 0 && 'border-t-0')}>
            <div
              ref={(el) => {
                tracks.current[i] = el
              }}
              className="k-band__track py-[0.06em]"
              style={{ transform: `translate3d(${row.direction === 1 ? '-50%' : '0'}, 0, 0)` }}
            >
              {[0, 1].map((copy) => (
                <span key={copy} className="flex">
                  {row.items.map((item) => (
                    <Fragment key={item}>
                      {/* The word is CSS content (data-text), so it is decoration, not text. */}
                      <span className="k-band__item" data-text={item}>
                        <SlashMark className="k-band__mark" tone={row.tone === 'soft' ? 'flare' : row.tone === 'outline' ? 'ultra' : 'flare'} />
                      </span>
                    </Fragment>
                  ))}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        className="k-label absolute top-3 right-4 flex min-h-11 items-center gap-2 bg-ink px-3 text-chalk/85 transition-colors hover:text-chalk motion-reduce:hidden sm:right-6 lg:right-10"
      >
        {paused ? <Play className="size-3.5" aria-hidden="true" /> : <Pause className="size-3.5" aria-hidden="true" />}
        {paused ? 'Play motion' : 'Pause motion'}
      </button>
    </div>
  )
}
