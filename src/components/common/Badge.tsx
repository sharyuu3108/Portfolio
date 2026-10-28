'use client';

import React from 'react';
import clsx from 'clsx';
import { useScrambleText } from '@/hooks/useScrambleText';
import styles from './Badge.module.scss';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'crimson' | 'cyan' | 'violet' | 'neutral' | 'live';
  size?: 'sm' | 'md';
  pulse?: boolean;
  scramble?: boolean;
  className?: string;
}

const ScrambleBadgeText: React.FC<{ text: string }> = ({ text }) => {
  const { displayText, onMouseEnter, isScrambling } = useScrambleText({
    text,
    duration: 500,
    triggerOnHover: true
  });

  return (
    <span
      onMouseEnter={onMouseEnter}
      aria-label={text}
      style={{
        display: 'inline-block',
        transition: 'color 0.15s ease, text-shadow 0.15s ease',
        color: isScrambling ? '#35D7F2' : undefined,
        textShadow: isScrambling ? '0 0 8px rgba(53, 215, 242, 0.6)' : undefined
      }}
    >
      {displayText}
    </span>
  );
};

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'md',
  pulse = false,
  scramble = true,
  className
}) => {
  const isString = typeof children === 'string';

  return (
    <span
      className={clsx(
        styles.badge,
        styles[variant],
        styles[size],
        pulse && styles.hasPulse,
        className
      )}
    >
      {pulse && <span className={styles.dot} aria-hidden="true" />}
      {isString && scramble ? (
        <ScrambleBadgeText text={children as string} />
      ) : (
        <span>{children}</span>
      )}
    </span>
  );
};
