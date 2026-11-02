import { ReactNode } from 'react'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

interface Props {
  children: ReactNode
}

// Nested layout — only applied inside /admin routes
const AdminLayout = async ({ children }: Props) => {
  const session = await getServerSession(authOptions)

  if (!session) redirect('/api/auth/signin')

  return (
    <div className="flex gap-6">
      {/* Sidebar */}
      <aside className="w-48 shrink-0">
        <ul className="menu bg-base-200 rounded-box p-2 gap-1">
          <li className="menu-title">Admin</li>
          <li><Link href="/admin">Overview</Link></li>
          <li><Link href="/admin/users">Users</Link></li>
          <li><Link href="/admin/products">Products</Link></li>
          <li><Link href="/admin/settings">Settings</Link></li>
        </ul>
      </aside>
      {/* Main content */}
      <main className="flex-1">{children}</main>
    </div>
  )
}

export default AdminLayout
