'use client'

export default function QuickReplies({ onSelectReply }: { onSelectReply: Function }) {
  const quickReplies = [
    'What is my current salary?',
    'How many leaves do I have left?',
    'When is my next promotion?',
    'How do I apply for leave?',
    'What are company policies?',
    'How to download salary slip?'
  ]

  return (
    <div className="max-w-4xl mx-auto px-6 py-4 border-t border-slate-200 bg-white/50">
      <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-3">Quick Questions</p>
      <div className="flex flex-wrap gap-2">
        {quickReplies.map((reply, idx) => (
          <button
            key={idx}
            onClick={() => onSelectReply(reply)}
            className="px-3 py-2 rounded-full text-xs font-medium bg-white/80 border border-slate-200 text-slate-700 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 hover:shadow-sm"
          >
            {reply}
          </button>
        ))}
      </div>
    </div>
  )
}
