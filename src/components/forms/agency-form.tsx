'use client'

import { ChoiceChips, ConsentField, TextAreaField, TextField, fieldId } from '@/components/forms/fields'
import { FormShell } from '@/components/forms/form-shell'
import { useInquiryForm } from '@/components/forms/use-inquiry-form'
import { agencyCategories, campaignGoals } from '@/content/options'
import { legal, site } from '@/content/site'
import { agencySchema } from '@/lib/inquiry-schema'

const FORM_ID = 'agency'

export function AgencyForm() {
  const form = useInquiryForm(agencySchema, {
    formType: 'agency' as const,
    agencyName: '',
    contactName: '',
    workEmail: '',
    categories: [] as string[],
    goals: [] as string[],
    message: '',
    consent: false,
  })
  const { values, setField, touch, errors } = form
  const id = (key: string) => fieldId(FORM_ID, key)

  return (
    <FormShell
      formId={FORM_ID}
      form={form}
      label="Agency signup"
      submitLabel="Send request"
      variant="agency"
      success={{
        title: 'Request received.',
        body: (
          <>
            <p>
              Thanks{values.contactName ? `, ${values.contactName.split(' ')[0]}` : ''}. Your request is with the NIL
              team.
            </p>
            <p>
              We’ll review it and follow up at <strong>{values.workEmail}</strong> to talk through goals and timing
              {site.contact.responseTime ? ` — usually ${site.contact.responseTime}` : ''}.
            </p>
          </>
        ),
      }}
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <TextField
          id={id('agencyName')}
          label="Agency or company name"
          autoComplete="organization"
          value={values.agencyName}
          onValueChange={(v) => setField('agencyName', v)}
          onBlur={() => touch('agencyName', values.agencyName !== '')}
          error={errors.agencyName}
          maxLength={120}
        />
        <TextField
          id={id('contactName')}
          label="Your name"
          autoComplete="name"
          value={values.contactName}
          onValueChange={(v) => setField('contactName', v)}
          onBlur={() => touch('contactName', values.contactName !== '')}
          error={errors.contactName}
          maxLength={120}
        />
      </div>
      <TextField
        id={id('workEmail')}
        label="Work email"
        type="email"
        autoComplete="email"
        spellCheck={false}
        value={values.workEmail}
        onValueChange={(v) => setField('workEmail', v)}
        onBlur={() => touch('workEmail', values.workEmail !== '')}
        error={errors.workEmail}
        maxLength={254}
      />
      <ChoiceChips
        id={id('categories')}
        legend="Sports or athlete categories"
        hint="Choose all that apply."
        options={agencyCategories}
        value={values.categories}
        onValueChange={(v) => setField('categories', v)}
        error={errors.categories}
        checkedClassName="border-ultra bg-ultra text-white"
      />
      <ChoiceChips
        id={id('goals')}
        legend="Campaign goals"
        hint="Choose all that apply."
        options={campaignGoals}
        value={values.goals}
        onValueChange={(v) => setField('goals', v)}
        error={errors.goals}
        checkedClassName="border-ultra bg-ultra text-white"
      />
      <TextAreaField
        id={id('message')}
        label="Anything else we should know?"
        optional
        hint="Timing, deliverables, audience, markets — whatever helps us understand the campaign."
        value={values.message}
        onValueChange={(v) => setField('message', v)}
        onBlur={() => touch('message', values.message !== '')}
        error={errors.message}
        maxLength={2000}
        rows={5}
      />
      <ConsentField
        id={id('consent')}
        text={legal.consent.agency}
        checked={values.consent}
        onCheckedChange={(v) => setField('consent', v)}
        error={errors.consent}
      />
    </FormShell>
  )
}
