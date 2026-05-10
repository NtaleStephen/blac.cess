'use client'

import { useState } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  ShoppingBag, Star, ChevronDown, ArrowLeft, Truck, RotateCcw, Shield
} from 'lucide-react'
import { getProductBySlug, products } from '@/lib/data'
import ProductGallery from '@/components/product/ProductGallery'
import SizeSelector from '@/components/product/SizeSelector'
import ColorSelector from '@/components/product/ColorSelector'
import ProductCard from '@/components/product/ProductCard'
import { useCartStore } from '@/store/cart'
import clsx from 'clsx'

interface Props {
  params: { id: string }
}

const stockConfig = {
  in_stock: { label: 'In Stock', color: 'text-emerald-400', dot: 'bg-emerald-400' },
  low_stock: { label: 'Only a Few Left', color: 'text-amber-400', dot: 'bg-amber-400' },
  sold_out: { label: 'Sold Out', color: 'text-gray-500', dot: 'bg-gray-500' },
}

export default function ProductPage({ params }: Props) {
  const product = getProductBySlug(params.id)
  if (!product) notFound()

  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState(product.colors[0].name)
  const [adding, setAdding] = useState(false)
  const [added, setAdded] = useState(false)
  const [sizeError, setSizeError] = useState(false)
  const [descOpen, setDescOpen] = useState(true)
  const [specOpen, setSpecOpen] = useState(false)
  const [careOpen, setCareOpen] = useState(false)

  const { addItem, openCart } = useCartStore()
  const stock = stockConfig[product.stockStatus]
  const relatedProducts = products.filter(p => p.id !== product.id).slice(0, 4)

  const handleAddToCart = async () => {
    if (!selectedSize) {
      setSizeError(true)
      setTimeout(() => setSizeError(false), 2000)
      return
    }
    setAdding(true)
    addItem(product, selectedSize, selectedColor)
    await new Promise(r => setTimeout(r, 600))
    setAdding(false)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
    openCart()
  }

  return (
    <div className="crown-frame min-h-screen bg-black pt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 mb-10 text-xs font-mono uppercase tracking-wider" aria-label="Breadcrumb">
          <Link href="/" className="text-gray-600 hover:text-gold transition-colors">Home</Link>
          <span className="text-gold/30">/</span>
          <Link href="/products" className="text-gray-600 hover:text-gold transition-colors">Collection</Link>
          <span className="text-gold/30">/</span>
          <span className="text-gold">{product.name}</span>
        </nav>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-24">

          {/* LEFT — Gallery */}
          <ProductGallery images={product.gallery} productName={product.name} />

          {/* RIGHT — Product info */}
          <div className="flex flex-col gap-6">

            {/* Cultural badge */}
            <span className="cultural-badge self-start">Cultural Heritage Collection</span>

            {/* Title */}
            <div>
              <h1 className="font-serif text-4xl md:text-5xl text-white leading-tight">
                {product.name}
              </h1>
              <p className="font-mono text-gold tracking-[0.3em] text-sm mt-1">{product.variant}</p>
            </div>

            {/* Price + Stock */}
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-gold">
                ${product.price.toFixed(2)}
              </span>
              <div className="flex items-center gap-2">
                <div className={clsx('w-1.5 h-1.5 rounded-full animate-pulse', stock.dot)} />
                <span className={clsx('text-xs font-mono uppercase tracking-widest', stock.color)}>
                  {stock.label}
                </span>
              </div>
            </div>

            <div className="gold-divider" />

            {/* Color selector */}
            <ColorSelector
              colors={product.colors}
              selected={selectedColor}
              onChange={setSelectedColor}
            />

            {/* Size selector */}
            <div>
              <SizeSelector
                sizes={product.sizes}
                selected={selectedSize}
                onChange={(s) => { setSelectedSize(s); setSizeError(false) }}
              />
              {sizeError && (
                <p className="text-red-400 text-xs font-mono mt-2 animate-fade-in">
                  Please select a size before adding to cart.
                </p>
              )}
            </div>

            {/* Add to cart */}
            <button
              onClick={handleAddToCart}
              disabled={product.stockStatus === 'sold_out' || adding}
              className={clsx(
                'w-full py-4 text-sm font-bold tracking-widest uppercase flex items-center justify-center gap-2 transition-all duration-300',
                product.stockStatus === 'sold_out'
                  ? 'bg-charcoal text-gray-600 cursor-not-allowed border border-gold/10'
                  : added
                  ? 'bg-emerald-500 text-white'
                  : 'btn-gold'
              )}
              id="add-to-cart-btn"
            >
              {adding ? (
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
              ) : added ? (
                <>Added to Cart ✓</>
              ) : product.stockStatus === 'sold_out' ? (
                'Sold Out'
              ) : (
                <>
                  <ShoppingBag size={16} />
                  Add to Cart
                </>
              )}
            </button>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 py-4 border-t border-gold/10">
              {[
                { icon: Truck, text: 'Free shipping over $200' },
                { icon: RotateCcw, text: '30-day returns' },
                { icon: Shield, text: 'Authentic guarantee' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex flex-col items-center gap-2 text-center">
                  <Icon size={16} className="text-gold" />
                  <span className="text-gray-500 text-[10px] leading-tight">{text}</span>
                </div>
              ))}
            </div>

            {/* Cultural inspiration box */}
            <div className="p-5 bg-charcoal border-l-4 border-gold">
              <p className="gold-label mb-2">Cultural Inspiration</p>
              <p className="text-gray-400 text-sm leading-relaxed">{product.culturalInspiration}</p>
            </div>

            {/* Accordion: Description */}
            <div className="border-t border-gold/10">
              <button
                onClick={() => setDescOpen(!descOpen)}
                className="w-full flex items-center justify-between py-4 text-left"
                aria-expanded={descOpen}
              >
                <span className="gold-label">Description</span>
                <ChevronDown size={16} className={clsx('text-gold transition-transform', descOpen && 'rotate-180')} />
              </button>
              {descOpen && (
                <div className="pb-5 animate-fade-in">
                  <p className="text-gray-400 text-sm leading-relaxed">{product.description}</p>
                </div>
              )}
            </div>

            {/* Accordion: Composition */}
            <div className="border-t border-gold/10">
              <button
                onClick={() => setSpecOpen(!specOpen)}
                className="w-full flex items-center justify-between py-4 text-left"
                aria-expanded={specOpen}
              >
                <span className="gold-label">Composition</span>
                <ChevronDown size={16} className={clsx('text-gold transition-transform', specOpen && 'rotate-180')} />
              </button>
              {specOpen && (
                <div className="pb-5 animate-fade-in">
                  <p className="text-gray-400 text-sm leading-relaxed">{product.composition}</p>
                </div>
              )}
            </div>

            {/* Accordion: Care */}
            <div className="border-t border-b border-gold/10">
              <button
                onClick={() => setCareOpen(!careOpen)}
                className="w-full flex items-center justify-between py-4 text-left"
                aria-expanded={careOpen}
              >
                <span className="gold-label">Care Instructions</span>
                <ChevronDown size={16} className={clsx('text-gold transition-transform', careOpen && 'rotate-180')} />
              </button>
              {careOpen && (
                <div className="pb-5 animate-fade-in">
                  <p className="text-gray-400 text-sm leading-relaxed">{product.care}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related products */}
        <div>
          <div className="text-center mb-12">
            <p className="gold-label mb-3">You May Also Like</p>
            <h2 className="font-serif text-3xl text-white">Related Pieces</h2>
            <div className="gold-divider max-w-xs mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
