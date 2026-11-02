import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard',
}

const DashboardPage = async () => {
  const session = await getServerSession(authOptions)

  if (!session) redirect('/api/auth/signin')

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="stat bg-base-200 rounded-box shadow">
          <div className="stat-title">Total Users</div>
          <div className="stat-value text-primary">1,024</div>
          <div className="stat-desc">↑ 12% this month</div>
        </div>
        <div className="stat bg-base-200 rounded-box shadow">
          <div className="stat-title">Products</div>
          <div className="stat-value text-secondary">240</div>
          <div className="stat-desc">↑ 3 new today</div>
        </div>
        <div className="stat bg-base-200 rounded-box shadow">
          <div className="stat-title">Revenue</div>
          <div className="stat-value text-accent">$12,400</div>
          <div className="stat-desc">↑ 8% vs last month</div>
        </div>
      </div>

      <div className="card bg-base-200 shadow">
        <div className="card-body">
          <h2 className="card-title">Welcome back, {session.user?.name}!</h2>
          <p className="text-sm text-gray-500">Signed in as {session.user?.email}</p>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
