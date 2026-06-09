import Link from 'next/link'
import { UtensilsCrossed } from 'lucide-react'

interface NavbarProps {
  restaurantName?: string
}

export function Navbar({ restaurantName = 'La Maison' }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-brand-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold text-brand-900">
          <UtensilsCrossed className="h-5 w-5 text-brand-500" />
          <span>{restaurantName}</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm text-gray-600">
          <Link href="/menu" className="hover:text-brand-600 transition-colors font-medium">Menu</Link>
          <Link href="/about" className="hover:text-brand-600 transition-colors">About</Link>
          <Link href="/contact" className="hover:text-brand-600 transition-colors">Contact</Link>
        </nav>
      </div>
    </header>
  )
}
