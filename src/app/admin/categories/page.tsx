import { getAllCategories } from '@/features/categories/queries'
import Link from 'next/link'

export default async function CategoriesPage() {
  const categories = await getAllCategories()

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-stone-800">Categories</h1>
          <p className="text-stone-500 text-sm mt-1">{categories.length} categories</p>
        </div>
        <Link href="/admin/categories/new" className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm">
          + Add Category
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-stone-50 border-b border-stone-200">
            <tr>
              <th className="text-left px-5 py-3 font-medium text-stone-600">Name</th>
              <th className="text-left px-5 py-3 font-medium text-stone-600">Slug</th>
              <th className="text-left px-5 py-3 font-medium text-stone-600">Products</th>
              <th className="text-left px-5 py-3 font-medium text-stone-600">Visible</th>
              <th className="text-right px-5 py-3 font-medium text-stone-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {categories.map((c) => (
              <tr key={c.id} className="hover:bg-stone-50">
                <td className="px-5 py-3 font-medium text-stone-800">{c.name}</td>
                <td className="px-5 py-3 text-stone-400 font-mono text-xs">{c.slug}</td>
                <td className="px-5 py-3 text-stone-500">{c._count.products}</td>
                <td className="px-5 py-3">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${c.isVisible ? 'bg-green-100 text-green-700' : 'bg-stone-100 text-stone-500'}`}>
                    {c.isVisible ? 'Visible' : 'Hidden'}
                  </span>
                </td>
                <td className="px-5 py-3 text-right">
                  <Link href={`/admin/categories/${c.id}`} className="text-amber-600 hover:underline text-sm font-medium">Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
