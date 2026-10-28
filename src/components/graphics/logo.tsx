import { cn } from '@/lib/utils'

/** The NIL mark: two sides meeting at a slash — athletes (flare) and agencies (ultra). */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={cn('size-7', className)}>
      <path d="M0 0h20L8 32H0z" className="fill-flare" />
      <path d="M24 0h8v32H12z" className="fill-ultra" />
    </svg>
  )
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <LogoMark />
      <span className="display text-[1.85rem] leading-none tracking-[0.02em]">NIL</span>
    </span>
  )
}
