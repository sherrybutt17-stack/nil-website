'use client'

import { Fragment, useRef } from 'react'
import { useReducedMotion, useScroll, useTransform } from 'motion/react'
import * as m from 'motion/react-m'
import { LogoMark } from '@/components/graphics/logo'

const words = ['Student athletes', 'Sports creators', 'Agencies', 'Brand campaigns', 'Instagram Reels', 'Human review']

/**
 * Oversized words that drift sideways as the page scrolls (never on their own),
 * and stay still under reduced motion. Decorative: the same ideas are in the copy.
 */
export function CategoryStrip() {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-22%'])

  return (
    <div ref={ref} aria-hidden="true" className="overflow-hidden border-y-2 border-ink bg-chalk py-5 sm:py-7">
      <m.div className="flex w-max items-center gap-6 whitespace-nowrap sm:gap-10" style={reduce ? undefined : { x }}>
        {[...words, ...words].map((word, i) => (
          <Fragment key={i}>
            <span
              className={
                i % 2 === 0
                  ? 'display text-5xl sm:text-7xl lg:text-8xl'
                  : 'numeral-outline text-5xl uppercase sm:text-7xl lg:text-8xl'
              }
            >
              {word}
            </span>
            <LogoMark className="size-7 shrink-0 sm:size-10" />
          </Fragment>
        ))}
      </m.div>
    </div>
  )
}
