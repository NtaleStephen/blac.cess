import type { Metadata } from 'next'
import { products } from '@/lib/data'
import ProductCard from '@/components/product/ProductCard'
import { SlidersHorizontal } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Collection',
  description: 'Shop the full Blac.cess collection. Premium black and gold culturally-inspired streetwear — hoodies, bombers, tees and more.',
}

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-black pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* Page Header */}
        <div className="text-center mb-16">
          <p className="gold-label mb-4">All Products</p>
          <h1 className="font-serif text-5xl md:text-6xl text-white mb-6">The Collection</h1>
          <div className="gold-divider max-w-xs mx-auto mb-6" />
          <p className="text-gray-500 max-w-md mx-auto text-sm leading-relaxed">
            Every piece is rooted in African cultural heritage. Black as canvas, gold as legacy.
          </p>
        </div>

        {/* Filter bar */}
        <div className="flex items-center justify-between mb-10 border-b border-gold/10 pb-5">
          <p className="text-gray-500 text-sm">
            <span className="text-white font-semibold">{products.length}</span> pieces
          </p>
          <div className="flex items-center gap-2 text-gray-500 text-sm hover:text-gold transition-colors cursor-pointer">
            <SlidersHorizontal size={15} />
            <span className="font-mono text-xs uppercase tracking-wider">Filter & Sort</span>
          </div>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        {/* Cultural note */}
        <div className="mt-20 text-center border border-gold/20 p-10 max-w-2xl mx-auto">
          <p className="gold-label mb-4">Made with intention</p>
          <p className="text-gray-400 leading-relaxed text-sm">
            Each piece in the Blac.cess collection is small-batch produced and culturally documented.
            When a drop sells out, it sells out. The next chapter begins with the next collection.
          </p>
        </div>
      </div>
    </div>
  )
}
