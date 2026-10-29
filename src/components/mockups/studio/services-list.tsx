'use client'

import { useRef, useState } from 'react'
import { useMotionValue, useSpring } from 'motion/react'
import * as m from 'motion/react-m'
import { reasons } from '@/content/home'
import { MaskLines } from './reveal'
import { pointerEffectsAllowed } from './use-media'

/*
 * "Why brands team up with athletes" as a studio services list. Each row's
 * text is always visible (nothing hides behind hover); on fine pointers a
 * colour fill slides up behind the hovered row and a small typographic preview
 * card trails the cursor inside the list.
 */
export function ServicesList() {
  const listRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState<number | null>(null)
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const x = useSpring(px, { stiffness: 260, damping: 26, mass: 0.6 })
  const y = useSpring(py, { stiffness: 260, damping: 26, mass: 0.6 })

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType === 'touch' || !pointerEffectsAllowed() || !listRef.current) return
    const r = listRef.current.getBoundingClientRect()
    px.set(e.clientX - r.left)
    py.set(e.clientY - r.top)
  }

  return (
    <section aria-labelledby="st-why-title" className="st-section">
      <div className="st-wrap">
        <div className="grid gap-8 lg:grid-cols-12">
          <p className="st-label lg:col-span-4">
            <span className="tabular-nums">(03)</span> {reasons.eyebrow}
          </p>
          <h2 id="st-why-title" className="st-h2 lg:col-span-8">
            <MaskLines lines={['Why brands team up', <span key="a">with <em className="st-accent text-ultra">athletes.</em></span>]} />
          </h2>
        </div>

        <div
          ref={listRef}
          className="st-services"
          onPointerMove={onMove}
          onPointerLeave={() => setActive(null)}
          data-active={active === null ? undefined : ''}
        >
          <ul>
            {reasons.items.map((item, i) => (
              <li key={item.title} className="st-service" onPointerEnter={() => setActive(i)} data-on={active === i ? '' : undefined}>
                <span aria-hidden="true" className="st-service__fill" />
                <span className="st-label tabular-nums st-service__index">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="st-service__title">{item.title}</h3>
                <p className="st-service__body">{item.body}</p>
              </li>
            ))}
          </ul>

          <m.div aria-hidden="true" className="st-preview" style={{ x, y }}>
            <div className="st-preview__card">
              {reasons.items.map((item, i) => (
                <div key={item.title} className="st-preview__face" data-on={active === i ? '' : undefined}>
                  <span className="st-label tabular-nums">({String(i + 1).padStart(2, '0')})</span>
                  <ReasonGlyph index={i} />
                  <span className="st-preview__word">{item.title}</span>
                </div>
              ))}
            </div>
          </m.div>
        </div>
      </div>
    </section>
  )
}

/** Trust (two overlapping rings), stories (frames), community (concentric rings), trackable (a trail of points). */
function ReasonGlyph({ index }: { index: number }) {
  return (
    <svg viewBox="0 0 120 90" className="st-preview__glyph">
      <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        {index === 0 && (
          <>
            <circle cx="48" cy="45" r="26" />
            <circle cx="72" cy="45" r="26" />
          </>
        )}
        {index === 1 && (
          <>
            <rect x="14" y="20" width="26" height="46" rx="4" />
            <rect x="47" y="20" width="26" height="46" rx="4" />
            <rect x="80" y="20" width="26" height="46" rx="4" />
          </>
        )}
        {index === 2 && (
          <>
            <circle cx="60" cy="45" r="8" fill="currentColor" />
            <circle cx="60" cy="45" r="20" />
            <circle cx="60" cy="45" r="32" strokeDasharray="2 6" />
          </>
        )}
        {index === 3 && (
          <>
            <path d="M12 72 C 34 70, 44 52, 60 46 S 92 22, 108 16" strokeDasharray="1 7" strokeWidth="3" />
            <circle cx="108" cy="16" r="5" fill="currentColor" />
          </>
        )}
      </g>
    </svg>
  )
}
