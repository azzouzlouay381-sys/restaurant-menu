import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function AdminDashboard() {
  const [productCount, categoryCount, restaurant] = await Promise.all([
    prisma.product.count(),
    prisma.category.count(),
    prisma.restaurant.findFirst(),
  ])
  const availableCount = await prisma.product.count({ where: { isAvailable: true } })

  const stats = [
    { label: 'Total Products', value: productCount, href: '/admin/products', color: 'bg-blue-50 text-blue-700' },
    { label: 'Categories', value: categoryCount, href: '/admin/categories', color: 'bg-purple-50 text-purple-700' },
    { label: 'Available Items', value: availableCount, href: '/admin/products', color: 'bg-green-50 text-green-700' },
    { label: 'Unavailable', value: productCount - availableCount, href: '/admin/products', color: 'bg-red-50 text-red-700' },
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-stone-800">Dashboard</h1>
        <p className="text-stone-500 mt-1">Welcome back! Here&apos;s your restaurant at a glance.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="bg-white rounded-2xl p-5 border border-stone-200 hover:shadow-md transition-shadow">
            <p className="text-sm text-stone-500 mb-1">{s.label}</p>
            <p className={`text-3xl font-bold ${s.color} inline-block px-3 py-1 rounded-xl`}>{s.value}</p>
          </Link>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-stone-200">
          <h2 className="font-semibold text-stone-800 mb-4">Quick Actions</h2>
          <div className="space-y-2">
            <Link href="/admin/products/new" className="flex items-center gap-3 p-3 rounded-xl hover:bg-stone-50 text-stone-600 hover:text-stone-800 transition-colors">
              <span className="text-xl">➕</span> Add new product
            </Link>
            <Link href="/admin/categories/new" className="flex items-center gap-3 p-3 rounded-xl hover:bg-stone-50 text-stone-600 hover:text-stone-800 transition-colors">
              <span className="text-xl">📂</span> Add new category
            </Link>
            <Link href="/admin/qr" className="flex items-center gap-3 p-3 rounded-xl hover:bg-stone-50 text-stone-600 hover:text-stone-800 transition-colors">
              <span className="text-xl">📱</span> Download QR code
            </Link>
            <Link href="/menu" target="_blank" className="flex items-center gap-3 p-3 rounded-xl hover:bg-stone-50 text-stone-600 hover:text-stone-800 transition-colors">
              <span className="text-xl">👁️</span> Preview menu (opens new tab)
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-stone-200">
          <h2 className="font-semibold text-stone-800 mb-4">Restaurant Info</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-stone-500">Name</span>
              <span className="font-medium">{restaurant?.name ?? '—'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Menu URL</span>
              <a href={restaurant?.menuUrl} target="_blank" className="text-amber-600 hover:underline truncate max-w-[180px]">{restaurant?.menuUrl ?? '—'}</a>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Phone</span>
              <span className="font-medium">{restaurant?.phone ?? '—'}</span>
            </div>
          </div>
          <Link href="/admin/settings" className="mt-4 inline-block text-sm text-amber-600 hover:underline">Edit settings →</Link>
        </div>
      </div>
    </div>
  )
}
