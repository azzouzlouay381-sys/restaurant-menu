import { getRestaurantInfo } from '@/features/menu/queries'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Contact' }

export default async function ContactPage() {
  const restaurant = await getRestaurantInfo()
  return (
    <div className="min-h-screen bg-stone-50">
      <header className="bg-stone-900 text-white text-center py-16 px-6">
        <h1 className="text-4xl font-bold">Contact Us</h1>
      </header>
      <main className="max-w-2xl mx-auto px-6 py-16 space-y-6">
        {restaurant?.address && (
          <div className="bg-white p-6 rounded-2xl border border-stone-200">
            <h2 className="font-semibold text-stone-800 mb-2">📍 Address</h2>
            <p className="text-stone-600">{restaurant.address}</p>
          </div>
        )}
        {restaurant?.phone && (
          <div className="bg-white p-6 rounded-2xl border border-stone-200">
            <h2 className="font-semibold text-stone-800 mb-2">📞 Phone</h2>
            <a href={`tel:${restaurant.phone}`} className="text-amber-600 hover:underline">{restaurant.phone}</a>
          </div>
        )}
        {restaurant?.email && (
          <div className="bg-white p-6 rounded-2xl border border-stone-200">
            <h2 className="font-semibold text-stone-800 mb-2">✉️ Email</h2>
            <a href={`mailto:${restaurant.email}`} className="text-amber-600 hover:underline">{restaurant.email}</a>
          </div>
        )}
        <div className="bg-white p-6 rounded-2xl border border-stone-200">
          <h2 className="font-semibold text-stone-800 mb-2">🕐 Opening Hours</h2>
          <p className="text-stone-600">Monday – Sunday: 12:00 – 23:00</p>
        </div>
      </main>
    </div>
  )
}
