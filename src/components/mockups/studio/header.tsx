'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { useMotionValueEvent, useScroll } from 'motion/react'
import * as m from 'motion/react-m'
import { ctas } from '@/content/site'
import { MagneticLink } from './magnetic'
import { MobileMenu } from './mobile-menu'
import { studioHome, studioNav } from './nav'
import { Wordmark } from './wordmark'

export function StudioHeader() {
  const { scrollY, scrollYProgress } = useScroll()
  const [hidden, setHidden] = useState(false)
  const headerRef = useRef<HTMLElement>(null)

  // Slides away while reading down, returns on any scroll up. Never hides while it holds focus.
  useMotionValueEvent(scrollY, 'change', (current) => {
    const previous = scrollY.getPrevious() ?? 0
    const focusInside = headerRef.current?.contains(document.activeElement) ?? false
    const next = !focusInside && current > 240 && current > previous
    if (next !== hidden) setHidden(next)
  })

  return (
    <header ref={headerRef} className="st-header" data-hidden={hidden ? '' : undefined}>
      <div className="st-header__bar">
        <Link href={studioHome} className="shrink-0" data-cursor-text="Home">
          <Wordmark />
        </Link>
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-8 text-[0.9375rem] font-medium">
            {studioNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={item.href === studioHome ? 'page' : undefined}
                  className="st-link inline-flex min-h-11 items-center"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="hidden items-center gap-5 lg:flex">
          <Link href={ctas.athlete.href} className="st-link inline-flex min-h-11 items-center text-[0.9375rem] font-medium">
            {ctas.athlete.label}
          </Link>
          <MagneticLink href={ctas.agency.href} variant="ink">
            {ctas.agency.label}
          </MagneticLink>
        </div>
        <MobileMenu />
      </div>
      <m.span aria-hidden="true" className="st-progress" style={{ scaleX: scrollYProgress }} />
    </header>
  )
}
