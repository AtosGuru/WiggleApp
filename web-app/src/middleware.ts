export { default } from 'next-auth/middleware'

export const config = { 
  matcher: [
    '/',
    '/events',
    '/analytics',
    '/loyalty',
    '/notifications',
    '/messages',
    '/messages/:path*',
    '/profile',
  ]
}