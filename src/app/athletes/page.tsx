import { Suspense } from 'react'
import Link from 'next/link'
import { ArrowDown, ArrowRight, Megaphone, ScanSearch, Sparkles, ToggleRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AthleteForm } from '@/components/forms/athlete-form'
import { ProfileCard } from '@/components/graphics/cards'
import { MatchStamp } from '@/components/graphics/match-stamp'
import { Reveal } from '@/components/motion/reveal'
import { BenefitGrid, type Benefit } from '@/components/sections/benefit-grid'
import { CtaBand } from '@/components/sections/cta-band'
import { FaqSection } from '@/components/sections/faq-section'
import { PageHero } from '@/components/sections/page-hero'
import { ProcessSteps, type Step } from '@/components/sections/process-steps'
import { Accent, SectionHeading } from '@/components/sections/section-heading'
import { athleteFaqs } from '@/content/faqs'
import { ctas } from '@/content/site'
import { pageMetadata } from '@/lib/metadata'

export const metadata = pageMetadata({
  image: 'athletes',
  title: 'For Athletes',
  description:
    'Student athletes and sports creators: apply once, get your profile reviewed by the Real NIL Agency team, and be considered for agency campaigns that fit your sport, audience and style.',
  path: '/athletes',
})

const audiences = [
  {
    title: 'Student athletes',
    body: 'Athletes looking for brand partnerships that fit their sport, their school or team, and who they are off the field.',
  },
  {
    title: 'Sports creators',
    body: 'Social media creators whose content centers on sports — training, game day, highlights, analysis or culture.',
  },
]

const benefits: Benefit[] = [
  {
    icon: ScanSearch,
    title: 'A real profile review',
    body: 'A person on our team looks at your sport, your content and your interests — not just a follower count.',
  },
  {
    icon: Megaphone,
    title: 'Campaigns that fit',
    body: 'We put you forward for agency campaigns that suit your sport, your audience and your style.',
  },
  {
    icon: Sparkles,
    title: 'Brand & content support',
    body: 'Where it helps, we support your personal brand and social content, including Instagram Reels.',
  },
  {
    icon: ToggleRight,
    title: 'You stay in control',
    body: 'You decide which opportunities to take. No partnership goes ahead without your agreement.',
  },
]

const steps: Step[] = [
  {
    title: 'Apply',
    body: 'Fill out the athlete form. It takes a couple of minutes and doesn’t ask for anything sensitive.',
  },
  {
    title: 'Profile review',
    body: 'Our team reviews your sport, socials and partnership interests.',
  },
  {
    title: 'Join the database',
    body: 'Your profile is kept in our private athlete database. It isn’t published on this site or shared publicly.',
  },
  {
    title: 'Get matched',
    body: 'When an agency campaign fits you, we reach out with the details.',
  },
  {
    title: 'Create & activate',
    body: 'Say yes to the opportunities you want. We can help with content like Reels where the campaign calls for it.',
  },
]

const beforeYouApply = [
  {
    title: 'Know your NIL rules',
    body: 'Schools, conferences and states set their own NIL rules. Check what applies to you before you accept any partnership.',
  },
  {
    title: 'Under 18?',
    body: 'Bring in a parent or guardian before you apply and before you agree to anything.',
  },
  {
    title: 'Have your links ready',
    body: 'Share your public social profiles so our team can see your content.',
  },
]

