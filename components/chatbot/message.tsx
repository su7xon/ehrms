'use client'

import { Copy, Check } from 'lucide-react'
import { useState } from 'react'

interface ChatMessageProps {
  id: number
  type: 'user' | 'bot'
  content: string
  timestamp: Date
}

export default function ChatMessage({ type, content, timestamp }: ChatMessageProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (type === 'user') {
    return (
      <div className="flex justify-end mb-4">
        <div className="max-w-xs lg:max-w-md">
          <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 shadow-md hover:shadow-lg transition-shadow">
            <p className="text-sm leading-relaxed">{content}</p>
          </div>
          <p className="text-xs text-slate-500 mt-1 text-right">
            {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-start mb-4">
      <div className="max-w-xs lg:max-w-md">
        <div className="flex gap-3">
          {/* Bot Avatar */}
          <div className="flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold shadow-md">
              HR
            </div>
          </div>

          {/* Message Bubble */}
          <div className="flex-1">
            <div className="rounded-2xl bg-white/70 backdrop-blur-sm border border-slate-200 p-4 shadow-md hover:shadow-lg transition-shadow group">
              <p className="text-sm text-slate-900 leading-relaxed">{content}</p>
              <button
                onClick={handleCopy}
                className="mt-2 p-1.5 rounded-lg bg-slate-100 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-slate-200"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-600" />
                ) : (
                  <Copy className="w-4 h-4 text-slate-600" />
                )}
              </button>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
