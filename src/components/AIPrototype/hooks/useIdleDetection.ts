import { useState, useEffect, useCallback } from 'react';

interface UseIdleDetectionProps {
  timeout: number; // in milliseconds
  onIdle?: () => void;
  onActive?: () => void;
}

export const useIdleDetection = ({ 
  timeout, 
  onIdle, 
  onActive 
}: UseIdleDetectionProps) => {
  const [isIdle, setIsIdle] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const resetTimer = useCallback(() => {
    if (!hasInteracted) {
      setHasInteracted(true);
    }
    
    if (isIdle) {
      setIsIdle(false);
      onActive?.();
    }
  }, [isIdle, hasInteracted, onActive]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleActivity = () => {
      resetTimer();
      clearTimeout(timeoutId);
      
      timeoutId = setTimeout(() => {
        setIsIdle(true);
        onIdle?.();
      }, timeout);
    };

    // Activity events to track
    const events = [
      'mousedown',
      'mousemove', 
      'keypress',
      'scroll',
      'touchstart',
      'click'
    ];

    // Add event listeners
    events.forEach(event => {
      document.addEventListener(event, handleActivity, true);
    });

    // Initialize the timer
    if (hasInteracted) {
      timeoutId = setTimeout(() => {
        setIsIdle(true);
        onIdle?.();
      }, timeout);
    }

    return () => {
      // Cleanup
      events.forEach(event => {
        document.removeEventListener(event, handleActivity, true);
      });
      clearTimeout(timeoutId);
    };
  }, [timeout, onIdle, resetTimer, hasInteracted]);

  return {
    isIdle,
    hasInteracted,
    resetTimer
  };
};
