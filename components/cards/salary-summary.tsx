'use client'

import { TrendingUp, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

export default function SalaryCard() {
  const [showAmount, setShowAmount] = useState(true)

  return (
    <div className="group rounded-3xl bg-gradient-to-br from-slate-600 to-slate-700 p-8 shadow-xl hover:shadow-2xl transition-all duration-500 text-white overflow-hidden relative">
      {/* Glassmorphic background element */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/10 rounded-full blur-3xl" />

      <div className="relative z-10 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-white/70">Monthly Salary</p>
            <div className="flex items-center gap-3 mt-2">
              <h2 className="text-4xl font-bold">
                {showAmount ? '₹ 75,000' : '••••••'}
              </h2>
              <button
                onClick={() => setShowAmount(!showAmount)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                {showAmount ? (
                  <Eye className="w-5 h-5" />
                ) : (
                  <EyeOff className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
          <div className="p-3 bg-white/20 rounded-2xl">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        {/* Salary Components */}
        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/20">
          <div>
            <p className="text-xs text-white/60 uppercase tracking-wider">Basic</p>
            <p className="text-lg font-bold mt-1">₹50K</p>
          </div>
          <div>
            <p className="text-xs text-white/60 uppercase tracking-wider">HRA</p>
            <p className="text-lg font-bold mt-1">₹15K</p>
          </div>
          <div>
            <p className="text-xs text-white/60 uppercase tracking-wider">DA</p>
            <p className="text-lg font-bold mt-1">₹10K</p>
          </div>
        </div>

        {/* Next Salary Date */}
        <div className="pt-4 border-t border-white/20">
          <p className="text-xs text-white/60 uppercase tracking-wider">Next Salary Date</p>
          <p className="text-lg font-bold mt-1">30 Nov 2024</p>
        </div>
      </div>
    </div>
  )
}
