'use client';

import React, { useState } from 'react';
import clsx from 'clsx';
import { Compass, Map, FileText, CheckCircle2, Circle, ArrowRight, Database, Lock } from 'lucide-react';
import styles from './MachineProjects.module.scss';

const modules = [
  {
    id: 'careers',
    name: '01. Careers',
    icon: Compass,
    title: 'Curated Engineering Career Trajectories',
    desc: 'Structured breakdowns of technical roles, salary bands, and prerequisite competencies.',
    preview: {
      role: 'Full-Stack Software Engineer',
      domain: 'Web Architectures & Cloud Services',
      prerequisites: ['DSA in Java', 'React.js / Next.js', 'Node.js REST APIs', 'Cloud Firestore / MongoDB'],
      targetMilestones: '4 Core Progression Phases'
    }
  },
  {
    id: 'roadmap',
    name: '02. Roadmaps',
    icon: Map,
    title: 'Personalized Milestone-Driven Roadmaps',
    desc: 'Sequential, checkable milestones synchronized dynamically with Google Cloud Firestore.',
    milestones: [
      { phase: 'Phase 1: Fundamentals', task: 'DSA in Java + Asynchronous ES6 JavaScript', done: true },
      { phase: 'Phase 2: Modern Frontend', task: 'Component Lifecycle, State & Tailwind CSS', done: true },
      { phase: 'Phase 3: Backend & Data', task: 'Node.js REST Services & Cloud Firestore', done: true },
      { phase: 'Phase 4: Synthesis', task: 'AI API Integration & Production Deployment', done: false }
    ]
  },
  {
    id: 'resume',
    name: '03. Resume',
    icon: FileText,
    title: 'Dynamic Customizable Resume Engine',
    desc: 'ATS-compliant resume generator with live preview and PDF synchronization.',
    previewData: {
      header: 'Sharvari Potdar — Full-Stack Developer',
      education: "KIT's College of Engineering (B.Tech CSE, CGPA 8.59)",
      featuredProjects: ['CodeSage AI (React, Monaco, Gemini)', 'CereBro (React, Tailwind, Firestore)']
    }
  },
  {
    id: 'tracker',
    name: '04. Tracker',
    icon: CheckCircle2,
    title: 'Firestore-Backed Goal Tracking',
    desc: 'Real-time synchronization engine maintaining milestone status directly in Firestore.',
    metrics: [
      { label: 'Milestones Completed', value: '18 / 24' },
      { label: 'Target Completion Rate', value: '75%' },
      { label: 'Database Sync', value: 'Live Firestore' }
    ]
  }
];

export const CerebroPreview: React.FC = () => {
  const [activeModule, setActiveModule] = useState('roadmap');
  const mod = modules.find((m) => m.id === activeModule) || modules[0];

  return (
    <div className={styles.cerebroDashboard}>
      {/* Dashboard Topbar */}
      <div className={styles.cerebroHeader}>
        <div className={styles.brandGroup}>
          <span className={styles.logoBadge}>CB</span>
          <div>
            <h4 className={styles.appName}>CereBro // Platform Workspace</h4>
            <span className={styles.appSub}>React.js · Tailwind · Firebase Auth · Firestore</span>
          </div>
        </div>

        <div className={styles.authStatus}>
          <Lock size={12} className={styles.authLock} />
          <span>Auth Active</span>
          <Database size={12} className={styles.dbIcon} />
          <span>Firestore Synced</span>
        </div>
      </div>

      {/* Module Selector Tabs */}
      <div className={styles.moduleNav}>
        {modules.map((m) => {
          const Icon = m.icon;
          const isActive = activeModule === m.id;
          return (
            <button
              key={m.id}
              type="button"
              className={clsx(styles.moduleTab, isActive && styles.active)}
              onClick={() => setActiveModule(m.id)}
            >
              <Icon size={13} />
              <span>{m.name}</span>
            </button>
          );
        })}
      </div>

      {/* Dynamic Module Showcase */}
      <div className={styles.moduleDisplay}>
        <div className={styles.moduleMeta}>
          <h4 className={styles.modTitle}>{mod.title}</h4>
          <p className={styles.modDesc}>{mod.desc}</p>
        </div>

        <div className={styles.moduleCanvas}>
          {activeModule === 'careers' && mod.preview && (
            <div className={styles.careerCard}>
              <div className={styles.careerHead}>
                <span className={styles.careerBadge}>TARGET TRACK</span>
                <h4>{mod.preview.role}</h4>
                <span className={styles.domainText}>{mod.preview.domain}</span>
              </div>
              <div className={styles.prereqList}>
                <span className={styles.prereqTitle}>KEY SKILL CURRICULUM:</span>
                <ul>
                  {mod.preview.prerequisites.map((p, idx) => (
                    <li key={idx}>
                      <ArrowRight size={13} className={styles.arrowIcon} />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeModule === 'roadmap' && mod.milestones && (
            <div className={styles.roadmapGrid}>
              {mod.milestones.map((m, idx) => (
                <div key={idx} className={clsx(styles.roadmapNode, m.done && styles.completed)}>
                  <div className={styles.nodeIcon}>
                    {m.done ? <CheckCircle2 size={15} /> : <Circle size={15} />}
                  </div>
                  <div className={styles.nodeContent}>
                    <span className={styles.phaseLabel}>{m.phase}</span>
                    <strong className={styles.taskLabel}>{m.task}</strong>
                    <span className={styles.statusPill}>{m.done ? 'COMPLETED' : 'IN PROGRESS'}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeModule === 'resume' && mod.previewData && (
            <div className={styles.resumePaper}>
              <div className={styles.paperHeader}>
                <h5>{mod.previewData.header}</h5>
                <span className={styles.eduNote}>{mod.previewData.education}</span>
              </div>
              <div className={styles.paperSection}>
                <h6>VERIFIED FULL-STACK PROJECTS</h6>
                <ul>
                  {mod.previewData.featuredProjects.map((p, idx) => (
                    <li key={idx}>{p}</li>
                  ))}
                </ul>
              </div>
              <div className={styles.paperFooter}>
                <span>Generated dynamically from student Firestore profile data</span>
              </div>
            </div>
          )}

          {activeModule === 'tracker' && mod.metrics && (
            <div className={styles.trackerMetrics}>
              {mod.metrics.map((met, idx) => (
                <div key={idx} className={styles.trackerCard}>
                  <span className={styles.trackerVal}>{met.value}</span>
                  <span className={styles.trackerLbl}>{met.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
