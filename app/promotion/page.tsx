'use client'

import { ChevronLeft, TrendingUp, Zap } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import PromotionTimeline from '@/components/promotion/timeline'
import PayBandCalculator from '@/components/promotion/pay-band-calculator'
import ApprovalWorkflow from '@/components/promotion/approval-workflow'
import PromotionNotificationBanner from '@/components/promotion/notification-banner'

export default function PromotionPage() {
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
              <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-amber-600" />
                Promotion Management
              </h1>
              <p className="text-xs text-slate-500">Career advancement & pay band calculations</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Promotion Notification Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <PromotionNotificationBanner />
        </motion.div>

        {/* Promotion Summary */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {[
            { label: 'Current Level', value: 'Level-5', color: 'from-blue-100 to-blue-50', textColor: 'text-blue-600' },
            { label: 'Promotion Status', value: 'Eligible', color: 'from-green-100 to-emerald-50', textColor: 'text-green-600' },
            { label: 'Expected Promotion', value: 'Q2 2025', color: 'from-purple-100 to-purple-50', textColor: 'text-purple-600' },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 + idx * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className={`p-4 rounded-2xl bg-gradient-to-br ${stat.color} border border-slate-200/50 hover:shadow-lg transition-all duration-300`}
            >
              <p className="text-xs text-slate-600 font-medium uppercase tracking-wider">{stat.label}</p>
              <p className={`text-2xl font-bold ${stat.textColor} mt-2`}>{stat.value}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Timeline & Calculator */}
          <motion.div 
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <PromotionTimeline />
            <PayBandCalculator />
          </motion.div>

          {/* Right Column - Workflow */}
          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <ApprovalWorkflow />
          </motion.div>
        </div>
      </main>
    </div>
  )
}
