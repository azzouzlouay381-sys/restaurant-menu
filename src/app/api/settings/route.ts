import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { restaurantSchema } from '@/lib/validations'

export async function PUT(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const parsed = restaurantSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })

  const existing = await prisma.restaurant.findFirst()
  const restaurant = existing
    ? await prisma.restaurant.update({ where: { id: existing.id }, data: parsed.data })
    : await prisma.restaurant.create({ data: { ...parsed.data, id: 'main' } })

  return NextResponse.json(restaurant)
}
