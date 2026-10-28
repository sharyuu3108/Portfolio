'use client';

import React, { useState } from 'react';
import clsx from 'clsx';
import { Play, Sparkles, WandSparkles, ShieldCheck, FileCode, CheckCircle2, AlertTriangle } from 'lucide-react';
import styles from './MachineProjects.module.scss';

const codeSamples: Record<string, { label: string; sample: string; review: { summary: string; issues: { type: string; title: string; desc: string; line: number }[] }; optimized: string }> = {
  python: {
    label: 'Python',
    sample: `def calculate_total(items):
    total = 0
    for item in items:
        total += item.price
    return total`,
    review: {
      summary: 'Pylint: missing type annotations. Gemini: recommend guarded handling for None/empty lists and pythonic sum() generator.',
      issues: [
        { type: 'warning', title: 'Missing Empty Guard', desc: 'Passing empty/None causes TypeError.', line: 2 },
        { type: 'optimization', title: 'Pythonic Generator', desc: 'Use sum(item.price for item in items).', line: 3 }
      ]
    },
    optimized: `def calculate_total(items: list) -> float:
    """Calculate total price with type safety and generator efficiency."""
    if not items:
        return 0.0
    return sum(item.price for item in items if hasattr(item, 'price'))`
  },
  javascript: {
    label: 'JavaScript',
    sample: `function fetchUserData(userId) {
  var url = '/api/users/' + userId;
  fetch(url).then(res => res.json()).then(data => {
    return data;
  });
}`,
    review: {
      summary: 'ESLint flags legacy var. Recommend async/await pattern with try/catch boundaries.',
      issues: [
        { type: 'warning', title: 'Legacy var', desc: 'Use const or let for block scoping.', line: 2 },
        { type: 'error', title: 'Unpropagated Promise', desc: 'Missing outer Promise return.', line: 3 }
      ]
    },
    optimized: `async function fetchUserData(userId) {
  try {
    const res = await fetch(\`/api/users/\${encodeURIComponent(userId)}\`);
    if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
    return await res.json();
  } catch (err) {
    throw err;
  }
}`
  },
  java: {
    label: 'Java',
    sample: `public class StringReverser {
    public static String reverse(String input) {
        String reversed = "";
        for (int i = input.length() - 1; i >= 0; i--) {
            reversed += input.charAt(i);
        }
        return reversed;
    }
}`,
    review: {
      summary: 'String concatenation inside loop introduces O(N²) allocation overhead. Use StringBuilder.reverse() for O(N) performance.',
      issues: [
        { type: 'optimization', title: 'Loop Concatenation', desc: 'Creates intermediate strings. Use StringBuilder.', line: 5 },
        { type: 'warning', title: 'NullPointer Risk', desc: 'Check for null input before length() call.', line: 3 }
      ]
    },
    optimized: `public class StringReverser {
    public static String reverse(String input) {
        if (input == null || input.isEmpty()) return input;
        return new StringBuilder(input).reverse().toString();
    }
}`
  }
};

