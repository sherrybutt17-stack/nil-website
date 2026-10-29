'use client'

import { useEffect, useRef, useState } from 'react'
import { useAnimationFrame, useMotionValue, useSpring, useTransform } from 'motion/react'
import * as m from 'motion/react-m'
import { FINE_POINTER, REDUCED_MOTION, useMediaQuery } from './use-media'

/*
 * A follower that rides alongside the native cursor (which is never hidden).
 * State model after Cuberto's mouse-follower: markup opts in with
 *   data-cursor-text="Join"   grow into a labelled disc
 *   data-cursor-stick         wrap the element in a ring that sticks to it
 *   data-cursor-hidden        hide (e.g. over running text you'd select)
 *   data-cursor-tone="chalk"  light follower over ink and Ultra areas
 * It stretches along its direction of travel, proportional to speed.
 * Mounted only for fine pointers without reduced motion, after hydration.
 */

type Mode = 'dot' | 'label' | 'stick' | 'hidden'

const DOT = 10
const DISC = 84
const STICK_PULL = 0.15
const SKEW_PER_PX = 0.0009
const SKEW_MAX = 0.2

export function CursorFollower() {
  const fine = useMediaQuery(FINE_POINTER)
  const reduced = useMediaQuery(REDUCED_MOTION)
  if (!fine || reduced) return null
  return <Follower />
}

function Follower() {
  const [mode, setMode] = useState<Mode>('hidden')
  const [label, setLabel] = useState('')
  const [tone, setTone] = useState<'ink' | 'chalk'>('ink')

  const pointer = useRef({ x: -100, y: -100, seen: false })
  const stuck = useRef<HTMLElement | null>(null)
  const modeRef = useRef<Mode>('hidden')

  const tx = useMotionValue(-100)
  const ty = useMotionValue(-100)
  const x = useSpring(tx, { stiffness: 520, damping: 42, mass: 0.45 })
  const y = useSpring(ty, { stiffness: 520, damping: 42, mass: 0.45 })

  const tw = useMotionValue(DOT)
  const th = useMotionValue(DOT)
  const width = useSpring(tw, { stiffness: 340, damping: 30 })
  const height = useSpring(th, { stiffness: 340, damping: 30 })

  const rotate = useMotionValue(0)
  const stretch = useMotionValue(0)
  const scaleX = useTransform(stretch, (s) => 1 + s)
  const scaleY = useTransform(stretch, (s) => 1 - s)
  const counter = useTransform(rotate, (r) => -r)
  const radius = useTransform(height, (h) => h / 2)

  useEffect(() => {
    const resolve = (target: Element | null) => {
      const el = target instanceof Element ? target : null
      const toneEl = el?.closest<HTMLElement>('[data-cursor-tone]')
      setTone(toneEl?.dataset.cursorTone === 'chalk' ? 'chalk' : 'ink')

      const hide = el?.closest('[data-cursor-hidden]')
      const stick = el?.closest<HTMLElement>('[data-cursor-stick]')
      const text = el?.closest<HTMLElement>('[data-cursor-text]')

      let next: Mode = 'dot'
      if (!pointer.current.seen || hide) next = 'hidden'
      else if (stick) next = 'stick'
      else if (text) next = 'label'

      stuck.current = next === 'stick' ? stick! : null
      if (next === 'label') setLabel(text!.dataset.cursorText ?? '')
      if (modeRef.current !== next) {
        modeRef.current = next
        setMode(next)
        if (next === 'label') {
          tw.set(DISC)
          th.set(DISC)
        } else if (next === 'dot' || next === 'hidden') {
          tw.set(DOT)
          th.set(DOT)
        }
      }
    }

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return
      pointer.current = { x: e.clientX, y: e.clientY, seen: true }
      resolve(e.target as Element)
    }
    let scrollFrame = 0
    const onScroll = () => {
      if (!pointer.current.seen || scrollFrame) return
      scrollFrame = requestAnimationFrame(() => {
        scrollFrame = 0
        resolve(document.elementFromPoint(pointer.current.x, pointer.current.y))
      })
    }
    const onLeave = (e: MouseEvent) => {
      if (e.relatedTarget) return
      pointer.current.seen = false
      resolve(null)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('mouseout', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('mouseout', onLeave)
      cancelAnimationFrame(scrollFrame)
    }
  }, [tw, th])

  useAnimationFrame(() => {
    const { x: px, y: py } = pointer.current
    const el = stuck.current
    if (el && el.isConnected) {
      // Ring the element (which may itself be drifting magnetically), pulled a little toward the pointer.
      const r = el.getBoundingClientRect()
      const cx = r.left + r.width / 2
      const cy = r.top + r.height / 2
      tx.set(cx + (px - cx) * STICK_PULL)
      ty.set(cy + (py - cy) * STICK_PULL)
      tw.set(r.width + 14)
      th.set(r.height + 14)
      rotate.set(0)
      stretch.set(0)
      return
    }
    tx.set(px)
    ty.set(py)
    const vx = x.getVelocity()
    const vy = y.getVelocity()
    const speed = Math.hypot(vx, vy)
    const factor = modeRef.current === 'label' ? 0.45 : 1
    stretch.set(Math.min(speed * SKEW_PER_PX, SKEW_MAX) * factor)
    if (speed > 40) rotate.set((Math.atan2(vy, vx) * 180) / Math.PI)
  })

  return (
    <m.div aria-hidden="true" className="st-cursor" data-mode={mode} data-tone={tone} style={{ x, y }}>
      <m.div className="st-cursor__body" style={{ x: '-50%', y: '-50%', width, height, borderRadius: radius, rotate, scaleX, scaleY }}>
        <m.span className="st-cursor__label" style={{ rotate: counter }}>
          {label}
        </m.span>
      </m.div>
    </m.div>
  )
}
