// Types for blac.cess

export interface Product {
  id: string
  slug: string
  name: string
  variant: string
  price: number
  currency: string
  image: string
  gallery: string[]
  colors: ProductColor[]
  sizes: string[]
  stockStatus: 'in_stock' | 'low_stock' | 'sold_out'
  description: string
  culturalInspiration: string
  composition: string
  care: string
  badge?: string
  isNew?: boolean
  isFeatured?: boolean
}

export interface ProductColor {
  name: string
  hex: string
  slug: string
}

export interface CartItem {
  product: Product
  quantity: number
  selectedSize: string
  selectedColor: string
}

export interface CartStore {
  items: CartItem[]
  isOpen: boolean
  addItem: (product: Product, size: string, color: string) => void
  removeItem: (productId: string, size: string, color: string) => void
  updateQuantity: (productId: string, size: string, color: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  openCart: () => void
  closeCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}
