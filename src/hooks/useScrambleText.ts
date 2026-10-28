'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

const DEFAULT_GLYPHS = '!<>-_\/[]{}—=+*^?#_0123456789@%&$~░▒';

export interface UseScrambleTextOptions {
  text: string;
  duration?: number;
  glyphs?: string;
  triggerOnHover?: boolean;
  triggerOnView?: boolean;
}

export function useScrambleText({
  text,
  duration = 650,
  glyphs = DEFAULT_GLYPHS,
  triggerOnHover = true,
  triggerOnView = false
}: UseScrambleTextOptions) {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const hasTriggeredOnView = useRef(false);

  // Sync if text prop changes
  useEffect(() => {
    setDisplayText(text);
  }, [text]);

  const scramble = useCallback(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplayText(text);
      return;
    }

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    setIsScrambling(true);
    const startTime = performance.now();
    const length = text.length;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // How many characters have locked in
      const lockedCount = Math.floor(progress * length);

      let result = '';
      for (let i = 0; i < length; i++) {
        if (text[i] === ' ' || text[i] === '\n') {
          result += text[i];
        } else if (i < lockedCount) {
          result += text[i];
        } else {
          result += glyphs[Math.floor(Math.random() * glyphs.length)];
        }
      }

      setDisplayText(result);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayText(text);
        setIsScrambling(false);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [text, duration, glyphs]);

  // Handle trigger on view via IntersectionObserver
  useEffect(() => {
    if (!triggerOnView) return;
    const el = elementRef.current;
    if (!el || hasTriggeredOnView.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTriggeredOnView.current) {
            hasTriggeredOnView.current = true;
            scramble();
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [triggerOnView, scramble]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (triggerOnHover) {
      scramble();
    }
  }, [triggerOnHover, scramble]);

  return {
    displayText,
    isScrambling,
    scramble,
    ref: elementRef,
    onMouseEnter: handleMouseEnter
  };
}
