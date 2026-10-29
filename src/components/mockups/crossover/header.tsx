import Link from 'next/link'
import { LogoMark } from '@/components/graphics/logo'
import { MobileMenu } from './mobile-menu'
import { homePath, links } from './nav'
import { ViewCta } from './view-controls'

/** Mark plus a single-line, mixed-case wordmark. Its text is the link's accessible name. */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={className}>
      <span className="inline-flex items-center gap-2.5">
        <LogoMark className="size-6" />
        <span className="text-[1.0625rem] leading-none tracking-[-0.03em] whitespace-nowrap [font-stretch:104%]">
          <span className="font-semibold">Real NIL</span> <span className="font-normal opacity-70">Agency</span>
        </span>
      </span>
    </span>
  )
}

export function Header() {
  return (
    <header>
      <div className="x-wrap">
        <div className="x-pad flex h-16 items-center justify-between gap-6 sm:h-[4.5rem]">
          <Link href={homePath} className="-m-2 inline-flex min-h-11 items-center p-2">
            <Wordmark />
          </Link>
          <nav aria-label="Main" className="x-nav hidden lg:block">
            <ul className="flex items-center gap-8">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={link.href === homePath ? 'page' : undefined}
                    className="inline-flex min-h-11 items-center text-[0.9375rem] font-medium tracking-[-0.01em] text-ink/80 transition-colors hover:text-ink aria-[current=page]:text-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="hidden items-center gap-5 lg:flex">
            <Link href="/contact" className="x-link text-[0.9375rem] font-medium">
              Talk to our team
            </Link>
            <ViewCta size="sm" />
          </div>
          <MobileMenu />
        </div>
      </div>
    </header>
  )
}
