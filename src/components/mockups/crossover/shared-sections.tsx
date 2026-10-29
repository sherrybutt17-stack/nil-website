import Image from 'next/image'
import Link from 'next/link'
import { Reveal } from '@/components/motion/reveal'
import { commitments, mission, proof } from '@/content/home'
import { campaignPosts, partners, showEmptySlots } from '@/content/proof'
import { ctas } from '@/content/site'
import { cn } from '@/lib/utils'
import { pad2, SectionIndex } from './parts'

/* Sections that read the same on both sides of the page. */

const annotations = [
  { word: mission.statement.game, note: 'Student athletes and sports creators', tone: 'text-flare-deep' },
  { word: mission.statement.brand, note: 'Agencies running brand campaigns', tone: 'text-ultra' },
  { word: mission.statement.people, note: 'Our team, reviewing both sides', tone: 'text-ink' },
]

function Marked({ i }: { i: number }) {
  const { word, tone } = annotations[i]
  return (
    <span className={cn('relative inline-block', tone)}>
      {word}
      <sup className="x-mono absolute top-[0.2em] left-full hidden sm:block ml-[0.08em] text-[0.6875rem] leading-none tracking-[0.02em] text-smoke">
        {pad2(i + 1)}
      </sup>
    </span>
  )
}

export function Mission() {
  return (
    <section aria-labelledby="x-mission-title">
      <div className="x-wrap x-ruled">
        <div className="x-pad py-20 sm:py-28 lg:py-36">
          <SectionIndex n="04" label={mission.eyebrow} />
          <Reveal>
            <h2
              id="x-mission-title"
              className="x-h2 mt-14 max-w-[17ch] text-[clamp(2.4rem,0.9rem+5.2vw,6.5rem)] leading-[1.02] sm:mt-20"
            >
              Where <Marked i={0} /> meets <Marked i={1} />, and <Marked i={2} /> make the call.
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-10 sm:mt-20 lg:grid-cols-12 lg:gap-6">
            <Reveal className="lg:col-span-6">
              <ol className="grid border-t border-line sm:grid-cols-3">
                {annotations.map((a, i) => (
                  <li key={a.word} className={cn('border-b border-line py-4 sm:border-b-0 sm:pr-4', i > 0 && 'sm:border-l sm:pl-4')}>
                    <span className="x-mono text-smoke">{pad2(i + 1)}</span>
                    <p className="mt-2 text-[0.9375rem] leading-snug">
                      <span className={cn('font-semibold capitalize', a.tone)}>{a.word}</span>
                      <span className="text-smoke"> — {a.note}</span>
                    </p>
                  </li>
                ))}
              </ol>
            </Reveal>
            <Reveal className="lg:col-span-5 lg:col-start-8" delay={0.08}>
              <p className="x-lead text-ink">{mission.body}</p>
              <div className="mt-8 flex flex-wrap gap-x-7 gap-y-3 text-[0.9375rem] font-medium">
                <Link href={ctas.athlete.href} className="x-link text-flare-deep">
                  {ctas.athlete.label}
                </Link>
                <Link href={ctas.agency.href} className="x-link text-ultra">
                  {ctas.agency.label}
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Commitments() {
  return (
    <section aria-labelledby="x-trust-title">
      <div className="x-wrap x-ruled">
        <div className="x-pad py-20 sm:py-28 lg:py-32">
          <SectionIndex n="05" label={commitments.eyebrow} />
          <div className="mt-14 grid gap-12 sm:mt-20 lg:grid-cols-12 lg:gap-6">
            <Reveal className="lg:col-span-4">
              <h2 id="x-trust-title" className="x-h2 max-w-[10ch]">
                {commitments.title}
              </h2>
              <p className="x-lead mt-7 max-w-sm">{commitments.intro}</p>
            </Reveal>
            <ul className="grid gap-px bg-line shadow-[0_0_0_1px_var(--color-line)] sm:grid-cols-2 lg:col-span-8">
              {commitments.items.map((item, i) => (
                <li key={item.title} className="bg-chalk">
                  <Reveal delay={i * 0.06} className="flex h-full flex-col p-6 sm:p-8 lg:p-10">
                    <span className="x-mono text-(--x-accent)">§ {pad2(i + 1)}</span>
                    <h3 className="x-h3 mt-10 text-[1.375rem] sm:mt-14 sm:text-[1.5rem]">{item.title}</h3>
                    <p className="x-body mt-3 max-w-sm">{item.body}</p>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Proof() {
  const showPartners = partners.length > 0 || showEmptySlots
  const showWork = campaignPosts.length > 0 || showEmptySlots
  if (!showPartners && !showWork) return null

  return (
    <section aria-labelledby="x-proof-title" className="bg-paper">
      <div className="x-wrap x-ruled">
        <div className="x-pad py-20 sm:py-28 lg:py-32">
          <SectionIndex n="06" label={proof.workEyebrow} />
          <div className="mt-14 grid gap-6 sm:mt-20 lg:grid-cols-12 lg:items-end">
            <h2 id="x-proof-title" className="x-h2 lg:col-span-6">
              {proof.workTitle}
            </h2>
            {campaignPosts.length === 0 && showWork && (
              <p className="x-body max-w-sm text-[0.9375rem] lg:col-span-4 lg:col-start-9">{proof.workPlaceholder}</p>
            )}
          </div>

          {showWork && (
            <div className="mt-12">
              <h3 className="x-mono text-smoke">Campaign posts</h3>
              <ul className="mt-4 grid grid-cols-2 gap-px bg-line shadow-[0_0_0_1px_var(--color-line)] sm:grid-cols-3 lg:grid-cols-6">
                {campaignPosts.length > 0
                  ? campaignPosts.map((post) => (
                      <li key={post.href} className="bg-paper">
                        <a href={post.href} target="_blank" rel="noopener" className="block">
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
                      <li key={i} className="x-slot relative flex aspect-[9/16] flex-col justify-between bg-paper p-3">
                        <span className="x-mono text-smoke">{pad2(i + 1)}</span>
                        <span className="text-sm font-medium text-smoke">[Campaign post]</span>
                      </li>
                    ))}
              </ul>
            </div>
          )}

          {showPartners && (
            <div className="mt-14">
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-baseline">
                <h3 className="x-mono text-smoke">{proof.partnersTitle}</h3>
                {partners.length === 0 && <p className="x-body max-w-md text-sm">{proof.partnersPlaceholder}</p>}
              </div>
              <ul className="mt-4 grid grid-cols-2 gap-px bg-line shadow-[0_0_0_1px_var(--color-line)] sm:grid-cols-3 lg:grid-cols-6">
                {partners.length > 0
                  ? partners.map((partner) => (
                      <li key={partner.name} className="grid h-24 place-items-center bg-paper px-4">
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
                      <li key={i} className="x-slot grid h-24 place-items-center bg-paper text-sm font-medium text-smoke">
                        [Partner logo]
                      </li>
                    ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
