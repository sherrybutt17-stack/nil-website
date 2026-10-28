'use client'

import * as m from 'motion/react-m'

const EASE = [0.22, 1, 0.36, 1] as const

type RevealProps = {
  children: React.ReactNode
  className?: string
  delay?: number
  /** Distance in px the element rises while fading in. */
  y?: number
}

/**
 * Fades content up into view once. Use below the fold only — hero content
 * must render visible without JS so it never delays LCP.
 * `data-reveal` lets the <noscript> rule in the root layout show it without JS.
 */
export function Reveal({ children, className, delay = 0, y = 18 }: RevealProps) {
  return (
    <m.div
      data-reveal=""
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </m.div>
  )
}
