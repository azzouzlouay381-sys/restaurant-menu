import { getAllProducts } from '@/features/products/queries'
import { getAllCategories } from '@/features/categories/queries'
import { formatPrice } from '@/lib/utils'
import Link from 'next/link'

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([getAllProducts(), getAllCategories()])

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-stone-800">Products</h1>
          <p className="text-stone-500 text-sm mt-1">{products.length} items total</p>
        </div>
        <Link href="/admin/products/new" className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm">
          + Add Product
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-stone-50 border-b border-stone-200">
            <tr>
              <th className="text-left px-5 py-3 font-medium text-stone-600">Name</th>
              <th className="text-left px-5 py-3 font-medium text-stone-600">Category</th>
              <th className="text-left px-5 py-3 font-medium text-stone-600">Price</th>
              <th className="text-left px-5 py-3 font-medium text-stone-600">Status</th>
              <th className="text-right px-5 py-3 font-medium text-stone-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-stone-50 transition-colors">
                <td className="px-5 py-3 font-medium text-stone-800">
                  {p.name}
                  {p.isHighlighted && <span className="ml-2 text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">Special</span>}
                </td>
                <td className="px-5 py-3 text-stone-500">{p.category.name}</td>
                <td className="px-5 py-3 font-medium text-stone-700">{formatPrice(p.price)}</td>
                <td className="px-5 py-3">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${p.isAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                    {p.isAvailable ? 'Available' : 'Unavailable'}
                  </span>
                </td>
                <td className="px-5 py-3 text-right">
                  <Link href={`/admin/products/${p.id}`} className="text-amber-600 hover:underline text-sm font-medium">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {products.length === 0 && (
          <div className="text-center py-16 text-stone-400">
            <p className="text-4xl mb-3">🍽️</p>
            <p>No products yet. <Link href="/admin/products/new" className="text-amber-600 hover:underline">Add your first one.</Link></p>
          </div>
        )}
      </div>
    </div>
  )
}
