import type { CampaignPost, Partner } from '@/content/proof'

/**
 * Fictional sample content for the design concepts in /mockups, standing in
 * for the placeholders the live site shows. None of it is real: the brands,
 * athletes and schools are invented, the email uses the reserved `.example`
 * domain and no real person or company is named.
 *
 * Exports mirror src/content/proof.ts so a concept can swap one import.
 * Images live in public/sample/ (generated, original artwork, no photos).
 */

// Static hosting serves the site under a base path, which next/image doesn't add for us.
const base = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

export const showEmptySlots = false

export const partners: Partner[] = [
  { name: 'Brightwater', logo: `${base}/sample/partners/brightwater.png` },
  { name: 'Halden Athletic', logo: `${base}/sample/partners/halden.png` },
  { name: 'Kestrel Co.', logo: `${base}/sample/partners/kestrel.png` },
  { name: 'Sunday Fuel', logo: `${base}/sample/partners/sunday-fuel.png` },
  { name: 'Arcwell', logo: `${base}/sample/partners/arcwell.png` },
  { name: 'Fieldhouse Supply', logo: `${base}/sample/partners/fieldhouse.png` },
]

export type SamplePost = { brand: string; athlete: string; sport: string; format: string; tone: 'flare' | 'ultra' | 'ink' | 'chalk' }

/** Source for the generated post covers in public/sample/posts/ (see the generator in the QA scratch folder). */
export const samplePosts: SamplePost[] = [
  { brand: 'Brightwater', athlete: 'Maya Okafor', sport: 'Volleyball', format: 'Reel · 0:30', tone: 'flare' },
  { brand: 'Halden Athletic', athlete: 'Jalen Brooks', sport: 'Basketball', format: 'Reel · 0:45', tone: 'ultra' },
  { brand: 'Sunday Fuel', athlete: 'Sofia Reyes', sport: 'Soccer', format: 'Sponsored post', tone: 'ink' },
  { brand: 'Arcwell', athlete: 'Ava Lindqvist', sport: 'Track & Field', format: 'Reel · 0:20', tone: 'chalk' },
  { brand: 'Fieldhouse Supply', athlete: 'Marcus Hale', sport: 'Baseball', format: 'Appearance', tone: 'flare' },
  { brand: 'Kestrel Co.', athlete: 'Tyler Vance', sport: 'Football', format: 'Reel · 0:35', tone: 'ultra' },
]

export const campaignPosts: CampaignPost[] = samplePosts.map((post, i) => ({
  href: 'https://www.instagram.com/',
  image: `${base}/sample/posts/post-${i + 1}.png`,
  alt: `Sample campaign post: ${post.brand} with ${post.athlete}, ${post.sport.toLowerCase()} ${post.format.split(' · ')[0].toLowerCase()}`,
}))

export const sampleAthlete = {
  name: 'Maya Okafor',
  number: '12',
  sport: 'Volleyball',
  school: 'Northgate University',
  socials: '@maya.okafor',
}

export const sampleBrief = {
  title: 'Brightwater spring launch',
  goal: 'Product launch',
  sports: 'Volleyball, Track & Field',
  audience: 'College athletes, 18–24',
}

export const sampleContact = {
  email: 'hello@realnil.example',
  location: 'Austin, Texas',
  social: [
    { label: 'Instagram', href: 'https://www.instagram.com/' },
    { label: 'TikTok', href: 'https://www.tiktok.com/' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
  ],
}
