'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { getFeaturedProducts } from '@/lib/data'
import ProductCard from '@/components/product/ProductCard'

export default function HomePage() {
  const [variantIndex, setVariantIndex] = useState(0)
  const variantScrollerRef = useRef<HTMLDivElement>(null)
  const products = getFeaturedProducts()

  // Hero product data
  const heroProduct = products[0]
  const variants = [
    { src: '/images/IMG_4340.JPG', color: '#0b0b0b', label: 'Noir' },
    { src: '/images/F137AD08-1511-4F6A-BFAD-B0E176D6A21C.PNG', color: '#d8d6cf', label: 'Cream' },
    { src: '/images/3E8CC15F-49F3-47F7-BC52-CDA9F08732B9.jpg', color: '#5a5a5a', label: 'Graphite' },
  ]

  return (
    <>
      {/* ===== PRODUCT HERO - SINGLE PRODUCT FOCUS ===== */}
      <section className="relative h-screen bg-black overflow-hidden">
        {/* Full-bleed product carousel */}
        <div
          ref={variantScrollerRef}
          className="hide-scrollbar absolute inset-0 flex snap-x snap-mandatory overflow-x-auto scroll-smooth"
          onScroll={e => {
            const el = e.currentTarget
            const index = Math.round(el.scrollLeft / el.clientWidth)
            setVariantIndex(index)
          }}
        >
          {variants.map(({ src, label }) => (
            <div
              key={src}
              className="relative min-w-full w-full shrink-0 snap-center"
            >
              <img
                src={src}
                alt={`${heroProduct.name} — ${label}`}
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
            </div>
          ))}
        </div>

        {/* Subtle vignette for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />

        {/* Color selector dots - right side vertical */}
        <div className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-20">
          {variants.map(({ color, label }, index) => (
            <button
              key={label}
              onClick={() => {
                const scroller = variantScrollerRef.current
                if (!scroller) return
                scroller.scrollTo({ left: index * scroller.clientWidth, behavior: 'smooth' })
                setVariantIndex(index)
              }}
              className={`w-4 h-4 rounded-full border-2 transition-all ${
                variantIndex === index
                  ? 'border-gold scale-125 ring-2 ring-gold/30'
                  : 'border-white/30 hover:border-gold/60'
              }`}
              style={{ backgroundColor: color }}
              aria-label={`Select ${label}`}
              aria-pressed={variantIndex === index}
            />
          ))}
        </div>

        {/* Minimal product info - bottom left */}
        <div className="absolute bottom-16 left-6 md:left-12 z-20">
          <p className="text-gold/80 font-mono text-xs tracking-widest mb-2">
            {heroProduct.badge || 'FEATURED'}
          </p>
          <h1 className="font-serif text-3xl md:text-5xl text-white mb-1">
            {heroProduct.name}
          </h1>
          <p className="text-gold text-xl font-bold mb-4">
            ${heroProduct.price}
          </p>
          <Link
            href={`/products/${heroProduct.slug}`}
            className="btn-gold px-8 py-3 text-sm inline-flex items-center gap-2 group"
          >
            Shop Now
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Scroll indicator - bottom center */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 animate-float">
          <ChevronDown size={20} className="text-gold/60" />
        </div>
      </section>

      {/* ===== PRODUCT GRID - 2x2 COMPACT ===== */}
      <section className="bg-black py-8 md:py-12 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Minimal header - single line */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-mono text-gold/80 text-xs tracking-[0.2em] uppercase">
              The Collection
            </h2>
            <Link
              href="/products"
              className="text-gray-500 text-xs hover:text-gold transition-colors flex items-center gap-1"
            >
              View All <ArrowRight size={12} />
            </Link>
          </div>

          {/* 2x2 grid - compact gaps, all products visible */}
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            {products.slice(0, 4).map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== MINIMAL BRAND STRIP ===== */}
      <section className="bg-charcoal py-16 px-4 text-center">
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Premium streetwear rooted in African heritage.
        </p>
        <Link href="/about" className="text-gold text-sm mt-4 inline-block hover:underline">
          Our Story →
        </Link>
      </section>

      {/* ===== COMPACT NEWSLETTER ===== */}
      <section className="bg-black border-t border-gold/20 py-12 px-4">
        <div className="max-w-md mx-auto text-center">
          <p className="text-white text-sm mb-4">Get early access to drops</p>
          <form className="flex gap-2" onSubmit={e => e.preventDefault()}>
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 px-4 py-3 bg-charcoal border border-gold/20 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-gold/50 rounded-full"
            />
            <button
              type="submit"
              className="btn-gold px-6 py-3 text-xs"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </>
  )
}
