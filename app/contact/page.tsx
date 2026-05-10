'use client'

import { useState } from 'react'
import type { Metadata } from 'next'
import { Mail, Instagram, Twitter, MapPin, Clock, Send } from 'lucide-react'

const faqs = [
  {
    q: 'How long does shipping take?',
    a: 'Standard shipping takes 5–10 business days. Express (2–3 days) is available at checkout. We ship worldwide from our UK fulfillment centre.',
  },
  {
    q: 'What is your return policy?',
    a: 'We accept returns within 30 days of delivery for unworn, unwashed items in original packaging. Cultural edition drops may be final sale — this is noted on the product page.',
  },
  {
    q: 'How do I care for my Blac.cess piece?',
    a: 'Each product includes specific care instructions. Generally: wash inside out at 30°C, avoid tumble drying, and never iron directly on embroidered or printed details.',
  },
  {
    q: 'Are your drops truly limited?',
    a: 'Yes. Each cultural collection is produced in small batches. Once a piece sells out, it will not be restocked. We announce new drops via our newsletter and socials.',
  },
  {
    q: 'How do I know my size?',
    a: 'Our pieces are intentionally oversized. If you\'re between sizes, size down. Each product page includes a detailed size chart. When in doubt, reach out — we\'re happy to advise.',
  },
]

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="crown-frame min-h-screen bg-black pt-28 pb-24">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-20">
          <p className="gold-label mb-4">Get In Touch</p>
          <h1 className="font-serif text-5xl md:text-6xl text-white mb-6">Contact Us</h1>
          <div className="gold-divider max-w-xs mx-auto mb-6" />
          <p className="text-gray-500 max-w-md mx-auto text-sm leading-relaxed">
            Have a question about sizing, an order, or a collaboration? We read every message and respond within 48 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

          {/* LEFT — Contact info */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <p className="gold-label mb-6">Contact Details</p>
              <div className="space-y-5">
                {[
                  { icon: Mail, label: 'Email', value: 'hello@blaccess.com', href: 'mailto:hello@blaccess.com' },
                  { icon: Instagram, label: 'Instagram', value: '@blaccess', href: '#' },
                  { icon: Twitter, label: 'Twitter / X', value: '@blaccess', href: '#' },
                  { icon: MapPin, label: 'Fulfilment', value: 'London, UK — Ships Worldwide', href: null },
                  { icon: Clock, label: 'Response Time', value: 'Within 48 hours', href: null },
                ].map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-9 h-9 border border-gold/20 flex items-center justify-center shrink-0">
                      <Icon size={14} className="text-gold" />
                    </div>
                    <div>
                      <p className="text-[10px] font-mono uppercase tracking-widest text-gray-600 mb-0.5">{label}</p>
                      {href ? (
                        <a href={href} className="text-gray-300 text-sm hover:text-gold transition-colors">
                          {value}
                        </a>
                      ) : (
                        <p className="text-gray-300 text-sm">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cultural note */}
            <div className="p-6 bg-charcoal border-l-4 border-gold">
              <p className="gold-label mb-2">A Note on Collabs</p>
              <p className="text-gray-500 text-sm leading-relaxed">
                We are selective with collaborations. If your work connects meaningfully with African cultural heritage, fashion, or storytelling — we want to hear from you.
              </p>
            </div>
          </div>

          {/* RIGHT — Form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full py-16 text-center border border-gold/20 kuba-corner">
                <div className="w-16 h-16 bg-gold flex items-center justify-center mb-6">
                  <Send size={24} className="text-black" />
                </div>
                <h3 className="font-serif text-2xl text-white mb-3">Message Sent</h3>
                <p className="text-gray-500 text-sm max-w-xs">
                  Thank you for reaching out. We&apos;ll get back to you within 48 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" id="contact-form">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {[
                    { id: 'name', label: 'Name', type: 'text', placeholder: 'Your name' },
                    { id: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' },
                  ].map(({ id, label, type, placeholder }) => (
                    <div key={id}>
                      <label htmlFor={id} className="gold-label block mb-2">{label}</label>
                      <input
                        id={id}
                        type={type}
                        placeholder={placeholder}
                        required
                        value={form[id as keyof typeof form]}
                        onChange={e => setForm(f => ({ ...f, [id]: e.target.value }))}
                        className="w-full bg-charcoal border border-gold/20 text-white placeholder-gray-600 px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors"
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label htmlFor="subject" className="gold-label block mb-2">Subject</label>
                  <input
                    id="subject"
                    type="text"
                    placeholder="Order query, sizing, collaboration..."
                    value={form.subject}
                    onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                    className="w-full bg-charcoal border border-gold/20 text-white placeholder-gray-600 px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="gold-label block mb-2">Message</label>
                  <textarea
                    id="message"
                    rows={6}
                    placeholder="Tell us what's on your mind..."
                    required
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    className="w-full bg-charcoal border border-gold/20 text-white placeholder-gray-600 px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-gold w-full py-4 text-sm flex items-center justify-center gap-2"
                  id="contact-submit-btn"
                >
                  <Send size={15} />
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-24" id="faq">
          <div className="text-center mb-12">
            <p className="gold-label mb-4">Frequently Asked</p>
            <h2 className="font-serif text-3xl text-white">Common Questions</h2>
          </div>
          <div className="max-w-2xl mx-auto divide-y divide-gold/10">
            {faqs.map((faq, i) => (
              <div key={i} className="py-5">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-start justify-between gap-4 text-left"
                  aria-expanded={openFaq === i}
                >
                  <span className="text-white text-sm font-semibold">{faq.q}</span>
                  <span className="text-gold text-lg leading-none shrink-0 mt-0.5">
                    {openFaq === i ? '−' : '+'}
                  </span>
                </button>
                {openFaq === i && (
                  <p className="text-gray-500 text-sm leading-relaxed mt-3 animate-fade-in">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
