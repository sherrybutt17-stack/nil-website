import { legal } from '@/content/site'
import type { FormType, Inquiry } from '@/lib/inquiry-schema'

/**
 * Forwards a validated inquiry to the webhook configured for its form.
 *
 *   INQUIRY_WEBHOOK_URL_AGENCY / _ATHLETE / _CONTACT   per-form endpoint (optional)
 *   INQUIRY_WEBHOOK_URL                                  fallback for all forms
 *   INQUIRY_WEBHOOK_SECRET                               sent as `Authorization: Bearer …` (optional)
 *
 * Works with anything that accepts a JSON POST: Zapier, Make, n8n, a Google
 * Apps Script web app, a CRM automation, or your own API.
 */

export type DeliveryResult = { status: 'delivered' } | { status: 'not_configured' } | { status: 'failed' }

const TIMEOUT_MS = 10_000

export async function deliverInquiry(inquiry: Inquiry): Promise<DeliveryResult> {
  const endpoint = resolveEndpoint(inquiry.formType)
  if (!endpoint) return { status: 'not_configured' }

  const { formType, ...data } = inquiry
  const payload = {
    formType,
    submittedAt: new Date().toISOString(),
    source: 'nil-website',
    consentVersion: legal.version,
    data,
  }

  const headers: Record<string, string> = { 'Content-Type': 'application/json', Accept: 'application/json' }
  const secret = process.env.INQUIRY_WEBHOOK_SECRET
  if (secret) headers.Authorization = `Bearer ${secret}`

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(TIMEOUT_MS),
      cache: 'no-store',
    })
    if (!response.ok) {
      // Log status only — never the submission itself.
      console.error(`[inquiries] ${formType} webhook responded ${response.status}`)
      return { status: 'failed' }
    }
    return { status: 'delivered' }
  } catch (error) {
    console.error(`[inquiries] ${formType} webhook request failed: ${(error as Error).name}`)
    return { status: 'failed' }
  }
}

function resolveEndpoint(formType: FormType): string | null {
  const specific = process.env[`INQUIRY_WEBHOOK_URL_${formType.toUpperCase()}`]
  const raw = (specific || process.env.INQUIRY_WEBHOOK_URL || '').trim()
  if (!raw) return null

  try {
    const url = new URL(raw)
    const isLocal = url.hostname === 'localhost' || url.hostname === '127.0.0.1'
    if (url.protocol === 'https:' || (url.protocol === 'http:' && isLocal)) return url.toString()
  } catch {
    // fall through
  }
  console.error(`[inquiries] Ignoring invalid webhook URL for "${formType}". Use an https:// URL.`)
  return null
}
