import { NextResponse } from "next/server"
import { DB } from "@/lib/db"

function compute(emp: any) {
  const c = emp.salaryComponents
  const gross = (c.basic || 0) + (c.hra || 0) + (c.da || 0) + (c.allowances || 0)

  const pf = c.pf || Math.round((c.pfPercent || 12) / 100 * (c.basic || 0))
  const tds = Math.round((c.tdsPercent || 0) / 100 * gross)

  return {
    gross,
    pf,
    tds,
    net: gross - (pf + tds + (c.otherDeductions || 0))
  }
}

export async function POST() {
  DB.generatedSlips = DB.employees.map((emp: any) => ({
    id: `slip_${emp.id}_${Date.now()}`,
    employeeId: emp.id,
    name: emp.name,
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    payroll: compute(emp)
  }))

  return NextResponse.json({
    ok: true,
    count: DB.generatedSlips.length,
    slips: DB.generatedSlips
  })
}
