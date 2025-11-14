import { NextResponse } from "next/server"
import { DB } from "@/lib/db"

export async function GET() {
  return NextResponse.json({
    ok: true,
    employees: DB.employees.map((e: any) => ({
      id: e.id,
      name: e.name,
      department: e.department,
      designation: e.designation,
      avatar: e.avatar,
      salaryComponents: e.salaryComponents
    }))
  })
}
