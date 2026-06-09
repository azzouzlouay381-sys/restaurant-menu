import { NextResponse } from 'next/server'
import { generateQRBuffer } from '@/services/qrService'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const restaurant = await prisma.restaurant.findFirst()
  if (!restaurant) return NextResponse.json({ error: 'Restaurant not configured' }, { status: 404 })

  const buffer = await generateQRBuffer({ url: restaurant.menuUrl, size: 1200 })

  return new NextResponse(buffer, {
    headers: {
      'Content-Type': 'image/png',
      'Content-Disposition': 'attachment; filename="menu-qr.png"',
      'Cache-Control': 'no-store',
    },
  })
}
