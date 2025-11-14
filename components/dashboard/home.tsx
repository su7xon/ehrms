'use client'

import { useState, useContext } from 'react'
import { useRouter } from 'next/navigation'
import { Bell, MessageCircle, Settings, LogOut, MoreVertical, Download, FileText, MessageSquare, Phone } from 'lucide-react'
import { motion } from 'framer-motion'
import EmployeeProfileCard from '@/components/cards/employee-profile'
import SalaryCard from '@/components/cards/salary-summary'
import QuickActions from '@/components/cards/quick-actions'
import DepartmentCard from '@/components/cards/department-contact'
import LeaveModal from '@/components/modals/leave-modal'
import DocumentsModal from '@/components/modals/documents-modal'
import { generateSalarySlipPDF } from '@/lib/salary-slip-pdf'
import { AppContext } from '@/components/context/AppContext'

export default function DashboardHome() {
  const [showMenu, setShowMenu] = useState(false)
  const [showLeaveModal, setShowLeaveModal] = useState(false)
  const [showDocumentsModal, setShowDocumentsModal] = useState(false)
  const router = useRouter()
  const context = useContext(AppContext)
  const selectedEmployee = context?.selectedEmployee

  const handleLogout = () => {
    context?.setSelectedEmployee(null)
    router.push('/login')
  }

  const handleDownloadSalarySlip = () => {
    if (selectedEmployee) {
      generateSalarySlipPDF({
        name: selectedEmployee.name,
        employeeId: selectedEmployee.id,
        department: selectedEmployee.department,
        designation: selectedEmployee.designation,
        month: new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }),
        earnings: [
          { label: 'Basic Salary', value: selectedEmployee.salaryComponents.basic.toLocaleString('en-IN') },
          { label: 'DA (Dearness Allowance)', value: selectedEmployee.salaryComponents.da.toLocaleString('en-IN') },
          { label: 'HRA (House Rent Allowance)', value: selectedEmployee.salaryComponents.hra.toLocaleString('en-IN') },
          { label: 'TA (Travel Allowance)', value: selectedEmployee.salaryComponents.ta.toLocaleString('en-IN') }
        ],
        deductions: [
          { label: 'PF (Provident Fund)', value: (selectedEmployee.salaryComponents.basic * 0.12).toLocaleString('en-IN', { maximumFractionDigits: 0 }) },
          { label: 'Income Tax', value: (selectedEmployee.salary * 0.1).toLocaleString('en-IN', { maximumFractionDigits: 0 }) }
        ],
        netSalary: (selectedEmployee.salary - (selectedEmployee.salaryComponents.basic * 0.12) - (selectedEmployee.salary * 0.1)).toLocaleString('en-IN', { maximumFractionDigits: 0 })
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-slate-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-black">
              Smart eHRMS
            </h1>
            <p className="text-xs text-slate-500">Government Employee Portal</p>
          </div>

          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-slate-100 rounded-xl transition-all duration-200 relative group">
              <Bell className="w-5 h-5 text-slate-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            </button>

            <button className="p-2 hover:bg-slate-100 rounded-xl transition-all duration-200">
              <Settings className="w-5 h-5 text-slate-600" />
            </button>

            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 hover:bg-slate-100 rounded-xl transition-all duration-200"
              >
                <MoreVertical className="w-5 h-5 text-slate-600" />
              </button>
              {showMenu && (
                <div className="absolute top-full right-0 mt-2 w-40 bg-white rounded-xl shadow-lg overflow-hidden">
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-sm text-slate-600 hover:bg-slate-50 flex items-center gap-2 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Welcome Section */}
        <motion.div 
          className="space-y-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-slate-900">Welcome back, {selectedEmployee?.name || 'Employee'}</h2>
          <p className="text-slate-600">Here's your HR summary for today</p>
        </motion.div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile & Status */}
          <motion.div 
            className="lg:col-span-1 space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <EmployeeProfileCard />
          </motion.div>

          {/* Middle Column - Summary Cards */}
          <motion.div 
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <SalaryCard />
            <QuickActions />
          </motion.div>
        </div>

        {/* Bottom Row - Actions & Contact */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <DepartmentCard />
          
          {/* Quick Links */}
          <motion.div 
            className="space-y-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-sm font-semibold text-slate-700">Quick Access</h3>
            <div className="grid grid-cols-2 gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDownloadSalarySlip}
                className="p-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-slate-200/50 hover:bg-white hover:shadow-lg transition-all duration-300 group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-semibold text-slate-900">Salary Slip</p>
                    <p className="text-xs text-slate-500">Download PDF</p>
                  </div>
                </div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowDocumentsModal(true)}
                className="p-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-slate-200/50 hover:bg-white hover:shadow-lg transition-all duration-300 group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-100 to-purple-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Download className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-semibold text-slate-900">Documents</p>
                    <p className="text-xs text-slate-500">All Files</p>
                  </div>
                </div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowLeaveModal(true)}
                className="p-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-slate-200/50 hover:bg-white hover:shadow-lg transition-all duration-300 group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-100 to-cyan-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MessageSquare className="w-5 h-5 text-cyan-600" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-semibold text-slate-900">Apply Leave</p>
                    <p className="text-xs text-slate-500">Request Time Off</p>
                  </div>
                </div>
              </motion.button>

              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-slate-200/50 hover:bg-white hover:shadow-lg transition-all duration-300 group"
              >  <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-100 to-amber-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Phone className="w-5 h-5 text-amber-600" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-semibold text-slate-900">Support</p>
                    <p className="text-xs text-slate-500">Contact HR</p>
                  </div>
                </div>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </main>

      {/* Leave Modal */}
      <LeaveModal
        isOpen={showLeaveModal}
        onClose={() => setShowLeaveModal(false)}
        employeeData={{
          name: selectedEmployee?.name || '',
          employeeId: selectedEmployee?.id || '',
          designation: selectedEmployee?.designation || '',
          department: selectedEmployee?.department || ''
        }}
      />

      {/* Documents Modal */}
      <DocumentsModal
        isOpen={showDocumentsModal}
        onClose={() => setShowDocumentsModal(false)}
      />
    </div>
  )
}
