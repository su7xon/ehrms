export const DB: any = globalThis.DB || {
  employees: [
    {
      id: "emp_001",
      name: "Asha Sharma",
      avatar: "https://i.pravatar.cc/150?img=32",
      department: "Health",
      designation: "Staff Nurse",
      salaryComponents: {
        basic: 50000,
        hra: 15000,
        da: 10000,
        allowances: 0,
        pfPercent: 12,
        tdsPercent: 0,
        otherDeductions: 0
      }
    },
    {
      id: "emp_002",
      name: "Ravi Kumar",
      avatar: "https://i.pravatar.cc/150?img=12",
      department: "Education",
      designation: "Assistant Teacher",
      salaryComponents: {
        basic: 30000,
        hra: 9000,
        da: 5000,
        allowances: 2000,
        pfPercent: 12,
        tdsPercent: 0,
        otherDeductions: 0
      }
    },
    {
      id: "emp_003",
      name: "Priya Singh",
      avatar: "https://i.pravatar.cc/150?img=45",
      department: "IT",
      designation: "Software Developer",
      salaryComponents: {
        basic: 75000,
        hra: 22500,
        da: 15000,
        allowances: 5000,
        pfPercent: 12,
        tdsPercent: 5,
        otherDeductions: 1000
      }
    },
    {
      id: "emp_004",
      name: "Vikram Patel",
      avatar: "https://i.pravatar.cc/150?img=23",
      department: "Finance",
      designation: "Accountant",
      salaryComponents: {
        basic: 45000,
        hra: 13500,
        da: 9000,
        allowances: 1500,
        pfPercent: 12,
        tdsPercent: 0,
        otherDeductions: 500
      }
    },
    {
      id: "emp_005",
      name: "Neha Gupta",
      avatar: "https://i.pravatar.cc/150?img=67",
      department: "Administration",
      designation: "Office Manager",
      salaryComponents: {
        basic: 40000,
        hra: 12000,
        da: 8000,
        allowances: 2000,
        pfPercent: 12,
        tdsPercent: 0,
        otherDeductions: 0
      }
    }
  ],
  generatedSlips: [],
  lastAudit: null
}

if (!(globalThis as any).DB) {
  (globalThis as any).DB = DB
}

export default DB
