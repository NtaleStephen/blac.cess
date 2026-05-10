'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCartStore } from '@/store/cart'
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ArrowLeft } from 'lucide-react'
import clsx from 'clsx'

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalItems, getTotalPrice, clearCart } = useCartStore()
  const totalItems = getTotalItems()
  const totalPrice = getTotalPrice()
  const shipping = totalPrice >= 200 ? 0 : 12

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-black pt-28 pb-24 flex flex-col items-center justify-center px-6 text-center">
        <div className="w-24 h-24 border border-gold/20 flex items-center justify-center mb-8 kuba-corner">
          <ShoppingBag size={32} className="text-gold/30" />
        </div>
        <h1 className="font-serif text-4xl text-white mb-4">Your cart is empty</h1>
        <p className="text-gray-500 text-sm mb-10 max-w-xs">
          You haven&apos;t added any pieces yet. Explore the collection to find something worthy.
        </p>
        <Link href="/products" className="btn-gold inline-flex items-center gap-2 px-10 py-4 text-sm group">
          Explore Collection
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black pt-28 pb-24">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <p className="gold-label mb-2">Your Cart</p>
            <h1 className="font-serif text-4xl text-white">
              {totalItems} {totalItems === 1 ? 'Piece' : 'Pieces'}
            </h1>
          </div>
          <button
            onClick={clearCart}
            className="text-gray-600 hover:text-red-400 text-xs font-mono uppercase tracking-wider transition-colors"
          >
            Clear All
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Items list */}
          <div className="lg:col-span-2 space-y-0 divide-y divide-gold/10">
            {items.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                className="flex gap-6 py-8"
              >
                {/* Image */}
                <Link href={`/products/${item.product.slug}`} className="relative w-28 h-28 shrink-0 bg-charcoal overflow-hidden">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    sizes="112px"
                  />
                </Link>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Link href={`/products/${item.product.slug}`}>
                        <h3 className="text-white font-semibold hover:text-gold transition-colors">
                          {item.product.name}
                        </h3>
                      </Link>
                      <p className="text-gold text-xs font-mono">{item.product.variant}</p>
                      <div className="flex gap-3 mt-2">
                        <span className="text-gray-500 text-xs">Size: <span className="text-gray-300">{item.selectedSize}</span></span>
                        <span className="text-gray-500 text-xs">Colour: <span className="text-gray-300">{item.selectedColor}</span></span>
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(item.product.id, item.selectedSize, item.selectedColor)}
                      className="text-gray-600 hover:text-red-400 transition-colors shrink-0"
                      aria-label="Remove item from cart"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-5">
                    {/* Qty */}
                    <div className="flex items-center border border-gold/20">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.selectedSize, item.selectedColor, item.quantity - 1)}
                        className="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-gold transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="w-10 text-center text-white text-sm font-mono">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.selectedSize, item.selectedColor, item.quantity + 1)}
                        className="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-gold transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus size={13} />
                      </button>
                    </div>

                    {/* Line price */}
                    <div className="text-right">
                      <div className="text-gold font-bold">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </div>
                      {item.quantity > 1 && (
                        <div className="text-gray-600 text-xs">
                          ${item.product.price.toFixed(2)} each
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-charcoal border border-gold/20 p-8 sticky top-28">
              <h2 className="font-serif text-xl text-white mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Subtotal ({totalItems} {totalItems === 1 ? 'item' : 'items'})</span>
                  <span className="text-white">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Shipping</span>
                  <span className={clsx('font-semibold', shipping === 0 ? 'text-emerald-400' : 'text-white')}>
                    {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-gray-600 text-xs">
                    Add ${(200 - totalPrice).toFixed(2)} more for free shipping
                  </p>
                )}
              </div>

              <div className="gold-divider mb-6" />

              <div className="flex justify-between mb-8">
                <span className="text-white font-semibold">Total</span>
                <span className="text-gold font-bold text-xl">
                  ${(totalPrice + shipping).toFixed(2)}
                </span>
              </div>

              {/* Promo code */}
              <div className="flex gap-2 mb-6">
                <input
                  type="text"
                  placeholder="Promo code"
                  className="flex-1 bg-black border border-gold/20 text-white placeholder-gray-600 px-3 py-2 text-xs focus:outline-none focus:border-gold transition-colors"
                />
                <button className="px-4 py-2 border border-gold/20 text-gold text-xs hover:bg-gold hover:text-black transition-all">
                  Apply
                </button>
              </div>

              {/* Checkout CTA */}
              <button
                className="btn-gold w-full py-4 text-sm flex items-center justify-center gap-2 group mb-4"
                id="checkout-page-btn"
              >
                Proceed to Checkout
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <Link
                href="/products"
                className="flex items-center justify-center gap-2 text-gray-500 text-xs hover:text-gold transition-colors"
              >
                <ArrowLeft size={12} />
                Continue Shopping
              </Link>

              {/* Note */}
              <p className="text-gray-600 text-xs text-center mt-6 leading-relaxed">
                Secure checkout. All transactions are encrypted and PCI-compliant.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
