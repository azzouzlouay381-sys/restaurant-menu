import Image from 'next/image'
import { formatPrice } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'
import type { MenuItem } from '@/types/menu'
import { Star } from 'lucide-react'

export function ProductCard({ item }: { item: MenuItem }) {
  return (
    <div className="flex gap-4 rounded-xl border border-gray-100 bg-white p-4 transition-shadow hover:shadow-md">
      {item.imageUrl && (
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg">
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill
            className="object-cover"
            sizes="96px"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col gap-1">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-gray-900">{item.name}</h3>
            {item.isHighlighted && (
              <span className="flex items-center gap-1 rounded-full bg-brand-100 px-2 py-0.5 text-xs font-medium text-brand-700">
                <Star className="h-3 w-3" /> Chef's choice
              </span>
            )}
          </div>
          <span className="shrink-0 font-semibold text-brand-600">{formatPrice(item.price)}</span>
        </div>
        {item.description && (
          <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
        )}
        {item.allergens.length > 0 && (
          <div className="mt-1 flex flex-wrap gap-1">
            {item.allergens.map((a) => (
              <Badge key={a} variant="warning" className="text-xs">{a}</Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
