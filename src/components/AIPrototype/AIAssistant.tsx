'use client';

import React from 'react';
import FloatingButton from './FloatingButton';
import ChatPanel from './ChatPanel';

/**
 * Main AI Assistant component that provides the complete chat experience
 * Includes the floating button and chat panel with all functionality
 */
export default function AIAssistant() {
  return (
    <>
      <FloatingButton />
      <ChatPanel />
    </>
  );
}