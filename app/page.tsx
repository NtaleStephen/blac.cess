'use client'

import { useRef, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { getFeaturedProducts } from '@/lib/data'

export default function HomePage() {
  const router = useRouter()
  const [productIndex, setProductIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [showHint, setShowHint] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

  const products = getFeaturedProducts()
  const currentProduct = products[productIndex]

  // Hide hint after first interaction or timeout
  useEffect(() => {
    const timer = setTimeout(() => setShowHint(false), 4000)
    return () => clearTimeout(timer)
  }, [])

  // Handle drag/swipe
  const handleDragStart = (clientX: number) => {
    setIsDragging(true)
    setStartX(clientX)
    setShowHint(false)
  }

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return
    const diff = clientX - startX
    if (Math.abs(diff) > 80) {
      const newIndex = diff > 0
        ? (productIndex - 1 + products.length) % products.length
        : (productIndex + 1) % products.length
      setProductIndex(newIndex)
      setStartX(clientX)
    }
  }

  const handleDragEnd = () => {
    setIsDragging(false)
  }

  // Navigate to product on click
  const handleClick = () => {
    if (!isDragging) {
      router.push(`/products/${currentProduct.slug}`)
    }
  }

  return (
    <div className="fixed inset-0 overflow-hidden bg-gradient-to-b from-neutral-200 via-neutral-300 to-neutral-400">
      {/* Main product view area */}
      <div
        ref={containerRef}
        className="absolute inset-0 cursor-grab active:cursor-grabbing select-none flex items-center justify-center pt-16 pb-8"
        onMouseDown={(e) => handleDragStart(e.clientX)}
        onMouseMove={(e) => handleDragMove(e.clientX)}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
        onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
        onTouchEnd={handleDragEnd}
        onClick={handleClick}
      >
        {/* Centered floating product image */}
        <div className="relative w-full max-w-md md:max-w-xl lg:max-w-2xl h-[60vh] md:h-[70vh]">
          <Image
            src={currentProduct.image}
            alt={currentProduct.name}
            fill
            className="object-contain drop-shadow-2xl transition-opacity duration-300"
            priority
            sizes="(max-width: 768px) 90vw, (max-width: 1024px) 70vw, 50vw"
            draggable={false}
          />
        </div>
      </div>

      {/* Blurred shadow/reflection at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />

      {/* Drag hint */}
      {showHint && (
        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 pointer-events-none z-10 animate-fade-in">
          <div className="flex items-center gap-3 px-4 py-2 bg-black/20 backdrop-blur-sm rounded-full">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-black/50">
              <path d="M14 8L10 12L14 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-black/50 text-xs tracking-widest uppercase">drag to browse</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-black/50">
              <path d="M10 8L14 12L10 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      )}

      {/* Product selector dots - right side */}
      <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-20">
        {products.map((product, index) => (
          <button
            key={product.id}
            onClick={(e) => {
              e.stopPropagation()
              setProductIndex(index)
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              productIndex === index
                ? 'scale-150 ring-2 ring-black/20'
                : 'opacity-50 hover:opacity-100 hover:scale-125'
            }`}
            style={{
              backgroundColor: product.colors[0].hex,
              boxShadow: productIndex === index ? '0 0 12px rgba(0,0,0,0.2)' : 'none'
            }}
            aria-label={product.name}
          />
        ))}
      </div>

      {/* Current product indicator dots - bottom center */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation()
              setProductIndex(index)
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              productIndex === index
                ? 'bg-black/70 scale-110'
                : 'bg-black/20 hover:bg-black/40'
            }`}
            aria-label={`Product ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
