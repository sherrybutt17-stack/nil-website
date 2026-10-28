import { ImageResponse } from 'next/og'
import { brandColors } from '@/content/variant'

export const size = { width: 64, height: 64 }
export const contentType = 'image/png'

export default function Icon() {
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
          borderRadius: 14,
        }}
      >
        <svg width="36" height="36" viewBox="0 0 32 32">
          <path d="M0 0h20L8 32H0z" fill={brandColors.athlete} />
          <path d="M24 0h8v32H12z" fill={brandColors.agency} />
        </svg>
      </div>
    ),
    size
  )
}
