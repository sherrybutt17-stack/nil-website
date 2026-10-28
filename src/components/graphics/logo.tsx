import { cn } from '@/lib/utils'

/** The Real NIL Agency mark: two sides meeting at a slash — athletes (flare) and agencies (ultra). */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={cn('size-7', className)}>
      <path d="M0 0h20L8 32H0z" className="fill-flare" />
      <path d="M24 0h8v32H12z" className="fill-ultra" />
    </svg>
  )
}

/**
 * Mark plus a stacked "REAL NIL / AGENCY" wordmark, compact enough for phone headers.
 * Its text is the link's accessible name, so the space between the two lines matters.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <LogoMark />
      <span className="flex flex-col">
        <span className="display text-[1.6rem] leading-[0.82] tracking-[0.02em] whitespace-nowrap">Real NIL</span>{' '}
        <span className="eyebrow mt-0.5 text-xs leading-none tracking-[0.3em] opacity-80">Agency</span>
      </span>
    </span>
  )
}
