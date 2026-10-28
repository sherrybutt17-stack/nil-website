'use client'

import { useReducedMotion } from 'motion/react'
import * as m from 'motion/react-m'

/*
 * The matching process drawn as a coach's play: athletes (O) and agencies (X)
 * run routes into NIL's review, and one route carries through to activation.
 */

const athleteRoutes = ['M96 96 C 170 96, 220 150, 282 196', 'M78 214 C 160 214, 220 214, 280 214', 'M96 332 C 170 332, 220 280, 282 232']
const agencyRoutes = ['M548 112 C 470 112, 420 160, 358 198', 'M560 316 C 480 316, 420 270, 358 230']
const activateRoute = 'M320 252 C 320 300, 320 330, 320 372'

const draw = (delay: number) => ({
  initial: { pathLength: 0 },
  whileInView: { pathLength: 1 },
  viewport: { once: true, margin: '0px 0px -15% 0px' },
  transition: { duration: 1, ease: 'easeInOut' as const, delay },
})

export function Playbook({ className }: { className?: string }) {
  const reduce = useReducedMotion()
  const motionProps = (delay: number) => (reduce ? {} : draw(delay))

  return (
    <svg
      viewBox="0 0 640 440"
      role="img"
      aria-labelledby="playbook-title"
      className={className}
    >
      <title id="playbook-title">
        Diagram: athletes and agencies each sign up, meet at NIL for review and matching, then move together to activation.
      </title>

      {/* Field */}
      <rect x="8" y="8" width="624" height="424" rx="10" fill="none" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2" />
      {[136, 264, 392, 520].map((x) => (
        <line key={x} x1={x} y1="8" x2={x} y2="380" stroke="currentColor" strokeOpacity="0.1" strokeWidth="2" />
      ))}
      <rect x="8" y="380" width="624" height="52" fill="currentColor" fillOpacity="0.08" />
      <text x="320" y="414" textAnchor="middle" fill="currentColor" fontSize="15" fontWeight="800" letterSpacing="4">
        04 · ACTIVATE
      </text>

      {/* Routes */}
      {athleteRoutes.map((d, i) => (
        <m.path key={d} d={d} fill="none" className="stroke-flare" strokeWidth="3.5" strokeLinecap="round" {...motionProps(0.1 + i * 0.15)} />
      ))}
      {agencyRoutes.map((d, i) => (
        <m.path key={d} d={d} fill="none" className="stroke-ultra-soft" strokeWidth="3.5" strokeLinecap="round" {...motionProps(0.25 + i * 0.15)} />
      ))}
      <m.path d={activateRoute} fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" {...motionProps(1.1)} />
      <path d="M308 362 L320 378 L332 362" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />

      {/* Athletes: O */}
      {[
        [76, 96],
        [58, 214],
        [76, 332],
      ].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="17" fill="none" className="stroke-flare" strokeWidth="4" />
      ))}
      <text x="40" y="44" className="fill-flare" fontSize="13" fontWeight="800" letterSpacing="3">
        01 · ATHLETES
      </text>

      {/* Agencies: X */}
      {[
        [566, 112],
        [578, 316],
      ].map(([x, y]) => (
        <path key={`${x}-${y}`} d={`M${x - 14} ${y - 14}L${x + 14} ${y + 14}M${x + 14} ${y - 14}L${x - 14} ${y + 14}`} className="stroke-ultra-soft" strokeWidth="4.5" strokeLinecap="round" />
      ))}
      <text x="600" y="44" textAnchor="end" className="fill-ultra-soft" fontSize="13" fontWeight="800" letterSpacing="3">
        AGENCIES · 01
      </text>

      {/* NIL hub */}
      <circle cx="320" cy="214" r="40" className="fill-chalk" />
      <g transform="translate(302 196) scale(1.125)">
        <path d="M0 0h20L8 32H0z" className="fill-flare" />
        <path d="M24 0h8v32H12z" className="fill-ultra" />
      </g>
      <text x="320" y="150" textAnchor="middle" fill="currentColor" fontSize="13" fontWeight="800" letterSpacing="3">
        02 · REVIEW
      </text>
      <text x="392" y="300" textAnchor="middle" fill="currentColor" fontSize="13" fontWeight="800" letterSpacing="3">
        03 · MATCH
      </text>
    </svg>
  )
}
