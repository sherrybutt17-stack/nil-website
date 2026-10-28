/**
 * Social proof shown on the homepage: partner logos and published campaign posts.
 *
 * Add only real partners and work you have permission to show. Never invent them.
 * Put image files in /public (e.g. /public/partners/acme.svg) and reference them as '/partners/acme.svg'.
 *
 * While a list is empty, its homepage section shows dashed placeholder slots so
 * reviewers can see where the content goes. Set `showEmptySlots` to false to hide
 * empty sections entirely (do this before launch if you have nothing to show yet).
 */

export type Partner = { name: string; logo: string; href?: string }
export type CampaignPost = { href: string; image: string; alt: string }

// TODO(placeholder): set to false before launch if the lists below are still empty.
export const showEmptySlots = true

export const partners: Partner[] = []

export const campaignPosts: CampaignPost[] = []
