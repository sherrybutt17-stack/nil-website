'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/graphics/logo'
import { NavLinks } from '@/components/layout/nav-links'
import { ctas } from '@/content/site'

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          className="grid size-11 place-items-center rounded-full border-2 border-chalk/30 transition-colors hover:border-chalk lg:hidden"
        >
          <Menu className="size-5" aria-hidden="true" />
          <span className="sr-only">Open menu</span>
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="gap-0 p-6">
        <SheetTitle className="sr-only">Menu</SheetTitle>
        <SheetDescription className="sr-only">Site navigation and signup links</SheetDescription>
        <Link href="/" onClick={close} className="w-fit" aria-label="NIL home">
          <Logo />
        </Link>
        <nav aria-label="Mobile" className="mt-10">
          <NavLinks onNavigate={close} className="flex flex-col gap-1 [&_a]:display [&_a]:text-4xl" />
        </nav>
        <div className="mt-auto flex flex-col gap-3 pt-10">
          <Button asChild variant="athlete" size="lg">
            <Link href={ctas.athlete.href} onClick={close}>
              {ctas.athlete.label} <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
          <Button asChild variant="agency" size="lg">
            <Link href={ctas.agency.href} onClick={close}>
              {ctas.agency.label} <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
