import { getRestaurantInfo } from '@/features/menu/queries'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'About Us' }

export default async function AboutPage() {
  const restaurant = await getRestaurantInfo()

  return (
    <div className="min-h-screen" style={{ background: '#faf8f5' }}>

      <header style={{ background: '#1c1917' }}>
        <div className="max-w-2xl mx-auto px-6 py-20 text-center">
          <p className="text-xs tracking-[0.25em] uppercase mb-6" style={{ color: '#b45309' }}>Our story</p>
          <h1 className="text-5xl" style={{ color: '#fafaf9', fontFamily: 'Georgia, serif', fontWeight: 400, letterSpacing: '-0.01em' }}>
            About {restaurant?.name ?? 'Us'}
          </h1>
          <div className="mt-8 flex items-center justify-center gap-3">
            <div className="h-px w-16" style={{ background: '#44403c' }} />
            <div className="w-1 h-1 rounded-full" style={{ background: '#b45309' }} />
            <div className="h-px w-16" style={{ background: '#44403c' }} />
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-20">
        <p className="text-xl leading-relaxed mb-8" style={{ color: '#1c1917', fontFamily: 'Georgia, serif', fontWeight: 400 }}>
          {restaurant?.description ?? 'We are passionate about food.'}
        </p>
        <div className="h-px mb-8" style={{ background: '#e7e5e4' }} />
        <p className="text-base leading-relaxed mb-16" style={{ color: '#78716c' }}>
          Every dish on our menu is crafted with care, using the finest seasonal ingredients
          sourced from local producers. We believe that great food brings people together,
          and we strive to create memorable moments for every guest.
        </p>
        <Link
          href="/menu"
          className="inline-block px-8 py-3.5 text-sm font-medium tracking-wide transition-colors"
          style={{ background: '#1c1917', color: '#fafaf9', borderRadius: 2 }}
        >
          View the Menu →
        </Link>
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
