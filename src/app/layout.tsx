import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: { default: 'La Maison Restaurant', template: '%s | La Maison' },
  description: 'Fine dining with a modern twist. Fresh ingredients, bold flavours.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'La Maison Restaurant',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-stone-50 antialiased">
        {children}
      </body>
    </html>
  )
}
