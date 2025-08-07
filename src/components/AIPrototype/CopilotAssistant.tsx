'use client'

import React from 'react'
import { X, Send } from 'lucide-react'
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
                <div className="w-8 h-8 flex items-center justify-center">
                  <svg width="24" height="20" viewBox="0 0 669 524" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M356.788 315.869H315.249L321.352 237.849L368.6 225.316L356.788 315.869Z" fill="#393939"/>
                    <path d="M583.908 292.903C555.953 329.321 521.436 359.308 483.178 384.571C436.323 415.478 385.99 442.578 352.26 489.167C345.501 498.485 338.808 509.902 332.508 522.501C565.6 510.952 628.335 315.278 630.173 216.523C628.466 216.523 626.891 216.72 625.185 216.785C611.404 242.114 601.036 270.461 583.843 292.903H583.908Z" fill="#7DC215"/>
                    <path d="M350.423 287.85C353.179 297.036 355.345 306.354 356.723 315.869C357.576 315.016 357.904 310.554 358.166 309.307C359.61 301.827 361.316 294.28 363.613 287.062C368.6 271.38 375.688 256.419 384.743 242.704C414.274 198.478 471.103 168.031 523.076 158.057C494.137 152.086 455.944 140.668 432.058 123.017C391.306 92.8979 364.729 50.7053 357.051 0.179199C356.263 1.03224 355.935 5.16621 355.673 6.47858C354.295 13.8278 352.654 21.1771 350.423 28.2638C345.698 43.4217 339.005 57.8577 330.474 71.1782C308.096 105.693 275.679 132.334 237.683 147.492C226.068 152.086 214.125 155.301 201.984 158.057C230.268 163.569 257.042 175.183 280.469 192.113C313.018 215.735 338.414 249.135 350.488 287.915L350.423 287.85Z" fill="#393939"/>
                    <path d="M668.168 217.507C626.367 214.685 566.519 211.864 483.309 274.595C368.995 360.883 367.354 499.075 367.485 515.086C367.682 546.976 342.155 366.001 248.052 280.303C177.114 215.735 82.2232 211.011 12.6631 216.457C19.2254 246.379 45.8026 382.34 175.079 465.019C217.603 492.251 241.161 506.949 260.192 514.889C270.757 505.243 286.113 501.175 300.616 504.456C311.772 507.015 291.625 510.886 296.941 520.401C314.921 520.401 367.157 524.01 367.157 524.01C367.288 524.01 367.354 524.01 367.485 524.01C367.616 524.01 367.682 524.01 367.813 524.01C614.883 521.319 666.265 318.559 668.168 217.376V217.507Z" fill="#393939"/>
                    <path d="M357.116 0.179199H315.577C315.577 0.179199 323.911 75.509 331.983 78.9212C340.054 82.3333 356.919 70.0627 356.919 70.0627C356.919 70.0627 359.61 12.9092 357.116 0.244832V0.179199Z" fill="#393939"/>
                    <path d="M630.238 216.523C628.335 317.641 562.713 520.467 315.643 523.157C315.512 523.157 315.446 523.157 315.315 523.157C315.184 523.157 315.118 523.157 314.987 523.157C67.9172 520.467 2.29466 317.706 0.391602 216.523C240.768 221.838 309.737 411.672 315.315 514.168C320.893 411.672 389.862 221.904 630.238 216.523ZM315.578 0.179377C323.255 50.6399 349.898 92.8324 390.584 123.017C414.471 140.668 441.573 152.086 470.578 158.057C418.671 168.031 372.801 198.478 343.27 242.705C334.214 256.419 327.127 271.314 322.14 287.063C319.843 294.346 318.071 301.827 316.693 309.307C316.431 310.62 316.102 315.082 315.249 315.869C313.806 306.42 311.706 297.037 308.95 287.85C296.941 249.135 271.479 215.67 238.93 192.047C215.503 175.118 188.729 163.503 160.445 157.991C172.586 155.301 184.529 152.02 196.144 147.427C234.14 132.269 266.623 105.628 288.935 71.1128C297.466 57.7923 304.159 43.3562 308.884 28.1984C311.115 21.1116 312.821 13.6968 314.134 6.41312C314.396 5.10075 314.724 0.966807 315.512 0.11377L315.578 0.179377Z" fill="#8CD82D"/>
                    <path d="M390.584 122.951C375.622 111.862 362.629 99.1975 351.736 85.0239C350.751 100.182 348.258 114.946 344.255 128.66C333.427 165.866 303.7 193.229 291.231 229.581C289.657 234.174 288.541 238.636 287.557 243.098C296.613 256.944 303.962 271.905 308.884 287.85C311.64 297.037 313.806 306.354 315.184 315.869C316.037 315.016 316.365 310.554 316.627 309.307C318.071 301.827 319.777 294.281 322.074 287.063C327.062 271.38 334.149 256.419 343.205 242.705C372.735 198.478 418.54 168.031 470.513 158.057C441.573 152.086 414.405 140.668 390.519 123.017L390.584 122.951Z" fill="#7DC215"/>
                    <path d="M308.949 287.85C311.705 297.036 313.871 306.354 315.249 315.869C316.102 315.016 316.43 310.554 316.693 309.307C318.136 301.827 319.843 294.28 322.14 287.062C327.127 271.38 334.214 256.419 343.27 242.704C372.8 198.478 418.605 168.031 470.578 158.057C441.638 152.086 414.471 140.668 390.584 123.017C349.832 92.8979 323.255 50.7053 315.577 0.179199C314.79 1.03224 314.462 5.16621 314.199 6.47858C312.821 13.8278 311.18 21.1771 308.949 28.2638C304.224 43.4217 297.531 57.8577 289 71.1782C266.623 105.693 234.205 132.334 196.21 147.492C184.594 152.086 172.651 155.301 160.511 158.057C188.794 163.569 215.568 175.183 238.995 192.113C271.544 215.735 296.94 249.135 309.015 287.915L308.949 287.85Z" fill="#8CD82D"/>
                    <path d="M390.584 122.951C360.726 100.838 338.545 72.1625 325.749 38.5659C334.411 89.4201 346.223 141.521 323.649 188.241C312.296 211.667 298.122 228.268 292.281 250.579C299.172 262.324 304.881 274.726 308.949 287.85C311.706 297.036 313.871 306.354 315.249 315.869C316.102 315.016 316.43 310.554 316.693 309.307C318.137 301.827 319.843 294.28 322.14 287.062C327.127 271.38 334.214 256.419 343.27 242.704C372.8 198.478 418.605 168.031 470.578 158.057C441.639 152.086 414.471 140.668 390.584 123.017V122.951Z" fill="#7DC215"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">Krutrim AI</h3>
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