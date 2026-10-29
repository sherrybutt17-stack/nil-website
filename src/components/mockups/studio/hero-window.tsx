'use client'

import { useEffect, useRef } from 'react'
import { useMotionValue, useScroll, useSpring, useTransform } from 'motion/react'
import * as m from 'motion/react-m'
import { cn } from '@/lib/utils'
import { pointerEffectsAllowed, useReducedMotionSafe } from './use-media'

const pattern = ['st-frame--flare', 'st-frame--paper', 'st-frame--ultra', 'st-frame--paper', 'st-frame--ink-raised'] as const
// Enough frames to overfill the widest window, including the cursor pan.
const tones = Array.from({ length: 20 }, (_, i) => pattern[i % pattern.length])

/*
 * A strip of 9:16 frames set into the last line of the headline, so the type
 * and the content it promises share one line. It pans against the cursor
 * anywhere in the hero and drifts as the hero scrolls away. Decorative.
 */
export function HeroWindow() {
  const ref = useRef<HTMLSpanElement>(null)
  const reduced = useReducedMotionSafe()
  const { scrollY } = useScroll()
  const pan = useMotionValue(0)
  const panSpring = useSpring(pan, { stiffness: 90, damping: 20, mass: 0.8 })
  const x = useTransform([scrollY, panSpring], ([sy, p]: number[]) => `${Math.min(sy, 900) * -0.035 + p}%`)

  useEffect(() => {
    const hero = ref.current?.closest('section')
    if (!hero) return
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch' || !pointerEffectsAllowed()) return
      const r = hero.getBoundingClientRect()
      pan.set(-((e.clientX - r.left) / r.width - 0.5) * 22 - 8)
    }
    const onLeave = () => pan.set(0)
    hero.addEventListener('pointermove', onMove)
    hero.addEventListener('pointerleave', onLeave)
    return () => {
      hero.removeEventListener('pointermove', onMove)
      hero.removeEventListener('pointerleave', onLeave)
    }
  }, [pan])

  return (
    <span ref={ref} aria-hidden="true" className="st-window st-sheen" data-cursor-text="Formats" data-cursor-tone="chalk">
      <m.span className="st-window__track" style={{ x: reduced ? 0 : x }}>
        {tones.map((tone, i) => (
          <span key={i} className={cn('st-wframe', tone)} style={{ '--i': i } as React.CSSProperties}>
            <Glyph index={i} />
          </span>
        ))}
      </m.span>
    </span>
  )
}

/** Play button, profile card, and a rising route: a vertical video, a creator, a campaign. */
function Glyph({ index }: { index: number }) {
  const variant = index % 3
  return (
    <svg viewBox="0 0 80 80">
      {variant === 0 && (
        <>
          <circle cx="40" cy="40" r="24" fill="none" stroke="currentColor" strokeWidth="2.5" />
          <path d="M35 30 L52 40 L35 50 Z" fill="currentColor" />
        </>
      )}
      {variant === 1 && (
        <>
          <rect x="18" y="14" width="44" height="52" rx="6" fill="none" stroke="currentColor" strokeWidth="2.5" />
          <path d="M26 54 H54 M26 46 H46" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="40" cy="30" r="7" fill="none" stroke="currentColor" strokeWidth="2.5" />
        </>
      )}
      {variant === 2 && (
        <>
          <path d="M14 58 C 28 58, 30 22, 40 22 S 52 58, 66 58" fill="none" stroke="currentColor" strokeWidth="2.5" />
          <circle cx="40" cy="22" r="5" fill="currentColor" />
        </>
      )}
    </svg>
  )
}
