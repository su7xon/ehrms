'use client'

import { Mic } from 'lucide-react'

interface VoiceButtonProps {
  isListening: boolean
  setIsListening: Function
}

export default function VoiceButton({ isListening, setIsListening }: VoiceButtonProps) {
  const handleVoiceInput = () => {
    setIsListening(!isListening)
    // Implement voice input logic here
  }

  return (
    <button
      onClick={handleVoiceInput}
      className={`p-2 rounded-lg transition-all duration-300 ${
        isListening
          ? 'bg-red-500 text-white animate-pulse'
          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
      }`}
    >
      <Mic className="w-5 h-5" />
    </button>
  )
}
