'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface LoginDialogProps {
  employees: any[]
  onLogin: (employee: any) => void
}

export function LoginDialog({ employees, onLogin }: LoginDialogProps) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')

  const handleLogin = () => {
    if (!name.trim()) {
      setError('Please enter your name')
      return
    }
    if (!phone.trim()) {
      setError('Please enter your phone number')
      return
    }

    const employee = employees.find(
      (emp) =>
        emp.name.toLowerCase().includes(name.toLowerCase().trim()) ||
        emp.phone === phone.trim()
    )

    if (employee) {
      setError('')
      onLogin(employee)
    } else {
      setError('Employee not found. Please check your details.')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin()
    }
  }

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  }

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.2
      }
    }
  }

  return (
    <motion.div
      className="fixed inset-0 bg-black/5 backdrop-blur-lg flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 w-96 shadow-2xl border border-white/20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={contentVariants}>
          <div className="text-center mb-2">
            <img
              src="/images/up-gov-logo.png"
              alt="Government of UP"
              className="w-16 h-16 mx-auto mb-4"
            />
          </div>

          <h1 className="text-2xl font-bold text-center mb-1 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            MANAV SAMPADA
          </h1>
          <p className="text-center text-sm text-gray-600 mb-6 font-medium">
            SMART eHRMS
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Employee Name
              </label>
              <Input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                  setError('')
                }}
                onKeyPress={handleKeyPress}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number
              </label>
              <Input
                type="tel"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value)
                  setError('')
                }}
                onKeyPress={handleKeyPress}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
              />
            </div>

            {error && (
              <motion.div
                className="text-sm text-red-600 bg-red-50 p-3 rounded-lg"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {error}
              </motion.div>
            )}

            <Button
              onClick={handleLogin}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-cyan-600 transition transform hover:scale-105"
            >
              Login to eHRMS
            </Button>

            <p className="text-xs text-center text-gray-500 mt-4">
              Demo employees: Rajesh Kumar (9876543210), Priya Singh (9876543211), Amit Patel (9876543212), Neha Gupta (9876543213), Vikram Sharma (9876543214)
            </p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
