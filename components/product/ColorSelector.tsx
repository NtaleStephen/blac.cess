'use client'

import clsx from 'clsx'
import { ProductColor } from '@/lib/types'
import { Check } from 'lucide-react'

interface ColorSelectorProps {
  colors: ProductColor[]
  selected: string
  onChange: (color: string) => void
}

export default function ColorSelector({ colors, selected, onChange }: ColorSelectorProps) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <label className="gold-label">Colour</label>
        <span className="text-gray-400 text-xs">— {selected}</span>
      </div>
      <div className="flex gap-3">
        {colors.map((color) => (
          <button
            key={color.slug}
            onClick={() => onChange(color.name)}
            title={color.name}
            aria-label={`Select colour ${color.name}`}
            aria-pressed={selected === color.name}
            className={clsx(
              'relative w-9 h-9 rounded-full border-2 flex items-center justify-center transition-all duration-200',
              selected === color.name
                ? 'border-gold scale-110'
                : 'border-transparent hover:border-gold/40 hover:scale-105'
            )}
            style={{ backgroundColor: color.hex }}
          >
            {selected === color.name && (
              <Check
                size={14}
                className={color.hex === '#ffffff' ? 'text-black' : 'text-gold'}
                strokeWidth={3}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
