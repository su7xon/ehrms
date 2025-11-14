'use client'

import { ChevronLeft, Edit2, Save, X } from 'lucide-react'
import Link from 'next/link'
import { useState, useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AppContext } from '@/components/context/AppContext'
import ProfileTab from '@/components/job-profile/profile-tab'
import DepartmentTab from '@/components/job-profile/department-tab'
import ResponsibilitiesTab from '@/components/job-profile/responsibilities-tab'

export default function JobProfilePage() {
  const { currentEmployee, setCurrentEmployee } = useContext(AppContext) as any
  const [activeTab, setActiveTab] = useState('profile')
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const tabs = [
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'department', label: 'Department', icon: '🏢' },
    { id: 'responsibilities', label: 'Responsibilities', icon: '📋' },
  ]

  const handleSaveChanges = async () => {
    setIsSaving(true)
    try {
      const response = await fetch('/api/job-profile/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          employeeId: currentEmployee?.id,
          profileData: currentEmployee,
        }),
      })

      if (response.ok) {
        setShowSuccess(true)
        setTimeout(() => {
          setShowSuccess(false)
          setIsEditing(false)
        }, 2000)
      }
    } catch (error) {
      console.error('Error saving profile:', error)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-slate-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <button className="p-2 hover:bg-slate-100 rounded-xl transition-all duration-200">
                <ChevronLeft className="w-5 h-5 text-slate-600" />
              </button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Job Profile Management</h1>
              <p className="text-xs text-slate-500">View & Edit Your Role Details</p>
            </div>
          </div>
          <button
            onClick={() => {
              if (isEditing) {
                handleSaveChanges()
              } else {
                setIsEditing(true)
              }
            }}
            disabled={isSaving}
            className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center gap-2 ${
              isEditing
                ? 'bg-green-600 text-white hover:bg-green-700 disabled:opacity-50'
                : 'bg-white/60 border border-slate-200/50 text-slate-900 hover:bg-white'
            }`}
          >
            {isEditing ? (
              <>
                <Save className="w-4 h-4" />
                {isSaving ? 'Saving...' : 'Save Changes'}
              </>
            ) : (
              <>
                <Edit2 className="w-4 h-4" />
                Edit Profile
              </>
            )}
          </button>
        </div>
      </header>

      {/* Success Notification */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-20 right-6 z-50 px-6 py-3 rounded-xl bg-green-500 text-white font-semibold shadow-lg"
          >
            Changes saved successfully!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Tab Navigation */}
        <motion.div 
          className="flex gap-2 rounded-2xl bg-white/60 backdrop-blur-sm border border-slate-200/50 p-2 shadow-sm"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {tabs.map((tab, idx) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
              className={`flex-1 px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Tab Content */}
        <motion.div 
          className="min-h-screen"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
        >
          {activeTab === 'profile' && <ProfileTab isEditing={isEditing} />}
          {activeTab === 'department' && <DepartmentTab isEditing={isEditing} />}
          {activeTab === 'responsibilities' && <ResponsibilitiesTab isEditing={isEditing} />}
        </motion.div>
      </main>
    </div>
  )
}
