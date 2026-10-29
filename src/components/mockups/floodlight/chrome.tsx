import Link from 'next/link'
import { Logo } from '@/components/graphics/logo'
import { ContactEmail, Placeholder } from '@/components/mockups/sample-contact'
import { footer as footerCopy } from '@/content/home'
import { ctas, legal, nav, site } from '@/content/site'
import { MobileMenu } from './mobile-menu'
import { HeaderFrame } from './motion'
import { FlButton } from './ui'

export const HOME = '/mockups/floodlight'

const navItems = nav.map((item) =>
  item.href === '/' ? { href: HOME, label: item.label, current: true } : { href: item.href, label: item.label, current: false }
)

export function Header() {
  return (
    <HeaderFrame>
      <div className="container-x flex h-(--fl-h) items-center justify-between gap-6">
        <Link href={HOME} className="shrink-0 py-1">
          <Logo />
        </Link>
        <nav aria-label="Main" className="hidden xl:block">
          <ul className="flex items-center gap-9">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={item.current ? 'page' : undefined}
                  className="fl-navlink fl-label text-chalk/75 transition-colors hover:text-chalk aria-[current=page]:text-chalk"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="hidden items-center gap-6 xl:flex">
          <Link href={ctas.athlete.href} className="fl-navlink fl-label text-flare">
            {ctas.athlete.label}
          </Link>
          <FlButton href={ctas.agency.href} tone="ultra" size="sm" icon={null}>
            {ctas.agency.label}
          </FlButton>
        </div>
        <MobileMenu items={navItems} homeHref={HOME} />
      </div>
    </HeaderFrame>
  )
}

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
    <footer className="relative overflow-hidden border-t border-chalk/10">
      <div className="container-x pt-20 pb-10 sm:pt-24">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href={HOME} className="inline-block py-1">
              <Logo />
            </Link>
            <p className="mt-6 max-w-sm text-base leading-relaxed text-chalk/70">{footerCopy.blurb}</p>
            <div className="mt-8 flex max-w-[19rem] flex-col gap-3">
              <FlButton href={ctas.agency.href} tone="ultra" size="sm" className="justify-between">
                {ctas.agency.label}
              </FlButton>
              <FlButton href={ctas.athlete.href} tone="line-flare" size="sm" className="justify-between">
                {ctas.athlete.label}
              </FlButton>
            </div>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-5">
            {columns.map((column) => (
              <div key={column.title}>
                <h2 className="fl-label text-chalk/60">{column.title}</h2>
                <ul className="mt-5 space-y-1">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="fl-navlink text-[0.9375rem] text-chalk/85 transition-colors hover:text-chalk">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          <div className="lg:col-span-3">
            <h2 className="fl-label text-chalk/60">Get in touch</h2>
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

        <div className="mt-20 flex flex-col gap-3 border-t border-chalk/10 pt-6 text-sm text-chalk/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p>{footerCopy.signoff}</p>
        </div>
      </div>
      <div aria-hidden="true" className="fl-wordmark pointer-events-none -mb-[0.2em] select-none" />
    </footer>
  )
}
