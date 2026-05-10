'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ChevronDown, Sparkles, Gem, Globe } from 'lucide-react'
import { getFeaturedProducts } from '@/lib/data'
import ProductCard from '@/components/product/ProductCard'
import CrownLogo from '@/components/shared/CrownLogo'

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0)
  const [variantIndex, setVariantIndex] = useState(0)
  const heroRef = useRef<HTMLDivElement>(null)
  const variantScrollerRef = useRef<HTMLDivElement>(null)
  const products = getFeaturedProducts()

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black"
        id="hero"
      >
        {/* Black Drapery Parallax Background */}
        <div 
          className="hero-drapery absolute inset-0 bg-cover bg-center bg-no-repeat opacity-95 z-0"
          style={{ 
            backgroundImage: "url('/images/EC5DA517-0A9A-422B-B7EA-9EF99BE80DA5.PNG')",
            transform: `translateY(${scrollY * 0.35}px) scale(1.08)` 
          }}
        />

        {/* Moving fold highlights/shadows (parallax) */}
        <div
          className="hero-folds absolute inset-0 z-0"
          style={{
            transform: `translateY(${scrollY * 0.35}px) translateX(${scrollY * 0.06}px)`,
            backgroundPosition: `${scrollY * 0.1}px ${scrollY * 0.25}px, ${-scrollY * 0.08}px ${scrollY * 0.18}px, ${scrollY * 0.06}px ${-scrollY * 0.22}px, ${scrollY * 0.4}px ${scrollY * 0.15}px`,
          }}
        />

        {/* Vignette to keep cloth visible but increase contrast */}
        <div className="absolute inset-0 z-0" style={{ background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.38) 70%, rgba(0,0,0,0.65) 100%)' }} />

        {/* Radial gold glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <div
            className="w-[600px] h-[600px] rounded-full"
            style={{
              background: 'radial-gradient(ellipse, rgba(212,175,55,0.12) 0%, transparent 70%)',
            }}
          />
        </div>

        {/* Giant Crown Watermark */}
        <div 
          className="hero-watermark absolute inset-0 flex items-center justify-center opacity-[0.12] pointer-events-none z-0"
          style={{ transform: `translateY(${scrollY * 0.16}px)` }}
        >
          <CrownLogo className="w-[180vw] md:w-[115vw] max-w-[1600px]" />
        </div>

        {/* Floating dots */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="hero-dot"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.5}s`,
              opacity: 0.4 + (i % 3) * 0.2,
            }}
          />
        ))}

        {/* Hero content */}
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto flex flex-col items-center">

          {/* Main title */}
          <h1
            className="font-serif text-7xl sm:text-8xl md:text-[10rem] leading-none tracking-tight mb-8 animate-slide-up"
            style={{ animationDelay: '0.3s' }}
          >
            <Link href="/" className="hover:opacity-80 transition-opacity">
              <span className="text-gold-shimmer">blac.cess</span>
            </Link>
          </h1>

          {/* Tagline */}
          <p
            className="font-mono text-sm md:text-base tracking-[0.3em] uppercase text-gold-muted mb-4 animate-fade-in"
            style={{ animationDelay: '0.5s' }}
          >
            Where Heritage Meets Fashion
          </p>
          <p
            className="text-gray-400 text-lg max-w-xl mx-auto mb-12 animate-fade-in"
            style={{ animationDelay: '0.65s' }}
          >
            Premium streetwear rooted in African cultural traditions. Each piece tells a story centuries in the making.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up"
            style={{ animationDelay: '0.8s' }}
          >
            <Link
              href="/products"
              className="btn-gold px-10 py-4 text-sm flex items-center justify-center gap-2 group"
            >
              Explore Collection
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/about"
              className="btn-ghost-gold px-10 py-4 text-sm flex items-center justify-center gap-2"
            >
              Our Story
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float">
          <span className="gold-label text-[10px]">Scroll</span>
          <ChevronDown size={16} className="text-gold" />
        </div>

        {/* Bottom border */}
        <div className="absolute bottom-0 left-0 right-0 gold-divider" />
      </section>

      {/* ===== QUICK SHOP (SINGLE PRODUCT + VARIANTS) ===== */}
      <section className="crown-frame bg-charcoal">
        <div className="max-w-7xl mx-auto">
          <div className="relative">
            <div className="relative w-full overflow-hidden bg-black">
              <div
                ref={variantScrollerRef}
                data-variant-scroller
                className="hide-scrollbar flex snap-x snap-mandatory overflow-x-auto scroll-smooth"
                onScroll={e => {
                  const el = e.currentTarget
                  const index = Math.round(el.scrollLeft / el.clientWidth)
                  setVariantIndex(index)
                }}
              >
                {[
                  {
                    src: '/images/IMG_4340.JPG',
                    alt: 'Product variant — noir',
                  },
                  {
                    src: '/images/F137AD08-1511-4F6A-BFAD-B0E176D6A21C.PNG',
                    alt: 'Product variant — cream',
                  },
                  {
                    src: '/images/3E8CC15F-49F3-47F7-BC52-CDA9F08732B9.jpg',
                    alt: 'Product variant — graphite',
                  },
                ].map(({ src, alt }) => (
                  <Link
                    key={src}
                    href="/products"
                    className="relative w-full shrink-0 snap-center"
                  >
                    <div className="relative h-[420px] sm:h-[580px] md:h-[640px]">
                      <img
                        src={src}
                        alt={alt}
                        className="absolute inset-0 w-full h-full object-cover object-center"
                        loading="lazy"
                      />
                    </div>
                  </Link>
                ))}
              </div>

              <div className="absolute left-1/2 -translate-x-1/2 bottom-4 flex items-center gap-3 z-10">
                {[
                  { color: '#0b0b0b', label: 'Noir', index: 0 },
                  { color: '#d8d6cf', label: 'Cream', index: 1 },
                  { color: '#5a5a5a', label: 'Graphite', index: 2 },
                ].map(({ color, label, index }) => (
                  <button
                    key={label}
                    type="button"
                    aria-label={`Select ${label} variant`}
                    aria-pressed={variantIndex === index}
                    className={`w-3.5 h-3.5 rounded-full border transition-colors ${
                      variantIndex === index ? 'border-gold ring-2 ring-gold/30' : 'border-white/30 hover:border-gold'
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => {
                      const scroller = variantScrollerRef.current
                      if (!scroller) return
                      scroller.scrollTo({ left: index * scroller.clientWidth, behavior: 'smooth' })
                      setVariantIndex(index)
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURED PRODUCTS ===== */}
      <section className="crown-frame bg-black py-24 px-6" id="collection">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <p className="gold-label mb-4">The Collection</p>
            <h2 className="section-heading mb-6">
              Featured Pieces
            </h2>
            <div className="gold-divider max-w-xs mx-auto" />
          </div>

          {/* Products grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>

          {/* View all */}
          <div className="text-center mt-12">
            <Link
              href="/products"
              className="btn-ghost-gold inline-flex items-center gap-2 px-10 py-4 text-sm group"
            >
              View All Products
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== VALUE PROPS ===== */}
      <section className="crown-frame bg-charcoal py-10 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-gold/20">
          {[
            { icon: Gem, label: 'Premium Craftsmanship', desc: '450GSM heavyweight fabrics, precision-stitched' },
            { icon: Globe, label: 'Cultural Heritage', desc: 'Every design rooted in African artistic traditions' },
            { icon: Sparkles, label: 'Limited Editions', desc: 'Small-batch drops. Once gone, they\'re gone.' },
          ].map(({ icon: Icon, label, desc }) => (
            <div key={label} className="flex items-start gap-4 px-8 py-6">
              <Icon size={20} className="text-gold mt-0.5 shrink-0" />
              <div>
                <p className="text-white font-semibold text-sm mb-1">{label}</p>
                <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== BRAND STORY ===== */}
      <section className="crown-frame relative bg-charcoal py-24 px-6 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-adire-pattern opacity-100 pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <p className="gold-label mb-6">Our Story</p>
            <h2 className="section-heading mb-8">
              Culture is the<br />
              <em className="text-gold not-italic">ultimate luxury</em>
            </h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              Blac.cess was born from a simple belief: that the richest traditions in fashion didn&apos;t start in Paris or Milan — they started in Kuba, in Yorubaland, in Ndebele villages, in centuries of craftsmanship that the world hasn&apos;t fully acknowledged yet.
            </p>
            <p className="text-gray-400 leading-relaxed mb-10">
              Every piece we create is a conversation between heritage and the present. Black as canvas, gold as legacy. Worn by those who understand that culture is the ultimate luxury.
            </p>
            <Link
              href="/about"
              className="btn-gold inline-flex items-center gap-2 px-8 py-4 text-sm group"
            >
              Read Our Story
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-px bg-gold/20">
            {[
              { stat: '4', unit: 'Collections', desc: 'Cultural lineages represented' },
              { stat: '450', unit: 'GSM', desc: 'Heavyweight craftsmanship' },
              { stat: '∞', unit: 'Heritage', desc: 'Centuries of tradition' },
              { stat: '100%', unit: 'Cultural', desc: 'Authentically inspired' },
            ].map(({ stat, unit, desc }) => (
              <div key={unit} className="bg-charcoal p-8 kuba-corner">
                <div className="text-4xl font-serif font-bold text-gold mb-1">{stat}</div>
                <div className="text-xs tracking-widest uppercase text-white font-mono mb-2">{unit}</div>
                <div className="text-xs text-gray-500">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED PRODUCT HERO ===== */}
      <section className="crown-frame bg-black py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="relative overflow-hidden kuba-corner">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Image */}
              <div className="relative h-[500px] lg:h-[600px] bg-charcoal">
                <Image
                  src="/images/bomber-eclipse.png"
                  alt="Kuba Bomber Eclipse — Blac.cess signature piece"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/40" />
              </div>

              {/* Content */}
              <div className="flex flex-col justify-center p-10 lg:p-16 border border-gold/20">
                <span className="cultural-badge mb-6">Signature Piece</span>
                <h2 className="font-serif text-5xl text-white mb-2">KUBA BOMBER</h2>
                <p className="font-mono text-gold tracking-widest text-sm mb-6">ECLIPSE EDITION</p>
                <p className="text-gray-400 leading-relaxed mb-4">
                  Satin-finish shell with hand-stitched geometric banding drawn from Kuba Kingdom royal cloth traditions. Architecture in motion.
                </p>
                <p className="cultural-badge mb-8 self-start">Kuba Kingdom Inspired</p>
                <div className="flex items-center justify-between mb-8">
                  <span className="text-3xl font-bold text-gold">$245</span>
                  <span className="text-xs text-amber-400 font-mono uppercase tracking-widest">Low Stock</span>
                </div>
                <Link
                  href="/products/kuba-bomber-eclipse"
                  className="btn-gold px-8 py-4 text-sm text-center flex items-center justify-center gap-2 group"
                >
                  Shop Now
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className="crown-frame bg-gold py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-4xl md:text-5xl text-black font-bold mb-4">
            Join the Movement
          </h2>
          <p className="text-black/70 text-lg mb-8 max-w-xl mx-auto">
            Subscribe for early access to new drops, cultural stories behind each collection, and member exclusives.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={e => e.preventDefault()}>
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-5 py-3 bg-black/10 border border-black/20 text-black placeholder-black/50 text-sm focus:outline-none focus:border-black"
            />
            <button
              type="submit"
              className="px-8 py-3 bg-black text-gold text-sm font-bold tracking-widest uppercase hover:bg-charcoal transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </>
  )
}
