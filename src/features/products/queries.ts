import { prisma } from '@/lib/prisma'

export async function getAllProducts() {
  return prisma.product.findMany({
    orderBy: [{ categoryId: 'asc' }, { position: 'asc' }],
    include: { category: { select: { id: true, name: true } } },
  })
}

export async function getProductById(id: string) {
  return prisma.product.findUnique({ where: { id }, include: { category: true } })
}
