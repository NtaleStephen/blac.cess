'use client'

import clsx from 'clsx'

interface SizeSelectorProps {
  sizes: string[]
  selected: string
  onChange: (size: string) => void
}

export default function SizeSelector({ sizes, selected, onChange }: SizeSelectorProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <label className="gold-label">Select Size</label>
        <button className="text-[10px] text-gray-500 hover:text-gold underline underline-offset-2 transition-colors font-mono uppercase tracking-wider">
          Size Chart
        </button>
      </div>
      <div className="grid grid-cols-6 gap-2">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => onChange(size)}
            className={clsx(
              'h-10 text-xs font-mono tracking-wide border transition-all duration-200',
              selected === size
                ? 'bg-gold text-black border-gold font-bold'
                : 'bg-transparent text-gray-400 border-gold/20 hover:border-gold hover:text-gold'
            )}
            aria-label={`Select size ${size}`}
            aria-pressed={selected === size}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  )
}
