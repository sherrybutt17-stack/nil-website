'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { ctas } from '@/content/site'
import { homePath, links } from './nav'

/* The Sheet portals outside .concept-rookie, so it carries the rookie-portal class. */
export function MobileMenu() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          className="rk-label inline-flex min-h-11 min-w-11 items-center justify-center gap-2.5 rounded-[0.5rem] px-3.5 shadow-[inset_0_0_0_1.5px_color-mix(in_oklab,var(--color-ink)_28%,transparent)] transition-shadow hover:shadow-[inset_0_0_0_1.5px_var(--color-ink)] lg:hidden"
        >
          <Menu className="size-4" aria-hidden="true" />
          <span className="max-[22.5rem]:sr-only">Menu</span>
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="rookie-portal gap-0 p-6 pt-20">
        <SheetTitle className="sr-only">Menu</SheetTitle>
        <SheetDescription className="sr-only">Site navigation and signup links</SheetDescription>
        <p className="rk-label text-chalk/70">Real NIL Agency</p>
        <nav aria-label="Mobile" className="mt-6">
          <ul className="border-t border-chalk/15">
            {links.map((link, i) => (
              <li key={link.href} className="border-b border-chalk/15">
                <Link
                  href={link.href}
                  onClick={close}
                  aria-current={link.href === homePath ? 'page' : undefined}
                  className="rk-display flex min-h-16 items-center justify-between text-[1.375rem]"
                >
                  {link.label}
                  <span className="text-xs font-bold tabular-nums text-chalk/60 [font-stretch:100%]">0{i + 1}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-auto flex flex-col gap-3 pt-10">
          <Link href={ctas.agency.href} onClick={close} className="rk-btn rk-btn--ultra justify-between">
            {ctas.agency.label} <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
          <Link href={ctas.athlete.href} onClick={close} className="rk-btn rk-btn--flare justify-between">
            {ctas.athlete.label} <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  )
}
