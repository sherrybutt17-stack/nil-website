'use client'

import { useEffect, useRef } from 'react'
import { useSpring } from 'motion/react'
import { cn } from '@/lib/utils'
import { useMotionAllowed } from './hooks'

/*
 * Pointer-driven holographic tilt. The pointer's position over the element
 * feeds springs, and the springs write CSS variables once per frame:
 *   --rk-rx / --rk-ry   tilt (up to `max` degrees)
 *   --rk-px / --rk-py   where the glare sits
 *   --rk-bx / --rk-by   foil position, mapped into a narrow band so it drifts subtly
 *   --rk-glow           0 at rest, 1 while interacting
 * rookie-card.css turns those into the transform, foil and glare. Fine pointers
 * tilt on hover; touch tilts while dragging. Nothing moves under reduced motion,
 * and the markup is identical on server and client.
 */

const SPRING = { stiffness: 150, damping: 19, mass: 0.9 }
const REST_Y = 35

const clamp = (value: number) => Math.min(100, Math.max(0, value))

export function HoloTilt({ children, className, max = 11 }: { children: React.ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const allowed = useMotionAllowed()

  const rx = useSpring(0, SPRING)
  const ry = useSpring(0, SPRING)
  const px = useSpring(50, SPRING)
  const py = useSpring(REST_Y, SPRING)
  const glow = useSpring(0, SPRING)

  useEffect(() => {
    const el = ref.current
    if (!el || !allowed) return

    let frame = 0
    let settleTimer: ReturnType<typeof setTimeout> | undefined
    let dragging = false

    const write = () => {
      frame = 0
      const x = px.get()
      const y = py.get()
      el.style.setProperty('--rk-rx', `${rx.get().toFixed(2)}deg`)
      el.style.setProperty('--rk-ry', `${ry.get().toFixed(2)}deg`)
      el.style.setProperty('--rk-px', `${x.toFixed(1)}%`)
      el.style.setProperty('--rk-py', `${y.toFixed(1)}%`)
      el.style.setProperty('--rk-bx', `${(37 + x * 0.26).toFixed(1)}%`)
      el.style.setProperty('--rk-by', `${(33 + y * 0.34).toFixed(1)}%`)
      el.style.setProperty('--rk-glow', glow.get().toFixed(3))
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(write)
    }
    const unsubscribe = [rx, ry, px, py, glow].map((value) => value.on('change', schedule))

    const track = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect()
      const x = clamp(((event.clientX - rect.left) / rect.width) * 100)
      const y = clamp(((event.clientY - rect.top) / rect.height) * 100)
      clearTimeout(settleTimer)
      el.dataset.live = ''
      ry.set(((x - 50) / 50) * max)
      rx.set(-((y - 50) / 50) * max)
      px.set(x)
      py.set(y)
      glow.set(1)
    }

    const settle = () => {
      clearTimeout(settleTimer)
      settleTimer = setTimeout(() => {
        rx.set(0)
        ry.set(0)
        px.set(50)
        py.set(REST_Y)
        glow.set(0)
        delete el.dataset.live
      }, 320)
    }

    const onMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch' && !dragging) return
      track(event)
    }
    const onDown = (event: PointerEvent) => {
      if (event.pointerType !== 'touch') return
      dragging = true
      track(event)
    }
    const onEnd = () => {
      dragging = false
      settle()
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerdown', onDown)
    el.addEventListener('pointerup', onEnd)
    el.addEventListener('pointercancel', onEnd)
    el.addEventListener('pointerleave', onEnd)

    return () => {
      unsubscribe.forEach((stop) => stop())
      cancelAnimationFrame(frame)
      clearTimeout(settleTimer)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerdown', onDown)
      el.removeEventListener('pointerup', onEnd)
      el.removeEventListener('pointercancel', onEnd)
      el.removeEventListener('pointerleave', onEnd)
    }
  }, [allowed, max, rx, ry, px, py, glow])

  return (
    <div ref={ref} className={cn('rk-holo', className)}>
      {children}
    </div>
  )
}
