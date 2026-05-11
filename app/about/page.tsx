import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import BrandLogo from '@/components/shared/BrandLogo'

export const metadata: Metadata = {
  title: 'About',
  description: 'The story behind Blac.cess — a culturally-inspired luxury streetwear brand rooted in African heritage.',
}

export default function AboutPage() {
  return (
    <div className="fixed inset-0 overflow-hidden bg-black">
      <div className="h-full pt-20 pb-6 px-4 md:px-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">

          {/* Hero - Brand centered */}
          <div className="text-center py-12 md:py-16">
            <BrandLogo variant="icon" iconSize={48} className="mx-auto mb-6" />
            <h1 className="font-serif text-4xl md:text-6xl text-white mb-4">
              Culture is <span className="text-gold">the canvas</span>
            </h1>
            <p className="text-white/60 text-lg max-w-xl mx-auto">
              Premium streetwear rooted in African heritage. Black as canvas, gold as legacy.
            </p>
          </div>

          {/* Content cards - liquid glass */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {/* The Beginning */}
            <div className="liquid-glass-dark p-6 md:p-8">
              <p className="text-gold text-xs uppercase tracking-widest mb-3">The Beginning</p>
              <h2 className="font-serif text-2xl text-white mb-4">No template. No shortcut.</h2>
              <p className="text-white/50 text-sm leading-relaxed">
                Blac.cess began with an obsession — not with trends, but with heritage.
                Years studying African textile traditions, royal cloth-making, and visual
                languages of cultures practising luxury long before the word entered Western vocabulary.
              </p>
            </div>

            {/* Philosophy */}
            <div className="liquid-glass-dark p-6 md:p-8">
              <p className="text-gold text-xs uppercase tracking-widest mb-3">The Philosophy</p>
              <h2 className="font-serif text-2xl text-white mb-4">Black canvas. Gold legacy.</h2>
              <p className="text-white/50 text-sm leading-relaxed">
                Black is the canvas — the depth from which all form emerges. Gold is legacy —
                the material African royalty used to mark power and achievement across millennia.
                Every stitch serves that story.
              </p>
            </div>
          </div>

          {/* Heritage cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {[
              { culture: 'Kuba Kingdom', region: 'D.R. Congo', product: 'Heritage Hoodie' },
              { culture: 'Yoruba Adire', region: 'Nigeria', product: 'Adire Tee' },
              { culture: 'Ndebele', region: 'South Africa', product: 'Ndebele Joggers' },
            ].map(({ culture, region, product }) => (
              <div key={culture} className="liquid-glass-dark p-5">
                <p className="text-white/40 text-xs uppercase tracking-wider mb-1">{region}</p>
                <h3 className="font-serif text-lg text-white mb-2">{culture}</h3>
                <p className="text-gold text-xs">→ {product}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center py-8">
            <Link
              href="/products"
              className="liquid-glass-btn inline-flex items-center gap-2 px-8 py-3 text-white hover:bg-white/10 transition-all"
            >
              Explore Collection
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
