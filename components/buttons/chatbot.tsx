'use client'

import { MessageCircle, X } from 'lucide-react'
import { useState } from 'react'

export default function ChatbotButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center text-white group hover:scale-110 z-40 ${
          open ? 'ring-4 ring-blue-300' : ''
        }`}
      >
        {open ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6 group-hover:rotate-12 transition-transform" />
        )}
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col z-40 animate-in fade-in slide-in-from-bottom-4">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white">
            <h3 className="font-bold">HR Assistant Bot</h3>
            <p className="text-xs text-white/80">Always here to help</p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            <div className="flex gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-blue-600">HR</span>
              </div>
              <div className="bg-blue-100 rounded-lg p-3 max-w-xs">
                <p className="text-sm text-slate-900">Hello! How can I assist you today?</p>
              </div>
            </div>
          </div>

          {/* Input */}
          <div className="p-4 border-t border-slate-200">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Ask anything..."
                className="flex-1 px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
