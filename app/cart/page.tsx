'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCartStore } from '@/store/cart'
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react'
import BrandLogo from '@/components/shared/BrandLogo'

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalItems, getTotalPrice, clearCart } = useCartStore()
  const totalItems = getTotalItems()
  const totalPrice = getTotalPrice()
  const shipping = totalPrice >= 200 ? 0 : 12

  // Empty cart state
  if (items.length === 0) {
    return (
      <div className="fixed inset-0 overflow-hidden bg-black flex flex-col items-center justify-center px-6 text-center">
        <div className="liquid-glass-dark w-20 h-20 flex items-center justify-center mb-6">
          <ShoppingBag size={28} className="text-white/30" />
        </div>
        <h1 className="font-serif text-3xl text-white mb-3">Your cart is empty</h1>
        <p className="text-white/50 text-sm mb-8 max-w-xs">
          Explore the collection to find something worthy.
        </p>
        <Link
          href="/products"
          className="liquid-glass-btn px-8 py-3 text-white hover:bg-white/10 transition-all inline-flex items-center gap-2"
        >
          Shop Now
          <ArrowRight size={16} />
        </Link>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 overflow-hidden bg-black">
      <div className="h-full pt-20 pb-6 px-4 md:px-8 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <BrandLogo variant="icon" iconSize={28} />
            <div>
              <h1 className="font-serif text-xl text-white">Your Cart</h1>
              <p className="text-white/50 text-xs">{totalItems} {totalItems === 1 ? 'item' : 'items'}</p>
            </div>
          </div>
          <button
            onClick={clearCart}
            className="text-white/40 hover:text-red-400 text-xs transition-colors"
          >
            Clear All
          </button>
        </div>

        {/* Main content - scrollable items + fixed summary */}
        <div className="flex-1 flex flex-col lg:flex-row gap-4 min-h-0">
          {/* Items list - scrollable */}
          <div className="flex-1 overflow-y-auto pr-2 space-y-3">
            {items.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                className="liquid-glass-dark p-4 flex gap-4"
              >
                {/* Image */}
                <Link href={`/products/${item.product.slug}`} className="relative w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-white/5">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </Link>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-white text-sm font-medium truncate">{item.product.name}</h3>
                      <p className="text-white/40 text-xs">
                        {item.selectedSize} · {item.selectedColor}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.product.id, item.selectedSize, item.selectedColor)}
                      className="text-white/30 hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    {/* Quantity */}
                    <div className="flex items-center gap-1 bg-white/5 rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.selectedSize, item.selectedColor, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center text-white/50 hover:text-white"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-8 text-center text-white text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.selectedSize, item.selectedColor, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center text-white/50 hover:text-white"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    {/* Price */}
                    <span className="text-gold font-bold">
                      ${(item.product.price * item.quantity).toFixed(0)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order summary - fixed */}
          <div className="lg:w-80 shrink-0">
            <div className="liquid-glass-dark p-5">
              <h2 className="font-serif text-lg text-white mb-4">Summary</h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/50">Subtotal</span>
                  <span className="text-white">${totalPrice.toFixed(0)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">Shipping</span>
                  <span className={shipping === 0 ? 'text-green-400' : 'text-white'}>
                    {shipping === 0 ? 'FREE' : `$${shipping}`}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-white/30 text-xs">
                    Add ${(200 - totalPrice).toFixed(0)} more for free shipping
                  </p>
                )}
              </div>

              <div className="h-px bg-white/10 my-4" />

              <div className="flex justify-between mb-5">
                <span className="text-white font-medium">Total</span>
                <span className="text-gold font-bold text-xl">${(totalPrice + shipping).toFixed(0)}</span>
              </div>

              <Link
                href="/checkout"
                className="w-full bg-gold/20 border border-gold/50 text-gold rounded-xl py-3 text-sm font-medium hover:bg-gold/30 transition-colors flex items-center justify-center gap-2"
              >
                Checkout
                <ArrowRight size={16} />
              </Link>

              <Link
                href="/products"
                className="block text-center text-white/40 text-xs mt-4 hover:text-white transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
