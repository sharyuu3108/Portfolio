'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { SectionHeader } from '@/components/common/SectionHeader';
import { creativeArtifacts } from '@/data/portfolioData';
import { Badge } from '@/components/common/Badge';
import { Palette, Users, Layout } from 'lucide-react';
import styles from './ImaginationDesign.module.scss';

export const ImaginationDesign: React.FC = () => {
  const [selectedArtifact, setSelectedArtifact] = useState(creativeArtifacts[0]);

  return (
    <section id="imagination" className={clsx(styles.imaginationSection, 'scroll-reveal')} aria-label="Design - The Imagination">
      <div className={styles.container}>
        <SectionHeader
          chapterNumber="CHAPTER 03"
          chapterTitle="THE IMAGINATION"
          title="Visual Craft"
          highlightWord="& Interface Design"
          description="Design is an essential component of my engineering identity. Through leadership in AURA Club and ACSES, I organize design workshops, curate exhibitions, and craft human-centered interfaces."
        />

        {/* Feature Split: Sharvari in AURA Leadership */}
        <div className={clsx(styles.leadershipBanner, 'scroll-reveal')}>
          <div className={styles.leaderImageWrap}>
            <div className={styles.frameDecoration}>
              <Image
                src="/images/sharvari-aura-leadership.jpg"
                alt="Sharvari Potdar, Core Team Leader and Vice President of AURA Club at KIT's College of Engineering"
                width={380}
                height={480}
                className={styles.leaderPhoto}
              />
              <div className={styles.photoOverlay} />
              <div className={styles.photoTag}>
                <span>AURA CLUB // VICE PRESIDENT</span>
              </div>
            </div>
          </div>

          <div className={styles.leaderTextCol}>
            <Badge variant="violet" size="sm">CAMPUS LEADERSHIP & COMMUNITY</Badge>
            <h3 className={styles.leaderTitle}>
              Curating Spaces Where Human Expression & Technology Connect
            </h3>

            <p className={styles.leaderPara}>
              As Vice President of <strong>AURA Club</strong> (cultural society of KIT&apos;s College of Engineering) and Design Associate at <strong>ACSES</strong> (CSE Student Association), I combine engineering structure with visual storytelling.
            </p>

            {/* Compact 3-Pillar Impact Cards */}
            <div className={styles.impactGrid}>
              <div className={styles.impactCard}>
                <div className={styles.impactHead}>
                  <Layout size={16} className={styles.impactIcon} />
                  <strong>Figma Workshop</strong>
                </div>
                <span className={styles.statPill}>50+ Students Trained</span>
                <p>Managed operations and guided exercises on UI/UX wireframes and component systems.</p>
              </div>

              <div className={styles.impactCard}>
                <div className={styles.impactHead}>
                  <Palette size={16} className={styles.impactIcon} />
                  <strong>Kaladalan 2026</strong>
                </div>
                <span className={styles.statPill}>Art Exhibition Curation</span>
                <p>Led campus art exhibition planning, artist coordination, and gallery curation.</p>
              </div>

              <div className={styles.impactCard}>
                <div className={styles.impactHead}>
                  <Users size={16} className={styles.impactIcon} />
                  <strong>ACSES Department</strong>
                </div>
                <span className={styles.statPill}>Visual Identity</span>
                <p>Designed official digital posters and event branding for CSE seminars and technical symposiums.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Authentic Exhibition & Design Gallery */}
        <div className={clsx(styles.gallerySection, 'scroll-reveal')}>
          <div className={styles.galleryHeader}>
            <div>
              <span className={styles.galleryMono}>VERIFIED EXHIBITION WORKS // KALADALAN</span>
              <h4 className={styles.galleryTitle}>Creative Portfolio & Exhibition Documentation</h4>
            </div>
            <span className={styles.curatedNote}>Authentic Exhibition Artworks</span>
          </div>

          <div className={styles.galleryGrid}>
            {creativeArtifacts.map((item) => {
              const isSelected = selectedArtifact.id === item.id;
              return (
                <div
                  key={item.id}
                  className={`${styles.galleryCard} ${isSelected ? styles.selected : ''}`}
                  onClick={() => setSelectedArtifact(item)}
                >
                  <div className={styles.cardImageHolder}>
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={460}
                      height={300}
                      className={styles.cardImg}
                    />
                    <div className={styles.cardOverlay} />
                    <span className={styles.categoryBadge}>{item.category}</span>
                  </div>

                  <div className={styles.cardContent}>
                    <h5 className={styles.itemTitle}>{item.title}</h5>
                    <p className={styles.itemDesc}>{item.description}</p>
                    <div className={styles.itemMeta}>
                      <span>{item.eventOrContext}</span>
                      <span>·</span>
                      <span>{item.role}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
