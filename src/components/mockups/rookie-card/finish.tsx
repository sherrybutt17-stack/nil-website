import { Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/components/motion/reveal'
import { ContactEmail, Placeholder } from '@/components/mockups/sample-contact'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { closing, commitments, contentSupport, footer, proof } from '@/content/home'
import { homeFaqs } from '@/content/faqs'
import { campaignPosts, showEmptySlots } from '@/content/sample'
import { ctas, legal, site } from '@/content/site'
import { CardBackFace, ReelCard, TeamCardFace } from './cards'
import { GuillocheFrame, Seal } from './guilloche'
import { Wordmark } from './header'
import { homePath } from './nav'
import { Label, SectionHead, Slab } from './primitives'

/* -------------------------------------------------------------------------
   Commitments, set as a certificate
------------------------------------------------------------------------- */
export function Certificate() {
  return (
    <section aria-labelledby="rk-standards" className="pb-24 sm:pb-32">
      <div className="container-x">
        <Reveal>
          <div className="relative overflow-hidden rounded-[1.25rem] bg-paper px-6 py-14 shadow-[inset_0_0_0_1px_var(--rk-hair),var(--rk-shadow)] sm:px-14 sm:py-20 lg:px-20">
            <GuillocheFrame className="text-ultra/35" />
            <div className="relative grid gap-12 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-5">
                <SectionHead id="rk-standards" index="05" kicker={commitments.eyebrow} title={commitments.title} intro={commitments.intro} />
                <Seal className="mt-12 hidden w-40 text-ultra sm:block" />
              </div>
              <ol className="grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:col-span-7 lg:pt-2">
                {commitments.items.map((item, i) => (
                  <li key={item.title} className="border-t-[1.5px] border-ink pt-5">
                    <span className="rk-num text-[2.25rem] text-ultra">{String(i + 1).padStart(2, '0')}</span>
                    <h3 className="mt-3 text-[1.125rem] leading-snug font-bold tracking-[-0.01em]">{item.title}</h3>
                    <p className="mt-2 text-[0.9875rem] leading-relaxed text-ink/80">{item.body}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------
   Content support
------------------------------------------------------------------------- */
export function ContentSupport() {
  return (
    <section aria-labelledby="rk-content" className="overflow-x-clip bg-ink py-24 text-chalk [--focus:var(--color-flare)] sm:py-32">
      <div className="container-x grid items-center gap-16 lg:grid-cols-12">
        <Reveal className="order-2 flex justify-center lg:order-1 lg:col-span-5">
          <div className="relative isolate w-[min(64%,16rem)]">
            <span aria-hidden="true" className="absolute top-[14%] -right-[38%] -z-10 w-[62%] rotate-[9deg]">
              <CardBackFace tone="flare" label="Athlete card" className="shadow-[0_30px_60px_-24px_rgb(0_0_0/0.7)]" />
            </span>
            <ReelCard className="-rotate-[4deg]" />
          </div>
        </Reveal>
        <div className="order-1 lg:order-2 lg:col-span-7">
          <Reveal>
            <SectionHead
              id="rk-content"
              index="06"
              kicker={contentSupport.eyebrow}
              title={contentSupport.title}
              kickerClassName="text-chalk/70"
            />
            <p className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-chalk/80">{contentSupport.intro}</p>
          </Reveal>
          <ul className="mt-12 grid gap-px overflow-hidden rounded-[0.75rem] bg-chalk/15 sm:grid-cols-3">
            {contentSupport.items.map((item, i) => (
              <li key={item.title} className="bg-ink p-5 sm:p-6">
                <Reveal delay={i * 0.06}>
                  <Label className="text-flare">{String(i + 1).padStart(2, '0')}</Label>
                  <h3 className="mt-4 text-[1.0625rem] font-bold">{item.title}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-chalk/75">{item.body}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------
   The work: empty slabs until real, permitted posts exist
------------------------------------------------------------------------- */
export function Work() {
  if (campaignPosts.length === 0 && !showEmptySlots) return null
  return (
    <section aria-labelledby="rk-work" className="py-24 sm:py-32">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <SectionHead id="rk-work" index="07" kicker={proof.workEyebrow} title={proof.workTitle} />
          </Reveal>
          {campaignPosts.length === 0 && (
            <Reveal className="lg:col-span-5" delay={0.06}>
              <p className="max-w-sm text-sm leading-relaxed text-smoke lg:ml-auto">{proof.workPlaceholder}</p>
            </Reveal>
          )}
        </div>
        <ul className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {campaignPosts.length > 0
            ? campaignPosts.map((post) => (
                <li key={post.href}>
                  <a href={post.href} target="_blank" rel="noopener" className="block">
                    <Slab title="Campaign post" status="Live">
                      <Image
                        src={post.image}
                        alt={post.alt}
                        width={360}
                        height={640}
                        sizes="(min-width: 1024px) 16vw, (min-width: 640px) 33vw, 50vw"
                        className="aspect-[9/16] w-full rounded-[0.625rem] object-cover"
                      />
                    </Slab>
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))
            : Array.from({ length: 6 }, (_, i) => (
                <li key={i}>
                  <Reveal delay={i * 0.05}>
                    <Slab title="Campaign post" status="Empty" sweep={false}>
                      <div className="rk-label grid aspect-[9/16] place-items-center rounded-[0.625rem] border-[1.5px] border-dashed border-smoke/50 text-[0.625rem] text-smoke">
                        [Campaign post]
                      </div>
                    </Slab>
                  </Reveal>
                </li>
              ))}
        </ul>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------
   FAQ
------------------------------------------------------------------------- */
export function Faq() {
  return (
    <section id="faq" aria-labelledby="rk-faq" className="border-t border-[var(--rk-hair)] py-24 sm:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHead id="rk-faq" index="08" kicker="FAQ" title="Questions, answered." />
          <p className="mt-6 text-[1rem] text-smoke">
            Still have a question?{' '}
            <Link href="/contact" className="rk-link font-semibold text-ink">
              Contact the team
            </Link>
            .
          </p>
        </div>
        {/* Suspense lets React hydrate this below-the-fold widget in its own task. */}
        <Suspense>
          <Accordion type="single" collapsible className="rk-faq lg:col-span-8">
            {homeFaqs.map((faq, i) => (
              <AccordionItem key={faq.q} value={`faq-${i}`}>
                <AccordionTrigger className="gap-5 text-[1.0625rem] sm:text-[1.1875rem]">
                  <span className="flex items-baseline gap-5">
                    <span className="rk-num w-8 shrink-0 text-[1.375rem] text-ultra">{String(i + 1).padStart(2, '0')}</span>
                    <span>{faq.q}</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pl-[3.25rem] text-ink/80 opacity-100">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Suspense>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------
   Closing
------------------------------------------------------------------------- */
export function Closing() {
  const [lead, last] = [closing.title.slice(0, closing.title.lastIndexOf(' ') + 1), closing.title.slice(closing.title.lastIndexOf(' ') + 1)]
  return (
    <section aria-labelledby="rk-close" className="overflow-x-clip pb-24 sm:pb-32">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-[1.25rem] bg-paper px-6 pt-16 pb-12 shadow-[inset_0_0_0_1px_var(--rk-hair),var(--rk-shadow)] sm:px-12 lg:px-16 lg:py-20">
          <div className="grid items-center gap-14 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <h2 id="rk-close" className="rk-display text-[clamp(2.4rem,1.4rem+3.4vw,4.75rem)]">
                {lead}
                <span className="rk-foil-text rk-foil-text--view">{last}</span>
              </h2>
              <p className="mt-6 max-w-md text-[1.0625rem] leading-relaxed text-ink/80">{closing.body}</p>
              <div className="mt-9 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
                <Link href={ctas.agency.href} className="rk-btn rk-btn--ultra">
                  {ctas.agency.label} <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
                <Link href={ctas.athlete.href} className="rk-btn rk-btn--flare">
                  {ctas.athlete.label} <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
                <Link href="/contact" className="rk-btn rk-btn--outline">
                  {closing.contactLabel} <ArrowUpRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
            <div aria-hidden="true" className="relative mx-auto h-[19rem] w-full max-w-[30rem] sm:h-[24rem] lg:col-span-6">
              <div className="rk-fan absolute inset-x-0 bottom-0 mx-auto grid w-[42%] max-w-[12.5rem] [&>*]:col-start-1 [&>*]:row-start-1">
                <CardBackFace tone="flare" label="Athlete card" className="shadow-[var(--rk-shadow)]" />
                <TeamCardFace className="shadow-[var(--rk-shadow)]" />
                <CardBackFace tone="ultra" label="Campaign brief" className="shadow-[var(--rk-shadow)]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------
   Footer
------------------------------------------------------------------------- */
const columns = [
  {
    title: 'Athletes',
    links: [
      { href: '/athletes', label: 'How it works' },
      { href: '/athletes#faq', label: 'Athlete FAQ' },
      { href: ctas.athlete.href, label: ctas.athlete.label },
    ],
  },
  {
    title: 'Agencies',
    links: [
      { href: '/agencies', label: 'How it works' },
      { href: '/agencies#faq', label: 'Agency FAQ' },
      { href: ctas.agency.href, label: ctas.agency.label },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: '/contact', label: 'Contact' },
      { href: legal.privacyPath, label: 'Privacy policy' },
    ],
  },
]

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="relative overflow-hidden bg-ink text-chalk [--focus:var(--color-flare)]">
      <div className="container-x pt-20 pb-10">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href={homePath} className="inline-block rounded-[0.375rem] [&_.text-smoke]:text-chalk/60">
              <Wordmark />
            </Link>
            <p className="mt-5 max-w-sm text-[0.9375rem] leading-relaxed text-chalk/75">{footer.blurb}</p>
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-5">
            {columns.map((column) => (
              <div key={column.title}>
                <h2 className="rk-label text-chalk/60">{column.title}</h2>
                <ul className="mt-4 space-y-1">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="inline-flex min-h-10 items-center text-[0.9375rem] text-chalk/85 underline-offset-4 hover:text-chalk hover:underline"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
          <div className="lg:col-span-3">
            <h2 className="rk-label text-chalk/60">Get in touch</h2>
            <ul className="mt-4 space-y-3 text-[0.9375rem] text-chalk/85">
              <li>
                <ContactEmail className="underline decoration-chalk/40 underline-offset-4 hover:decoration-chalk" />
              </li>
              <li>{site.contact.location ?? <Placeholder label="City / region" />}</li>
              {site.social.length > 0 ? (
                site.social.map((social) => (
                  <li key={social.href}>
                    <a href={social.href} rel="me noopener" target="_blank" className="hover:underline">
                      {social.label}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                ))
              ) : (
                <li>
                  <Placeholder label="Social profile links" />
                </li>
              )}
            </ul>
          </div>
        </div>
        <div className="mt-16 flex flex-col gap-3 border-t border-chalk/15 pt-6 text-sm text-chalk/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p>{footer.signoff}</p>
        </div>
      </div>
      {/* Decorative wordmark, drawn via CSS content so it isn't read or contrast-checked as text. */}
      <div
        aria-hidden="true"
        className="rk-wordmark rk-display pointer-events-none -mb-[0.18em] text-center text-[14.5vw] leading-[0.8] whitespace-nowrap text-chalk/[0.05] select-none"
      />
    </footer>
  )
}
