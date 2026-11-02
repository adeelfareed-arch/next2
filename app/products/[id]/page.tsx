import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

interface Product {
  id: number
  title: string
  price: number
  category: string
  description: string
  image: string
  rating: { rate: number; count: number }
}

interface Props {
  params: { id: string }
}

async function getProduct(id: string): Promise<Product> {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
    next: { revalidate: 3600 },
  })
  if (!res.ok) notFound()
  return res.json()
}

// generateMetadata — dynamic metadata per product
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProduct(params.id)
  return {
    title: product.title,
    description: product.description.slice(0, 150),
  }
}

const ProductDetailPage = async ({ params }: Props) => {
  const product = await getProduct(params.id)

  return (
    <div className="max-w-2xl">
      <div className="mb-4">
        <Link href="/products" className="btn btn-ghost btn-sm">← Products</Link>
      </div>
      <div className="card bg-base-200 shadow-lg">
        <div className="card-body">
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex items-center justify-center">
              {/* next/image with external URL — needs config in next.config.js */}
              {/* Using <img> here since fakestoreapi is not in remotePatterns */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.image}
                alt={product.title}
                className="w-40 h-40 object-contain"
              />
            </div>
            <div className="flex-1">
              <div className="badge badge-outline mb-2">{product.category}</div>
              <h1 className="text-xl font-bold mb-2">{product.title}</h1>
              <p className="text-2xl font-bold text-primary mb-3">
                ${product.price.toFixed(2)}
              </p>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-yellow-400">★</span>
                <span className="font-semibold">{product.rating.rate}</span>
                <span className="text-sm text-gray-500">({product.rating.count} reviews)</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {product.description}
              </p>
              <div className="card-actions justify-start mt-4">
                <button className="btn btn-primary">Add to Cart</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage
