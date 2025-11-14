import { NextResponse } from "next/server"
import { DB } from "@/lib/db"

export async function POST(req: Request) {
  const body = await req.json()
  const { employeeId, profileData } = body

  const idx = DB.employees.findIndex((e: any) => e.id === employeeId)
  if (idx === -1) return NextResponse.json({ ok: false }, { status: 404 })

  if (profileData.designation) DB.employees[idx].designation = profileData.designation
  if (profileData.department) DB.employees[idx].department = profileData.department
  if (profileData.jobTitle) DB.employees[idx].jobTitle = profileData.jobTitle
  if (profileData.level) DB.employees[idx].level = profileData.level
  if (profileData.jobGrade) DB.employees[idx].jobGrade = profileData.jobGrade
  if (profileData.joiningDate) DB.employees[idx].joiningDate = profileData.joiningDate
  if (profileData.departmentHead) DB.employees[idx].departmentHead = profileData.departmentHead
  if (profileData.reportingManager) DB.employees[idx].reportingManager = profileData.reportingManager
  if (profileData.departmentPhone) DB.employees[idx].departmentPhone = profileData.departmentPhone
  if (profileData.departmentEmail) DB.employees[idx].departmentEmail = profileData.departmentEmail
  if (profileData.location) DB.employees[idx].location = profileData.location
  if (profileData.skills) DB.employees[idx].skills = profileData.skills
  if (profileData.responsibilities) DB.employees[idx].responsibilities = profileData.responsibilities

  return NextResponse.json({ ok: true, employee: DB.employees[idx] })
}
