'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUp, Github, Linkedin, Mail, FileText, Heart } from 'lucide-react';
import { personalInfo } from '@/data/portfolioData';
import styles from './Footer.module.scss';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.container}>
        {/* Top bar with Brand and Back to Top */}
        <div className={styles.topRow}>
          <div className={styles.brandCol}>
            <div className={styles.brandTitle}>
              <span className={styles.dot} />
              <h3>{personalInfo.name}</h3>
            </div>
            <p className={styles.brandDesc}>
              Computer Science & Engineering Undergraduate · Full-Stack Developer · AI Application Builder · UI/UX Designer
            </p>
            <div className={styles.locationTag}>
              <span>KIT&apos;s College of Engineering · Kolhapur, Maharashtra, India</span>
            </div>
          </div>

          <div className={styles.navCol}>
            <h4>Chapters</h4>
            <ul>
              <li><Link href="#signal">00 {'//'} The Signal</Link></li>
              <li><Link href="#origin">01 {'//'} The Origin</Link></li>
              <li><Link href="#machine">02 {'//'} The Machine</Link></li>
              <li><Link href="#imagination">03 {'//'} The Imagination</Link></li>
              <li><Link href="#matrix">04 {'//'} The Matrix</Link></li>
              <li><Link href="#journey">05 {'//'} The Journey</Link></li>
              <li><Link href="#connection">06 {'//'} The Connection</Link></li>
            </ul>
          </div>

          <div className={styles.connectCol}>
            <h4>Direct Channels</h4>
            <ul className={styles.contactList}>
              <li>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className={styles.contactLink}
                  aria-label="Send email to Sharvari Potdar"
                >
                  <Mail size={16} />
                  <span>{personalInfo.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.contactLink}
                  aria-label="Sharvari's LinkedIn Profile"
                >
                  <Linkedin size={16} />
                  <span>LinkedIn Profile</span>
                </a>
              </li>
              <li>
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.contactLink}
                  aria-label="Sharvari's GitHub Profile"
                >
                  <Github size={16} />
                  <span>GitHub (@sharyuu3108)</span>
                </a>
              </li>
              <li>
                <a
                  href={personalInfo.resumePdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.contactLink}
                  aria-label="Sharvari's Resume (PDF)"
                >
                  <FileText size={16} />
                  <span>Download Resume (PDF)</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright and back-to-top */}
        <div className={styles.bottomRow}>
          <div className={styles.copyright}>
            <span>© {new Date().getFullYear()} {personalInfo.name}. Designed & Developed with Next.js, TypeScript & SCSS.</span>
          </div>

          <button
            type="button"
            className={styles.backToTop}
            onClick={scrollToTop}
            aria-label="Scroll back to top"
          >
            <span>Back to Top</span>
            <ArrowUp size={15} />
          </button>
        </div>
      </div>
    </footer>
  );
};
