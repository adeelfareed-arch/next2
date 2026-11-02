export { default } from 'next-auth/middleware'

// Protect routes matching these patterns
// NextAuth middleware redirects unauthenticated users to sign-in
export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*', '/upload/:path*'],
}
