import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from '@react-email/components'

interface Props {
  name: string
}

export const WelcomeEmail = ({ name }: Props) => {
  return (
    <Html>
      <Head />
      <Preview>Welcome to Adeel&apos;s Next.js App!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Welcome, {name}!</Heading>
          <Text style={text}>
            Thanks for joining Adeel&apos;s Next.js App. We&apos;re excited to have you on board.
          </Text>
          <Text style={text}>
            This is a full-stack Next.js 13 application built with:
          </Text>
          <ul>
            <li>Next.js 13 App Router</li>
            <li>Prisma + MySQL</li>
            <li>NextAuth (Google sign-in)</li>
            <li>Cloudinary (file uploads)</li>
            <li>React Email + Resend (transactional email)</li>
          </ul>
          <Section style={{ textAlign: 'center', marginTop: '32px' }}>
            <Button href="http://localhost:3000" style={button}>
              Go to App
            </Button>
          </Section>
          <Hr style={hr} />
          <Text style={footer}>
            You&apos;re receiving this because you signed up for Adeel&apos;s Next.js App.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export default WelcomeEmail

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
}

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  maxWidth: '600px',
  borderRadius: '8px',
}

const h1 = {
  color: '#333',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '40px 0',
  padding: '0 40px',
}

const text = {
  color: '#555',
  fontSize: '16px',
  lineHeight: '24px',
  padding: '0 40px',
}

const button = {
  backgroundColor: '#3b82f6',
  borderRadius: '6px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  padding: '12px 32px',
}

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 40px',
}

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
  padding: '0 40px',
}
