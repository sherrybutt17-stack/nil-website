import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/graphics/logo'
import { ContactEmail, Placeholder } from '@/components/placeholder'
import { ctas, legal, site } from '@/content/site'

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

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="surface-ink relative overflow-hidden">
      <div className="container-x pt-16 pb-10 sm:pt-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block">
              <Logo />
            </Link>
            <p className="mt-5 max-w-sm text-base leading-relaxed text-chalk/75">
              Student athletes and sports creators, matched with agencies by people who review every profile and
              every request.
            </p>
            <div className="mt-7 flex flex-col gap-3 xs:flex-row lg:flex-col xl:flex-row">
              <Button asChild variant="athlete" size="sm">
                <Link href={ctas.athlete.href}>
                  {ctas.athlete.label} <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild variant="agency" size="sm">
                <Link href={ctas.agency.href}>
                  {ctas.agency.label} <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-5">
            {columns.map((column) => (
              <div key={column.title}>
                <h2 className="eyebrow text-chalk/60">{column.title}</h2>
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
            <h2 className="eyebrow text-chalk/60">Get in touch</h2>
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
          <p>Matched by people, not algorithms.</p>
        </div>
      </div>

      {/* Decorative wordmark, drawn via CSS content so it isn't read or contrast-checked as text. */}
      <div
        aria-hidden="true"
        className="display pointer-events-none -mb-[0.3em] text-center text-[22vw] leading-[0.8] text-chalk/[0.04] select-none before:content-['Real_NIL']"
      />
    </footer>
  )
}
