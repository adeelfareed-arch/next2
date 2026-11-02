import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'
import WelcomeEmail from '@/emails/WelcomeEmail'

const resend = new Resend(process.env.RESEND_API_KEY)

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
})

export async function POST(request: NextRequest) {
  const body = await request.json()

  const validation = schema.safeParse(body)
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 })
  }

  const { name, email } = validation.data

  try {
    const data = await resend.emails.send({
      from: process.env.EMAIL_FROM ?? 'onboarding@resend.dev',
      to: [email],
      subject: 'Welcome to Adeel\'s Next.js App!',
      react: WelcomeEmail({ name }),
    })

    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to send email.' },
      { status: 500 }
    )
  }
}
