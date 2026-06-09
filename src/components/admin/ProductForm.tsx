'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { slugify } from '@/lib/utils'

interface Category { id: string; name: string }
interface Product {
  id?: string; name: string; description: string | null; price: number;
  categoryId: string; isAvailable: boolean; isHighlighted: boolean;
  allergens: string[]; imageUrl: string | null; position: number;
}

const ALLERGEN_OPTIONS = ['gluten', 'dairy', 'eggs', 'fish', 'shellfish', 'nuts', 'peanuts', 'soy']

export default function ProductForm({ product, categories }: { product?: Product; categories: Category[] }) {
  const router = useRouter()
  const isEdit = !!product?.id

  const [form, setForm] = useState({
    name: product?.name ?? '',
    description: product?.description ?? '',
    price: product ? (product.price / 100).toFixed(2) : '',
    categoryId: product?.categoryId ?? (categories[0]?.id ?? ''),
    isAvailable: product?.isAvailable ?? true,
    isHighlighted: product?.isHighlighted ?? false,
    allergens: product?.allergens ?? [],
    imageUrl: product?.imageUrl ?? '',
    position: product?.position ?? 0,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function toggleAllergen(a: string) {
    setForm(f => ({
      ...f,
      allergens: f.allergens.includes(a) ? f.allergens.filter(x => x !== a) : [...f.allergens, a],
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const priceInCents = Math.round(parseFloat(form.price) * 100)

    const body = {
      name: form.name,
      description: form.description || undefined,
      price: priceInCents,
      categoryId: form.categoryId,
      isAvailable: form.isAvailable,
      isHighlighted: form.isHighlighted,
      allergens: form.allergens,
      imageUrl: form.imageUrl || null,
      position: form.position,
    }

    const url = isEdit ? `/api/products/${product.id}` : '/api/products'
    const method = isEdit ? 'PUT' : 'POST'

    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })

    if (!res.ok) {
      const data = await res.json()
      setError(data.error ?? 'Something went wrong')
      setLoading(false)
      return
    }

    router.push('/admin/products')
    router.refresh()
  }

  async function handleDelete() {
    if (!product?.id || !confirm('Delete this product?')) return
    await fetch(`/api/products/${product.id}`, { method: 'DELETE' })
    router.push('/admin/products')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Name *</label>
          <input
            value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            className="w-full border border-stone-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
            placeholder="e.g. Lamb Tagine" required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Price (TND) *</label>
          <input
            type="number" step="0.01" min="0"
            value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
            className="w-full border border-stone-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
            placeholder="12.99" required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">Description</label>
        <textarea
          rows={3} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
          className="w-full border border-stone-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none"
          placeholder="Describe the dish..."
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Category *</label>
          <select
            value={form.categoryId} onChange={e => setForm(f => ({ ...f, categoryId: e.target.value }))}
            className="w-full border border-stone-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
          >
            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Position</label>
          <input
            type="number" min="0"
            value={form.position} onChange={e => setForm(f => ({ ...f, position: parseInt(e.target.value) || 0 }))}
            className="w-full border border-stone-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">Image URL</label>
        <input
          type="url" value={form.imageUrl} onChange={e => setForm(f => ({ ...f, imageUrl: e.target.value }))}
          className="w-full border border-stone-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
          placeholder="https://..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-stone-700 mb-2">Allergens</label>
        <div className="flex flex-wrap gap-2">
          {ALLERGEN_OPTIONS.map(a => (
            <button
              key={a} type="button" onClick={() => toggleAllergen(a)}
              className={`px-3 py-1 rounded-full text-sm border transition-colors ${form.allergens.includes(a) ? 'bg-amber-500 text-white border-amber-500' : 'border-stone-300 text-stone-600 hover:border-amber-400'}`}
            >
              {a}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={form.isAvailable} onChange={e => setForm(f => ({ ...f, isAvailable: e.target.checked }))} className="rounded" />
          <span className="text-sm text-stone-700">Available</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={form.isHighlighted} onChange={e => setForm(f => ({ ...f, isHighlighted: e.target.checked }))} className="rounded" />
          <span className="text-sm text-stone-700">Chef&apos;s Special</span>
        </label>
      </div>

      {error && <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-3">{error}</p>}

      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={loading} className="bg-amber-500 hover:bg-amber-600 disabled:opacity-60 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors">
          {loading ? 'Saving…' : isEdit ? 'Save Changes' : 'Create Product'}
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
