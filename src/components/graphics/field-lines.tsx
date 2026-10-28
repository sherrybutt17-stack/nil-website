import { cn } from '@/lib/utils'

/** Yard lines and hash marks, drawn as a repeating pattern. Decorative. */
export function FieldLines({ id, className }: { id: string; className?: string }) {
  const patternId = `field-${id}`
  return (
    <svg aria-hidden="true" className={cn('pointer-events-none absolute inset-0 h-full w-full', className)}>
      <defs>
        <pattern id={patternId} width="112" height="112" patternUnits="userSpaceOnUse">
          <path d="M0.75 0v112" stroke="currentColor" strokeWidth="1.5" />
          <path d="M52 28h8M52 84h8" stroke="currentColor" strokeWidth="1.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  )
}
