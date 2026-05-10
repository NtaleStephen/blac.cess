'use client'

import Link from 'next/link'
import { Instagram, Twitter, Youtube, Mail } from 'lucide-react'

const links = {
  shop: [
    { href: '/products', label: 'All Products' },
    { href: '/products?category=hoodies', label: 'Hoodies' },
    { href: '/products?category=jackets', label: 'Jackets' },
    { href: '/products?category=tees', label: 'Tees' },
  ],
  info: [
    { href: '/about', label: 'Our Story' },
    { href: '/contact', label: 'Contact' },
    { href: '/about#heritage', label: 'Heritage' },
    { href: '/contact#faq', label: 'FAQ' },
  ],
  legal: [
    { href: '/policies', label: 'Shipping Policy' },
    { href: '/policies', label: 'Returns' },
    { href: '/policies', label: 'Privacy Policy' },
    { href: '/policies', label: 'Terms' },
  ],
}

const socials = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Twitter, href: '#', label: 'Twitter / X' },
  { icon: Youtube, href: '#', label: 'YouTube' },
  { icon: Mail, href: 'mailto:hello@blaccess.com', label: 'Email' },
]

export default function Footer() {
  return (
    <footer className="bg-charcoal border-t border-gold/20" role="contentinfo">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <span className="font-serif text-2xl font-bold text-gold-shimmer">BLAC.CESS</span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs mb-6">
              Culturally-inspired luxury streetwear. Premium pieces rooted in African heritage, crafted for those who wear their identity with intention.
            </p>
            {/* Socials */}
            <div className="flex items-center gap-4">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 border border-gold/20 flex items-center justify-center text-gray-500 hover:text-gold hover:border-gold transition-all duration-200"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Shop links */}
          <div>
            <h3 className="gold-label mb-5">Shop</h3>
            <ul className="space-y-3">
              {links.shop.map(({ href, label }) => (
                <li key={label}>
                  <Link href={href} className="text-gray-500 text-sm hover:text-gold transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info links */}
          <div>
            <h3 className="gold-label mb-5">About</h3>
            <ul className="space-y-3">
              {links.info.map(({ href, label }) => (
                <li key={label}>
                  <Link href={href} className="text-gray-500 text-sm hover:text-gold transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <h3 className="gold-label mb-5">Policies</h3>
            <ul className="space-y-3">
              {links.legal.map(({ href, label }) => (
                <li key={label}>
                  <Link href={href} className="text-gray-500 text-sm hover:text-gold transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gold/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs">
            © 2026 BLAC.CESS. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gold/30 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            </div>
            <span className="text-gray-600 text-xs font-mono">Where Heritage Meets Fashion</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
