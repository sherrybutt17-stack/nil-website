'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Logo } from '@/components/graphics/logo'
import { ctas } from '@/content/site'
import { FlButton, pad } from './ui'

type NavItem = { href: string; label: string; current?: boolean }

export function MobileMenu({ items, homeHref }: { items: NavItem[]; homeHref: string }) {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          className="grid size-11 place-items-center rounded-full border border-chalk/25 transition-colors hover:border-chalk xl:hidden"
        >
          <Menu className="size-5" aria-hidden="true" />
          <span className="sr-only">Open menu</span>
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="fl-portal gap-0 border-l border-chalk/10 p-6 pt-5">
        <SheetTitle className="sr-only">Menu</SheetTitle>
        <SheetDescription className="sr-only">Site navigation and signup links</SheetDescription>
        <Link href={homeHref} onClick={close} className="w-fit py-1.5">
          <Logo />
        </Link>
        <nav aria-label="Mobile" className="mt-12">
          <ul className="border-t border-chalk/10">
            {items.map((item, i) => (
              <li key={item.href} className="border-b border-chalk/10">
                <Link
                  href={item.href}
                  onClick={close}
                  aria-current={item.current ? 'page' : undefined}
                  className="group flex min-h-16 items-center gap-4 aria-[current=page]:text-flare"
                >
                  <span aria-hidden="true" className="fl-label w-6 text-chalk/60">
                    {pad(i + 1)}
                  </span>
                  <span className="display text-[2.6rem] transition-transform duration-500 group-hover:translate-x-1">
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-auto flex flex-col gap-3 pt-10">
          <FlButton href={ctas.agency.href} tone="ultra" onClick={close}>
            {ctas.agency.label}
          </FlButton>
          <FlButton href={ctas.athlete.href} tone="line-flare" onClick={close}>
            {ctas.athlete.label}
          </FlButton>
        </div>
      </SheetContent>
    </Sheet>
  )
}
