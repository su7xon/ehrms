'use client'

import { AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react'

export default function ComplianceIndicator() {
  const complianceItems = [
    { label: 'PF Compliance', status: 'good', percentage: 98 },
    { label: 'Tax Deduction', status: 'warning', percentage: 75 },
    { label: 'Insurance Paid', status: 'good', percentage: 100 },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-amber-500" />
      default:
        return <AlertCircle className="w-5 h-5 text-red-500" />
    }
  }

  return (
    <div className="rounded-2xl bg-white/60 backdrop-blur-sm border border-slate-200/50 p-6 shadow-lg hover:shadow-xl transition-all duration-300">
      <h3 className="font-bold text-slate-900 mb-4">Auto-Compliance Status</h3>
      <div className="space-y-3">
        {complianceItems.map((item, idx) => (
          <div key={idx} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {getStatusIcon(item.status)}
                <span className="text-sm font-medium text-slate-700">{item.label}</span>
              </div>
              <span className="text-sm font-bold text-slate-900">{item.percentage}%</span>
            </div>
            <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  item.status === 'good'
                    ? 'bg-green-500'
                    : item.status === 'warning'
                    ? 'bg-amber-500'
                    : 'bg-red-500'
                }`}
                style={{ width: `${item.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
