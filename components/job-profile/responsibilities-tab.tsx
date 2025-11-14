'use client'

import { CheckCircle, AlertCircle, Zap } from 'lucide-react'

export default function ResponsibilitiesTab({ isEditing }: { isEditing: boolean }) {
  const responsibilities = [
    { title: 'Administrative Management', items: ['Handle office operations', 'Manage staff schedules', 'Budget planning'] },
    { title: 'Policy Implementation', items: ['Execute government policies', 'Maintain compliance', 'Create guidelines'] },
    { title: 'HR Management', items: ['Process employee requests', 'Conduct training', 'Performance evaluation'] },
    { title: 'Documentation', items: ['Maintain records', 'Generate reports', 'Archive management'] },
  ]

  return (
    <div className="space-y-6">
      {/* Primary Responsibilities */}
      <div className="rounded-3xl bg-white/60 backdrop-blur-sm border border-slate-200/50 p-8 shadow-lg hover:shadow-xl transition-all duration-300">
        <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
          <Zap className="w-6 h-6 text-amber-600" />
          Primary Responsibilities
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {responsibilities.map((section, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-100 hover:shadow-lg transition-all"
            >
              <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-blue-600" />
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="text-sm text-slate-700 flex items-start gap-2">
                    <span className="text-blue-600 font-bold mt-0.5">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="rounded-2xl bg-white/60 backdrop-blur-sm border border-slate-200/50 p-6 shadow-sm">
        <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-blue-600" />
          Performance Metrics
        </h3>
        <div className="space-y-3">
          {[
            { metric: 'Task Completion Rate', value: 95, target: 90 },
            { metric: 'Policy Compliance', value: 100, target: 100 },
            { metric: 'Team Efficiency', value: 88, target: 85 },
            { metric: 'Report Accuracy', value: 97, target: 95 },
          ].map((kpi, idx) => (
            <div key={idx}>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold text-slate-900">{kpi.metric}</p>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-blue-600">{kpi.value}%</span>
                  <span className="text-xs text-slate-500">Target: {kpi.target}%</span>
                </div>
              </div>
              <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300"
                  style={{ width: `${kpi.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Goals & Objectives */}
      <div className="rounded-2xl bg-white/60 backdrop-blur-sm border border-slate-200/50 p-6 shadow-sm">
        <h3 className="font-bold text-slate-900 mb-4">2024-2025 Goals</h3>
        <div className="space-y-3">
          {[
            { goal: 'Digitize all administrative records', progress: 75 },
            { goal: 'Improve office efficiency by 20%', progress: 60 },
            { goal: 'Complete leadership training program', progress: 100 },
            { goal: 'Mentor 2 junior officers', progress: 50 },
          ].map((item, idx) => (
            <div key={idx} className="p-3 rounded-lg bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold text-slate-900">{item.goal}</p>
                <span className="text-xs font-bold text-blue-600">{item.progress}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-slate-300 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-300"
                  style={{ width: `${item.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
