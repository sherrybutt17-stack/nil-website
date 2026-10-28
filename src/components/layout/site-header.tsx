import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/graphics/logo'
import { MobileNav } from '@/components/layout/mobile-nav'
import { NavLinks } from '@/components/layout/nav-links'
import { ctas } from '@/content/site'

export function SiteHeader() {
  return (
    <header className="surface-ink sticky top-0 z-40 border-b border-chalk/10">
      <div className="container-x flex h-(--header-h) items-center justify-between gap-6">
        <Link href="/" className="shrink-0">
          <Logo />
        </Link>
        <nav aria-label="Main" className="hidden lg:block">
          <NavLinks className="flex items-center gap-7" />
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          <Button asChild variant="athlete" size="sm">
            <Link href={ctas.athlete.href}>{ctas.athlete.label}</Link>
          </Button>
          <Button asChild variant="agency" size="sm">
            <Link href={ctas.agency.href}>{ctas.agency.label}</Link>
          </Button>
        </div>
        <MobileNav />
      </div>
    </header>
  )
}
