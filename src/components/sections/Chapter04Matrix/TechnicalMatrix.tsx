'use client';

import React, { useState, useMemo } from 'react';
import clsx from 'clsx';
import { SectionHeader } from '@/components/common/SectionHeader';
import { skillGroups } from '@/data/portfolioData';
import { Badge } from '@/components/common/Badge';
import { Search } from 'lucide-react';
import styles from './TechnicalMatrix.module.scss';

export const TechnicalMatrix: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', ...skillGroups.map((g) => g.category)];

  const filteredGroups = useMemo(() => {
    return skillGroups
      .map((group) => {
        if (selectedCategory !== 'All' && group.category !== selectedCategory) {
          return null;
        }

        const filteredSkills = group.skills.filter((skill) => {
          if (!searchQuery.trim()) return true;
          const q = searchQuery.toLowerCase();
          return (
            skill.name.toLowerCase().includes(q) ||
            skill.context?.toLowerCase().includes(q)
          );
        });

        if (filteredSkills.length === 0) return null;

        return {
          ...group,
          skills: filteredSkills
        };
      })
      .filter(Boolean);
  }, [selectedCategory, searchQuery]);

  return (
    <section id="matrix" className={clsx(styles.matrixSection, 'scroll-reveal')} aria-label="Skills - The Technical Matrix">
      <div className={styles.container}>
        <SectionHeader
          chapterNumber="CHAPTER 04"
          chapterTitle="THE MATRIX"
          title="Technical Competencies"
          highlightWord="& Tooling"
          description="A verifiable index of languages, libraries, databases, and design software. Clean, compact, and scannable without arbitrary percentages."
        />

        {/* Filter and Search Controls */}
        <div className={clsx(styles.controlsBar, 'scroll-reveal')}>
          {/* Category Pills */}
          <div className={styles.categoryPills} role="tablist">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`${styles.pillBtn} ${isActive ? styles.active : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Quick Search */}
          <div className={styles.searchWrapper}>
            <Search size={14} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Filter skill (e.g. React, Java, Gemini)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
              aria-label="Filter skills by keyword"
            />
            {searchQuery && (
              <button
                type="button"
                className={styles.clearBtn}
                onClick={() => setSearchQuery('')}
                aria-label="Clear skill search"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* Compact Skills Grid */}
        <div className={styles.matrixGrid}>
          {filteredGroups.map((group) => {
            if (!group) return null;
            return (
              <div key={group.category} className={clsx(styles.groupCard, 'scroll-reveal')}>
                <div className={styles.groupHead}>
                  <div>
                    <h3 className={styles.groupTitle}>{group.category}</h3>
                  </div>
                  <span className={styles.countBadge}>{group.skills.length} skills</span>
                </div>

                <div className={styles.compactSkillsList}>
                  {group.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className={clsx(
                        styles.compactSkillPill,
                        skill.highlighted && styles.highlighted
                      )}
                      title={skill.context || skill.name}
                    >
                      <span className={styles.skillDot} />
                      <span className={styles.skillName}>{skill.name}</span>
                      {skill.highlighted && (
                        <span className={styles.coreTag}>CORE</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {filteredGroups.length === 0 && (
          <div className={styles.noResults}>
            <p>No matching technologies found for &ldquo;{searchQuery}&rdquo;.</p>
            <button
              type="button"
              className={styles.resetBtn}
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
