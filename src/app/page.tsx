import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Check, HeartHandshake, MessageSquareQuote, Sparkles, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProfileCard } from '@/components/graphics/cards'
import { FieldLines } from '@/components/graphics/field-lines'
import { MatchStamp } from '@/components/graphics/match-stamp'
import { ReelFrame } from '@/components/graphics/reel-frame'
import { Reveal } from '@/components/motion/reveal'
import { FaqSection } from '@/components/sections/faq-section'
import { Accent, SectionHeading } from '@/components/sections/section-heading'
import { homeFaqs } from '@/content/faqs'
import { campaignPosts, partners, showEmptySlots } from '@/content/proof'
import { ctas, site } from '@/content/site'
import { pageMetadata } from '@/lib/metadata'

/*
 * Campaign-led homepage. Section order and tone follow a marketplace-style NIL
 * site the client referenced; every word is original and describes NIL's
 * actual, human-reviewed process. Partner logos and campaign posts come from
 * src/content/proof.ts and are never invented.
 */

export const metadata = pageMetadata({
  image: 'home',
  title: `${site.name} · Real athletes. Real content. Real fit.`,
  absoluteTitle: true,
  description: site.description,
  path: '/',
})

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: site.name,
  url: site.url,
  logo: `${site.url}/apple-touch-icon.png`,
  description: site.description,
  ...(site.contact.email ? { email: site.contact.email } : {}),
  ...(site.social.length ? { sameAs: site.social.map((s) => s.href) } : {}),
}

const heroPoints = [
  'Athletes hand-picked from NIL’s private database',
  'Matched on sport, audience and style, not follower count alone',
  'Content support for Instagram Reels and short-form video',
  'A real person reviewing every request',
]

const agencySteps = [
  'Tell us the goal, the sports and the audience',
  'Get a shortlist our team picked for your campaign',
  'Approve the athletes you want to work with',
  'Launch, with content support where you need it',
]

const athleteSteps = [
  'Apply once. It takes a couple of minutes',
  'Get your profile reviewed by a real person',
  'Hear from us when a campaign fits you',
  'Say yes only to what you want',
]

const reasons = [
  {
    icon: HeartHandshake,
    title: 'Built-in trust',
    body: 'Fans follow athletes for who they are. The right partnership borrows that credibility.',
  },
  {
    icon: MessageSquareQuote,
    title: 'Stories, not ads',
    body: 'Training, game day, the grind. Athletes have stories that make branded content feel real.',
  },
  {
    icon: Sparkles,
    title: 'Communities that show up',
    body: 'Teams, schools and hometowns rally around their athletes, and notice who backs them.',
  },
  {
    icon: TrendingUp,
    title: 'Content you can track',
    body: 'Social content leaves a trail of views, saves and clicks on the platforms you already use.',
  },
]

