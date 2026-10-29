import { Suspense } from 'react'
import Link from 'next/link'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { homeFaqs } from '@/content/faqs'
import { Kicker, SplitText } from './primitives'

/** Questions widen when opened. */
export function Faq() {
  return (
    <section id="faq" aria-labelledby="k-faq" className="k-faq scroll-mt-20 py-24 sm:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Kicker n="08">FAQ</Kicker>
            <h2 id="k-faq" className="k-display k-scrub mt-8 max-w-[9ch] text-[clamp(3.25rem,8vw,8rem)]">
              <SplitText text="Questions, answered." />
            </h2>
            <p className="k-body mt-8 max-w-xs text-smoke">
              Still have a question?{' '}
              <Link href="/contact" className="k-link text-ink">
                Contact the team
              </Link>
              .
            </p>
          </div>
        </div>
        {/* Suspense lets React hydrate this below-the-fold widget in its own task. */}
        <Suspense>
          <Accordion type="single" collapsible className="lg:col-span-7">
            {homeFaqs.map((faq, i) => (
              <AccordionItem key={faq.q} value={`faq-${i}`}>
                <AccordionTrigger>{faq.q}</AccordionTrigger>
                <AccordionContent className="k-body max-w-2xl pb-7 text-smoke">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Suspense>
      </div>
    </section>
  )
}
