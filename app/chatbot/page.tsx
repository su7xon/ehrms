'use client'

import { ChevronLeft, Mic, Send, MoreVertical } from 'lucide-react'
import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ChatMessage from '@/components/chatbot/message'
import QuickReplies from '@/components/chatbot/quick-replies'
import VoiceButton from '@/components/chatbot/voice-button'

export default function ChatbotPage() {
  const [messages, setMessages] = useState<any[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isListening, setIsListening] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    // Initialize with greeting message only on client-side
    setMessages([
      {
        id: 1,
        type: 'bot',
        content: 'Hello Rajesh! 👋 I\'m your HR Assistant. How can I help you today? You can ask me about salary, leave, promotions, policies, or anything HR-related.',
        timestamp: new Date()
      }
    ])
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    }

    setMessages([...messages, userMessage])
    setInputValue('')

    try {
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are an HR Assistant for a government employee portal. Answer questions about HR policies, salary, leave, promotions, and employee benefits. Be helpful, professional, and concise. User question: ${inputValue}`
            }]
          }]
        })
      })

      if (!response.ok) {
        throw new Error('Failed to get response from API')
      }

      const data = await response.json()
      const botContent = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not process your request. Please try again.'

      const botMessage = {
        id: messages.length + 2,
        type: 'bot',
        content: botContent,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botMessage])
    } catch (error) {
      console.error('Error:', error)
      const errorMessage = {
        id: messages.length + 2,
        type: 'bot',
        content: 'Sorry, I encountered an error. Please try again later.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    }
  }

  const handleQuickReply = (reply: string) => {
    setInputValue(reply)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-slate-200/50 shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <button className="p-2 hover:bg-slate-100 rounded-xl transition-all duration-200">
                <ChevronLeft className="w-5 h-5 text-slate-600" />
              </button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">HR Assistant Chat</h1>
              <p className="text-xs text-slate-500">AI-powered HR support available 24/7</p>
            </div>
          </div>
          <button className="p-2 hover:bg-slate-100 rounded-xl transition-all duration-200">
            <MoreVertical className="w-5 h-5 text-slate-600" />
          </button>
        </div>
      </header>

      {/* Chat Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-6 py-8 overflow-y-auto space-y-4">
        <AnimatePresence>
          {messages.map((message, idx) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <ChatMessage {...message} />
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </main>

      {/* Quick Replies */}
      <AnimatePresence>
        {messages.length <= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
          >
            <QuickReplies onSelectReply={handleQuickReply} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input Area */}
      <motion.div 
        className="sticky bottom-0 max-w-4xl w-full mx-auto px-6 py-6 bg-gradient-to-t from-slate-50 to-transparent"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200 shadow-lg p-3 flex items-center gap-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask anything about HR policies, salary, leave..."
            className="flex-1 bg-transparent text-slate-900 placeholder-slate-500 outline-none text-sm"
          />
          <VoiceButton isListening={isListening} setIsListening={setIsListening} />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSendMessage}
            className="p-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg transition-all duration-300 active:scale-95"
          >
            <Send className="w-5 h-5" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}
