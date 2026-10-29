'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { ctas } from '@/content/site'
import { homePath, links } from './nav'

export function MobileMenu() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          className="inline-flex min-h-11 items-center gap-2.5 rounded-[0.3125rem] px-3.5 text-[0.9375rem] font-medium shadow-[inset_0_0_0_1px_var(--color-line)] transition-colors hover:bg-paper lg:hidden"
        >
          <Menu className="size-4" aria-hidden="true" />
          Menu
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="gap-0 p-6 pt-20 [font-stretch:104%]">
        <SheetTitle className="sr-only">Menu</SheetTitle>
        <SheetDescription className="sr-only">Site navigation and signup links</SheetDescription>
        <p className="font-mono text-[0.6875rem] tracking-[0.1em] text-chalk/70 uppercase">Real NIL Agency</p>
        <nav aria-label="Mobile" className="mt-6">
          <ul className="border-t border-chalk/15">
            {links.map((link, i) => (
              <li key={link.href} className="border-b border-chalk/15">
                <Link
                  href={link.href}
                  onClick={close}
                  aria-current={link.href === homePath ? 'page' : undefined}
                  className="flex min-h-16 items-center justify-between text-[1.75rem] font-semibold tracking-[-0.04em]"
                >
                  {link.label}
                  <span className="font-mono text-xs font-normal tracking-[0.08em] text-chalk/60">0{i + 1}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-auto flex flex-col gap-3 pt-10">
          <Link
            href={ctas.athlete.href}
            onClick={close}
            className="flex min-h-13 items-center justify-between rounded-[0.3125rem] bg-flare px-5 font-semibold text-ink"
          >
            {ctas.athlete.label} <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
          <Link
            href={ctas.agency.href}
            onClick={close}
            className="flex min-h-13 items-center justify-between rounded-[0.3125rem] bg-ultra px-5 font-semibold text-white"
          >
            {ctas.agency.label} <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  )
}
