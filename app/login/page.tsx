'use client'

import React, { useState, useContext } from 'react'
import { motion } from 'framer-motion'
import { LoginDialog } from '@/components/auth/login-dialog'
import { AppContext } from '@/components/context/AppContext'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const { employees, setSelectedEmployee } = useContext(AppContext)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogin = (employee: any) => {
    setSelectedEmployee(employee)
    setIsLoggedIn(true)
    
    setTimeout(() => {
      router.push('/')
    }, 500)
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-oyPsAsa84OAC7xQUCv4RTFH9NbBMdj.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/5" />

      {/* Login Dialog */}
      <motion.div
        animate={isLoggedIn ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {employees.length > 0 && (
          <LoginDialog employees={employees} onLogin={handleLogin} />
        )}
      </motion.div>
    </div>
  )
}
