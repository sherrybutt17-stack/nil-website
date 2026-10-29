'use client'

import Link from 'next/link'
import { AnimatePresence } from 'motion/react'
import * as m from 'motion/react-m'
import { sides, whatWeDo } from '@/content/home'
import { pad2, SectionIndex, swap, swapItem } from './parts'
import { ViewCta } from './view-controls'
import { useView } from './view-store'

/** 01: the chosen side's promise and its four steps. */
export function Overview() {
  const view = useView()
  const athlete = view === 'athletes'
  const side = athlete ? sides.athlete : sides.agency

  return (
    <section id="overview" aria-labelledby="x-overview-title">
      <div className="x-wrap x-ruled">
        <div className="x-pad py-20 sm:py-28 lg:py-32">
          <SectionIndex n="01" label={athlete ? 'The athlete view' : 'The agency view'} note={whatWeDo.title} />
          <AnimatePresence mode="wait" initial={false}>
            <m.div
              key={view}
              variants={swap}
              initial="hidden"
              animate="show"
              exit="exit"
              className="mt-14 grid gap-14 sm:mt-20 lg:grid-cols-12 lg:gap-6"
            >
              <div className="lg:col-span-6">
                <m.p variants={swapItem} className="x-mono text-(--x-accent)">
                  {side.eyebrow}
                </m.p>
                <m.h2 variants={swapItem} id="x-overview-title" className="x-h2 mt-6 max-w-[14ch]">
                  {side.title}
                </m.h2>
                <m.p variants={swapItem} className="x-lead mt-8 max-w-lg">
                  {whatWeDo.intro}
                </m.p>
                <m.div variants={swapItem} className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4">
                  <ViewCta size="lg" />
                  <Link href={side.moreHref} className="x-link text-[0.9375rem] font-medium">
                    {side.moreLabel}
                  </Link>
                </m.div>
              </div>

              <div className="lg:col-span-5 lg:col-start-8">
                <m.p variants={swapItem} className="x-mono flex justify-between gap-4 text-smoke">
                  <span>{athlete ? 'Your path as an athlete' : 'Your path as an agency'}</span>
                  <span>01 — {pad2(side.steps.length)}</span>
                </m.p>
                <ol className="mt-5 border-t border-ink">
                  {side.steps.map((step, i) => (
                    <m.li
                      key={step}
                      variants={swapItem}
                      className="x-row grid grid-cols-[2.75rem_minmax(0,1fr)] items-baseline gap-3 border-b border-line py-6 sm:py-7"
                    >
                      <span className="x-mono text-(--x-accent)">{pad2(i + 1)}</span>
                      <span className="text-[1.1875rem] leading-snug font-medium tracking-[-0.025em] sm:text-[1.375rem]">
                        {step}
                      </span>
                    </m.li>
                  ))}
                </ol>
              </div>
            </m.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
