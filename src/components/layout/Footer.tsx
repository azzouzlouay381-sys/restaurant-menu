import { UtensilsCrossed } from 'lucide-react'

interface FooterProps {
  restaurantName?: string
  address?: string | null
  phone?: string | null
}

export function Footer({ restaurantName = 'La Maison', address, phone }: FooterProps) {
  return (
    <footer className="border-t border-brand-100 bg-brand-900 py-10 text-brand-100">
      <div className="mx-auto max-w-5xl px-4 flex flex-col md:flex-row justify-between gap-6">
        <div className="flex items-center gap-2">
          <UtensilsCrossed className="h-5 w-5 text-brand-400" />
          <span className="font-semibold text-white">{restaurantName}</span>
        </div>
        <div className="text-sm space-y-1 text-brand-300">
          {address && <p>{address}</p>}
          {phone && <p>{phone}</p>}
        </div>
        <p className="text-xs text-brand-500 self-end">© {new Date().getFullYear()} {restaurantName}</p>
      </div>
    </footer>
  )
}
