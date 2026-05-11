'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/lib/types'
import clsx from 'clsx'

interface ProductCardProps {
  product: Product
  index?: number
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <Link
      href={`/products/${product.slug}`}
      className="product-card group animate-fade-in block"
      style={{ animationDelay: `${index * 0.1}s` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-black">
        <Image
          src={product.image}
          alt={`${product.name} — ${product.variant} | Blac.cess`}
          fill
          className={clsx(
            'object-cover transition-transform duration-700',
            hovered ? 'scale-108' : 'scale-100'
          )}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
          style={{ transform: hovered ? 'scale(1.08)' : 'scale(1)' }}
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.badge && (
            <span className="px-2 py-0.5 bg-gold text-black text-[10px] font-bold tracking-widest uppercase">
              {product.badge}
            </span>
          )}
          {product.isNew && (
            <span className="px-2 py-0.5 bg-charcoal border border-gold/40 text-gold text-[10px] font-bold tracking-widest uppercase">
              New
            </span>
          )}
        </div>

        {/* Quick View on hover */}
        <div className={clsx(
          'absolute inset-0 bg-black/30 flex items-center justify-center transition-opacity duration-300',
          hovered ? 'opacity-100' : 'opacity-0'
        )}>
          <span className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs tracking-widest uppercase">
            Quick View
          </span>
        </div>
      </div>

      {/* Info - minimal */}
      <div className="p-4">
        {/* Price - prominent */}
        <div className="text-gold font-bold text-lg mb-1">
          ${product.price.toFixed(0)}
        </div>

        {/* Name */}
        <h3 className="text-white font-semibold text-sm tracking-wide group-hover:text-gold transition-colors">
          {product.name}
        </h3>
      </div>
    </Link>
  )
}
