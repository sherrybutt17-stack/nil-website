'use client'

import { ArrowUp } from 'lucide-react'
import { MagneticButton } from './magnetic'
import { REDUCED_MOTION } from './use-media'

export function BackToTop({ className }: { className?: string }) {
  const toTop = () => {
    window.scrollTo({ top: 0, behavior: window.matchMedia(REDUCED_MOTION).matches ? 'auto' : 'smooth' })
    document.getElementById('main')?.focus({ preventScroll: true })
  }
  return (
    <MagneticButton label="Back to top" onClick={toTop} className={className}>
      <ArrowUp className="size-5" aria-hidden="true" />
    </MagneticButton>
  )
}
