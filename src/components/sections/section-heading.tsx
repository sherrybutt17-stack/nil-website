import { cn } from '@/lib/utils'

type SectionHeadingProps = {
  eyebrow?: string
  title: React.ReactNode
  intro?: React.ReactNode
  id?: string
  className?: string
  /** Colour for the eyebrow; defaults to inheriting. */
  eyebrowClassName?: string
}

export function SectionHeading({ eyebrow, title, intro, id, className, eyebrowClassName }: SectionHeadingProps) {
  return (
    // Sized to the heading's own column (container queries), so long words fit in narrow tablet columns.
    <div className={cn('@container max-w-3xl', className)}>
      {eyebrow && <p className={cn('eyebrow mb-4', eyebrowClassName)}>{eyebrow}</p>}
      <h2 id={id} className="display text-[3.25rem] @sm:text-[4rem] @[26rem]:text-[4.75rem] @xl:text-[5.5rem]">
        {title}
      </h2>
      {intro && <div className="mt-6 max-w-xl text-lg leading-relaxed opacity-85 text-pretty">{intro}</div>}
    </div>
  )
}

/** Inline serif-italic accent for a single word inside a display headline. */
export function Accent({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={cn('accent-serif text-[1.08em] leading-none', className)}>{children}</span>
}
