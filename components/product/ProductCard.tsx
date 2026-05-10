'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingBag, Eye } from 'lucide-react'
import { Product } from '@/lib/types'
import { useCartStore } from '@/store/cart'
import clsx from 'clsx'

interface ProductCardProps {
  product: Product
  index?: number
}

const stockLabel = {
  in_stock: { text: 'In Stock', color: 'text-emerald-400' },
  low_stock: { text: 'Low Stock', color: 'text-amber-400' },
  sold_out: { text: 'Sold Out', color: 'text-gray-500' },
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [hovered, setHovered] = useState(false)
  const [adding, setAdding] = useState(false)
  const { addItem, openCart } = useCartStore()

  const handleQuickAdd = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (product.stockStatus === 'sold_out') return
    setAdding(true)
    addItem(product, product.sizes[2] ?? product.sizes[0], product.colors[0].name)
    await new Promise(r => setTimeout(r, 800))
    setAdding(false)
    openCart()
  }

  const stock = stockLabel[product.stockStatus]

  return (
    <div
      className="product-card group animate-fade-in"
      style={{ animationDelay: `${index * 0.1}s` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <Link href={`/products/${product.slug}`} className="block relative aspect-square overflow-hidden bg-black">
        <Image
          src={product.image}
          alt={`${product.name} — ${product.variant} | Blac.cess`}
          fill
          className={clsx(
            'object-cover transition-transform duration-700',
            hovered ? 'scale-108' : 'scale-100'
          )}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          style={{ transform: hovered ? 'scale(1.08)' : 'scale(1)' }}
        />

        {/* Overlay on hover */}
        <div className={clsx(
          'absolute inset-0 bg-black/40 flex items-center justify-center gap-3 transition-opacity duration-300',
          hovered ? 'opacity-100' : 'opacity-0'
        )}>
          <Link
            href={`/products/${product.slug}`}
            className="w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-gold hover:text-black hover:border-gold transition-all"
            aria-label="View product details"
          >
            <Eye size={16} />
          </Link>
          <button
            onClick={handleQuickAdd}
            disabled={product.stockStatus === 'sold_out' || adding}
            className={clsx(
              'w-10 h-10 backdrop-blur-sm border flex items-center justify-center transition-all',
              product.stockStatus === 'sold_out'
                ? 'bg-white/5 border-white/10 text-gray-600 cursor-not-allowed'
                : 'bg-gold border-gold text-black hover:bg-gold-light'
            )}
            aria-label="Quick add to cart"
          >
            {adding ? (
              <div className="w-3.5 h-3.5 border border-black border-t-transparent rounded-full animate-spin" />
            ) : (
              <ShoppingBag size={16} />
            )}
          </button>
        </div>

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
      </Link>

      {/* Info */}
      <div className="p-4">
        {/* Price */}
        <div className="text-gold font-bold text-xl mb-1">
          ${product.price.toFixed(2)}
        </div>

        {/* Name */}
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-white font-semibold text-sm tracking-wide hover:text-gold transition-colors">
            {product.name}
          </h3>
          <p className="text-gray-500 text-xs font-mono mt-0.5">{product.variant}</p>
        </Link>

        {/* Stock + sizes preview */}
        <div className="flex items-center justify-between mt-3">
          <span className={clsx('text-[10px] font-mono uppercase tracking-widest', stock.color)}>
            {stock.text}
          </span>
          <div className="flex gap-1">
            {product.sizes.slice(0, 4).map(s => (
              <span key={s} className="text-[9px] text-gray-600 font-mono">{s}</span>
            ))}
            {product.sizes.length > 4 && <span className="text-[9px] text-gray-600 font-mono">+</span>}
          </div>
        </div>
      </div>

    </div>
  )
}
