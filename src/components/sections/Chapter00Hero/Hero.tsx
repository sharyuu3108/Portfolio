'use client';

import React from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { ArrowDown, FileText } from 'lucide-react';
import { personalInfo } from '@/data/portfolioData';
import { Button } from '@/components/common/Button';
import { Badge } from '@/components/common/Badge';
import { ScrambleText } from '@/components/common/ScrambleText';
import styles from './Hero.module.scss';

export const Hero: React.FC = () => {
  return (
    <section id="signal" className={styles.heroSection} aria-label="Hero - The Signal">
      <div className={styles.container}>
        {/* Top Signal Status Bar */}
        <div className={styles.statusRow}>
          <Badge variant="crimson" pulse>
            CHAPTER 00 // THE SIGNAL
          </Badge>

          <div className={styles.openToWorkBadge}>
            <span className={styles.pulse} />
            <span className={styles.statusLabel}>{personalInfo.status}:</span>
            <span className={styles.statusDetail}>{personalInfo.availability}</span>
          </div>
        </div>

        {/* Main Hero Split Grid */}
        <div className={styles.heroGrid}>
          {/* Left Column: Typography & Narrative */}
          <div className={clsx(styles.copyCol, 'scroll-reveal')}>
            <div className={styles.taglineBlock}>
              <ScrambleText
                text="KITCoEK // CSE // 2023–2027"
                triggerOnView
                triggerOnHover
                className={styles.monoCoord}
              />
              <h1 className={styles.displayTitle}>
                <span className={styles.nameFirst}>Sharvari</span>
                <span className={styles.nameLast}> Potdar</span>
              </h1>
              <p className={styles.editorialSubhead}>
                <em>Full-Stack Developer · AI Application Builder · UI/UX Designer</em>
              </p>
            </div>

            <p className={styles.introParagraph}>
              Computer Science and Engineering undergraduate at KIT&apos;s College of Engineering, Kolhapur. I engineer responsive full-stack web applications, explore generative AI integrations, and design thoughtful human-centric interfaces.
            </p>

            {/* CTAs */}
            <div className={styles.actionRow}>
              <Button href="#machine" variant="primary" size="lg" icon={<ArrowDown size={18} />}>
                Explore Selected Work
              </Button>

              <Button
                href={personalInfo.resumePdf}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                size="lg"
                icon={<FileText size={18} />}
              >
                Official Resume (PDF)
              </Button>
            </div>

            {/* Quick Metrics Bar */}
            <div className={styles.metricsBar}>
              <div className={styles.metricItem}>
                <span className={styles.metricValue}>8.59</span>
                <span className={styles.metricLabel}>B.Tech CGPA</span>
              </div>
              <div className={styles.metricDivider} />
              <div className={styles.metricItem}>
                <span className={styles.metricValue}>2×</span>
                <span className={styles.metricLabel}>National Awards</span>
              </div>
              <div className={styles.metricDivider} />
              <div className={styles.metricItem}>
                <span className={styles.metricValue}>AURA</span>
                <span className={styles.metricLabel}>Club Vice President</span>
              </div>
            </div>
          </div>

          {/* Right Column: Minimalist Clean & Spacious Editorial Portrait */}
          <div className={clsx(styles.portraitCol, 'scroll-reveal')}>
            <div className={styles.portraitWrapper}>
              <div className={styles.ambientGlow} aria-hidden="true" />

              <div className={styles.portraitFrame}>
                <Image
                  src="/images/sharvari-portrait.jpg"
                  alt="Sharvari Potdar, Computer Science student, Full-Stack Developer and UI/UX Designer"
                  width={520}
                  height={650}
                  priority
                  className={styles.portraitImage}
                />
              </div>

              <div className={styles.portraitCaption}>
                <span className={styles.captionTag}>PORTRAIT // 2026</span>
                <span className={styles.captionLoc}>KOLHAPUR, INDIA</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
