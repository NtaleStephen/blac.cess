import Image from 'next/image'
import clsx from 'clsx'

type Props = {
  className?: string
  variant?: 'full' | 'icon' | 'text'
  iconSize?: number
  dark?: boolean
}

export default function BrandLogo({
  className,
  variant = 'full',
  iconSize = 32,
  dark = false,
}: Props) {
  const textColor = dark ? 'text-black' : 'text-gold'

  if (variant === 'icon') {
    return (
      <Image
        src="/images/brand-logo.jpg"
        alt="Blac.cess"
        width={iconSize}
        height={iconSize}
        className={clsx('rounded', className)}
      />
    )
  }

  if (variant === 'text') {
    return (
      <span className={clsx('font-serif tracking-tight', textColor, className)}>
        blac.cess
      </span>
    )
  }

  // Full variant: icon + text
  return (
    <div className={clsx('flex items-center gap-2', className)}>
      <Image
        src="/images/brand-logo.jpg"
        alt=""
        width={iconSize}
        height={iconSize}
        className="rounded"
        priority
      />
      <span className={clsx('font-serif text-xl md:text-2xl tracking-tight', textColor)}>
        blac.cess
      </span>
    </div>
  )
}
