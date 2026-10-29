'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { campaignGoals } from '@/content/options'
import { cn } from '@/lib/utils'
import { MagneticButton } from './magnetic'
import { REDUCED_MOTION } from './use-media'

const tones = ['st-brief--paper', 'st-brief--ultra', 'st-brief--paper', 'st-brief--ink', 'st-brief--paper', 'st-brief--flare'] as const

/*
 * The campaign goals agencies can brief us on, as a horizontal reel.
 * Scroll-snap does the work; Prev/Next buttons, arrow keys (the track is
 * focusable) and mouse drag all move it. Gestures always have a button.
 */
export function BriefReel() {
  const trackRef = useRef<HTMLUListElement>(null)
  const barRef = useRef<HTMLSpanElement>(null)
  const [edges, setEdges] = useState({ start: true, end: false })
  const drag = useRef({ active: false, startX: 0, scroll: 0, moved: false })

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const update = () => {
      const max = track.scrollWidth - track.clientWidth
      const p = max > 0 ? track.scrollLeft / max : 0
      if (barRef.current) barRef.current.style.transform = `scaleX(${Math.max(0.08, p)})`
      setEdges((prev) => {
        const next = { start: track.scrollLeft < 8, end: track.scrollLeft > max - 8 }
        return prev.start === next.start && prev.end === next.end ? prev : next
      })
    }
    update()
    track.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      track.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  const step = (dir: 1 | -1) => {
    const track = trackRef.current
    if (!track) return
    const card = track.querySelector('li')
    const amount = card ? card.getBoundingClientRect().width + 16 : track.clientWidth * 0.8
    track.scrollBy({ left: dir * amount, behavior: window.matchMedia(REDUCED_MOTION).matches ? 'auto' : 'smooth' })
  }

  const onPointerDown = (e: React.PointerEvent<HTMLUListElement>) => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return
    drag.current = { active: true, startX: e.clientX, scroll: e.currentTarget.scrollLeft, moved: false }
  }
  const onPointerMove = (e: React.PointerEvent<HTMLUListElement>) => {
    const d = drag.current
    if (!d.active) return
    const dx = e.clientX - d.startX
    if (!d.moved && Math.abs(dx) > 4) {
      d.moved = true
      e.currentTarget.setPointerCapture(e.pointerId)
      e.currentTarget.dataset.dragging = ''
    }
    if (d.moved) e.currentTarget.scrollLeft = d.scroll - dx
  }
  const endDrag = (e: React.PointerEvent<HTMLUListElement>) => {
    if (!drag.current.active) return
    drag.current.active = false
    delete e.currentTarget.dataset.dragging
  }

  return (
    <div className="st-reel">
      <div className="st-wrap flex items-end justify-between gap-6">
        <h3 id="st-reel-title" className="st-reel__title">Brief us on any of these</h3>
        <div className="flex shrink-0 gap-2">
          <MagneticButton label="Previous goals" tone="chalk" onClick={() => step(-1)} disabled={edges.start}>
            <ArrowLeft className="size-5" aria-hidden="true" />
          </MagneticButton>
          <MagneticButton label="Next goals" tone="chalk" onClick={() => step(1)} disabled={edges.end}>
            <ArrowRight className="size-5" aria-hidden="true" />
          </MagneticButton>
        </div>
      </div>

      <ul
        ref={trackRef}
        tabIndex={0}
        aria-labelledby="st-reel-title"
        className="st-reel__track"
        data-cursor-text="Drag"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        {campaignGoals.map((goal, i) => (
          <li key={goal} className={cn('st-brief st-sheen', tones[i % tones.length])} data-cursor-tone={tones[i] === 'st-brief--ultra' || tones[i] === 'st-brief--ink' ? 'chalk' : 'ink'}>
            <span className="st-label tabular-nums">Goal {String(i + 1).padStart(2, '0')}</span>
            <span className="st-brief__name">{goal}</span>
            <span className="st-label opacity-70">Agency form · campaign goals</span>
          </li>
        ))}
      </ul>

      <div className="st-wrap mt-6">
        <span className="st-reel__bar" aria-hidden="true">
          <span ref={barRef} />
        </span>
      </div>
    </div>
  )
}
