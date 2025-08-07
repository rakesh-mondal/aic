'use client'

import React from 'react'
import { MessageSquare, X, Send } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePrototypeStore } from '../../store/prototypeStore'
import MessageBubble from './MessageBubble'
import { Button } from '../../../components/ui/button'
import { HoverBorderGradient } from '../../../components/ui/hover-border-gradient'
import { usePrototypeChat } from './hooks/usePrototypeChat'
import { usePageContext } from './hooks/usePageContext'

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
    showSuggestions,
    suggestions,
    selectSuggestion,
    pageContext
  } = usePrototypeStore()

  const { handleConversation } = usePrototypeChat()
  const messagesEndRef = React.useRef<HTMLDivElement>(null)
  const inputRef = React.useRef<HTMLTextAreaElement>(null)

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
                <div className="w-8 h-8 rounded-lg bg-gray-900 flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">Krutrim AI</h3>
                  <p className="text-xs text-gray-500">{pageContext.title}</p>
                </div>
              </div>
              
              <button
                onClick={toggleAssistant}
                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                title="Close Krutrim AI"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Messages Area - INDEPENDENT scroll container */}
          <div 
            className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col"
            style={{ 
              minHeight: 0,
              maxHeight: 'calc(100vh - 200px)', // Use viewport height for stability
              scrollBehavior: 'smooth'
            }}
            onScroll={(e) => e.stopPropagation()} // Prevent event bubbling
          >
            {messages.length === 0 && showSuggestions ? (
              // Empty state - suggestions at bottom
              <div className="flex-1 flex flex-col justify-end p-4">
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
                <div className="p-4 space-y-4">
                  {/* Chat Messages */}
                  <AnimatePresence>
                    {messages.map((message, index) => (
                      <motion.div
                        key={message.id}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
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
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg border border-gray-200"
                      >
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                        </div>
                        <span className="text-sm text-gray-500">Krutrim is thinking...</span>
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
                  placeholder={`Ask me about ${pageContext.title.toLowerCase()}...`}
                  className="flex-1 resize-none bg-transparent text-sm focus:outline-none disabled:opacity-50 border-0"
                  rows={1}
                  maxLength={500}
                  disabled={isTyping}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!currentInput.trim() || isTyping}
                  size="icon"
                  variant="default"
                  className="flex-shrink-0 h-8 w-8"
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