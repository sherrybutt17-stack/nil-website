'use client'

import Link from 'next/link'
import { AlertCircle, Check, ChevronDown } from 'lucide-react'
import { Input, fieldBase } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { legal } from '@/content/site'
import { cn } from '@/lib/utils'

/* Field ids follow `${formId}-${key}` with dots replaced, so error-summary links can target them. */
export const fieldId = (formId: string, key: string) => `${formId}-${key.replace(/\./g, '-')}`

const describedBy = (...ids: (string | false | undefined)[]) => ids.filter(Boolean).join(' ') || undefined

function Optional() {
  return <span className="font-normal text-smoke"> (optional)</span>
}

export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <p id={id} className="flex items-start gap-1.5 text-sm font-semibold text-danger">
      <AlertCircle className="mt-px size-4 shrink-0" aria-hidden="true" />
      <span>
        <span className="sr-only">Error: </span>
        {message}
      </span>
    </p>
  )
}

type CommonProps = {
  id: string
  label: string
  error?: string
  hint?: string
  optional?: boolean
  className?: string
}

type TextFieldProps = CommonProps &
  Omit<React.ComponentProps<'input'>, 'id' | 'onChange' | 'value'> & {
    value: string
    onValueChange: (value: string) => void
  }

export function TextField({ id, label, error, hint, optional, className, value, onValueChange, ...props }: TextFieldProps) {
  const hintId = hint ? `${id}-hint` : undefined
  const errorId = `${id}-error`
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <Label htmlFor={id}>
        {label}
        {optional && <Optional />}
      </Label>
      {hint && (
        <p id={hintId} className="-mt-0.5 text-sm text-smoke">
          {hint}
        </p>
      )}
      <Input
        id={id}
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(hintId, error && errorId)}
        required={!optional}
        {...props}
      />
      <FieldError id={errorId} message={error} />
    </div>
  )
}

type TextAreaFieldProps = CommonProps &
  Omit<React.ComponentProps<'textarea'>, 'id' | 'onChange' | 'value'> & {
    value: string
    onValueChange: (value: string) => void
  }

export function TextAreaField({ id, label, error, hint, optional, className, value, onValueChange, ...props }: TextAreaFieldProps) {
  const hintId = hint ? `${id}-hint` : undefined
  const errorId = `${id}-error`
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <Label htmlFor={id}>
        {label}
        {optional && <Optional />}
      </Label>
      {hint && (
        <p id={hintId} className="-mt-0.5 text-sm text-smoke">
          {hint}
        </p>
      )}
      <Textarea
        id={id}
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(hintId, error && errorId)}
        required={!optional}
        {...props}
      />
      <FieldError id={errorId} message={error} />
    </div>
  )
}

type SelectFieldProps = CommonProps & {
  value: string
  onValueChange: (value: string) => void
  options: readonly string[]
  placeholder?: string
  onBlur?: () => void
  autoComplete?: string
}

export function SelectField({
  id,
  label,
  error,
  hint,
  optional,
  className,
  value,
  onValueChange,
  options,
  placeholder = 'Select one',
  onBlur,
  autoComplete,
}: SelectFieldProps) {
  const hintId = hint ? `${id}-hint` : undefined
  const errorId = `${id}-error`
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <Label htmlFor={id}>
        {label}
        {optional && <Optional />}
      </Label>
      {hint && (
        <p id={hintId} className="-mt-0.5 text-sm text-smoke">
          {hint}
        </p>
      )}
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
          onBlur={onBlur}
          autoComplete={autoComplete}
          required={!optional}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(hintId, error && errorId)}
          className={cn(fieldBase, 'h-12 appearance-none pr-11', !value && 'text-smoke')}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option} value={option} className="text-ink">
              {option}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute top-1/2 right-3.5 size-5 -translate-y-1/2 text-ink"
          aria-hidden="true"
        />
      </div>
      <FieldError id={errorId} message={error} />
    </div>
  )
}

type ChoiceChipsProps = {
  id: string
  legend: string
  hint?: string
  options: readonly string[]
  value: string[]
  onValueChange: (value: string[]) => void
  error?: string
  /** Tailwind classes applied to a chip when it is checked. */
  checkedClassName: string
}

