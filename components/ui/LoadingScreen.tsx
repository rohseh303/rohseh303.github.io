'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { CURRENT_TRACK, TRACK_DURATION } from '@/lib/audioConfig';
import { useLoading } from '@/lib/loadingContext';

// Binary Grid Component with flowing animation
function BinaryGrid() {
  const [binaryValues, setBinaryValues] = useState<string[]>(
    Array.from({ length: 65 }, () => Math.random() > 0.5 ? '1' : '0')
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setBinaryValues(prev => 
        prev.map(() => Math.random() > 0.5 ? '1' : '0')
      );
    }, 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      className="grid grid-cols-13 gap-2" 
      style={{ gridTemplateColumns: 'repeat(13, minmax(0, 1fr))' }}
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.02,
          },
        },
      }}
    >
      {binaryValues.map((value, i) => (
        <motion.div
          key={i}
          className="w-3 h-3 bg-white font-mono text-xs flex items-center justify-center"
          variants={{
            hidden: { opacity: 0, y: -10, scale: 0.8 },
            visible: { 
              opacity: 1, 
              y: 0, 
              scale: 1,
            },
          }}
          animate={{
            y: [0, -4, 0],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            y: { duration: 2 + Math.random(), repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: 2 + Math.random(), repeat: Infinity, ease: "easeInOut", delay: i * 0.05 },
          }}
        >
          {value}
        </motion.div>
      ))}
    </motion.div>
  );
}

// Fade-out audio function
const fadeOutAudio = (audio: HTMLAudioElement, duration: number = 500) => {
  const startVolume = audio.volume;
  const fadeStep = startVolume / (duration / 50); // 50ms intervals
  const fadeInterval = setInterval(() => {
    if (audio.volume > 0) {
      audio.volume = Math.max(0, audio.volume - fadeStep);
    } else {
      clearInterval(fadeInterval);
      audio.pause();
      audio.currentTime = 0;
      audio.volume = startVolume; // Reset for next time
    }
  }, 50);
  return fadeInterval;
};

