'use client'

import { Fragment, useRef, useState } from 'react'
import { Pause, Play } from 'lucide-react'
import { useAnimationFrame, useInView, useReducedMotion, useScroll, useVelocity } from 'motion/react'
import * as m from 'motion/react-m'
import { cn } from '@/lib/utils'
import { EASE } from './motion'
import { pad } from './ui'

/**
 * Sports on a stadium LED ribbon. The text slides behind a fixed grid of
 * pixels, like a real board. It only runs while on screen, picks up speed with
 * the scroll, pauses on hover, focus or the button, and is still under reduced
 * motion. Decorative: the button is the only control.
 */
export function LedRibbon({ items }: { items: readonly string[] }) {
  const [paused, setPaused] = useState(false)
  const root = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const offset = useRef(0)
  const held = useRef(false)
  const reduce = useReducedMotion()
  const inView = useInView(root)
  const { scrollY } = useScroll()
  const velocity = useVelocity(scrollY)

  useAnimationFrame((_, delta) => {
    const el = track.current
    if (!el || reduce || paused || held.current || !inView) return
    const loop = el.scrollWidth / 2
    // About 40 px a second at rest, up to five times that while scrolling fast.
    const boost = 1 + Math.min(Math.abs(velocity.get()) / 600, 4)
    offset.current = (offset.current - 0.04 * boost * Math.min(delta, 64)) % loop
    el.style.transform = `translate3d(${offset.current}px, 0, 0)`
  })

  return (
    <div
      ref={root}
      className="fl-led flex items-stretch"
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
      <div aria-hidden="true" className="fl-led__window flex-1 py-4 sm:py-5">
        <div ref={track} className="flex w-max will-change-transform">
          {[0, 1].map((copy) => (
            <span key={copy} className="flex items-center gap-8 pr-8 text-flare sm:gap-10 sm:pr-10">
              {items.map((item) => (
                <Fragment key={item}>
                  <span className="text-[1.75rem] leading-none font-extrabold tracking-[0.06em] whitespace-nowrap uppercase [font-stretch:112%] sm:text-[2.5rem]">
                    {item}
                  </span>
                  <span className="fl-led__sep shrink-0 text-[1.25rem]" />
                </Fragment>
              ))}
            </span>
          ))}
        </div>
      </div>
      <button
        type="button"
        aria-pressed={paused}
        onClick={() => setPaused((p) => !p)}
        className="relative z-10 grid w-14 shrink-0 place-items-center border-l border-chalk/10 text-chalk/80 transition-colors hover:text-chalk motion-reduce:hidden sm:w-16"
      >
        {paused ? <Play className="size-4" aria-hidden="true" /> : <Pause className="size-4" aria-hidden="true" />}
        <span className="sr-only">Pause the sports ticker</span>
      </button>
    </div>
  )
}

/**
 * A panel lit by a spotlight that follows the mouse (rAF-throttled, mouse only),
 * with a glint running round its edge on hover and focus.
 */
export function SpotPanel({
  tone,
  className,
  children,
}: {
  tone: 'flare' | 'ultra'
  className?: string
  children: React.ReactNode
}) {
  const spot = useRef<HTMLSpanElement>(null)
  const frame = useRef(0)

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse') return
    const rect = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    cancelAnimationFrame(frame.current)
    frame.current = requestAnimationFrame(() => {
      if (spot.current) spot.current.style.transform = `translate3d(${x}px, ${y}px, 0)`
    })
  }

  return (
    <div onPointerMove={onPointerMove} className={cn('fl-panel', `fl-panel--${tone}`, className)}>
      <span ref={spot} aria-hidden="true" className="fl-panel__spot" />
      <span aria-hidden="true" className="fl-glint" />
      {children}
    </div>
  )
}

/** A broadcast lower third: numbered tab, then the title bar wiping in behind it. */
export function LowerThird({ index, title }: { index: number; title: string }) {
  return (
    <m.div
      className="flex items-stretch"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
    >
      <m.span
        aria-hidden="true"
        data-reveal=""
        className="fl-label grid w-14 shrink-0 origin-left place-items-center bg-ultra text-[0.8125rem] text-white"
        variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.6, ease: EASE } } }}
      >
        {pad(index)}
      </m.span>
      <div className="min-w-0 overflow-hidden">
        <m.div
          data-reveal=""
          className="h-full bg-chalk px-4 py-2.5 text-ink"
          variants={{ hidden: { x: '-101%' }, show: { x: '0%', transition: { duration: 0.8, ease: EASE, delay: 0.25 } } }}
        >
          <h3 className="display text-[1.9rem] sm:text-[2.2rem]">{title}</h3>
        </m.div>
      </div>
    </m.div>
  )
}
