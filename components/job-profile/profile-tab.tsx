'use client'

import { Calendar, Award, Target, Briefcase } from 'lucide-react'
import { useContext, useState } from 'react'
import { AppContext } from '@/components/context/AppContext'

export default function ProfileTab({ isEditing }: { isEditing: boolean }) {
  const { currentEmployee, setCurrentEmployee } = useContext(AppContext) as any
  
  const [editData, setEditData] = useState({
    jobTitle: currentEmployee?.designation || 'Senior Admin Officer',
    level: currentEmployee?.level || 'Level-5 (Senior)',
    jobGrade: currentEmployee?.jobGrade || 'A1',
    joiningDate: currentEmployee?.joiningDate || '15 June 2016',
  })

  const handleChange = (field: string, value: string) => {
    setEditData(prev => ({ ...prev, [field]: value }))
    setCurrentEmployee(prev => ({ ...prev, [field]: value }))
  }

  const profileFields = [
    { key: 'jobTitle', label: 'Job Title', icon: Briefcase },
    { key: 'level', label: 'Level', icon: Award },
    { key: 'jobGrade', label: 'Job Grade', icon: Target },
    { key: 'joiningDate', label: 'Date of Joining', icon: Calendar },
  ]

  return (
    <div className="space-y-6">
      {/* Main Profile Card */}
      <div className="rounded-3xl bg-white/60 backdrop-blur-sm border border-slate-200/50 p-8 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden relative group">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity" />

        <div className="relative z-10 space-y-8">
          {/* Header Section */}
          <div className="flex items-start justify-between">
            <div className="space-y-4">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                {currentEmployee?.name?.charAt(0)}{currentEmployee?.name?.charAt(currentEmployee?.name?.lastIndexOf(' ') + 1) || ''}
              </div>
              <div>
                <h2 className="text-3xl font-bold text-slate-900">{currentEmployee?.name}</h2>
                <p className="text-lg text-slate-600">{editData.jobTitle}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="px-4 py-2 rounded-xl bg-gradient-to-r from-green-100 to-emerald-100 border border-green-200 inline-block">
                <p className="text-xs font-bold text-green-700 uppercase tracking-wider">Employed</p>
              </div>
            </div>
          </div>

          {/* Profile Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-slate-200">
            {profileFields.map((field, idx) => {
              const Icon = field.icon
              return (
                <div key={idx} className="space-y-2 group/field">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-blue-600" />
                    <p className="text-xs text-slate-600 uppercase tracking-wider font-semibold">{field.label}</p>
                  </div>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData[field.key as keyof typeof editData]}
                      onChange={(e) => handleChange(field.key, e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm font-semibold bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 group-hover/field:border-blue-300 transition-colors"
                    />
                  ) : (
                    <p className="text-sm font-bold text-slate-900">{editData[field.key as keyof typeof editData]}</p>
                  )}
                </div>
              )
            })}
          </div>

          {/* Additional Details */}
          <div className="pt-6 border-t border-slate-200 grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-slate-600 uppercase tracking-wider font-semibold">Work Experience</p>
              <p className="text-lg font-bold text-slate-900 mt-1">8 Years 5 Months</p>
            </div>
            <div>
              <p className="text-xs text-slate-600 uppercase tracking-wider font-semibold">Performance Rating</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-4 h-4 rounded-full transition-colors ${
                        i < 4 ? 'bg-yellow-400' : 'bg-slate-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold text-slate-900">4.0/5</span>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="pt-6 border-t border-slate-200">
            <p className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Key Skills</p>
            <div className="flex flex-wrap gap-2">
              {['Leadership', 'Administration', 'Policy Making', 'Team Management', 'Documentation'].map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200 text-xs font-semibold text-blue-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Historical Info */}
      <div className="rounded-2xl bg-white/60 backdrop-blur-sm border border-slate-200/50 p-6 shadow-sm">
        <h3 className="font-bold text-slate-900 mb-4">Career Milestones</h3>
        <div className="space-y-3">
          {[
            { date: '2023', title: 'Promoted to Senior Level', desc: 'Advanced to Level-5 position' },
            { date: '2021', title: 'Training Completion', desc: 'Advanced Administration Course' },
            { date: '2016', title: 'Joined UPSDC', desc: 'Started as Admin Officer' },
          ].map((milestone, idx) => (
            <div key={idx} className="flex gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-blue-600">{milestone.date}</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">{milestone.title}</p>
                <p className="text-xs text-slate-600">{milestone.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
