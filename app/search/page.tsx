'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search, X } from 'lucide-react'
import { products } from '@/lib/data'
import BrandLogo from '@/components/shared/BrandLogo'

export default function SearchPage() {
  const [query, setQuery] = useState('')

  const results = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    return products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.variant.toLowerCase().includes(q) ||
      p.description?.toLowerCase().includes(q) ||
      p.culturalInspiration?.toLowerCase().includes(q)
    )
  }, [query])

  return (
    <div className="fixed inset-0 overflow-hidden bg-black">
      <div className="h-full pt-20 pb-6 px-4 md:px-8 flex flex-col">

        {/* Header */}
        <div className="text-center mb-6">
          <BrandLogo variant="icon" iconSize={36} className="mx-auto mb-4" />
          <h1 className="font-serif text-2xl text-white">Search</h1>
        </div>

        {/* Search input */}
        <div className="max-w-md mx-auto w-full mb-6">
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              type="text"
              placeholder="Search products..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              autoFocus
              className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-12 py-4 text-white text-sm placeholder-white/30 focus:outline-none focus:border-gold/50"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            {query.trim() === '' ? (
              // Suggestions when empty
              <div className="text-center py-12">
                <p className="text-white/40 text-sm mb-6">Try searching for:</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {['Hoodie', 'Bomber', 'Tee', 'Joggers', 'Kuba', 'Adire'].map(term => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="liquid-glass-btn px-4 py-2 text-white/60 text-sm hover:text-white"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            ) : results.length === 0 ? (
              // No results
              <div className="text-center py-12">
                <p className="text-white/50 text-lg mb-2">No results for "{query}"</p>
                <p className="text-white/30 text-sm">Try a different search term</p>
              </div>
            ) : (
              // Results grid
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {results.map(product => (
                  <Link
                    key={product.id}
                    href={`/products/${product.slug}`}
                    className="liquid-glass-dark group overflow-hidden"
                  >
                    <div className="relative aspect-square p-4">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 45vw, 22vw"
                      />
                    </div>
                    <div className="p-3 border-t border-white/10">
                      <h3 className="text-white text-sm font-medium truncate">{product.name}</h3>
                      <p className="text-gold text-sm">${product.price}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Results count */}
        {query.trim() !== '' && (
          <div className="text-center pt-4">
            <p className="text-white/30 text-xs">
              {results.length} {results.length === 1 ? 'result' : 'results'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
