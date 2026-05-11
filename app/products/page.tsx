'use client'

import Link from 'next/link'
import Image from 'next/image'
import { products } from '@/lib/data'

export default function ProductsPage() {
  return (
    <div className="fixed inset-0 overflow-hidden bg-black">
      {/* Products grid - fills viewport */}
      <div className="h-full pt-20 pb-4 px-4 md:px-6">
        <div className="h-full max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="liquid-glass-dark group relative overflow-hidden flex flex-col"
            >
              {/* Product image - centered, contained */}
              <div className="flex-1 relative p-4 md:p-6 flex items-center justify-center">
                <div className="relative w-full h-full max-h-[50vh]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 45vw, 22vw"
                  />
                </div>
              </div>

              {/* Product info - minimal */}
              <div className="p-3 md:p-4 border-t border-white/10">
                <h3 className="text-white text-sm md:text-base font-medium truncate">
                  {product.name}
                </h3>
                <p className="text-white/60 text-xs md:text-sm">
                  ${product.price}
                </p>
              </div>

              {/* Badge */}
              {product.badge && (
                <span className="absolute top-3 left-3 px-2 py-1 bg-gold/90 text-black text-[10px] font-bold tracking-wider uppercase rounded">
                  {product.badge}
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
