'use client';

import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import styles from './JourneyRail.module.scss';

interface Chapter {
  id: string;
  number: string;
  name: string;
  label: string;
}

const chapters: Chapter[] = [
  { id: 'signal', number: '00', name: 'SIGNAL', label: 'Chapter 00 // The Signal' },
  { id: 'origin', number: '01', name: 'ORIGIN', label: 'Chapter 01 // The Origin' },
  { id: 'machine', number: '02', name: 'MACHINE', label: 'Chapter 02 // The Machine' },
  { id: 'imagination', number: '03', name: 'IMAGINE', label: 'Chapter 03 // The Imagination' },
  { id: 'matrix', number: '04', name: 'MATRIX', label: 'Chapter 04 // The Matrix' },
  { id: 'journey', number: '05', name: 'JOURNEY', label: 'Chapter 05 // The Journey' },
  { id: 'connection', number: '06', name: 'CONNECT', label: 'Chapter 06 // The Connection' }
];

export const JourneyRail: React.FC = () => {
  const [activeChapter, setActiveChapter] = useState<string>('signal');
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Calculate global scroll percentage
          const scrollTop = window.scrollY;
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          const progress = docHeight > 0 ? Math.min(Math.max(scrollTop / docHeight, 0), 1) : 0;
          setScrollProgress(progress);

          // Find current chapter by intersection threshold
          const chapterElements = chapters
            .map((ch) => ({ id: ch.id, el: document.getElementById(ch.id) }))
            .filter((item): item is { id: string; el: HTMLElement } => item.el !== null);

          let current = chapters[0].id;
          const triggerLine = window.innerHeight * 0.35;

          for (const item of chapterElements) {
            const rect = item.el.getBoundingClientRect();
            if (rect.top <= triggerLine) {
              current = item.id;
            }
          }

          setActiveChapter(current);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToChapter = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Global Scroll Progress Bar */}
      <div
        className={styles.topProgressBar}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Page reading progress"
      >
        <div
          className={styles.topProgressFill}
          style={{ transform: `scaleX(${scrollProgress})` }}
        />
      </div>

      {/* Floating Vertical Journey Rail */}
      <nav
        className={styles.journeyRail}
        aria-label="Chapter Journey Navigation"
      >
        <div className={styles.railTrack}>
          {/* Progress fill line */}
          <div
            className={styles.railProgressLine}
            style={{ height: `${scrollProgress * 100}%` }}
          />

          {/* Chapter Nodes */}
          {chapters.map((chapter) => {
            const isActive = activeChapter === chapter.id;

            return (
              <button
                key={chapter.id}
                type="button"
                onClick={() => scrollToChapter(chapter.id)}
                className={clsx(styles.nodeBtn, isActive && styles.active)}
                aria-label={`Jump to ${chapter.label}`}
                aria-current={isActive ? 'true' : undefined}
              >
                <span className={styles.nodeBead}>
                  <span className={styles.innerDot} />
                </span>

                <div className={styles.nodeTooltip}>
                  <span className={styles.nodeNum}>{chapter.number}</span>
                  <span className={styles.nodeName}>{chapter.name}</span>
                </div>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
