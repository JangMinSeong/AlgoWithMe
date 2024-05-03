import { NextRequest, NextResponse } from 'next/server'

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('algowithme_refreshToken')

  const permitPaths = ['/main', '/study', '/editor']

  if (process.env.NODE_ENV === 'development') return NextResponse.next()

  if (pathname === '/') {
    if (token) {
      const url = request.nextUrl.clone()
      url.pathname = '/main'
      return NextResponse.redirect(url)
    }
  }

  const isRedirected = permitPaths.some((path) => {
    if (pathname.startsWith(path)) {
      if (!token) {
        const url = request.nextUrl.clone()
        url.pathname = '/'
        NextResponse.redirect(url)
        return true
      }
    }
    return false
  })

  if (isRedirected) {
    return NextResponse.redirect('/')
  }

  return NextResponse.next()
}
