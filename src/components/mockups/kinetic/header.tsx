import Link from 'next/link'
import { Logo } from '@/components/graphics/logo'
import { ctas } from '@/content/site'
import { MobileMenu } from './mobile-menu'
import { HOME, links } from './nav'
import { KButton, Stretch } from './primitives'

export function Header() {
  return (
    <header className="k-header sticky top-0 z-40">
      <div className="container-x flex h-16 items-center justify-between gap-6">
        <Link href={HOME} className="shrink-0">
          <Logo />
        </Link>
        <nav aria-label="Main" className="k-nav hidden lg:block">
          <ul className="flex items-center gap-7 xl:gap-9">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} aria-current={link.href === HOME ? 'page' : undefined}>
                  <Stretch from={100} to={125}>
                    {link.label}
                  </Stretch>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          <KButton href={ctas.athlete.href} tone="athlete" size="sm">
            {ctas.athlete.label}
          </KButton>
          <KButton href={ctas.agency.href} tone="agency" size="sm">
            {ctas.agency.label}
          </KButton>
        </div>
        <MobileMenu />
      </div>
    </header>
  )
}
