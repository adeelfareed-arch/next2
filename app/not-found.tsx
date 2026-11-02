import Link from 'next/link'

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <h2 className="text-4xl font-bold">404</h2>
      <p className="text-gray-500">This page could not be found.</p>
      <Link href="/" className="btn btn-primary btn-sm">
        Go Home
      </Link>
    </div>
  )
}

export default NotFound
