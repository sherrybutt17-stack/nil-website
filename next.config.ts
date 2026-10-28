import type { NextConfig } from 'next'

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
]

/*
 * NEXT_PUBLIC_STATIC_EXPORT=true builds plain files for static hosting such as
 * GitHub Pages (see scripts/build-pages.mjs). Static hosts can't run the form
 * API or send custom headers, so those are left out of that build.
 */
const isStaticExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === 'true'

const nextConfig: NextConfig = {
  // Lets several builds (two colour versions, static exports) live side by side.
  distDir: process.env.NEXT_DIST_DIR || '.next',
  poweredByHeader: false,
  ...(isStaticExport
    ? {
        output: 'export',
        basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
        trailingSlash: true,
        images: { unoptimized: true },
        // The form API is set aside for this build, which leaves other local build folders'
        // generated types pointing at it. The full code is type-checked before export instead.
        typescript: { ignoreBuildErrors: true },
      }
    : {
        async headers() {
          return [{ source: '/:path*', headers: securityHeaders }]
        },
      }),
}

export default nextConfig
