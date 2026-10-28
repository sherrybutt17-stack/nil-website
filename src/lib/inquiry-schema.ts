import { z } from 'zod'
import {
  agencyCategories,
  athleteInterests,
  campaignGoals,
  contactRoles,
  OTHER_SPORT,
  sports,
} from '@/content/options'

/**
 * One schema per form, shared by the browser (instant feedback) and the
 * /api/inquiries route (the source of truth). Messages are written to be read
 * on their own in the error summary.
 */

const requiredText = (message: string, max = 120) =>
  z
    .string({ error: message })
    .trim()
    .min(1, { error: message })
    .max(max, { error: `Keep this under ${max} characters` })

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max, { error: `Keep this under ${max} characters` })
    .default('')

const email = (message: string) =>
  z
    .string({ error: message })
    .trim()
    .min(1, { error: message })
    .max(254, { error: 'Email address is too long' })
    .pipe(z.email({ error: 'Enter an email address in the format name@example.com' }))

const consent = z.literal(true, { error: 'Please confirm you agree so we can use your details' })

const message = optionalText(2000)

const choices = <T extends readonly [string, ...string[]]>(options: T, messageText: string) =>
  z.array(z.enum(options), { error: messageText }).min(1, { error: messageText })

/* Social profiles accept a full URL or an @handle. */
const looksLikeUrl = (value: string) => {
  try {
    const url = new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`)
    return url.hostname.includes('.')
  } catch {
    return false
  }
}
const handleOrUrl = (label: string, handle: RegExp) =>
  optionalText(300).refine((v) => v === '' || handle.test(v) || looksLikeUrl(v), {
    error: `Enter your ${label} @handle or profile link`,
  })

const socialLinks = z
  .object({
    instagram: handleOrUrl('Instagram', /^@?[A-Za-z0-9._]{1,30}$/),
    tiktok: handleOrUrl('TikTok', /^@?[A-Za-z0-9._]{2,24}$/),
    other: optionalText(300).refine((v) => v === '' || looksLikeUrl(v), {
      error: 'Enter a full link, like youtube.com/@yourname',
    }),
  })
  .refine((v) => Boolean(v.instagram || v.tiktok || v.other), {
    error: 'Add at least one social profile so we can see your content',
  })

export const agencySchema = z.object({
  formType: z.literal('agency'),
  agencyName: requiredText('Enter your agency or company name'),
  contactName: requiredText('Enter your name'),
  workEmail: email('Enter your work email address'),
  categories: choices(agencyCategories, 'Choose at least one sport or athlete category'),
  goals: choices(campaignGoals, 'Choose at least one campaign goal'),
  message,
  consent,
})

export const athleteSchema = z
  .object({
    formType: z.literal('athlete'),
    fullName: requiredText('Enter your name'),
    email: email('Enter your email address'),
    sport: z.enum([...sports, OTHER_SPORT], { error: 'Choose your sport' }),
    sportOther: optionalText(60),
    schoolOrTeam: optionalText(120),
    position: optionalText(80),
    social: socialLinks,
    interests: choices(athleteInterests, 'Choose at least one partnership interest'),
    message,
    consent,
  })
  .refine((v) => v.sport !== OTHER_SPORT || v.sportOther.length > 0, {
    error: 'Tell us which sport you play',
    path: ['sportOther'],
    // Run even while other fields are still invalid, so this error shows alongside them.
    when: ({ value }) => isRecord(value) && value.sport === OTHER_SPORT,
  })

export const contactSchema = z.object({
  formType: z.literal('contact'),
  name: requiredText('Enter your name'),
  email: email('Enter your email address'),
  role: z.enum(contactRoles, { error: 'Tell us who you are' }),
  message: requiredText('Enter your message', 2000),
  consent,
})

export const inquirySchema = z.discriminatedUnion('formType', [agencySchema, athleteSchema, contactSchema])

export type AgencyInquiry = z.infer<typeof agencySchema>
export type AthleteInquiry = z.infer<typeof athleteSchema>
export type ContactInquiry = z.infer<typeof contactSchema>
export type Inquiry = z.infer<typeof inquirySchema>
export type FormType = Inquiry['formType']

/** Field errors keyed by dotted path, first message per field. */
export type FieldErrors = Record<string, string>

export function toFieldErrors(issues: readonly z.core.$ZodIssue[]): FieldErrors {
  const errors: FieldErrors = {}
  for (const issue of issues) {
    const key = issue.path.join('.')
    if (key && !(key in errors)) errors[key] = issue.message
  }
  return errors
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}