export default function HomePage() {
  const showPartners = partners.length > 0 || showEmptySlots
  const showWork = campaignPosts.length > 0 || showEmptySlots

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd).replace(/</g, '\\u003c') }}
      />

      {/* Role router: three across, compact on phones */}
      <nav aria-label="Choose your path" className="surface-ink border-b border-chalk/10">
        <ul className="container-x grid grid-cols-3 divide-x divide-chalk/10">
          {[
            { href: ctas.agency.href, short: 'Agency or brand', long: 'I’m an agency or brand', tone: 'text-ultra-soft' },
            { href: ctas.athlete.href, short: 'Athlete or creator', long: 'I’m an athlete or creator', tone: 'text-flare' },
            { href: '/contact', short: 'Something else', long: 'Something else', tone: 'text-chalk' },
          ].map((item) => (
            <li key={item.href} className="px-2 first:pl-0 last:pr-0 sm:px-5">
              <Link
                href={item.href}
                className="group flex h-full min-h-14 items-center justify-between gap-2 py-2 text-[0.8125rem] leading-tight font-semibold sm:min-h-12 sm:text-sm"
              >
                <span className={item.tone}>
                  <span className="sm:hidden">{item.short}</span>
                  <span className="hidden sm:inline">{item.long}</span>
                </span>
                <ArrowRight className="hidden size-4 shrink-0 transition-transform group-hover:translate-x-1 sm:block" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Hero: campaign-led */}
      <section aria-labelledby="home-title" className="surface-ink relative isolate overflow-hidden">
        <FieldLines id="b-hero" className="-z-10 opacity-[0.07]" />
        <div className="container-x grid items-center gap-14 pt-14 pb-20 lg:grid-cols-12 lg:gap-6 lg:pt-20 lg:pb-28">
          <div className="lg:col-span-7">
            <p className="eyebrow flex items-center gap-3 text-chalk/80">
              <span className="h-[3px] w-8 bg-ultra-soft" aria-hidden="true" />
              Athlete-powered campaigns
            </p>
            <h1 id="home-title" className="display mt-6 text-[3.3rem] xs:text-[3.9rem] sm:text-7xl lg:text-[5.4rem] xl:text-[6.4rem]">
              <span className="block">Real athletes.</span>
              <span className="block">Real content.</span>
              <span className="block">
                Real <Accent className="text-flare">fit.</Accent>
              </span>
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-chalk/85 text-pretty sm:text-xl">
              NIL pairs agencies with student athletes and sports creators, hand-picked by our team, and helps produce
              the short-form content that carries your campaign.
            </p>
            <ul className="mt-7 grid gap-2.5 sm:grid-cols-2">
              {heroPoints.map((point) => (
                <li key={point} className="flex gap-2.5 text-[0.9375rem] text-chalk/90">
                  <Check className="mt-0.5 size-4 shrink-0 text-flare" strokeWidth={3} aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
              <Button asChild variant="agency" size="lg">
                <Link href={ctas.agency.href}>
                  {ctas.agency.label} <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">Talk to our team</Link>
              </Button>
            </div>
            <p className="mt-5 text-sm text-chalk/70">
              Athlete or creator?{' '}
              <Link href={ctas.athlete.href} className="font-semibold text-flare underline underline-offset-4">
                Join here
              </Link>
            </p>
          </div>
          <div aria-hidden="true" className="relative mx-auto flex h-[28rem] w-full max-w-[26rem] items-center justify-center lg:col-span-5 lg:max-w-none">
            <ReelFrame className="absolute left-0 top-6 w-[11rem] -rotate-6 animate-rise sm:w-[12.5rem]" />
            <ReelFrame className="relative z-10 w-[12.5rem] animate-rise [animation-delay:150ms] sm:w-[14rem]" />
            <ReelFrame className="absolute right-0 bottom-4 w-[11rem] rotate-6 animate-rise [animation-delay:300ms] sm:w-[12.5rem]" />
          </div>
        </div>
      </section>

      {/* Social proof: partners from src/content/proof.ts */}
      {showPartners && (
        <section aria-labelledby="b-proof" className="border-b-2 border-ink py-12">
          <div className="container-x">
            <h2 id="b-proof" className="eyebrow text-center text-smoke">
              Brands, agencies & press
            </h2>
            <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {partners.length > 0
                ? partners.map((partner) => (
                    <li key={partner.name} className="grid h-16 place-items-center">
                      {partner.href ? (
                        <a href={partner.href} target="_blank" rel="noopener" className="grid h-full w-full place-items-center">
                          <Image src={partner.logo} alt={partner.name} width={140} height={48} className="max-h-10 w-auto object-contain" />
                        </a>
                      ) : (
                        <Image src={partner.logo} alt={partner.name} width={140} height={48} className="max-h-10 w-auto object-contain" />
                      )}
                    </li>
                  ))
                : Array.from({ length: 6 }, (_, i) => (
                    <li key={i} className="grid h-16 place-items-center rounded-md border-2 border-dashed border-smoke/50 text-sm font-semibold text-smoke">
                      [Partner logo]
                    </li>
                  ))}
            </ul>
            {partners.length === 0 && (
              <p className="mt-4 text-center text-sm text-smoke">
                Placeholder: add real partner logos and press mentions in src/content/proof.ts once they exist and you
                have permission.
              </p>
            )}
          </div>
        </section>
      )}

      {/* Mission */}
      <section aria-labelledby="b-mission" className="overflow-hidden py-20 sm:py-28">
        <div className="container-x grid items-center gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow text-flare-deep">Why NIL</p>
            <h2 id="b-mission" className="mt-5 text-4xl leading-[1.1] font-medium tracking-tight sm:text-5xl lg:text-6xl">
              where <span className="display text-[1.15em]">game</span> meets{' '}
              <span className="display text-[1.15em] text-ultra">brand</span>, and{' '}
              <span className="display text-[1.15em] text-flare-deep">people</span> make the call.
            </h2>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-smoke">
              NIL connects student athletes and sports creators with agencies running brand campaigns. Our team reviews
              every athlete profile and every agency request, so every introduction has a reason behind it.
            </p>
            <div className="mt-8 flex flex-col gap-3 xs:flex-row">
              <Button asChild variant="athlete">
                <Link href={ctas.athlete.href}>{ctas.athlete.label}</Link>
              </Button>
              <Button asChild variant="ink">
                <Link href={ctas.agency.href}>{ctas.agency.label}</Link>
              </Button>
            </div>
          </Reveal>
          <Reveal className="flex justify-center lg:col-span-5" delay={0.1}>
            <div className="relative">
              <ProfileCard className="rotate-3" />
              <MatchStamp className="absolute -top-10 -right-2 sm:-right-8" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* What we do: two columns */}
      <section aria-labelledby="b-what" className="surface-ink py-20 sm:py-28">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              id="b-what"
              eyebrow="What we do"
              eyebrowClassName="text-flare"
              title={
                <>
                  Hand-matched, not <Accent className="text-flare">mass-matched.</Accent>
                </>
              }
              intro="No algorithm firing off hundreds of offers. A team that reads every request and every profile, then makes introductions that make sense."
            />
          </Reveal>
          <div className="mt-14 grid gap-4 md:grid-cols-2">
            <Reveal className="h-full">
              <article className="surface-ultra @container flex h-full flex-col rounded-md p-6 sm:p-10">
                <p className="eyebrow">For agencies & brands</p>
                <h3 className="display mt-4 text-[2.35rem] @sm:text-5xl @lg:text-6xl">Campaigns built on fit, not guesswork.</h3>
                <ol className="mt-8 space-y-3.5">
                  {agencySteps.map((step, i) => (
                    <li key={step} className="flex gap-4 text-[1.0625rem]">
                      <span className="numeral-outline text-3xl" aria-hidden="true">
                        {i + 1}
                      </span>
                      <span className="pt-0.5">{step}</span>
                    </li>
                  ))}
                </ol>
                <div className="mt-auto flex flex-col gap-4 pt-10 xs:flex-row xs:items-center">
                  <Button asChild variant="chalk">
                    <Link href={ctas.agency.href}>{ctas.agency.label}</Link>
                  </Button>
                  <Link href="/agencies" className="font-semibold underline decoration-2 underline-offset-4">
                    How NIL works for agencies
                  </Link>
                </div>
              </article>
            </Reveal>
            <Reveal className="h-full" delay={0.1}>
              <article className="surface-flare @container flex h-full flex-col rounded-md p-6 sm:p-10">
                <p className="eyebrow">For athletes & creators</p>
                <h3 className="display mt-4 text-[2.35rem] @sm:text-5xl @lg:text-6xl">Opportunities that actually fit you.</h3>
                <ol className="mt-8 space-y-3.5">
                  {athleteSteps.map((step, i) => (
                    <li key={step} className="flex gap-4 text-[1.0625rem]">
                      <span className="numeral-outline text-3xl" aria-hidden="true">
                        {i + 1}
                      </span>
                      <span className="pt-0.5">{step}</span>
                    </li>
                  ))}
                </ol>
                <div className="mt-auto flex flex-col gap-4 pt-10 xs:flex-row xs:items-center">
                  <Button asChild variant="ink">
                    <Link href={ctas.athlete.href}>{ctas.athlete.label}</Link>
                  </Button>
                  <Link href="/athletes" className="font-semibold underline decoration-2 underline-offset-4">
                    How NIL works for athletes
                  </Link>
                </div>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Why athletes */}
      <section aria-labelledby="b-why" className="py-20 sm:py-28">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              id="b-why"
              eyebrow="For brands"
              eyebrowClassName="text-ultra"
              title={
                <>
                  Why brands team up with <Accent>athletes.</Accent>
                </>
              }
            />
          </Reveal>
          <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map(({ icon: Icon, title, body }, i) => (
              <li key={title}>
                <Reveal delay={i * 0.08} className="flex h-full flex-col rounded-md border-2 border-ink bg-paper p-7">
                  <span className="grid size-12 place-items-center rounded-full bg-ultra text-white">
                    <Icon className="size-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-6 text-xl font-bold">{title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-smoke">{body}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Campaign work from src/content/proof.ts */}
      {showWork && (
        <section aria-labelledby="b-work" className="bg-paper py-20 sm:py-28">
          <div className="container-x">
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <SectionHeading id="b-work" eyebrow="The work" eyebrowClassName="text-flare-deep" title="Made with athletes." className="min-w-0 flex-1" />
              {campaignPosts.length === 0 && (
                <p className="max-w-sm text-sm text-smoke">
                  Placeholder: add published campaign posts in src/content/proof.ts once you have permission to share
                  them.
                </p>
              )}
            </div>
            <ul className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {campaignPosts.length > 0
                ? campaignPosts.map((post) => (
                    <li key={post.href}>
                      <a href={post.href} target="_blank" rel="noopener" className="block overflow-hidden rounded-md">
                        <Image
                          src={post.image}
                          alt={post.alt}
                          width={360}
                          height={640}
                          sizes="(min-width: 1024px) 16vw, (min-width: 640px) 33vw, 50vw"
                          className="aspect-[9/16] w-full object-cover"
                        />
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    </li>
                  ))
                : Array.from({ length: 6 }, (_, i) => (
                    <li
                      key={i}
                      className={`grid aspect-[9/16] place-items-center rounded-md border-2 border-dashed text-sm font-semibold ${
                        i % 3 === 0 ? 'border-flare-deep/50 bg-flare/10' : i % 3 === 1 ? 'border-ultra/40 bg-ultra/10' : 'border-smoke/40 bg-chalk'
                      }`}
                    >
                      [Campaign post]
                    </li>
                  ))}
            </ul>
          </div>
        </section>
      )}

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

      {/* Closing CTA */}
      <section aria-labelledby="b-close" className="surface-ink relative isolate overflow-hidden py-20 sm:py-28">
        <FieldLines id="b-close" className="-z-10 opacity-[0.07]" />
        <div className="container-x text-center">
          <h2 id="b-close" className="display mx-auto max-w-4xl text-6xl sm:text-8xl">
            Ready to make a <Accent className="text-flare">play?</Accent>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-chalk/80">
            Two short signups, one team reviewing both. Pick your side, or talk to us first.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 xs:flex-row xs:flex-wrap">
            <Button asChild variant="agency" size="lg">
              <Link href={ctas.agency.href}>{ctas.agency.label}</Link>
            </Button>
            <Button asChild variant="athlete" size="lg">
              <Link href={ctas.athlete.href}>{ctas.athlete.label}</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">
                Talk to our team <ArrowUpRight aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
