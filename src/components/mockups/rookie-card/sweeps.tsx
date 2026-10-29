'use client'

import { useEffect } from 'react'

/*
 * Plays the one-off foil sweeps (label strips, closing headline) when each
 * enters view, by setting data-lit. Renders nothing; markup is identical on
 * server and client. CSS skips the animation under reduced motion.
 */
export function InViewSweeps() {
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>('.concept-rookie [data-rk-sweep], .concept-rookie .rk-foil-text--view')
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          ;(entry.target as HTMLElement).dataset.lit = ''
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -12% 0px' }
    )
    targets.forEach((target) => observer.observe(target))
    return () => observer.disconnect()
  }, [])
  return null
}
