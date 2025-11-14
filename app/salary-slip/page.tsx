'use client'

import { ChevronLeft, Save, X, FileText } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'
import SalarySlipPreview from '@/components/salary-slip/preview'
import EditableFields from '@/components/salary-slip/editable-fields'
import ChangeTimeline from '@/components/salary-slip/timeline'

export default function SalarySlipPage() {
  const [showPreview, setShowPreview] = useState(true)
  const [changes, setChanges] = useState([])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-slate-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/payroll">
              <button className="p-2 hover:bg-slate-100 rounded-xl transition-all duration-200">
                <ChevronLeft className="w-5 h-5 text-slate-600" />
              </button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Salary Slip Update</h1>
              <p className="text-xs text-slate-500">November 2024 • Edit & Review</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Tab Navigation */}
        <motion.div 
          className="flex gap-3 border-b border-slate-200"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <button
            onClick={() => setShowPreview(true)}
            className={`px-4 py-3 font-semibold text-sm border-b-2 transition-all ${
              showPreview
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-4 h-4 inline mr-2" />
            Preview Slip
          </button>
          <button
            onClick={() => setShowPreview(false)}
            className={`px-4 py-3 font-semibold text-sm border-b-2 transition-all ${
              !showPreview
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Edit Components
          </button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {showPreview ? <SalarySlipPreview /> : <EditableFields onFieldChange={setChanges} />}
          </motion.div>

          {/* Timeline */}
          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <ChangeTimeline changes={changes} />
          </motion.div>
        </div>

        {/* Action Buttons */}
        <div className="fixed bottom-8 right-8 flex gap-3 z-40">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 rounded-xl bg-red-500 text-white font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2"
          >
            <X className="w-4 h-4" />
            Reject
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Approve
          </motion.button>
        </div>
      </main>
    </div>
  )
}
