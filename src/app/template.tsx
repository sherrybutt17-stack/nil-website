'use client'

import { useEffect } from 'react'
import * as m from 'motion/react-m'

// False until the first page has mounted, so the initial load is never hidden
// behind an animation (protects LCP). Client-side navigations fade in.
let hasNavigated = false

export default function Template({ children }: { children: React.ReactNode }) {
  const fadeIn = hasNavigated

  useEffect(() => {
    hasNavigated = true
  }, [])

  return (
    <m.div
      initial={fadeIn ? { opacity: 0 } : false}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      {children}
    </m.div>
  )
}
