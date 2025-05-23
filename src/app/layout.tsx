import type { Metadata } from 'next'
import './globals.css'
import { CoverProvider } from './components/coverContext'

export const metadata: Metadata = {
  title: 'ThisCover 封面生成器',
  description: '免费、漂亮的封面生成器'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`antialiased`}>
        <CoverProvider>{children}</CoverProvider>
      </body>
    </html>
  )
}
