'use client'

import { LazyMotion, MotionConfig } from 'motion/react'

// Animation features load after first paint, keeping them out of the critical bundle.
const loadFeatures = () => import('./features').then((mod) => mod.default)

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  )
}
