import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Check, EyeOff, Handshake, ShieldQuestion, UserCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { BriefCard, ProfileCard } from '@/components/graphics/cards'
import { FieldLines } from '@/components/graphics/field-lines'
import { MatchStamp } from '@/components/graphics/match-stamp'
import { Playbook } from '@/components/graphics/playbook'
import { ReelFrame } from '@/components/graphics/reel-frame'
import { Reveal } from '@/components/motion/reveal'
import { BenefitGrid, type Benefit } from '@/components/sections/benefit-grid'
import { CategoryStrip } from '@/components/sections/category-strip'
import { CtaBand } from '@/components/sections/cta-band'
import { FaqSection } from '@/components/sections/faq-section'
import { ProcessSteps, type Step } from '@/components/sections/process-steps'
import { Accent, SectionHeading } from '@/components/sections/section-heading'
import { homeFaqs } from '@/content/faqs'
import { ctas } from '@/content/site'

/*
 * The first homepage design ("We scout the match"), kept for reference after the
 * campaign-led homepage replaced it. Not linked from the site, excluded from search.
 */

export const metadata: Metadata = {
  title: 'Original homepage (reference)',
  robots: { index: false, follow: false },
}

const steps: Step[] = [
  {
    title: 'Sign up',
    body: 'Athletes and agencies each use their own short form. No passwords, no sensitive documents.',
  },
  {
    title: 'We review',
    body: 'Our team reads every athlete profile and every agency request. Athlete profiles are kept in our private database.',
  },
  {
    title: 'We match',
    body: 'When a campaign comes in, we look for athletes whose sport, audience and style suit it — and propose them.',
  },
  {
    title: 'You activate',
    body: 'Once both sides agree, the campaign goes live. Where it helps, we support branding and content like Reels.',
  },
]

const commitments: Benefit[] = [
  {
    icon: UserCheck,
    title: 'People review every submission',
    body: 'No auto-accept, no bulk outreach. A person on our team reads each athlete profile and agency request.',
  },
  {
    icon: EyeOff,
    title: 'Your details stay private',
    body: 'Submissions go to our team only. We never publish athlete profiles or agency requests on this site.',
  },
  {
    icon: Handshake,
    title: 'You decide',
    body: 'Athletes and agencies choose which partnerships move forward. Nothing goes ahead without your agreement.',
  },
  {
    icon: ShieldQuestion,
    title: 'No guaranteed deals',
    body: 'Not every profile or request leads to a match, and we won’t pretend otherwise. We reach out when the fit is real.',
  },
]

const athletePoints = [
  'Your profile reviewed by a real person',
  'Considered for campaigns that suit your sport and audience',
  'Support with branding and short-form content',
  'You choose which opportunities to take',
]

const agencyPoints = [
  'Your request reviewed by our team',
  'Athletes proposed from our private database',
  'Fit weighed over follower count',
  'Help with athlete content where you need it',
]


