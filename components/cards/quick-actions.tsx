'use client'

import { Download, FileText, MessageSquare, Clock } from 'lucide-react'

export default function QuickActions() {
  const actions = [
    {
      icon: Download,
      label: 'Download Salary Slip',
      color: 'from-blue-100 to-blue-50',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-100/50'
    },
    {
      icon: Clock,
      label: 'Apply for Leave',
      color: 'from-purple-100 to-purple-50',
      textColor: 'text-purple-600',
      bgColor: 'bg-purple-100/50'
    },
    {
      icon: MessageSquare,
      label: 'Chat with HR Bot',
      color: 'from-cyan-100 to-cyan-50',
      textColor: 'text-cyan-600',
      bgColor: 'bg-cyan-100/50'
    },
    {
      icon: FileText,
      label: 'View Documents',
      color: 'from-amber-100 to-amber-50',
      textColor: 'text-amber-600',
      bgColor: 'bg-amber-100/50'
    }
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {actions.map((action, idx) => {
        const Icon = action.icon
        return (
          <button
            key={idx}
            className="group p-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-slate-200/50 hover:bg-white hover:shadow-lg transition-all duration-300 flex flex-col items-center gap-3 text-center"
          >
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
              <Icon className={`w-6 h-6 ${action.textColor}`} />
            </div>
            <p className="text-xs font-semibold text-slate-900 leading-tight">{action.label}</p>
          </button>
        )
      })}
    </div>
  )
}
