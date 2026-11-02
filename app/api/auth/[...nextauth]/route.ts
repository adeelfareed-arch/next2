import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from '@/lib/prisma'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    // Attach user id to the JWT token
    async jwt({ token, user }) {
      if (user) token.id = user.id
      return token
    },
    // Expose user id on the session
    async session({ session, token }) {
      if (session.user) {
        ;(session.user as { id?: string }).id = token.id as string
      }
      return session
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
