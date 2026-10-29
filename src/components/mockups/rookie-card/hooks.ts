'use client'

import { useCallback, useSyncExternalStore } from 'react'

/** Media query state that is false on the server and until hydration, so both renders match. */
export function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query)
      mql.addEventListener('change', onChange)
      return () => mql.removeEventListener('change', onChange)
    },
    [query]
  )
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false
  )
}

/** True only once hydrated in a browser that allows motion. */
export const useMotionAllowed = () => useMediaQuery('(prefers-reduced-motion: no-preference)')