export default function LoadingScreen() {
  const { isLoading, setLoading } = useLoading();
  const [hasStarted, setHasStarted] = useState(false);
  const [stage, setStage] = useState(0); // 0: network, 1: structured, 2: waves, 3: binary
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const stage2AdvanceRef = useRef<(() => void) | null>(null);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  // Dynamic stage durations - 4 stages total
  const STAGE_DURATIONS = [
    1500, // Stage 0: 1.5s - Network nodes (keep as is - great!)
    1200, // Stage 1: 1.2s - Structured pattern (slightly faster than stage 0)
    1000, // Stage 2: 1.0s - Waves/circles (faster than stage 1)
    800,  // Stage 3: 0.8s - Binary grid (quick)
  ];

  // Check if we should show loading screen - only on initial page load of home page
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // If not on home page, don't show loading screen and mark that we've navigated
    if (!isHomePage) {
      setLoading(false);
      sessionStorage.setItem('hasNavigated', 'true');
      return;
    }
    
    // Check if we've navigated within this session (not initial page load)
    const hasNavigated = sessionStorage.getItem('hasNavigated') === 'true';
    if (hasNavigated) {
      setLoading(false);
      return;
    }
    
    // Check if loading screen has been completed in this session
    const hasCompleted = sessionStorage.getItem('loadingScreenCompleted') === 'true';
    if (hasCompleted) {
      setLoading(false);
      return;
    }
    
    // This is the initial page load on home page - show loading screen
    setLoading(true);
  }, [isHomePage, setLoading]);

  // Clean up audio only when navigating away from home page
  useEffect(() => {
    // Only clean up when leaving the home page, not when arriving
    if (!isHomePage && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
  }, [isHomePage]);

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current = null;
      }
    };
  }, []);

  // Initialize audio (but don't play yet) - only on home page and if not already completed
  useEffect(() => {
    if (!isHomePage) {
      return;
    }
    
    // Don't initialize audio if loading screen has already been completed in this session
    if (typeof window !== 'undefined') {
      const hasCompleted = sessionStorage.getItem('loadingScreenCompleted') === 'true';
      if (hasCompleted) {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
        return;
      }
    }
    
    // Don't initialize if we've navigated (not initial page load)
    if (typeof window !== 'undefined') {
      const hasNavigated = sessionStorage.getItem('hasNavigated') === 'true';
      if (hasNavigated) {
        return;
      }
    }
    
    if (typeof window !== 'undefined' && !audioRef.current) {
      audioRef.current = new Audio(`/audio/${CURRENT_TRACK}`);
      audioRef.current.loop = false;
      audioRef.current.volume = 1.0; // Maximum volume
      
      // Add event listeners for debugging
      audioRef.current.addEventListener('loadeddata', () => {
        console.log('Audio loaded successfully:', CURRENT_TRACK);
      });
      
      audioRef.current.addEventListener('error', (e) => {
        console.error('Audio error:', e);
        console.error('Trying to load:', `/audio/${CURRENT_TRACK}`);
      });
      
      audioRef.current.addEventListener('play', () => {
        console.log('Audio started playing');
      });
      
      // Preload the audio
      audioRef.current.load();
    }
  }, [isHomePage]);

  // Start audio and animation when user clicks
  useEffect(() => {
    if (!hasStarted) return;

    let stopAudio: NodeJS.Timeout | null = null;
    let stageTimeouts: NodeJS.Timeout[] = [];
    
    // Play audio starting from 2-second mark
    if (audioRef.current) {
      audioRef.current.currentTime = 2; // Start from 2-second mark
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error('Failed to play audio:', error);
        });
      }

      // Stop audio with fade-out (start fading 6 seconds before end)
      stopAudio = setTimeout(() => {
        if (audioRef.current) {
          fadeOutAudio(audioRef.current, 6000); // 6 second fade-out
        }
      }, (TRACK_DURATION * 1000) - 6000); // Start fade 6 seconds before end
    }

    // Dynamic stage-based timing - cycle through stages with varying durations
    let currentStage = 0;
    const advanceStage = () => {
      if (currentStage < STAGE_DURATIONS.length - 1) {
        currentStage++;
        setStage(currentStage);
        
        // Special handling for stage 2 (circles): advance when animation completes
        if (currentStage === 2) {
          // Faster timing: reduce the wait for animation cycle
          // Container fade-in: 600ms + stagger delay (400ms) + shorter cycle wait (1000ms instead of 2000ms) = 2000ms
          const circleAnimationTime = 600 + (0.2 * 1000 * 2) + 1000; // 2000ms total (faster)
          const timeout = setTimeout(() => {
            advanceStage();
          }, circleAnimationTime);
          stageTimeouts.push(timeout);
        } else {
          const timeout = setTimeout(advanceStage, STAGE_DURATIONS[currentStage]);
          stageTimeouts.push(timeout);
        }
      } else {
        // All stages complete, fade out
        setTimeout(() => {
          setLoading(false);
        }, 300);
      }
    };
    
    // Store advance function for stage 2 (in case we want to use it from component)
    stage2AdvanceRef.current = advanceStage;

    // Start first stage, then advance after its duration
    const firstTimeout = setTimeout(() => {
      advanceStage();
    }, STAGE_DURATIONS[0]);
    stageTimeouts.push(firstTimeout);

    return () => {
      if (stopAudio) clearTimeout(stopAudio);
      stageTimeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, [hasStarted, isHomePage]);

  // Mark as completed when loading finishes (persist in sessionStorage)
  useEffect(() => {
    if (!isLoading && hasStarted && typeof window !== 'undefined') {
      sessionStorage.setItem('loadingScreenCompleted', 'true');
    }
  }, [isLoading, hasStarted]);

  // Don't show loading screen on non-home pages - AFTER all hooks
  if (!isHomePage) {
    return null;
  }

  if (!isLoading) return null;

  const handleStart = () => {
    setHasStarted(true);
  };

  return (
    <div
      className="fixed inset-0 z-[10000] bg-[#0a0a0a] flex items-center justify-center transition-opacity duration-500"
      style={{ opacity: isLoading ? 1 : 0 }}
    >
      <div className="flex flex-col items-center gap-12 w-full max-w-4xl px-8">
        {!hasStarted ? (
          // Click to Start button
          <motion.button
            onClick={handleStart}
            className="px-8 py-3 text-white text-sm uppercase tracking-wider hover:opacity-50 transition-all duration-300 cursor-none"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Click to Start
          </motion.button>
        ) : (
          // Loading animations
          <>
            {/* Stage 0: Network/graph pattern with sequential appearance */}
            {stage === 0 && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
          <motion.div 
            className="relative w-96 h-96"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i / 12) * Math.PI * 2;
              const radius = 120;
              const x = 192 + Math.cos(angle) * radius;
              const y = 192 + Math.sin(angle) * radius;
              return (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-white rounded-full"
                  style={{
                    left: `${x}px`,
                    top: `${y}px`,
                  }}
                  variants={{
                    hidden: { scale: 0, opacity: 0 },
                    visible: { scale: 1, opacity: 0.8 },
                  }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                />
              );
            })}
            {/* Connecting lines that draw themselves */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {Array.from({ length: 12 }).map((_, i) => {
                const angle1 = (i / 12) * Math.PI * 2;
                const angle2 = ((i + 3) / 12) * Math.PI * 2;
                const x1 = 192 + Math.cos(angle1) * 120;
                const y1 = 192 + Math.sin(angle1) * 120;
                const x2 = 192 + Math.cos(angle2) * 120;
                const y2 = 192 + Math.sin(angle2) * 120;
                return (
                  <motion.line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="1"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.3 }}
                    transition={{ delay: i * 0.1 + 0.5, duration: 0.5 }}
                  />
                );
              })}
            </svg>
          </motion.div>
          </motion.div>
        )}

            {/* Stage 1: Structured diamond pattern - builds itself */}
            {stage === 1 && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
          <motion.div 
            className="relative w-[400px] h-[400px]"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}
          >
            <svg className="w-full h-full" viewBox="0 0 400 400">
              {[
                [200, 50], [150, 150], [250, 150], [100, 250], [200, 250], [300, 250],
                [150, 350], [250, 350], [200, 450]
              ].map(([x, y], i) => (
                <motion.rect
                  key={i}
                  x={x - 6}
                  y={y - 6}
                  width={12}
                  height={12}
                  fill="white"
                  variants={{
                    hidden: { scale: 0, opacity: 0 },
                    visible: { scale: 1, opacity: 1 },
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
              ))}
              {[
                [200, 50, 150, 150], [200, 50, 250, 150],
                [150, 150, 100, 250], [150, 150, 200, 250],
                [250, 150, 200, 250], [250, 150, 300, 250],
                [100, 250, 150, 350], [200, 250, 150, 350], [200, 250, 250, 350],
                [300, 250, 250, 350], [150, 350, 200, 450], [250, 350, 200, 450]
              ].map(([x1, y1, x2, y2], i) => (
                <motion.line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="1"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.4 }}
                  transition={{ delay: i * 0.1 + 0.3, duration: 0.6 }}
                />
              ))}
            </svg>
          </motion.div>
          </motion.div>
        )}

            {/* Stage 2: Concentric circles with pulsing animation */}
            {stage === 2 && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
          <motion.div 
            className="relative w-96 h-96"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
          >
            <motion.div 
              className="absolute top-1/2 left-1/2 w-8 h-8 bg-white rounded-full"
              style={{ x: '-50%', y: '-50%' }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", bounce: 0.5 }}
            />
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="absolute top-1/2 left-1/2 border border-white rounded-full"
                style={{
                  width: `${60 + i * 40}px`,
                  height: `${60 + i * 40}px`,
                  x: '-50%',
                  y: '-50%',
                }}
                variants={{
                  hidden: { scale: 0, opacity: 0 },
                  visible: { 
                    scale: 1, 
                    opacity: 0.6 - i * 0.15,
                  },
                }}
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.6 - i * 0.15, 0.8 - i * 0.15, 0.6 - i * 0.15],
                }}
                transition={{
                  scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                  opacity: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                }}
              />
            ))}
          </motion.div>
          </motion.div>
        )}

            {/* Stage 3: Binary grid with flowing numbers */}
            {stage === 3 && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <BinaryGrid />
          </motion.div>
        )}
          </>
        )}
      </div>
    </div>
  );
}
