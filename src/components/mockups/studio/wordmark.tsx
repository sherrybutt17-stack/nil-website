import { LogoMark } from '@/components/graphics/logo'
import { cn } from '@/lib/utils'

/** Wordmark in the concept's typeface. Its text is the link's accessible name. */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)} translate="no">
      <LogoMark className="size-6" />
      <span className="st-wordmark">
        <span className="font-semibold">Real&nbsp;NIL</span> <span className="opacity-70">Agency</span>
      </span>
    </span>
  )
}
