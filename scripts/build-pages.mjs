/**
 * Builds both colour versions as static sites and combines them for GitHub Pages:
 *
 *   pages-dist/         Flare & Ultra  ->  https://<owner>.github.io/<repo>/
 *   pages-dist/night/   Night Game     ->  https://<owner>.github.io/<repo>/night/
 *
 * Env (set by .github/workflows/pages.yml):
 *   PAGES_ORIGIN                  e.g. https://sherrybutt17-stack.github.io
 *   PAGES_BASE                    e.g. /nil-website
 *   NEXT_PUBLIC_INQUIRY_ENDPOINT  optional form service URL (Formspree, Basin…). Without
 *                                 it, the forms tell visitors their details were not sent.
 *
 * Static hosting can't run the /api/inquiries route, so it is moved aside during the
 * build and always restored afterwards.
 */
import { spawnSync } from 'node:child_process'
import { cpSync, existsSync, renameSync, rmSync, writeFileSync } from 'node:fs'

const origin = (process.env.PAGES_ORIGIN || 'http://localhost:8080').replace(/\/$/, '')
const base = process.env.PAGES_BASE ?? '/nil-website'
const variants = [
  { name: 'flare', basePath: base, distDir: '.next-pages-flare', dest: 'pages-dist' },
  { name: 'night', basePath: `${base}/night`, distDir: '.next-pages-night', dest: 'pages-dist/night' },
]

const apiDir = 'src/app/api'
const stash = '.pages-stash-api'

rmSync('pages-dist', { recursive: true, force: true })
if (existsSync(stash)) throw new Error(`${stash} exists from an interrupted build: move it back to ${apiDir} first.`)
renameSync(apiDir, stash)

try {
  for (const v of variants) {
    rmSync(v.distDir, { recursive: true, force: true })
    console.log(`\n▶ Building ${v.name} for ${origin}${v.basePath}/\n`)
    const result = spawnSync('npx', ['next', 'build'], {
      stdio: 'inherit',
      env: {
        ...process.env,
        NEXT_PUBLIC_STATIC_EXPORT: 'true',
        NEXT_PUBLIC_SITE_VARIANT: v.name,
        NEXT_PUBLIC_BASE_PATH: v.basePath,
        NEXT_PUBLIC_SITE_URL: origin + v.basePath,
        NEXT_DIST_DIR: v.distDir,
      },
    })
    if (result.status !== 0) throw new Error(`Build failed for ${v.name}`)
    cpSync(v.distDir, v.dest, { recursive: true })
  }
  // Pages runs Jekyll by default, which hides folders starting with "_" (like _next).
  writeFileSync('pages-dist/.nojekyll', '')
  console.log('\n✓ GitHub Pages output ready in pages-dist/')
} finally {
  renameSync(stash, apiDir)
}
