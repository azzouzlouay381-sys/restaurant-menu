'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { slugify } from '@/lib/utils'

interface Category {
  id?: string; name: string; description: string | null;
  slug: string; imageUrl: string | null; position: number; isVisible: boolean;
}

export default function CategoryForm({ category }: { category?: Category }) {
  const router = useRouter()
  const isEdit = !!category?.id

  const [form, setForm] = useState({
    name: category?.name ?? '',
    description: category?.description ?? '',
    slug: category?.slug ?? '',
    imageUrl: category?.imageUrl ?? '',
    position: category?.position ?? 0,
    isVisible: category?.isVisible ?? true,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function handleNameChange(name: string) {
    setForm(f => ({ ...f, name, slug: isEdit ? f.slug : slugify(name) }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const body = { ...form, description: form.description || undefined, imageUrl: form.imageUrl || null }
    const url = isEdit ? `/api/categories/${category.id}` : '/api/categories'
    const method = isEdit ? 'PUT' : 'POST'

    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
    if (!res.ok) {
      const data = await res.json()
      setError(data.error ?? 'Something went wrong')
      setLoading(false)
      return
    }
    router.push('/admin/categories')
    router.refresh()
  }

  async function handleDelete() {
    if (!category?.id || !confirm('Delete this category? All its products will also be deleted.')) return
    await fetch(`/api/categories/${category.id}`, { method: 'DELETE' })
    router.push('/admin/categories')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-xl">
      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">Name *</label>
        <input
          value={form.name} onChange={e => handleNameChange(e.target.value)}
          className="w-full border border-stone-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
          placeholder="e.g. Starters" required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">Slug *</label>
        <input
          value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))}
          className="w-full border border-stone-300 rounded-xl px-4 py-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-amber-400"
          placeholder="starters" required
        />
        <p className="text-xs text-stone-400 mt-1">Lowercase letters, numbers, and hyphens only</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">Description</label>
        <textarea
          rows={2} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
          className="w-full border border-stone-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Position</label>
          <input
            type="number" min="0" value={form.position} onChange={e => setForm(f => ({ ...f, position: parseInt(e.target.value) || 0 }))}
            className="w-full border border-stone-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>
        <div className="flex items-end pb-1">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.isVisible} onChange={e => setForm(f => ({ ...f, isVisible: e.target.checked }))} className="rounded" />
            <span className="text-sm text-stone-700">Visible on menu</span>
          </label>
        </div>
      </div>

      {error && <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-3">{error}</p>}

      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={loading} className="bg-amber-500 hover:bg-amber-600 disabled:opacity-60 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors">
          {loading ? 'Saving…' : isEdit ? 'Save Changes' : 'Create Category'}
        </button>
        {isEdit && (
          <button type="button" onClick={handleDelete} className="bg-red-50 hover:bg-red-100 text-red-600 font-semibold px-6 py-2.5 rounded-xl transition-colors border border-red-200">
            Delete
          </button>
        )}
      </div>
    </form>
  )
}
