import { getRestaurantInfo } from '@/features/menu/queries'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Contact' }

export default async function ContactPage() {
  const restaurant = await getRestaurantInfo()

  return (
    <div className="min-h-screen" style={{ background: '#faf8f5' }}>

      <header style={{ background: '#1c1917' }}>
        <div className="max-w-2xl mx-auto px-6 py-20 text-center">
          <p className="text-xs tracking-[0.25em] uppercase mb-6" style={{ color: '#b45309' }}>Get in touch</p>
          <h1 className="text-5xl" style={{ color: '#fafaf9', fontFamily: 'Georgia, serif', fontWeight: 400, letterSpacing: '-0.01em' }}>
            Contact Us
          </h1>
          <div className="mt-8 flex items-center justify-center gap-3">
            <div className="h-px w-16" style={{ background: '#44403c' }} />
            <div className="w-1 h-1 rounded-full" style={{ background: '#b45309' }} />
            <div className="h-px w-16" style={{ background: '#44403c' }} />
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-20">
        <div className="divide-y" style={{ borderColor: '#e7e5e4' }}>

          {restaurant?.address && (
            <div className="py-8 flex items-start gap-6">
              <p className="text-xs tracking-widest uppercase w-24 flex-shrink-0 pt-1" style={{ color: '#b45309', fontWeight: 500 }}>Address</p>
              <p className="text-base" style={{ color: '#1c1917' }}>{restaurant.address}</p>
            </div>
          )}

          {restaurant?.phone && (
            <div className="py-8 flex items-start gap-6">
              <p className="text-xs tracking-widest uppercase w-24 flex-shrink-0 pt-1" style={{ color: '#b45309', fontWeight: 500 }}>Phone</p>
              <a href={`tel:${restaurant.phone}`} className="text-base transition-colors hover:opacity-70" style={{ color: '#1c1917', textDecoration: 'none' }}>
                {restaurant.phone}
              </a>
            </div>
          )}

          {restaurant?.email && (
            <div className="py-8 flex items-start gap-6">
              <p className="text-xs tracking-widest uppercase w-24 flex-shrink-0 pt-1" style={{ color: '#b45309', fontWeight: 500 }}>Email</p>
              <a href={`mailto:${restaurant.email}`} className="text-base transition-colors hover:opacity-70" style={{ color: '#1c1917', textDecoration: 'none' }}>
                {restaurant.email}
              </a>
            </div>
          )}

          <div className="py-8 flex items-start gap-6">
            <p className="text-xs tracking-widest uppercase w-24 flex-shrink-0 pt-1" style={{ color: '#b45309', fontWeight: 500 }}>Hours</p>
            <p className="text-base" style={{ color: '#1c1917' }}>Monday – Sunday · 12:00 – 23:00</p>
          </div>

        </div>
      </main>

      <footer className="border-t" style={{ borderColor: '#e7e5e4' }}>
        <div className="max-w-2xl mx-auto px-6 py-10 text-center">
          <p className="text-xs tracking-widest uppercase" style={{ color: '#b45309' }}>
            {restaurant?.name ?? 'La Maison'}
          </p>
        </div>
      </footer>

    </div>
  )
}
