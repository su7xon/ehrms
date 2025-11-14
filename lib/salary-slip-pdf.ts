import jsPDF from 'jspdf';

export function generateSalarySlipPDF(employeeData: {
  name: string;
  employeeId: string;
  department: string;
  designation: string;
  month: string;
  earnings: Array<{ label: string; value: string }>;
  deductions: Array<{ label: string; value: string }>;
  netSalary: string;
}) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  let yPosition = 15;

  // Header
  doc.setFontSize(20);
  doc.setTextColor(15, 23, 42);
  doc.text('SALARY SLIP', pageWidth / 2, yPosition, { align: 'center' });
  
  yPosition += 8;
  doc.setFontSize(10);
  doc.setTextColor(100, 116, 139);
  doc.text(`${employeeData.month}`, pageWidth / 2, yPosition, { align: 'center' });

  yPosition += 15;
  doc.setLineWidth(0.5);
  doc.setDrawColor(226, 232, 240);
  doc.line(15, yPosition, pageWidth - 15, yPosition);

  // Employee Details
  yPosition += 8;
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  
  const details = [
    { label: 'Employee Name', value: employeeData.name },
    { label: 'Employee ID', value: employeeData.employeeId },
    { label: 'Department', value: employeeData.department },
    { label: 'Designation', value: employeeData.designation },
  ];

  details.forEach((detail, idx) => {
    if (idx % 2 === 0) {
      doc.text(`${detail.label}:`, 15, yPosition);
      doc.setTextColor(51, 65, 85);
      doc.text(detail.value, 60, yPosition);
      doc.setTextColor(15, 23, 42);
    } else {
      doc.text(`${detail.label}:`, 120, yPosition);
      doc.setTextColor(51, 65, 85);
      doc.text(detail.value, 165, yPosition);
      doc.setTextColor(15, 23, 42);
      yPosition += 8;
    }
  });

  yPosition += 10;
  doc.line(15, yPosition, pageWidth - 15, yPosition);

  // Earnings Section
  yPosition += 8;
  doc.setFontSize(11);
  doc.setFont(undefined, 'bold');
  doc.text('EARNINGS', 15, yPosition);
  doc.setFont(undefined, 'normal');

  yPosition += 7;
  let totalEarnings = 0;
  employeeData.earnings.forEach((item) => {
    doc.setFontSize(9);
    doc.setTextColor(51, 65, 85);
    doc.text(item.label, 15, yPosition);
    const value = parseFloat(item.value.replace(/,/g, ''));
    totalEarnings += value;
    doc.setTextColor(15, 23, 42);
    doc.text(`₹${item.value}`, pageWidth - 25, yPosition, { align: 'right' });
    yPosition += 6;
  });

  yPosition += 2;
  doc.setLineWidth(0.3);
  doc.line(15, yPosition, pageWidth - 15, yPosition);
  yPosition += 5;
  doc.setFont(undefined, 'bold');
  doc.setTextColor(37, 99, 235);
  doc.text('Total Earnings', 15, yPosition);
  doc.text(`₹${totalEarnings.toLocaleString('en-IN')}`, pageWidth - 25, yPosition, { align: 'right' });

  // Deductions Section
  yPosition += 12;
  doc.setTextColor(15, 23, 42);
  doc.setFont(undefined, 'bold');
  doc.setFontSize(11);
  doc.text('DEDUCTIONS', 15, yPosition);
  doc.setFont(undefined, 'normal');

  yPosition += 7;
  let totalDeductions = 0;
  employeeData.deductions.forEach((item) => {
    doc.setFontSize(9);
    doc.setTextColor(51, 65, 85);
    doc.text(item.label, 15, yPosition);
    const value = parseFloat(item.value.replace(/,/g, ''));
    totalDeductions += value;
    doc.setTextColor(15, 23, 42);
    doc.text(`₹${item.value}`, pageWidth - 25, yPosition, { align: 'right' });
    yPosition += 6;
  });

  yPosition += 2;
  doc.setLineWidth(0.3);
  doc.line(15, yPosition, pageWidth - 15, yPosition);
  yPosition += 5;
  doc.setFont(undefined, 'bold');
  doc.setTextColor(239, 68, 68);
  doc.text('Total Deductions', 15, yPosition);
  doc.text(`₹${totalDeductions.toLocaleString('en-IN')}`, pageWidth - 25, yPosition, { align: 'right' });

  // Net Salary
  yPosition += 12;
  doc.setFillColor(240, 253, 250);
  doc.rect(15, yPosition - 5, pageWidth - 30, 12, 'F');
  doc.setLineWidth(0.5);
  doc.setDrawColor(16, 185, 129);
  doc.rect(15, yPosition - 5, pageWidth - 30, 12);
  
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('NET SALARY', 15, yPosition);
  doc.setTextColor(34, 197, 94);
  doc.text(`₹${employeeData.netSalary}`, pageWidth - 25, yPosition, { align: 'right' });

  // Footer
  yPosition = pageHeight - 15;
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text('This is a digitally generated salary slip', pageWidth / 2, yPosition, { align: 'center' });

  const fileName = `salary-slip-${employeeData.employeeId}-${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(fileName);
}
