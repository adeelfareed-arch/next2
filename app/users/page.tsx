import Link from 'next/link'
import { notFound } from 'next/navigation'

interface User {
  id: number
  name: string
  email: string
}

interface Props {
  searchParams: { sortOrder?: string }
}

const UsersPage = async ({ searchParams: { sortOrder } }: Props) => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users', {
    // No cache — always fresh (dynamic rendering)
    cache: 'no-store',
  })

  if (!res.ok) notFound()

  const users: User[] = await res.json()

  const sorted = sortOrder === 'email'
    ? [...users].sort((a, b) => a.email.localeCompare(b.email))
    : sortOrder === 'name'
    ? [...users].sort((a, b) => a.name.localeCompare(b.name))
    : users

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <div className="flex gap-2 mb-4">
        <span className="text-sm text-gray-500 self-center">Sort by:</span>
        <Link href="/users?sortOrder=name" className="btn btn-xs btn-outline">
          Name
        </Link>
        <Link href="/users?sortOrder=email" className="btn btn-xs btn-outline">
          Email
        </Link>
        <Link href="/users" className="btn btn-xs btn-ghost">
          Default
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>
                  <Link href={`/users/${user.id}`} className="link link-primary">
                    {user.name}
                  </Link>
                </td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UsersPage
