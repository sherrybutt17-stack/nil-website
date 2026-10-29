import { LogoMark } from '@/components/graphics/logo'
import { cn } from '@/lib/utils'

/** Small wide-caps label, the nameplate voice of this concept. */
export function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={cn('rk-label', className)}>{children}</span>
}

type SectionHeadProps = {
  id: string
  index: string
  kicker: string
  title: React.ReactNode
  intro?: React.ReactNode
  className?: string
  /** Text colour for the kicker on light grounds; defaults to smoke. */
  kickerClassName?: string
}

/** Section opener: an index and kicker on a hairline, then the wide-caps heading. */
export function SectionHead({ id, index, kicker, title, intro, className, kickerClassName }: SectionHeadProps) {
  return (
    <div className={cn('max-w-3xl', className)}>
      <p className={cn('flex items-center gap-3 text-smoke', kickerClassName)}>
        <span className="rk-label tabular-nums">{index}</span>
        <span aria-hidden="true" className="h-px w-8 bg-current opacity-40" />
        <span className="rk-label">{kicker}</span>
      </p>
      <h2 id={id} className="rk-display rk-h2 mt-5">
        {title}
      </h2>
      {intro && <p className="mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-smoke">{intro}</p>}
    </div>
  )
}

/** Crosshair registration marks at the four corners of the parent (position: relative). */
export function RegMarks({ inset = '0' }: { inset?: string }) {
  const corners = [
    { top: inset, left: inset },
    { top: inset, right: inset },
    { bottom: inset, left: inset },
    { bottom: inset, right: inset },
  ]
  return (
    <>
      {corners.map((style, i) => (
        <svg key={i} viewBox="0 0 14 14" aria-hidden="true" className="rk-reg" style={style}>
          <path d="M7 0v14M0 7h14" stroke="currentColor" strokeWidth="1" />
          <circle cx="7" cy="7" r="3.5" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>
      ))}
    </>
  )
}

type SlabProps = {
  /** Left side of the label strip, e.g. "Athlete profile". */
  title: string
  /** Right side, e.g. "Under review". */
  status: string
  children: React.ReactNode
  className?: string
  sweep?: boolean
}

/** A graded-card slab: a label strip above the card, all in a clear acrylic case. */
export function Slab({ title, status, children, className, sweep = true }: SlabProps) {
  return (
    <div className={cn('rk-slab', className)}>
      <div className="rk-slab__label" data-rk-sweep={sweep ? '' : undefined}>
        <span className="grid min-w-0 gap-1">
          <span className="rk-label truncate text-[0.625rem] text-ink">{title}</span>
          <span className="rk-label truncate text-[0.5625rem] tracking-[0.2em] text-smoke">{status}</span>
        </span>
        <span className="flex shrink-0 items-center gap-3">
          <span aria-hidden="true" className="rk-bars" />
          <LogoMark className="size-5" />
        </span>
      </div>
      {children}
    </div>
  )
}
