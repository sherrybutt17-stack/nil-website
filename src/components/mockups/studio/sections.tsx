import { Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Reveal } from '@/components/motion/reveal'
import { closing, commitments, contentSupport, mission, proof } from '@/content/home'
import { homeFaqs } from '@/content/faqs'
import { campaignPosts, partners, showEmptySlots } from '@/content/sample'
import { ctas } from '@/content/site'
import { MagneticLink } from './magnetic'
import { BriefReel } from './reel'
import { InViewFlag, MaskLines, Rule } from './reveal'

function Kicker({ index, children, className }: { index: string; children: React.ReactNode; className?: string }) {
  return (
    <p className={`st-label ${className ?? ''}`}>
      <span className="tabular-nums">({index})</span> {children}
    </p>
  )
}

export function PartnersStrip() {
  if (partners.length === 0 && !showEmptySlots) return null
  return (
    <section aria-labelledby="st-partners-title" className="st-partners">
      <div className="st-wrap">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
          <h2 id="st-partners-title" className="st-label">
            {proof.partnersTitle}
          </h2>
          {partners.length === 0 && <p className="max-w-md text-sm text-ink/65 sm:text-right">{proof.partnersPlaceholder}</p>}
        </div>
        <ul className="st-partners__row">
          {partners.length > 0
            ? partners.map((partner) => (
                <li key={partner.name}>
                  <Image src={partner.logo} alt={partner.name} width={140} height={48} className="max-h-10 w-auto max-w-full object-contain" />
                </li>
              ))
            : Array.from({ length: 6 }, (_, i) => (
                <li key={i} className="st-slot">
                  [Partner logo]
                </li>
              ))}
        </ul>
      </div>
    </section>
  )
}

