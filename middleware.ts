import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value
    const {pathname} = request.nextUrl

    if (pathname === '/Login') {
    return NextResponse.next()
  }

    if (!token) {
        const loginUrl = new URL('/Login', request.url)
        return NextResponse.redirect(loginUrl)
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)']
}