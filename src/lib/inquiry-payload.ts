import { legal } from '@/content/site'
import type { Inquiry } from '@/lib/inquiry-schema'

/**
 * The JSON body delivered to a webhook or form service (documented in the README).
 * Shared by the server route and the browser, so both send the same shape.
 */
export function buildInquiryPayload(inquiry: Inquiry) {
  const { formType, ...data } = inquiry
  return {
    formType,
    submittedAt: new Date().toISOString(),
    source: 'nil-website',
    consentVersion: legal.version,
    data,
  }
}