export const CodeSagePreview: React.FC = () => {
  const [lang, setLang] = useState<string>('python');
  const [mode, setMode] = useState<'review' | 'optimize'>('review');
  const [analyzed, setAnalyzed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'code' | 'output'>('code');

  const current = codeSamples[lang];

  const handleRun = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setAnalyzed(true);
      setActiveTab('output');
    }, 550);
  };

  const handleLangChange = (newLang: string) => {
    setLang(newLang);
    setAnalyzed(false);
    setActiveTab('code');
  };

  return (
    <div className={styles.interactiveConsole}>
      {/* Console Head */}
      <div className={styles.consoleHead}>
        <div className={styles.windowControls}>
          <span className={styles.dotRed} />
          <span className={styles.dotYellow} />
          <span className={styles.dotGreen} />
          <span className={styles.consoleFilename}>
            codesage_workspace.{lang === 'python' ? 'py' : lang === 'javascript' ? 'js' : 'java'}
          </span>
        </div>

        <div className={styles.headActions}>
          {/* Mode Switcher */}
          <div className={styles.modeTabs}>
            <button
              type="button"
              className={clsx(styles.modeBtn, mode === 'review' && styles.active)}
              onClick={() => {
                setMode('review');
                if (analyzed) setActiveTab('output');
              }}
            >
              Review
            </button>
            <button
              type="button"
              className={clsx(styles.modeBtn, mode === 'optimize' && styles.active)}
              onClick={() => {
                setMode('optimize');
                if (analyzed) setActiveTab('output');
              }}
            >
              Optimize
            </button>
          </div>

          {/* Language Selector */}
          <div className={styles.langSelector}>
            {Object.entries(codeSamples).map(([key, data]) => (
              <button
                key={key}
                type="button"
                className={clsx(styles.langBtn, lang === key && styles.active)}
                onClick={() => handleLangChange(key)}
              >
                {data.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            className={styles.runBtn}
            onClick={handleRun}
            disabled={loading}
          >
            {loading ? <Sparkles size={13} className={styles.spin} /> : <Play size={13} />}
            <span>{loading ? 'Synthesizing...' : 'Run Pipeline'}</span>
          </button>
        </div>
      </div>

      {/* View Switcher Bar (Code Buffer vs Output) */}
      <div className={styles.consoleViewNav}>
        <button
          type="button"
          className={clsx(styles.viewNavBtn, activeTab === 'code' && styles.active)}
          onClick={() => setActiveTab('code')}
        >
          <FileCode size={13} />
          <span>Source Code Buffer</span>
        </button>

        <button
          type="button"
          className={clsx(styles.viewNavBtn, activeTab === 'output' && styles.active)}
          onClick={() => setActiveTab('output')}
        >
          {mode === 'review' ? <AlertTriangle size={13} /> : <WandSparkles size={13} />}
          <span>{mode === 'review' ? 'Gemini Review & Analysis' : 'Optimized Output'}</span>
          {analyzed && <span className={styles.activePulseDot} />}
        </button>
      </div>

      {/* Console Body */}
      <div className={styles.compactConsoleBody}>
        {activeTab === 'code' ? (
          /* Source Code Panel */
          <div className={styles.editorPanel}>
            <pre className={styles.codeView}>
              <code>{current.sample}</code>
            </pre>
          </div>
        ) : (
          /* Results / Optimization Panel */
          <div className={styles.outputPanel}>
            {loading ? (
              <div className={styles.loadingState}>
                <Sparkles size={20} className={styles.spinIcon} />
                <span>Querying Static Linters & Gemini API...</span>
              </div>
            ) : !analyzed ? (
              <div className={styles.emptyState}>
                <Sparkles size={18} className={styles.emptyIcon} />
                <p>Click &ldquo;Run Pipeline&rdquo; above to run Pylint/ESLint and Gemini synthesis on this code.</p>
              </div>
            ) : mode === 'review' ? (
              <div className={styles.reviewContent}>
                <div className={styles.summaryBox}>
                  <span className={styles.summaryLabel}>EXECUTIVE SUMMARY</span>
                  <p>{current.review.summary}</p>
                </div>

                <div className={styles.issueList}>
                  {current.review.issues.map((iss, i) => (
                    <div key={i} className={clsx(styles.issueItem, styles[iss.type])}>
                      <div className={styles.issueHead}>
                        <span className={styles.issueBadge}>L{iss.line}</span>
                        <strong className={styles.issueTitle}>{iss.title}</strong>
                      </div>
                      <p className={styles.issueDesc}>{iss.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className={styles.optimizedContent}>
                <div className={styles.optSummary}>
                  <CheckCircle2 size={14} className={styles.checkIcon} />
                  <span>Refactored with defensive bounds & computational idioms.</span>
                </div>
                <pre className={styles.codeViewResult}>
                  <code>{current.optimized}</code>
                </pre>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Console Footer */}
      <div className={styles.consoleFoot}>
        <div className={styles.footMeta}>
          <ShieldCheck size={13} className={styles.shield} />
          <span>MongoDB Atlas Logging · Gemini Isolated Backend</span>
        </div>
      </div>
    </div>
  );
};
