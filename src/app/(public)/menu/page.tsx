import { getMenuData, getRestaurantInfo } from '@/features/menu/queries'
import { formatPrice } from '@/lib/utils'
import type { Metadata } from 'next'
import Image from 'next/image'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const restaurant = await getRestaurantInfo()
  return {
    title: `Menu | ${restaurant?.name ?? 'Restaurant'}`,
    description: 'Browse our full menu of fresh, handcrafted dishes.',
  }
}

const ALLERGEN_EMOJI: Record<string, string> = {
  gluten: '🌾', dairy: '🥛', eggs: '🥚', fish: '🐟',
  shellfish: '🦐', nuts: '🥜', peanuts: '🥜', soy: '🌱',
}

export default async function MenuPage() {
  const [categories, restaurant] = await Promise.all([getMenuData(), getRestaurantInfo()])

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="bg-stone-900 text-white text-center py-16 px-6">
        <p className="text-amber-400 text-xs tracking-widest uppercase mb-3">Our Menu</p>
        <h1 className="text-4xl font-bold mb-3">{restaurant?.name ?? 'La Maison'}</h1>
        {restaurant?.description && (
          <p className="text-stone-400 max-w-xl mx-auto">{restaurant.description}</p>
        )}
      </header>

      {/* Category nav */}
      <nav className="sticky top-0 z-10 bg-white border-b border-stone-200 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 flex gap-1 overflow-x-auto py-3">
          {categories.map((cat) => (
            <a
              key={cat.id}
              href={`#${cat.slug}`}
              className="whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium text-stone-600 hover:bg-amber-50 hover:text-amber-700 transition-colors"
            >
              {cat.name}
            </a>
          ))}
        </div>
      </nav>

      {/* Menu sections */}
      <main className="max-w-3xl mx-auto px-4 py-12 space-y-16">
        {categories.map((category) => (
          <section key={category.id} id={category.slug}>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-stone-800">{category.name}</h2>
              {category.description && (
                <p className="text-stone-500 mt-1">{category.description}</p>
              )}
              <div className="mt-3 h-px bg-amber-200" />
            </div>

            <div className="space-y-4">
              {category.products.map((product) => (
                <article
                  key={product.id}
                  className="bg-white rounded-2xl p-5 flex gap-4 shadow-sm border border-stone-100 hover:border-amber-200 transition-colors"
                >
                  {product.imageUrl && (
                    <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                      <Image src={product.imageUrl} alt={product.name} fill className="object-cover" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-semibold text-stone-800 text-base">
                          {product.name}
                          {product.isHighlighted && (
                            <span className="ml-2 text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">
                              Chef&apos;s Special
                            </span>
                          )}
                        </h3>
                        {product.description && (
                          <p className="text-stone-500 text-sm mt-1 line-clamp-2">{product.description}</p>
                        )}
                      </div>
                      <span className="font-bold text-amber-700 whitespace-nowrap text-base">
                        {formatPrice(product.price)}
                      </span>
                    </div>
                    {product.allergens.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {product.allergens.map((a) => (
                          <span key={a} className="text-xs text-stone-400 bg-stone-100 px-2 py-0.5 rounded-full">
                            {ALLERGEN_EMOJI[a] ?? ''} {a}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </main>

      <footer className="text-center py-8 text-stone-400 text-sm border-t border-stone-200">
        {restaurant?.address && <p>{restaurant.address}</p>}
        {restaurant?.phone && <p className="mt-1">{restaurant.phone}</p>}
      </footer>
    </div>
  )
}
