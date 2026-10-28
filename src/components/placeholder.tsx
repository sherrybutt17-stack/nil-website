import { site } from '@/content/site'

/**
 * A visible marker for details NIL still needs to supply.
 * Values are set in src/content/site.ts — see README "Placeholders".
 */
export function Placeholder({ label }: { label: string }) {
  return <span className="placeholder-chip">[{label}]</span>
}

export function ContactEmail({ className }: { className?: string }) {
  const { email } = site.contact
  if (!email) return <Placeholder label="NIL email address" />
  return (
    <a href={`mailto:${email}`} className={className ?? 'underline decoration-2 underline-offset-4'}>
      {email}
    </a>
  )
}
