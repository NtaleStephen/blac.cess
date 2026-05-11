import type { Metadata } from 'next'
import { products } from '@/lib/data'
import ProductCard from '@/components/product/ProductCard'

export const metadata: Metadata = {
  title: 'Collection',
  description: 'Shop the full Blac.cess collection. Premium black and gold culturally-inspired streetwear — hoodies, bombers, tees and more.',
}

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 md:px-6">

        {/* Minimal header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-mono text-gold/80 text-xs tracking-[0.2em] uppercase">
            All Products
          </h1>
          <p className="text-gray-500 text-xs">
            <span className="text-white font-semibold">{products.length}</span> pieces
          </p>
        </div>

        {/* Products grid - immediate, no intro text */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
