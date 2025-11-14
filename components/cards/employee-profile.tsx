'use client'

import { Star, MapPin, Badge } from 'lucide-react'

export default function EmployeeProfileCard() {
  return (
    <div className="group rounded-3xl bg-white/60 backdrop-blur-sm border border-slate-200/50 p-6 shadow-lg hover:shadow-2xl hover:bg-white transition-all duration-500">
      {/* Profile Image & Badge */}
      <div className="relative mb-4">
        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop" 
            alt="Rajesh Kumar" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-green-400 border-2 border-white shadow-lg" />
      </div>

      {/* Employee Info */}
      <div className="space-y-2">
        <h3 className="text-lg font-bold text-slate-900">Rajesh Kumar</h3>
        <p className="text-sm text-slate-600 font-medium">Senior Admin Officer</p>
        <p className="text-xs text-slate-500">Employee ID: EMP-2024-7841</p>
      </div>

      {/* Details */}
      <div className="mt-4 pt-4 border-t border-slate-200/50 space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="w-4 h-4 text-slate-400" />
          <span className="text-slate-600">Lucknow, Uttar Pradesh</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Badge className="w-4 h-4 text-slate-400" />
          <span className="text-slate-600">Department of Administration</span>
        </div>
      </div>

      {/* Status */}
      <div className="mt-4 pt-4 border-t border-slate-200/50 flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-700">Status</span>
        <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-green-100 to-emerald-100 border border-green-200">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs font-semibold text-green-700">Active</span>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-4 pt-4 border-t border-slate-200/50 grid grid-cols-2 gap-3">
        <div className="text-center">
          <p className="text-lg font-bold text-blue-600">8 yrs</p>
          <p className="text-xs text-slate-500">Experience</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-purple-600">95%</p>
          <p className="text-xs text-slate-500">Performance</p>
        </div>
      </div>
    </div>
  )
}
