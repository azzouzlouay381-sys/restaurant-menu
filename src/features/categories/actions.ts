'use server'
import { prisma } from '@/lib/prisma'
import { categorySchema } from '@/lib/validations'
import { revalidatePath } from 'next/cache'
import { slugify } from '@/lib/utils'

export async function createCategory(data: unknown) {
  const parsed = categorySchema.safeParse(data)
  if (!parsed.success) return { error: parsed.error.flatten() }
  const slug = slugify(parsed.data.name)
  const category = await prisma.category.create({ data: { ...parsed.data, slug } })
  revalidatePath('/menu')
  revalidatePath('/admin/categories')
  return { category }
}

export async function updateCategory(id: string, data: unknown) {
  const parsed = categorySchema.safeParse(data)
  if (!parsed.success) return { error: parsed.error.flatten() }
  const slug = slugify(parsed.data.name)
  const category = await prisma.category.update({ where: { id }, data: { ...parsed.data, slug } })
  revalidatePath('/menu')
  revalidatePath('/admin/categories')
  return { category }
}

export async function deleteCategory(id: string) {
  await prisma.category.delete({ where: { id } })
  revalidatePath('/menu')
  revalidatePath('/admin/categories')
  return { success: true }
}
