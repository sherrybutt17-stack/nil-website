'use client'

import { useCallback, useSyncExternalStore } from 'react'

/*
 * Which side of the page the visitor is viewing. It lives in the URL (?view=…)
 * so a link can open straight into one side. The server render and the no-JS
 * page always show the default view.
 */

export type View = 'agencies' | 'athletes'

export const DEFAULT_VIEW: View = 'agencies'

const listeners = new Set<() => void>()

function readView(): View {
  return new URLSearchParams(window.location.search).get('view') === 'athletes' ? 'athletes' : 'agencies'
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  window.addEventListener('popstate', listener)
  return () => {
    listeners.delete(listener)
    window.removeEventListener('popstate', listener)
  }
}

export function setView(view: View) {
  const url = new URL(window.location.href)
  url.searchParams.set('view', view)
  window.history.replaceState(null, '', url)
  listeners.forEach((listener) => listener())
}

export function useView() {
  return useSyncExternalStore(subscribe, readView, () => DEFAULT_VIEW)
}

/** False on the server and until hydration, so server and first client render match. */
export function useMediaQuery(query: string) {
  const subscribeQuery = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query)
      mql.addEventListener('change', onChange)
      return () => mql.removeEventListener('change', onChange)
    },
    [query]
  )
  return useSyncExternalStore(
    subscribeQuery,
    () => window.matchMedia(query).matches,
    () => false
  )
}

/** Like motion's useReducedMotion, but false until hydrated so the server and first client render match. */
export const useReducedMotionSafe = () => useMediaQuery('(prefers-reduced-motion: reduce)')

/** Desktop layout with room for the sticky match console. Mirrors `.x-track` in crossover.css. */
export const STICKY_CONSOLE_QUERY = '(min-width: 64rem) and (min-height: 40rem)'
