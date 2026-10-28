'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { SectionHeader } from '@/components/common/SectionHeader';
import { timelineEntries } from '@/data/portfolioData';
import { Badge } from '@/components/common/Badge';
import { Award, GraduationCap, ShieldCheck, Trophy, Briefcase, Users, Calendar, MapPin, ArrowUpRight } from 'lucide-react';
import styles from './JourneyTimeline.module.scss';

const typeIcons = {
  education: GraduationCap,
  achievement: Trophy,
  certification: ShieldCheck,
  leadership: Users,
  internship: Briefcase
};

const filterTabs = [
  { label: 'All Milestones', type: 'all' },
  { label: 'Awards & Honors', type: 'achievement' },
  { label: 'Certifications', type: 'certification' },
  { label: 'Education', type: 'education' },
  { label: 'Leadership', type: 'leadership' }
];

export const JourneyTimeline: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredEntries = timelineEntries.filter((entry) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'leadership') return entry.type === 'leadership' || entry.type === 'internship';
    return entry.type === activeFilter;
  });

  return (
    <section id="journey" className={clsx(styles.journeySection, 'scroll-reveal')} aria-label="Journey - The Timeline">
      <div className={styles.container}>
        <SectionHeader
          chapterNumber="CHAPTER 05"
          chapterTitle="THE JOURNEY"
          title="Education, Awards"
          highlightWord="& Milestones"
          description="A verifiable record of academic honors, national competition podium finishes, industry certifications, and student leadership."
        />

        {/* Compact Feature Spotlight: Technostav 2026 National Award */}
        <div className={clsx(styles.compactAwardBanner, 'scroll-reveal')}>
          <div className={styles.awardPhotoCol}>
            <div className={styles.awardFrame}>
              <Image
                src="/images/sharvari-technostav.jpg"
                alt="Sharvari Potdar holding trophy and merit certificate for 2nd Prize at national-level Technostav Infinity Hunt 2026"
                width={180}
                height={220}
                className={styles.trophyPhoto}
              />
              <div className={styles.awardTag}>
                <Trophy size={13} className={styles.trophyIcon} />
                <span>2ND PRIZE // 2026</span>
              </div>
            </div>
          </div>

          <div className={styles.awardInfoCol}>
            <div className={styles.badgeLine}>
              <Badge variant="crimson" size="sm">DOUBLE NATIONAL PODIUM FINISHER</Badge>
              <span className={styles.awardYear}>Infinity Hunt · 2025 & 2026</span>
            </div>

            <h3 className={styles.awardTitle}>
              National-Level Algorithmic Problem Solving & Team Leadership
            </h3>

            <p className={styles.awardDesc}>
              Secured <strong>2nd Prize (2026)</strong> and <strong>3rd Prize (2025)</strong> at the prestigious national-level Infinity Hunt competition held at Dr. D.Y. Patil College of Engineering, Kolhapur.
            </p>

            <div className={styles.awardPillsRow}>
              <span className={styles.awardPill}>
                <Trophy size={13} /> 2nd Prize Trophy & Merit Certificate (2026)
              </span>
              <span className={styles.awardPill}>
                <Trophy size={13} /> 3rd Prize Podium Winner (2025)
              </span>
            </div>
          </div>
        </div>

        {/* Filter Navigation */}
        <div className={clsx(styles.filterBar, 'scroll-reveal')}>
          <div className={styles.filterPills} role="tablist">
            {filterTabs.map((tab) => (
              <button
                key={tab.type}
                type="button"
                role="tab"
                aria-selected={activeFilter === tab.type}
                className={`${styles.filterBtn} ${activeFilter === tab.type ? styles.active : ''}`}
                onClick={() => setActiveFilter(tab.type)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Chronological Animated Journey Timeline */}
        <div className={styles.timeline}>
          <div className={styles.timelineTrack} />

          {filteredEntries.map((item) => {
            const Icon = typeIcons[item.type] || Award;
            return (
              <div
                key={item.id}
                className={clsx(
                  styles.timelineRow,
                  item.highlight && styles.rowHighlight,
                  'scroll-reveal'
                )}
              >
                {/* Timeline Icon Marker with glowing node */}
                <div className={styles.timelineMarker}>
                  <span className={styles.markerCircle}>
                    <Icon size={15} />
                  </span>
                </div>

                {/* Compact Timeline Content Card */}
                <div className={styles.timelineCard}>
                  <div className={styles.cardTop}>
                    <div className={styles.typeBadge}>
                      <span className={styles.typeName}>{item.type.toUpperCase()}</span>
                      <span className={styles.dotSep}>·</span>
                      <span className={styles.periodText}>
                        <Calendar size={12} />
                        {item.period}
                      </span>
                    </div>

                    {item.scoreOrAward && (
                      <span className={styles.scorePill}>{item.scoreOrAward}</span>
                    )}
                  </div>

                  <h4 className={styles.entryTitle}>{item.title}</h4>
                  
                  <div className={styles.orgLine}>
                    <strong>{item.organization}</strong>
                    {item.location && (
                      <span className={styles.location}>
                        <MapPin size={11} />
                        {item.location}
                      </span>
                    )}
                  </div>

                  <p className={styles.summaryText}>{item.summary}</p>

                  {item.credentialId && (
                    <div className={styles.credentialBox}>
                      <ShieldCheck size={13} className={styles.verifiedIcon} />
                      <span>{item.credentialId}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