/** A group of checkboxes styled as chips. Native inputs keep keyboard and screen-reader support intact. */
export function ChoiceChips({ id, legend, hint, options, value, onValueChange, error, checkedClassName }: ChoiceChipsProps) {
  const hintId = hint ? `${id}-hint` : undefined
  const errorId = `${id}-error`
  const toggle = (option: string, checked: boolean) =>
    onValueChange(checked ? [...value, option] : value.filter((v) => v !== option))

  return (
    <fieldset aria-describedby={describedBy(hintId, error && errorId)} className="flex flex-col gap-3">
      {/* Legends aren't flex items, so spacing comes from the legend's own margin. */}
      <legend className="mb-1 text-sm leading-snug font-semibold text-ink">{legend}</legend>
      {hint && (
        <p id={hintId} className="text-sm text-smoke">
          {hint}
        </p>
      )}
      <div className="flex flex-wrap gap-2">
        {options.map((option, i) => {
          const checked = value.includes(option)
          return (
            <label
              key={option}
              className={cn(
                'relative inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border-2 px-4 py-2 text-sm font-semibold transition-colors select-none',
                'has-focus-visible:outline-3 has-focus-visible:outline-offset-2 has-focus-visible:outline-(--focus)',
                checked ? checkedClassName : 'border-smoke bg-paper text-ink hover:border-ink',
                error && !checked && 'border-danger'
              )}
            >
              <input
                type="checkbox"
                id={i === 0 ? id : undefined}
                className="sr-only"
                checked={checked}
                onChange={(e) => toggle(option, e.target.checked)}
                aria-invalid={error ? true : undefined}
              />
              <span
                aria-hidden="true"
                className={cn(
                  'grid size-[1.125rem] place-items-center rounded-full border-2 transition-colors',
                  checked ? 'border-current' : 'border-smoke'
                )}
              >
                {checked && <Check className="size-3" strokeWidth={4} />}
              </span>
              {option}
            </label>
          )
        })}
      </div>
      <FieldError id={errorId} message={error} />
    </fieldset>
  )
}

type ConsentFieldProps = {
  id: string
  text: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  error?: string
  note?: string
}

export function ConsentField({ id, text, checked, onCheckedChange, error, note }: ConsentFieldProps) {
  const errorId = `${id}-error`
  const noteId = note ? `${id}-note` : undefined
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-start gap-3">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onCheckedChange(e.target.checked)}
          required
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(noteId, error && errorId)}
          className="mt-0.5 size-6 shrink-0 cursor-pointer accent-ink aria-invalid:outline-2 aria-invalid:outline-danger"
        />
        <label htmlFor={id} className="cursor-pointer text-[0.9375rem] leading-relaxed text-ink">
          {text}{' '}
          <span className="text-smoke">
            See our{' '}
            <Link href={legal.privacyPath} className="font-semibold text-ink underline underline-offset-4">
              privacy policy
            </Link>
            .
          </span>
        </label>
      </div>
      {note && (
        <p id={noteId} className="pl-9 text-sm text-smoke">
          {note}
        </p>
      )}
      <div className="pl-9">
        <FieldError id={errorId} message={error} />
      </div>
    </div>
  )
}

/** Hidden from people (visually and from assistive tech); bots tend to fill it. */
export function Honeypot({ value, onValueChange }: { value: string; onValueChange: (v: string) => void }) {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label>
        Leave this field empty
        <input
          type="text"
          name="company_website"
          tabIndex={-1}
          autoComplete="off"
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
        />
      </label>
    </div>
  )
}

export function ErrorSummary({ formId, items }: { formId: string; items: { key: string; message: string }[] }) {
  return (
    <div role="alert" className="rounded-md border-2 border-danger bg-danger/[0.04] p-5" hidden={items.length === 0}>
      {items.length > 0 && (
        <>
          <h3 className="flex items-center gap-2 text-base font-bold text-danger">
            <AlertCircle className="size-5" aria-hidden="true" />
            {items.length === 1 ? 'There’s 1 thing to fix' : `There are ${items.length} things to fix`}
          </h3>
          <ul className="mt-3 list-disc space-y-1.5 pl-6 text-[0.9375rem]">
            {items.map((item) => (
              <li key={item.key}>
                <a
                  href={`#${fieldId(formId, item.key)}`}
                  className="font-semibold text-danger underline underline-offset-4"
                  onClick={(e) => {
                    const target = document.getElementById(fieldId(formId, item.key))
                    // Groups (fieldsets) link to their first control.
                    const control = target?.matches('input, select, textarea')
                      ? target
                      : target?.querySelector<HTMLElement>('input, select, textarea')
                    if (control) {
                      e.preventDefault()
                      control.focus()
                      control.scrollIntoView({ block: 'center' })
                    }
                  }}
                >
                  {item.message}
                </a>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}
