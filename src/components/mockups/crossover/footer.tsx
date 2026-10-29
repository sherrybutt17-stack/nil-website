import Link from 'next/link'
import { ArrowRight, ArrowUp } from 'lucide-react'
import { ContactEmail, Placeholder } from '@/components/placeholder'
import { footer } from '@/content/home'
import { ctas, legal, site } from '@/content/site'
import { Wordmark } from './header'
import { homePath } from './nav'

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
    <footer className="x-dark surface-ink">
      <div className="x-wrap">
        <div className="x-pad grid gap-14 pt-20 pb-16 sm:pt-24 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-4">
            <Link href={homePath} className="-m-2 inline-flex min-h-11 items-center p-2">
              <Wordmark />
            </Link>
            <p className="mt-6 max-w-sm text-[0.9375rem] leading-relaxed text-chalk/75">{footer.blurb}</p>
            <div className="mt-8 flex flex-col gap-2.5 xs:flex-row lg:flex-col xl:flex-row">
              <Link href={ctas.athlete.href} className="x-btn x-btn--sm bg-flare text-ink">
                {ctas.athlete.label}
                <ArrowRight aria-hidden="true" />
              </Link>
              <Link href={ctas.agency.href} className="x-btn x-btn--sm bg-ultra text-white">
                {ctas.agency.label}
                <ArrowRight aria-hidden="true" />
              </Link>
            </div>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-5 lg:col-start-6">
            {columns.map((column) => (
              <div key={column.title}>
                <h2 className="x-mono text-chalk/60">{column.title}</h2>
                <ul className="mt-4 space-y-0.5">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="inline-flex min-h-10 items-center text-[0.9375rem] text-chalk/85 transition-colors hover:text-chalk"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          <div className="lg:col-span-2 lg:col-start-11">
            <h2 className="x-mono text-chalk/60">Get in touch</h2>
            <ul className="mt-5 space-y-3 text-[0.9375rem] text-chalk/85">
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

        {/* Decorative wordmark, drawn via CSS content so it isn't read or contrast-checked as text. */}
        <div
          aria-hidden="true"
          className="x-pad overflow-hidden pb-2 text-[clamp(2.5rem,12.4vw,11.5rem)] leading-[0.8] font-semibold tracking-[-0.06em] whitespace-nowrap text-chalk/[0.09] select-none [font-stretch:104%] before:content-['Real_NIL_Agency']"
        />

        <div className="x-pad x-ruled x-mono flex flex-col gap-3 py-6 text-chalk/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}
          </p>
          <p>{footer.signoff}</p>
          <a href="#main" className="inline-flex min-h-11 items-center gap-2 text-chalk/80 hover:text-chalk sm:mr-52 lg:mr-48">
            Back to top <ArrowUp className="size-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  )
}
