'use client'

import { useState } from 'react'
import { X, FileText } from 'lucide-react'
import { generateLeavePDF, leaveTemplates } from '@/lib/leave-pdf'

interface LeaveModalProps {
  isOpen: boolean
  onClose: () => void
  employeeData: {
    name: string
    employeeId: string
    designation: string
    department: string
  }
}

export default function LeaveModal({ isOpen, onClose, employeeData }: LeaveModalProps) {
  const [selectedLeaveType, setSelectedLeaveType] = useState<string>('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  if (!isOpen) return null

  const leaveTypes = [
    { id: 'sick', label: 'Sick Leave', color: 'from-red-100 to-red-50', icon: '🤒' },
    { id: 'cultural', label: 'Marriage/Cultural Leave', color: 'from-purple-100 to-purple-50', icon: '💍' },
    { id: 'planning', label: 'Personal Planning Leave', color: 'from-blue-100 to-blue-50', icon: '📋' },
    { id: 'emergency', label: 'Emergency Leave', color: 'from-orange-100 to-orange-50', icon: '🚨' },
    { id: 'other', label: 'Other', color: 'from-gray-100 to-gray-50', icon: '📝' }
  ]

  const handleApply = async () => {
    if (!selectedLeaveType) return

    generateLeavePDF({
      name: employeeData.name,
      employeeId: employeeData.employeeId,
      designation: employeeData.designation,
      department: employeeData.department,
      leaveType: selectedLeaveType
    })

    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setSelectedLeaveType('')
      onClose()
    }, 2000)
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-200"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-white" />
              <h2 className="text-xl font-bold text-white">Apply for Leave</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center py-12 space-y-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-25" />
                  <div className="relative w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-3xl">✓</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900">Leave Applied Successfully!</h3>
                <p className="text-slate-600 text-center">Your leave application has been submitted and PDF generated.</p>
              </div>
            ) : (
              <>
                <p className="text-slate-600">Select the type of leave you want to apply for:</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {leaveTypes.map((leave) => (
                    <button
                      key={leave.id}
                      onClick={() => setSelectedLeaveType(leave.id)}
                      className={`p-4 rounded-2xl border-2 transition-all duration-200 ${
                        selectedLeaveType === leave.id
                          ? 'border-blue-600 bg-gradient-to-br ' + leave.color
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{leave.icon}</span>
                        <div className="text-left">
                          <p className={`font-semibold ${selectedLeaveType === leave.id ? 'text-slate-900' : 'text-slate-700'}`}>
                            {leave.label}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                {selectedLeaveType && (
                  <div className="bg-blue-50 rounded-2xl p-4 border border-blue-200">
                    <h4 className="font-semibold text-slate-900 mb-2">Template Preview:</h4>
                    <p className="text-sm text-slate-700 whitespace-pre-wrap">
                      {leaveTemplates[selectedLeaveType as keyof typeof leaveTemplates]?.body}
                    </p>
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={onClose}
                    className="flex-1 px-6 py-3 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleApply}
                    disabled={!selectedLeaveType}
                    className={`flex-1 px-6 py-3 rounded-xl font-semibold text-white transition-all ${
                      selectedLeaveType
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg hover:scale-105'
                        : 'bg-slate-300 cursor-not-allowed'
                    }`}
                  >
                    Apply & Download PDF
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
