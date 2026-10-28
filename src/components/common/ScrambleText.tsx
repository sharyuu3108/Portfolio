'use client';

import React from 'react';
import clsx from 'clsx';
import { useScrambleText } from '@/hooks/useScrambleText';
import styles from './ScrambleText.module.scss';

export interface ScrambleTextProps {
  text: string;
  as?: 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
  duration?: number;
  glyphs?: string;
  triggerOnHover?: boolean;
  triggerOnView?: boolean;
  className?: string;
}

export const ScrambleText: React.FC<ScrambleTextProps> = ({
  text,
  as: Component = 'span',
  duration = 600,
  glyphs,
  triggerOnHover = true,
  triggerOnView = false,
  className
}) => {
  const { displayText, isScrambling, ref, onMouseEnter } = useScrambleText({
    text,
    duration,
    glyphs,
    triggerOnHover,
    triggerOnView
  });

  return React.createElement(
    Component,
    {
      ref,
      onMouseEnter,
      'aria-label': text,
      className: clsx(styles.scrambleText, isScrambling && styles.isScrambling, className)
    },
    displayText
  );
};
