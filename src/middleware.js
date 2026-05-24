import { NextResponse } from 'next/server';
import { getSessionCookie } from 'better-auth/cookies';

export function middleware(request) {
  const session = getSessionCookie(request);
  const { pathname } = request.nextUrl;

  // Protected routes — must be logged in
  const protectedRoutes = [
    '/dashboard',
    '/create-listing',
    '/update-listing',
  ];

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // If trying to access protected route without session — redirect to sign-in
  if (isProtected && !session) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  // If already logged in and tries to visit sign-in or sign-up — redirect to dashboard
  if ((pathname === '/sign-in' || pathname === '/sign-up') && session) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|favicon.ico|api).*)'],
};