export default function AthletesPage() {
  return (
    <>
      <PageHero
        id="athletes"
        surface="surface-flare"
        eyebrow="For student athletes & sports creators"
        title={
          <>
            Your game has <Accent>value</Accent> off the field.
          </>
        }
        intro="Apply once with your sport, school or team, and social profiles. Our team reviews your profile, keeps it in our private athlete database, and considers you for agency campaigns that fit who you are."
        actions={
          <>
            <Button asChild variant="ink" size="lg">
              <Link href="#athlete-signup">
                {ctas.athlete.label} <ArrowDown aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="#process">See how it works</Link>
            </Button>
          </>
        }
        visual={
          <div className="relative">
            <ProfileCard className="rotate-3 animate-rise bg-paper! shadow-[0_30px_60px_-20px_rgb(0_0_0/0.45)]" />
            <MatchStamp className="absolute -top-10 -right-8 animate-drop-in [animation-delay:400ms] sm:-right-14" />
          </div>
        }
      />

      <section aria-labelledby="who-title" className="py-20 sm:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <SectionHeading
              id="who-title"
              eyebrow="Who it’s for"
              eyebrowClassName="text-flare-deep"
              title="Built for athletes who create."
            />
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {audiences.map((audience, i) => (
              <Reveal key={audience.title} delay={i * 0.1} className="h-full">
                <div className="h-full rounded-md border-2 border-ink p-7">
                  <span className="numeral-outline text-6xl text-flare-deep" aria-hidden="true">
                    {i === 0 ? 'A' : 'B'}
                  </span>
                  <h3 className="mt-4 text-2xl font-bold">{audience.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-smoke">{audience.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="athlete-benefits-title" className="bg-paper py-20 sm:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <SectionHeading
              id="athlete-benefits-title"
              eyebrow="What we bring"
              eyebrowClassName="text-flare-deep"
              title={
                <>
                  A team in your <Accent>corner.</Accent>
                </>
              }
            />
          </Reveal>
          <BenefitGrid items={benefits} badgeClassName="bg-flare text-ink" className="lg:col-span-8" />
        </div>
      </section>

      <section id="process" aria-labelledby="athlete-process-title" className="surface-ink py-20 sm:py-28">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              id="athlete-process-title"
              eyebrow="How it works for athletes"
              eyebrowClassName="text-flare"
              title="From profile to partnership."
              intro="Every step is handled by people. Not every profile leads to a deal, and timing depends on the campaigns that come in — but when there’s a real fit, you’ll hear from us."
            />
          </Reveal>
          <ProcessSteps steps={steps} numeralClassName="text-flare" className="mt-16" />
        </div>
      </section>

      <section aria-labelledby="before-title" className="py-20 sm:py-28">
        <div className="container-x">
          <Reveal>
            <SectionHeading id="before-title" eyebrow="Good to know" eyebrowClassName="text-flare-deep" title="Before you apply." />
          </Reveal>
          <ul className="mt-12 grid gap-4 md:grid-cols-3">
            {beforeYouApply.map((item, i) => (
              <li key={item.title}>
                <Reveal delay={i * 0.08} className="h-full rounded-md bg-ink p-7 text-chalk">
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-chalk/80">{item.body}</p>
                </Reveal>
              </li>
            ))}
          </ul>
          {/* TODO(placeholder): have counsel review this note and any compliance guidance before launch. */}
          <p className="mt-6 text-sm text-smoke">This is general information, not legal advice.</p>
        </div>
      </section>

      <FaqSection faqs={athleteFaqs} eyebrow="Athlete FAQ" className="bg-paper" />

      <section
        id="athlete-signup"
        aria-labelledby="athlete-signup-title"
        className="relative scroll-mt-16 border-t-2 border-ink py-20 sm:py-28"
      >
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="@container lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <p className="eyebrow text-flare-deep">Athlete signup</p>
              <h2 id="athlete-signup-title" className="display mt-4 text-[3.25rem] @sm:text-6xl @md:text-7xl">
                Join Real NIL Agency.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-smoke">
                Tell us about your sport and your content. Only your name, email, sport and one social profile are
                required.
              </p>
              <h3 className="mt-10 text-base font-bold">What happens after you apply</h3>
              <ol className="mt-4 space-y-4">
                {['A person on our team reviews your profile.', 'Your profile is kept in our private database.', 'We reach out when a campaign fits you.'].map(
                  (item, i) => (
                    <li key={item} className="flex gap-4">
                      <span className="numeral-outline text-4xl text-flare-deep" aria-hidden="true">
                        {i + 1}
                      </span>
                      <span className="pt-1 text-base leading-relaxed">{item}</span>
                    </li>
                  )
                )}
              </ol>
              <p className="mt-10 text-sm text-smoke">
                Representing an agency or brand?{' '}
                <Link href={ctas.agency.href} className="font-semibold text-ink underline underline-offset-4">
                  Use the agency form{' '}
                  <span className="whitespace-nowrap">
                    instead <ArrowRight className="inline size-3.5" aria-hidden="true" />
                  </span>
                </Link>
              </p>
            </div>
          </div>
          <div className="rounded-md border-2 border-ink bg-paper p-6 sm:p-10 lg:col-span-8">
            <Suspense>
              <AthleteForm />
            </Suspense>
          </div>
        </div>
      </section>

      <CtaBand only="agency" heading="Representing an agency?" />
    </>
  )
}
