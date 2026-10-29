import { sampleContact } from '@/content/sample'

/*
 * Drop-in replacements for src/components/placeholder.tsx used by the design
 * concepts: they render fictional sample details instead of dashed placeholders.
 */

export function ContactEmail({ className }: { className?: string }) {
  return (
    <a href={`mailto:${sampleContact.email}`} className={className ?? 'underline decoration-2 underline-offset-4'}>
      {sampleContact.email}
    </a>
  )
}

/** Shows the sample value for a placeholder label the concepts use. */
export function Placeholder({ label }: { label: string }) {
  if (label === 'City / region') return <>{sampleContact.location}</>
  if (label === 'Agency email address') return <ContactEmail />
  if (label === 'Social profile links') {
    return (
      <span className="inline-flex flex-wrap gap-x-3 gap-y-1">
        {sampleContact.social.map((social) => (
          <a key={social.href} href={social.href} target="_blank" rel="noopener" className="underline-offset-4 hover:underline">
            {social.label}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        ))}
      </span>
    )
  }
  return <>{label}</>
}
