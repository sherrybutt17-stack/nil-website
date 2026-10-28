import { deliverInquiry } from '@/lib/deliver'
import { inquirySchema, toFieldErrors } from '@/lib/inquiry-schema'

/**
 * POST /api/inquiries — receives the agency, athlete and contact forms.
 *
 * Responds 200 { ok: true } only after the configured webhook accepted the
 * submission. If no webhook is configured it responds 503 not_configured, and
 * the form tells the visitor their details were NOT sent.
 * Nothing is stored here and there is no way to read submissions back.
 */

const MAX_BODY_BYTES = 20_000
const HONEYPOT_FIELD = 'company_website'

export async function POST(request: Request) {
  if (!request.headers.get('content-type')?.includes('application/json')) {
    return reply(415, { ok: false, error: 'unsupported_media_type' })
  }

  const raw = await request.text()
  if (new TextEncoder().encode(raw).byteLength > MAX_BODY_BYTES) {
    return reply(413, { ok: false, error: 'payload_too_large' })
  }

  let body: unknown
  try {
    body = JSON.parse(raw)
  } catch {
    return reply(400, { ok: false, error: 'invalid_json' })
  }

  // Bots fill the hidden field; people never see it. Drop quietly.
  if (isRecord(body) && typeof body[HONEYPOT_FIELD] === 'string' && body[HONEYPOT_FIELD].trim() !== '') {
    return reply(200, { ok: true })
  }

  const parsed = inquirySchema.safeParse(body)
  if (!parsed.success) {
    return reply(400, { ok: false, error: 'invalid', fieldErrors: toFieldErrors(parsed.error.issues) })
  }

  const result = await deliverInquiry(parsed.data)
  switch (result.status) {
    case 'delivered':
      return reply(200, { ok: true })
    case 'not_configured':
      return reply(503, { ok: false, error: 'not_configured' })
    case 'failed':
      return reply(502, { ok: false, error: 'delivery_failed' })
  }
}

function reply(status: number, body: Record<string, unknown>) {
  return Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } })
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}
