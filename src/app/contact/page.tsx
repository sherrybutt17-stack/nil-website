import { Suspense } from 'react'
import Link from 'next/link'
import { ArrowUpRight, Mail, MapPin, Phone, Share2 } from 'lucide-react'
import { ContactForm } from '@/components/forms/contact-form'
import { ContactEmail, Placeholder } from '@/components/placeholder'
import { PageHero } from '@/components/sections/page-hero'
import { ctas, site } from '@/content/site'
import { pageMetadata } from '@/lib/metadata'

export const metadata = pageMetadata({
  image: 'contact',
  title: 'Contact',
  description:
    'Questions about Real NIL Agency, media requests or anything else? Send our team a message. Athletes and agencies ready to sign up can use their dedicated forms.',
  path: '/contact',
})

const routes = [
  {
    href: ctas.athlete.href,
    kicker: 'Athlete or sports creator?',
    label: 'Use the athlete form',
    className: 'surface-flare',
  },
  {
    href: ctas.agency.href,
    kicker: 'Agency or brand team?',
    label: 'Use the agency form',
    className: 'surface-ultra',
  },
]

export default function ContactPage() {
  return (
    <>
      <PageHero
        id="contact"
        surface="surface-ink"
        eyebrow="Contact"
        title="Talk to our team."
        intro="Questions about how Real NIL Agency works, media requests, or anything else — send us a message. If you’re ready to sign up, the dedicated forms are the fastest way in."
        actions={routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={`${route.className} group flex min-h-20 flex-1 items-center justify-between gap-6 rounded-md px-5 py-4 xs:min-w-[15rem]`}
          >
            <span>
              <span className="block text-sm opacity-85">{route.kicker}</span>
              <span className="block text-lg font-bold">{route.label}</span>
            </span>
            <ArrowUpRight className="size-6 shrink-0 transition-transform group-hover:rotate-45" aria-hidden="true" />
          </Link>
        ))}
      />

      <section aria-labelledby="inquiry-title" className="py-20 sm:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="@container lg:col-span-4">
            <h2 id="inquiry-title" className="display text-[3.25rem] @sm:text-6xl @md:text-7xl">
              Send a message.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-smoke">
              For general questions. We read every message and reply by email.
            </p>

            <h3 className="mt-12 eyebrow text-smoke">Other ways to reach us</h3>
            <dl className="mt-5 space-y-5 text-base">
              <div className="flex gap-4">
                <dt>
                  <Mail className="mt-0.5 size-5" aria-hidden="true" />
                  <span className="sr-only">Email</span>
                </dt>
                <dd>
                  <ContactEmail className="font-semibold underline decoration-2 underline-offset-4" />
                </dd>
              </div>
              <div className="flex gap-4">
                <dt>
                  <Phone className="mt-0.5 size-5" aria-hidden="true" />
                  <span className="sr-only">Phone</span>
                </dt>
                <dd>
                  {site.contact.phone ? (
                    <a href={`tel:${site.contact.phone.replace(/[^+\d]/g, '')}`} className="font-semibold underline underline-offset-4">
                      {site.contact.phone}
                    </a>
                  ) : (
                    <Placeholder label="Phone (optional)" />
                  )}
                </dd>
              </div>
              <div className="flex gap-4">
                <dt>
                  <MapPin className="mt-0.5 size-5" aria-hidden="true" />
                  <span className="sr-only">Location</span>
                </dt>
                <dd>{site.contact.location ?? <Placeholder label="City / region or address" />}</dd>
              </div>
              <div className="flex gap-4">
                <dt>
                  <Share2 className="mt-0.5 size-5" aria-hidden="true" />
                  <span className="sr-only">Social</span>
                </dt>
                <dd>
                  {site.social.length > 0 ? (
                    <ul className="flex flex-wrap gap-x-4 gap-y-1">
                      {site.social.map((social) => (
                        <li key={social.href}>
                          <a href={social.href} target="_blank" rel="me noopener" className="font-semibold underline underline-offset-4">
                            {social.label}
                            <span className="sr-only"> (opens in a new tab)</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <Placeholder label="Social profile links" />
                  )}
                </dd>
              </div>
            </dl>
          </div>
          <div className="rounded-md border-2 border-ink bg-paper p-6 sm:p-10 lg:col-span-8">
            <Suspense>
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  )
}
