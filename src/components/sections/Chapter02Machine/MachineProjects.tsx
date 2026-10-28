'use client';

import React from 'react';
import clsx from 'clsx';
import { SectionHeader } from '@/components/common/SectionHeader';
import { projects } from '@/data/portfolioData';
import { CodeSagePreview } from './CodeSagePreview';
import { CerebroPreview } from './CerebroPreview';
import { Button } from '@/components/common/Button';
import { Badge } from '@/components/common/Badge';
import { ScrambleText } from '@/components/common/ScrambleText';
import { Github, CheckCircle2 } from 'lucide-react';
import styles from './MachineProjects.module.scss';

export const MachineProjects: React.FC = () => {
  const codeSage = projects.find((p) => p.id === 'codesage-ai');
  const cerebro = projects.find((p) => p.id === 'cerebro');
  const careerTrack = projects.find((p) => p.id === 'careertrack');
  const academic = projects.find((p) => p.id === 'academic-explorations');

  return (
    <section id="machine" className={clsx(styles.machineSection, 'scroll-reveal')} aria-label="Projects - The Machine">
      <div className={styles.container}>
        <SectionHeader
          chapterNumber="CHAPTER 02"
          chapterTitle="THE MACHINE"
          title="Full-Stack Systems"
          highlightWord="& Intelligent Tools"
          description="Every project represents an intentional balance between robust backend REST APIs, cloud databases, and accessible client interfaces."
        />

        {/* ============================================================== */}
        {/* SIDE-BY-SIDE FEATURED PROJECTS GRID */}
        {/* ============================================================== */}
        <div className={styles.sideBySideGrid}>
          {/* Card 01: CodeSage AI */}
          {codeSage && (
            <article className={clsx(styles.caseStudyCard, 'scroll-reveal')}>
              <div className={styles.cardHeader}>
                <div className={styles.badgeRow}>
                  <Badge variant="crimson">FEATURED // 01</Badge>
                  <Badge variant="live" pulse>AI PLATFORM</Badge>
                </div>
                <Button
                  href={codeSage.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline"
                  size="sm"
                  icon={<Github size={14} />}
                >
                  GitHub Codebase
                </Button>
              </div>

              <div className={styles.cardTitleBlock}>
                <h3 className={styles.projectTitle}>
                  <ScrambleText text={codeSage.title} triggerOnHover duration={500} />
                </h3>
                <p className={styles.projectSubtitle}>{codeSage.subtitle}</p>
              </div>

              <div className={styles.cardVisual}>
                <CodeSagePreview />
              </div>

              <div className={styles.cardBody}>
                <p className={styles.compactOverview}>
                  Full-stack code review platform combining real-time <strong>Monaco Editor</strong> editing, automated static analysis (<strong>Pylint & ESLint</strong>), and <strong>Google Gemini API</strong> for automated code optimizations across Java, Python, and C++.
                </p>

                <div className={styles.compactHighlights}>
                  <div className={styles.highlightRow}>
                    <CheckCircle2 size={14} className={styles.checkIcon} />
                    <span>Node.js REST APIs running static linters & Gemini generative synthesis</span>
                  </div>
                  <div className={styles.highlightRow}>
                    <CheckCircle2 size={14} className={styles.checkIcon} />
                    <span>React + Vite client with embedded Monaco Editor & real-time linting</span>
                  </div>
                  <div className={styles.highlightRow}>
                    <CheckCircle2 size={14} className={styles.checkIcon} />
                    <span>MongoDB Atlas persistence for user session history & refactored code</span>
                  </div>
                </div>

                <div className={styles.techTagsRow}>
                  {codeSage.technologies.slice(0, 6).map((t) => (
                    <span key={t} className={styles.techPill}>{t}</span>
                  ))}
                </div>
              </div>
            </article>
          )}

          {/* Card 02: CereBro */}
          {cerebro && (
            <article className={clsx(styles.caseStudyCard, 'scroll-reveal')}>
              <div className={styles.cardHeader}>
                <div className={styles.badgeRow}>
                  <Badge variant="cyan">FEATURED // 02</Badge>
                  <Badge variant="neutral">CAREER PLATFORM</Badge>
                </div>
                <Button
                  href={cerebro.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline"
                  size="sm"
                  icon={<Github size={14} />}
                >
                  GitHub Codebase
                </Button>
              </div>

              <div className={styles.cardTitleBlock}>
                <h3 className={styles.projectTitle}>
                  <ScrambleText text={cerebro.title} triggerOnHover duration={500} />
                </h3>
                <p className={styles.projectSubtitle}>{cerebro.subtitle}</p>
              </div>

              <div className={styles.cardVisual}>
                <CerebroPreview />
              </div>

              <div className={styles.cardBody}>
                <p className={styles.compactOverview}>
                  Career exploration and roadmap platform featuring 4 core modules: career path discovery, milestone-driven learning roadmaps, an interactive Resume Builder, and real-time progress tracking.
                </p>

                <div className={styles.compactHighlights}>
                  <div className={styles.highlightRow}>
                    <CheckCircle2 size={14} className={styles.checkIcon} />
                    <span>Cloud Firestore real-time synchronization for student roadmaps & goals</span>
                  </div>
                  <div className={styles.highlightRow}>
                    <CheckCircle2 size={14} className={styles.checkIcon} />
                    <span>Secure user authentication & state persistence with Firebase Auth</span>
                  </div>
                  <div className={styles.highlightRow}>
                    <CheckCircle2 size={14} className={styles.checkIcon} />
                    <span>Responsive React & Tailwind interface with customizable Resume Builder</span>
                  </div>
                </div>

                <div className={styles.techTagsRow}>
                  {cerebro.technologies.map((t) => (
                    <span key={t} className={styles.techPill}>{t}</span>
                  ))}
                </div>
              </div>
            </article>
          )}
        </div>

        {/* ============================================================== */}
        {/* ADDITIONAL WORK & EXPLORATIONS */}
        {/* ============================================================== */}
        <div className={clsx(styles.explorationsSection, 'scroll-reveal')}>
          <div className={styles.explorationsHeader}>
            <span className={styles.sectionMono}>CONCEPTS & ACADEMIC REPOSITORIES</span>
            <h4>Continuous Experimentation</h4>
          </div>

          <div className={styles.explorationsGrid}>
            {/* CareerTrack */}
            {careerTrack && (
              <div className={styles.explorationCard}>
                <div className={styles.expCardHeader}>
                  <Badge variant="violet" size="sm">PROTOTYPE</Badge>
                  <span className={styles.expDate}>ACTIVE</span>
                </div>
                <h5>{careerTrack.title}</h5>
                <p className={styles.expTagline}>{careerTrack.subtitle}</p>
                <p className={styles.expDesc}>
                  Centralized recruitment pipeline tracker with Kanban stages, deadline alerts, and Gemini-assisted interview preparation modules.
                </p>
                <div className={styles.expTech}>
                  {careerTrack.technologies.slice(0, 4).map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Academic Explorations */}
            {academic && (
              <div className={styles.explorationCard}>
                <div className={styles.expCardHeader}>
                  <Badge variant="neutral" size="sm">ACADEMIC & INTERNSHIP</Badge>
                  <span className={styles.expDate}>FOUNDATIONS</span>
                </div>
                <h5>JobSensei, TechNova & Movie Recommender</h5>
                <p className={styles.expTagline}>Web & Recommendation Heuristics</p>
                <p className={styles.expDesc}>
                  Explorations in multilingual career access (JobSensei), web marketplace UI (TechNova), and content-based recommendation algorithms in Python (CodSoft AI internship).
                </p>
                <div className={styles.expTech}>
                  <span>Python</span>
                  <span>JavaScript</span>
                  <span>HTML5 / CSS3</span>
                  <span>Firebase</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
