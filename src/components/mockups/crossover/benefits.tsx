'use client'

import { AnimatePresence } from 'motion/react'
import * as m from 'motion/react-m'
import { contentSupport, reasons, sides } from '@/content/home'
import { GlyphCheck } from './glyphs'
import { pad2, SectionIndex, swap, swapItem } from './parts'
import { useView } from './view-store'

/** 03: a spec sheet. Agencies see why athletes work for brands; athletes see the content support. */
export function Benefits() {
  const view = useView()
  const agency = view === 'agencies'
  const sheet = agency
    ? { label: 'Why athletes', eyebrow: reasons.eyebrow, title: reasons.title, intro: null, rows: reasons.items, code: 'R', column: 'Reason' }
    : {
        label: 'What we add',
        eyebrow: contentSupport.eyebrow,
        title: contentSupport.title,
        intro: contentSupport.intro,
        rows: contentSupport.items,
        code: 'C',
        column: 'Support',
      }
  const points = agency ? sides.agency.points : sides.athlete.points

  return (
    <section aria-labelledby="x-benefits-title" className="bg-paper">
      <div className="x-wrap x-ruled">
        <div className="x-pad py-20 sm:py-28 lg:py-32">
          <SectionIndex n="03" label={sheet.label} note="Spec sheet" />
          <AnimatePresence mode="wait" initial={false}>
            <m.div
              key={view}
              variants={swap}
              initial="hidden"
              animate="show"
              exit="exit"
              className="mt-14 grid gap-14 sm:mt-20 lg:min-h-[32rem] lg:grid-cols-12 lg:gap-6"
            >
              <div className="lg:col-span-5">
                <m.p variants={swapItem} className="x-mono text-(--x-accent)">
                  {sheet.eyebrow}
                </m.p>
                <m.h2 variants={swapItem} id="x-benefits-title" className="x-h2 mt-6 max-w-[12ch]">
                  {sheet.title}
                </m.h2>
                {sheet.intro && (
                  <m.p variants={swapItem} className="x-lead mt-7 max-w-md">
                    {sheet.intro}
                  </m.p>
                )}
                <m.div variants={swapItem} className="mt-12 max-w-md">
                  <p className="x-mono text-smoke">{agency ? 'What agencies get' : 'What athletes get'}</p>
                  <ul className="mt-4 border-t border-line">
                    {points.map((point) => (
                      <li key={point} className="flex gap-3 border-b border-line py-3 text-[0.9375rem] leading-snug">
                        <GlyphCheck className="mt-px shrink-0 text-(--x-accent)" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </m.div>
              </div>

              <div className="lg:col-span-6 lg:col-start-7">
                <m.div
                  variants={swapItem}
                  aria-hidden="true"
                  className="x-mono hidden grid-cols-[4rem_minmax(0,0.85fr)_minmax(0,1.3fr)] gap-6 pb-3 text-smoke sm:grid"
                >
                  <span>No.</span>
                  <span>{sheet.column}</span>
                  <span>Detail</span>
                </m.div>
                <ul className="border-t border-ink">
                  {sheet.rows.map((row, i) => (
                    <m.li
                      key={row.title}
                      variants={swapItem}
                      className="x-row grid gap-2 border-b border-line py-7 sm:grid-cols-[4rem_minmax(0,0.85fr)_minmax(0,1.3fr)] sm:gap-6 sm:py-8"
                    >
                      <span className="x-mono pt-1 text-(--x-accent)">
                        {sheet.code}.{pad2(i + 1)}
                      </span>
                      <h3 className="x-h3 sm:text-[1.3125rem]">{row.title}</h3>
                      <p className="x-body">{row.body}</p>
                    </m.li>
                  ))}
                </ul>
              </div>
            </m.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
