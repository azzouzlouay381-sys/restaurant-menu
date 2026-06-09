'use server'
import { prisma } from '@/lib/prisma'
import { productSchema } from '@/lib/validations'
import { revalidatePath } from 'next/cache'
import { slugify } from '@/lib/utils'

export async function createProduct(data: unknown) {
  const parsed = productSchema.safeParse(data)
  if (!parsed.success) return { error: parsed.error.flatten() }
  const product = await prisma.product.create({ data: parsed.data })
  revalidatePath('/menu')
  revalidatePath('/admin/products')
  return { product }
}

export async function updateProduct(id: string, data: unknown) {
  const parsed = productSchema.safeParse(data)
  if (!parsed.success) return { error: parsed.error.flatten() }
  const product = await prisma.product.update({ where: { id }, data: parsed.data })
  revalidatePath('/menu')
  revalidatePath('/admin/products')
  return { product }
}

export async function deleteProduct(id: string) {
  await prisma.product.delete({ where: { id } })
  revalidatePath('/menu')
  revalidatePath('/admin/products')
  return { success: true }
}

export async function toggleAvailability(id: string, isAvailable: boolean) {
  const product = await prisma.product.update({ where: { id }, data: { isAvailable } })
  revalidatePath('/menu')
  revalidatePath('/admin/products')
  return { product }
}
