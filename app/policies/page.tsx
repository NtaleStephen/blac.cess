import type { Metadata } from 'next'
import Link from 'next/link'
import { Truck, RotateCcw, Shield, FileText } from 'lucide-react'
import BrandLogo from '@/components/shared/BrandLogo'

export const metadata: Metadata = {
  title: 'Policies',
  description: 'Shipping, returns, privacy policy and terms of service for Blac.cess.',
}

const policies = [
  {
    id: 'shipping',
    icon: Truck,
    title: 'Shipping',
    content: [
      { label: 'Standard Shipping', text: '5-10 business days. $12 flat rate, FREE on orders over $200.' },
      { label: 'Express Shipping', text: '2-3 business days. $25 flat rate.' },
      { label: 'International', text: 'We ship worldwide from our UK fulfilment centre. Customs and duties may apply.' },
      { label: 'Tracking', text: 'All orders include tracking. You\'ll receive an email with tracking info once shipped.' },
    ],
  },
  {
    id: 'returns',
    icon: RotateCcw,
    title: 'Returns & Exchanges',
    content: [
      { label: '30-Day Returns', text: 'Return unworn, unwashed items in original packaging within 30 days for a full refund.' },
      { label: 'Exchanges', text: 'Need a different size? Contact us within 30 days and we\'ll arrange an exchange.' },
      { label: 'Final Sale', text: 'Limited edition drops may be marked as final sale. This is noted on the product page.' },
      { label: 'Process', text: 'Email hello@blaccess.com with your order number. We\'ll send a prepaid return label.' },
    ],
  },
  {
    id: 'privacy',
    icon: Shield,
    title: 'Privacy Policy',
    content: [
      { label: 'Data Collection', text: 'We collect only what\'s needed to process your order: name, email, shipping address, payment info.' },
      { label: 'No Selling', text: 'We never sell your personal data to third parties. Ever.' },
      { label: 'Cookies', text: 'We use essential cookies for cart functionality and analytics to improve your experience.' },
      { label: 'Your Rights', text: 'Request access to, correction of, or deletion of your data anytime via email.' },
    ],
  },
  {
    id: 'terms',
    icon: FileText,
    title: 'Terms of Service',
    content: [
      { label: 'Use of Site', text: 'By using blaccess.com, you agree to these terms. Use the site lawfully and respectfully.' },
      { label: 'Products', text: 'Product images are representative. Actual items may vary slightly in color due to screen settings.' },
      { label: 'Pricing', text: 'All prices are in USD. We reserve the right to change prices without notice.' },
      { label: 'Intellectual Property', text: 'All content, designs, and branding are property of Blac.cess. Do not reproduce without permission.' },
    ],
  },
]

export default function PoliciesPage() {
  return (
    <div className="fixed inset-0 overflow-hidden bg-black">
      <div className="h-full pt-20 pb-6 px-4 md:px-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">

          {/* Header */}
          <div className="text-center py-8 md:py-12">
            <BrandLogo variant="icon" iconSize={40} className="mx-auto mb-4" />
            <h1 className="font-serif text-3xl md:text-4xl text-white mb-2">Policies</h1>
            <p className="text-white/50 text-sm">Everything you need to know.</p>
          </div>

          {/* Quick nav */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {policies.map(({ id, title }) => (
              <a
                key={id}
                href={`#${id}`}
                className="liquid-glass-btn px-4 py-2 text-white/70 text-xs hover:text-white transition-colors"
              >
                {title}
              </a>
            ))}
          </div>

          {/* Policy sections */}
          <div className="space-y-4">
            {policies.map(({ id, icon: Icon, title, content }) => (
              <div key={id} id={id} className="liquid-glass-dark p-6 scroll-mt-24">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
                    <Icon size={18} className="text-gold" />
                  </div>
                  <h2 className="font-serif text-xl text-white">{title}</h2>
                </div>
                <div className="space-y-4">
                  {content.map(({ label, text }) => (
                    <div key={label}>
                      <p className="text-gold text-xs uppercase tracking-wider mb-1">{label}</p>
                      <p className="text-white/60 text-sm leading-relaxed">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="text-center py-8">
            <p className="text-white/40 text-sm mb-4">Have questions?</p>
            <Link
              href="/contact"
              className="liquid-glass-btn inline-flex items-center gap-2 px-6 py-3 text-white hover:bg-white/10 transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
