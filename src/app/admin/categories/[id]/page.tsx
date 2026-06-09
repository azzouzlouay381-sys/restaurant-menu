import { getCategoryById } from '@/features/categories/queries'
import CategoryForm from '@/components/admin/CategoryForm'
import { notFound } from 'next/navigation'

export default async function EditCategoryPage({ params }: { params: { id: string } }) {
  const category = await getCategoryById(params.id)
  if (!category) notFound()

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-stone-800">Edit Category</h1>
        <p className="text-stone-500 text-sm mt-1">{category.name}</p>
      </div>
      <div className="bg-white rounded-2xl border border-stone-200 p-6">
        <CategoryForm category={{ ...category, description: category.description ?? null, imageUrl: category.imageUrl ?? null }} />
      </div>
    </div>
  )
}
