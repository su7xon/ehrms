import { NextResponse } from "next/server"
import { DB } from "@/lib/db"

export async function POST(req: Request) {
  const { auditId, ruleId } = await req.json()

  const audit = DB.lastAudit
  if (!audit || audit.auditId !== auditId)
    return NextResponse.json({ ok: false, msg: "Audit not found" }, { status: 404 })

  const rule = audit.rules.find((r: any) => r.id === ruleId)
  if (!rule || !rule.suggestedFix)
    return NextResponse.json({ ok: false, msg: "No autofix available" }, { status: 400 })

  const emp = DB.employees.find((e: any) => e.id === audit.payroll.employeeId)
  if (!emp) return NextResponse.json({ ok: false }, { status: 404 })

  const { field, value } = rule.suggestedFix.payload
  emp.salaryComponents[field] = value

  const updated = {
    ...audit.payroll,
    components: emp.salaryComponents
  }

  return NextResponse.json({ ok: true, updatedPayroll: updated })
}
