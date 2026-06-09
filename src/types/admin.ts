export interface ProductFormData {
  name: string
  description: string
  price: string
  categoryId: string
  isAvailable: boolean
  isHighlighted: boolean
  allergens: string[]
  imageUrl: string
  position: number
}

export interface CategoryFormData {
  name: string
  description: string
  slug: string
  imageUrl: string
  position: number
  isVisible: boolean
}
