'use client'

import React, { createContext, useState, useEffect } from 'react'

export const AppContext = createContext<any>(null)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [employees, setEmployees] = useState([])
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [payrollDraft, setPayrollDraft] = useState<any>(null)
  const [lastReport, setLastReport] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const demoEmployees = [
      {
        id: 'EMP001',
        name: 'Rajesh Kumar',
        phone: '9876543210',
        email: 'rajesh.kumar@up.gov.in',
        department: 'Human Resources',
        designation: 'Senior HR Manager',
        joinDate: '2018-03-15',
        salary: 65000,
        salaryComponents: {
          basic: 45000,
          da: 10000,
          hra: 8000,
          ta: 2000
        }
      },
      {
        id: 'EMP002',
        name: 'Priya Singh',
        phone: '9876543211',
        email: 'priya.singh@up.gov.in',
        department: 'Finance',
        designation: 'Finance Officer',
        joinDate: '2019-06-20',
        salary: 55000,
        salaryComponents: {
          basic: 38000,
          da: 8500,
          hra: 7000,
          ta: 1500
        }
      },
      {
        id: 'EMP003',
        name: 'Amit Patel',
        phone: '9876543212',
        email: 'amit.patel@up.gov.in',
        department: 'IT Department',
        designation: 'Software Developer',
        joinDate: '2020-01-10',
        salary: 50000,
        salaryComponents: {
          basic: 35000,
          da: 7500,
          hra: 5500,
          ta: 2000
        }
      },
      {
        id: 'EMP004',
        name: 'Neha Gupta',
        phone: '9876543213',
        email: 'neha.gupta@up.gov.in',
        department: 'Administration',
        designation: 'Administrative Officer',
        joinDate: '2017-11-05',
        salary: 52000,
        salaryComponents: {
          basic: 36000,
          da: 8000,
          hra: 6000,
          ta: 2000
        }
      },
      {
        id: 'EMP005',
        name: 'Vikram Sharma',
        phone: '9876543214',
        email: 'vikram.sharma@up.gov.in',
        department: 'Operations',
        designation: 'Operations Manager',
        joinDate: '2016-08-22',
        salary: 62000,
        salaryComponents: {
          basic: 42000,
          da: 9500,
          hra: 8000,
          ta: 2500
        }
      }
    ]

    setEmployees(demoEmployees)
    if (demoEmployees.length) {
      setSelectedEmployee(demoEmployees[0])
      setPayrollDraft({
        employeeId: demoEmployees[0].id,
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
        components: demoEmployees[0].salaryComponents
      })
    }
  }, [])

  return (
    <AppContext.Provider value={{
      employees,
      selectedEmployee,
      setSelectedEmployee,
      payrollDraft,
      setPayrollDraft,
      lastReport,
      setLastReport,
      loading,
      setLoading
    }}>
      {children}
    </AppContext.Provider>
  )
}
