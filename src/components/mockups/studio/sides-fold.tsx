'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { useScroll, useTransform } from 'motion/react'
import * as m from 'motion/react-m'
import { sides, whatWeDo } from '@/content/home'
import { ctas } from '@/content/site'
import { cn } from '@/lib/utils'
import { MagneticLink } from './magnetic'
import { MaskLines } from './reveal'
import { useReducedMotionSafe } from './use-media'

/*
 * "Fold" sequence after Darkroom Engineering's satus: each panel is sticky, the
 * next one slides up over it, and the covered panel dims and sinks slightly.
 * A panel taller than the screen sticks by its bottom edge (negative top), so
 * all of its content scrolls past before it's covered.
 */

type PanelProps = {
  children: React.ReactNode
  className?: string
  /** The panel that will slide over this one. */
  coverRef?: React.RefObject<HTMLElement | null>
  panelRef: React.RefObject<HTMLElement | null>
  tone: 'ink' | 'chalk'
  labelledBy?: string
}

function FoldPanel({ children, className, coverRef, panelRef, tone, labelledBy }: PanelProps) {
  const reduced = useReducedMotionSafe()
  const { scrollYProgress } = useScroll({ target: coverRef ?? panelRef, offset: ['start end', 'start start'] })
  const active = Boolean(coverRef) && !reduced
  const shade = useTransform(scrollYProgress, [0, 1], [0, 0.55])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94])
  const sink = useTransform(scrollYProgress, [0, 1], ['0svh', '5svh'])

  useEffect(() => {
    const el = panelRef.current
    if (!el) return
    const fit = () => el.style.setProperty('--st-top', `${Math.min(0, window.innerHeight - el.offsetHeight)}px`)
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(el)
    window.addEventListener('resize', fit)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', fit)
    }
  }, [panelRef])

  const Tag = labelledBy ? 'article' : 'div'
  return (
    <Tag
      ref={panelRef as React.RefObject<HTMLDivElement>}
      className={cn('st-fold', className)}
      data-cursor-tone={tone}
      aria-labelledby={labelledBy}
    >
      <m.div className="st-fold__inner" style={active ? { scale, y: sink } : undefined}>
        {children}
      </m.div>
      <m.span aria-hidden="true" className="st-fold__shade" style={{ opacity: active ? shade : 0 }} />
    </Tag>
  )
}

/** The playbook's marks: X for agencies, O for athletes. Drawn on entering view. */
function PlayMark({ mark }: { mark: 'X' | 'O' }) {
  const draw = {
    initial: { pathLength: 0 },
    whileInView: { pathLength: 1 },
    viewport: { once: true, margin: '0px 0px -20% 0px' },
    transition: { duration: 1.1, ease: [0.65, 0, 0.35, 1] as const },
  }
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className="st-fold__mark">
      {mark === 'O' ? (
        <m.circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="5" {...draw} />
      ) : (
        <>
          <m.path d="M14 14 L86 86" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" {...draw} />
          <m.path d="M86 14 L14 86" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" {...draw} transition={{ ...draw.transition, delay: 0.25 }} />
        </>
      )}
    </svg>
  )
}

export function SidesFold() {
  const intro = useRef<HTMLElement>(null)
  const agency = useRef<HTMLElement>(null)
  const athlete = useRef<HTMLElement>(null)

  const panels = [
    { key: 'agency', side: sides.agency, ref: agency, cover: athlete, cta: ctas.agency, surface: 'st-fold--ultra', tone: 'chalk' as const, mark: 'X' as const, btn: 'chalk' as const },
    { key: 'athlete', side: sides.athlete, ref: athlete, cover: undefined, cta: ctas.athlete, surface: 'st-fold--flare', tone: 'ink' as const, mark: 'O' as const, btn: 'ink' as const },
  ]

  return (
    <section aria-labelledby="st-what-title" className="st-folds">
      <FoldPanel panelRef={intro} coverRef={agency} tone="ink" className="st-fold--chalk">
        <div className="st-wrap st-fold__intro">
          <p className="st-label">
            <span className="tabular-nums">(02)</span> {whatWeDo.eyebrow}
          </p>
          <h2 id="st-what-title" className="st-h2 st-h2--xl mt-8">
            <MaskLines lines={['Hand-matched,', <span key="b" className="text-ink/52">not mass-matched.</span>]} />
          </h2>
          <div className="mt-10 grid gap-8 md:grid-cols-12">
            <p className="text-lg leading-relaxed text-pretty text-ink/80 md:col-span-5 md:col-start-7 sm:text-xl">{whatWeDo.intro}</p>
          </div>
          <p className="st-label mt-14 text-ink/65">{sides.intro}</p>
        </div>
      </FoldPanel>

      {panels.map((panel) => (
        <FoldPanel
          key={panel.key}
          panelRef={panel.ref}
          coverRef={panel.cover}
          tone={panel.tone}
          className={panel.surface}
          labelledBy={`st-side-${panel.key}`}
        >
          <div className="st-wrap st-fold__side">
            <div className="flex items-start justify-between gap-6">
              <p className="st-label">
                <span className="tabular-nums">({panel.mark})</span> {panel.side.eyebrow}
              </p>
              <PlayMark mark={panel.mark} />
            </div>
            <div className="st-fold__grid">
              <h3 id={`st-side-${panel.key}`} className="st-h2 st-fold__title">
                <MaskLines lines={[panel.side.title]} />
              </h3>
              <ol className="st-fold__steps">
                {panel.side.steps.map((step, i) => (
                  <li key={step}>
                    <span className="st-label tabular-nums opacity-85">{String(i + 1).padStart(2, '0')}</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="mt-10 flex flex-col gap-5 xs:flex-row xs:flex-wrap xs:items-center">
              <MagneticLink href={panel.cta.href} variant={panel.btn} size="lg">
                {panel.cta.label}
              </MagneticLink>
              <Link href={panel.side.moreHref} className="st-link st-link--line inline-flex min-h-11 items-center font-medium" data-cursor-text="Read">
                {panel.side.moreLabel}
              </Link>
            </div>
          </div>
        </FoldPanel>
      ))}
    </section>
  )
}
