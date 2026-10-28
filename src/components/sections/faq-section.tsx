import { Suspense } from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { SectionHeading } from '@/components/sections/section-heading'
import type { Faq } from '@/content/faqs'
import { cn } from '@/lib/utils'

type FaqSectionProps = {
  faqs: Faq[]
  title?: React.ReactNode
  eyebrow?: string
  aside?: React.ReactNode
  className?: string
}

export function FaqSection({ faqs, title = 'Questions, answered.', eyebrow = 'FAQ', aside, className }: FaqSectionProps) {
  return (
    <section id="faq" aria-labelledby="faq-title" className={cn('py-20 sm:py-28', className)}>
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading id="faq-title" eyebrow={eyebrow} title={title} />
          {aside && <div className="mt-8">{aside}</div>}
        </div>
        {/* Suspense lets React hydrate this below-the-fold widget in its own task. */}
        <Suspense>
          <Accordion type="single" collapsible className="lg:col-span-8">
            {faqs.map((faq, i) => (
              <AccordionItem key={faq.q} value={`faq-${i}`}>
                <AccordionTrigger>{faq.q}</AccordionTrigger>
                <AccordionContent>{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Suspense>
      </div>
    </section>
  )
}
