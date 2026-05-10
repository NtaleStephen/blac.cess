import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Play } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About',
  description: 'The story behind Blac.cess — a culturally-inspired luxury streetwear brand rooted in African heritage, identity, and the pursuit of genuine craftsmanship.',
}

const heritagePoints = [
  {
    culture: 'Kuba Kingdom',
    region: 'D.R. Congo',
    desc: 'Royal raffia cloth weaving with complex geometric patterns, worn by Kuba royalty for centuries. Our Heritage Hoodie and Kuba Bomber draw directly from this tradition.',
    product: 'Kuba Bomber',
  },
  {
    culture: 'Yoruba Adire',
    region: 'West Africa (Nigeria)',
    desc: 'Resist-dye textile art using indigo — practised by the Yoruba people for generations. Each pattern carries symbolic meaning and cultural identity.',
    product: 'Adire Tee',
  },
  {
    culture: 'Ndebele Beadwork',
    region: 'South Africa',
    desc: 'Geometric beadwork and mural painting traditions of the Ndebele people — characterised by bold diamonds, triangles, and stripes in vivid colour.',
    product: 'Ndebele Joggers',
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black">

      {/* ===== HERO ===== */}
      <section className="relative min-h-[70vh] flex items-end pb-20 overflow-hidden pt-28">
        <div className="absolute inset-0 bg-hero-pattern opacity-50" />
        <div className="absolute inset-0">
          <div className="absolute inset-0" style={{
            background: 'radial-gradient(ellipse at 50% 60%, rgba(212,175,55,0.08) 0%, transparent 70%)'
          }} />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <p className="gold-label mb-6">Our Story</p>
          <h1 className="font-serif text-6xl md:text-8xl text-white leading-none mb-8">
            Culture is<br />
            <em className="text-gold not-italic">the canvas</em>
          </h1>
          <div className="gold-divider max-w-sm mb-8" />
          <p className="text-gray-400 text-xl max-w-xl leading-relaxed">
            Blac.cess was built on a simple premise: the richest fashion traditions in the world didn&apos;t begin in Europe. They began in Africa.
          </p>
        </div>
      </section>

      {/* ===== BRAND STORY ===== */}
      <section className="py-24 px-6 bg-charcoal">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <p className="gold-label mb-6">The Beginning</p>
              <h2 className="font-serif text-3xl text-white mb-6">
                No template.<br />No shortcut.
              </h2>
              <p className="text-gray-400 leading-relaxed mb-5">
                Blac.cess began with an obsession — not with trends, but with <em className="text-cream not-italic">heritage</em>. The founders spent years studying African textile traditions, royal cloth-making, and the visual languages of cultures that had been practising luxury long before the word entered Western vocabulary.
              </p>
              <p className="text-gray-400 leading-relaxed">
                No manufacturing experience. No industry contacts. Just a deep commitment to getting it right — to creating pieces that honour their cultural origins rather than simply borrowing aesthetics for profit.
              </p>
            </div>
            <div>
              <p className="gold-label mb-6">The Philosophy</p>
              <h2 className="font-serif text-3xl text-white mb-6">
                Black canvas.<br />Gold legacy.
              </h2>
              <p className="text-gray-400 leading-relaxed mb-5">
                The colour palette of Blac.cess is not arbitrary. Black is the canvas — the depth from which all colour and form emerges. Gold is legacy — the material that African royalty used to mark power, divine connection, and achievement across millennia.
              </p>
              <p className="text-gray-400 leading-relaxed">
                Every stitch, every pattern, every material choice is made in service of that story. We make very few pieces, on purpose. What we make, we make well.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== VIDEO SECTION ===== */}
      <section className="py-24 px-6 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <p className="gold-label mb-6">The Process</p>
          <h2 className="font-serif text-4xl text-white mb-4">
            Built from the ground up
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto mb-12 text-sm leading-relaxed">
            From sourcing 450GSM heavyweight cotton to hand-documenting cultural references — watch how a Blac.cess piece comes to life.
          </p>

          {/* Video placeholder */}
          <div className="relative aspect-video bg-charcoal border border-gold/20 overflow-hidden group cursor-pointer kuba-corner">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-gold flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Play size={28} className="text-black ml-1" />
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <p className="font-serif text-xl text-white">The Making of Blac.cess</p>
              <p className="text-gold text-xs font-mono mt-1">12 Minutes — Full Process Documentary</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== HERITAGE SECTION ===== */}
      <section className="py-24 px-6 bg-charcoal" id="heritage">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="gold-label mb-4">Cultural Roots</p>
            <h2 className="font-serif text-4xl text-white mb-4">The traditions we honour</h2>
            <div className="gold-divider max-w-xs mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {heritagePoints.map(({ culture, region, desc, product }) => (
              <div
                key={culture}
                className="bg-black border border-gold/20 p-8 hover:border-gold transition-all duration-300 kuba-corner group"
              >
                <p className="gold-label mb-2">{region}</p>
                <h3 className="font-serif text-2xl text-white mb-4 group-hover:text-gold transition-colors">{culture}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">{desc}</p>
                <div className="pt-4 border-t border-gold/10">
                  <p className="text-[10px] text-gray-600 font-mono uppercase tracking-wider">Seen in</p>
                  <p className="text-gold text-sm font-semibold mt-1">{product}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-24 px-6 bg-black text-center">
        <p className="gold-label mb-6">Ready to wear the legacy?</p>
        <h2 className="font-serif text-4xl text-white mb-8">
          Explore the Collection
        </h2>
        <Link
          href="/products"
          className="btn-gold inline-flex items-center gap-2 px-12 py-4 text-sm group"
        >
          Shop Now
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </section>
    </div>
  )
}
