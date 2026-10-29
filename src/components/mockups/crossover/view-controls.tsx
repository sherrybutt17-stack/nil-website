'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowDown, ArrowRight } from 'lucide-react'
import { useScroll } from 'motion/react'
import * as m from 'motion/react-m'
import { ctas } from '@/content/site'
import { cn } from '@/lib/utils'
import { GlyphO, GlyphX } from './glyphs'
import { setView, useReducedMotionSafe, useView, type View } from './view-store'

const options: { view: View; label: string; Glyph: typeof GlyphO }[] = [
  { view: 'athletes', label: 'Athletes', Glyph: GlyphO },
  { view: 'agencies', label: 'Agencies', Glyph: GlyphX },
]

const announcement: Record<View, string> = {
  agencies: 'Showing the agency view',
  athletes: 'Showing the athlete view',
}

/** The concept's root element. Carries the current side so CSS can recolour the page. */
export function ViewRoot({ className, children }: { className?: string; children: React.ReactNode }) {
  const view = useView()
  return (
    <div data-view={view} className={className}>
      {children}
    </div>
  )
}

/** The signup that matches the side being viewed. */
export function ViewCta({ className, size }: { className?: string; size?: 'sm' | 'lg' }) {
  const view = useView()
  const cta = view === 'athletes' ? ctas.athlete : ctas.agency
  return (
    <Link href={cta.href} className={cn('x-btn x-btn--fill', size && `x-btn--${size}`, className)}>
      {cta.label}
      <ArrowRight aria-hidden="true" />
    </Link>
  )
}

/** Jumps to the overview and switches the page to one side. Without JS it is a plain anchor. */
export function ViewLink({ view, className, children }: { view: View; className?: string; children: React.ReactNode }) {
  return (
    <a href="#overview" onClick={() => setView(view)} className={className}>
      {children}
      <ArrowDown className="x-down" aria-hidden="true" />
    </a>
  )
}

/** Segmented "Athletes | Agencies" control: a radio group with arrow-key support. */
export function ViewSwitch({ className }: { className?: string }) {
  const view = useView()
  const [message, setMessage] = useState('')
  const refs = useRef<(HTMLButtonElement | null)[]>([])

  const choose = (next: View, focus = false) => {
    setView(next)
    setMessage(announcement[next])
    if (focus) refs.current[options.findIndex((o) => o.view === next)]?.focus()
  }

  // WAI-ARIA radio group: arrows move and select (wrapping), Home/End jump to the ends.
  const onKeyDown = (event: React.KeyboardEvent) => {
    const current = options.findIndex((o) => o.view === view)
    const last = options.length - 1
    const target =
      event.key === 'ArrowRight' || event.key === 'ArrowDown'
        ? (current + 1) % options.length
        : event.key === 'ArrowLeft' || event.key === 'ArrowUp'
          ? (current - 1 + options.length) % options.length
          : event.key === 'Home'
            ? 0
            : event.key === 'End'
              ? last
              : null
    if (target === null) return
    event.preventDefault()
    choose(options[target].view, true)
  }

  return (
    <div className={className}>
      <div role="radiogroup" aria-label="Show the page for" className="x-switch" onKeyDown={onKeyDown}>
        <span className="x-switch__thumb" aria-hidden="true" />
        {options.map(({ view: option, label, Glyph }, i) => {
          const checked = view === option
          return (
            <button
              key={option}
              ref={(el) => {
                refs.current[i] = el
              }}
              type="button"
              role="radio"
              aria-checked={checked}
              tabIndex={checked ? 0 : -1}
              onClick={() => choose(option)}
              className="x-switch__opt"
            >
              <Glyph className="size-3" strokeWidth={2} />
              {label}
            </button>
          )
        })}
      </div>
      <p className="sr-only" aria-live="polite">
        {message}
      </p>
    </div>
  )
}

/** Sticky bar under the hero: the side switch, the matching CTA and page progress. */
export function ViewBar() {
  const view = useView()
  const reduce = useReducedMotionSafe()
  const { scrollYProgress } = useScroll()

  return (
    <div className="x-bar">
      <div className="x-wrap x-ruled border-b border-line">
        <div className="x-pad flex h-(--x-bar-h) items-center justify-between gap-4">
          <p className="x-mono hidden min-w-0 text-smoke lg:block">
            Viewing as <span className="text-ink">{view === 'athletes' ? 'an athlete or creator' : 'an agency or brand'}</span>
          </p>
          <ViewSwitch className="w-full sm:w-auto md:absolute md:left-1/2 md:-translate-x-1/2 [&_.x-switch]:sm:min-w-[17rem]" />
          <ViewCta size="sm" className="hidden lg:inline-flex" />
        </div>
        {!reduce && (
          <m.span
            aria-hidden="true"
            className="absolute inset-x-0 -bottom-px h-[2px] origin-left bg-(--x-fill)"
            style={{ scaleX: scrollYProgress }}
          />
        )}
      </div>
    </div>
  )
}
