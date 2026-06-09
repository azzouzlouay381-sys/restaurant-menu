import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'

export default auth((req) => {
  const isAdminRoute = req.nextUrl.pathname.startsWith('/admin')
  const isApiWriteRoute =
    req.nextUrl.pathname.startsWith('/api/products') ||
    req.nextUrl.pathname.startsWith('/api/categories') ||
    req.nextUrl.pathname.startsWith('/api/upload') ||
    req.nextUrl.pathname.startsWith('/api/settings')

  if ((isAdminRoute || isApiWriteRoute) && !req.auth) {
    const loginUrl = new URL('/login', req.url)
    loginUrl.searchParams.set('callbackUrl', req.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/admin/:path*', '/api/products/:path*', '/api/categories/:path*', '/api/upload', '/api/settings'],
}
