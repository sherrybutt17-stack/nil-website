import { cn } from '@/lib/utils'

/*
 * Guilloche line work, generated at build time: the engraved, interlaced
 * curves seen on certificates. Decorative only.
 */

const f = (n: number) => n.toFixed(1)

/** A hypotrochoid (spirograph) curve, centred on (c, c). */
function rosette(c: number, R: number, r: number, d: number, steps = 720) {
  const loops = r / gcd(R, r)
  const end = Math.PI * 2 * loops
  let path = ''
  for (let i = 0; i <= steps; i++) {
    const t = (end * i) / steps
    const x = c + (R - r) * Math.cos(t) + d * Math.cos(((R - r) / r) * t)
    const y = c + (R - r) * Math.sin(t) - d * Math.sin(((R - r) / r) * t)
    path += `${i ? 'L' : 'M'}${f(x)} ${f(y)}`
  }
  return path
}

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b)
}

/** Interlaced sine waves along a strip `length` long and 24 units deep. */
function band(length: number, waves = 5, wavelength = 46) {
  const paths: string[] = []
  for (let k = 0; k < waves; k++) {
    const phase = (k / waves) * Math.PI * 2
    let path = ''
    for (let x = 0; x <= length; x += 4) {
      const y = 12 + 9 * Math.sin((x / wavelength) * Math.PI * 2 + phase)
      path += `${x ? 'L' : 'M'}${x} ${f(y)}`
    }
    paths.push(path)
  }
  return paths
}

const BAND = band(1000)
const SEAL = [rosette(100, 96, 36, 30), rosette(100, 80, 30, 26), rosette(100, 60, 24, 18)]
const BACK = [rosette(100, 98, 42, 40, 900), rosette(100, 90, 30, 34, 900), rosette(100, 72, 27, 22, 720)]

function Band({ vertical, className }: { vertical?: boolean; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox={vertical ? '0 0 24 1000' : '0 0 1000 24'}
      preserveAspectRatio="none"
      className={cn('pointer-events-none absolute', className)}
    >
      <g transform={vertical ? 'rotate(90 12 12)' : undefined}>
        {BAND.map((d, i) => (
          <path key={i} d={d} fill="none" stroke="currentColor" strokeWidth="0.75" vectorEffect="non-scaling-stroke" />
        ))}
      </g>
    </svg>
  )
}

/** Four interlaced bands framing the parent (position: relative). */
export function GuillocheFrame({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn('pointer-events-none absolute inset-3 sm:inset-4', className)}>
      <Band className="inset-x-0 top-0 h-5 w-full" />
      <Band className="inset-x-0 bottom-0 h-5 w-full" />
      <Band vertical className="inset-y-0 left-0 h-full w-5" />
      <Band vertical className="inset-y-0 right-0 h-full w-5" />
    </div>
  )
}

/** A circular seal: rosettes, the mark, and a line of text around the edge. */
export function Seal({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 200 200" className={cn('overflow-visible', className)}>
      <defs>
        <path id="rk-seal-ring" d="M100 100m-86 0a86 86 0 1 1 172 0a86 86 0 1 1 -172 0" />
      </defs>
      <circle cx="100" cy="100" r="99" fill="none" stroke="currentColor" strokeWidth="0.75" />
      <circle cx="100" cy="100" r="74" fill="none" stroke="currentColor" strokeWidth="0.75" />
      {SEAL.map((d, i) => (
        <path key={i} d={d} fill="none" stroke="currentColor" strokeWidth="0.55" opacity={1 - i * 0.18} />
      ))}
      <text fontSize="10" fontWeight="700" fill="currentColor" style={{ fontStretch: '125%' }}>
        <textPath href="#rk-seal-ring" textLength="530" lengthAdjust="spacing">
          REVIEWED BY PEOPLE · REAL NIL AGENCY ·
        </textPath>
      </text>
      <circle cx="100" cy="100" r="30" className="fill-paper" />
      <g transform="translate(86 86) scale(0.875)">
        <path d="M0 0h20L8 32H0z" className="fill-flare" />
        <path d="M24 0h8v32H12z" className="fill-ultra" />
      </g>
    </svg>
  )
}

/** Engraved rosettes for the back of a card. */
export function Rosette({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 200 200" className={className}>
      {BACK.map((d, i) => (
        <path key={i} d={d} fill="none" stroke="currentColor" strokeWidth="0.6" opacity={0.9 - i * 0.2} />
      ))}
    </svg>
  )
}
