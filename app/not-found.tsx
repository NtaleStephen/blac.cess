import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6 text-center">
      <p className="gold-label mb-6">404 — Not Found</p>
      <h1 className="font-serif text-8xl text-gold mb-4">404</h1>
      <h2 className="font-serif text-3xl text-white mb-6">This page doesn&apos;t exist</h2>
      <p className="text-gray-500 text-sm max-w-xs mb-10">
        The piece you&apos;re looking for may have sold out, moved, or never existed. Even in fashion, some things are fleeting.
      </p>
      <Link href="/" className="btn-gold inline-flex items-center gap-2 px-10 py-4 text-sm group">
        Return Home
        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  )
}
