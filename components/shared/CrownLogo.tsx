import Image from 'next/image'

type Props = {
  className?: string
  style?: React.CSSProperties
  priority?: boolean
  alt?: string
}

export default function CrownLogo({
  className,
  style,
  priority = false,
  alt = 'Blac.cess crown logo',
}: Props) {
  return (
    <Image
      src="/images/E65ECE06-D9A8-47B2-A4FE-CC28190076EA.jpg"
      alt={alt}
      width={1200}
      height={520}
      priority={priority}
      className={className}
      style={style}
    />
  )
}
