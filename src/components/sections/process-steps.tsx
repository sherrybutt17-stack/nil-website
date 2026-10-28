import { cn } from '@/lib/utils'
import { Reveal } from '@/components/motion/reveal'

export type Step = { title: string; body: string }

type ProcessStepsProps = {
  steps: Step[]
  /** Colour of the outlined step numerals. */
  numeralClassName?: string
  className?: string
}

/** Numbered process with outlined "jersey" numerals. Renders as an ordered list. */
export function ProcessSteps({ steps, numeralClassName, className }: ProcessStepsProps) {
  return (
    <ol
      className={cn(
        'grid gap-x-8 gap-y-12 sm:grid-cols-2',
        steps.length === 5 ? 'lg:grid-cols-5' : 'lg:grid-cols-4',
        className
      )}
    >
      {steps.map((step, i) => (
        <li key={step.title}>
          <Reveal delay={i * 0.08} className="flex h-full flex-col border-t-2 border-current/20 pt-5">
            <span aria-hidden="true" className={cn('numeral-outline text-[5.5rem]', numeralClassName)}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="mt-4 text-xl font-bold">
              <span className="sr-only">Step {i + 1}: </span>
              {step.title}
            </h3>
            <p className="mt-2.5 text-base leading-relaxed opacity-80 text-pretty">{step.body}</p>
          </Reveal>
        </li>
      ))}
    </ol>
  )
}
