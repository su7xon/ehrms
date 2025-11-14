'use client'

import { Home, DollarSign, FileText, Briefcase, TrendingUp, MessageCircle, LogOut, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true)
  const pathname = usePathname()

  const menuItems = [
    { icon: Home, label: 'Dashboard', href: '/', color: 'text-blue-600' },
    { icon: DollarSign, label: 'Payroll', href: '/payroll', color: 'text-purple-600' },
    { icon: FileText, label: 'Salary Slip', href: '/salary-slip', color: 'text-cyan-600' },
    { icon: Briefcase, label: 'Job Profile', href: '/job-profile', color: 'text-amber-600' },
    { icon: TrendingUp, label: 'Promotion', href: '/promotion', color: 'text-green-600' },
    { icon: MessageCircle, label: 'HR Chat', href: '/chatbot', color: 'text-red-600' },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-6 left-6 z-50 p-2 rounded-lg bg-white/60 border border-slate-200 hover:bg-white transition-all"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-slate-600 to-slate-700 border-r border-slate-700 transform transition-transform duration-300 z-40 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo Section */}
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center gap-3 mb-4">
            <Image
              src="/images/up-gov-logo.png"
              alt="Government of Uttar Pradesh"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div>
              <h1 className="text-sm font-bold text-white">Govt. of UP</h1>
              <p className="text-xs text-slate-400">eHRMS Portal</p>
            </div>
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Smart eHRMS
          </h1>
          <p className="text-xs text-slate-400 mt-1">Employee Management</p>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2 flex-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)

            return (
              <Link key={item.href} href={item.href}>
                <button
                  onClick={() => setIsOpen(false)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    active
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium text-sm">{item.label}</span>
                  {active && <div className="ml-auto w-2 h-2 rounded-full bg-white" />}
                </button>
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-700">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-300">
            <LogOut className="w-5 h-5" />
            <span className="font-medium text-sm">Logout</span>
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
