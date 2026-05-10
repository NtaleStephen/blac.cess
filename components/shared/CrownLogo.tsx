import type { SVGProps } from 'react'

export default function CrownLogo({ className = '', ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 100 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path d="M 10 25 L 10 8 L 30 25 L 50 0 L 70 25 L 90 8 L 90 25 Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="miter" />
      <path d="M 50 5 L 55 11 L 50 17 L 45 11 Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M 10 28 L 90 28 L 90 34 L 10 34 Z M 18 29.5 L 16 31 L 18 32.5 L 20 31 Z M 34 29.5 L 32 31 L 34 32.5 L 36 31 Z M 50 29.5 L 48 31 L 50 32.5 L 52 31 Z M 66 29.5 L 64 31 L 66 32.5 L 68 31 Z M 82 29.5 L 80 31 L 82 32.5 L 84 31 Z" fill="currentColor" />
    </svg>
  )
}
