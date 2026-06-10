import Link from 'next/link'
import { getRestaurantInfo } from '@/features/menu/queries'

export default async function HomePage() {
  const restaurant = await getRestaurantInfo()

  return (
    <main className="min-h-screen" style={{ background: '#faf8f5' }}>

      {/* Hero */}
      <section style={{ background: '#1c1917', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div className="max-w-2xl mx-auto px-6 py-32 text-center w-full">
          <p className="text-xs tracking-[0.3em] uppercase mb-8" style={{ color: '#b45309' }}>
            Welcome to
          </p>
          <h1 className="mb-6 leading-none" style={{ color: '#fafaf9', fontFamily: 'Georgia, serif', fontSize: 'clamp(3rem, 8vw, 5.5rem)', fontWeight: 400, letterSpacing: '-0.02em' }}>
            {restaurant?.name ?? 'La Maison'}
          </h1>
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-px w-16" style={{ background: '#44403c' }} />
            <div className="w-1 h-1 rounded-full" style={{ background: '#b45309' }} />
            <div className="h-px w-16" style={{ background: '#44403c' }} />
          </div>
          <p className="text-base leading-relaxed max-w-md mx-auto mb-12" style={{ color: '#a8a29e' }}>
            {restaurant?.description ?? 'Fine dining with a modern twist.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/menu"
              className="px-8 py-3.5 text-sm font-medium tracking-wide transition-colors"
              style={{ background: '#b45309', color: '#fafaf9', borderRadius: 2 }}
            >
              View the Menu
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3.5 text-sm font-medium tracking-wide transition-colors"
              style={{ border: '1px solid #44403c', color: '#a8a29e', borderRadius: 2 }}
            >
              Make a Reservation
            </Link>
          </div>
        </div>

        {/* Info bar */}
        <div className="border-t" style={{ borderColor: '#292524' }}>
          <div className="max-w-2xl mx-auto px-6 py-5 flex flex-wrap justify-center gap-8 text-xs tracking-wider" style={{ color: '#78716c' }}>
            {restaurant?.address && <span style={{ textTransform: 'uppercase' }}>{restaurant.address}</span>}
            {restaurant?.phone && <span style={{ textTransform: 'uppercase' }}>{restaurant.phone}</span>}
            <span style={{ textTransform: 'uppercase' }}>Mon – Sun · 12:00 – 23:00</span>
          </div>
        </div>
      </section>

      {/* Three pillars */}
      <section className="max-w-2xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-3 gap-12">
          {[
            { label: '01', title: 'Fresh Ingredients', desc: 'Locally sourced produce and the finest meats, chosen daily.' },
            { label: '02', title: 'Expert Chefs', desc: 'A team with decades of culinary experience behind every dish.' },
            { label: '03', title: 'Curated Wines', desc: 'A wine list chosen to pair perfectly with every plate.' },
          ].map((f) => (
            <div key={f.label}>
              <p className="text-xs tracking-widest uppercase mb-4" style={{ color: '#b45309', fontWeight: 500 }}>{f.label}</p>
              <h3 className="text-base mb-2" style={{ color: '#1c1917', fontWeight: 600 }}>{f.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#a8a29e' }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-2xl mx-auto px-6">
        <div className="h-px" style={{ background: '#e7e5e4' }} />
      </div>

      {/* CTA */}
      <section className="max-w-2xl mx-auto px-6 py-24 text-center">
        <p className="text-xs tracking-[0.25em] uppercase mb-6" style={{ color: '#b45309' }}>Explore</p>
        <h2 className="text-4xl mb-4" style={{ color: '#1c1917', fontFamily: 'Georgia, serif', fontWeight: 400 }}>
          Browse the full menu
        </h2>
        <p className="text-sm mb-10" style={{ color: '#a8a29e' }}>
          Starters, mains, desserts and drinks — all in one place.
        </p>
        <Link
          href="/menu"
          className="inline-block px-10 py-3.5 text-sm font-medium tracking-wide transition-colors"
          style={{ background: '#1c1917', color: '#fafaf9', borderRadius: 2 }}
        >
          See the Menu →
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t" style={{ borderColor: '#e7e5e4' }}>
        <div className="max-w-2xl mx-auto px-6 py-10 text-center">
          <p className="text-xs tracking-widest uppercase mb-2" style={{ color: '#b45309' }}>
            {restaurant?.name ?? 'La Maison'}
          </p>
          <p className="text-xs" style={{ color: '#d6d3d1' }}>
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </footer>

    </main>
  )
}
