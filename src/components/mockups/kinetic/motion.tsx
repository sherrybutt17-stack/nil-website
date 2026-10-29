'use client'

import { useCallback, useSyncExternalStore } from 'react'
import { useScroll, useSpring, useTransform, useVelocity } from 'motion/react'
import * as m from 'motion/react-m'
import { cn } from '@/lib/utils'

/** Media query that reads false on the server and until hydration, so both renders match. */
export function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query)
      mql.addEventListener('change', onChange)
      return () => mql.removeEventListener('change', onChange)
    },
    [query]
  )
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false
  )
}

export const useReducedMotionSafe = () => useMediaQuery('(prefers-reduced-motion: reduce)')

/** Skew that follows scroll speed (±max degrees) and springs back to 0 at rest. */
export function useVelocitySkew(max = 6) {
  const { scrollY } = useScroll()
  const velocity = useVelocity(scrollY)
  const raw = useTransform(velocity, [-2400, 0, 2400], [max, 0, -max], { clamp: true })
  return useSpring(raw, { stiffness: 260, damping: 32, mass: 0.6 })
}

/**
 * A hero line that slides sideways as the page scrolls away (alternating
 * directions) and leans with scroll speed. Static under reduced motion.
 */
export function HeroLine({ direction, children }: { direction: 1 | -1; children: React.ReactNode }) {
  const reduce = useReducedMotionSafe()
  const { scrollY } = useScroll()
  const x = useTransform(scrollY, [0, 900], ['0%', `${direction * 9}%`], { clamp: true })
  const skewX = useVelocitySkew(5)
  return (
    <m.span className="block will-change-transform" style={reduce ? undefined : { x, skewX }}>
      {children}
    </m.span>
  )
}

/** Leans its children with scroll speed. */
export function VelocitySkew({ children, className, max = 4 }: { children: React.ReactNode; className?: string; max?: number }) {
  const reduce = useReducedMotionSafe()
  const skewX = useVelocitySkew(max)
  return (
    <m.div className={cn('will-change-transform', className)} style={reduce ? undefined : { skewX }}>
      {children}
    </m.div>
  )
}
