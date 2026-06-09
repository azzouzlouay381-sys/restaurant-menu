import { prisma } from '@/lib/prisma'
import { cache } from 'react'

export const getMenuData = cache(async () => {
  return prisma.category.findMany({
    where: { isVisible: true },
    orderBy: { position: 'asc' },
    include: {
      products: {
        where: { isAvailable: true },
        orderBy: { position: 'asc' },
        select: {
          id: true,
          name: true,
          description: true,
          price: true,
          imageUrl: true,
          isHighlighted: true,
          allergens: true,
        },
      },
    },
  })
})

export const getRestaurantInfo = cache(async () => {
  return prisma.restaurant.findFirst()
})
