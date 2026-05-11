'use client'

import { useRef, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getFeaturedProducts } from '@/lib/data'

export default function HomePage() {
  const router = useRouter()
  const [productIndex, setProductIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [showHint, setShowHint] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

  const products = getFeaturedProducts()

  // Product images for rotation effect (different angles/views)
  const productViews = [
    {
      slug: 'heritage-hoodie-noir',
      images: [
        '/images/IMG_4340.JPG',
        '/images/3E8CC15F-49F3-47F7-BC52-CDA9F08732B9.jpg',
      ],
      color: '#0b0b0b'
    },
    {
      slug: 'kuba-bomber-eclipse',
      images: [
        '/images/3E8CC15F-49F3-47F7-BC52-CDA9F08732B9.jpg',
        '/images/IMG_4340.JPG',
      ],
      color: '#1a1a2e'
    },
    {
      slug: 'adire-tee-obsidian',
      images: [
        '/images/EC5DA517-0A9A-422B-B7EA-9EF99BE80DA5.PNG',
        '/images/F137AD08-1511-4F6A-BFAD-B0E176D6A21C.PNG',
      ],
      color: '#050505'
    },
    {
      slug: 'ndebele-joggers-shadow',
      images: [
        '/images/F137AD08-1511-4F6A-BFAD-B0E176D6A21C.PNG',
        '/images/EC5DA517-0A9A-422B-B7EA-9EF99BE80DA5.PNG',
      ],
      color: '#000000'
    },
  ]

  const [imageIndex, setImageIndex] = useState(0)
  const currentProduct = productViews[productIndex]

  // Hide hint after first interaction
  useEffect(() => {
    const timer = setTimeout(() => setShowHint(false), 4000)
    return () => clearTimeout(timer)
  }, [])

  // Handle drag/swipe for image rotation
  const handleDragStart = (clientX: number) => {
    setIsDragging(true)
    setStartX(clientX)
    setShowHint(false)
  }

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return
    const diff = clientX - startX
    if (Math.abs(diff) > 100) {
      const newIndex = diff > 0
        ? (imageIndex - 1 + currentProduct.images.length) % currentProduct.images.length
        : (imageIndex + 1) % currentProduct.images.length
      setImageIndex(newIndex)
      setStartX(clientX)
    }
  }

  const handleDragEnd = () => {
    setIsDragging(false)
  }

  // Navigate to product on click (if not dragging)
  const handleClick = () => {
    if (!isDragging) {
      router.push(`/products/${currentProduct.slug}`)
    }
  }

  // Switch product
  const switchProduct = (index: number) => {
    setProductIndex(index)
    setImageIndex(0)
  }

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      {/* Full-screen product view */}
      <div
        ref={containerRef}
        className="absolute inset-0 cursor-grab active:cursor-grabbing select-none"
        onMouseDown={(e) => handleDragStart(e.clientX)}
        onMouseMove={(e) => handleDragMove(e.clientX)}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
        onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
        onTouchEnd={handleDragEnd}
        onClick={handleClick}
      >
        {/* Product image - full bleed */}
        <img
          src={currentProduct.images[imageIndex]}
          alt="Product"
          className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-300"
          draggable={false}
        />

        {/* Subtle vignette */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/30 via-transparent to-black/10" />
      </div>

      {/* Drag hint - fades out */}
      {showHint && (
        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 pointer-events-none z-10 animate-fade-in">
          <div className="flex items-center gap-3 px-4 py-2 bg-black/30 backdrop-blur-sm rounded-full">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white/60">
              <path d="M14 8L10 12L14 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-white/60 text-xs tracking-widest uppercase">drag to rotate</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white/60">
              <path d="M10 8L14 12L10 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      )}

      {/* Product selector dots - right side */}
      <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-20">
        {productViews.map((product, index) => (
          <button
            key={product.slug}
            onClick={(e) => {
              e.stopPropagation()
              switchProduct(index)
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              productIndex === index
                ? 'scale-150 ring-2 ring-white/30'
                : 'opacity-60 hover:opacity-100 hover:scale-125'
            }`}
            style={{
              backgroundColor: product.color,
              boxShadow: productIndex === index ? '0 0 12px rgba(255,255,255,0.3)' : 'none'
            }}
            aria-label={`View product ${index + 1}`}
          />
        ))}
      </div>

      {/* Image indicator dots - bottom center (for current product's views) */}
      {currentProduct.images.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {currentProduct.images.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation()
                setImageIndex(index)
              }}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                imageIndex === index
                  ? 'bg-white scale-125'
                  : 'bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`View ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
