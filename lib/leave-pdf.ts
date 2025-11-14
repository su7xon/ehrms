import jsPDF from 'jspdf';

export interface LeaveTemplate {
  subject: string;
  body: string;
}

export const leaveTemplates: Record<string, LeaveTemplate> = {
  sick: {
    subject: 'Request for Sick Leave',
    body: `Dear Sir/Ma'am,

I am writing to request sick leave for today. I am unwell and unable to attend work.

Kindly grant me sick leave for 1 day.

Thank you for your understanding.

Regards,
[Your Name]`
  },
  cultural: {
    subject: 'Request for Marriage/Cultural Leave',
    body: `Dear Sir/Ma'am,

I request leave for my marriage/cultural event from [Start Date] to [End Date]. 

Kindly grant approval for this important occasion.

Thank you for your consideration.

Regards,
[Your Name]`
  },
  planning: {
    subject: 'Request for Personal Planning Leave',
    body: `Dear Sir/Ma'am,

I request leave for personal planning and important family matters from [Start Date] to [End Date].

Kindly grant approval for the same.

Thank you.

Regards,
[Your Name]`
  },
  emergency: {
    subject: 'Request for Emergency Leave',
    body: `Dear Sir/Ma'am,

Due to a family emergency, I am unable to attend work today. I request emergency leave for 1 day.

Kindly grant me emergency leave for this urgent matter.

Thank you for your immediate consideration.

Regards,
[Your Name]`
  },
  other: {
    subject: 'Leave Request',
    body: `Dear Sir/Ma'am,

I request leave for [Reason] from [Start Date] to [End Date].

Kindly grant approval for the same.

Thank you.

Regards,
[Your Name]`
  }
};

export function generateLeavePDF(employeeData: {
  name: string;
  employeeId: string;
  designation: string;
  department: string;
  leaveType: string;
}) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  let yPosition = 15;

  // Header
  doc.setFontSize(18);
  doc.setTextColor(15, 23, 42);
  doc.text('GOVERNMENT OF UTTAR PRADESH', pageWidth / 2, yPosition, { align: 'center' });
  
  yPosition += 8;
  doc.setFontSize(14);
  doc.setFont(undefined, 'bold');
  doc.text('LEAVE APPLICATION FORM', pageWidth / 2, yPosition, { align: 'center' });

  yPosition += 12;
  doc.setLineWidth(0.5);
  doc.setDrawColor(226, 232, 240);
  doc.line(15, yPosition, pageWidth - 15, yPosition);

  // Employee Details
  yPosition += 10;
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  doc.setTextColor(15, 23, 42);

  const details = [
    `Employee Name: ${employeeData.name}`,
    `Employee ID: ${employeeData.employeeId}`,
    `Designation: ${employeeData.designation}`,
    `Department: ${employeeData.department}`,
    `Date of Application: ${new Date().toLocaleDateString('en-IN')}`
  ];

  details.forEach((detail) => {
    doc.text(detail, 15, yPosition);
    yPosition += 7;
  });

  yPosition += 5;
  doc.line(15, yPosition, pageWidth - 15, yPosition);

  // Leave Type and Body
  yPosition += 10;
  doc.setFontSize(11);
  doc.setFont(undefined, 'bold');
  doc.setTextColor(37, 99, 235);
  doc.text(`Leave Type: ${employeeData.leaveType.toUpperCase()}`, 15, yPosition);

  yPosition += 12;
  doc.setFont(undefined, 'normal');
  doc.setFontSize(10);
  doc.setTextColor(51, 65, 85);

  const template = leaveTemplates[employeeData.leaveType.toLowerCase()] || leaveTemplates.other;
  const bodyLines = doc.splitTextToSize(template.body, pageWidth - 30);
  
  bodyLines.forEach((line: string) => {
    if (yPosition > pageHeight - 30) {
      doc.addPage();
      yPosition = 15;
    }
    doc.text(line, 15, yPosition);
    yPosition += 6;
  });

  // Signature Section
  yPosition += 15;
  if (yPosition > pageHeight - 30) {
    doc.addPage();
    yPosition = 15;
  }

  doc.setLineWidth(0.3);
  doc.line(15, yPosition, 60, yPosition);
  yPosition += 4;
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text('Employee Signature', 15, yPosition);

  doc.line(pageWidth - 60, yPosition + 5, pageWidth - 15, yPosition + 5);
  doc.setTextColor(100, 116, 139);
  doc.text('Authorized Signatory', pageWidth - 60, yPosition + 9);

  const fileName = `leave-application-${employeeData.employeeId}-${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(fileName);
}
