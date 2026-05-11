import Image from 'next/image'

type Props = {
  className?: string
  style?: React.CSSProperties
  priority?: boolean
  variant?: 'full' | 'icon'
}

export default function BrandLogo({
  className,
  style,
  priority = false,
  variant = 'full',
}: Props) {
  if (variant === 'icon') {
    return (
      <Image
        src="/images/E65ECE06-D9A8-47B2-A4FE-CC28190076EA.jpg"
        alt="Blac.cess"
        width={200}
        height={200}
        priority={priority}
        className={className}
        style={style}
      />
    )
  }

  return (
    <Image
      src="/images/brand.jpg"
      alt="Blac.cess"
      width={400}
      height={200}
      priority={priority}
      className={className}
      style={style}
    />
  )
}
