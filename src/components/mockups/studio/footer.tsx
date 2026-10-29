import Link from 'next/link'
import { ContactEmail, Placeholder } from '@/components/mockups/sample-contact'
import { footer } from '@/content/home'
import { ctas, legal, site } from '@/content/site'
import { Wordmark } from './wordmark'
import { BackToTop } from './back-to-top'
import { studioHome } from './nav'

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

export function StudioFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="st-footer">
      <div className="st-wrap">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link href={studioHome} className="inline-flex" data-cursor-text="Home">
              <Wordmark />
            </Link>
            <p className="mt-6 max-w-sm text-lg leading-relaxed text-ink/75">{footer.blurb}</p>
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-4">
            {columns.map((column) => (
              <div key={column.title}>
                <h2 className="st-label text-ink/65">{column.title}</h2>
                <ul className="mt-4 space-y-1">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="st-link inline-flex min-h-10 items-center text-[0.9375rem]">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
          <div className="lg:col-span-3">
            <h2 className="st-label text-ink/65">Get in touch</h2>
            <ul className="mt-4 space-y-3 text-[0.9375rem]">
              <li>
                <ContactEmail className="st-link" />
              </li>
              <li>{site.contact.location ?? <Placeholder label="City / region" />}</li>
              {site.social.length > 0 ? (
                site.social.map((social) => (
                  <li key={social.href}>
                    <a href={social.href} rel="me noopener" target="_blank" className="st-link">
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

        <p aria-hidden="true" className="st-footer__mark" translate="no">
          Real NIL Agency
        </p>

        <div className="flex flex-col gap-4 border-t border-ink/15 pt-6 text-sm text-ink/65 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p>{footer.signoff}</p>
          <BackToTop className="sm:mr-[17rem]" />
        </div>
      </div>
    </footer>
  )
}
