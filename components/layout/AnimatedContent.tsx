'use client';

import { ReactNode, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLoading } from '@/lib/loadingContext';
import { usePathname } from 'next/navigation';

export default function AnimatedContent({ children }: { children: ReactNode }) {
  const { isLoading } = useLoading();
  const pathname = usePathname();
  
  // Scroll to top when animation completes and on route change
  useEffect(() => {
    if (!isLoading) {
      // Small delay to ensure animation has completed
      const timer = setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isLoading, pathname]);
  
  // Disable scroll restoration on mount
  useEffect(() => {
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);
  
  return (
    <motion.div
      initial={{ y: '50vh', opacity: 0 }}
      animate={!isLoading ? { y: 0, opacity: 1 } : { y: '50vh', opacity: 0 }}
      transition={{ 
        type: "spring", 
        stiffness: 100, 
        damping: 20,
        duration: 0.8 
      }}
      style={{ willChange: 'transform' }}
    >
      {children}
    </motion.div>
  );
}
