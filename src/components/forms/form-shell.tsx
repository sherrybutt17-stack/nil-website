'use client'

import { useEffect, useRef } from 'react'
import { AnimatePresence } from 'motion/react'
import * as m from 'motion/react-m'
import { AlertTriangle, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ContactEmail } from '@/components/placeholder'
import { ErrorSummary, Honeypot } from '@/components/forms/fields'
import type { InquiryForm } from '@/components/forms/use-inquiry-form'
import type { FormType } from '@/lib/inquiry-schema'
import { cn } from '@/lib/utils'

type Variant = 'athlete' | 'agency' | 'ink'

type FormShellProps<V extends { formType: FormType }> = {
  formId: string
  form: InquiryForm<V>
  label: string
  submitLabel: string
  variant: Variant
  success: { title: string; body: React.ReactNode }
  children: React.ReactNode
}

export function FormShell<V extends { formType: FormType }>({
  formId,
  form,
  label,
  submitLabel,
  variant,
  success,
  children,
}: FormShellProps<V>) {
  const submitting = form.status === 'submitting'

  return (
    <AnimatePresence mode="wait" initial={false}>
      {form.status === 'success' ? (
        <m.div
          key="success"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <SuccessPanel title={success.title} variant={variant}>
            {success.body}
          </SuccessPanel>
        </m.div>
      ) : (
        <m.form
          key="form"
          aria-label={label}
          noValidate
          onSubmit={form.onSubmit}
          exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}
          className="relative flex flex-col gap-7"
        >
          <ErrorSummary formId={formId} items={form.summary} />
          {children}
          <Honeypot value={form.honeypot} onValueChange={form.setHoneypot} />

          <AnimatePresence initial={false}>
            {(form.status === 'not_configured' || form.status === 'error') && (
              <m.div
                key={form.status}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <DeliveryProblem kind={form.status} />
              </m.div>
            )}
          </AnimatePresence>

          <div className="flex flex-col gap-4 border-t-2 border-ink/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-smoke">Takes about two minutes. No passwords, IDs or payment details.</p>
            <Button
              type="submit"
              variant={variant}
              size="lg"
              aria-disabled={submitting || undefined}
              className={cn('w-full sm:w-auto', submitting && 'cursor-progress opacity-80')}
            >
              {submitting ? (
                <>
                  <Loader2 className="animate-spin" aria-hidden="true" /> Sending…
                </>
              ) : (
                <>
                  {submitLabel} <ArrowRight aria-hidden="true" className="transition-transform group-hover/button:translate-x-1" />
                </>
              )}
            </Button>
          </div>
          <p aria-live="polite" className="sr-only">
            {submitting ? 'Sending your form…' : ''}
          </p>
        </m.form>
      )}
    </AnimatePresence>
  )
}

function DeliveryProblem({ kind }: { kind: 'not_configured' | 'error' }) {
  return (
    <div role="alert" className="flex gap-3 rounded-md border-2 border-ink bg-chalk p-5">
      <AlertTriangle className="mt-0.5 size-5 shrink-0 text-danger" aria-hidden="true" />
      <div className="space-y-2 text-[0.9375rem] leading-relaxed">
        {kind === 'not_configured' ? (
          <>
            <p className="font-bold">Your details weren’t sent.</p>
            <p>
              Online signups aren’t connected yet, so this form couldn’t be delivered. Your answers are still filled in
              — please email them to us at <ContactEmail /> instead.
            </p>
            {process.env.NODE_ENV === 'development' && (
              <p className="text-sm text-smoke">
                Developer note: set <code className="font-mono">INQUIRY_WEBHOOK_URL</code> to enable delivery. See
                README → Forms.
              </p>
            )}
          </>
        ) : (
          <>
            <p className="font-bold">Something went wrong, and your details weren’t sent.</p>
            <p>
              Please check your connection and try again. If it keeps happening, email us at <ContactEmail />.
            </p>
          </>
        )}
      </div>
    </div>
  )
}

function SuccessPanel({ title, variant, children }: { title: string; variant: Variant; children: React.ReactNode }) {
  const headingRef = useRef<HTMLHeadingElement>(null)
  useEffect(() => headingRef.current?.focus(), [])

  return (
    <div
      role="status"
      className={cn(
        'rounded-md p-8 sm:p-10',
        variant === 'athlete' && 'surface-flare',
        variant === 'agency' && 'surface-ultra',
        variant === 'ink' && 'surface-ink'
      )}
    >
      <CheckCircle2 className="size-10" aria-hidden="true" />
      <h3 ref={headingRef} tabIndex={-1} className="display mt-6 text-5xl outline-none sm:text-6xl">
        {title}
      </h3>
      <div className="mt-5 max-w-lg space-y-3 text-lg leading-relaxed">{children}</div>
    </div>
  )
}
