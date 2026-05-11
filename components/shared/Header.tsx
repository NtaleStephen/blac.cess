'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ShoppingBag, Menu, X } from 'lucide-react'
import { useCartStore } from '@/store/cart'
import clsx from 'clsx'
import CrownLogo from '@/components/shared/CrownLogo'

const navLinks = [
  { href: '/products', label: 'Shop' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { getTotalItems, openCart } = useCartStore()
  const totalItems = getTotalItems()

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-40 py-4 md:py-6"
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

          {/* Menu toggle - left */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-10 h-10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Centered Logo */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2"
            aria-label="Blac.cess — Home"
          >
            <CrownLogo className="h-8 md:h-9 w-auto" priority />
          </Link>

          {/* Cart - right */}
          <button
            onClick={openCart}
            className="w-10 h-10 flex items-center justify-center text-white/70 hover:text-white transition-colors relative"
            aria-label={`Cart — ${totalItems} item${totalItems !== 1 ? 's' : ''}`}
          >
            <ShoppingBag size={20} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-white text-black text-[10px] font-bold flex items-center justify-center">
                {totalItems > 9 ? '9+' : totalItems}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* ===== FULLSCREEN MENU ===== */}
      <div
        className={clsx(
          'fixed inset-0 z-50 transition-all duration-500',
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/95 backdrop-blur-md"
          onClick={() => setMenuOpen(false)}
        />

        {/* Menu content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center">
          {/* Close button */}
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-4 md:top-6 left-6 w-10 h-10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>

          {/* Navigation links */}
          <nav className="flex flex-col items-center gap-8">
            {navLinks.map(({ href, label }, i) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={clsx(
                  'text-3xl md:text-5xl font-serif text-white/80 hover:text-white transition-all duration-300 transform',
                  menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                )}
                style={{ transitionDelay: menuOpen ? `${i * 100}ms` : '0ms' }}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  )
}
