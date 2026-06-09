import CategoryForm from '@/components/admin/CategoryForm'

export default function NewCategoryPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-stone-800">Add Category</h1>
      </div>
      <div className="bg-white rounded-2xl border border-stone-200 p-6">
        <CategoryForm />
      </div>
    </div>
  )
}
