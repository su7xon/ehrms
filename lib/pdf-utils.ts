import jsPDF from 'jspdf'

interface EmployeePayroll {
  id: string
  name: string
  department: string
  designation: string
  salaryComponents: {
    basic: number
    hra: number
    da: number
    allowances: number
    pfPercent: number
    tdsPercent: number
    otherDeductions: number
  }
}

export function generatePayrollPDF(employees: EmployeePayroll[], month: string = 'November 2024') {
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()

  
  // Header
  doc.setFontSize(20)
  doc.setTextColor(15, 23, 42)
  doc.text('GOVERNMENT OF UTTAR PRADESH', pageWidth / 2, 15, { align: 'center' })

  doc.setFontSize(14)
  doc.setTextColor(30, 58, 138)
  doc.text('PAYROLL REPORT', pageWidth / 2, 25, { align: 'center' })

  doc.setFontSize(10)
  doc.setTextColor(100, 116, 139)
  doc.text(`Month: ${month}`, pageWidth / 2, 32, { align: 'center' })
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, pageWidth / 2, 38, { align: 'center' })

  const columns = ['Employee', 'Department', 'Designation', 'Gross', 'PF', 'TDS', 'Net']
  const columnWidths = [30, 25, 25, 20, 18, 18, 18]
  
  let startY = 45
  const rowHeight = 8
  const headerBackgroundColor = [30, 58, 138]
  const headerTextColor = [255, 255, 255]
  const alternateRowColor = [240, 245, 250]
  
  // Draw table header
  doc.setFillColor(...headerBackgroundColor)
  doc.setTextColor(...headerTextColor)
  doc.setFontSize(9)
  doc.setFont(undefined, 'bold')
  
  let currentX = 10
  columns.forEach((col, idx) => {
    doc.rect(currentX, startY, columnWidths[idx], rowHeight, 'F')
    doc.text(col, currentX + 2, startY + 5, { maxWidth: columnWidths[idx] - 4 })
    currentX += columnWidths[idx]
  })

  startY += rowHeight

  // Calculate totals and prepare data
  let totalGross = 0
  let totalPF = 0
  let totalTDS = 0
  let totalNet = 0
  const tableData: any[] = []

  employees.forEach((emp) => {
    const gross = emp.salaryComponents.basic + emp.salaryComponents.hra + emp.salaryComponents.da + emp.salaryComponents.allowances
    const pf = (emp.salaryComponents.basic * emp.salaryComponents.pfPercent) / 100
    const tds = (gross * emp.salaryComponents.tdsPercent) / 100
    const net = gross - pf - tds - emp.salaryComponents.otherDeductions

    totalGross += gross
    totalPF += pf
    totalTDS += tds
    totalNet += net

    tableData.push({
      name: emp.name.substring(0, 15),
      dept: emp.department.substring(0, 12),
      desig: emp.designation.substring(0, 12),
      gross: `₹${(gross).toLocaleString('en-IN', { maximumFractionDigits: 0 })}`,
      pf: `₹${(pf).toLocaleString('en-IN', { maximumFractionDigits: 0 })}`,
      tds: `₹${(tds).toLocaleString('en-IN', { maximumFractionDigits: 0 })}`,
      net: `₹${(net).toLocaleString('en-IN', { maximumFractionDigits: 0 })}`
    })
  })

  // Draw data rows
  doc.setFont(undefined, 'normal')
  doc.setTextColor(0, 0, 0)
  let rowIndex = 0
  
  tableData.forEach((row, idx) => {
    // Alternate row colors
    if (idx % 2 === 1) {
      doc.setFillColor(...alternateRowColor)
      currentX = 10
      columns.forEach((_, colIdx) => {
        doc.rect(currentX, startY, columnWidths[colIdx], rowHeight, 'F')
        currentX += columnWidths[colIdx]
      })
    }
    
    // Draw row borders and text
    currentX = 10
    doc.setDrawColor(200, 200, 200)
    doc.setLineWidth(0.3)
    const rowValues = [row.name, row.dept, row.desig, row.gross, row.pf, row.tds, row.net]
    
    rowValues.forEach((val, colIdx) => {
      doc.rect(currentX, startY, columnWidths[colIdx], rowHeight)
      doc.setFontSize(8)
      doc.text(String(val), currentX + 2, startY + 5, { maxWidth: columnWidths[colIdx] - 4 })
      currentX += columnWidths[colIdx]
    })
    
    startY += rowHeight
    rowIndex++

    // Add new page if needed
    if (startY > pageHeight - 30) {
      doc.addPage()
      startY = 10
    }
  })

  // Draw totals row
  doc.setFillColor(15, 23, 42)
  doc.setTextColor(255, 255, 255)
  doc.setFont(undefined, 'bold')
  doc.setFontSize(9)
  
  currentX = 10
  const totalsValues = [
    'TOTAL',
    '',
    '',
    `₹${totalGross.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`,
    `₹${totalPF.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`,
    `₹${totalTDS.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`,
    `₹${totalNet.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`
  ]
  
  totalsValues.forEach((val, idx) => {
    doc.rect(currentX, startY, columnWidths[idx], rowHeight, 'F')
    doc.text(String(val), currentX + 2, startY + 5, { maxWidth: columnWidths[idx] - 4 })
    currentX += columnWidths[idx]
  })

  // Footer
  startY += rowHeight + 10
  doc.setFontSize(9)
  doc.setTextColor(100, 116, 139)
  doc.setFont(undefined, 'normal')
  doc.text('This is an automatically generated document from Government HR Management System.', pageWidth / 2, startY, { align: 'center' })

  // Save PDF
  doc.save(`Payroll_Report_${new Date().toISOString().split('T')[0]}.pdf`)
}
