import { ImageResponse } from 'next/og'
import { brandColors } from '@/content/variant'

/** The Real NIL Agency mark on an ink square, rendered to PNG for the favicon and Apple touch icon. */
export function renderBrandMark(size: number, radius: number) {
  const mark = Math.round(size * 0.58)
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: brandColors.ink,
          borderRadius: radius,
        }}
      >
        <svg width={mark} height={mark} viewBox="0 0 32 32">
          <path d="M0 0h20L8 32H0z" fill={brandColors.athlete} />
          <path d="M24 0h8v32H12z" fill={brandColors.agency} />
        </svg>
      </div>
    ),
    { width: size, height: size }
  )
}
