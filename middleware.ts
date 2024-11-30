import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

const publicPaths = ['/login', '/register', '/'];

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const path = req.nextUrl.pathname;

  console.log("token",token);

  if (publicPaths.includes(path) && token) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (path.startsWith('/dashboard') && !token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}