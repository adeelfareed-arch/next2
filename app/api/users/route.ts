import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

const createUserSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
})

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const sortOrder = searchParams.get('sortOrder')

  const orderBy =
    sortOrder === 'email'
      ? { email: 'asc' as const }
      : sortOrder === 'name'
      ? { name: 'asc' as const }
      : { id: 'asc' as const }

  const users = await prisma.user.findMany({ orderBy })
  return NextResponse.json(users)
}

export async function POST(request: NextRequest) {
  const body = await request.json()

  const validation = createUserSchema.safeParse(body)
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 })
  }

  const { name, email } = validation.data

  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    return NextResponse.json({ error: 'User already exists.' }, { status: 400 })
  }

  const user = await prisma.user.create({
    data: { name, email },
  })

  return NextResponse.json(user, { status: 201 })
}
