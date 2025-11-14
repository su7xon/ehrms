import { NextResponse } from "next/server"
import { DB } from "@/lib/db"

export async function POST(req: Request) {
  const body = await req.json()
  const { id, salaryComponents } = body
  const idx = DB.employees.findIndex((e: any) => e.id === id)
  
  if (idx === -1) return NextResponse.json({ ok: false }, { status: 404 })
  
  DB.employees[idx].salaryComponents = salaryComponents
  return NextResponse.json({ ok: true, employee: DB.employees[idx] })
}
