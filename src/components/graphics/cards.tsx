import { cn } from '@/lib/utils'
import { LogoMark } from '@/components/graphics/logo'

/* Illustrations of what each side submits. Deliberately blank — no invented athletes or brands. */

function BlankRow({ label, tone }: { label: string; tone: 'ink' | 'chalk' }) {
  return (
    <div className="flex items-end gap-3">
      <span className="eyebrow w-[6.5rem] shrink-0 text-[0.625rem]">{label}</span>
      <span className={cn('mb-1 h-0 flex-1 border-b-2 border-dashed', tone === 'ink' ? 'border-ink/35' : 'border-white/40')} />
    </div>
  )
}

export function ProfileCard({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'surface-flare relative w-[16.5rem] rounded-md p-5 shadow-[0_30px_60px_-20px_rgb(0_0_0/0.55)] sm:w-[18rem]',
        className
      )}
    >
      <div className="flex items-center justify-between">
        <span className="eyebrow text-[0.625rem]">Athlete profile</span>
        <LogoMark className="size-5 [&_path:first-child]:fill-ink" />
      </div>
      <div className="mt-3 flex items-end justify-between">
        <span className="numeral-outline text-[6.5rem]">00</span>
        <span className="mb-2 rounded-full border-2 border-ink px-2.5 py-1 text-[0.625rem] font-bold tracking-wider uppercase">
          Under review
        </span>
      </div>
      <div className="mt-4 space-y-3">
        <BlankRow label="Sport" tone="ink" />
        <BlankRow label="School / team" tone="ink" />
        <BlankRow label="Socials" tone="ink" />
        <BlankRow label="Interests" tone="ink" />
      </div>
      <p className="display mt-6 text-[1.75rem]">Your card goes here.</p>
    </div>
  )
}

export function BriefCard({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'surface-ultra relative w-[16.5rem] rounded-md p-5 shadow-[0_30px_60px_-20px_rgb(0_0_0/0.55)] sm:w-[18rem]',
        className
      )}
    >
      <div className="flex items-center justify-between">
        <span className="eyebrow text-[0.625rem]">Campaign brief</span>
        <span className="text-[0.625rem] font-bold tracking-wider uppercase">Draft</span>
      </div>
      <p className="display mt-4 text-[2.6rem]">Your brief goes here.</p>
      <div className="mt-5 space-y-3">
        <BlankRow label="Goal" tone="chalk" />
        <BlankRow label="Sports" tone="chalk" />
        <BlankRow label="Audience" tone="chalk" />
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {['Reels', 'Posts', 'Events'].map((item, i) => (
          <span
            key={item}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full border-2 border-white/70 px-2.5 py-1 text-[0.6875rem] font-semibold',
              i === 0 && 'bg-white text-ultra'
            )}
          >
            <span className={cn('size-2 rounded-full', i === 0 ? 'bg-ultra' : 'border border-white/80')} />
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

/** Small blank card used to suggest a shortlist on the agency page. */
export function ShortlistCard({ index, className }: { index: number; className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn('surface-flare w-[9.5rem] rounded-md p-3.5 shadow-[0_20px_40px_-18px_rgb(0_0_0/0.6)]', className)}
    >
      <span className="eyebrow text-[0.5625rem]">Shortlist</span>
      <span className="numeral-outline mt-1 block text-[3.75rem]">{String(index).padStart(2, '0')}</span>
      <div className="mt-2 space-y-2">
        <span className="block h-0 border-b-2 border-dashed border-ink/35" />
        <span className="block h-0 w-2/3 border-b-2 border-dashed border-ink/35" />
      </div>
    </div>
  )
}