export function Mission() {
  return (
    <section aria-labelledby="st-mission-title" className="st-section">
      <div className="st-wrap grid gap-10 lg:grid-cols-12">
        <Kicker index="01" className="lg:col-span-3">
          {mission.eyebrow}
        </Kicker>
        <div className="lg:col-span-9">
          <h2 id="st-mission-title" className="st-statement">
            <MaskLines
              lines={[
                <span key="l1">
                  Where <em className="st-accent">{mission.statement.game}</em> meets
                </span>,
                <span key="l2">
                  <span className="text-ultra">{mission.statement.brand}</span>, and{' '}
                  <span className="text-flare-deep">{mission.statement.people}</span>
                </span>,
                'make the call.',
              ]}
            />
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-9">
            <Reveal className="md:col-span-5 md:col-start-5">
              <p className="text-lg leading-relaxed text-pretty text-ink/80 sm:text-xl">{mission.body}</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

export function ContentSupport() {
  return (
    <section aria-labelledby="st-content-title" className="st-section st-section--ink" data-cursor-tone="chalk">
      <div className="st-wrap grid gap-10 lg:grid-cols-12">
        <Kicker index="05" className="text-chalk/70 lg:col-span-3">
          {contentSupport.eyebrow}
        </Kicker>
        <div className="lg:col-span-9">
          <h2 id="st-content-title" className="st-h2">
            <MaskLines lines={['Content that', <em key="l" className="st-accent text-flare">lands.</em>]} />
          </h2>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-pretty text-chalk/80 sm:text-xl">{contentSupport.intro}</p>
          <ul className="mt-14 grid gap-px overflow-hidden rounded-[18px] bg-chalk/15 sm:grid-cols-3">
            {contentSupport.items.map((item, i) => (
              <li key={item.title} className="bg-ink p-6 sm:p-7">
                <span className="st-label tabular-nums text-chalk/55">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-10 text-2xl font-medium tracking-[-0.02em]">{item.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-chalk/75">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-20 sm:mt-28">
        <BriefReel />
      </div>
    </section>
  )
}

export function Commitments() {
  return (
    <section aria-labelledby="st-trust-title" className="st-section">
      <div className="st-wrap">
        <div className="grid gap-8 lg:grid-cols-12">
          <Kicker index="06" className="lg:col-span-3">
            {commitments.eyebrow}
          </Kicker>
          <div className="lg:col-span-9">
            <h2 id="st-trust-title" className="st-h2">
              <MaskLines lines={['What you can', <em key="c" className="st-accent">count on.</em>]} />
            </h2>
            <p className="mt-6 max-w-xl text-lg text-ink/75">{commitments.intro}</p>
          </div>
        </div>
        <ol className="mt-16 sm:mt-24">
          {commitments.items.map((item, i) => (
            <li key={item.title} className="st-commit">
              <Rule />
              <div className="st-commit__row">
                <span className="st-label tabular-nums text-ink/65">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="st-commit__title">
                  <MaskLines lines={[item.title]} />
                </h3>
                <Reveal className="st-commit__body" delay={0.1}>
                  <p>{item.body}</p>
                </Reveal>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export function TheWork() {
  if (campaignPosts.length === 0 && !showEmptySlots) return null
  return (
    <section aria-labelledby="st-work-title" className="st-section st-section--tight">
      <div className="st-wrap">
        <div className="grid gap-8 lg:grid-cols-12">
          <Kicker index="07" className="lg:col-span-3">
            {proof.workEyebrow}
          </Kicker>
          <div className="flex flex-col justify-between gap-6 lg:col-span-9 lg:flex-row lg:items-end">
            <h2 id="st-work-title" className="st-h2">
              <MaskLines lines={[proof.workTitle]} />
            </h2>
            {campaignPosts.length === 0 && <p className="max-w-xs text-sm text-ink/65">{proof.workPlaceholder}</p>}
          </div>
        </div>
        <ul className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {campaignPosts.length > 0
            ? campaignPosts.map((post) => (
                <li key={post.href}>
                  <a href={post.href} target="_blank" rel="noopener" className="block overflow-hidden rounded-[14px]" data-cursor-text="Open">
                    <Image src={post.image} alt={post.alt} width={360} height={640} className="aspect-[9/16] w-full object-cover" />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))
            : Array.from({ length: 6 }, (_, i) => (
                <li key={i} className="st-slot st-slot--post">
                  <span className="st-label tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                  <span>[Campaign post]</span>
                </li>
              ))}
        </ul>
      </div>
    </section>
  )
}

export function Faq() {
  return (
    <section id="faq" aria-labelledby="st-faq-title" className="st-section">
      <div className="st-wrap grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Kicker index="08">FAQ</Kicker>
          <h2 id="st-faq-title" className="st-h2 mt-8">
            <MaskLines lines={['Questions,', <em key="a" className="st-accent">answered.</em>]} />
          </h2>
          <p className="mt-8 text-base text-ink/70">
            Still have a question?{' '}
            <Link href="/contact" className="st-link st-link--line font-medium text-ink">
              Contact the team
            </Link>
            .
          </p>
        </div>
        {/* Suspense lets React hydrate this below-the-fold widget in its own task. */}
        <Suspense>
          <Accordion type="single" collapsible className="st-faq lg:col-span-8">
            {homeFaqs.map((faq, i) => (
              <AccordionItem key={faq.q} value={`faq-${i}`}>
                <AccordionTrigger data-cursor-text="Read">
                  <span className="flex gap-5">
                    <span className="st-label mt-2.5 tabular-nums text-ink/65">{String(i + 1).padStart(2, '0')}</span>
                    <span>{faq.q}</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pl-11">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Suspense>
      </div>
    </section>
  )
}

export function Closing() {
  return (
    <section aria-labelledby="st-close-title" className="st-closing" data-cursor-tone="chalk">
      <div className="st-wrap">
        <p className="st-label text-chalk/65">
          <span className="tabular-nums">(09)</span> Two short signups. One team reviewing both.
        </p>
        <InViewFlag className="st-leak mt-10">
          <h2 id="st-close-title" className="st-closing__title">
            Ready to make a <em className="st-accent">play?</em>
          </h2>
        </InViewFlag>
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-chalk/80">{closing.body}</p>

        <ul className="st-closing__rows">
          <li>
            <Link href={ctas.athlete.href} className="st-bigrow st-bigrow--flare" data-cursor-text="Apply">
              <span className="st-label tabular-nums">A</span>
              <span className="st-bigrow__text">{ctas.athlete.label}</span>
              <span className="st-bigrow__arrow" aria-hidden="true">
                →
              </span>
            </Link>
          </li>
          <li>
            <Link href={ctas.agency.href} className="st-bigrow st-bigrow--ultra" data-cursor-text="Brief us">
              <span className="st-label tabular-nums">B</span>
              <span className="st-bigrow__text">{ctas.agency.label}</span>
              <span className="st-bigrow__arrow" aria-hidden="true">
                →
              </span>
            </Link>
          </li>
        </ul>
        <div className="mt-10">
          <MagneticLink href="/contact" variant="ghost-light" arrow="up">
            {closing.contactLabel}
          </MagneticLink>
        </div>
      </div>
    </section>
  )
}
