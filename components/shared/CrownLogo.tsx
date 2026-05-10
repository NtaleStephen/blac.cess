import type { SVGProps } from 'react'

export default function CrownLogo({ className = '', ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 240 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <circle cx="120" cy="10" r="6" fill="currentColor" />

      <path
        d="M 36 78 L 36 36 L 84 78 L 120 18 L 156 78 L 204 36 L 204 78 Z"
        stroke="currentColor"
        strokeWidth="10"
        strokeLinejoin="miter"
      />

      <path
        d="M 120 30 L 144 54 L 120 78 L 96 54 Z"
        stroke="currentColor"
        strokeWidth="10"
        strokeLinejoin="miter"
      />

      <path
        d="M 66 54 L 78 54 L 86 62 L 74 62 Z"
        fill="currentColor"
      />
      <path
        d="M 174 54 L 162 54 L 154 62 L 166 62 Z"
        fill="currentColor"
      />

      <path
        d="M 52 50 L 70 50 M 56 60 L 74 60 M 160 50 L 178 50 M 166 60 L 184 60"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="square"
      />

      <path
        d="M 36 88 H 204"
        stroke="currentColor"
        strokeWidth="12"
      />

      <rect x="36" y="94" width="168" height="18" fill="currentColor" opacity="0.12" />
      <path
        d="M 44 112 H 196 V 94 H 44 Z"
        stroke="currentColor"
        strokeWidth="10"
      />

      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M 62 99 L 70 103 L 62 107 L 54 103 Z M 78 99 L 86 103 L 78 107 L 70 103 Z M 94 99 L 102 103 L 94 107 L 86 103 Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M 178 99 L 186 103 L 178 107 L 170 103 Z M 162 99 L 170 103 L 162 107 L 154 103 Z M 146 99 L 154 103 L 146 107 L 138 103 Z"
        fill="currentColor"
      />
      <path
        d="M 112 98 L 120 104 L 128 98 M 104 110 L 120 96 L 136 110"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinejoin="miter"
      />
    </svg>
  )
}
