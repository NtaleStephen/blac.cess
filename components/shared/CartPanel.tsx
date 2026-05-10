'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { X, Plus, Minus, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react'
import { useCartStore } from '@/store/cart'
import clsx from 'clsx'

export default function CartPanel() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getTotalItems, getTotalPrice } = useCartStore()
  const totalItems = getTotalItems()
  const totalPrice = getTotalPrice()

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeCart() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [closeCart])

  // Lock scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="cart-overlay"
          onClick={closeCart}
          aria-hidden="true"
        />
      )}

      {/* Panel */}
      <aside
        className={clsx(
          'fixed top-2 right-2 bottom-2 w-[calc(100%-1rem)] sm:w-[420px] glass-panel rounded-[2rem] z-50 flex flex-col transition-transform duration-500 ease-in-out',
          isOpen ? 'translate-x-0' : 'translate-x-[120%]'
        )}
        aria-label="Shopping cart"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gold/20">
          <div className="flex items-center gap-3">
            <ShoppingBag size={18} className="text-gold" />
            <span className="font-mono text-sm tracking-widest uppercase text-white">
              Cart {totalItems > 0 && <span className="text-gold">({totalItems})</span>}
            </span>
          </div>
          <button
            onClick={closeCart}
            className="text-gray-500 hover:text-white transition-colors"
            aria-label="Close cart"
            id="cart-close-btn"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-5 px-6 text-center">
              <div className="w-16 h-16 border border-gold/20 flex items-center justify-center">
                <ShoppingBag size={24} className="text-gold/40" />
              </div>
              <div>
                <p className="text-white font-semibold mb-2">Your cart is empty</p>
                <p className="text-gray-500 text-sm">Add a piece to begin your collection.</p>
              </div>
              <button
                onClick={closeCart}
                className="btn-gold px-8 py-3 text-sm mt-2"
              >
                Explore Collection
              </button>
            </div>
          ) : (
            <ul className="divide-y divide-gold/10">
              {items.map((item) => (
                <li
                  key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                  className="flex gap-4 p-5"
                >
                  {/* Image */}
                  <div className="relative w-20 h-20 shrink-0 bg-black overflow-hidden">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-white text-sm font-semibold truncate">
                          {item.product.name}
                        </p>
                        <p className="text-gold text-xs font-mono">{item.product.variant}</p>
                        <p className="text-gray-500 text-xs mt-0.5">
                          Size: {item.selectedSize} · Color: {item.selectedColor}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id, item.selectedSize, item.selectedColor)}
                        className="text-gray-600 hover:text-red-400 transition-colors shrink-0"
                        aria-label="Remove item"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    {/* Quantity + Price */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-gold/20">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selectedSize, item.selectedColor, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gold transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-8 text-center text-white text-sm font-mono">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selectedSize, item.selectedColor, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gold transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <span className="text-gold font-bold text-sm">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gold/20 p-6 space-y-4">
            {/* Subtotal */}
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Subtotal</span>
              <span className="text-white font-bold text-lg">${totalPrice.toFixed(2)}</span>
            </div>
            <p className="text-gray-600 text-xs">Shipping & taxes calculated at checkout.</p>

            {/* CTA */}
            <Link
              href="/cart"
              onClick={closeCart}
              className="btn-gold w-full py-4 text-sm flex items-center justify-center gap-2 group"
              id="checkout-btn"
            >
              Proceed to Checkout
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <button
              onClick={closeCart}
              className="w-full text-center text-gray-500 text-xs hover:text-gold transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </aside>
    </>
  )
}
