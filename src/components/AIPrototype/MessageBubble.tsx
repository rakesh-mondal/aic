'use client';

import React from 'react';
import { CheckCircle, AlertCircle, Clock, User, Bot } from 'lucide-react';
import { ChatMessage } from '../../data/mockAIResponses';
import { usePrototypeStore } from '../../store/prototypeStore';
import ConfigPreview from './ConfigPreview';
import { Button } from '../../../components/ui/button';

interface MessageBubbleProps {
  message: ChatMessage;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const { handleAction } = usePrototypeStore();

  const isUser = message.type === 'user';
  const isSuccess = message.status === 'deployed';
  const isError = message.status === 'error';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-fadeIn`}>
      <div className={`max-w-xs lg:max-w-md flex ${isUser ? 'flex-row-reverse' : 'flex-row'} items-start space-x-2`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isUser ? 'bg-gray-900 ml-2' : 'bg-gray-300 mr-2'
        }`}>
          {isUser ? (
            <User size={16} className="text-white" />
          ) : (
            <Bot size={16} className="text-gray-600" />
          )}
        </div>

        {/* Message Content */}
        <div className="flex flex-col space-y-2">
          {/* Main Message Bubble */}
          <div
            className={`px-4 py-2 rounded-lg ${
              isUser
                ? 'bg-gray-900 text-white rounded-br-none'
                : isSuccess
                ? 'bg-green-50 text-green-800 border border-green-200 rounded-bl-none'
                : isError
                ? 'bg-red-50 text-red-800 border border-red-200 rounded-bl-none'
                : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none shadow-sm'
            }`}
          >
            {/* Status Icon */}
            {(isSuccess || isError) && (
              <div className="flex items-center space-x-2 mb-2">
                {isSuccess ? (
                  <CheckCircle size={16} className="text-green-600" />
                ) : (
                  <AlertCircle size={16} className="text-red-600" />
                )}
                <span className="text-sm font-semibold">
                  {isSuccess ? 'Deployment Successful' : 'Error'}
                </span>
              </div>
            )}

            {/* Message Text */}
            <div className="whitespace-pre-wrap text-sm leading-relaxed">
              {message.content}
            </div>

            {/* Timestamp */}
            <div className={`text-xs mt-2 ${
              isUser ? 'text-gray-300' : 'text-gray-500'
            }`}>
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>

          {/* Configuration Preview */}
          {message.config && (
            <ConfigPreview config={message.config} />
          )}

          {/* Action Buttons */}
          {message.actions && message.actions.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {message.actions.map((action, index) => (
                <Button
                  key={index}
                  onClick={() => handleAction(action.action, message.config)}
                  variant={
                    action.variant === 'primary' 
                      ? 'default' 
                      : action.variant === 'destructive' 
                      ? 'destructive' 
                      : 'outline'
                  }
                  size="sm"
                  className="text-sm"
                >
                  {action.label}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}