import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Smart Home Automation',
  description: 'Control your smart devices from anywhere',
  icons: {
    icon: '/favicon.ico', // You can replace this with your own logo/favicon
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
