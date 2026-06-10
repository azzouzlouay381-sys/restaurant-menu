import { getMenuData, getRestaurantInfo } from '@/features/menu/queries'
import { formatPrice } from '@/lib/utils'
import type { Metadata } from 'next'
import Image from 'next/image'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const restaurant = await getRestaurantInfo();
  return {
    title: `Menu | ${restaurant?.name ?? 'Restaurant'}`,
    description: 'Browse our full menu of fresh, handcrafted dishes.',
  }
}

const ALLERGEN_LABEL: Record<string, string> = {
  gluten: 'Gluten', dairy: 'Dairy', eggs: 'Eggs', fish: 'Fish',
  shellfish: 'Shellfish', nuts: 'Nuts', peanuts: 'Peanuts', soy: 'Soy',
}

export default async function MenuPage() {
  const [categories, restaurant] = await Promise.all([getMenuData(), getRestaurantInfo()]);

  return (
    <div className="min-h-screen" style={{ background: '#faf8f5' }}>

      <header style={{ background: '#1c1917' }}>
        <div className="max-w-2xl mx-auto px-6 py-20 text-center">
          <p className="text-xs tracking-[0.25em] uppercase mb-6" style={{ color: '#b45309' }}>
            {restaurant?.name ?? 'La Maison'}
          </p>
          <h1 className="text-5xl mb-6 leading-tight" style={{ color: '#fafaf9', fontWeight: 400, fontFamily: 'Georgia, serif', letterSpacing: '-0.01em' }}>
            Our Menu
          </h1>
          {restaurant?.description && (
            <p className="text-base leading-relaxed max-w-md mx-auto" style={{ color: '#a8a29e' }}>
              {restaurant.description}
            </p>
          )}
          <div className="mt-10 flex items-center justify-center gap-3">
            <div className="h-px w-16" style={{ background: '#44403c' }} />
            <div className="w-1 h-1 rounded-full" style={{ background: '#b45309' }} />
            <div className="h-px w-16" style={{ background: '#44403c' }} />
          </div>
        </div>
      </header>

      <nav className="sticky top-0 z-20 border-b" style={{ background: '#faf8f5', borderColor: '#e7e5e4' }}>
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
            {categories.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.slug}`}
                className="whitespace-nowrap px-4 py-4 text-sm flex-shrink-0 transition-colors hover:text-stone-900"
                style={{ color: '#78716c', fontWeight: 500, textDecoration: 'none' }}
              >
                {cat.name}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-4 py-14">
        <div className="space-y-20">
          {categories.map((category, ci) => (
            <section key={category.id} id={category.slug}>
              <div className="mb-10">
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-xs tracking-widest uppercase" style={{ color: '#b45309', fontWeight: 500 }}>
                    0{ci + 1}
                  </span>
                  <div className="h-px flex-1" style={{ background: '#e7e5e4' }} />
                </div>
                <h2 className="text-3xl" style={{ color: '#1c1917', fontWeight: 400, fontFamily: 'Georgia, serif' }}>
                  {category.name}
                </h2>
                {category.description && (
                  <p className="mt-2 text-sm" style={{ color: '#a8a29e' }}>{category.description}</p>
                )}
              </div>

              <div className="divide-y" style={{ borderColor: '#f0ede9' }}>
                {category.products.map((product) => (
                  <article key={product.id} className="py-6 flex gap-5 group">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-base" style={{ color: '#1c1917', fontWeight: 600 }}>
                              {product.name}
                            </h3>
                            {product.isHighlighted && (
                              <span className="text-xs px-2 py-0.5 rounded-sm" style={{ background: '#fef3c7', color: '#92400e', fontWeight: 500 }}>
                                Chef&apos;s choice
                              </span>
                            )}
                          </div>
                          {product.description && (
                            <p className="mt-1.5 text-sm leading-relaxed line-clamp-2" style={{ color: '#78716c' }}>
                              {product.description}
                            </p>
                          )}
                          {product.allergens.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mt-3">
                              {product.allergens.map((a) => (
                                <span key={a} className="text-xs px-2 py-0.5 rounded-sm" style={{ background: '#f5f5f4', color: '#a8a29e', border: '1px solid #e7e5e4' }}>
                                  {ALLERGEN_LABEL[a] ?? a}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        <span className="flex-shrink-0 text-base" style={{ color: '#1c1917', fontWeight: 600 }}>
                          {formatPrice(product.price)}
                        </span>
                      </div>
                    </div>

                    {product.imageUrl && (
                      <div className="relative flex-shrink-0 overflow-hidden rounded-lg" style={{ width: 88, height: 88 }}>
                        <Image src={product.imageUrl} alt={product.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                      </div>
                    )}
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>

      <footer className="border-t mt-8" style={{ borderColor: '#e7e5e4' }}>
        <div className="max-w-2xl mx-auto px-6 py-12 text-center">
          <p className="text-xs tracking-widest uppercase mb-4" style={{ color: '#b45309' }}>
            {restaurant?.name ?? 'La Maison'}
          </p>
          {restaurant?.address && <p className="text-sm" style={{ color: '#a8a29e' }}>{restaurant.address}</p>}
          {restaurant?.phone && <p className="text-sm mt-1" style={{ color: '#a8a29e' }}>{restaurant.phone}</p>}
        </div>
      </footer>

    </div>
  );
}
