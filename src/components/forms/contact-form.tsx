'use client'

import { ConsentField, SelectField, TextAreaField, TextField, fieldId } from '@/components/forms/fields'
import { FormShell } from '@/components/forms/form-shell'
import { useInquiryForm } from '@/components/forms/use-inquiry-form'
import { contactRoles } from '@/content/options'
import { legal, site } from '@/content/site'
import { contactSchema } from '@/lib/inquiry-schema'

const FORM_ID = 'contact'

export function ContactForm() {
  const form = useInquiryForm(contactSchema, {
    formType: 'contact' as const,
    name: '',
    email: '',
    role: '',
    message: '',
    consent: false,
  })
  const { values, setField, touch, errors } = form
  const id = (key: string) => fieldId(FORM_ID, key)

  return (
    <FormShell
      formId={FORM_ID}
      form={form}
      label="General inquiry"
      submitLabel="Send message"
      variant="ink"
      success={{
        title: 'Message sent.',
        body: (
          <p>
            Thanks for getting in touch. The Real NIL Agency team will reply to <strong>{values.email}</strong>
            {site.contact.responseTime ? `, usually ${site.contact.responseTime}` : ''}.
          </p>
        ),
      }}
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <TextField
          id={id('name')}
          label="Your name"
          autoComplete="name"
          value={values.name}
          onValueChange={(v) => setField('name', v)}
          onBlur={() => touch('name', values.name !== '')}
          error={errors.name}
          maxLength={120}
        />
        <TextField
          id={id('email')}
          label="Email"
          type="email"
          autoComplete="email"
          spellCheck={false}
          value={values.email}
          onValueChange={(v) => setField('email', v)}
          onBlur={() => touch('email', values.email !== '')}
          error={errors.email}
          maxLength={254}
        />
      </div>
      <SelectField
        id={id('role')}
        label="I am a…"
        options={contactRoles}
        value={values.role}
        onValueChange={(v) => setField('role', v)}
        onBlur={() => touch('role', values.role !== '')}
        error={errors.role}
      />
      <TextAreaField
        id={id('message')}
        label="Message"
        value={values.message}
        onValueChange={(v) => setField('message', v)}
        onBlur={() => touch('message', values.message !== '')}
        error={errors.message}
        maxLength={2000}
        rows={6}
      />
      <ConsentField
        id={id('consent')}
        text={legal.consent.contact}
        checked={values.consent}
        onCheckedChange={(v) => setField('consent', v)}
        error={errors.consent}
      />
    </FormShell>
  )
}
