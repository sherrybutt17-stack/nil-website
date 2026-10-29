import { LogoMark } from '@/components/graphics/logo'
import { sampleAthlete, sampleBrief } from '@/content/sample'
import { cn } from '@/lib/utils'
import { Rosette } from './guilloche'
import { Label } from './primitives'

/*
 * Card faces, filled with the fictional sample athlete and brief from
 * src/content/sample.ts. Sizes inside a card use container units (cqi), so a
 * card reads the same at any width.
 */

export type Tone = 'flare' | 'ultra' | 'ink' | 'paper'

type ShellProps = {
  tone: Tone
  children: React.ReactNode
  className?: string
  /** Pointer-driven foil and glare layers (used inside HoloTilt). */
  holo?: boolean
  /** One slow foil pass on load. */
  introSweep?: boolean
}

export function CardShell({ tone, children, className, holo, introSweep }: ShellProps) {
  return (
    <div className={cn('rk-card @container', `rk-card--${tone}`, className)}>
      <span aria-hidden="true" className="rk-card__frame" />
      <div className="relative z-[4] flex h-full flex-col p-[7.5cqi]">{children}</div>
      {holo && <span aria-hidden="true" className="rk-glare" />}
      {introSweep && <span aria-hidden="true" className="rk-intro-sweep" />}
    </div>
  )
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <span className="flex items-end gap-[2.5cqi]">
      <span className="rk-label shrink-0 text-[3.4cqi] leading-none">{label}</span>
      <span className="min-w-0 flex-1 truncate text-right text-[3.6cqi] leading-none font-semibold">{value}</span>
    </span>
  )
}

/** The athlete profile card: the sample athlete's outlined number in the photo window, with their details. */
export function AthleteCardFace({ holo, introSweep, className }: { holo?: boolean; introSweep?: boolean; className?: string }) {
  return (
    <CardShell tone="flare" holo={holo} introSweep={introSweep} className={className}>
      <div className="flex items-center justify-between">
        <Label className="text-[3.6cqi]">Athlete profile</Label>
        <LogoMark className={cn('size-[6.5cqi]', markClass('flare'))} />
      </div>
      <div className="rk-window mt-[5cqi] grid flex-1 place-items-center">
        <span className="rk-num rk-num--outline relative z-[2] text-[46cqi] [-webkit-text-stroke-width:0.55cqi]">{sampleAthlete.number}</span>
        <span className="rk-label absolute top-[4cqi] left-[4cqi] z-[2] text-[3cqi]">No. {sampleAthlete.number}</span>
        <span className="rk-label absolute right-[4cqi] bottom-[4cqi] z-[2] rounded-[1cqi] px-[2cqi] py-[1cqi] text-[3cqi] shadow-[inset_0_0_0_1.5px_currentColor]">
          Rookie
        </span>
        {holo && <span className="rk-foil" />}
      </div>
      <p className="rk-display mt-[5cqi] text-[8.6cqi]">{sampleAthlete.name}</p>
      <div className="mt-[4.5cqi] grid gap-[3.4cqi]">
        <Field label="Sport" value={sampleAthlete.sport} />
        <Field label="School / team" value={sampleAthlete.school} />
        <Field label="Socials" value={sampleAthlete.socials} />
      </div>
    </CardShell>
  )
}

/** The agency's campaign brief card. */
export function BriefCardFace({ className }: { className?: string }) {
  return (
    <CardShell tone="ultra" className={className}>
      <div className="flex items-center justify-between">
        <Label className="text-[3.6cqi]">Campaign brief</Label>
        <Label className="text-[3.2cqi] opacity-80">Draft</Label>
      </div>
      <p className="rk-display mt-[9cqi] text-[11.5cqi]">{sampleBrief.title}</p>
      <div className="mt-auto grid gap-[3.6cqi]">
        <Field label="Goal" value={sampleBrief.goal} />
        <Field label="Sports" value={sampleBrief.sports} />
        <Field label="Audience" value={sampleBrief.audience} />
      </div>
      <div className="mt-[6cqi] flex flex-wrap gap-[2cqi]">
        {['Reels', 'Posts', 'Events'].map((item, i) => (
          <span
            key={item}
            className={cn(
              'rk-label rounded-[1.4cqi] px-[2.6cqi] py-[1.4cqi] text-[3cqi] shadow-[inset_0_0_0_1.5px_currentColor]',
              i === 0 && 'bg-white text-ultra'
            )}
          >
            {item}
          </span>
        ))}
      </div>
    </CardShell>
  )
}

