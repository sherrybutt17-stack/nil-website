'use client'

import { useCallback, useSyncExternalStore } from 'react'

/** False on the server and until hydration, so the server and first client render always match. */
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

export const REDUCED_MOTION = '(prefers-reduced-motion: reduce)'
export const FINE_POINTER = '(hover: hover) and (pointer: fine)'

export const useReducedMotionSafe = () => useMediaQuery(REDUCED_MOTION)

/** For event handlers: true when pointer effects (magnet, follower) should run right now. */
export function pointerEffectsAllowed() {
  return window.matchMedia(FINE_POINTER).matches && !window.matchMedia(REDUCED_MOTION).matches
}
