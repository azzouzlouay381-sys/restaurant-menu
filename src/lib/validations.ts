import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export const productSchema = z.object({
  name: z.string().min(1).max(120),
  description: z.string().max(500).optional(),
  price: z.number().int().positive(),
  categoryId: z.string().min(1),
  isAvailable: z.boolean().default(true),
  isHighlighted: z.boolean().default(false),
  allergens: z.array(z.string()).default([]),
  imageUrl: z.string().url().optional().nullable(),
  position: z.number().int().default(0),
})

export const categorySchema = z.object({
  name: z.string().min(1).max(80),
  description: z.string().max(300).optional(),
  slug: z.string().min(1).max(80).regex(/^[a-z0-9-]+$/),
  imageUrl: z.string().url().optional().nullable(),
  position: z.number().int().default(0),
  isVisible: z.boolean().default(true),
})

export const restaurantSchema = z.object({
  name: z.string().min(1).max(120),
  description: z.string().max(500).optional(),
  address: z.string().max(300).optional(),
  phone: z.string().max(30).optional(),
  email: z.string().email().optional().or(z.literal('')),
  menuUrl: z.string().url(),
})

export type ProductInput = z.infer<typeof productSchema>
export type CategoryInput = z.infer<typeof categorySchema>
export type LoginInput = z.infer<typeof loginSchema>
export type RestaurantInput = z.infer<typeof restaurantSchema>
