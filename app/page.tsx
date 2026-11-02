import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import Link from 'next/link'

export default async function Home() {
  const session = await getServerSession(authOptions)

  return (
    <div className="hero min-h-[60vh]">
      <div className="hero-content text-center">
        <div className="max-w-lg">
          <h1 className="text-5xl font-bold text-primary mb-4">
            Adeel&apos;s Next.js App
          </h1>
          <p className="py-4 text-gray-600 dark:text-gray-400">
            A full-stack Next.js 13 application featuring the App Router, Prisma,
            NextAuth, Cloudinary uploads, and React Email — built as a hands-on
            course project.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mt-4">
            <Link href="/users" className="btn btn-primary">
              View Users
            </Link>
            <Link href="/products" className="btn btn-outline btn-primary">
              Browse Products
            </Link>
            {session ? (
              <>
                <Link href="/dashboard" className="btn btn-secondary">
                  Dashboard
                </Link>
                <Link href="/admin" className="btn btn-accent">
                  Admin Panel
                </Link>
                <Link href="/upload" className="btn btn-ghost">
                  Upload
                </Link>
              </>
            ) : (
              <Link href="/api/auth/signin" className="btn btn-secondary">
                Sign In
              </Link>
            )}
          </div>

          {session && (
            <div className="mt-8 badge badge-success gap-2 p-4">
              ✓ Signed in as {session.user?.name}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
