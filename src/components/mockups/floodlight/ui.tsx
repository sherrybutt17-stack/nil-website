import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export const pad = (n: number) => String(n).padStart(2, '0')

/** Section label: chapter number, a short rule, then the label. */
export function Kicker({
  index,
  children,
  tone = 'flare',
  className,
}: {
  index?: number
  children: React.ReactNode
  tone?: 'flare' | 'ultra'
  className?: string
}) {
  return (
    <p className={cn('fl-label flex items-center gap-3 text-chalk/70', className)}>
      {index !== undefined && (
        <span aria-hidden="true" className={tone === 'ultra' ? 'text-ultra-soft' : 'text-flare'}>
          {pad(index)}
        </span>
      )}
      <span aria-hidden="true" className="h-px w-7 bg-current opacity-50" />
      {children}
    </p>
  )
}

type ButtonTone = 'ultra' | 'flare' | 'line-flare' | 'line'

export function FlButton({
  href,
  tone,
  children,
  size,
  icon: Icon = ArrowRight,
  className,
  onClick,
}: {
  href: string
  tone: ButtonTone
  children: React.ReactNode
  size?: 'sm'
  icon?: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean | 'true' }> | null
  className?: string
  onClick?: () => void
}) {
  return (
    <Link href={href} onClick={onClick} className={cn('fl-btn', `fl-btn--${tone}`, size === 'sm' && 'fl-btn--sm', className)}>
      {children}
      {Icon && <Icon className="fl-btn__arrow size-4 shrink-0" aria-hidden="true" />}
    </Link>
  )
}
