'use client'

import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'
import Image from 'next/image'

const NavBar = () => {
  const { data: session, status } = useSession()

  return (
    <nav className="navbar bg-base-100 border-b border-base-300 px-4 sticky top-0 z-50">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost text-xl font-bold text-primary">
          Adeel&apos;s Next App
        </Link>
        <div className="hidden sm:flex gap-1 ml-4">
          <Link href="/users" className="btn btn-ghost btn-sm">Users</Link>
          <Link href="/products" className="btn btn-ghost btn-sm">Products</Link>
          {session && (
            <>
              <Link href="/dashboard" className="btn btn-ghost btn-sm">Dashboard</Link>
              <Link href="/admin" className="btn btn-ghost btn-sm">Admin</Link>
              <Link href="/upload" className="btn btn-ghost btn-sm">Upload</Link>
            </>
          )}
        </div>
      </div>

      <div className="flex-none gap-2">
        {status === 'loading' && (
          <span className="loading loading-spinner loading-sm"></span>
        )}

        {status === 'authenticated' && session?.user && (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-9 rounded-full">
                {session.user.image ? (
                  <Image
                    src={session.user.image}
                    alt={session.user.name ?? 'User'}
                    width={36}
                    height={36}
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-content font-bold">
                    {session.user.name?.[0]?.toUpperCase() ?? 'U'}
                  </div>
                )}
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li className="menu-title">
                <span>{session.user.name}</span>
                <span className="text-xs opacity-60">{session.user.email}</span>
              </li>
              <li><Link href="/dashboard">Dashboard</Link></li>
              <li><Link href="/upload">Upload</Link></li>
              <li>
                <button onClick={() => signOut()}>Sign Out</button>
              </li>
            </ul>
          </div>
        )}

        {status === 'unauthenticated' && (
          <button
            className="btn btn-primary btn-sm"
            onClick={() => signIn('google')}
          >
            Sign In
          </button>
        )}
      </div>
    </nav>
  )
}

export default NavBar
