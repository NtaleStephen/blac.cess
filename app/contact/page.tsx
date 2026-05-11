'use client'

import { useState } from 'react'
import { Mail, Instagram, MapPin, Send, ChevronDown } from 'lucide-react'
import BrandLogo from '@/components/shared/BrandLogo'

const faqs = [
  { q: 'How long does shipping take?', a: 'Standard: 5–10 days. Express: 2–3 days. Ships worldwide from UK.' },
  { q: 'What is your return policy?', a: '30-day returns for unworn items in original packaging.' },
  { q: 'Are your drops truly limited?', a: 'Yes. Small batches only. Once sold out, not restocked.' },
  { q: 'How do I know my size?', a: 'Intentionally oversized. Between sizes? Size down.' },
]

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="fixed inset-0 overflow-hidden bg-black">
      <div className="h-full pt-20 pb-6 px-4 md:px-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">

          {/* Header */}
          <div className="text-center py-8 md:py-12">
            <BrandLogo variant="icon" iconSize={40} className="mx-auto mb-4" />
            <h1 className="font-serif text-3xl md:text-4xl text-white mb-2">Get in Touch</h1>
            <p className="text-white/50 text-sm">We respond within 48 hours.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
            {/* Contact Info */}
            <div className="liquid-glass-dark p-6 space-y-4">
              <h2 className="text-gold text-xs uppercase tracking-widest mb-4">Contact</h2>

              {[
                { icon: Mail, label: 'Email', value: 'hello@blaccess.com' },
                { icon: Instagram, label: 'Instagram', value: '@blaccess' },
                { icon: MapPin, label: 'Ships From', value: 'London, UK — Worldwide' },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                    <Icon size={14} className="text-gold" />
                  </div>
                  <div>
                    <p className="text-white/40 text-[10px] uppercase tracking-wider">{label}</p>
                    <p className="text-white text-sm">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Form */}
            <div className="liquid-glass-dark p-6">
              {submitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-8">
                  <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center mb-4">
                    <Send size={20} className="text-gold" />
                  </div>
                  <h3 className="font-serif text-xl text-white mb-2">Message Sent</h3>
                  <p className="text-white/50 text-sm">We'll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Name"
                      required
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      className="col-span-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-gold/50"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      className="col-span-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-gold/50"
                    />
                  </div>
                  <textarea
                    placeholder="Your message..."
                    rows={4}
                    required
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-gold/50 resize-none"
                  />
                  <button
                    type="submit"
                    className="w-full bg-gold/20 border border-gold/50 text-gold rounded-xl py-3 text-sm font-medium hover:bg-gold/30 transition-colors flex items-center justify-center gap-2"
                  >
                    <Send size={14} />
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* FAQ */}
          <div className="liquid-glass-dark p-6 mb-8">
            <h2 className="text-gold text-xs uppercase tracking-widest mb-4">FAQ</h2>
            <div className="space-y-2">
              {faqs.map((faq, i) => (
                <div key={i} className="border-b border-white/5 last:border-0">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between py-3 text-left"
                  >
                    <span className="text-white text-sm">{faq.q}</span>
                    <ChevronDown
                      size={16}
                      className={`text-gold transition-transform ${openFaq === i ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {openFaq === i && (
                    <p className="text-white/50 text-sm pb-3 animate-fade-in">{faq.a}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
