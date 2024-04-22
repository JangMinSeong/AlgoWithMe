import { NextRequest, NextResponse } from 'next/server'

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (process.env.NODE_ENV === 'development') {
    // if (pathname.startsWith('/loading')) {
    //   return NextResponse.redirect(new URL('/main', request.url))
    // }
  }

  return NextResponse.next()
}
