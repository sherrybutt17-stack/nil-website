'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { nav } from '@/content/site'
import { cn } from '@/lib/utils'

export function NavLinks({ className, onNavigate }: { className?: string; onNavigate?: () => void }) {
  const pathname = usePathname()

  return (
    <ul className={className}>
      {nav.map((item) => {
        const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={active ? 'page' : undefined}
              onClick={onNavigate}
              className={cn(
                'relative inline-flex min-h-11 items-center text-[0.9375rem] font-semibold transition-opacity',
                'after:absolute after:inset-x-0 after:bottom-2 after:h-[3px] after:origin-left after:scale-x-0 after:bg-flare after:transition-transform after:duration-300',
                'hover:after:scale-x-100 aria-[current=page]:after:scale-x-100',
                active ? 'opacity-100' : 'opacity-80 hover:opacity-100'
              )}
            >
              {item.label}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