/** The middle card: our team, reviewing by hand. */
export function TeamCardFace({ className }: { className?: string }) {
  return (
    <CardShell tone="ink" className={className}>
      <div className="flex items-center justify-between">
        <Label className="text-[3.6cqi]">Our team</Label>
        <Label className="text-[3.2cqi] text-chalk/70">Review</Label>
      </div>
      <div className="rk-window mt-[5cqi] grid flex-1 place-items-center">
        <LogoMark className="size-[30cqi]" />
      </div>
      <p className="rk-display mt-[5cqi] text-[8.6cqi]">Matched by people.</p>
    </CardShell>
  )
}


/** The back of a card: engraved rosettes around the mark. Decorative. */
export function CardBackFace({ tone, label, className }: { tone: Tone; label: string; className?: string }) {
  return (
    <CardShell tone={tone} className={className}>
      <div className="flex items-center justify-between">
        <Label className="text-[3.6cqi]">{label}</Label>
        <Label className="text-[3.2cqi] opacity-75">Reverse</Label>
      </div>
      <div className="rk-cardback-art relative mt-[5cqi] grid flex-1 place-items-center overflow-hidden rounded-[1.4cqi]">
        <Rosette className="absolute inset-[-8%] size-[116%] opacity-55" />
        <span className="relative grid size-[34cqi] place-items-center rounded-full bg-current/10 shadow-[inset_0_0_0_1.5px_currentColor]">
          <LogoMark className={cn('size-[16cqi]', markClass(tone))} />
        </span>
      </div>
      <div className="mt-[5cqi] flex items-center justify-between">
        <Label className="text-[3cqi]">Real NIL Agency</Label>
        <Label className="text-[3cqi] opacity-75">Matched by people</Label>
      </div>
    </CardShell>
  )
}

/** Keeps both halves of the mark visible on any card colour. */
export function markClass(tone: Tone) {
  if (tone === 'flare') return '[&_path:first-child]:fill-ink'
  if (tone === 'ultra') return '[&_path:last-child]:fill-white'
  return ''
}

/* Each step drawn as a small play: athletes are O, agencies are X. */
function StepPlay({ index }: { index: number }) {
  const o = (cx: number, cy: number) => <circle cx={cx} cy={cy} r="9" fill="none" stroke="currentColor" strokeWidth="3" />
  const x = (cx: number, cy: number) => (
    <path d={`M${cx - 8} ${cy - 8}l16 16m0 -16l-16 16`} stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
  )
  const route = (d: string, dashed?: boolean) => (
    <path d={d} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeDasharray={dashed ? '2 7' : undefined} />
  )
  const plays = [
    // 01 Sign up: each side on its own, heading in.
    <>
      {o(26, 56)}
      {x(174, 56)}
      {route('M40 56 H78', true)}
      {route('M160 56 H122', true)}
    </>,
    // 02 We review: both routes come to our team.
    <>
      {o(22, 26)}
      {o(22, 86)}
      {x(178, 56)}
      {route('M34 30 C 62 36, 70 50, 86 54')}
      {route('M34 82 C 62 76, 70 62, 86 58')}
      {route('M164 56 H114')}
      <rect x="86" y="42" width="28" height="28" rx="5" fill="none" stroke="currentColor" strokeWidth="2.5" />
    </>,
    // 03 We match: one route joins an athlete to a brief.
    <>
      {o(30, 82)}
      {x(170, 30)}
      {route('M42 76 C 86 58, 110 50, 158 34')}
      <circle cx="100" cy="54" r="3.5" fill="currentColor" />
    </>,
    // 04 You activate: together, going forward.
    <>
      {o(40, 70)}
      {x(80, 70)}
      {route('M96 70 H160')}
      <path d="M150 60 L162 70 L150 80" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </>,
  ]
  return (
    <svg aria-hidden="true" viewBox="0 6 200 106" className="w-full overflow-visible opacity-90">
      <path d="M0 111 H200" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1" />
      {[50, 100, 150].map((gx) => (
        <path key={gx} d={`M${gx} 100 V111`} stroke="currentColor" strokeOpacity="0.3" strokeWidth="1" />
      ))}
      {plays[index % plays.length]}
    </svg>
  )
}

