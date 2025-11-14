'use client'

import { Edit2, Save } from 'lucide-react'
import { useState } from 'react'

export default function EditableFields({ onFieldChange }: { onFieldChange: Function }) {
  const [editing, setEditing] = useState<string | null>(null)
  const [fields, setFields] = useState({
    basic: '50,000',
    hra: '15,000',
    da: '10,000',
    pf: '5,000',
    it: '3,500',
    insurance: '1,200',
  })

  const handleFieldChange = (field: string, value: string) => {
    setFields(prev => ({ ...prev, [field]: value }))
    onFieldChange((prev: any) => [...prev, { field, value, timestamp: new Date() }])
  }

  return (
    <div className="rounded-3xl bg-white/60 backdrop-blur-sm border border-slate-200/50 p-8 shadow-lg hover:shadow-xl transition-all duration-300 space-y-6">
      <h3 className="text-lg font-bold text-slate-900">Edit Salary Components</h3>

      {/* Earnings Section */}
      <div>
        <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4">Earnings</h4>
        <div className="space-y-3">
          {[
            { key: 'basic', label: 'Basic Salary' },
            { key: 'hra', label: 'House Rent Allowance' },
            { key: 'da', label: 'Dearness Allowance' },
          ].map(item => (
            <div key={item.key} className="flex items-center justify-between p-3 bg-blue-50/50 rounded-xl border border-blue-100">
              <label className="text-sm font-medium text-slate-700">{item.label}</label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-500">₹</span>
                <input
                  type="text"
                  value={fields[item.key as keyof typeof fields]}
                  onChange={(e) => handleFieldChange(item.key, e.target.value)}
                  className="w-24 px-2 py-1 rounded text-sm font-semibold bg-white border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Deductions Section */}
      <div>
        <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4">Deductions</h4>
        <div className="space-y-3">
          {[
            { key: 'pf', label: 'Provident Fund' },
            { key: 'it', label: 'Income Tax' },
            { key: 'insurance', label: 'Health Insurance' },
          ].map(item => (
            <div key={item.key} className="flex items-center justify-between p-3 bg-red-50/50 rounded-xl border border-red-100">
              <label className="text-sm font-medium text-slate-700">{item.label}</label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-500">₹</span>
                <input
                  type="text"
                  value={fields[item.key as keyof typeof fields]}
                  onChange={(e) => handleFieldChange(item.key, e.target.value)}
                  className="w-24 px-2 py-1 rounded text-sm font-semibold bg-white border border-red-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="pt-4 border-t border-slate-200 space-y-2">
        <div className="flex justify-between font-semibold text-slate-900">
          <span>Total Earnings</span>
          <span className="text-blue-600">₹75,000</span>
        </div>
        <div className="flex justify-between font-semibold text-slate-900">
          <span>Total Deductions</span>
          <span className="text-red-600">₹9,700</span>
        </div>
        <div className="flex justify-between font-bold text-lg border-t border-slate-200 pt-2 text-green-600">
          <span>Net Salary</span>
          <span>₹65,300</span>
        </div>
      </div>
    </div>
  )
}
