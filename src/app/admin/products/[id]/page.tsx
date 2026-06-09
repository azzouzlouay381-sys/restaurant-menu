import { getProductById } from '@/features/products/queries'
import { getAllCategories } from '@/features/categories/queries'
import ProductForm from '@/components/admin/ProductForm'
import { notFound } from 'next/navigation'

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const [product, categories] = await Promise.all([getProductById(params.id), getAllCategories()])
  if (!product) notFound()

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-stone-800">Edit Product</h1>
        <p className="text-stone-500 text-sm mt-1">{product.name}</p>
      </div>
      <div className="bg-white rounded-2xl border border-stone-200 p-6">
        <ProductForm
          product={{ ...product, description: product.description ?? null, imageUrl: product.imageUrl ?? null }}
          categories={categories.map(c => ({ id: c.id, name: c.name }))}
        />
      </div>
    </div>
  )
}
