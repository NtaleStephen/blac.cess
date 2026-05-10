'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ShoppingBag, Menu, X, Search } from 'lucide-react'
import { useCartStore } from '@/store/cart'
import clsx from 'clsx'

const navLinks = [
  { href: '/products', label: 'Collection' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { getTotalItems, openCart } = useCartStore()
  const totalItems = getTotalItems()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <header
        className={clsx(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-500',
          scrolled
            ? 'glass-panel py-3 rounded-b-[2rem] mx-2 mt-2 border-t-0'
            : 'bg-transparent py-5'
        )}
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

          {/* Logo */}
          <Link
            href="/"
            className="font-serif text-xl font-bold tracking-tight group"
            aria-label="Blac.cess — Return to homepage"
          >
            <span className="text-gold-shimmer">BLAC</span>
            <span className="text-white">.</span>
            <span className="text-gold-shimmer">CESS</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-10" aria-label="Primary navigation">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-xs tracking-[0.2em] uppercase text-gray-400 hover:text-gold transition-colors duration-200 relative group"
              >
                {label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Right icons */}
          <div className="flex items-center gap-5">
            {/* Search — desktop only */}
            <button
              className="hidden md:flex text-gray-400 hover:text-gold transition-colors"
              aria-label="Search products"
              id="search-btn"
            >
              <Search size={18} />
            </button>

            {/* Cart */}
            <button
              onClick={openCart}
              className="relative text-gray-400 hover:text-gold transition-colors"
              aria-label={`Shopping cart — ${totalItems} item${totalItems !== 1 ? 's' : ''}`}
              id="cart-btn"
            >
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-gold text-black text-[10px] font-bold flex items-center justify-center">
                  {totalItems > 9 ? '9+' : totalItems}
                </span>
              )}
            </button>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-gray-400 hover:text-gold transition-colors"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              id="mobile-menu-btn"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* ===== MOBILE MENU ===== */}
      <div
        className={clsx(
          'fixed inset-0 z-50 md:hidden transition-all duration-500',
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />

        {/* Drawer */}
        <div
          className={clsx(
            'absolute top-0 right-0 h-full w-72 bg-charcoal border-l border-gold/20 flex flex-col transition-transform duration-500',
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          )}
        >
          {/* Close */}
          <div className="flex items-center justify-between p-6 border-b border-gold/20">
            <span className="font-serif text-lg text-gold">Menu</span>
            <button
              onClick={() => setMenuOpen(false)}
              className="text-gray-400 hover:text-white"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          {/* Links */}
          <nav className="flex flex-col gap-0 flex-1" aria-label="Mobile navigation">
            {navLinks.map(({ href, label }, i) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="px-8 py-5 text-sm tracking-widest uppercase text-gray-300 hover:text-gold hover:bg-black/30 transition-all border-b border-gold/10"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Cart in mobile menu */}
          <div className="p-6 border-t border-gold/20">
            <button
              onClick={() => { setMenuOpen(false); openCart() }}
              className="w-full btn-ghost-gold px-6 py-3 text-sm flex items-center justify-center gap-2"
            >
              <ShoppingBag size={16} />
              Cart {totalItems > 0 && `(${totalItems})`}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
