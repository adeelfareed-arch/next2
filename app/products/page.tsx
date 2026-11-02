import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Products',
  description: 'Browse our product catalog',
}

interface Product {
  id: number
  title: string
  price: number
  category: string
  description: string
  image: string
  rating: { rate: number; count: number }
}

const ProductsPage = async () => {
  // ISR: revalidate every hour (3600 seconds)
  const res = await fetch('https://fakestoreapi.com/products', {
    next: { revalidate: 3600 },
  })
  const products: Product[] = await res.json()

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <Link key={product.id} href={`/products/${product.id}`}>
            <div className="card bg-base-200 shadow hover:shadow-lg transition-shadow h-full">
              <figure className="px-6 pt-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-40 object-contain"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-sm line-clamp-2">{product.title}</h2>
                <p className="text-primary font-bold">${product.price.toFixed(2)}</p>
                <div className="badge badge-outline badge-sm">{product.category}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default ProductsPage
