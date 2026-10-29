'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { ContactEmail } from '@/components/mockups/sample-contact'
import { ctas } from '@/content/site'
import { studioSans } from './fonts'
import { studioNav } from './nav'

/** Full-screen menu. The Sheet portals outside the concept root, so it carries its own font and scope class. */
export function MobileMenu() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button type="button" className="st-menu-button lg:hidden">
          <span>Menu</span>
          <span aria-hidden="true" className="st-menu-button__lines" />
        </button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className={`studio-portal ${studioSans.variable} inset-0 h-dvh w-full max-w-none gap-0 p-0 sm:max-w-none`}
      >
        <SheetTitle className="sr-only">Menu</SheetTitle>
        <SheetDescription className="sr-only">Site navigation and signup links</SheetDescription>
        <div className="flex h-full flex-col overflow-y-auto px-5 pt-20 pb-8 sm:px-8">
          <p className="st-label text-chalk/60">(Menu)</p>
          <nav aria-label="Mobile" className="mt-6">
            <ul>
              {studioNav.map((item, i) => (
                <li key={item.href} className="st-menu-item border-b border-chalk/15" style={{ '--i': i } as React.CSSProperties}>
                  <Link href={item.href} onClick={close} className="flex min-h-16 items-baseline justify-between gap-4 py-3">
                    <span className="st-menu-link">{item.label}</span>
                    <span className="st-label text-chalk/55 tabular-nums">0{i + 1}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-auto grid gap-3 pt-10">
            <Link href={ctas.agency.href} onClick={close} className="st-btn st-btn--ultra st-btn--lg justify-between">
              <span className="st-btn__label">
                {ctas.agency.label} <ArrowRight className="size-4" aria-hidden="true" />
              </span>
            </Link>
            <Link href={ctas.athlete.href} onClick={close} className="st-btn st-btn--flare st-btn--lg justify-between">
              <span className="st-btn__label">
                {ctas.athlete.label} <ArrowRight className="size-4" aria-hidden="true" />
              </span>
            </Link>
            <p className="mt-4 text-sm text-chalk/75">
              <ContactEmail className="underline decoration-chalk/40 underline-offset-4" />
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
