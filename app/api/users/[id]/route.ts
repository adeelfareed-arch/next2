import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

const updateUserSchema = z.object({
  name: z.string().min(3).optional(),
  email: z.string().email().optional(),
})

interface Props {
  params: { id: string }
}

export async function GET(request: NextRequest, { params }: Props) {
  const id = parseInt(params.id)

  if (isNaN(id)) {
    return NextResponse.json({ error: 'Invalid ID.' }, { status: 400 })
  }

  const user = await prisma.user.findUnique({ where: { id } })

  if (!user) {
    return NextResponse.json({ error: 'User not found.' }, { status: 404 })
  }

  return NextResponse.json(user)
}

export async function PATCH(request: NextRequest, { params }: Props) {
  const id = parseInt(params.id)

  if (isNaN(id)) {
    return NextResponse.json({ error: 'Invalid ID.' }, { status: 400 })
  }

  const body = await request.json()
  const validation = updateUserSchema.safeParse(body)

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 })
  }

  const user = await prisma.user.findUnique({ where: { id } })

  if (!user) {
    return NextResponse.json({ error: 'User not found.' }, { status: 404 })
  }

  if (validation.data.email) {
    const existing = await prisma.user.findUnique({
      where: { email: validation.data.email },
    })
    if (existing && existing.id !== id) {
      return NextResponse.json({ error: 'Email already taken.' }, { status: 400 })
    }
  }

  const updated = await prisma.user.update({
    where: { id },
    data: validation.data,
  })

  return NextResponse.json(updated)
}

export async function DELETE(request: NextRequest, { params }: Props) {
  const id = parseInt(params.id)

  if (isNaN(id)) {
    return NextResponse.json({ error: 'Invalid ID.' }, { status: 400 })
  }

  const user = await prisma.user.findUnique({ where: { id } })

  if (!user) {
    return NextResponse.json({ error: 'User not found.' }, { status: 404 })
  }

  await prisma.user.delete({ where: { id } })

  return NextResponse.json({})
}
