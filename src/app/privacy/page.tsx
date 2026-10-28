import type { Metadata } from 'next'
import { AlertTriangle } from 'lucide-react'
import { ContactEmail } from '@/components/placeholder'
import { site } from '@/content/site'

/*
 * TODO(placeholder): replace this page with NIL's privacy policy, written or
 * reviewed by qualified counsel, before collecting real submissions.
 * It is excluded from the sitemap and marked noindex until then.
 */

export const metadata: Metadata = {
  title: 'Privacy policy',
  description: `How ${site.name} handles the information submitted through its athlete, agency and contact forms.`,
  alternates: { canonical: '/privacy' },
  robots: { index: false, follow: true },
}

const sections = [
  'What information we collect through our forms',
  'How we use it (reviewing applications and requests, matching, contacting you)',
  'Where it is stored and who can access it',
  'How long we keep it',
  'Information about minors',
  'Your choices: updating or deleting your information',
  'Third-party services used to receive submissions',
  'How to contact us about privacy',
]

export default function PrivacyPage() {
  return (
    <section aria-labelledby="privacy-title" className="py-16 sm:py-24">
      <div className="container-x max-w-3xl">
        <p className="eyebrow text-smoke">Legal</p>
        <h1 id="privacy-title" className="display mt-4 text-6xl sm:text-8xl">
          Privacy policy
        </h1>

        <div role="note" className="mt-10 flex gap-4 rounded-md border-2 border-dashed border-ink p-6">
          <AlertTriangle className="mt-0.5 size-6 shrink-0" aria-hidden="true" />
          <div className="space-y-2 text-base leading-relaxed">
            <p className="font-bold">This page is a placeholder.</p>
            <p>
              NIL’s privacy policy hasn’t been published yet. It will replace this page once it has been prepared and
              reviewed. Until then, if you have questions about information you’ve submitted, contact us at{' '}
              <ContactEmail />.
            </p>
          </div>
        </div>

        <h2 className="mt-14 text-2xl font-bold">What the final policy will cover</h2>
        <ul className="mt-5 list-disc space-y-2 pl-6 text-lg leading-relaxed text-smoke">
          {sections.map((section) => (
            <li key={section}>{section}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
