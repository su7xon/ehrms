'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, Download } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import PayrollTable from '@/components/payroll/table'
import SalaryCalculator from '@/components/payroll/calculator'
import ComplianceIndicator from '@/components/payroll/compliance'
import { generatePayrollPDF } from '@/lib/pdf-utils'

export default function PayrollPage() {
  const [payrollData, setPayrollData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)
  const [exporting, setExporting] = useState(false)

  useEffect(() => {
    const fetchPayroll = async () => {
      try {
        const res = await fetch('/api/payroll/list')
        const data = await res.json()
        if (data.ok) {
          setPayrollData(data.employees)
        }
      } catch (error) {
        console.error('Error fetching payroll:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchPayroll()
  }, [])

  const handleGenerateSalaries = async () => {
    setGenerating(true)
    try {
      const res = await fetch('/api/payroll/generate', {
        method: 'POST'
      })
      const data = await res.json()
      if (data.ok) {
        alert(`Generated ${data.count} salary slips`)
      }
    } catch (error) {
      console.error('Error generating salaries:', error)
    } finally {
      setGenerating(false)
    }
  }

  const handleExportPDF = async () => {
    setExporting(true)
    try {
      if (payrollData.length === 0) {
        alert('No payroll data to export')
        return
      }
      generatePayrollPDF(payrollData, 'November 2024')
    } catch (error) {
      console.error('Error exporting PDF:', error)
      alert('Failed to export PDF')
    } finally {
      setExporting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-slate-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <button className="p-2 hover:bg-slate-100 rounded-xl transition-all duration-200">
                <ChevronLeft className="w-5 h-5 text-slate-600" />
              </button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Payroll Management</h1>
              <p className="text-xs text-slate-500">Salary components & calculations</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={handleExportPDF}
              disabled={exporting || payrollData.length === 0}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2 disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              {exporting ? 'Exporting...' : 'Export Report'}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Top Stats */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {[
            { label: 'Basic Salary', value: '₹50,000', color: 'from-blue-100 to-blue-50', textColor: 'text-blue-600' },
            { label: 'HRA', value: '₹15,000', color: 'from-purple-100 to-purple-50', textColor: 'text-purple-600' },
            { label: 'DA', value: '₹10,000', color: 'from-cyan-100 to-cyan-50', textColor: 'text-cyan-600' },
            { label: 'Total Gross', value: '₹75,000', color: 'from-amber-100 to-amber-50', textColor: 'text-amber-600' },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className={`p-4 rounded-2xl bg-gradient-to-br ${stat.color} border border-slate-200/50 hover:shadow-lg transition-all duration-300`}
            >
              <p className="text-xs text-slate-600 font-medium uppercase tracking-wider">{stat.label}</p>
              <p className={`text-2xl font-bold ${stat.textColor} mt-2`}>{stat.value}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Compliance & Calculator */}
          <motion.div 
            className="lg:col-span-1 space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <ComplianceIndicator />
            <SalaryCalculator />
          </motion.div>

          {/* Right Column - Table & Actions */}
          <motion.div 
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <PayrollTable />

            {/* Generate Button */}
            <div className="rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 p-8 shadow-2xl text-white overflow-hidden relative group hover:shadow-2xl transition-all duration-500">
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all" />
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold">Generate Salary</h3>
                  <p className="text-sm text-white/70 mt-1">Generate salary for Nov 2024</p>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleGenerateSalaries}
                  disabled={generating}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50"
                >
                  {generating ? 'Generating...' : 'Generate'}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
