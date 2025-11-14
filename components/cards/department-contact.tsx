'use client'

import { Phone, Mail, MapPin, Users } from 'lucide-react'

export default function DepartmentCard() {
  return (
    <div className="rounded-3xl bg-white/60 backdrop-blur-sm border border-slate-200/50 p-6 shadow-lg hover:shadow-xl transition-all duration-300">
      <h3 className="text-lg font-bold text-slate-900 mb-4">Department Contact</h3>

      <div className="space-y-4">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center flex-shrink-0">
            <Users className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider">Department</p>
            <p className="text-sm font-semibold text-slate-900">Administration & General Services</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-100 to-purple-50 flex items-center justify-center flex-shrink-0">
            <Users className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider">Head</p>
            <p className="text-sm font-semibold text-slate-900">Vikram Singh</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-100 to-cyan-50 flex items-center justify-center flex-shrink-0">
            <Phone className="w-5 h-5 text-cyan-600" />
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider">Phone</p>
            <p className="text-sm font-semibold text-slate-900">+91-522-2248-999</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-100 to-amber-50 flex items-center justify-center flex-shrink-0">
            <Mail className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider">Email</p>
            <p className="text-sm font-semibold text-slate-900">admin@upsdc.gov.in</p>
          </div>
        </div>
      </div>
    </div>
  )
}
