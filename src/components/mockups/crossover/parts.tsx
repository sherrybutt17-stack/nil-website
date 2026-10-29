import { cn } from '@/lib/utils'

export const EASE = [0.22, 1, 0.36, 1] as const

/** Content that swaps when the side changes: a very fast fade out, then a short staggered rise in. */
const SWAP_EASE = [0.25, 0.25, 0, 1] as const

export const swap = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04, delayChildren: 0.06 } },
  exit: { opacity: 0, transition: { duration: 0.08, ease: 'linear' as const } },
}

export const swapItem = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.32, ease: SWAP_EASE } },
}

/** Section kicker: index, label and a hairline running to an optional note on the right. */
export function SectionIndex({ n, label, note, className }: { n: string; label: string; note?: string; className?: string }) {
  return (
    <div className={cn('x-mono flex items-center gap-4 text-smoke', className)}>
      <span className="text-(--x-accent)">{n}</span>
      <span className="text-ink">{label}</span>
      <span aria-hidden="true" className="h-px min-w-6 flex-1 bg-line" />
      {note && <span className="hidden sm:inline">{note}</span>}
    </div>
  )
}

export const pad2 = (n: number) => String(n).padStart(2, '0')
