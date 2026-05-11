'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ShoppingBag, Menu } from 'lucide-react'
import { useCartStore } from '@/store/cart'
import clsx from 'clsx'
import BrandLogo from '@/components/shared/BrandLogo'

const navLinks = [
  { href: '/products', label: 'Shop' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { getTotalItems, openCart } = useCartStore()
  const totalItems = getTotalItems()
  const pathname = usePathname()

  // Determine if we're on a light background page (homepage or product detail)
  const isLightBg = pathname === '/' || (pathname.startsWith('/products/') && pathname !== '/products')

  return (
    <header className="fixed top-0 left-0 right-0 z-40 py-3 md:py-4" role="banner">
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">

        {/* Menu with hover dropdown - left */}
        <div
          className="relative"
          onMouseEnter={() => setMenuOpen(true)}
          onMouseLeave={() => setMenuOpen(false)}
        >
          <button
            className={clsx(
              'w-10 h-10 flex items-center justify-center transition-colors rounded-full',
              isLightBg
                ? 'text-black/60 hover:text-black hover:bg-black/5'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            )}
            aria-label="Menu"
            aria-expanded={menuOpen}
          >
            <Menu size={20} />
          </button>

          {/* Dropdown menu on hover */}
          <div
            className={clsx(
              'absolute top-full left-0 mt-2 py-2 min-w-[160px] liquid-glass-dropdown transition-all duration-200',
              menuOpen
                ? 'opacity-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 -translate-y-2 pointer-events-none'
            )}
          >
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="block px-5 py-2.5 text-sm text-black/80 hover:text-black hover:bg-black/5 transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Centered Logo */}
        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2"
          aria-label="Blac.cess — Home"
        >
          <BrandLogo
            variant="full"
            iconSize={28}
            dark={isLightBg}
          />
        </Link>

        {/* Right side icons */}
        <div className="flex items-center gap-2">
          {/* Cart */}
          <button
            onClick={openCart}
            className={clsx(
              'w-10 h-10 flex items-center justify-center transition-colors relative rounded-full',
              isLightBg
                ? 'text-black/60 hover:text-black hover:bg-black/5'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            )}
            aria-label={`Cart — ${totalItems} item${totalItems !== 1 ? 's' : ''}`}
          >
            <ShoppingBag size={20} />
            {totalItems > 0 && (
              <span className={clsx(
                'absolute -top-1 -right-1 w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center',
                isLightBg ? 'bg-black text-white' : 'bg-gold text-black'
              )}>
                {totalItems > 9 ? '9+' : totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}
