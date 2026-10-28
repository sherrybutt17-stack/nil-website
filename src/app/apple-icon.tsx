import { ImageResponse } from 'next/og'
import { brandColors } from '@/content/variant'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: brandColors.ink }}>
        <svg width="104" height="104" viewBox="0 0 32 32">
          <path d="M0 0h20L8 32H0z" fill={brandColors.athlete} />
          <path d="M24 0h8v32H12z" fill={brandColors.agency} />
        </svg>
      </div>
    ),
    size
  )
}
