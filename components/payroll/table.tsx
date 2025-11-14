'use client'

export default function PayrollTable() {
  const components = [
    { category: 'Earnings', items: [
      { name: 'Basic Salary', amount: '50,000' },
      { name: 'House Rent Allowance (HRA)', amount: '15,000' },
      { name: 'Dearness Allowance (DA)', amount: '10,000' },
    ]},
    { category: 'Deductions', items: [
      { name: 'Provident Fund (PF)', amount: '5,000' },
      { name: 'Income Tax (IT)', amount: '3,500' },
      { name: 'Health Insurance', amount: '1,200' },
    ]},
  ]

  return (
    <div className="rounded-3xl bg-white/60 backdrop-blur-sm border border-slate-200/50 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-6 text-white">
        <h3 className="text-lg font-bold">Salary Components Breakdown</h3>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <tbody>
            {components.map((section, sectionIdx) => (
              [
                <tr key={`${sectionIdx}-header`} className="border-t border-slate-200/50">
                  <td colSpan={2} className="px-6 py-3 bg-slate-50 font-semibold text-slate-900">
                    {section.category}
                  </td>
                </tr>,
                ...section.items.map((item, itemIdx) => (
                  <tr key={`${sectionIdx}-${itemIdx}`} className="border-t border-slate-100 hover:bg-blue-50/30 transition-colors">
                    <td className="px-6 py-3 text-sm text-slate-700">{item.name}</td>
                    <td className="px-6 py-3 text-sm font-semibold text-slate-900 text-right">₹{item.amount}</td>
                  </tr>
                ))
              ]
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-purple-50 border-t border-slate-200/50 flex items-center justify-between">
        <span className="font-semibold text-slate-900">Net Salary</span>
        <span className="text-xl font-bold text-blue-600">₹64,300</span>
      </div>
    </div>
  )
}
