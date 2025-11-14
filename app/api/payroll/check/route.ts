import { NextResponse } from "next/server"
import { DB } from "@/lib/db"

function buildCanonical(payroll: any) {
  const emp = DB.employees.find((e: any) => e.id === payroll.employeeId)
  const c = payroll.components
  const gross = (c.basic || 0) + (c.hra || 0) + (c.da || 0) + (c.allowances || 0)
  return { employee: emp, components: { ...c, gross } }
}

function runRules(canonical: any) {
  const rules = []
  const basic = canonical.components.basic || 0
  const pfPercent = canonical.components.pfPercent ?? 12
  const pfExpected = Math.round((pfPercent / 100) * basic)
  const pfProvided = canonical.components.pf || 0

  // Rule 1: PF mandatory for >= 15000
  if (basic >= 15000) {
    const pass = pfProvided >= pfExpected
    rules.push({
      id: "PF_RULE",
      name: "PF mandatory for Basic >= 15,000",
      status: pass ? "PASS" : "FAIL",
      details: pass
        ? `PF OK (₹${pfProvided})`
        : `PF expected ₹${pfExpected}, found ₹${pfProvided}`,
      suggestedFix: pass
        ? null
        : {
            type: "AUTO_FIX",
            payload: { field: "pf", value: pfExpected }
          }
    })
  }

  // TDS rule
  const gross = canonical.components.gross
  const annual = gross * 12
  const tdsPercent = canonical.components.tdsPercent || 0
  const providedAnnual = Math.round((tdsPercent / 100) * gross) * 12

  let expectedAnnual = 0
  if (annual > 700000) expectedAnnual = Math.round(annual * 0.1)
  else if (annual > 300000) expectedAnnual = Math.round(annual * 0.05)

  const tdsPass = providedAnnual >= expectedAnnual

  rules.push({
    id: "TDS_RULE",
    name: "TDS Provisional Rule",
    status: tdsPass ? "PASS" : "WARN",
    details: `Annual gross ₹${annual} → Expected TDS approx ₹${expectedAnnual}`,
    suggestedFix: null
  })

  return rules
}

export async function POST(req: Request) {
  const { payroll } = await req.json()
  const canonical = buildCanonical(payroll)
  const rules = runRules(canonical)

  const issues = rules.filter((r) => r.status !== "PASS").length

  const auditId = `audit_${Date.now()}`
  DB.lastAudit = { auditId, payroll, canonical, rules, timestamp: Date.now() }

  return NextResponse.json({
    summary: {
      passed: issues === 0,
      issuesCount: issues
    },
    rules,
    auditId,
    rulesetVersion: "1.0"
  })
}
