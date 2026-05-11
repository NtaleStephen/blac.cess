'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Lock, CreditCard, Truck } from 'lucide-react'
import { useCartStore } from '@/store/cart'
import BrandLogo from '@/components/shared/BrandLogo'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotalItems, getTotalPrice, clearCart } = useCartStore()
  const [step, setStep] = useState<'info' | 'payment' | 'complete'>('info')
  const [processing, setProcessing] = useState(false)

  const totalItems = getTotalItems()
  const totalPrice = getTotalPrice()
  const shipping = totalPrice >= 200 ? 0 : 12
  const total = totalPrice + shipping

  const [form, setForm] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    country: '',
    postalCode: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
  })

  // Redirect if cart is empty
  if (items.length === 0 && step !== 'complete') {
    return (
      <div className="fixed inset-0 overflow-hidden bg-black flex flex-col items-center justify-center px-6 text-center">
        <BrandLogo variant="icon" iconSize={40} className="mb-6" />
        <h1 className="font-serif text-2xl text-white mb-3">Your cart is empty</h1>
        <p className="text-white/50 text-sm mb-6">Add items before checking out.</p>
        <Link
          href="/products"
          className="liquid-glass-btn px-6 py-3 text-white hover:bg-white/10"
        >
          Shop Now
        </Link>
      </div>
    )
  }

  // Order complete
  if (step === 'complete') {
    return (
      <div className="fixed inset-0 overflow-hidden bg-black flex flex-col items-center justify-center px-6 text-center">
        <div className="liquid-glass-dark w-20 h-20 flex items-center justify-center mb-6 rounded-full">
          <span className="text-3xl">✓</span>
        </div>
        <h1 className="font-serif text-3xl text-white mb-3">Order Confirmed</h1>
        <p className="text-white/50 text-sm mb-2">Thank you for your purchase.</p>
        <p className="text-gold text-sm mb-8">Order #BLC-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
        <p className="text-white/40 text-xs mb-6 max-w-xs">
          You'll receive a confirmation email shortly with tracking information.
        </p>
        <Link
          href="/"
          className="liquid-glass-btn px-8 py-3 text-white hover:bg-white/10"
        >
          Continue Shopping
        </Link>
      </div>
    )
  }

  const handleSubmit = async () => {
    if (step === 'info') {
      setStep('payment')
      return
    }

    setProcessing(true)
    // Simulate payment processing
    await new Promise(r => setTimeout(r, 2000))
    clearCart()
    setProcessing(false)
    setStep('complete')
  }

  return (
    <div className="fixed inset-0 overflow-hidden bg-black">
      <div className="h-full pt-16 pb-6 px-4 md:px-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">

          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <Link href="/cart" className="flex items-center gap-2 text-white/50 hover:text-white text-sm">
              <ArrowLeft size={16} />
              Back to Cart
            </Link>
            <BrandLogo variant="full" iconSize={24} />
            <div className="flex items-center gap-1 text-white/40 text-xs">
              <Lock size={12} />
              Secure
            </div>
          </div>

          {/* Progress */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className={`flex items-center gap-2 ${step === 'info' ? 'text-gold' : 'text-white/40'}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step === 'info' ? 'bg-gold text-black' : 'bg-white/10'}`}>1</div>
              <span className="text-xs hidden sm:inline">Information</span>
            </div>
            <div className="w-8 h-px bg-white/20" />
            <div className={`flex items-center gap-2 ${step === 'payment' ? 'text-gold' : 'text-white/40'}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step === 'payment' ? 'bg-gold text-black' : 'bg-white/10'}`}>2</div>
              <span className="text-xs hidden sm:inline">Payment</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Form */}
            <div className="lg:col-span-3">
              <div className="liquid-glass-dark p-6">
                {step === 'info' ? (
                  <>
                    <h2 className="font-serif text-lg text-white mb-4">Contact & Shipping</h2>
                    <div className="space-y-4">
                      <input
                        type="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-gold/50"
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="First Name"
                          value={form.firstName}
                          onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))}
                          className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-gold/50"
                        />
                        <input
                          type="text"
                          placeholder="Last Name"
                          value={form.lastName}
                          onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))}
                          className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-gold/50"
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="Address"
                        value={form.address}
                        onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-gold/50"
                      />
                      <div className="grid grid-cols-3 gap-3">
                        <input
                          type="text"
                          placeholder="City"
                          value={form.city}
                          onChange={e => setForm(f => ({ ...f, city: e.target.value }))}
                          className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-gold/50"
                        />
                        <input
                          type="text"
                          placeholder="Country"
                          value={form.country}
                          onChange={e => setForm(f => ({ ...f, country: e.target.value }))}
                          className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-gold/50"
                        />
                        <input
                          type="text"
                          placeholder="Postal Code"
                          value={form.postalCode}
                          onChange={e => setForm(f => ({ ...f, postalCode: e.target.value }))}
                          className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-gold/50"
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <h2 className="font-serif text-lg text-white mb-4">Payment</h2>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 p-3 bg-white/5 rounded-xl">
                        <CreditCard size={18} className="text-gold" />
                        <span className="text-white/60 text-sm">Card Payment</span>
                      </div>
                      <input
                        type="text"
                        placeholder="Card Number"
                        value={form.cardNumber}
                        onChange={e => setForm(f => ({ ...f, cardNumber: e.target.value }))}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-gold/50"
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="MM/YY"
                          value={form.expiry}
                          onChange={e => setForm(f => ({ ...f, expiry: e.target.value }))}
                          className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-gold/50"
                        />
                        <input
                          type="text"
                          placeholder="CVC"
                          value={form.cvc}
                          onChange={e => setForm(f => ({ ...f, cvc: e.target.value }))}
                          className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-gold/50"
                        />
                      </div>
                    </div>
                  </>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={processing}
                  className="w-full mt-6 bg-gold/20 border border-gold/50 text-gold rounded-xl py-3 text-sm font-medium hover:bg-gold/30 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {processing ? (
                    <div className="w-4 h-4 border-2 border-gold border-t-transparent rounded-full animate-spin" />
                  ) : step === 'info' ? (
                    'Continue to Payment'
                  ) : (
                    <>
                      <Lock size={14} />
                      Pay ${total.toFixed(0)}
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Order summary */}
            <div className="lg:col-span-2">
              <div className="liquid-glass-dark p-5">
                <h3 className="font-serif text-lg text-white mb-4">Order Summary</h3>

                <div className="space-y-3 mb-4">
                  {items.map((item) => (
                    <div key={`${item.product.id}-${item.selectedSize}`} className="flex gap-3">
                      <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-white/5 shrink-0">
                        <Image src={item.product.image} alt={item.product.name} fill className="object-cover" />
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-gold text-black text-[10px] font-bold rounded-full flex items-center justify-center">
                          {item.quantity}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm truncate">{item.product.name}</p>
                        <p className="text-white/40 text-xs">{item.selectedSize} · {item.selectedColor}</p>
                      </div>
                      <span className="text-white text-sm">${(item.product.price * item.quantity).toFixed(0)}</span>
                    </div>
                  ))}
                </div>

                <div className="h-px bg-white/10 my-4" />

                <div className="space-y-2 text-sm">
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
                </div>

                <div className="h-px bg-white/10 my-4" />

                <div className="flex justify-between">
                  <span className="text-white font-medium">Total</span>
                  <span className="text-gold font-bold text-xl">${total.toFixed(0)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
