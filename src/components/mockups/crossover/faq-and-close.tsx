'use client'

import { Suspense } from 'react'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { AnimatePresence } from 'motion/react'
import * as m from 'motion/react-m'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { closing } from '@/content/home'
import { agencyFaqs, athleteFaqs, homeFaqs, type Faq } from '@/content/faqs'
import { ctas } from '@/content/site'
import { GlyphO, GlyphX } from './glyphs'
import { pad2, SectionIndex, swap, swapItem } from './parts'
import { useView } from './view-store'

// Restyles the shared accordion trigger: tighter type and a square, side-coloured toggle.
const triggerClass = [
  'py-[1.375rem] text-[1.0625rem] font-semibold tracking-[-0.018em] sm:text-[1.125rem]',
  '[&>span]:size-8 [&>span]:rounded-[0.3125rem] [&>span]:border [&>span]:border-line',
  '[&>span]:transition-[transform,background-color,border-color,color] [&>span]:duration-400',
  'hover:[&>span]:border-(--x-fill) hover:[&>span]:bg-(--x-fill) hover:[&>span]:text-(--x-on-fill)',
  'data-[state=open]:[&>span]:border-(--x-fill) data-[state=open]:[&>span]:bg-(--x-fill) data-[state=open]:[&>span]:text-(--x-on-fill)',
].join(' ')

function FaqGroup({ label, faqs, id }: { label: string; faqs: Faq[]; id: string }) {
  return (
    <div>
      <p className="x-mono flex justify-between gap-4 pb-4 text-smoke">
        <span className="text-ink">{label}</span>
        <span>{pad2(faqs.length)} questions</span>
      </p>
      {/* Suspense lets React hydrate the accordion in its own task, as on the live FAQ. */}
      <Suspense>
        <Accordion type="single" collapsible>
          {faqs.map((faq, i) => (
            <AccordionItem key={faq.q} value={`${id}-${i}`} className="border-b border-line first:border-t">
              <AccordionTrigger className={triggerClass}>{faq.q}</AccordionTrigger>
              <AccordionContent className="pr-12 text-smoke opacity-100">{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Suspense>
    </div>
  )
}

/** 07: the side's own questions first, then the general ones. */
export function Faqs() {
  const view = useView()
  const agency = view === 'agencies'

  return (
    <section id="faq" aria-labelledby="x-faq-title">
      <div className="x-wrap x-ruled">
        <div className="x-pad py-20 sm:py-28 lg:py-32">
          <SectionIndex n="07" label="FAQ" />
          <div className="mt-14 grid gap-12 sm:mt-20 lg:grid-cols-12 lg:gap-6">
            <div className="lg:col-span-4">
              <h2 id="x-faq-title" className="x-h2 max-w-[9ch]">
                Questions, answered.
              </h2>
              <p className="x-body mt-7 max-w-xs">
                Still have a question?{' '}
                <Link href="/contact" className="x-link font-medium text-ink">
                  Contact the team
                </Link>
                .
              </p>
            </div>
            <div className="space-y-14 lg:col-span-7 lg:col-start-6">
              <AnimatePresence mode="wait" initial={false}>
                <m.div key={view} variants={swap} initial="hidden" animate="show" exit="exit" className="lg:min-h-[27rem]">
                  <m.div variants={swapItem}>
                    <FaqGroup
                      id={view}
                      label={agency ? 'For agencies' : 'For athletes'}
                      faqs={agency ? agencyFaqs : athleteFaqs}
                    />
                  </m.div>
                </m.div>
              </AnimatePresence>
              <FaqGroup id="general" label="General" faqs={homeFaqs} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/** 08: the closing band takes the side's colour and offers a quiet way across. */
export function Closing() {
  const view = useView()
  const agency = view === 'agencies'
  const cta = agency ? ctas.agency : ctas.athlete
  const other = agency ? ctas.athlete : ctas.agency
  const Glyph = agency ? GlyphX : GlyphO

  return (
    <section aria-labelledby="x-close-title">
      <div className="x-wrap x-ruled">
        <div className="relative isolate overflow-hidden bg-(--x-fill) text-(--x-on-fill) [--focus:var(--x-fill-focus)]">
          <Glyph
            key={view}
            className="x-fade pointer-events-none absolute -right-[12%] -bottom-[28%] -z-10 aspect-square w-[min(90vw,44rem)] opacity-30 [--i:-4] lg:-right-[4%]"
            strokeWidth={1.25}
          />
          <div className="x-pad py-20 sm:py-28 lg:py-36">
            <p className="x-mono">08 — Your move</p>
            <h2 id="x-close-title" className="x-h1 mt-10 max-w-[11ch] text-[clamp(2.75rem,0.9rem+6.6vw,8.5rem)] text-balance">
              {closing.title}
            </h2>
            <p className="mt-8 max-w-lg text-lg leading-relaxed text-pretty">{closing.body}</p>
            <div className="mt-12 flex flex-wrap gap-3">
              <Link href={cta.href} className="x-btn x-btn--cta x-btn--lg">
                {cta.label}
                <ArrowRight aria-hidden="true" />
              </Link>
              <Link href="/contact" className="x-btn x-btn--line x-btn--lg">
                {closing.contactLabel}
                <ArrowUpRight aria-hidden="true" />
              </Link>
            </div>
            <p className="mt-10 text-[0.9375rem]">
              {agency ? 'Not an agency?' : 'Not an athlete?'}{' '}
              <Link href={other.href} className="x-link font-semibold">
                {other.label}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
