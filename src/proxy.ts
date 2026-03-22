import { NextRequest, NextResponse } from 'next/server'
import { checkAdminAccess } from '@/lib/auth'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Proteger rotas admin (exceto a de login)
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const hasAccess = await checkAdminAccess(request)
    if (!hasAccess) {
      const loginUrl = new URL('/admin/login', request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  // Redirecionar /admin para /admin/dashboard
  if (pathname === '/admin') {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
