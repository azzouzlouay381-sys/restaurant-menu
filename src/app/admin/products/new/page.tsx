import { getAllCategories } from '@/features/categories/queries'
import ProductForm from '@/components/admin/ProductForm'

export default async function NewProductPage() {
  const categories = await getAllCategories()
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-stone-800">Add Product</h1>
        <p className="text-stone-500 text-sm mt-1">Add a new item to your menu</p>
      </div>
      <div className="bg-white rounded-2xl border border-stone-200 p-6">
        <ProductForm categories={categories.map(c => ({ id: c.id, name: c.name }))} />
      </div>
    </div>
  )
}
