'use client'

import { Clock, Check, AlertCircle } from 'lucide-react'
import { useState } from 'react'
import { CheckCircle2 } from 'lucide-react'

export default function ChangeTimeline({ changes }: { changes: any[] }) {
  const [isApproved, setIsApproved] = useState(false)
  const [showApprovalModal, setShowApprovalModal] = useState(false)
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false)

  const handleApprove = () => {
    setShowApprovalModal(true)
  }

  const confirmApproval = () => {
    setShowApprovalModal(false)
    setShowSuccessAnimation(true)
    setTimeout(() => {
      setIsApproved(true)
      setTimeout(() => {
        setShowSuccessAnimation(false)
      }, 500)
    }, 500)
  }

  return (
    <>
      <div className="rounded-3xl bg-white/60 backdrop-blur-sm border border-slate-200/50 p-6 shadow-lg hover:shadow-xl transition-all duration-300 sticky top-24">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Change Timeline</h3>

        <div className="space-y-4">
          {changes.length === 0 ? (
            <div className="text-center py-8">
              <Clock className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="text-sm text-slate-500">No changes yet</p>
            </div>
          ) : (
            changes.slice().reverse().map((change, idx) => (
              <div key={idx} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <Check className="w-4 h-4 text-blue-600" />
                  </div>
                  {idx < changes.length - 1 && (
                    <div className="w-0.5 h-8 bg-blue-200 mt-2" />
                  )}
                </div>
                <div className="flex-1 pb-4">
                  <p className="text-sm font-semibold text-slate-900 capitalize">
                    {change.field} updated
                  </p>
                  <p className="text-xs text-slate-600">
                    {change.value}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    {change.timestamp?.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))
          )}

          {/* Submission History */}
          <div className="pt-4 border-t border-slate-200/50 space-y-2">
            <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Recent Actions</p>
            <div className="text-xs text-slate-600 space-y-1">
              <p>✓ Created on Nov 1, 2024</p>
              <p>✓ Last modified Nov 15, 2024</p>
              {isApproved ? (
                <p className="text-green-600 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  Approved on {new Date().toLocaleDateString()}
                </p>
              ) : (
                <>
                  <p>• Pending approval</p>
                  <button
                    onClick={handleApprove}
                    className="mt-3 w-full px-4 py-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
                  >
                    Approve Now
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {showApprovalModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full animate-in fade-in scale-95 duration-200">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-yellow-100 mx-auto mb-4">
              <AlertCircle className="w-6 h-6 text-yellow-600" />
            </div>
            <h3 className="text-lg font-bold text-center text-slate-900 mb-2">Approve Salary Slip?</h3>
            <p className="text-sm text-slate-600 text-center mb-6">
              Are you sure you want to approve this salary slip? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowApprovalModal(false)}
                className="flex-1 px-4 py-2 rounded-lg border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={confirmApproval}
                className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold hover:shadow-lg transition-all duration-200"
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      )}

      {showSuccessAnimation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="relative">
            <CheckCircle2 className="w-20 h-20 text-green-500 animate-bounce" />
            <div className="absolute inset-0 w-20 h-20 border-4 border-green-500 rounded-full animate-ping" />
          </div>
        </div>
      )}
    </>
  )
}
