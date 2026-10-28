'use client';

import React, { useState } from 'react';
import clsx from 'clsx';
import { SectionHeader } from '@/components/common/SectionHeader';
import { personalInfo } from '@/data/portfolioData';
import { Code2, Cpu, Palette, BookOpen, Compass, CheckCircle2, ArrowRight } from 'lucide-react';
import styles from './Origin.module.scss';

const dimensions = [
  {
    id: 'engineer',
    title: 'The Engineer',
    icon: Code2,
    role: 'Full-Stack & Systems Logic',
    color: 'crimson',
    description:
      'Grounded in computer science fundamentals at KIT Kolhapur with an 8.59 CGPA. I build scalable RESTful endpoints in Node.js, model databases, and structure clean React components.',
    focusAreas: [
      'React.js & Next.js full-stack systems',
      'Node.js REST APIs & micro-controllers',
      'Data Structures & Algorithms with Java',
      'MongoDB Atlas & Firebase architecture'
    ]
  },
  {
    id: 'ai-explorer',
    title: 'The AI Explorer',
    icon: Cpu,
    role: 'Intelligent Workspaces & APIs',
    color: 'cyan',
    description:
      'Integrating generative AI into practical developer tooling. Through CodeSage AI and Google Cloud GenAI Studio training, I connect LLM reasoning with deterministic static code analysis.',
    focusAreas: [
      'Google Gemini API integration',
      'Certified: GenAI Studio (Google Cloud)',
      'Static analysis (Pylint/ESLint) pipelines',
      'Python data scripting & recommendation'
    ]
  },
  {
    id: 'designer',
    title: 'The Designer',
    icon: Palette,
    role: 'Visual Communication & UX Craft',
    color: 'violet',
    description:
      'Design is clarity of thought. As Vice President of AURA Club and Design Associate at ACSES, I create interface wireframes in Figma, lead design workshops, and curate exhibition visuals.',
    focusAreas: [
      'Figma design systems & wireframes',
      'Conducted 50+ student Figma workshop',
      'Curated Kaladalan 2026 Art Exhibition',
      'Departmental visual branding (ACSES)'
    ]
  }
];

export const Origin: React.FC = () => {
  const [activeTab, setActiveTab] = useState('engineer');
  const currentDimension = dimensions.find((d) => d.id === activeTab) || dimensions[0];

  return (
    <section id="origin" className={clsx(styles.originSection, 'scroll-reveal')} aria-label="About - The Origin">
      <div className={styles.container}>
        <SectionHeader
          chapterNumber="CHAPTER 01"
          chapterTitle="THE ORIGIN"
          title="Computational Logic"
          highlightWord="& Human Experience"
          description="Technology achieves its highest value when algorithmic precision is paired with intentional design. A compact look into my engineering principles and core pillars."
        />

        {/* Compact Narrative Split */}
        <div className={styles.narrativeGrid}>
          {/* Left: Concise Academic & Engineering Story */}
          <div className={clsx(styles.storyCard, 'scroll-reveal')}>
            <div className={styles.cardHeader}>
              <div className={styles.monoLabel}>
                <BookOpen size={14} />
                <span>ACADEMIC FOUNDATION // KIT KOLHAPUR</span>
              </div>
              <span className={styles.cgpaBadge}>CGPA: 8.59</span>
            </div>

            <div className={styles.storyBody}>
              <p className={styles.leadPara}>
                Computer Science and Engineering undergraduate at <strong>KIT&apos;s College of Engineering, Kolhapur</strong> (graduating 2027). I build complete applications—from robust Node.js REST API layers and cloud databases to responsive, human-centered React interfaces.
              </p>
              <p>
                My approach unites computational logic with creative expression: balancing software engineering rigor with design leadership as Vice President of <strong>AURA Club</strong> and Design Associate at <strong>ACSES</strong>.
              </p>
            </div>

            {/* Compact Highlight Chips */}
            <div className={styles.compactChipsRow}>
              <div className={styles.compactChip}>
                <span className={styles.chipDot} />
                <span>B.Tech CSE (2023–2027)</span>
              </div>
              <div className={styles.compactChip}>
                <span className={styles.chipDot} />
                <span>Double National Award Winner</span>
              </div>
              <div className={styles.compactChip}>
                <span className={styles.chipDot} />
                <span>Full-Stack & GenAI Builder</span>
              </div>
            </div>
          </div>

          {/* Right: Interactive Compact 3-Pillars Explorer */}
          <div className={clsx(styles.dimensionCard, 'scroll-reveal')}>
            <div className={styles.cardHeader}>
              <div className={styles.monoLabel}>
                <Compass size={14} />
                <span>TRI-DIMENSIONAL FOCUS</span>
              </div>
              <span className={styles.counter}>[ 03 PILLARS ]</span>
            </div>

            {/* Dimension Tabs */}
            <div className={styles.tabNav} role="tablist">
              {dimensions.map((dim) => {
                const Icon = dim.icon;
                const isActive = activeTab === dim.id;
                return (
                  <button
                    key={dim.id}
                    role="tab"
                    aria-selected={isActive}
                    className={clsx(styles.tabBtn, isActive && styles.active, styles[dim.color])}
                    onClick={() => setActiveTab(dim.id)}
                  >
                    <Icon size={15} />
                    <span>{dim.title}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Dimension Details */}
            <div className={styles.tabPanel} role="tabpanel">
              <div className={styles.panelHead}>
                <span className={clsx(styles.roleTag, styles[currentDimension.color])}>
                  {currentDimension.role}
                </span>
              </div>

              <p className={styles.dimDescription}>{currentDimension.description}</p>

              <div className={styles.focusList}>
                <div className={styles.focusPills}>
                  {currentDimension.focusAreas.map((area, idx) => (
                    <span key={idx} className={styles.focusPill}>
                      <span className={styles.bulletDot} />
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
