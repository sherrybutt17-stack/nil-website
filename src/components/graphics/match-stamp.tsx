'use client'

import { useReducedMotion, useScroll, useTransform } from 'motion/react'
import * as m from 'motion/react-m'
import { cn } from '@/lib/utils'
import { LogoMark } from '@/components/graphics/logo'

/** Circular "matched by people" stamp. Turns with page scroll; still under reduced motion. */
export function MatchStamp({ className }: { className?: string }) {
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  const rotate = useTransform(scrollY, [0, 1200], [0, 140])

  return (
    <div aria-hidden="true" className={cn('relative grid size-32 place-items-center sm:size-36', className)}>
      <m.svg viewBox="0 0 120 120" className="absolute inset-0 size-full" style={reduce ? undefined : { rotate }}>
        <defs>
          <path id="stamp-circle" d="M60 60m-46 0a46 46 0 1 1 92 0a46 46 0 1 1-92 0" />
        </defs>
        <circle cx="60" cy="60" r="58" className="fill-chalk" />
        <circle cx="60" cy="60" r="56" fill="none" className="stroke-ink" strokeWidth="1.5" />
        <text className="fill-ink" fontSize="10.5" fontWeight="800" letterSpacing="2.6">
          <textPath href="#stamp-circle">MATCHED BY PEOPLE • REVIEWED BY HAND •</textPath>
        </text>
      </m.svg>
      <span className="relative grid size-14 place-items-center rounded-full bg-ink">
        <LogoMark className="size-7" />
      </span>
    </div>
  )
}
