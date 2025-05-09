import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'thisCover 封面生成器',
  description: '免费、漂亮的封面生成器'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`antialiased`}>{children}</body>
    </html>
  )
}
