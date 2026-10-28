import { Suspense } from 'react'
import Link from 'next/link'
import { ArrowDown, ArrowRight, Check, Clapperboard, Database, ListChecks, Target } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AgencyForm } from '@/components/forms/agency-form'
import { BriefCard, ShortlistCard } from '@/components/graphics/cards'
import { Reveal } from '@/components/motion/reveal'
import { BenefitGrid, type Benefit } from '@/components/sections/benefit-grid'
import { CtaBand } from '@/components/sections/cta-band'
import { FaqSection } from '@/components/sections/faq-section'
import { PageHero } from '@/components/sections/page-hero'
import { ProcessSteps, type Step } from '@/components/sections/process-steps'
import { Accent, SectionHeading } from '@/components/sections/section-heading'
import { agencyFaqs } from '@/content/faqs'
import { ctas } from '@/content/site'
import { pageMetadata } from '@/lib/metadata'

export const metadata = pageMetadata({
  title: 'For Agencies',
  description:
    'Tell NIL what your campaign needs. Our team reviews your request and proposes student athletes and sports creators from our private database who fit your goals, sport and audience.',
  path: '/agencies',
})

const benefits: Benefit[] = [
  {
    icon: ListChecks,
    title: 'A shortlist, not a haystack',
    body: 'Instead of scrolling endless profiles, you get a considered set of athletes proposed by our team for your campaign.',
  },
  {
    icon: Target,
    title: 'Fit over follower count',
    body: 'We weigh sport, audience, content style and partnership interests against your goals — not just the size of a following.',
  },
  {
    icon: Database,
    title: 'Athletes who applied to NIL',
    body: 'Proposals come from NIL’s private athlete database: athletes and creators who signed up directly and were reviewed by our team.',
  },
  {
    icon: Clapperboard,
    title: 'Content support',
    body: 'Where your campaign needs it, we can help athletes shape on-brief content such as Instagram Reels.',
  },
]

const steps: Step[] = [
  {
    title: 'Send your request',
    body: 'Use the agency form to share your goals and the sports or athlete types you have in mind.',
  },
  {
    title: 'We review it',
    body: 'Our team reads your request and follows up by email to clarify scope, timing and deliverables.',
  },
  {
    title: 'We shortlist',
    body: 'We search NIL’s private athlete database and propose athletes who suit the campaign.',
  },
  {
    title: 'You choose',
    body: 'Review the proposals and decide who you’d like to work with. Nothing moves forward without your sign-off.',
  },
  {
    title: 'Activate',
    body: 'We help coordinate with the athletes you choose and, where needed, support content like Reels.',
  },
]

const briefChecklist = [
  ['Campaign goal', 'Awareness, a launch, an event, ongoing ambassadors…'],
  ['Sports or athlete types', 'Specific sports, women’s sports, creators — or ask us to recommend.'],
  ['Audience', 'Who you want to reach and on which platforms.'],
  ['Content', 'Posts, Reels, appearances — whatever the campaign needs.'],
  ['Timing', 'Launch windows or key dates, if you have them.'],
]

const afterSubmit = [
  'Our team reviews your request.',
  'We follow up by email to talk through goals and timing.',
  'If there’s a fit, we propose athletes from our database.',
]

