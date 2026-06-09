import Link from 'next/link'
import { getRestaurantInfo } from '@/features/menu/queries'

export default async function HomePage() {
  const restaurant = await getRestaurantInfo()

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-stone-900 text-white">
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/60 to-stone-900/90" />
        <div className="relative max-w-4xl mx-auto px-6 py-32 text-center">
          <p className="text-amber-400 text-sm font-medium tracking-widest uppercase mb-4">Welcome to</p>
          <h1 className="text-6xl font-bold mb-6">{restaurant?.name ?? 'La Maison'}</h1>
          <p className="text-stone-300 text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            {restaurant?.description ?? 'Fine dining with a modern twist.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/menu"
              className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 py-4 rounded-full transition-colors text-lg"
            >
              View Our Menu
            </Link>
            <Link
              href="/contact"
              className="border border-white/30 hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-full transition-colors text-lg"
            >
              Make a Reservation
            </Link>
          </div>
        </div>
      </section>

      {/* Info strip */}
      <section className="bg-amber-500 text-white">
        <div className="max-w-4xl mx-auto px-6 py-4 flex flex-wrap justify-center gap-8 text-sm font-medium">
          {restaurant?.address && <span>📍 {restaurant.address}</span>}
          {restaurant?.phone && <span>📞 {restaurant.phone}</span>}
          <span>🕐 Mon–Sun 12:00–23:00</span>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-4xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-8 text-center">
        {[
          { icon: '🥘', title: 'Fresh Ingredients', desc: 'Locally sourced produce and the finest meats.' },
          { icon: '👨‍🍳', title: 'Expert Chefs', desc: 'Our team brings decades of culinary experience.' },
          { icon: '🍷', title: 'Curated Wine List', desc: 'Paired perfectly with every dish on our menu.' },
        ].map((f) => (
          <div key={f.title} className="p-6">
            <div className="text-4xl mb-4">{f.icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-stone-800">{f.title}</h3>
            <p className="text-stone-500">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="bg-stone-100 border-t border-stone-200">
        <div className="max-w-2xl mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl font-bold text-stone-800 mb-4">Browse Our Full Menu</h2>
          <p className="text-stone-500 mb-8">Starters, mains, desserts and drinks — all in one place.</p>
          <Link
            href="/menu"
            className="bg-stone-900 hover:bg-stone-700 text-white font-semibold px-8 py-4 rounded-full transition-colors inline-block"
          >
            See the Menu →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 text-center py-8 text-sm">
        <p>© {new Date().getFullYear()} {restaurant?.name ?? 'La Maison'}. All rights reserved.</p>
      </footer>
    </main>
  )
}
