import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { LayoutContent } from '@/components/layout/layout-content'
import { AppProvider } from '@/components/context/AppContext'

const inter = Inter({ subsets: ['latin'] })

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#4a6cf7',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="antialiased">
        <AppProvider>
          <LayoutContent>
            {children}
          </LayoutContent>
        </AppProvider>
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.app'
    };
