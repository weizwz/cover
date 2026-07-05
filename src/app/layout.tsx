import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import './assets/css/patterns.css'
import { CoverProvider } from './components/coverContext'

export const metadata: Metadata = {
  title: 'ThisCover 封面生成器',
  description: '免费、漂亮的封面生成器',
  keywords: ['ThisCover', '封面生成器', 'Cover Generator', '免费设计', '公众号封面', '文章配图', '设计工具', '在线设计', 'weizwz', '唯知笔记', '唯知为之'],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: [{ url: '/favicon-180.png', sizes: '180x180', type: 'image/png' }],
    other: [
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '256x256',
        url: '/logo.png'
      }
    ]
  }
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
        {/* cloudflare analytics，不用请注释 */}
        {process.env.NODE_ENV === 'production' && (
          <Script
            defer
            src='https://static.cloudflareinsights.com/beacon.min.js'
            data-cf-beacon={`{"token": "${process.env.NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN}"}`}
          />
        )}
      </body>
    </html>
  )
}
