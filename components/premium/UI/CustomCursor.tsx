"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type CursorMode = 'default' | 'hover' | 'text' | 'link' | 'drag' | 'disabled';

export function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [cursorMode, setCursorMode] = useState<CursorMode>('default');
  const [cursorText, setCursorText] = useState('');
  
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsPressed(true);
    const handleMouseUp = () => setIsPressed(false);
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Add hover detection for interactive elements with context
    const addHoverListeners = () => {
      // Links
      document.querySelectorAll('a').forEach(el => {
        el.addEventListener('mouseenter', () => {
          setIsHovered(true);
          setCursorMode('link');
        });
        el.addEventListener('mouseleave', () => {
          setIsHovered(false);
          setCursorMode('default');
        });
      });

      // Buttons
      document.querySelectorAll('button, [role="button"]').forEach(el => {
        el.addEventListener('mouseenter', () => {
          setIsHovered(true);
          setCursorMode('hover');
        });
        el.addEventListener('mouseleave', () => {
          setIsHovered(false);
          setCursorMode('default');
        });
      });

      // Text inputs
      document.querySelectorAll('input[type="text"], textarea').forEach(el => {
        el.addEventListener('mouseenter', () => {
          setIsHovered(true);
          setCursorMode('text');
        });
        el.addEventListener('mouseleave', () => {
          setIsHovered(false);
          setCursorMode('default');
        });
      });

      // Draggable elements
      document.querySelectorAll('[data-cursor="drag"]').forEach(el => {
        el.addEventListener('mouseenter', () => {
          setIsHovered(true);
          setCursorMode('drag');
          setCursorText('Drag');
        });
        el.addEventListener('mouseleave', () => {
          setIsHovered(false);
          setCursorMode('default');
          setCursorText('');
        });
      });

      // View elements
      document.querySelectorAll('[data-cursor="view"]').forEach(el => {
        el.addEventListener('mouseenter', () => {
          setIsHovered(true);
          setCursorText('View');
        });
        el.addEventListener('mouseleave', () => {
          setIsHovered(false);
          setCursorText('');
        });
      });
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    // Initial setup and mutation observer for dynamic content
    addHoverListeners();
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      observer.disconnect();
    };
  }, [cursorX, cursorY, isVisible]);

  // Check for touch device - moved to useEffect to avoid hydration mismatch
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window);
  }, []);

  if (isTouchDevice) {
    return null;
  }

  // Cursor configurations based on mode
  const cursorConfigs = {
    default: { dotSize: 12, ringSize: 40, dotColor: 'white' },
    hover: { dotSize: 18, ringSize: 60, dotColor: '#10B981' },
    text: { dotSize: 3, ringSize: 30, dotColor: 'white' },
    link: { dotSize: 8, ringSize: 50, dotColor: '#3B82F6' },
    drag: { dotSize: 20, ringSize: 40, dotColor: '#F59E0B' },
    disabled: { dotSize: 12, ringSize: 40, dotColor: '#DC2626' },
  };

  const config = cursorConfigs[cursorMode];

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className="rounded-full mix-blend-difference"
          style={{
            backgroundColor: config.dotColor,
          }}
          animate={{
            width: isPressed ? config.dotSize * 0.5 : config.dotSize,
            height: isPressed ? config.dotSize * 0.5 : config.dotSize,
            opacity: isVisible ? 1 : 0,
          }}
          transition={{
            width: { duration: 0.15 },
            height: { duration: 0.15 },
            opacity: { duration: 0.2 },
          }}
        />
        
        {/* Cursor text */}
        {cursorText && (
          <motion.span
            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 text-xs font-medium text-white whitespace-nowrap"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>

      {/* Cursor ring */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className="border rounded-full"
          style={{
            borderColor: cursorMode === 'link' ? '#3B82F6' : 'rgba(0,0,0,0.2)',
          }}
          animate={{
            width: config.ringSize,
            height: config.ringSize,
            opacity: isVisible ? (isHovered ? 0.5 : 0.3) : 0,
            borderWidth: cursorMode === 'text' ? 2 : 1,
          }}
          transition={{
            width: { type: "spring", stiffness: 300, damping: 20 },
            height: { type: "spring", stiffness: 300, damping: 20 },
            opacity: { duration: 0.2 },
          }}
        />
        
        {/* Special cursor modes */}
        {cursorMode === 'drag' && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-1 h-full bg-orange-500/30" />
            <div className="absolute w-full h-1 bg-orange-500/30" />
          </motion.div>
        )}
      </motion.div>

      {/* Hide default cursor using inline style */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            * {
              cursor: none !important;
            }
          `,
        }}
      />
    </>
  );
}