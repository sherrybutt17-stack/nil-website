'use client'

import { useEffect, useRef, useState } from 'react'
import { RotateCcw, RotateCw } from 'lucide-react'
import { cn } from '@/lib/utils'
import { HoloTilt } from './holo'
import { Slab } from './primitives'

type FlipSlabProps = {
  tone: 'flare' | 'ultra'
  /** Slab label, e.g. "Athlete card". */
  title: string
  /** Who this side is for, used in the buttons' accessible names. */
  audience: string
  front: React.ReactNode
  back: React.ReactNode
  className?: string
}

/**
 * A slabbed card that tilts under the pointer and flips to show its back. Both
 * faces share one grid cell, so the slab is as tall as the taller face. The face
 * not on show is inert, and focus follows the flip to the other face's button.
 */
export function FlipSlab({ tone, title, audience, front, back, className }: FlipSlabProps) {
  const [flipped, setFlipped] = useState(false)
  const frontButton = useRef<HTMLButtonElement>(null)
  const backButton = useRef<HTMLButtonElement>(null)
  const userFlipped = useRef(false)

  useEffect(() => {
    if (!userFlipped.current) return
    const target = flipped ? backButton.current : frontButton.current
    target?.focus({ preventScroll: true })
  }, [flipped])

  const flip = (next: boolean) => {
    userFlipped.current = true
    setFlipped(next)
  }

  const card = (children: React.ReactNode) => (
    <div className={cn('rk-card flex flex-1 flex-col aspect-auto p-[clamp(1.25rem,6cqi,2rem)] @container', `rk-card--${tone}`)}>
      <span aria-hidden="true" className="rk-card__frame" />
      <span aria-hidden="true" className="rk-glare" />
      <div className="relative z-[3] flex flex-1 flex-col">{children}</div>
    </div>
  )

  return (
    <HoloTilt max={5} className={cn('rounded-[var(--rk-r-slab)]', className)}>
      <div className="rk-flip" data-flipped={flipped ? '' : undefined}>
        <div className="rk-flip__inner">
          <div className="rk-flip__face flex" inert={flipped}>
            <Slab title={title} status="Front" className="w-full">
              {card(
                <>
                  {front}
                  <div className="mt-auto pt-8">
                    <button
                      ref={frontButton}
                      type="button"
                      onClick={() => flip(true)}
                      className={cn('rk-btn min-h-11 px-4', tone === 'flare' ? 'rk-btn--ink' : 'rk-btn--chalk')}
                    >
                      <RotateCw className="size-4" aria-hidden="true" />
                      Show the steps<span className="sr-only"> for {audience}</span>
                    </button>
                  </div>
                </>
              )}
            </Slab>
          </div>
          <div className="rk-flip__face rk-flip__face--back flex" inert={!flipped}>
            <Slab title={title} status="Reverse" className="w-full" sweep={false}>
              {card(
                <>
                  {back}
                  <div className="pt-5">
                    <button
                      ref={backButton}
                      type="button"
                      onClick={() => flip(false)}
                      className="rk-label inline-flex min-h-11 items-center gap-2 rounded-[0.5rem] px-1 underline-offset-4 hover:underline"
                    >
                      <RotateCcw className="size-4" aria-hidden="true" />
                      Back to the front<span className="sr-only"> of the {audience} card</span>
                    </button>
                  </div>
                </>
              )}
            </Slab>
          </div>
        </div>
      </div>
    </HoloTilt>
  )
}
