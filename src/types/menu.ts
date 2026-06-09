export interface MenuItem {
  id: string
  name: string
  description: string | null
  price: number
  imageUrl: string | null
  isHighlighted: boolean
  allergens: string[]
}

export interface MenuCategory {
  id: string
  name: string
  description: string | null
  slug: string
  imageUrl: string | null
  products: MenuItem[]
}

export interface RestaurantInfo {
  id: string
  name: string
  description: string | null
  address: string | null
  phone: string | null
  email: string | null
  logoUrl: string | null
  coverUrl: string | null
  menuUrl: string
}
