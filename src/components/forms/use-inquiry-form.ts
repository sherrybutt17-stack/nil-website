'use client'

import { useCallback, useMemo, useState } from 'react'
import type { z } from 'zod'
import { buildInquiryPayload } from '@/lib/inquiry-payload'
import { toFieldErrors, type FieldErrors, type FormType, type Inquiry } from '@/lib/inquiry-schema'

export type SubmitStatus = 'idle' | 'submitting' | 'success' | 'not_configured' | 'error'

// Where submissions go. A form service URL (NEXT_PUBLIC_INQUIRY_ENDPOINT) is posted to
// directly from the browser; static hosting needs one. Otherwise this site's own
// /api/inquiries route is used, which a static export doesn't include.
const DIRECT_ENDPOINT = process.env.NEXT_PUBLIC_INQUIRY_ENDPOINT
const HAS_API_ROUTE = process.env.NEXT_PUBLIC_STATIC_EXPORT !== 'true'

type BaseValues = { formType: FormType }

/**
 * Form state, validation and submission for the inquiry forms.
 *
 * - Errors show after a field is blurred with content, and for every field
 *   once the visitor has tried to submit.
 * - On a failed submit, focus moves to the first invalid control.
 * - `success` is only set when the endpoint confirms delivery.
 */
export function useInquiryForm<V extends BaseValues>(schema: z.ZodType, initial: V) {
  const [values, setValues] = useState<V>(initial)
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [attempted, setAttempted] = useState(false)
  const [summaryKeys, setSummaryKeys] = useState<string[]>([])
  const [serverErrors, setServerErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<SubmitStatus>('idle')
  const [honeypot, setHoneypot] = useState('')

  const clientErrors = useMemo(() => {
    const result = schema.safeParse(values)
    return result.success ? {} : toFieldErrors(result.error.issues)
  }, [schema, values])

  const errors = useMemo(() => {
    const merged: FieldErrors = { ...serverErrors, ...clientErrors }
    const visible: FieldErrors = {}
    for (const [key, message] of Object.entries(merged)) {
      const root = key.split('.')[0]
      if (attempted || touched[key] || touched[root]) visible[key] = message
    }
    return visible
  }, [attempted, clientErrors, serverErrors, touched])

  /** Errors from the last submit attempt that are still unresolved, for the summary. */
  const summary = useMemo(
    () => summaryKeys.filter((key) => key in errors).map((key) => ({ key, message: errors[key] })),
    [errors, summaryKeys]
  )

  const setField = useCallback(<K extends keyof V>(key: K, value: V[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }))
    setServerErrors((prev) => {
      if (!((key as string) in prev)) return prev
      const next = { ...prev }
      delete next[key as string]
      return next
    })
    setStatus((prev) => (prev === 'error' || prev === 'not_configured' ? 'idle' : prev))
  }, [])

  /** Mark a field as visited. Empty fields aren't flagged until submit. */
  const touch = useCallback((key: string, hasValue: boolean) => {
    if (hasValue) setTouched((prev) => (prev[key] ? prev : { ...prev, [key]: true }))
  }, [])

  // Runs after React re-renders with the new errors.
  const focusFirstInvalid = (formEl: HTMLFormElement) => {
    requestAnimationFrame(() => {
      formEl.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus()
    })
  }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formEl = event.currentTarget
    if (status === 'submitting') return
    setAttempted(true)

    const result = schema.safeParse(values)
    if (!result.success) {
      setSummaryKeys(Object.keys(toFieldErrors(result.error.issues)))
      focusFirstInvalid(formEl)
      return
    }

    setSummaryKeys([])

    if (DIRECT_ENDPOINT) {
      // Only bots fill the hidden field; skip sending without telling them.
      if (honeypot.trim()) return setStatus('success')
      setStatus('submitting')
      try {
        const response = await fetch(DIRECT_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(buildInquiryPayload(result.data as Inquiry)),
        })
        setStatus(response.ok ? 'success' : 'error')
      } catch {
        setStatus('error')
      }
      return
    }

    if (!HAS_API_ROUTE) return setStatus('not_configured')

    setStatus('submitting')
    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, company_website: honeypot }),
      })
      const body = (await response.json().catch(() => ({}))) as {
        ok?: boolean
        error?: string
        fieldErrors?: FieldErrors
      }

      if (response.ok && body.ok) {
        setStatus('success')
      } else if (response.status === 503 && body.error === 'not_configured') {
        setStatus('not_configured')
      } else if (response.status === 400 && body.fieldErrors) {
        setServerErrors(body.fieldErrors)
        setSummaryKeys(Object.keys(body.fieldErrors))
        setStatus('idle')
        focusFirstInvalid(formEl)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return { values, setField, touch, errors, summary, status, onSubmit, honeypot, setHoneypot }
}

export type InquiryForm<V extends BaseValues> = ReturnType<typeof useInquiryForm<V>>
