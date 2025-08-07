'use client'

import React, { useEffect, useRef } from 'react'
import { X, Minimize2, Maximize2, Send, MessageSquare } from 'lucide-react'
import { usePrototypeStore } from '../../store/prototypeStore'
import MessageBubble from './MessageBubble'
import QuickActions from './QuickActions'
import ConfigPreview from './ConfigPreview'
import { usePrototypeChat } from './hooks/usePrototypeChat'

export function CopilotPanel() {
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
    pageContext,
    currentPage
  } = usePrototypeStore()

  const { handleConversation } = usePrototypeChat()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  useEffect(() => {
    if (isAIAssistantOpen && inputRef.current) {
      inputRef.current.focus()
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
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isAIAssistantOpen) {
        toggleAssistant()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isAIAssistantOpen, toggleAssistant])

  if (!isAIAssistantOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={toggleAssistant}
      />
      
      {/* Copilot Panel */}
      <div className={`
        fixed top-0 right-0 h-full w-[400px] bg-white border-l border-gray-200 shadow-2xl z-50
        transform transition-transform duration-300 ease-in-out
        ${isAIAssistantOpen ? 'translate-x-0' : 'translate-x-full'}
        flex flex-col
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">AI Copilot</h3>
              <p className="text-xs text-gray-600">
                {pageContext.title} • {currentPage}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleAssistant}
              className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors"
              title="Minimize"
            >
              <Minimize2 className="w-4 h-4 text-gray-600" />
            </button>
            <button
              onClick={toggleAssistant}
              className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors"
              title="Close"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Page Context Indicator */}
        <div className="px-4 py-2 bg-gray-50 border-b border-gray-100">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-600">
              Context: <span className="font-medium text-gray-800">{pageContext.title}</span>
            </span>
            <span className="text-blue-600 font-medium">
              {pageContext.capabilities.length} capabilities
            </span>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && showSuggestions ? (
            <div className="space-y-4">
              {/* Welcome Message */}
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Welcome to AI Copilot!
                </h4>
                <p className="text-sm text-gray-600 mb-6">
                  I'm here to help you with {pageContext.title.toLowerCase()}. What would you like to do?
                </p>
              </div>

              {/* Quick Actions for Current Page */}
              <QuickActions />

              {/* Suggestions */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">Or try these suggestions:</p>
                {suggestions.slice(0, 3).map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full text-left p-3 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {/* Chat Messages */}
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                  <span className="text-sm text-gray-500">AI is thinking...</span>
                </div>
              )}
            </>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <div className="flex items-end space-x-3">
            <div className="flex-1">
              <textarea
                ref={inputRef}
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={`Ask me about ${pageContext.title.toLowerCase()}...`}
                className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                rows={currentInput.split('\n').length}
                maxLength={500}
                disabled={isTyping}
              />
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-gray-500">
                  {currentInput.length}/500
                </span>
                <span className="text-xs text-gray-500">
                  Press Ctrl+Enter to send
                </span>
              </div>
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!currentInput.trim() || isTyping}
              className="flex-shrink-0 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default CopilotPanel