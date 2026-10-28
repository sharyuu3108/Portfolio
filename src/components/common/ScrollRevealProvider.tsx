'use client';

import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const ScrollRevealProvider: React.FC = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Heading & Chapter Header Line-by-Line Stagger (Daksh Gajjar style)
      const headers = document.querySelectorAll<HTMLElement>(
        'header[class*="header"], [data-heading-reveal]'
      );

      headers.forEach((header) => {
        // Find child elements to stagger (badge, h2, description)
        const children = header.querySelectorAll<HTMLElement>(
          '[class*="chapterBadge"], h2, [class*="description"]'
        );

        if (children.length > 0) {
          gsap.fromTo(
            children,
            {
              opacity: 0,
              filter: 'blur(12px)',
              y: 32
            },
            {
              opacity: 1,
              filter: 'blur(0px)',
              y: 0,
              duration: 1.0,
              stagger: 0.12,
              ease: 'power2.out',
              clearProps: 'filter,transform',
              scrollTrigger: {
                trigger: header,
                start: 'top 88%',
                once: true
              }
            }
          );
        }
      });

      // 2. Card Grids Staggered Rise (Project cards, Gallery cards, Matrix pillars)
      const grids = document.querySelectorAll<HTMLElement>(
        '[class*="sideBySideGrid"], [class*="galleryGrid"], [class*="explorationsGrid"], [class*="impactGrid"], [class*="skillsCategoryGrid"]'
      );

      grids.forEach((grid) => {
        const cards = Array.from(grid.children) as HTMLElement[];
        if (cards.length > 0) {
          gsap.fromTo(
            cards,
            {
              opacity: 0,
              filter: 'blur(10px)',
              y: 42
            },
            {
              opacity: 1,
              filter: 'blur(0px)',
              y: 0,
              duration: 0.95,
              stagger: 0.14,
              ease: 'power3.out',
              clearProps: 'filter,transform',
              scrollTrigger: {
                trigger: grid,
                start: 'top 86%',
                once: true
              }
            }
          );
        }
      });

      // 3. Standalone Scroll Reveal Elements (Narrative blocks, Hero copy, Timeline nodes)
      const standaloneReveals = document.querySelectorAll<HTMLElement>(
        '.scroll-reveal:not([class*="sideBySideGrid"]):not([class*="galleryGrid"]):not([class*="explorationsGrid"]):not([class*="impactGrid"]):not([class*="skillsCategoryGrid"])'
      );

      standaloneReveals.forEach((el) => {
        // Skip if parent is already an animated grid to avoid double triggering
        if (el.parentElement?.closest('[class*="sideBySideGrid"], [class*="galleryGrid"], [class*="explorationsGrid"]')) {
          return;
        }

        gsap.fromTo(
          el,
          {
            opacity: 0,
            filter: 'blur(8px)',
            y: 36
          },
          {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            clearProps: 'filter,transform',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              once: true
            }
          }
        );
      });

      ScrollTrigger.refresh();
    });

    return () => {
      ctx.revert();
    };
  }, []);

  return null;
};
