import { Play } from 'lucide-react'
import { cn } from '@/lib/utils'

/** An abstract short-form video frame. No fake handles or engagement numbers. */
export function ReelFrame({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn('relative w-[15rem] sm:w-[17rem]', className)}>
      <div className="relative aspect-[9/17] overflow-hidden rounded-[2rem] border-[6px] border-ink bg-ink shadow-[0_40px_80px_-30px_rgb(0_0_0/0.6)]">
        <div className="absolute inset-0 bg-[linear-gradient(160deg,var(--color-flare)_0%,var(--color-flare)_38%,var(--color-ultra)_38%,var(--color-ultra)_100%)]" />
        <div className="absolute inset-x-0 top-[30%] text-center">
          <span className="numeral-outline block text-[9rem] text-white/90">00</span>
        </div>
        <div className="absolute top-4 left-4 rounded-full bg-ink/85 px-2.5 py-1 text-[0.625rem] font-bold tracking-[0.18em] text-chalk uppercase">
          Reel
        </div>
        <div className="absolute inset-0 grid place-items-center">
          <span className="grid size-16 place-items-center rounded-full bg-chalk/95 text-ink">
            <Play className="ml-1 size-7 fill-current" />
          </span>
        </div>
        <div className="absolute right-4 bottom-20 flex flex-col gap-3">
          {[0, 1, 2].map((i) => (
            <span key={i} className="size-8 rounded-full border-2 border-white/80" />
          ))}
        </div>
        <div className="absolute inset-x-4 bottom-5 space-y-2">
          <span className="block h-2 w-2/3 rounded-full bg-white/85" />
          <span className="block h-2 w-5/12 rounded-full bg-white/60" />
        </div>
      </div>
    </div>
  )
}
