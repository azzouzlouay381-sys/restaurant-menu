import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'

const NAV = [
  { href: '/admin', label: '🏠 Dashboard' },
  { href: '/admin/products', label: '🍽️ Products' },
  { href: '/admin/categories', label: '📂 Categories' },
  { href: '/admin/qr', label: '📱 QR Code' },
  { href: '/admin/settings', label: '⚙️ Settings' },
]

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session) redirect('/login')

  return (
    <div className="min-h-screen bg-stone-100 flex">
      {/* Sidebar */}
      <aside className="w-56 bg-stone-900 text-white flex flex-col flex-shrink-0">
        <div className="px-6 py-6 border-b border-stone-700">
          <p className="text-xs text-stone-400 uppercase tracking-widest mb-1">Admin Panel</p>
          <p className="font-bold text-lg">La Maison</p>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-stone-300 hover:bg-stone-800 hover:text-white transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="px-3 py-4 border-t border-stone-700">
          <p className="text-xs text-stone-500 px-3 mb-2">{session.user.email}</p>
          <form action="/logout" method="POST">
            <button className="w-full text-left px-3 py-2 text-sm text-stone-400 hover:text-white rounded-xl hover:bg-stone-800 transition-colors">
              🚪 Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
