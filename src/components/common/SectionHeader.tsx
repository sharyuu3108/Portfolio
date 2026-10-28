'use client';

import React from 'react';
import clsx from 'clsx';
import { useScrambleText } from '@/hooks/useScrambleText';
import styles from './SectionHeader.module.scss';

interface SectionHeaderProps {
  chapterNumber: string;
  chapterTitle: string;
  title: string;
  highlightWord?: string;
  italicPhrase?: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  chapterNumber,
  chapterTitle,
  title,
  highlightWord,
  italicPhrase,
  description,
  align = 'left',
  className
}) => {
  const {
    displayText: scrambledChapterNum,
    onMouseEnter: onHoverChapterNum,
    isScrambling: isNumScrambling
  } = useScrambleText({
    text: chapterNumber,
    duration: 550,
    triggerOnHover: true,
    triggerOnView: true
  });

  const {
    displayText: scrambledChapterName,
    onMouseEnter: onHoverChapterName,
    isScrambling: isNameScrambling
  } = useScrambleText({
    text: chapterTitle,
    duration: 700,
    triggerOnHover: true,
    triggerOnView: true
  });

  return (
    <header className={clsx(styles.header, styles[align], className)}>
      <div className={styles.chapterBadge}>
        <span
          className={clsx(styles.chapterNum, isNumScrambling && styles.isScrambling)}
          onMouseEnter={onHoverChapterNum}
          aria-label={chapterNumber}
        >
          {scrambledChapterNum}
        </span>
        <span className={styles.divider}>{'//'}</span>
        <span
          className={clsx(styles.chapterName, isNameScrambling && styles.isScrambling)}
          onMouseEnter={onHoverChapterName}
          aria-label={chapterTitle}
        >
          {scrambledChapterName}
        </span>
      </div>

      <h2 className={styles.title}>
        {title}
        {highlightWord && <span className={styles.highlight}> {highlightWord}</span>}
      </h2>

      {italicPhrase && (
        <p className={styles.serifSubtitle}>
          <em>{italicPhrase}</em>
        </p>
      )}

      {description && <p className={styles.description}>{description}</p>}
    </header>
  );
};
