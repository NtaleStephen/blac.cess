'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Mail, Lock, User, ArrowRight } from 'lucide-react'
import BrandLogo from '@/components/shared/BrandLogo'

export default function AccountPage() {
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [form, setForm] = useState({ email: '', password: '', name: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="fixed inset-0 overflow-hidden bg-black flex flex-col items-center justify-center px-6 text-center">
        <BrandLogo variant="icon" iconSize={48} className="mb-6" />
        <h1 className="font-serif text-2xl text-white mb-3">
          {mode === 'login' ? 'Welcome Back' : 'Account Created'}
        </h1>
        <p className="text-white/50 text-sm mb-8 max-w-xs">
          {mode === 'login'
            ? 'You are now signed in to your account.'
            : 'Check your email to verify your account.'}
        </p>
        <Link
          href="/products"
          className="liquid-glass-btn px-8 py-3 text-white hover:bg-white/10 inline-flex items-center gap-2"
        >
          Start Shopping
          <ArrowRight size={16} />
        </Link>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 overflow-hidden bg-black flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="text-center mb-8">
          <BrandLogo variant="icon" iconSize={48} className="mx-auto mb-4" />
          <h1 className="font-serif text-2xl text-white">
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </h1>
          <p className="text-white/50 text-sm mt-2">
            {mode === 'login' ? 'Welcome back to Blac.cess' : 'Join the Blac.cess community'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="liquid-glass-dark p-6 space-y-4">
          {mode === 'register' && (
            <div className="relative">
              <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                type="text"
                placeholder="Full Name"
                required
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-gold/50"
              />
            </div>
          )}

          <div className="relative">
            <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              type="email"
              placeholder="Email"
              required
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-gold/50"
            />
          </div>

          <div className="relative">
            <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              type="password"
              placeholder="Password"
              required
              value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-gold/50"
            />
          </div>

          {mode === 'login' && (
            <div className="text-right">
              <button type="button" className="text-gold text-xs hover:underline">
                Forgot password?
              </button>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gold/20 border border-gold/50 text-gold rounded-xl py-3 text-sm font-medium hover:bg-gold/30 transition-colors"
          >
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        {/* Toggle */}
        <p className="text-center text-white/40 text-sm mt-6">
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button
            onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
            className="text-gold hover:underline"
          >
            {mode === 'login' ? 'Sign Up' : 'Sign In'}
          </button>
        </p>

        {/* Continue as guest */}
        <div className="text-center mt-8">
          <Link href="/products" className="text-white/30 text-xs hover:text-white transition-colors">
            Continue as Guest →
          </Link>
        </div>
      </div>
    </div>
  )
}
