import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import NavBar from '@/components/NavBar'
import AuthProvider from '@/components/AuthProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: '%s | Adeel\'s Next App',
    default: 'Adeel\'s Next App',
  },
  description: 'A full-stack Next.js 13 application — built by Adeel Fareed',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="winter">
      <body className={inter.className}>
        <AuthProvider>
          <NavBar />
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  )
}
