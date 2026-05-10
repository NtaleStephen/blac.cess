import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/shared/Header'
import Footer from '@/components/shared/Footer'
import CartPanel from '@/components/shared/CartPanel'

export const metadata: Metadata = {
  metadataBase: new URL('https://blaccess.com'),
  title: {
    default: 'BLAC.CESS — Where Heritage Meets Fashion',
    template: '%s | BLAC.CESS',
  },
  description:
    'Blac.cess is a culturally-inspired black and gold luxury streetwear brand. Premium pieces rooted in African heritage, crafted for the bold.',
  keywords: ['blac.cess', 'luxury streetwear', 'African fashion', 'black and gold', 'cultural fashion', 'premium hoodie'],
  authors: [{ name: 'Blac.cess' }],
  creator: 'Blac.cess',
  icons: {
    icon: '/images/E65ECE06-D9A8-47B2-A4FE-CC28190076EA.jpg',
    apple: '/images/E65ECE06-D9A8-47B2-A4FE-CC28190076EA.jpg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://blaccess.com',
    siteName: 'BLAC.CESS',
    title: 'BLAC.CESS — Where Heritage Meets Fashion',
    description: 'Culturally-inspired black and gold luxury streetwear. Premium pieces rooted in African heritage.',
    images: [
      {
        url: '/images/E65ECE06-D9A8-47B2-A4FE-CC28190076EA.jpg',
        width: 800,
        height: 418,
        alt: 'Blac.cess crown logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BLAC.CESS — Where Heritage Meets Fashion',
    description: 'Culturally-inspired black and gold luxury streetwear.',
    images: ['/images/E65ECE06-D9A8-47B2-A4FE-CC28190076EA.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-black text-white antialiased">
        <Header />
        <CartPanel />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
