import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Reveal } from '@/components/motion/reveal'

export type Benefit = { icon: LucideIcon; title: string; body: string }

type BenefitGridProps = {
  items: Benefit[]
  /** Classes for the icon badge (background + text colour). */
  badgeClassName: string
  className?: string
}

export function BenefitGrid({ items, badgeClassName, className }: BenefitGridProps) {
  return (
    <ul className={cn('grid gap-px overflow-hidden rounded-md border-2 border-ink bg-ink sm:grid-cols-2', className)}>
      {items.map(({ icon: Icon, title, body }, i) => (
        <li key={title} className="bg-paper">
          <Reveal delay={(i % 2) * 0.08} className="flex h-full flex-col p-7 sm:p-9">
            <span className={cn('grid size-12 place-items-center rounded-full', badgeClassName)}>
              <Icon className="size-6" aria-hidden="true" />
            </span>
            <h3 className="mt-6 text-2xl font-bold">{title}</h3>
            <p className="mt-2.5 max-w-md text-base leading-relaxed text-smoke text-pretty">{body}</p>
          </Reveal>
        </li>
      ))}
    </ul>
  )
}
