'use client';

import { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      // Immediately force cursor: none on mousemove
      forceCursorNone();
      
      // Update position directly - zero lag, instant response
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Check if hovering over interactive elements
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' ||
        target.closest('a') !== null ||
        target.closest('button') !== null ||
        window.getComputedStyle(target).cursor === 'pointer';
      
      setIsHovering(isInteractive);
    };

    // Inject global style tag for maximum enforcement
    const styleId = 'custom-cursor-hide';
    let styleTag = document.getElementById(styleId) as HTMLStyleElement;
    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.id = styleId;
      styleTag.textContent = `
        *, *::before, *::after {
          cursor: none !important;
        }
        html, body, html *, body * {
          cursor: none !important;
        }
        a, button, input, textarea, select, [role="button"], [onclick] {
          cursor: none !important;
        }
      `;
      document.head.appendChild(styleTag);
    }

    // Aggressive cursor hiding function - apply to ALL elements
    const forceCursorNone = () => {
      // Apply to document and body with inline styles as backup
      if (document.documentElement) {
        document.documentElement.style.setProperty('cursor', 'none', 'important');
      }
      if (document.body) {
        document.body.style.setProperty('cursor', 'none', 'important');
      }
      
      // Also apply to all elements in the DOM (more aggressive)
      const allElements = document.querySelectorAll('*');
      allElements.forEach((el) => {
        if (el instanceof HTMLElement) {
          el.style.setProperty('cursor', 'none', 'important');
        }
      });
    };

    // Use requestAnimationFrame for continuous enforcement (runs every frame)
    let enforceRafId: number;
    const enforceCursor = () => {
      forceCursorNone();
      enforceRafId = requestAnimationFrame(enforceCursor);
    };

    // Initial setup
    forceCursorNone();
    enforceCursor();

    // Also use MutationObserver to catch any style changes and new elements
    const observer = new MutationObserver((mutations) => {
      forceCursorNone();
      // Also apply to any newly added nodes
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) {
            node.style.setProperty('cursor', 'none', 'important');
            // Also apply to all children
            const children = node.querySelectorAll('*');
            children.forEach((child) => {
              if (child instanceof HTMLElement) {
                child.style.setProperty('cursor', 'none', 'important');
              }
            });
          }
        });
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['style', 'class'],
      subtree: true,
      childList: true,
      attributeOldValue: false,
    });

    // Listen to document-level events
    document.addEventListener('mousemove', updateCursor);
    document.addEventListener('mouseover', updateCursor);
    
    // Also listen to visibility changes
    document.addEventListener('visibilitychange', forceCursorNone);
    window.addEventListener('focus', forceCursorNone);
    window.addEventListener('blur', forceCursorNone);

    return () => {
      document.removeEventListener('mousemove', updateCursor);
      document.removeEventListener('mouseover', updateCursor);
      document.removeEventListener('visibilitychange', forceCursorNone);
      window.removeEventListener('focus', forceCursorNone);
      window.removeEventListener('blur', forceCursorNone);
      if (enforceRafId) {
        cancelAnimationFrame(enforceRafId);
      }
      observer.disconnect();
    };
  }, []);

  return (
    <div
      className="fixed pointer-events-none z-[10001]"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)',
        opacity: 1, // Always visible
        // No transition on position for zero lag
        willChange: 'transform',
        transformOrigin: 'center center',
      }}
    >
      <div 
        className="bg-white"
        style={{
          width: isHovering ? '16px' : '12px',
          height: isHovering ? '16px' : '12px',
          transition: 'width 0.15s ease-out, height 0.15s ease-out',
          // Sharp edges, no anti-aliasing for crisp square
          imageRendering: 'crisp-edges',
        }}
      />
    </div>
  );
}