export default function AgenciesPage() {
  return (
    <>
      <PageHero
        id="agencies"
        surface="surface-ultra"
        eyebrow="For agencies & brand teams"
        title={
          <>
            Athletes who <Accent>fit</Accent> the brief.
          </>
        }
        intro="Tell us what your campaign needs. Our team reviews your request, searches NIL’s private athlete database, and proposes student athletes and sports creators who suit your goals, sport and audience."
        actions={
          <>
            <Button asChild variant="chalk" size="lg">
              <Link href="#agency-signup">
                {ctas.agency.label} <ArrowDown aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="#process">See the process</Link>
            </Button>
          </>
        }
        visual={
          <div className="relative h-[24rem] w-full max-w-[24rem] sm:h-[27rem]">
            <BriefCard className="absolute top-0 left-0 -rotate-3 animate-rise" />
            <ShortlistCard index={1} className="absolute bottom-6 left-0 -rotate-6 animate-rise [animation-delay:200ms]" />
            <ShortlistCard index={2} className="absolute bottom-0 left-[7.5rem] rotate-2 animate-rise [animation-delay:320ms]" />
            <ShortlistCard index={3} className="absolute right-0 bottom-9 rotate-[8deg] animate-rise [animation-delay:440ms]" />
          </div>
        }
      />

      <section aria-labelledby="agency-benefits-title" className="py-20 sm:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <SectionHeading
              id="agency-benefits-title"
              eyebrow="What you get"
              eyebrowClassName="text-ultra"
              title="Less searching. Better fits."
              intro="NIL does the scouting so your team can focus on the campaign."
            />
          </Reveal>
          <BenefitGrid items={benefits} badgeClassName="bg-ultra text-white" className="lg:col-span-8" />
        </div>
      </section>

      <section id="process" aria-labelledby="agency-process-title" className="surface-ink py-20 sm:py-28">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              id="agency-process-title"
              eyebrow="How it works for agencies"
              eyebrowClassName="text-ultra-soft"
              title="From request to roster."
              intro="Five steps, handled by people. Timelines vary with campaign scope and athlete availability, so we’ll give you an honest read after reviewing your request."
            />
          </Reveal>
          <ProcessSteps steps={steps} numeralClassName="text-ultra-soft" className="mt-16" />
        </div>
      </section>

      <section aria-labelledby="brief-title" className="py-20 sm:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <SectionHeading
              id="brief-title"
              eyebrow="Before you start"
              eyebrowClassName="text-ultra"
              title={
                <>
                  Make your request easy to <Accent>match.</Accent>
                </>
              }
              intro="You don’t need everything figured out. The more of this you can share, the faster we can find the right athletes."
            />
          </Reveal>
          <Reveal className="lg:col-span-7" delay={0.1}>
            <ul className="divide-y-2 divide-ink/10 border-y-2 border-ink">
              {briefChecklist.map(([title, body]) => (
                <li key={title} className="flex gap-4 py-5">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-ultra text-white">
                    <Check className="size-4" strokeWidth={3} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold">{title}</h3>
                    <p className="mt-1 text-base text-smoke">{body}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-smoke">Budgets and contract terms aren’t part of this form.</p>
          </Reveal>
        </div>
      </section>

      <FaqSection faqs={agencyFaqs} eyebrow="Agency FAQ" className="bg-paper" />

      <section
        id="agency-signup"
        aria-labelledby="agency-signup-title"
        className="relative scroll-mt-16 border-t-2 border-ink py-20 sm:py-28"
      >
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="@container lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <p className="eyebrow text-ultra">Agency signup</p>
              <h2 id="agency-signup-title" className="display mt-4 text-[3.25rem] @sm:text-6xl @md:text-7xl">
                Partner with NIL.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-smoke">
                A few details about your agency and campaign. It’s a starting point, not a contract.
              </p>
              <h3 className="mt-10 text-base font-bold">What happens after you submit</h3>
              <ol className="mt-4 space-y-4">
                {afterSubmit.map((item, i) => (
                  <li key={item} className="flex gap-4">
                    <span className="numeral-outline text-4xl text-ultra" aria-hidden="true">
                      {i + 1}
                    </span>
                    <span className="pt-1 text-base leading-relaxed">{item}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-10 text-sm text-smoke">
                Are you an athlete?{' '}
                <Link href={ctas.athlete.href} className="font-semibold text-ink underline underline-offset-4">
                  Use the athlete form{' '}
                  <span className="whitespace-nowrap">
                    instead <ArrowRight className="inline size-3.5" aria-hidden="true" />
                  </span>
                </Link>
              </p>
            </div>
          </div>
          <div className="rounded-md border-2 border-ink bg-paper p-6 sm:p-10 lg:col-span-8">
            <Suspense>
              <AgencyForm />
            </Suspense>
          </div>
        </div>
      </section>

      <CtaBand only="athlete" heading="Are you an athlete?" />
    </>
  )
}
