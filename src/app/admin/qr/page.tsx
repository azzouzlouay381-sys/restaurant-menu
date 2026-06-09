import { prisma } from '@/lib/prisma'
import QRGenerator from '@/components/admin/QRGenerator'

export default async function QRPage() {
  const restaurant = await prisma.restaurant.findFirst()

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-stone-800">QR Code</h1>
        <p className="text-stone-500 text-sm mt-1">Generate and download your menu QR code</p>
      </div>
      <div className="bg-white rounded-2xl border border-stone-200 p-8 max-w-lg">
        <QRGenerator menuUrl={restaurant?.menuUrl ?? 'http://localhost:3000/menu'} />
      </div>
    </div>
  )
}
