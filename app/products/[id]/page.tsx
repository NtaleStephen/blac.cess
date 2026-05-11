'use client'

import { useState } from 'react'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { ShoppingBag } from 'lucide-react'
import { getProductBySlug } from '@/lib/data'
import { useCartStore } from '@/store/cart'
import clsx from 'clsx'

interface Props {
  params: { id: string }
}

export default function ProductPage({ params }: Props) {
  const product = getProductBySlug(params.id)
  if (!product) notFound()

  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [adding, setAdding] = useState(false)

  const { addItem, openCart } = useCartStore()
  const isSoldOut = product.stockStatus === 'sold_out'

  const handleAddToCart = async () => {
    if (!selectedSize || isSoldOut) return
    setAdding(true)
    addItem(product, selectedSize, selectedColor.name)
    await new Promise(r => setTimeout(r, 500))
    setAdding(false)
    openCart()
  }

  return (
    <div className="fixed inset-0 overflow-hidden bg-gradient-to-b from-neutral-200 via-neutral-300 to-neutral-400">
      {/* Centered floating product image */}
      <div className="absolute inset-0 flex items-center justify-center pt-16 pb-48 md:pb-40">
        <div className="relative w-full max-w-md md:max-w-lg lg:max-w-xl h-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain drop-shadow-2xl"
            priority
            sizes="(max-width: 768px) 90vw, (max-width: 1024px) 60vw, 40vw"
          />
        </div>
      </div>

      {/* Blurred reflection at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

      {/* Bottom product info panel */}
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Mobile layout - stacked */}
          <div className="md:hidden space-y-4">
            {/* Product name */}
            <h1 className="font-serif text-2xl text-black">
              {product.name} <span className="text-black/60">| {product.variant}</span>
            </h1>

            {/* Color selector */}
            <div>
              <p className="text-black/60 text-xs uppercase tracking-widest mb-2">Colour</p>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color.slug}
                    onClick={() => setSelectedColor(color)}
                    className={clsx(
                      'w-6 h-6 rounded-full transition-all',
                      selectedColor.slug === color.slug
                        ? 'ring-2 ring-black ring-offset-2 ring-offset-neutral-300'
                        : 'hover:scale-110'
                    )}
                    style={{ backgroundColor: color.hex }}
                    aria-label={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Size selector */}
            <div>
              <p className="text-black/60 text-xs uppercase tracking-widest mb-2">Size</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={clsx(
                      'liquid-glass-btn px-4 py-2 text-sm transition-all',
                      selectedSize === size
                        ? 'bg-black/80 text-white border-black/80'
                        : 'text-black/80 hover:bg-black/10'
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Price + Add to cart */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-2xl font-bold text-black">
                ${product.price.toFixed(0)}
              </span>
              <button
                onClick={handleAddToCart}
                disabled={isSoldOut || adding || !selectedSize}
                className={clsx(
                  'liquid-glass-btn px-8 py-3 text-sm font-bold uppercase tracking-wider flex items-center gap-2 transition-all',
                  isSoldOut
                    ? 'bg-black/20 text-black/40 cursor-not-allowed'
                    : !selectedSize
                    ? 'bg-black/30 text-black/60'
                    : 'bg-black/80 text-white hover:bg-black'
                )}
              >
                {adding ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : isSoldOut ? (
                  'Sold Out'
                ) : (
                  <>
                    <ShoppingBag size={16} />
                    Add to Cart
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Desktop layout - horizontal */}
          <div className="hidden md:flex items-end justify-between gap-8">
            {/* Left side - product info */}
            <div className="space-y-4">
              {/* Product name */}
              <h1 className="font-serif text-3xl lg:text-4xl text-black">
                {product.name} <span className="text-black/60">| {product.variant}</span>
              </h1>

              {/* Color selector */}
              <div>
                <p className="text-black/60 text-xs uppercase tracking-widest mb-2">Colour</p>
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color.slug}
                      onClick={() => setSelectedColor(color)}
                      className={clsx(
                        'w-6 h-6 rounded-full transition-all',
                        selectedColor.slug === color.slug
                          ? 'ring-2 ring-black ring-offset-2 ring-offset-neutral-300'
                          : 'hover:scale-110'
                      )}
                      style={{ backgroundColor: color.hex }}
                      aria-label={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Size selector */}
              <div>
                <p className="text-black/60 text-xs uppercase tracking-widest mb-2">Size</p>
                <div className="flex gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={clsx(
                        'liquid-glass-btn px-5 py-2.5 text-sm transition-all',
                        selectedSize === size
                          ? 'bg-black/80 text-white border-black/80'
                          : 'text-black/80 hover:bg-black/10'
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right side - price + button */}
            <div className="flex items-center gap-6">
              <span className="text-3xl font-bold text-black">
                ${product.price.toFixed(0)}
              </span>
              <button
                onClick={handleAddToCart}
                disabled={isSoldOut || adding || !selectedSize}
                className={clsx(
                  'liquid-glass-btn px-10 py-4 text-sm font-bold uppercase tracking-wider flex items-center gap-2 transition-all',
                  isSoldOut
                    ? 'bg-black/20 text-black/40 cursor-not-allowed'
                    : !selectedSize
                    ? 'bg-black/30 text-black/60'
                    : 'bg-black/80 text-white hover:bg-black'
                )}
              >
                {adding ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : isSoldOut ? (
                  'Sold Out'
                ) : (
                  <>
                    <ShoppingBag size={16} />
                    Add to Cart
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
