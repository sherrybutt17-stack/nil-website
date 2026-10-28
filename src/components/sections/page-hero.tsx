import { cn } from '@/lib/utils'
import { FieldLines } from '@/components/graphics/field-lines'

type PageHeroProps = {
  eyebrow: string
  title: React.ReactNode
  intro: React.ReactNode
  actions: React.ReactNode
  visual?: React.ReactNode
  surface: 'surface-flare' | 'surface-ultra' | 'surface-ink'
  id: string
}

/** Subpage hero. Text renders immediately (no JS-gated animation) to keep LCP fast. */
export function PageHero({ eyebrow, title, intro, actions, visual, surface, id }: PageHeroProps) {
  return (
    <section aria-labelledby={`${id}-title`} className={cn(surface, 'relative isolate overflow-hidden')}>
      <FieldLines id={id} className="-z-10 opacity-[0.12]" />
      <div className="container-x grid items-center gap-12 pt-14 pb-16 sm:pt-20 lg:grid-cols-12 lg:gap-8 lg:pt-24 lg:pb-24">
        <div className={cn(visual ? 'lg:col-span-7' : 'lg:col-span-10')}>
          <p className="eyebrow">{eyebrow}</p>
          <h1 id={`${id}-title`} className="display mt-5 text-[3.6rem] xs:text-7xl sm:text-8xl xl:text-[8.5rem]">
            {title}
          </h1>
          <div className="mt-7 max-w-xl text-lg leading-relaxed text-pretty sm:text-xl">{intro}</div>
          <div className="mt-9 flex flex-col gap-3 xs:flex-row xs:flex-wrap">{actions}</div>
        </div>
        {visual && <div className="relative flex justify-center lg:col-span-5">{visual}</div>}
      </div>
    </section>
  )
}
