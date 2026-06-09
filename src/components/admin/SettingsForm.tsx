'use client'
import { useState } from 'react'

interface Restaurant {
  id: string; name: string; description: string | null;
  address: string | null; phone: string | null;
  email: string | null; menuUrl: string;
}

export default function SettingsForm({ restaurant }: { restaurant: Restaurant | null }) {
  const [form, setForm] = useState({
    name: restaurant?.name ?? '',
    description: restaurant?.description ?? '',
    address: restaurant?.address ?? '',
    phone: restaurant?.phone ?? '',
    email: restaurant?.email ?? '',
    menuUrl: restaurant?.menuUrl ?? 'https://yourdomain.com/menu',
  })
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')
    setSuccess(false)

    const res = await fetch('/api/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    if (!res.ok) {
      const data = await res.json()
      setError(data.error ?? 'Failed to save')
    } else {
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    }
    setSaving(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {[
        { key: 'name', label: 'Restaurant Name', placeholder: 'La Maison', required: true },
        { key: 'address', label: 'Address', placeholder: '12 Rue de la Paix, Tunis' },
        { key: 'phone', label: 'Phone', placeholder: '+216 71 000 000' },
        { key: 'email', label: 'Email', placeholder: 'contact@restaurant.com' },
        { key: 'menuUrl', label: 'Menu URL (encoded in QR)', placeholder: 'https://yourdomain.com/menu', required: true },
      ].map(field => (
        <div key={field.key}>
          <label className="block text-sm font-medium text-stone-700 mb-1">{field.label}{field.required ? ' *' : ''}</label>
          <input
            value={(form as any)[field.key]}
            onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
            className="w-full border border-stone-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
            placeholder={field.placeholder}
            required={field.required}
          />
        </div>
      ))}

      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">Description</label>
        <textarea
          rows={3} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
          className="w-full border border-stone-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none"
        />
      </div>

      {error && <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-3">{error}</p>}
      {success && <p className="text-green-700 text-sm bg-green-50 border border-green-200 rounded-xl px-4 py-3">✅ Settings saved!</p>}

      <button type="submit" disabled={saving} className="bg-amber-500 hover:bg-amber-600 disabled:opacity-60 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors">
        {saving ? 'Saving…' : 'Save Settings'}
      </button>
    </form>
  )
}
