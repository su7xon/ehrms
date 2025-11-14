'use client'

import { User, CheckCircle, Clock, AlertCircle } from 'lucide-react'

export default function ApprovalWorkflow() {
  const approvals = [
    { role: 'Department Head', name: 'Vikram Singh', status: 'approved', date: 'Nov 20, 2024' },
    { role: 'HR Manager', name: 'Priya Patel', status: 'approved', date: 'Nov 25, 2024' },
    { role: 'Selection Committee', name: 'Committee Panel', status: 'in-progress', date: 'In Review' },
    { role: 'HR Director', name: 'Rajeev Kumar', status: 'pending', date: 'Awaiting' },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'in-progress':
        return <Clock className="w-5 h-5 text-blue-600 animate-spin" />
      case 'pending':
        return <AlertCircle className="w-5 h-5 text-slate-400" />
      default:
        return null
    }
  }

  return (
    <div className="rounded-3xl bg-white/60 backdrop-blur-sm border border-slate-200/50 p-6 shadow-lg hover:shadow-xl transition-all duration-300 sticky top-24">
      <h3 className="text-lg font-bold text-slate-900 mb-6">Approval Workflow</h3>

      <div className="space-y-4">
        {approvals.map((approval, idx) => (
          <div key={idx} className="space-y-2">
            <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 hover:bg-blue-50/50 transition-colors">
              <div className="flex-shrink-0 mt-0.5">
                {getStatusIcon(approval.status)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">{approval.role}</p>
                <p className="text-sm font-semibold text-slate-900 mt-1">{approval.name}</p>
                <p className="text-xs text-slate-500 mt-0.5">{approval.date}</p>
              </div>
            </div>
            {idx < approvals.length - 1 && (
              <div className="flex justify-center">
                <div className="w-0.5 h-3 bg-gradient-to-b from-slate-300 to-slate-200" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Overall Progress */}
      <div className="mt-6 pt-6 border-t border-slate-200 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-slate-900">Overall Progress</span>
          <span className="text-sm font-bold text-blue-600">50%</span>
        </div>
        <div className="h-3 rounded-full bg-slate-200 overflow-hidden">
          <div className="h-full w-1/2 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-500" />
        </div>
      </div>

      {/* Estimated Timeline */}
      <div className="mt-4 p-3 rounded-lg bg-blue-50 border border-blue-200">
        <p className="text-xs font-semibold text-blue-700">Estimated Effective Date</p>
        <p className="text-sm font-bold text-blue-900 mt-1">February 1, 2025</p>
      </div>
    </div>
  )
}
