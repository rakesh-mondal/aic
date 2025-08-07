'use client';

import React from 'react';
import { MessageCircle, X, Sparkles } from 'lucide-react';
import { usePrototypeStore } from '../../store/prototypeStore';

export default function FloatingButton() {
  const { isAIAssistantOpen, toggleAssistant } = usePrototypeStore();

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={toggleAssistant}
        className="fixed z-50 transition-all duration-300 hover:scale-110 active:scale-95"
        style={{
          bottom: '30px',
          right: '30px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: '#10b981',
          border: 'none',
          boxShadow: '0 8px 25px rgba(16, 185, 129, 0.3)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Icon */}
        {isAIAssistantOpen ? (
          <X size={24} color="white" />
        ) : (
          <MessageCircle size={24} color="white" />
        )}

        {/* AI Badge */}
        {!isAIAssistantOpen && (
          <div
            className="absolute -top-1 -right-1 flex items-center justify-center text-xs font-bold text-white"
            style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              backgroundColor: '#3b82f6',
              border: '2px solid white',
            }}
          >
            <Sparkles size={10} />
          </div>
        )}

        {/* Pulse Animation Ring */}
        {!isAIAssistantOpen && (
          <div
            className="absolute inset-0 rounded-full border-2 border-emerald-500 animate-ping"
            style={{
              animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
            }}
          />
        )}
      </button>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes ping {
          75%, 100% {
            transform: scale(1.1);
            opacity: 0;
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: .8;
          }
        }
        
        button:hover {
          transform: scale(1.1);
        }
        
        button:active {
          transform: scale(0.95);
        }
      `}</style>
    </>
  );
}