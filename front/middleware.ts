import { NextRequest, NextResponse } from 'next/server'

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('algowithme_refreshToken')

  console.log(token)

  if (pathname === '/') {
    if (token) {
      const url = request.nextUrl.clone()
      url.pathname = '/main'
      return NextResponse.redirect(url)
    }
  }

  if (pathname.startsWith('/main')) {
    if (!token) {
      const url = request.nextUrl.clone()
      url.pathname = '/'
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}
