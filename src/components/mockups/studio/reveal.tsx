'use client'

import { useRef } from 'react'
import { useInView } from 'motion/react'
import * as m from 'motion/react-m'
import { cn } from '@/lib/utils'

const EASE = [0.22, 1, 0.36, 1] as const

const lineVariants = {
  hidden: { y: '112%', rotate: 2.5 },
  shown: (i: number) => ({ y: '0%', rotate: 0, transition: { duration: 1, ease: EASE, delay: i * 0.085 } }),
}

/*
 * Masked line reveal (after Codrops' on-scroll typography, fx3): each line
 * rises out of its own clip with a slight lean, staggered. The untransformed
 * wrapper is what's observed (a fully clipped child never "intersects"), and
 * it hands the state down through variants. `data-reveal` lets the root
 * <noscript> rule show it without JS; MotionConfig's reducedMotion skips the movement.
 */
export function MaskLines({
  lines,
  className,
  lineClassName,
  delay = 0,
}: {
  lines: React.ReactNode[]
  className?: string
  lineClassName?: string
  delay?: number
}) {
  return (
    <m.span
      className={cn('block', className)}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
    >
      {lines.map((line, i) => (
        <span key={i} className={cn('st-mask', lineClassName)}>
          <m.span data-reveal="" className="block origin-[0%_100%]" variants={lineVariants} custom={i + delay / 0.085}>
            {line}
          </m.span>
          {i < lines.length - 1 && ' '}
        </span>
      ))}
    </m.span>
  )
}

/** Sets data-inview once the element is a third on screen, so CSS can run one-off effects (sheens, light leaks). */
export function InViewFlag({
  children,
  className,
  as: Tag = 'div',
  amount = 0.35,
}: {
  children: React.ReactNode
  className?: string
  as?: 'div' | 'span'
  amount?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount })
  return (
    <Tag ref={ref} className={className} data-inview={inView ? '' : undefined}>
      {children}
    </Tag>
  )
}

/** Hairline that draws across from the left when it enters view. */
export function Rule({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <m.span
      aria-hidden="true"
      className={cn('block h-px', className)}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
    >
      <m.span
        data-reveal=""
        className="block h-full origin-left bg-current opacity-20"
        variants={{ hidden: { scaleX: 0 }, shown: { scaleX: 1, transition: { duration: 1.2, ease: EASE, delay } } }}
      />
    </m.span>
  )
}
