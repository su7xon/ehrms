'use client'

import { Download, Share2 } from 'lucide-react'
import { useState } from 'react'
import { generateSalarySlipPDF } from '@/lib/salary-slip-pdf'
import ShareModal from '@/components/salary-slip/share-modal'

export default function SalarySlipPreview() {
  const [isDownloading, setIsDownloading] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)

  const handleDownloadPDF = async () => {
    setIsDownloading(true)
    try {
      generateSalarySlipPDF({
        name: 'Rajesh Kumar',
        employeeId: 'EMP-2024-7841',
        department: 'Administration',
        designation: 'Senior Admin Officer',
        month: 'November 2024',
        earnings: [
          { label: 'Basic Salary', value: '50,000' },
          { label: 'House Rent Allowance', value: '15,000' },
          { label: 'Dearness Allowance', value: '10,000' },
        ],
        deductions: [
          { label: 'Provident Fund', value: '5,000' },
          { label: 'Income Tax', value: '3,500' },
          { label: 'Health Insurance', value: '1,200' },
        ],
        netSalary: '65,300',
      })
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Preview Card */}
      <div className="rounded-3xl bg-white/60 backdrop-blur-sm border border-slate-200/50 p-8 shadow-lg hover:shadow-xl transition-all duration-300">
        {/* Header */}
        <div className="text-center border-b border-slate-200 pb-6 mb-6">
          <h2 className="text-2xl font-bold text-slate-900">SALARY SLIP</h2>
          <p className="text-sm text-slate-600">November 2024</p>
        </div>

        {/* Employee Details */}
        <div className="grid grid-cols-2 gap-6 mb-6 pb-6 border-b border-slate-200">
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider">Employee Name</p>
            <p className="text-sm font-bold text-slate-900 mt-1">Rajesh Kumar</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider">Employee ID</p>
            <p className="text-sm font-bold text-slate-900 mt-1">EMP-2024-7841</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider">Department</p>
            <p className="text-sm font-bold text-slate-900 mt-1">Administration</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider">Designation</p>
            <p className="text-sm font-bold text-slate-900 mt-1">Senior Admin Officer</p>
          </div>
        </div>

        {/* Salary Components */}
        <div className="space-y-6">
          {/* Earnings */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">Earnings</h3>
            <div className="space-y-2">
              {[
                { label: 'Basic Salary', value: '50,000' },
                { label: 'House Rent Allowance', value: '15,000' },
                { label: 'Dearness Allowance', value: '10,000' },
              ].map((item, idx) => (
                <div key={idx} className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-sm text-slate-700">{item.label}</span>
                  <span className="text-sm font-semibold text-slate-900">₹{item.value}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between py-2 mt-2 font-semibold text-blue-600">
              <span>Total Earnings</span>
              <span>₹75,000</span>
            </div>
          </div>

          {/* Deductions */}
          <div className="pt-4 border-t border-slate-200">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">Deductions</h3>
            <div className="space-y-2">
              {[
                { label: 'Provident Fund', value: '5,000' },
                { label: 'Income Tax', value: '3,500' },
                { label: 'Health Insurance', value: '1,200' },
              ].map((item, idx) => (
                <div key={idx} className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-sm text-slate-700">{item.label}</span>
                  <span className="text-sm font-semibold text-slate-900">₹{item.value}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between py-2 mt-2 font-semibold text-red-600">
              <span>Total Deductions</span>
              <span>₹9,700</span>
            </div>
          </div>

          {/* Net Salary */}
          <div className="pt-4 border-t border-slate-200 bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl">
            <div className="flex justify-between">
              <span className="text-lg font-bold text-slate-900">Net Salary</span>
              <span className="text-2xl font-bold text-green-600">₹65,300</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-6 border-t border-slate-200 text-center">
          <p className="text-xs text-slate-500">This is a digitally generated salary slip</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={handleDownloadPDF}
          disabled={isDownloading}
          className="flex-1 px-4 py-3 rounded-xl bg-white/60 backdrop-blur-sm border border-slate-200/50 text-slate-900 font-semibold hover:bg-white hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <Download className="w-4 h-4" />
          {isDownloading ? 'Downloading...' : 'Download PDF'}
        </button>
        <button
          onClick={() => setShowShareModal(true)}
          className="flex-1 px-4 py-3 rounded-xl bg-white/60 backdrop-blur-sm border border-slate-200/50 text-slate-900 font-semibold hover:bg-white hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
        >
          <Share2 className="w-4 h-4" />
          Share
        </button>
      </div>

      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        employeeName="Rajesh Kumar"
        month="November 2024"
        netSalary="65,300"
      />
    </div>
  )
}
