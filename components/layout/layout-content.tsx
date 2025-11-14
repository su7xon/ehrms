'use client'

import { usePathname } from 'next/navigation'
import Sidebar from '@/components/layout/sidebar'

export function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isLoginPage = pathname === '/login'

  if (isLoginPage) {
    return children
  }

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 lg:ml-64">
        {children}
      </main>
    </div>
  )
}