export default function OriginalHomePage() {
  return (
    <>
      <div className="border-b-2 border-dashed border-ink bg-paper">
        <p className="container-x py-2.5 text-center text-sm font-semibold">
          Reference copy of the original homepage. Not linked from the site.{' '}
          <Link href="/" className="underline underline-offset-4">
            Go to the current homepage
          </Link>
        </p>
      </div>

      {/* Hero */}
      <section aria-labelledby="home-title" className="surface-ink relative isolate overflow-hidden">
        <FieldLines id="home-hero" className="-z-10 opacity-[0.07]" />
        <div className="container-x grid items-center gap-14 pt-12 pb-20 sm:pt-16 lg:grid-cols-12 lg:gap-6 lg:pt-20 lg:pb-28">
          <div className="lg:col-span-7">
            <p className="eyebrow flex items-center gap-3 text-chalk/80">
              <span className="h-[3px] w-8 bg-flare" aria-hidden="true" />
              Sports NIL partnerships · Matched by people
            </p>
            <h1 id="home-title" className="display mt-6 text-[3.9rem] xs:text-[4.6rem] sm:text-8xl lg:text-[7.5rem] xl:text-[9rem]">
              We scout the <Accent className="text-flare">match.</Accent>
              <br />
              You make the play.
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-chalk/85 text-pretty sm:text-xl">
              Real NIL Agency connects student athletes and sports creators with agencies running brand campaigns. Our team reviews
              every profile and every request, then proposes partnerships that fit both sides.
            </p>
            <div className="mt-10 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
              <Button asChild variant="athlete" size="lg">
                <Link href={ctas.athlete.href}>
                  {ctas.athlete.label} <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild variant="agency" size="lg">
                <Link href={ctas.agency.href}>
                  {ctas.agency.label} <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
            </div>
            <p className="mt-5 text-sm text-chalk/65">Two separate signups. One team reviewing both.</p>
          </div>

          <div className="relative mx-auto h-[27rem] w-full max-w-[25rem] sm:h-[31rem] sm:max-w-[30rem] lg:col-span-5 lg:max-w-none">
            <BriefCard className="absolute top-0 right-0 rotate-[5deg] animate-rise [animation-delay:250ms]" />
            <ProfileCard className="absolute bottom-0 left-0 -rotate-[4deg] animate-rise [animation-delay:100ms]" />
            <MatchStamp className="absolute top-[56%] left-[78%] -translate-x-1/2 -translate-y-1/2 animate-drop-in [animation-delay:600ms] sm:top-[44%] sm:left-1/2" />
          </div>
        </div>
      </section>

      <CategoryStrip />

      {/* Two paths */}
      <section aria-labelledby="sides-title" className="py-20 sm:py-28">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              id="sides-title"
              eyebrow="Two sides, one playbook"
              eyebrowClassName="text-flare-deep"
              title={
                <>
                  Pick your <Accent>side.</Accent>
                </>
              }
              intro="Real NIL Agency works with both sides of every partnership. Choose the path that fits you — each has its own signup and its own process."
            />
          </Reveal>
          <div className="mt-14 grid gap-4 md:grid-cols-2">
            <Reveal className="h-full">
              <article className="surface-flare flex h-full flex-col rounded-md p-8 sm:p-10">
                <p className="eyebrow">For athletes & sports creators</p>
                <h3 className="display mt-5 text-5xl sm:text-6xl">Turn your game into partnerships that fit.</h3>
                <ul className="mt-8 space-y-3 text-[1.0625rem]">
                  {athletePoints.map((point) => (
                    <li key={point} className="flex gap-3">
                      <Check className="mt-0.5 size-5 shrink-0" aria-hidden="true" strokeWidth={3} />
                      {point}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex flex-col gap-4 pt-10 xs:flex-row xs:items-center">
                  <Button asChild variant="ink">
                    <Link href={ctas.athlete.href}>
                      {ctas.athlete.label} <ArrowRight aria-hidden="true" />
                    </Link>
                  </Button>
                  <Link href="/athletes" className="font-semibold underline decoration-2 underline-offset-4">
                    How it works for athletes
                  </Link>
                </div>
              </article>
            </Reveal>
            <Reveal className="h-full" delay={0.1}>
              <article className="surface-ultra flex h-full flex-col rounded-md p-8 sm:p-10">
                <p className="eyebrow">For agencies & brand teams</p>
                <h3 className="display mt-5 text-5xl sm:text-6xl">Brief us once. Meet athletes who fit.</h3>
                <ul className="mt-8 space-y-3 text-[1.0625rem]">
                  {agencyPoints.map((point) => (
                    <li key={point} className="flex gap-3">
                      <Check className="mt-0.5 size-5 shrink-0" aria-hidden="true" strokeWidth={3} />
                      {point}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex flex-col gap-4 pt-10 xs:flex-row xs:items-center">
                  <Button asChild variant="chalk">
                    <Link href={ctas.agency.href}>
                      {ctas.agency.label} <ArrowRight aria-hidden="true" />
                    </Link>
                  </Button>
                  <Link href="/agencies" className="font-semibold underline decoration-2 underline-offset-4">
                    How it works for agencies
                  </Link>
                </div>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Process */}
      <section aria-labelledby="process-title" className="surface-ink relative overflow-hidden py-20 sm:py-28">
        <div className="container-x">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <SectionHeading
                id="process-title"
                eyebrow="How it works"
                eyebrowClassName="text-flare"
                title={
                  <>
                    Every match is drawn up by <Accent className="text-flare">hand.</Accent>
                  </>
                }
                intro="No instant algorithm, no mass inbox. Here’s what actually happens between signing up and going live."
              />
            </Reveal>
            <Reveal className="lg:col-span-7" delay={0.1}>
              <Playbook className="w-full text-chalk" />
            </Reveal>
          </div>
          <ProcessSteps steps={steps} numeralClassName="text-flare" className="mt-16 sm:mt-20" />
          <Reveal>
            <p className="mt-14 max-w-3xl border-l-4 border-flare pl-5 text-lg leading-relaxed text-chalk/85">
              Matching is done by people, so it isn’t instant. Timing depends on each campaign and on athlete
              availability — we’ll keep you posted rather than promise a date we can’t control.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Commitments */}
      <section aria-labelledby="trust-title" className="py-20 sm:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <SectionHeading
              id="trust-title"
              eyebrow="Straight talk"
              eyebrowClassName="text-ultra"
              title="What you can count on."
              intro="Clear expectations on both sides make for better partnerships."
            />
          </Reveal>
          <BenefitGrid items={commitments} badgeClassName="bg-ink text-chalk" className="lg:col-span-8" />
        </div>
      </section>

      {/* Content support */}
      <section aria-labelledby="content-title" className="relative overflow-hidden bg-paper py-20 sm:py-28">
        <div className="container-x grid items-center gap-14 lg:grid-cols-12">
          <Reveal className="order-2 flex justify-center lg:order-1 lg:col-span-5">
            <div className="relative">
              <div aria-hidden="true" className="absolute -inset-10 -z-0 rounded-full bg-flare/15 blur-3xl" />
              <ReelFrame className="relative rotate-[-3deg]" />
            </div>
          </Reveal>
          <div className="order-1 lg:order-2 lg:col-span-7">
            <Reveal>
              <SectionHeading
                id="content-title"
                eyebrow="Content support"
                eyebrowClassName="text-flare-deep"
                title={
                  <>
                    Content that <Accent>lands.</Accent>
                  </>
                }
                intro="A strong match still needs strong content. Where a campaign calls for it, Real NIL Agency can help athletes sharpen their personal brand and create short-form social content like Instagram Reels."
              />
            </Reveal>
            <Reveal delay={0.1}>
              <ul className="mt-10 grid gap-6 sm:grid-cols-3">
                {[
                  ['Personal brand', 'Bio, visuals and voice that feel like you — and read clearly to brands.'],
                  ['Short-form video', 'Reels concepts and content support shaped around the campaign.'],
                  ['On-brief', 'Content built around what the agency actually asked for.'],
                ].map(([title, body]) => (
                  <li key={title} className="border-t-2 border-ink pt-4">
                    <h3 className="text-lg font-bold">{title}</h3>
                    <p className="mt-2 text-base leading-relaxed text-smoke">{body}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <FaqSection
        faqs={homeFaqs}
        aside={
          <p className="text-base text-smoke">
            Still have a question?{' '}
            <Link href="/contact" className="font-semibold text-ink underline decoration-2 underline-offset-4">
              Contact the team
            </Link>
            .
          </p>
        }
      />

      <CtaBand />
    </>
  )
}
