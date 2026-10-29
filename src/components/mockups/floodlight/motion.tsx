'use client'

import { useEffect, useRef, useState } from 'react'
import { useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'motion/react'
import * as m from 'motion/react-m'
import { cn } from '@/lib/utils'

export const EASE = [0.22, 1, 0.36, 1] as const

/**
 * A chapter that holds still once its end reaches the bottom of the screen,
 * while the next chapter slides up over it. As it's covered it dims and sinks
 * slightly, like a film cut. The following content must be positioned and
 * opaque. Off under reduced motion: chapters simply stack.
 *
 * Its containing block (the parent) decides how long it holds, so wrap it with
 * the content that should cover it. Focusing something inside while it's
 * covered scrolls back to where it's fully visible, so focus is never hidden.
 */
export function Fold({ children, depth = 0.6 }: { children: React.ReactNode; depth?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const shadeRef = useRef<HTMLDivElement>(null)
  const range = useRef({ start: 0, span: 1, vh: 1 })
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  const shade = useMotionValue(0)
  const sink = useMotionValue(0)

  useEffect(() => {
    const el = ref.current
    if (!el || reduce) return
    const measure = () => {
      delete el.dataset.fold
      const top = el.getBoundingClientRect().top + window.scrollY
      const height = el.offsetHeight
      const vh = window.innerHeight
      el.style.top = `${Math.min(0, vh - height)}px`
      el.dataset.fold = ''
      // It's covered between the next chapter entering at the bottom and reaching the top.
      range.current = { start: top + height - vh, span: vh, vh }
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    window.addEventListener('resize', measure)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', measure)
      delete el.dataset.fold
      el.style.top = ''
    }
  }, [reduce])

  useMotionValueEvent(scrollY, 'change', (y) => {
    if (reduce) return
    const { start, span, vh } = range.current
    const progress = Math.min(1, Math.max(0, (y - start) / span))
    shade.set(progress * depth)
    sink.set(progress * vh * 0.05)
    if (shadeRef.current) shadeRef.current.style.visibility = progress > 0 ? 'visible' : 'hidden'
  })

  const onFocus = () => {
    if (!reduce && window.scrollY > range.current.start + 1) window.scrollTo({ top: range.current.start })
  }

  return (
    <div ref={ref} onFocus={onFocus} className="fl-fold">
      <m.div style={{ y: sink }}>{children}</m.div>
      <m.div ref={shadeRef} aria-hidden="true" className="invisible pointer-events-none absolute inset-0 z-20 bg-ink" style={{ opacity: shade }} />
    </div>
  )
}

/** Sticky header that stays clear over the hero and turns solid once the page scrolls. */
export function HeaderFrame({ children }: { children: React.ReactNode }) {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 24))

  return (
    <header className="fl-header" data-scrolled={scrolled || undefined}>
      {children}
    </header>
  )
}

/**
 * The hero headline. Its entrance and light sweep are CSS, so it is visible
 * without JS; scrolling away eases it back and dims it (not under reduced motion).
 */
export function HeroTitle({ id, lines, className }: { id: string; lines: string[]; className?: string }) {
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  const scale = useTransform(scrollY, [0, 720], [1, 0.93])
  const y = useTransform(scrollY, [0, 720], [0, -70])
  const opacity = useTransform(scrollY, [0, 640], [1, 0.25])

  return (
    // Plain resting values under reduced motion render the same markup as the server.
    <m.div style={reduce ? { scale: 1, y: 0, opacity: 1 } : { scale, y, opacity }} className="origin-bottom-left">
      <h1 id={id} className={cn('fl-hero-title display', className)}>
        {lines.map((line, i) => {
          const words = line.split(' ')
          const last = words.pop()
          const isLast = i === lines.length - 1
          return (
            <span key={line} className={cn('fl-mask', i === 1 && 'md:pl-[12%]', i === 2 && 'md:pl-[24%]')}>
              <span className="fl-hero-rise" style={{ '--i': i } as React.CSSProperties}>
                <span className="fl-sheen block" data-text={line} style={{ '--i': i } as React.CSSProperties}>
                  {words.join(' ')} <span className={isLast ? 'text-flare' : undefined}>{last}</span>
                </span>
              </span>
            </span>
          )
        })}
      </h1>
    </m.div>
  )
}

const lineVariants = {
  hidden: { y: '108%' },
  show: (i: number) => ({ y: '0%', transition: { duration: 1, ease: EASE, delay: i * 0.09 } }),
}

/** A display heading whose lines rise out of their masks the first time it scrolls into view. */
export function RevealHeading({
  id,
  lines,
  className,
}: {
  id: string
  lines: React.ReactNode[]
  className?: string
}) {
  return (
    <m.h2
      id={id}
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
    >
      {lines.map((line, i) => (
        <span key={i} className="fl-mask">
          <m.span className="block" data-reveal="" custom={i} variants={lineVariants}>
            {line}
          </m.span>
        </span>
      ))}
    </m.h2>
  )
}

/** Fade-and-rise for blocks below the fold. */
export function Rise({
  children,
  className,
  delay = 0,
  as = 'div',
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  as?: 'div' | 'li'
}) {
  const Comp = as === 'li' ? m.li : m.div
  return (
    <Comp
      data-reveal=""
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.85, ease: EASE, delay }}
    >
      {children}
    </Comp>
  )
}
