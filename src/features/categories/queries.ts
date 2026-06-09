import { prisma } from '@/lib/prisma'

export async function getAllCategories() {
  return prisma.category.findMany({
    orderBy: { position: 'asc' },
    include: { _count: { select: { products: true } } },
  })
}

export async function getCategoryById(id: string) {
  return prisma.category.findUnique({ where: { id } })
}
