import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { LogoMark } from '@/components/graphics/logo'
import { ctas } from '@/content/site'
import { cn } from '@/lib/utils'
import { MobileMenu } from './mobile-menu'
import { homePath, links } from './nav'

/** Mark plus a wide-caps wordmark. Its text is the link's accessible name: "Real NIL Agency". */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)} translate="no">
      <LogoMark className="size-6" />
      <span className="flex items-baseline gap-1.5 whitespace-nowrap">
        <span className="text-[0.9375rem] font-extrabold tracking-[0.02em] uppercase [font-stretch:125%]">Real NIL</span>{' '}
        <span className="rk-label text-[0.625rem] text-smoke">Agency</span>
      </span>
    </span>
  )
}

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--rk-hair)] bg-chalk/95">
      <div className="container-x flex h-[4.5rem] items-center justify-between gap-3 sm:gap-6">
        <Link href={homePath} className="shrink-0 rounded-[0.375rem]">
          <Wordmark />
        </Link>
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={link.href === homePath ? 'page' : undefined}
                  className="rk-label relative inline-flex min-h-11 items-center rounded-[0.375rem] px-2.5 text-smoke transition-colors hover:text-ink aria-[current=page]:text-ink xl:px-3.5"
                >
                  {link.label}
                  {link.href === homePath && (
                    <span aria-hidden="true" className="absolute inset-x-2.5 bottom-2 h-[1.5px] bg-ink xl:inset-x-3.5" />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="hidden items-center gap-5 lg:flex">
          <Link href={ctas.athlete.href} className="rk-link hidden text-[0.875rem] font-semibold xl:inline">
            {ctas.athlete.label}
          </Link>
          <Link href={ctas.agency.href} className="rk-btn rk-btn--ink min-h-11 px-4">
            {ctas.agency.label} <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
        <MobileMenu />
      </div>
    </header>
  )
}
