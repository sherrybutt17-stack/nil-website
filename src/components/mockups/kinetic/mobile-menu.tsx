'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Logo } from '@/components/graphics/logo'
import { ctas } from '@/content/site'
import { HOME, links } from './nav'
import { pad, Stretch } from './primitives'

export function MobileMenu() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          className="k-label flex min-h-11 items-center gap-3 border-2 border-chalk/40 px-4 transition-colors hover:border-chalk lg:hidden"
        >
          Menu
          <span aria-hidden="true" className="flex w-5 flex-col gap-[5px]">
            <span className="h-[2px] bg-current" />
            <span className="h-[2px] w-3/4 bg-current" />
          </span>
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="kinetic-portal w-full max-w-md gap-0 p-6 sm:p-8">
        <SheetTitle className="sr-only">Menu</SheetTitle>
        <SheetDescription className="sr-only">Site navigation and signup links</SheetDescription>
        <Link href={HOME} onClick={close} className="w-fit">
          <Logo />
        </Link>
        <nav aria-label="Mobile" className="mt-12">
          <ul>
            {links.map((link, i) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={close}
                  aria-current={link.href === HOME ? 'page' : undefined}
                  className="k-menu-link k-display"
                >
                  <Stretch from={62} to={88}>
                    {link.label}
                  </Stretch>
                  <span className="k-label shrink-0 text-chalk/60 tabular-nums" aria-hidden="true">
                    {pad(i + 1)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-auto flex flex-col gap-3 pt-10">
          <Link href={ctas.athlete.href} onClick={close} className="k-btn k-btn--athlete">
            <span>{ctas.athlete.label}</span>
            <ArrowRight className="size-4" strokeWidth={2.5} aria-hidden="true" />
          </Link>
          <Link href={ctas.agency.href} onClick={close} className="k-btn k-btn--agency">
            <span>{ctas.agency.label}</span>
            <ArrowRight className="size-4" strokeWidth={2.5} aria-hidden="true" />
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  )
}
