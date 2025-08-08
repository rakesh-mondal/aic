'use client'

import React from 'react'
import { X, Send } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePrototypeStore } from '../../store/prototypeStore'
import MessageBubble from './MessageBubble'
import { Button } from '../../../components/ui/button'
import { HoverBorderGradient } from '../../../components/ui/hover-border-gradient'
import { AuroraBackground } from '../../../components/ui/aurora-background'
import { usePrototypeChat } from './hooks/usePrototypeChat'
import { usePageContext } from './hooks/usePageContext'
import { useIdleDetection } from './hooks/useIdleDetection'

export function CopilotAssistant() {
  // Automatically detect and set page context
  usePageContext()

  const {
    isAIAssistantOpen,
    toggleAssistant,
    messages,
    currentInput,
    setCurrentInput,
    isTyping,
    suggestions,
    showSuggestions,
    selectSuggestion,
    pageContext
  } = usePrototypeStore()

  const {
    handleConversation
  } = usePrototypeChat()

  const messagesEndRef = React.useRef<HTMLDivElement>(null)
  const inputRef = React.useRef<HTMLTextAreaElement>(null)

  // Aurora state
  const [showAurora, setShowAurora] = React.useState(false)
  const [hasInteracted, setHasInteracted] = React.useState(false)

  // Idle detection
  const { isIdle } = useIdleDetection({
    timeout: 30000, // 30 seconds
    onIdle: () => {
      if (hasInteracted && messages.length === 0) {
        setShowAurora(true)
      }
    },
    onActive: () => {
      setShowAurora(false)
    }
  })

  // Show Aurora on first interaction when suggestions are shown
  React.useEffect(() => {
    if (!hasInteracted && showSuggestions && messages.length === 0) {
      setShowAurora(true)
    }
  }, [hasInteracted, showSuggestions, messages.length])

  // Hide Aurora when user starts chatting
  React.useEffect(() => {
    if (messages.length > 0) {
      setShowAurora(false)
    }
  }, [messages.length])

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest'
      })
    }
  }

  React.useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  React.useEffect(() => {
    if (isAIAssistantOpen && inputRef.current) {
      // Delay focus to prevent scroll issues
      setTimeout(() => {
        inputRef.current?.focus({ preventScroll: true })
      }, 100)
    }
  }, [isAIAssistantOpen])

  const handleSendMessage = () => {
    if (!currentInput.trim()) return
    
    setHasInteracted(true)
    handleConversation(currentInput)
    setCurrentInput('')
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setHasInteracted(true)
    selectSuggestion(suggestion)
    handleConversation(suggestion)
  }

  // Close panel on Escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isAIAssistantOpen) {
        toggleAssistant()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isAIAssistantOpen, toggleAssistant])

  return (
    <>
      {/* AI Copilot Panel - Flexbox layout that resizes main content */}
      <AnimatePresence mode="wait">
        {isAIAssistantOpen && (
          <motion.div 
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ 
              type: "spring",
              stiffness: 300,
              damping: 30,
              duration: 0.3
            }}
            className="border-l border-gray-200 flex flex-col flex-shrink-0"
            style={{ 
              backgroundColor: '#ffffff',
              width: '400px',
              height: '100%',
              overflow: 'hidden',
              borderTopLeftRadius: '1rem',
              borderBottomLeftRadius: '1rem',
              borderTopRightRadius: '1rem',
              borderBottomRightRadius: '1rem'
            }}
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            onScroll={(e) => e.stopPropagation()}
            onFocus={(e) => e.stopPropagation()}
          >
          {/* Header - FIXED at top with clean design */}
          <div className="flex-shrink-0 px-4 py-3 border-b border-gray-200 bg-white" style={{ borderTopLeftRadius: '1rem', borderTopRightRadius: '1rem' }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 flex items-center justify-center">
                  <div 
                    className="w-6 h-5 animate-pulse"
                    style={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      maskImage: `url("data:image/svg+xml,%3Csvg width='669' height='524' viewBox='0 0 669 524' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M630.238 216.523C628.335 317.641 562.713 520.467 315.643 523.157C315.512 523.157 315.446 523.157 315.315 523.157C315.184 523.157 315.118 523.157 314.987 523.157C67.9172 520.467 2.29466 317.706 0.391602 216.523C240.768 221.838 309.737 411.672 315.315 514.168C320.893 411.672 389.862 221.904 630.238 216.523Z' fill='black'/%3E%3Cpath d='M315.578 0.179377C323.255 50.6399 349.898 92.8324 390.584 123.017C414.471 140.668 441.573 152.086 470.578 158.057C418.671 168.031 372.801 198.478 343.27 242.705C334.214 256.419 327.127 271.314 322.14 287.063C319.843 294.346 318.071 301.827 316.693 309.307C316.431 310.62 316.102 315.082 315.249 315.869C313.806 306.42 311.706 297.037 308.95 287.85C296.941 249.135 271.479 215.67 238.93 192.047C215.503 175.118 188.729 163.503 160.445 157.991C172.586 155.301 184.529 152.02 196.144 147.427C234.14 132.269 266.623 105.628 288.935 71.1128C297.466 57.7923 304.159 43.3562 308.884 28.1984C311.115 21.1116 312.821 13.6968 314.134 6.41312C314.396 5.10075 314.724 0.966807 315.512 0.11377L315.578 0.179377Z' fill='black'/%3E%3C/svg%3E")`,
                      maskRepeat: 'no-repeat',
                      maskPosition: 'center',
                      maskSize: 'contain'
                    }}
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">StackSense AI</h3>
                </div>
              </div>
              
              <button
                onClick={toggleAssistant}
                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                title="Close StackSense AI"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Messages Area - INDEPENDENT scroll container with Aurora */}
          <div 
            className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col relative"
            style={{ 
              minHeight: 0,
              maxHeight: 'calc(100vh - 200px)',
              scrollBehavior: 'smooth'
            }}
            onScroll={(e) => e.stopPropagation()}
          >
            {/* Aurora Background - Top portion with bottom fade */}
            <AnimatePresence>
              {showAurora && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="absolute inset-0 z-0"
                  style={{ height: '60%' }}
                >
                  <AuroraBackground showRadialGradient={true}>
                    <div />
                  </AuroraBackground>
                  {/* Gradient fade at bottom */}
                  <div
                    className="absolute bottom-0 left-0 right-0"
                    style={{
                      height: '40%',
                      background: 'linear-gradient(to bottom, transparent 0%, rgba(255, 255, 255, 0.3) 20%, rgba(255, 255, 255, 0.7) 60%, rgba(255, 255, 255, 1) 100%)'
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
            
            {messages.length === 0 && showSuggestions ? (
              // Empty state - suggestions at bottom
              <div className="flex-1 flex flex-col justify-end p-4 relative z-10">
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 400, damping: 25 }}
                  className="space-y-2"
                >
                  {/* Only Suggestions */}
                  <p className="text-sm font-medium text-gray-700">Suggestions:</p>
                  {suggestions.slice(0, 3).map((suggestion, index) => (
                    <motion.div
                      key={index}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ 
                        delay: 0.3 + (index * 0.1),
                        type: "spring",
                        stiffness: 400,
                        damping: 25
                      }}
                    >
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="w-full text-left justify-start h-auto py-2 px-3 text-sm"
                      >
                        {suggestion}
                      </Button>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            ) : (
              <div className="p-4 space-y-4 relative z-10">
                {/* Chat Messages */}
                <AnimatePresence>
                  {messages.map((message, index) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ 
                        delay: index * 0.1,
                        type: "spring",
                        stiffness: 400,
                        damping: 25
                      }}
                    >
                      <MessageBubble message={message} />
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Typing Indicator */}
                <AnimatePresence>
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg max-w-xs"
                    >
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      </div>
                      <span className="text-sm text-gray-500">StackSense is thinking...</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Input Area - FIXED at bottom with clean design */}
          <div className="flex-shrink-0 border-t border-gray-200 bg-white p-4" style={{ borderBottomLeftRadius: '1rem', borderBottomRightRadius: '1rem' }}>
            <div className="flex items-center space-x-3">
              <HoverBorderGradient
                as="div"
                containerClassName="flex-1 rounded-lg"
                className="flex items-center space-x-2 bg-white text-gray-900 w-full"
                duration={2}
              >
                <textarea
                  ref={inputRef}
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about infrastructure, deployments, or configurations..."
                  className="flex-1 bg-transparent border-0 outline-none resize-none text-sm"
                  rows={1}
                  style={{ maxHeight: '100px' }}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!currentInput.trim()}
                  size="sm"
                  className="p-2"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </HoverBorderGradient>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-gray-500">
                {currentInput.length}/500
              </span>
              <span className="text-xs text-gray-500">
                Press Enter to send
              </span>
            </div>
          </div>
        </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default CopilotAssistant