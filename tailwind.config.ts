import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#D4AF37',
          light: '#FFD700',
          dark: '#B8860B',
          muted: '#C9A84C',
          pale: '#F0E080',
        },
        charcoal: {
          DEFAULT: '#1a1a1a',
          light: '#2a2a2a',
          dark: '#111111',
        },
        cream: '#F5F0E8',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
        mono: ['Space Mono', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.7s ease-out forwards',
        'slide-in-right': 'slideInRight 0.5s ease-out forwards',
        'shimmer': 'shimmer 2s linear infinite',
        'float': 'float 4s ease-in-out infinite',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(212, 175, 55, 0)' },
          '50%': { boxShadow: '0 0 20px 4px rgba(212, 175, 55, 0.3)' },
        },
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #D4AF37 0%, #FFD700 50%, #B8860B 100%)',
        'dark-gradient': 'linear-gradient(180deg, #000000 0%, #1a1a1a 100%)',
        'hero-pattern': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 160 80' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='translate(30, 20)'%3E%3Cpath d='M 10 25 L 10 8 L 30 25 L 50 0 L 70 25 L 90 8 L 90 25 Z' stroke='%23D4AF37' stroke-opacity='0.05' stroke-width='2' stroke-linejoin='miter' /%3E%3Cpath d='M 50 6 L 54 11 L 50 16 L 46 11 Z' fill='%23D4AF37' fill-opacity='0.05' /%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M 10 28 L 90 28 L 90 34 L 10 34 Z M 18 29.5 L 16 31 L 18 32.5 L 20 31 Z M 34 29.5 L 32 31 L 34 32.5 L 36 31 Z M 50 29.5 L 48 31 L 50 32.5 L 52 31 Z M 66 29.5 L 64 31 L 66 32.5 L 68 31 Z M 82 29.5 L 80 31 L 82 32.5 L 84 31 Z' fill='%23D4AF37' fill-opacity='0.05' /%3E%3C/g%3E%3C/svg%3E\")",
        'adire-pattern': "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='3' cy='3' r='1.5' fill='%23D4AF37' fill-opacity='0.12'/%3E%3Ccircle cx='13' cy='13' r='1.5' fill='%23D4AF37' fill-opacity='0.12'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
}
export default config
