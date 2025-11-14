'use client'

import { useEffect, useState } from 'react'
import { Bell, Zap, Users, TrendingUp, Gift, X } from 'lucide-react'
import CelebrationModal from './celebration-modal'

interface AnimatedNumberProps {
  target: number
  duration?: number
  prefix?: string
  suffix?: string
}

function AnimatedNumber({ target, duration = 2000, prefix = '', suffix = '' }: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (hasAnimated) return

    let startTime: number
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      setDisplayValue(Math.floor(target * progress))

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setDisplayValue(target)
        setHasAnimated(true)
      }
    }

    requestAnimationFrame(animate)
  }, [target, duration, hasAnimated])

  return (
    <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
      {prefix}{displayValue.toLocaleString('en-IN')}{suffix}
    </span>
  )
}

export default function PromotionNotificationBanner() {
  const [isVisible, setIsVisible] = useState(true)
  const [showCelebration, setShowCelebration] = useState(false)
  const [hasResponded, setHasResponded] = useState(false)
  const [response, setResponse] = useState<'accepted' | 'rejected' | null>(null)

  const promotionData = {
    employee: 'Priya Singh',
    currentDesignation: 'Software Developer',
    newDesignation: 'Senior Software Developer',
    department: 'IT',
    currentSalary: 112500,
    newSalary: 150000,
    salaryIncrease: 37500,
    benefits: [
      { icon: TrendingUp, label: 'Salary Hike', value: '₹37,500/month', color: 'text-green-600' },
      { icon: Gift, label: 'Annual Bonus', value: '+₹1,50,000', color: 'text-amber-600' },
      { icon: Users, label: 'Team Lead', value: 'Manage 5 Members', color: 'text-blue-600' },
      { icon: Zap, label: 'Incentive', value: '+₹50,000/year', color: 'text-purple-600' },
    ]
  }

  const handleAcceptPromotion = () => {
    setHasResponded(true)
    setResponse('accepted')
    setShowCelebration(true)
  }

  const handleRejectPromotion = () => {
    setHasResponded(true)
    setResponse('rejected')
  }

  return isVisible ? (
    <>
      <div className="relative mb-8 overflow-hidden rounded-3xl">
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-100 via-slate-50 to-slate-100 opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent animate-pulse" />

        <div className="relative z-10 px-8 py-6 text-black">
          {/* Close Button */}
          <button
            onClick={() => setIsVisible(false)}
            className="absolute top-4 right-4 text-black/70 hover:text-black text-2xl font-bold transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-black/10 rounded-xl backdrop-blur-sm">
              <Bell className="w-5 h-5 text-black animate-bounce" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-black">🎉 Promotion Alert!</h3>
              <p className="text-sm text-black/70">Next Stage Promotion in Pipeline</p>
            </div>
          </div>

          {/* Employee Info */}
          <div className="bg-black/5 backdrop-blur-md rounded-2xl p-5 mb-6 border border-black/10">
            <p className="text-sm text-black/70 mb-2">Promoted Employee</p>
            <div className="flex items-baseline justify-between mb-3">
              <h4 className="text-2xl font-bold text-black">{promotionData.employee}</h4>
              <span className="text-xs bg-black/10 px-3 py-1 rounded-full text-black">{promotionData.department}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-black/70">
              <span>{promotionData.currentDesignation}</span>
              <span className="text-black">→</span>
              <span className="font-semibold text-black">{promotionData.newDesignation}</span>
            </div>
          </div>

          {/* Salary Animation */}
          <div className="mb-6">
            <div className="bg-black/5 backdrop-blur-md rounded-2xl p-5 border border-black/10">
              <p className="text-sm text-black/70 mb-3 uppercase tracking-wider font-semibold">Salary Increment</p>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-xs text-black/60 mb-1">Current</p>
                  <p className="text-lg font-bold text-black">
                    ₹<AnimatedNumber target={promotionData.currentSalary} duration={2000} />
                  </p>
                </div>
                <div className="flex items-center justify-center">
                  <span className="text-2xl text-green-300 font-bold">→</span>
                </div>
                <div>
                  <p className="text-xs text-black/60 mb-1">New Salary</p>
                  <p className="text-lg font-bold text-black">
                    ₹<AnimatedNumber target={promotionData.newSalary} duration={2000} />
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-black/10 text-center">
                <p className="text-sm text-black/70">Salary Increase</p>
                <p className="text-2xl font-bold text-black mt-1">
                  ₹<AnimatedNumber target={promotionData.salaryIncrease} duration={2000} />/month
                </p>
              </div>
            </div>
          </div>

          {/* Benefits Grid */}
          <div>
            <p className="text-sm text-black/70 mb-3 uppercase tracking-wider font-semibold">Additional Benefits</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {promotionData.benefits.map((benefit, idx) => {
                const Icon = benefit.icon
                return (
                  <div
                    key={idx}
                    className="bg-black/5 backdrop-blur-md rounded-xl p-4 border border-black/10 hover:bg-black/10 transition-all duration-300 text-center transform hover:scale-105"
                  >
                    <Icon className={`w-5 h-5 mx-auto mb-2 ${benefit.color}`} />
                    <p className="text-xs text-black/60 mb-2">{benefit.label}</p>
                    <p className="text-sm font-bold text-black">{benefit.value}</p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="mt-6 flex gap-3 justify-center">
            <button
              onClick={handleRejectPromotion}
              disabled={hasResponded}
              className="px-6 py-2 bg-black/10 hover:bg-black/20 backdrop-blur-md rounded-xl font-semibold text-black transition-all duration-200 border border-black/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {response === 'rejected' ? '✓ Declined' : 'Decline'}
            </button>
            <button
              onClick={handleAcceptPromotion}
              disabled={hasResponded}
              className="px-6 py-2 bg-black text-white hover:bg-black/90 rounded-xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {response === 'accepted' ? '✓ Accepted' : 'Accept Promotion'}
            </button>
          </div>

          {/* Status Message */}
          {hasResponded && (
            <div className="mt-4 text-center">
              {response === 'accepted' ? (
                <p className="text-sm text-green-600 font-semibold">✓ Promotion Accepted Successfully!</p>
              ) : (
                <p className="text-sm text-amber-600 font-semibold">Your response has been recorded</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Celebration Modal */}
      <CelebrationModal
        isOpen={showCelebration}
        onClose={() => setShowCelebration(false)}
        employeeName={promotionData.employee}
        newDesignation={promotionData.newDesignation}
        salaryIncrease={promotionData.salaryIncrease}
      />
    </>
  ) : null
}
