import Link from 'next/link'
import { Logo } from '@/components/graphics/logo'
import { ContactEmail, Placeholder } from '@/components/mockups/sample-contact'
import { footer } from '@/content/home'
import { ctas, legal, site } from '@/content/site'
import { HOME } from './nav'
import { KButton } from './primitives'

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
    <footer className="k-footer overflow-x-clip">
      <div className="container-x pt-20 pb-10 sm:pt-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Link href={HOME} className="inline-block">
              <Logo />
            </Link>
            <p className="mt-6 max-w-sm text-base leading-relaxed text-chalk/80">{footer.blurb}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <KButton href={ctas.athlete.href} tone="athlete" size="sm">
                {ctas.athlete.label}
              </KButton>
              <KButton href={ctas.agency.href} tone="agency" size="sm">
                {ctas.agency.label}
              </KButton>
            </div>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-5 lg:col-start-6">
            {columns.map((column) => (
              <div key={column.title}>
                <h2 className="k-label text-chalk/65">{column.title}</h2>
                <ul className="mt-4">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="k-foot-link text-[0.9375rem]">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          <div className="lg:col-span-2 lg:col-start-11">
            <h2 className="k-label text-chalk/65">Get in touch</h2>
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

        <div className="mt-16 flex flex-col gap-3 border-t border-chalk/15 pt-6 text-sm text-chalk/65 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p>{footer.signoff}</p>
        </div>
      </div>
      {/* Decorative wordmark, drawn via CSS content so it isn't read or contrast-checked as text. */}
      <div aria-hidden="true" className="k-footer__mark container-x" />
    </footer>
  )
}
