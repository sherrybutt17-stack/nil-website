import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'

/* Building blocks for the Kinetic concept. All server-safe: motion lives in CSS or motion.tsx. */

export type CSSVars = React.CSSProperties & Record<`--${string}`, string | number>

/** Small wide-tracked label with its section number, e.g. "(02) What we do". */
export function Kicker({ n, children, className }: { n?: string; children: React.ReactNode; className?: string }) {
  return (
    <p className={cn('k-label flex items-center gap-3', className)}>
      {n && <span className="tabular-nums">({n})</span>}
      <span aria-hidden="true" className="h-[2px] w-6 bg-current" />
      <span>{children}</span>
    </p>
  )
}

/**
 * Splits text into words and characters for staggered CSS animation, in the
 * manner of Splitting.js: each character gets --i, its index across the text.
 * The visible copy is aria-hidden; pair it with the plain text for assistive tech
 * (see SplitText). `glint` paints the speed shimmer on each character's glyphs.
 */
export function SplitChars({ text, start = 0, glint }: { text: string; start?: number; glint?: boolean }) {
  let i = start
  const words = text.split(' ')
  return (
    <>
      {words.map((word, w) => (
        <span key={`${word}-${w}`}>
          <span className="k-word">
            {Array.from(word).map((char, c) => (
              <span key={c} className="k-char" style={{ '--i': i++ } as CSSVars}>
                {glint ? <span className="k-glint-text">{char}</span> : char}
              </span>
            ))}
          </span>
          {w < words.length - 1 && ' '}
        </span>
      ))}
    </>
  )
}

/** A heading's text, split for animation but read once, as plain text. */
export function SplitText({ text, className }: { text: string; className?: string }) {
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className={className}>
        <SplitChars text={text} />
      </span>
    </>
  )
}

/**
 * A word that changes width (Archivo's wdth axis) inside a box sized for its
 * widest state, so it never pushes neighbouring text around.
 */
export function Stretch({
  children,
  from = 100,
  to = 125,
  center,
  className,
}: {
  children: string
  from?: number
  to?: number
  center?: boolean
  className?: string
}) {
  return (
    <span
      className={cn('k-stretch', center && 'k-stretch--center', className)}
      style={{ '--from': `${from}%`, '--to': `${to}%` } as CSSVars}
    >
      <span aria-hidden="true" className="k-stretch__ghost">
        {children}
      </span>
      <span className="k-stretch__live">{children}</span>
    </span>
  )
}

type ButtonTone = 'agency' | 'athlete' | 'athlete-ink' | 'chalk' | 'chalk-ultra' | 'ink' | 'outline'

export function KButton({
  href,
  tone,
  size = 'md',
  external,
  intro,
  className,
  children,
}: {
  href: string
  tone: ButtonTone
  size?: 'sm' | 'md'
  external?: boolean
  /** Plays the sheen once on load (hero only). */
  intro?: boolean
  className?: string
  children: React.ReactNode
}) {
  const Icon = external ? ArrowUpRight : ArrowRight
  return (
    <Link
      href={href}
      className={cn('k-btn', `k-btn--${tone}`, size === 'sm' && 'k-btn--sm', intro && 'k-btn--intro', className)}
    >
      <span>{children}</span>
      <Icon className={size === 'sm' ? 'size-3.5' : 'size-4'} strokeWidth={2.5} aria-hidden="true" />
    </Link>
  )
}

/** The logo's slash as a separator glyph. Decorative. */
export function SlashMark({ className, tone = 'flare' }: { className?: string; tone?: 'flare' | 'ultra' | 'chalk' }) {
  const fill = tone === 'flare' ? 'fill-flare' : tone === 'ultra' ? 'fill-ultra-soft' : 'fill-chalk'
  return (
    <svg viewBox="0 0 20 32" aria-hidden="true" className={className}>
      <path d="M8 0h12L12 32H0z" className={fill} />
    </svg>
  )
}

export const pad = (n: number) => String(n).padStart(2, '0')
