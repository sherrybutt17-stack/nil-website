import { cn } from '@/lib/utils'

/* The playbook's marks: O for athletes, X for agencies. Decorative. */

export function GlyphO({ className, strokeWidth = 1.5 }: { className?: string; strokeWidth?: number }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className={cn('block', className)}>
      <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth={strokeWidth} vectorEffect="non-scaling-stroke" />
    </svg>
  )
}

export function GlyphX({ className, strokeWidth = 1.5 }: { className?: string; strokeWidth?: number }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className={cn('block', className)}>
      <path
        d="M10 10 90 90M90 10 10 90"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="square"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}

export function GlyphCheck({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className={cn('block size-4', className)}>
      <path d="M2.5 8.5 6.25 12 13.5 4" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="square" />
    </svg>
  )
}
