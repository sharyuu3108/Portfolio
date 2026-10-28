'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { Menu, X, ArrowUpRight, FileText, Sparkles } from 'lucide-react';
import { personalInfo } from '@/data/portfolioData';
import { useScrambleText } from '@/hooks/useScrambleText';
import styles from './Navigation.module.scss';

const navItems = [
  { href: '#signal', label: 'Signal', code: '00' },
  { href: '#origin', label: 'Origin', code: '01' },
  { href: '#machine', label: 'Machine', code: '02' },
  { href: '#imagination', label: 'Imagination', code: '03' },
  { href: '#matrix', label: 'Matrix', code: '04' },
  { href: '#journey', label: 'Journey', code: '05' },
  { href: '#connection', label: 'Connect', code: '06' }
];

const NavItemLabel: React.FC<{ label: string }> = ({ label }) => {
  const { displayText, onMouseEnter, isScrambling } = useScrambleText({
    text: label,
    duration: 450,
    triggerOnHover: true
  });

  return (
    <span
      className={styles.navLabel}
      onMouseEnter={onMouseEnter}
      style={{
        color: isScrambling ? '#35D7F2' : undefined,
        textShadow: isScrambling ? '0 0 8px rgba(53, 215, 242, 0.6)' : undefined,
        transition: 'color 0.15s ease, text-shadow 0.15s ease'
      }}
    >
      {displayText}
    </span>
  );
};

export const Navigation: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('signal');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Simple active section detection
      const sections = navItems.map((item) => item.href.substring(1));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={clsx(styles.header, scrolled && styles.scrolled)}
        role="banner"
      >
        <div className={styles.inner}>
          {/* Logo / Brand Mark */}
          <Link href="#signal" className={styles.brand} aria-label="Sharvari Potdar - Return to top">
            <span className={styles.brandDot} />
            <div className={styles.brandText}>
              <span className={styles.brandName}>{personalInfo.name}</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className={styles.desktopNav} aria-label="Primary Navigation">
            <ul className={styles.navList}>
              {navItems.map((item) => {
                const isActive = activeSection === item.href.substring(1);
                return (
                  <li key={item.code} className={styles.navItem}>
                    <Link
                      href={item.href}
                      className={clsx(styles.navLink, isActive && styles.active)}
                    >
                      <span className={styles.navCode}>{item.code}</span>
                      <NavItemLabel label={item.label} />
                      {isActive && <span className={styles.activeIndicator} />}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right Action: Open to Work Pill + Resume CTA */}
          <div className={styles.headerActions}>
            <div className={styles.statusPill} title={personalInfo.availability}>
              <span className={styles.pulseDot} />
              <span className={styles.statusText}>Open to Work</span>
            </div>

            <a
              href={personalInfo.resumePdf}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.resumeBtn}
              aria-label="View or download Sharvari's resume (PDF)"
            >
              <FileText size={14} />
              <span>Resume</span>
              <ArrowUpRight size={13} className={styles.arrow} />
            </a>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              className={styles.menuToggle}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div
        className={clsx(styles.mobileDrawer, mobileMenuOpen && styles.open)}
        aria-hidden={!mobileMenuOpen}
      >
        <div className={styles.mobileOverlay} onClick={() => setMobileMenuOpen(false)} />
        <div className={styles.mobileContent}>
          <div className={styles.mobileHeader}>
            <span className={styles.mobileTitle}>INDEX {'//'} CHAPTERS</span>
            <button
              type="button"
              className={styles.mobileCloseBtn}
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={22} />
            </button>
          </div>

          <nav className={styles.mobileNav} aria-label="Mobile Navigation">
            <ul>
              {navItems.map((item) => (
                <li key={item.code}>
                  <Link
                    href={item.href}
                    className={styles.mobileNavLink}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className={styles.mobileCode}>[{item.code}]</span>
                    <span className={styles.mobileLabel}>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.mobileFooter}>
            <div className={styles.mobileStatus}>
              <Sparkles size={14} className={styles.sparkle} />
              <span>{personalInfo.availability}</span>
            </div>
            <a
              href={personalInfo.resumePdf}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mobileResumeBtn}
            >
              <FileText size={16} />
              <span>Download Official Resume</span>
              <ArrowUpRight size={15} />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
