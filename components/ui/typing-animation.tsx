'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TypingAnimationProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
}

export function TypingAnimation({ 
  text, 
  speed = 100, 
  delay = 0, 
  className 
}: TypingAnimationProps) {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const startTyping = () => {
      let i = 0;
      const typeChar = () => {
        if (i < text.length) {
          setDisplayText(text.slice(0, i + 1));
          i++;
          timeoutId = setTimeout(typeChar, speed);
        } else {
          // Hide cursor after typing is complete
          setTimeout(() => setShowCursor(false), 1000);
        }
      };
      typeChar();
    };

    timeoutId = setTimeout(startTyping, delay);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [text, speed, delay]);

  useEffect(() => {
    if (displayText.length === text.length) return;

    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, [displayText.length, text.length]);

  return (
    <span className={className}>
      {displayText}
      <motion.span
        animate={{ opacity: showCursor ? 1 : 0 }}
        transition={{ duration: 0.1 }}
        className="ml-1 inline-block"
      >
        |
      </motion.span>
    </span>
  );
}