import { getRestaurantInfo } from '@/features/menu/queries'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'About Us' }

export default async function AboutPage() {
  const restaurant = await getRestaurantInfo()
  return (
    <div className="min-h-screen bg-stone-50">
      <header className="bg-stone-900 text-white text-center py-16 px-6">
        <h1 className="text-4xl font-bold">About {restaurant?.name ?? 'Us'}</h1>
      </header>
      <main className="max-w-2xl mx-auto px-6 py-16">
        <p className="text-stone-600 text-lg leading-relaxed mb-8">
          {restaurant?.description ?? 'We are passionate about food.'}
        </p>
        <p className="text-stone-600 leading-relaxed">
          Every dish on our menu is crafted with care, using the finest seasonal ingredients
          sourced from local producers. We believe that great food brings people together,
          and we strive to create memorable moments for every guest.
        </p>
        <div className="mt-12">
          <Link href="/menu" className="bg-amber-500 text-white font-semibold px-6 py-3 rounded-full hover:bg-amber-600 transition-colors">
            View Our Menu
          </Link>
        </div>
      </main>
    </div>
  )
}
