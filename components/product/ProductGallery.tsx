'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'
import clsx from 'clsx'

interface ProductGalleryProps {
  images: string[]
  productName: string
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [zoomed, setZoomed] = useState(false)

  const prev = () => setActiveIndex(i => (i === 0 ? images.length - 1 : i - 1))
  const next = () => setActiveIndex(i => (i === images.length - 1 ? 0 : i + 1))

  return (
    <div className="flex flex-col gap-4">
      {/* Main image */}
      <div
        className="relative aspect-square bg-charcoal overflow-hidden kuba-corner cursor-zoom-in"
        onClick={() => setZoomed(true)}
      >
        <Image
          src={images[activeIndex]}
          alt={`${productName} — view ${activeIndex + 1}`}
          fill
          className={clsx(
            'object-cover transition-all duration-500',
            zoomed ? 'scale-110' : 'scale-100'
          )}
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />

        {/* Zoom hint */}
        <div className="absolute bottom-4 right-4 w-8 h-8 bg-black/60 backdrop-blur-sm flex items-center justify-center border border-gold/20">
          <ZoomIn size={14} className="text-gold" />
        </div>

        {/* Nav arrows (only if multiple images) */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); prev() }}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/60 backdrop-blur-sm border border-gold/20 flex items-center justify-center text-gold hover:bg-gold hover:text-black transition-all"
              aria-label="Previous image"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next() }}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/60 backdrop-blur-sm border border-gold/20 flex items-center justify-center text-gold hover:bg-gold hover:text-black transition-all"
              aria-label="Next image"
            >
              <ChevronRight size={16} />
            </button>
          </>
        )}

        {/* Image counter */}
        {images.length > 1 && (
          <div className="absolute top-4 right-4 px-2 py-1 bg-black/60 backdrop-blur-sm">
            <span className="text-[10px] font-mono text-gold">{activeIndex + 1}/{images.length}</span>
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={clsx(
                'relative aspect-square overflow-hidden transition-all duration-200',
                i === activeIndex
                  ? 'ring-2 ring-gold ring-offset-1 ring-offset-black'
                  : 'opacity-50 hover:opacity-80'
              )}
              aria-label={`View image ${i + 1}`}
            >
              <Image
                src={img}
                alt={`${productName} thumbnail ${i + 1}`}
                fill
                className="object-cover"
                sizes="100px"
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {zoomed && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center cursor-zoom-out p-6"
          onClick={() => setZoomed(false)}
        >
          <div className="relative max-w-3xl w-full max-h-full aspect-square">
            <Image
              src={images[activeIndex]}
              alt={productName}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
          <button
            onClick={() => setZoomed(false)}
            className="absolute top-6 right-6 text-gold hover:text-white text-2xl font-light"
            aria-label="Close zoom"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  )
}
