import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import BrandLogo from '@/components/shared/BrandLogo'

export default function NotFound() {
  return (
    <div className="fixed inset-0 overflow-hidden bg-black flex flex-col items-center justify-center px-6 text-center">
      <BrandLogo variant="icon" iconSize={48} className="mb-6" />
      <h1 className="font-serif text-7xl text-gold mb-4">404</h1>
      <h2 className="font-serif text-2xl text-white mb-4">Page not found</h2>
      <p className="text-white/50 text-sm max-w-xs mb-8">
        This piece may have sold out, moved, or never existed.
      </p>
      <Link
        href="/"
        className="liquid-glass-btn px-8 py-3 text-white hover:bg-white/10 transition-all inline-flex items-center gap-2"
      >
        Return Home
        <ArrowRight size={16} />
      </Link>
    </div>
  )
}
