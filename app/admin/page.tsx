import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin — Overview',
}

const AdminPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin Overview</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="card bg-base-200 shadow">
          <div className="card-body">
            <h2 className="card-title">Users</h2>
            <p className="text-4xl font-bold text-primary">1,024</p>
            <p className="text-sm text-gray-500">Total registered users</p>
          </div>
        </div>
        <div className="card bg-base-200 shadow">
          <div className="card-body">
            <h2 className="card-title">Products</h2>
            <p className="text-4xl font-bold text-secondary">240</p>
            <p className="text-sm text-gray-500">Active products</p>
          </div>
        </div>
        <div className="card bg-base-200 shadow">
          <div className="card-body">
            <h2 className="card-title">Orders</h2>
            <p className="text-4xl font-bold text-accent">512</p>
            <p className="text-sm text-gray-500">Orders this month</p>
          </div>
        </div>
        <div className="card bg-base-200 shadow">
          <div className="card-body">
            <h2 className="card-title">Revenue</h2>
            <p className="text-4xl font-bold text-success">$48,200</p>
            <p className="text-sm text-gray-500">Total revenue</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminPage
