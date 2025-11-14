'use client'

import { Calculator } from 'lucide-react'
import { useState } from 'react'

export default function SalaryCalculator() {
  const [basic, setBasic] = useState(50000)
  const [hra, setHra] = useState(15000)
  const [da, setDa] = useState(10000)

  const deductions = {
    pf: (basic * 0.1).toFixed(0),
    it: ((basic + hra + da) * 0.04).toFixed(0),
    health: 1200
  }

  const total = basic + hra + da - deductions.pf - deductions.it - deductions.health

  return (
    <div className="rounded-2xl bg-white/60 backdrop-blur-sm border border-slate-200/50 p-6 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 rounded-lg bg-gradient-to-br from-blue-100 to-blue-50">
          <Calculator className="w-5 h-5 text-blue-600" />
        </div>
        <h3 className="font-bold text-slate-900">Quick Calculator</h3>
      </div>

      <div className="space-y-3">
        <div>
          <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Basic</label>
          <input
            type="number"
            value={basic}
            onChange={(e) => setBasic(Number(e.target.value))}
            className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">HRA</label>
          <input
            type="number"
            value={hra}
            onChange={(e) => setHra(Number(e.target.value))}
            className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">DA</label>
          <input
            type="number"
            value={da}
            onChange={(e) => setDa(Number(e.target.value))}
            className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="pt-3 border-t border-slate-200/50 space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-slate-600">Gross Salary:</span>
            <span className="font-bold text-slate-900">₹{(basic + hra + da).toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-slate-600">Deductions:</span>
            <span className="font-bold text-slate-900">₹{(Number(deductions.pf) + Number(deductions.it) + deductions.health).toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm font-bold border-t border-slate-200/50 pt-2">
            <span className="text-slate-900">Net Salary:</span>
            <span className="text-blue-600">₹{total.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
