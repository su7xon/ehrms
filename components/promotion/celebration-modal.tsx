'use client'

import { useEffect, useState } from 'react'
import { X } from 'lucide-react'

interface CelebrationModalProps {
  isOpen: boolean
  onClose: () => void
  employeeName: string
  newDesignation: string
  salaryIncrease: number
}

export default function CelebrationModal({
  isOpen,
  onClose,
  employeeName,
  newDesignation,
  salaryIncrease,
}: CelebrationModalProps) {
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true)
      const timer = setTimeout(() => setShowConfetti(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Confetti */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: Math.random() * 100 + '%',
                top: '-10px',
                animation: `fall ${2 + Math.random() * 1}s linear forwards`,
              }}
            >
              {['🎉', '🎊', '⭐', '🌟', '✨'][Math.floor(Math.random() * 5)]}
            </div>
          ))}
        </div>
      )}

      {/* Modal Content */}
      <div className="relative z-10 bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden">
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-8 text-white text-center relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-white rounded-full blur-3xl" />
          </div>

          <div className="relative z-10">
            <div className="text-6xl mb-3 animate-bounce">🎉</div>
            <h2 className="text-3xl font-bold mb-2">Congratulations!</h2>
            <p className="text-green-100 text-sm">You have been promoted</p>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-8 space-y-6">
          {/* Message */}
          <div className="text-center space-y-3">
            <h3 className="text-2xl font-bold text-slate-900">
              You are promoted to
            </h3>
            <p className="text-lg font-semibold text-green-600 bg-green-50 px-4 py-3 rounded-xl">
              {newDesignation}
            </p>
          </div>

          {/* Employee Info */}
          <div className="bg-slate-50 rounded-2xl p-4 space-y-2">
            <p className="text-xs text-slate-600 font-semibold uppercase tracking-wider">Promoted Employee</p>
            <p className="text-lg font-bold text-slate-900">{employeeName}</p>
          </div>

          {/* Salary Increase */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-200 space-y-2">
            <p className="text-xs text-slate-600 font-semibold uppercase tracking-wider">Monthly Salary Increase</p>
            <p className="text-3xl font-bold text-green-600">
              ₹{salaryIncrease.toLocaleString('en-IN')}
            </p>
            <p className="text-xs text-slate-600 mt-2">Effective immediately</p>
          </div>

          {/* Celebration emojis */}
          <div className="flex justify-center gap-2 text-4xl">
            <span className="animate-bounce" style={{ animationDelay: '0s' }}>🎊</span>
            <span className="animate-bounce" style={{ animationDelay: '0.1s' }}>✨</span>
            <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>🌟</span>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Continue
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
