import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'
import { site } from '@/content/site'
import { brandColors } from '@/content/variant'

/* Shared renderer for the Open Graph images. Fonts are OFL-licensed (see src/assets/fonts/OFL.txt). */

const fonts = Promise.all([
  readFile(join(process.cwd(), 'src/assets/fonts/Archivo-ExtraCondensed-Black.ttf')),
  readFile(join(process.cwd(), 'src/assets/fonts/Archivo-Bold.ttf')),
])

const colors = {
  ink: brandColors.ink,
  chalk: brandColors.chalk,
  flare: brandColors.athlete,
  ultra: brandColors.agency,
  ultraSoft: brandColors.agencyOnInk,
}

type OgInput = { eyebrow: string; title: string; accent: 'flare' | 'ultra' | 'split' }

export async function renderOg({ eyebrow, title, accent }: OgInput) {
  const [display, body] = await fonts
  const eyebrowColor = accent === 'ultra' ? colors.ultraSoft : colors.flare

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: colors.ink,
          color: colors.chalk,
          padding: '64px 72px',
          position: 'relative',
        }}
      >
        {[160, 320, 480, 640, 800, 960, 1120].map((x) => (
          <div
            key={x}
            style={{ position: 'absolute', left: x, top: 0, width: 2, height: 630, background: 'rgba(243,240,232,0.06)' }}
          />
        ))}
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <svg width="56" height="56" viewBox="0 0 32 32">
            <path d="M0 0h20L8 32H0z" fill={colors.flare} />
            <path d="M24 0h8v32H12z" fill={colors.ultra} />
          </svg>
          <div style={{ fontFamily: 'Display', fontSize: 64, lineHeight: 1, letterSpacing: 2, textTransform: 'uppercase' }}>{site.name}</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontFamily: 'Body',
              fontSize: 26,
              letterSpacing: 5,
              textTransform: 'uppercase',
              color: eyebrowColor,
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              fontFamily: 'Display',
              fontSize: 132,
              lineHeight: 0.9,
              textTransform: 'uppercase',
              marginTop: 18,
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
        </div>
        <div style={{ display: 'flex', height: 14, width: '100%' }}>
          <div style={{ flex: 1, background: accent === 'ultra' ? colors.ultra : colors.flare }} />
          <div style={{ flex: 1, background: accent === 'flare' ? colors.flare : colors.ultra }} />
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Display', data: display, weight: 900, style: 'normal' },
        { name: 'Body', data: body, weight: 700, style: 'normal' },
      ],
    }
  )
}
