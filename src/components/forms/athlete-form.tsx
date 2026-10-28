'use client'

import {
  ChoiceChips,
  ConsentField,
  FieldError,
  SelectField,
  TextAreaField,
  TextField,
  fieldId,
} from '@/components/forms/fields'
import { FormShell } from '@/components/forms/form-shell'
import { useInquiryForm } from '@/components/forms/use-inquiry-form'
import { athleteInterests, OTHER_SPORT, sports } from '@/content/options'
import { legal, site } from '@/content/site'
import { athleteSchema } from '@/lib/inquiry-schema'

const FORM_ID = 'athlete'
const sportOptions = [...sports, OTHER_SPORT]

type Social = { instagram: string; tiktok: string; other: string }

export function AthleteForm() {
  const form = useInquiryForm(athleteSchema, {
    formType: 'athlete' as const,
    fullName: '',
    email: '',
    sport: '',
    sportOther: '',
    schoolOrTeam: '',
    position: '',
    social: { instagram: '', tiktok: '', other: '' } as Social,
    interests: [] as string[],
    message: '',
    consent: false,
  })
  const { values, setField, touch, errors } = form
  const id = (key: string) => fieldId(FORM_ID, key)
  const setSocial = (key: keyof Social, v: string) => setField('social', { ...values.social, [key]: v })
  const socialGroupError = errors.social

  return (
    <FormShell
      formId={FORM_ID}
      form={form}
      label="Athlete signup"
      submitLabel="Submit my profile"
      variant="athlete"
      success={{
        title: 'Profile received.',
        body: (
          <>
            <p>
              Thanks{values.fullName ? `, ${values.fullName.split(' ')[0]}` : ''}. Your profile is with the Real NIL Agency team.
            </p>
            <p>
              A person on our team will review it. When an agency campaign fits you, we’ll reach out at{' '}
              <strong>{values.email}</strong>
              {site.contact.responseTime ? ` — we usually reply ${site.contact.responseTime}` : ''}.
            </p>
          </>
        ),
      }}
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <TextField
          id={id('fullName')}
          label="Your name"
          autoComplete="name"
          value={values.fullName}
          onValueChange={(v) => setField('fullName', v)}
          onBlur={() => touch('fullName', values.fullName !== '')}
          error={errors.fullName}
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

      <div className="grid gap-6 sm:grid-cols-2">
        <SelectField
          id={id('sport')}
          label="Sport"
          placeholder="Choose your sport"
          options={sportOptions}
          value={values.sport}
          onValueChange={(v) => setField('sport', v)}
          onBlur={() => touch('sport', values.sport !== '')}
          error={errors.sport}
        />
        {values.sport === OTHER_SPORT && (
          <TextField
            id={id('sportOther')}
            label="Which sport?"
            value={values.sportOther}
            onValueChange={(v) => setField('sportOther', v)}
            onBlur={() => touch('sportOther', values.sportOther !== '')}
            error={errors.sportOther}
            maxLength={60}
          />
        )}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <TextField
          id={id('schoolOrTeam')}
          label="School or team"
          optional
          autoComplete="organization"
          value={values.schoolOrTeam}
          onValueChange={(v) => setField('schoolOrTeam', v)}
          onBlur={() => touch('schoolOrTeam', values.schoolOrTeam !== '')}
          error={errors.schoolOrTeam}
          maxLength={120}
        />
        <TextField
          id={id('position')}
          label="Position or event"
          optional
          hint="For example: point guard, 400m, goalkeeper."
          value={values.position}
          onValueChange={(v) => setField('position', v)}
          onBlur={() => touch('position', values.position !== '')}
          error={errors.position}
          maxLength={80}
        />
      </div>

      <fieldset
        id={id('social')}
        tabIndex={-1}
        aria-describedby={[`${id('social')}-hint`, socialGroupError && `${id('social')}-error`].filter(Boolean).join(' ')}
        className="flex flex-col gap-4 outline-none"
      >
        <legend className="mb-1 text-sm leading-snug font-semibold text-ink">Social profiles</legend>
        <p id={`${id('social')}-hint`} className="text-sm text-smoke">
          Add at least one. A profile link or an @handle both work.
        </p>
        <FieldError id={`${id('social')}-error`} message={socialGroupError} />
        <div className="grid gap-6 sm:grid-cols-3">
          <TextField
            id={id('social.instagram')}
            label="Instagram"
            optional
            placeholder="@yourhandle"
            autoComplete="off"
            spellCheck={false}
            autoCapitalize="none"
            value={values.social.instagram}
            onValueChange={(v) => setSocial('instagram', v)}
            onBlur={() => touch('social.instagram', values.social.instagram !== '')}
            error={errors['social.instagram']}
            aria-invalid={errors['social.instagram'] || socialGroupError ? true : undefined}
            maxLength={300}
          />
          <TextField
            id={id('social.tiktok')}
            label="TikTok"
            optional
            placeholder="@yourhandle"
            autoComplete="off"
            spellCheck={false}
            autoCapitalize="none"
            value={values.social.tiktok}
            onValueChange={(v) => setSocial('tiktok', v)}
            onBlur={() => touch('social.tiktok', values.social.tiktok !== '')}
            error={errors['social.tiktok']}
            aria-invalid={errors['social.tiktok'] || socialGroupError ? true : undefined}
            maxLength={300}
          />
          <TextField
            id={id('social.other')}
            label="Other link"
            optional
            hint="YouTube, X, a website…"
            type="url"
            autoComplete="url"
            spellCheck={false}
            autoCapitalize="none"
            value={values.social.other}
            onValueChange={(v) => setSocial('other', v)}
            onBlur={() => touch('social.other', values.social.other !== '')}
            error={errors['social.other']}
            aria-invalid={errors['social.other'] || socialGroupError ? true : undefined}
            maxLength={300}
          />
        </div>
      </fieldset>

      <ChoiceChips
        id={id('interests')}
        legend="Partnership interests"
        hint="Choose all that apply."
        options={athleteInterests}
        value={values.interests}
        onValueChange={(v) => setField('interests', v)}
        error={errors.interests}
        checkedClassName="border-flare bg-flare text-ink"
      />

      <TextAreaField
        id={id('message')}
        label="Anything else we should know?"
        optional
        hint="Highlights, your content style, causes you care about, brands you’d love to work with."
        value={values.message}
        onValueChange={(v) => setField('message', v)}
        onBlur={() => touch('message', values.message !== '')}
        error={errors.message}
        maxLength={2000}
        rows={5}
      />

      <ConsentField
        id={id('consent')}
        text={legal.consent.athlete}
        checked={values.consent}
        onCheckedChange={(v) => setField('consent', v)}
        error={errors.consent}
        note={legal.minorsNote}
      />
    </FormShell>
  )
}
