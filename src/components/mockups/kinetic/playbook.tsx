'use client'

import { useEffect, useRef, useState } from 'react'
import { useScroll } from 'motion/react'
import * as m from 'motion/react-m'
import { playbook } from '@/content/home'
import { Kicker, pad, SplitText, type CSSVars } from './primitives'

/** Outlined copies that trail the active numeral upwards, like a motion study. */
const echoes = [
  { d: '0.16em', o: 0.55 },
  { d: '0.32em', o: 0.32 },
  { d: '0.48em', o: 0.16 },
]

/*
 * The four steps. The step crossing the middle of the screen is active: its
 * numeral widens from 62% to 125% and turns Flare, trailed by outlined echoes.
 * A rail on the left fills with scroll progress.
 */
export function Playbook() {
  const [active, setActive] = useState(0)
  const list = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: list, offset: ['start 60%', 'end 50%'] })

  useEffect(() => {
    const items = list.current ? Array.from(list.current.children) : []
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(items.indexOf(entry.target))
        }
      },
      { rootMargin: '-48% 0px -48% 0px' }
    )
    items.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [])

  return (
    <section aria-labelledby="k-playbook" className="surface-ink overflow-x-clip py-24 sm:py-32">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Kicker n="04" className="text-flare">
              {playbook.eyebrow}
            </Kicker>
            <h2 id="k-playbook" className="k-display k-scrub mt-8 max-w-[12ch] text-[clamp(3.25rem,9vw,9rem)]">
              <SplitText text={playbook.title} />
            </h2>
          </div>
          <p className="k-body max-w-sm text-chalk/80 lg:col-span-4">{playbook.intro}</p>
        </div>

        <div className="relative mt-16 sm:mt-24">
          <div aria-hidden="true" className="absolute top-0 bottom-0 left-0 w-[3px] bg-chalk/12">
            <m.div className="k-rail h-full w-full bg-flare" style={{ scaleY: scrollYProgress }} />
          </div>
          <ol ref={list} className="pl-5 sm:pl-10 lg:pl-14">
            {playbook.steps.map((step, i) => (
              <li
                key={step.title}
                data-active={active === i}
                className="k-step grid gap-4 border-t border-chalk/12 py-10 first:border-t-0 first:pt-2 sm:grid-cols-12 sm:items-center sm:gap-8 sm:py-14"
              >
                <div className="sm:col-span-6 lg:col-span-6">
                  <span aria-hidden="true" className="k-step__num" data-n={pad(i + 1)}>
                    {echoes.map((echo) => (
                      <span
                        key={echo.d}
                        className="k-step__echo"
                        data-n={pad(i + 1)}
                        style={{ '--d': echo.d, '--o': echo.o } as CSSVars}
                      />
                    ))}
                  </span>
                </div>
                <div className="sm:col-span-6 lg:col-span-5">
                  <h3 className="k-display text-[clamp(2.75rem,5.4vw,5rem)] [--s:70%]">{step.title}</h3>
                  <p className="k-body mt-4 max-w-md text-chalk/80">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-16 grid gap-6 border-t-2 border-flare pt-7 sm:mt-20 lg:grid-cols-12">
          <p className="k-label text-flare lg:col-span-3">A note on timing</p>
          <p className="max-w-4xl text-[clamp(1.375rem,2.3vw,2.125rem)] leading-[1.3] font-medium tracking-[-0.015em] text-pretty lg:col-span-9">
            {playbook.timingNote}
          </p>
        </div>
      </div>
    </section>
  )
}
