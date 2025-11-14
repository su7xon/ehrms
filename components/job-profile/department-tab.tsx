'use client'

import { Users, Phone, Mail, MapPin, Globe } from 'lucide-react'
import { useContext, useState } from 'react'
import { AppContext } from '@/components/context/AppContext'

export default function DepartmentTab({ isEditing }: { isEditing: boolean }) {
  const { currentEmployee, setCurrentEmployee } = useContext(AppContext) as any

  const [editData, setEditData] = useState({
    departmentHead: currentEmployee?.departmentHead || 'Vikram Singh',
    reportingManager: currentEmployee?.reportingManager || 'Anita Sharma',
    departmentPhone: currentEmployee?.departmentPhone || '+91-522-2248-999',
    departmentEmail: currentEmployee?.departmentEmail || 'admin@upsdc.gov.in',
    location: currentEmployee?.location || 'Lucknow, Uttar Pradesh',
  })

  const handleChange = (field: string, value: string) => {
    setEditData(prev => ({ ...prev, [field]: value }))
    setCurrentEmployee(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white/60 backdrop-blur-sm border border-slate-200/50 p-8 shadow-lg hover:shadow-xl transition-all duration-300">
        <h3 className="text-2xl font-bold text-slate-900 mb-6">Department: {currentEmployee?.department || 'Administration & General Services'}</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <p className="text-xs text-slate-600 uppercase tracking-wider font-semibold">Department Head</p>
              {isEditing ? (
                <input
                  type="text"
                  value={editData.departmentHead}
                  onChange={(e) => handleChange('departmentHead', e.target.value)}
                  className="w-full px-3 py-2 mt-2 rounded-lg border border-slate-300 text-sm font-semibold bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-lg font-bold text-slate-900 mt-2">{editData.departmentHead}</p>
              )}
            </div>

            <div>
              <p className="text-xs text-slate-600 uppercase tracking-wider font-semibold">Reporting Manager</p>
              {isEditing ? (
                <input
                  type="text"
                  value={editData.reportingManager}
                  onChange={(e) => handleChange('reportingManager', e.target.value)}
                  className="w-full px-3 py-2 mt-2 rounded-lg border border-slate-300 text-sm font-semibold bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-lg font-bold text-slate-900 mt-2">{editData.reportingManager}</p>
              )}
            </div>

            <div>
              <p className="text-xs text-slate-600 uppercase tracking-wider font-semibold">Team Size</p>
              <p className="text-lg font-bold text-slate-900 mt-2">42 Employees</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50 border border-blue-100">
              <Phone className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-slate-600 uppercase tracking-wider font-semibold">Department Phone</p>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.departmentPhone}
                    onChange={(e) => handleChange('departmentPhone', e.target.value)}
                    className="w-full px-2 py-1 mt-1 rounded text-sm font-semibold bg-white border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-sm font-semibold text-slate-900">{editData.departmentPhone}</p>
                )}
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-purple-50 border border-purple-100">
              <Mail className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-slate-600 uppercase tracking-wider font-semibold">Email</p>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.departmentEmail}
                    onChange={(e) => handleChange('departmentEmail', e.target.value)}
                    className="w-full px-2 py-1 mt-1 rounded text-sm font-semibold bg-white border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                ) : (
                  <p className="text-sm font-semibold text-slate-900">{editData.departmentEmail}</p>
                )}
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-cyan-50 border border-cyan-100">
              <MapPin className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-slate-600 uppercase tracking-wider font-semibold">Location</p>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.location}
                    onChange={(e) => handleChange('location', e.target.value)}
                    className="w-full px-2 py-1 mt-1 rounded text-sm font-semibold bg-white border border-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                ) : (
                  <p className="text-sm font-semibold text-slate-900">{editData.location}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Members */}
      <div className="rounded-2xl bg-white/60 backdrop-blur-sm border border-slate-200/50 p-6 shadow-sm">
        <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-blue-600" />
          Team Members ({3})
        </h3>
        <div className="space-y-3">
          {[
            { name: 'Anita Sharma', role: 'Manager', status: 'active' },
            { name: 'Priya Patel', role: 'Officer', status: 'active' },
            { name: 'Rohan Singh', role: 'Officer', status: 'inactive' },
          ].map((member, idx) => (
            <div key={idx} className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between hover:bg-blue-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center text-white font-bold text-sm">
                  {member.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{member.name}</p>
                  <p className="text-xs text-slate-600">{member.role}</p>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                member.status === 'active'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-slate-100 text-slate-600'
              }`}>
                {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
