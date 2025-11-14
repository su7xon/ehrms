'use client'

import { CheckCircle, Circle, Lock } from 'lucide-react'

export default function PromotionTimeline() {
  const timeline = [
    { stage: 'Performance Review', status: 'completed', date: 'Oct 2024', desc: 'Annual appraisal completed with 4.0/5 rating' },
    { stage: 'Eligibility Check', status: 'completed', date: 'Nov 2024', desc: 'Meets all promotion criteria and requirements' },
    { stage: 'Selection Committee', status: 'in-progress', date: 'Dec 2024', desc: 'Panel reviewing applications' },
    { stage: 'Final Approval', status: 'pending', date: 'Jan 2025', desc: 'Awaiting HR director signature' },
    { stage: 'Effective Date', status: 'locked', date: 'Feb 1 2025', desc: 'Promotion will be effective from this date' },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'from-green-100 to-emerald-50'
      case 'in-progress':
        return 'from-blue-100 to-blue-50'
      case 'pending':
        return 'from-amber-100 to-amber-50'
      default:
        return 'from-slate-100 to-slate-50'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-6 h-6 text-green-600" />
      case 'in-progress':
        return <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse" />
      case 'locked':
        return <Lock className="w-6 h-6 text-slate-400" />
      default:
        return <Circle className="w-6 h-6 text-slate-400" />
    }
  }

  return (
    <div className="rounded-3xl bg-white/60 backdrop-blur-sm border border-slate-200/50 p-8 shadow-lg hover:shadow-xl transition-all duration-300">
      <h3 className="text-lg font-bold text-slate-900 mb-8">Promotion Timeline</h3>

      <div className="space-y-6">
        {timeline.map((item, idx) => (
          <div key={idx} className="flex gap-6 relative">
            {/* Timeline Line */}
            {idx < timeline.length - 1 && (
              <div className={`absolute left-3 top-12 w-0.5 h-24 bg-gradient-to-b ${
                item.status === 'completed'
                  ? 'from-green-300 to-green-200'
                  : item.status === 'in-progress'
                  ? 'from-blue-300 to-slate-200'
                  : 'from-slate-300 to-slate-200'
              }`} />
            )}

            {/* Icon */}
            <div className="flex-shrink-0">
              {getStatusIcon(item.status)}
            </div>

            {/* Content */}
            <div className={`flex-1 p-4 rounded-2xl bg-gradient-to-br ${getStatusColor(item.status)} border border-slate-200/50 hover:shadow-lg transition-all`}>
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-bold text-slate-900">{item.stage}</h4>
                <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-full ${
                  item.status === 'completed'
                    ? 'bg-green-200 text-green-700'
                    : item.status === 'in-progress'
                    ? 'bg-blue-200 text-blue-700'
                    : item.status === 'pending'
                    ? 'bg-amber-200 text-amber-700'
                    : 'bg-slate-200 text-slate-600'
                }`}>
                  {item.status}
                </span>
              </div>
              <p className="text-xs text-slate-600 mb-2">{item.date}</p>
              <p className="text-sm text-slate-700">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
