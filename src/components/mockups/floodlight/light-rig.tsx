import { cn } from '@/lib/utils'

/*
 * Stadium lighting, all decorative: two lamp banks in the top corners and the
 * beams they throw. Flare lights the field from the athletes' side, Ultra from
 * the agencies' side. Beams are conic gradients (no blur filters), so moving
 * them stays cheap.
 */

function LampBank({ side }: { side: 'l' | 'r' }) {
  const glow = side === 'l' ? 'fill-flare' : 'fill-ultra-soft'
  return (
    <svg viewBox="0 0 120 74" className={cn('fl-bank', `fl-bank--${side}`)}>
      <rect x="1" y="1" width="118" height="52" rx="3" className="fill-ink-raised" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.5" />
      <g className="fl-bank__halo">
        {Array.from({ length: 3 }, (_, row) =>
          Array.from({ length: 6 }, (_, col) => (
            <g key={`${row}-${col}`}>
              <circle cx={15 + col * 18} cy={14 + row * 13} r="7" className={glow} opacity="0.35" />
              <circle cx={15 + col * 18} cy={14 + row * 13} r="4.2" fill="white" />
            </g>
          ))
        )}
      </g>
      <path d="M60 53v21M48 74h24" stroke="currentColor" strokeOpacity="0.3" strokeWidth="2" />
    </svg>
  )
}

export function LightRig({ variant, className }: { variant: 'hero' | 'close'; className?: string }) {
  return (
    <div aria-hidden="true" className={cn('fl-rig', `fl-rig--${variant}`, className)}>
      <div className="fl-beam fl-beam--l">
        <span className="fl-beam__cone" />
        <span className="fl-beam__core" />
      </div>
      <div className="fl-beam fl-beam--r">
        <span className="fl-beam__cone" />
        <span className="fl-beam__core" />
      </div>
      <LampBank side="l" />
      <LampBank side="r" />
    </div>
  )
}

/** Turf seen from the stands: hairline yard lines running to a vanishing point. */
export function FieldPerspective({ className }: { className?: string }) {
  const vanishX = 500
  const vanishY = -380
  const bottom = 400
  const verticals = Array.from({ length: 23 }, (_, i) => -600 + i * 100)
  const horizontals = [0, 0.08, 0.18, 0.31, 0.47, 0.67, 0.9].map((t) => Math.round(t * bottom))
  const t = bottom / (bottom - vanishY)

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1000 400"
      preserveAspectRatio="none"
      className={cn(
        'pointer-events-none text-chalk [mask-image:linear-gradient(to_bottom,transparent,black_45%,black_80%,transparent)]',
        className
      )}
    >
      {verticals.map((x) => (
        <line
          key={x}
          x1={x + (vanishX - x) * t}
          y1="0"
          x2={x}
          y2={bottom}
          stroke="currentColor"
          strokeOpacity="0.09"
          vectorEffect="non-scaling-stroke"
        />
      ))}
      {horizontals.map((y) => (
        <line key={y} x1="0" y1={y} x2="1000" y2={y} stroke="currentColor" strokeOpacity="0.07" vectorEffect="non-scaling-stroke" />
      ))}
    </svg>
  )
}
