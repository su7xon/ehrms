'use client'

import { TrendingUp } from 'lucide-react'
import { useState } from 'react'

export default function PayBandCalculator() {
  const [showProjection, setShowProjection] = useState(true)

  const current = { basic: 50000, hra: 15000, da: 10000 }
  const promoted = { basic: 65000, hra: 19500, da: 13000 }
  const increase = { basic: 15000, hra: 4500, da: 3000 }

  return (
    <div className="rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 p-8 shadow-lg hover:shadow-2xl transition-all duration-300 text-white overflow-hidden relative group">
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all" />

      <div className="relative z-10 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-amber-400" />
            New Pay Band Calculator
          </h3>
          <button
            onClick={() => setShowProjection(!showProjection)}
            className="px-3 py-1 rounded-lg bg-white/20 text-white text-xs font-semibold hover:bg-white/30 transition-colors"
          >
            {showProjection ? 'Hide' : 'Show'} Details
          </button>
        </div>

        {showProjection && (
          <div className="space-y-4">
            {/* Comparison Grid */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Basic', current: current.basic, promoted: promoted.basic, increase: increase.basic },
                { label: 'HRA', current: current.hra, promoted: promoted.hra, increase: increase.hra },
                { label: 'DA', current: current.da, promoted: promoted.da, increase: increase.da },
              ].map((comp, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-white/10 border border-white/20">
                  <p className="text-xs text-white/60 uppercase tracking-wider font-semibold">{comp.label}</p>
                  <div className="mt-2 space-y-1">
                    <p className="text-xs text-white/70">Current: ₹{comp.current.toLocaleString()}</p>
                    <p className="text-sm font-bold text-amber-400">New: ₹{comp.promoted.toLocaleString()}</p>
                    <p className="text-xs text-green-300">+₹{comp.increase.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Total Summary */}
            <div className="pt-4 border-t border-white/20 grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-white/60 uppercase tracking-wider font-semibold">Current Gross</p>
                <p className="text-2xl font-bold mt-1">₹75,000</p>
              </div>
              <div>
                <p className="text-xs text-white/60 uppercase tracking-wider font-semibold">New Gross</p>
                <p className="text-2xl font-bold text-green-400 mt-1">₹97,500</p>
              </div>
            </div>

            {/* Annual Impact */}
            <div className="bg-white/10 p-4 rounded-xl border border-green-400/30">
              <p className="text-xs text-white/60 uppercase tracking-wider font-semibold">Annual Salary Impact</p>
              <p className="text-2xl font-bold text-green-400 mt-1">+₹2,70,000/year</p>
              <p className="text-xs text-white/70 mt-2">Increase of 36% in gross salary</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
