'use client'

import { X, MessageCircle, Mail, Copy, Share2 } from 'lucide-react'
import { useState } from 'react'

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
  employeeName: string
  month: string
  netSalary: string
}

export default function ShareModal({
  isOpen,
  onClose,
  employeeName,
  month,
  netSalary,
}: ShareModalProps) {
  const [copied, setCopied] = useState(false)

  if (!isOpen) return null

  const shareMessage = `My Salary Slip for ${month}\n\nName: ${employeeName}\nNet Salary: ₹${netSalary}\n\nGenerated from HR Management System - Government of Uttar Pradesh`
  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''

  const handleWhatsApp = () => {
    const text = encodeURIComponent(shareMessage)
    window.open(`https://wa.me/?text=${text}`, '_blank')
  }

  const handleEmail = () => {
    const subject = encodeURIComponent(`Salary Slip - ${month}`)
    const body = encodeURIComponent(shareMessage)
    window.open(`mailto:?subject=${subject}&body=${body}`)
  }

  const handleInstagram = () => {
    // Instagram doesn't support direct sharing via URL on web, so we copy to clipboard
    navigator.clipboard.writeText(shareMessage)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    alert('Message copied! Open Instagram and paste it in a message or story.')
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleWebShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Salary Slip',
          text: shareMessage,
          url: shareUrl,
        })
      } catch (err) {
        console.log('Share cancelled')
      }
    }
  }

  const shareOptions = [
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      color: 'from-green-400 to-green-600',
      action: handleWhatsApp,
      description: 'Share via WhatsApp'
    },
    {
      icon: Mail,
      label: 'Email',
      color: 'from-red-400 to-red-600',
      action: handleEmail,
      description: 'Share via Email'
    },
    {
      icon: Share2,
      label: 'Instagram',
      color: 'from-pink-400 to-purple-600',
      action: handleInstagram,
      description: 'Share on Instagram'
    },
    {
      icon: Copy,
      label: 'Copy Link',
      color: 'from-blue-400 to-blue-600',
      action: handleCopyLink,
      description: 'Copy to Clipboard'
    },
  ]

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200/50">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Share Salary Slip</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-all duration-200"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {shareOptions.map((option) => {
                const Icon = option.icon
                return (
                  <button
                    key={option.label}
                    onClick={option.action}
                    className={`p-4 rounded-xl bg-gradient-to-br ${option.color} text-white font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 flex flex-col items-center gap-2 group`}
                  >
                    <Icon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    <span className="text-sm">{option.label}</span>
                  </button>
                )
              })}
            </div>

            {/* Message Preview */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
              <p className="text-xs text-slate-600 font-semibold uppercase mb-2">Preview</p>
              <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed line-clamp-4">
                {shareMessage}
              </p>
            </div>

            {/* Status Message */}
            {copied && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-sm text-green-700 font-semibold text-center">
                Copied to clipboard!
              </div>
            )}

            {/* Native Share Button */}
            {typeof navigator !== 'undefined' && navigator.share && (
              <button
                onClick={handleWebShare}
                className="w-full px-4 py-3 rounded-xl bg-slate-100 text-slate-900 font-semibold hover:bg-slate-200 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                More Options
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
