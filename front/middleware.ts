import { NextRequest, NextResponse } from 'next/server'

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('algowithme_refreshToken')

  // const permitPaths = ['/main', '/study', '/editor']

  // if (process.env.NODE_ENV === 'development') return NextResponse.next()

  if (pathname === '/') {
    if (token) {
      const url = request.nextUrl.clone()
      url.pathname = '/main'
      return NextResponse.redirect(url)
    }
  }

  if (
    pathname.startsWith('/main') ||
    pathname.startsWith('/study') ||
    (pathname.startsWith('/editor') && !token)
  ) {
    const url = request.nextUrl.clone()
    url.pathname = '/'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}