const stepTones: Tone[] = ['flare', 'ink', 'ultra', 'paper']

/** A step in the playbook deck. Real content, so it isn't hidden from assistive tech. */
export function StepCardFace({
  index,
  total,
  title,
  body,
  className,
}: {
  index: number
  total: number
  title: string
  body: string
  className?: string
}) {
  const tone = stepTones[index % stepTones.length]
  return (
    <CardShell tone={tone} className={cn('aspect-[5/7.5]', className)} holo>
      <div className="flex items-center justify-between">
        <Label className="text-[3.6cqi]">
          Step {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </Label>
        <LogoMark className={cn('size-[6cqi]', markClass(tone))} />
      </div>
      <span
        aria-hidden="true"
        className={cn(
          'rk-num rk-num--outline mt-[4cqi] text-[27cqi] [-webkit-text-stroke-width:0.45cqi]',
          tone === 'paper' && 'text-ultra'
        )}
      >
        {String(index + 1).padStart(2, '0')}
      </span>
      <div className={cn('mx-auto mt-[3cqi] w-[80%]', tone === 'paper' && 'text-ultra')}>
        <StepPlay index={index} />
      </div>
      <h3 className="rk-display mt-auto pt-[4cqi] text-[9.4cqi]">{title}</h3>
      <p
        className={cn(
          'mt-[3cqi] text-[clamp(0.8125rem,4.7cqi,0.96875rem)] leading-snug',
          tone === 'ink' ? 'text-chalk/85' : tone === 'ultra' ? 'text-white/90' : 'text-ink/85'
        )}
      >
        {body}
      </p>
    </CardShell>
  )
}

/** A 9:16 Reel frame with a foil edge, for content support. Decorative. */
export function ReelCard({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn('relative aspect-[9/16] @container', className)}>
      {/* Foil edge: a thin holographic bezel around the screen. */}
      <div className="absolute inset-0 overflow-hidden rounded-[1.5rem] bg-ink-raised shadow-[0_40px_80px_-30px_rgb(0_0_0/0.8),0_0_0_1px_color-mix(in_oklab,var(--color-chalk)_14%,transparent)]">
        <span className="rk-foil opacity-60" />
      </div>
      <div className="absolute inset-[2.6cqi] overflow-hidden rounded-[1.25rem] bg-ink text-chalk">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,color-mix(in_oklab,var(--color-chalk)_7%,transparent)_0_1px,transparent_1px_16cqi)]" />
        <div className="absolute inset-x-0 top-0 h-1/2 bg-[radial-gradient(90%_70%_at_30%_0%,color-mix(in_oklab,var(--color-flare)_32%,transparent),transparent_70%)]" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[radial-gradient(90%_70%_at_80%_100%,color-mix(in_oklab,var(--color-ultra)_45%,transparent),transparent_70%)]" />
        <div className="absolute inset-x-[7cqi] top-[7cqi] flex items-center justify-between">
          <span className="rk-label text-[4.2cqi]">Reel</span>
          <LogoMark className="size-[8cqi]" />
        </div>
        <span className="absolute top-1/2 left-1/2 grid size-[24cqi] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-chalk/10 shadow-[inset_0_0_0_1.5px_currentColor]">
          <svg viewBox="0 0 24 24" className="ml-[1.2cqi] size-[9cqi]">
            <path d="M7 4.5v15l12-7.5z" fill="currentColor" />
          </svg>
        </span>
        <div className="absolute inset-x-[7cqi] bottom-[8cqi] grid gap-[4cqi]">
          <span className="rk-label text-[3.6cqi] text-chalk/70">Your content</span>
          <span className="rk-blank w-3/4" />
          <span className="rk-blank w-1/2" />
          <span className="mt-[2cqi] block h-[1.2cqi] w-full rounded-full bg-chalk/20">
            <span className="block h-full w-1/3 rounded-full bg-flare" />
          </span>
        </div>
      </div>
    </div>
  )
}
