'use client';

import React, { useState } from 'react';
import clsx from 'clsx';
import { SectionHeader } from '@/components/common/SectionHeader';
import { personalInfo } from '@/data/portfolioData';
import { Button } from '@/components/common/Button';
import { Badge } from '@/components/common/Badge';
import { Mail, Phone, Linkedin, Github, FileText, Copy, Check, Send, MapPin, Sparkles, ArrowUpRight } from 'lucide-react';
import styles from './ConnectionContact.module.scss';

export const ConnectionContact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [subject, setSubject] = useState('Entry-Level Software Engineering Opportunity');
  const [message, setMessage] = useState('');

  const copyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const copyPhone = () => {
    if (personalInfo.phone) {
      navigator.clipboard.writeText(personalInfo.phone);
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2200);
    }
  };

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoUrl = `mailto:${personalInfo.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(message)}`;
    window.location.href = mailtoUrl;
  };

  return (
    <section id="connection" className={styles.connectionSection} aria-label="Contact - The Connection">
      <div className={styles.container}>
        <SectionHeader
          chapterNumber="CHAPTER 06"
          chapterTitle="THE CONNECTION"
          title="Future Outlook"
          highlightWord="& Opportunities"
          description="I am actively seeking entry-level software development roles, full-stack engineering positions, and software engineering internships. Let's discuss how my skills can create value for your organization."
        />

        {/* Contact Split */}
        <div className={styles.contactGrid}>
          {/* Left Column: Direct Verified Channels & Recruiter Summary */}
          <div className={clsx(styles.infoCol, 'scroll-reveal')}>
            {/* Open to Work Status Box */}
            <div className={styles.statusBox}>
              <div className={styles.statusHeader}>
                <span className={styles.pulseDot} />
                <span className={styles.statusTitle}>AVAILABILITY & TARGET ROLES</span>
              </div>
              <p className={styles.statusDetail}>
                Graduating B.Tech in Computer Science & Engineering in 2027 from KIT&apos;s College of Engineering, Kolhapur. Open for full-time graduate opportunities and upcoming internship cohorts.
              </p>
              <div className={styles.roleChips}>
                <span>Junior Full-Stack Developer</span>
                <span>Frontend Engineer (React / Next.js)</span>
                <span>Software Development Engineer</span>
                <span>AI Application Developer</span>
              </div>
            </div>

            {/* Verified Direct Channels */}
            <div className={styles.channelsCard}>
              <h4 className={styles.channelsTitle}>Direct Professional Links</h4>

              {/* Email with copy button */}
              <div className={styles.channelRow}>
                <div className={styles.channelMeta}>
                  <Mail size={16} className={styles.channelIcon} />
                  <div>
                    <span className={styles.channelLabel}>DIRECT EMAIL</span>
                    <strong className={styles.channelValue}>{personalInfo.email}</strong>
                  </div>
                </div>

                <div className={styles.channelActions}>
                  <button
                    type="button"
                    className={styles.copyBtn}
                    onClick={copyEmail}
                    title="Copy email address"
                    aria-label="Copy email address to clipboard"
                  >
                    {copied ? <Check size={14} className={styles.greenCheck} /> : <Copy size={14} />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>

                  <a
                    href={`mailto:${personalInfo.email}`}
                    className={styles.directMailBtn}
                    aria-label="Open email client"
                  >
                    <Send size={14} />
                  </a>
                </div>
              </div>

              {/* Phone / Mobile */}
              {personalInfo.phone && (
                <div className={styles.channelRow}>
                  <div className={styles.channelMeta}>
                    <Phone size={16} className={styles.channelIcon} />
                    <div>
                      <span className={styles.channelLabel}>DIRECT MOBILE</span>
                      <strong className={styles.channelValue}>{personalInfo.phone}</strong>
                    </div>
                  </div>

                  <div className={styles.channelActions}>
                    <button
                      type="button"
                      className={styles.copyBtn}
                      onClick={copyPhone}
                      title="Copy phone number"
                      aria-label="Copy phone number to clipboard"
                    >
                      {copiedPhone ? <Check size={14} className={styles.greenCheck} /> : <Copy size={14} />}
                      <span>{copiedPhone ? 'Copied' : 'Copy'}</span>
                    </button>

                    <a
                      href={`tel:${personalInfo.phone}`}
                      className={styles.directMailBtn}
                      aria-label="Call phone number"
                    >
                      <Phone size={14} />
                    </a>
                  </div>
                </div>
              )}

              {/* LinkedIn */}
              <div className={styles.channelRow}>
                <div className={styles.channelMeta}>
                  <Linkedin size={16} className={styles.channelIcon} />
                  <div>
                    <span className={styles.channelLabel}>LINKEDIN NETWORK</span>
                    <strong className={styles.channelValue}>Sharvari Potdar</strong>
                  </div>
                </div>

                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.linkOutBtn}
                  aria-label="Open LinkedIn profile"
                >
                  <span>Connect</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>

              {/* GitHub */}
              <div className={styles.channelRow}>
                <div className={styles.channelMeta}>
                  <Github size={16} className={styles.channelIcon} />
                  <div>
                    <span className={styles.channelLabel}>GITHUB CODEBASES</span>
                    <strong className={styles.channelValue}>@sharyuu3108</strong>
                  </div>
                </div>

                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.linkOutBtn}
                  aria-label="Open GitHub profile"
                >
                  <span>Repositories</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>

              {/* Official Resume */}
              <div className={styles.channelRow}>
                <div className={styles.channelMeta}>
                  <FileText size={16} className={styles.channelIcon} />
                  <div>
                    <span className={styles.channelLabel}>CURRICULUM VITAE</span>
                    <strong className={styles.channelValue}>Sharvari_Potdar_Resume.pdf</strong>
                  </div>
                </div>

                <a
                  href={personalInfo.resumePdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.resumeDownloadBtn}
                  aria-label="Download verified resume"
                >
                  <span>Download PDF</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>

            {/* Geographical Location */}
            <div className={styles.locationCard}>
              <MapPin size={15} className={styles.mapPin} />
              <span>Based in Kolhapur, Maharashtra, India · Open to Remote & On-Site Engineering Roles</span>
            </div>
          </div>

          {/* Right Column: Direct In-Browser Inquirer / Compose */}
          <div className={clsx(styles.formCol, 'scroll-reveal')}>
            <div className={styles.formCard}>
              <div className={styles.formHead}>
                <div className={styles.formDot} />
                <div>
                  <h4 className={styles.formTitle}>Initiate Direct Communication</h4>
                  <span className={styles.formSub}>Launches your email client with verified parameters</span>
                </div>
              </div>

              <form onSubmit={handleSendEmail} className={styles.emailForm}>
                <div className={styles.formGroup}>
                  <label htmlFor="oppSubject" className={styles.label}>
                    Opportunity or Topic
                  </label>
                  <select
                    id="oppSubject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className={styles.selectInput}
                  >
                    <option value="Entry-Level Software Engineering Opportunity">
                      Entry-Level Software Engineering Role
                    </option>
                    <option value="Frontend / React Developer Opportunity">
                      Frontend / React Developer Role
                    </option>
                    <option value="Software Engineering Internship Opportunity">
                      Software Engineering Internship
                    </option>
                    <option value="Technical Collaboration or Project Discussion">
                      Technical Collaboration or Project Discussion
                    </option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="oppMessage" className={styles.label}>
                    Message or Role Details (Optional)
                  </label>
                  <textarea
                    id="oppMessage"
                    rows={5}
                    placeholder="Hello Sharvari, I came across your portfolio and would love to discuss an engineering role with our team..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={styles.textareaInput}
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  icon={<Send size={16} />}
                >
                  Send Email to Sharvari
                </Button>

                <p className={styles.formNote}>
                  * Directly addresses to <code>sharvarii3108@gmail.com</code>. No intermediate third-party trackers or email marketing databases.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
