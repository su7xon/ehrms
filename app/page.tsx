'use client'

import { useContext, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AppContext } from '@/components/context/AppContext'
import DashboardHome from '@/components/dashboard/home'

export default function Home() {
  const router = useRouter()
  const { selectedEmployee } = useContext(AppContext)

  useEffect(() => {
    if (!selectedEmployee) {
      router.push('/login')
    }
  }, [selectedEmployee, router])

  if (!selectedEmployee) {
    return <div className="w-full h-screen bg-gray-100" />
  }

  return <DashboardHome />
}
