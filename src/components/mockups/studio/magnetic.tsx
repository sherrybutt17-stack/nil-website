'use client'

import Link from 'next/link'
import { useMotionValue, useSpring, useTransform } from 'motion/react'
import * as m from 'motion/react-m'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { pointerEffectsAllowed } from './use-media'

/*
 * Magnetic pill buttons: the pill leans toward the pointer on a spring and its
 * label travels a little further, so the two read as separate layers. Pointer
 * effects only run for fine pointers without reduced motion; the markup is the
 * same for everyone.
 */

type Variant = 'ink' | 'flare' | 'ultra' | 'chalk' | 'ghost' | 'ghost-light'

const SPRING = { stiffness: 230, damping: 17, mass: 0.6 }
const MAX = 14

function useMagnet(strength: number) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, SPRING)
  const sy = useSpring(y, SPRING)
  const lx = useTransform(sx, (v) => v * 0.55)
  const ly = useTransform(sy, (v) => v * 0.55)

  const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType === 'touch' || !pointerEffectsAllowed()) return
    const r = e.currentTarget.getBoundingClientRect()
    const dx = e.clientX - (r.left + r.width / 2)
    const dy = e.clientY - (r.top + r.height / 2)
    x.set(Math.max(-MAX, Math.min(MAX, dx * strength)))
    y.set(Math.max(-MAX, Math.min(MAX, dy * strength)))
  }
  const onPointerLeave = () => {
    x.set(0)
    y.set(0)
  }
  return { style: { x: sx, y: sy }, labelStyle: { x: lx, y: ly }, onPointerMove, onPointerLeave }
}

type MagneticLinkProps = {
  href: string
  children: React.ReactNode
  variant?: Variant
  size?: 'md' | 'lg'
  arrow?: 'right' | 'up' | 'none'
  className?: string
  strength?: number
}

export function MagneticLink({
  href,
  children,
  variant = 'ink',
  size = 'md',
  arrow = 'right',
  className,
  strength = 0.32,
}: MagneticLinkProps) {
  const magnet = useMagnet(strength)
  const Icon = arrow === 'up' ? ArrowUpRight : ArrowRight
  return (
    <m.span className={cn('st-magnet', className)} style={magnet.style}>
      <Link
        href={href}
        data-cursor-stick=""
        className={cn('st-btn', `st-btn--${variant}`, size === 'lg' && 'st-btn--lg')}
        onPointerMove={magnet.onPointerMove}
        onPointerLeave={magnet.onPointerLeave}
      >
        <m.span className="st-btn__label" style={magnet.labelStyle}>
          {children}
          {arrow !== 'none' && (
            <span className="st-btn__arrow" aria-hidden="true">
              <Icon className="size-4" />
              <Icon className="size-4" />
            </span>
          )}
        </m.span>
      </Link>
    </m.span>
  )
}

/** Round magnetic control, e.g. reel arrows and "Back to top". */
export function MagneticButton({
  children,
  onClick,
  label,
  disabled,
  className,
  tone = 'ink',
}: {
  children: React.ReactNode
  onClick: () => void
  label: string
  disabled?: boolean
  className?: string
  tone?: 'ink' | 'chalk'
}) {
  const magnet = useMagnet(0.4)
  return (
    <m.span className={cn('st-magnet', className)} style={magnet.style}>
      <button
        type="button"
        aria-label={label}
        aria-disabled={disabled || undefined}
        data-cursor-stick=""
        onClick={() => {
          if (!disabled) onClick()
        }}
        onPointerMove={magnet.onPointerMove}
        onPointerLeave={magnet.onPointerLeave}
        className={cn('st-round', tone === 'chalk' && 'st-round--chalk')}
      >
        <m.span className="grid place-items-center" style={magnet.labelStyle}>
          {children}
        </m.span>
      </button>
    </m.span>
  )
}
