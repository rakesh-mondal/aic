'use client';

import React, { useRef, useEffect } from 'react';
import { X, Send } from 'lucide-react';
import { usePrototypeStore } from '../../store/prototypeStore';
import MessageBubble from './MessageBubble';
import QuickActions from './QuickActions';
import { usePrototypeChat } from './hooks/usePrototypeChat';

export default function ChatPanel() {
  const {
    isAIAssistantOpen,
    toggleAssistant,
    messages,
    currentInput,
    setCurrentInput,
    isTyping,
    showSuggestions
  } = usePrototypeStore();

  const { handleConversation } = usePrototypeChat();

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Focus input when panel opens
  useEffect(() => {
    if (isAIAssistantOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isAIAssistantOpen]);

  const handleSendMessage = async () => {
    if (!currentInput.trim()) return;
    
    const message = currentInput.trim();
    setCurrentInput('');
    await handleConversation(message);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isAIAssistantOpen) return null;

  return (
    <>
      {/* Backdrop for mobile */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
        onClick={toggleAssistant}
      />

      {/* Chat Panel */}
      <div
        className="fixed z-50 bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col transition-all duration-300 ease-out"
        style={{
          // Desktop positioning
          bottom: '100px',
          right: '30px',
          width: '400px',
          height: '600px',
          // Mobile responsive
          '@media (max-width: 768px)': {
            bottom: '0',
            right: '0',
            left: '0',
            top: '0',
            width: '100%',
            height: '100%',
            borderRadius: '0',
          }
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <h3 className="font-semibold text-gray-800">Krutrim Cloud Assistant</h3>
          </div>
          <button
            onClick={toggleAssistant}
            className="p-1 hover:bg-gray-200 rounded-full transition-colors"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.length === 0 && showSuggestions ? (
            <QuickActions />
          ) : (
            <>
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}
              
              {/* Typing indicator */}
              {isTyping && (
                <div className="flex items-center space-x-2">
                  <div className="bg-white rounded-lg px-4 py-2 shadow-sm border border-gray-200">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-gray-200 bg-white rounded-b-lg">
          <div className="flex space-x-2">
            <input
              ref={inputRef}
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me to deploy resources, check costs, or manage your cloud..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <button
              onClick={handleSendMessage}
              disabled={!currentInput.trim()}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile responsive styles */}
      <style jsx>{`
        @media (max-width: 768px) {
          .fixed.z-50.bg-white {
            bottom: 0 !important;
            right: 0 !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            height: 100% !important;
            border-radius: 0 !important;
          }
        }
      `}</style>
    </>
  );
}