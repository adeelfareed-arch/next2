import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'

interface User {
  id: number
  name: string
  email: string
  phone: string
  website: string
  company: { name: string }
  address: { city: string; street: string }
}

interface Props {
  params: { id: string }
}

async function getUser(id: string): Promise<User> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
  if (!res.ok) notFound()
  return res.json()
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const user = await getUser(params.id)
  return {
    title: `${user.name} | Users`,
    description: `Profile of ${user.name}`,
  }
}

const UserDetailPage = async ({ params }: Props) => {
  const user = await getUser(params.id)

  return (
    <div className="max-w-lg">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/users" className="btn btn-ghost btn-sm">← Users</Link>
        <h1 className="text-2xl font-bold">{user.name}</h1>
      </div>
      <div className="card bg-base-200 shadow">
        <div className="card-body gap-3">
          <div className="flex items-center gap-2">
            <span className="badge badge-outline">Email</span>
            <span>{user.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="badge badge-outline">Phone</span>
            <span>{user.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="badge badge-outline">Website</span>
            <span>{user.website}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="badge badge-outline">Company</span>
            <span>{user.company.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="badge badge-outline">City</span>
            <span>{user.address.city}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDetailPage
