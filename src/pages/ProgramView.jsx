import React, { useMemo } from "react";
import CodeBlock from "../components/CodeBlock";
import Logo from "../components/Logo";
import ThemeToggle from "../components/ThemeToggle";

// Split multi-file code blocks cleanly
function parseCodeBlocks(rawCode, defaultLang, defaultFile) {
  if (!rawCode) return [];

  const fileHeaderRegex = /(?:^\s*(?:\/\/|<!--)\s*([\w\.-]+\.(?:java|xml|sql|php|html))\s*(?:-->)?)/gm;
  const matches = [...rawCode.matchAll(fileHeaderRegex)];

  if (matches.length <= 1) {
    return [{ filename: defaultFile, language: defaultLang, code: rawCode.trim() }];
  }

  const blocks = [];
  for (let i = 0; i < matches.length; i++) {
    const filename = matches[i][1];
    const startIndex = matches[i].index + matches[i][0].length;
    const endIndex = i + 1 < matches.length ? matches[i + 1].index : rawCode.length;

    let blockCode = rawCode.slice(startIndex, endIndex).trim();
    const ext = filename.split(".").pop().toLowerCase();
    
    let language = defaultLang;
    if (ext === "xml") language = "xml";
    if (ext === "java") language = "java";
    if (ext === "sql") language = "sql";
    if (ext === "php") language = "php";

    blocks.push({
      filename,
      language,
      code: blockCode,
    });
  }

  return blocks;
}

function ProgramView({
  programs = [],
  selectedProgram,
  theme = "dark",
  onToggleTheme,
  onSelectProgram,
  onClose,
  className = "",
}) {
  const currentProgram = selectedProgram || programs[0];
  const isLight = theme === "light";

  const categoryUpper = String(currentProgram?.category || "").toUpperCase();
  const isAndroid = categoryUpper === "ANDROID";
  const isMySQL = categoryUpper === "MYSQL";

  // Filter practicals so category views remain strictly isolated
  const activeCategoryPrograms = useMemo(() => {
    if (isAndroid) {
      return programs.filter((p) => String(p.category).toUpperCase() === "ANDROID");
    }
    return programs.filter((p) => {
      const cat = String(p.category).toUpperCase();
      return cat === "PHP" || cat === "MYSQL";
    });
  }, [programs, isAndroid]);

  const currentIndex = activeCategoryPrograms.findIndex(
    (p) => String(p?.id) === String(currentProgram?.id)
  );

  const previousProgram = currentIndex > 0 ? activeCategoryPrograms[currentIndex - 1] : null;
  const nextProgram = currentIndex >= 0 && currentIndex < activeCategoryPrograms.length - 1 ? activeCategoryPrograms[currentIndex + 1] : null;

  const handleSelectProgram = (programId) => {
    if (typeof onSelectProgram === "function") {
      onSelectProgram(programId);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (!currentProgram) {
    return (
      <main className={`pv-empty ${isLight ? "pv-empty--light" : "pv-empty--dark"}`}>
        <div className="pv-empty__card">
          <span className="pv-empty__tag">CS Workspace</span>
          <h1>Practical Not Found</h1>
          <p>The practical you are looking for is unavailable.</p>
          <button type="button" onClick={onClose} className="pv-btn">
            Return to Overview
          </button>
        </div>

        <style>{`
          .pv-empty--dark {
            --pve-bg: #090d12;
            --pve-panel: #111720;
            --pve-border: #1e293b;
            --pve-text: #f1f5f9;
            --pve-muted: #94a3b8;
          }
          .pv-empty--light {
            --pve-bg: #f8fafc;
            --pve-panel: #ffffff;
            --pve-border: #e2e8f0;
            --pve-text: #0f172a;
            --pve-muted: #64748b;
          }
          .pv-empty {
            min-height: 100vh;
            display: grid;
            place-items: center;
            padding: 2rem;
            background: var(--pve-bg);
            color: var(--pve-text);
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          }
          .pv-empty__card {
            max-width: 400px;
            width: 100%;
            padding: 2rem;
            border: 1px solid var(--pve-border);
            border-radius: 8px;
            background: var(--pve-panel);
            text-align: center;
          }
          .pv-empty__tag {
            color: #0284c7;
            font-family: ui-monospace, SFMono-Regular, monospace;
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.05em;
          }
          .pv-empty h1 {
            font-size: 1.5rem;
            margin: 0.75rem 0 0.5rem;
          }
          .pv-empty p {
            color: var(--pve-muted);
            font-size: 0.875rem;
            margin-bottom: 1.5rem;
          }
          .pv-btn {
            padding: 0.5rem 1rem;
            border: 1px solid var(--pve-border);
            border-radius: 6px;
            background: var(--pve-bg);
            color: var(--pve-text);
            font-weight: 600;
            cursor: pointer;
          }
        `}</style>
      </main>
    );
  }

  const {
    number = "01",
    title = "",
    shortDescription = "",
    aim = "",
    algorithm = [],
    code = "",
    output = "",
    howItWorks = [],
    examTips = [],
  } = currentProgram;

  const defaultLanguage = isAndroid ? "java" : isMySQL ? "sql" : "php";
  const defaultFilename = isAndroid ? "MainActivity.java" : isMySQL ? "query.sql" : "index.php";
  const parsedBlocks = parseCodeBlocks(code, defaultLanguage, defaultFilename);

  return (
    <div
      className={`pv ${isLight ? "pv--light" : "pv--dark"} ${
        isAndroid ? "pv--android" : ""
      } ${className}`}
    >
      {/* Top Header Bar */}
      <header className="pv-header">
        <div className="pv-header__inner">
          <div className="pv-brand">
            <button
              type="button"
              className="pv-back-btn"
              onClick={onClose}
              title="Back to Practicals List"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
            </button>
            <Logo compact />
            <span className="pv-brand__divider">/</span>
            <span className="pv-brand__label">
              {isAndroid ? "Android Lab Workspace" : "PHP & MySQL Workspace"}
            </span>
          </div>

          <div className="pv-actions">
            <span className="pv-counter">
              Module {number} / {String(activeCategoryPrograms.length).padStart(2, "0")}
            </span>
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
            <button
              type="button"
              className="pv-close-btn"
              onClick={onClose}
              aria-label="Close practical view"
            >
              Close
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace Container */}
      <div className="pv-container">
        {/* Sidebar Practical List (Desktop) */}
        <aside className="pv-sidebar">
          <div className="pv-sidebar__header">
            <span>{isAndroid ? "Android Modules" : "PHP Modules"}</span>
          </div>
          <div className="pv-sidebar__list">
            {activeCategoryPrograms.map((program) => {
              const isActive = String(program.id) === String(currentProgram.id);
              return (
                <button
                  type="button"
                  key={program.id}
                  className={`pv-sidebar__item ${isActive ? "pv-sidebar__item--active" : ""}`}
                  onClick={() => handleSelectProgram(program.id)}
                >
                  <span className="pv-sidebar__num">{program.number}</span>
                  <span className="pv-sidebar__title">{program.title}</span>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Viewport Content Column */}
        <main className="pv-content">
          {/* Horizontal Selector (Mobile View) */}
          <div className="pv-mobile-nav">
            <span className="pv-mobile-nav__label">Select Practical</span>
            <div className="pv-mobile-nav__scroller">
              {activeCategoryPrograms.map((program) => {
                const isActive = String(program.id) === String(currentProgram.id);
                return (
                  <button
                    type="button"
                    key={program.id}
                    className={`pv-mobile-chip ${isActive ? "pv-mobile-chip--active" : ""}`}
                    onClick={() => handleSelectProgram(program.id)}
                  >
                    P{program.number}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Practical Introduction */}
          <section className="pv-hero">
            <div className="pv-badge">
              <span>Practical {number}</span>
              <span className="pv-badge__dot">•</span>
              <span>{isAndroid ? "Android" : isMySQL ? "MySQL" : "PHP"}</span>
            </div>

            <h1 className="pv-title">{title}</h1>
            <p className="pv-description">{shortDescription}</p>

            {/* Quick Navigation Anchors */}
            <div className="pv-anchors">
              <button type="button" onClick={() => scrollToSection("aim")}>Aim</button>
              <button type="button" onClick={() => scrollToSection("algorithm")}>Algorithm</button>
              <button type="button" onClick={() => scrollToSection("code")}>Code</button>
              <button type="button" onClick={() => scrollToSection("output")}>Output</button>
              {examTips.length > 0 && (
                <button type="button" onClick={() => scrollToSection("exam")}>Exam Tips</button>
              )}
            </div>
          </section>

          {/* Aim Section */}
          <section id="aim" className="pv-section">
            <h2 className="pv-section__label">Aim</h2>
            <div className="pv-card">
              <p className="pv-aim-text">{aim}</p>
            </div>
          </section>

          {/* Algorithm Section */}
          <section id="algorithm" className="pv-section">
            <h2 className="pv-section__label">Algorithm</h2>
            <div className="pv-card">
              <div className="pv-steps">
                {algorithm.map((step, index) => (
                  <div key={index} className="pv-step-row">
                    <span className="pv-step-idx">{String(index + 1).padStart(2, "0")}</span>
                    <span className="pv-step-val">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Source Code Section */}
          <section id="code" className="pv-section">
            <h2 className="pv-section__label">Source Code</h2>
            <div className="pv-code-stack">
              {parsedBlocks.map((block, index) => (
                <CodeBlock
                  key={index}
                  code={block.code}
                  language={block.language}
                  filename={block.filename}
                  theme={theme}
                />
              ))}
            </div>
          </section>

          {/* Expected Output Section */}
          <section id="output" className="pv-section">
            <h2 className="pv-section__label">Expected Output</h2>
            <div className="pv-card pv-output-card">
              <div className="pv-output-header">
                <span>{isAndroid ? "Device Screen View / Logcat" : "Console Output"}</span>
              </div>
              <pre className="pv-output-code">
                <code>{output}</code>
              </pre>
            </div>
          </section>

          {/* How It Works Section */}
          {howItWorks.length > 0 && (
            <section className="pv-section">
              <h2 className="pv-section__label">How It Works</h2>
              <div className="pv-card">
                <div className="pv-steps">
                  {howItWorks.map((item, index) => (
                    <div key={index} className="pv-step-row">
                      <span className="pv-step-idx">{String(index + 1).padStart(2, "0")}</span>
                      <span className="pv-step-val">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Exam Tips Section */}
          {examTips.length > 0 && (
            <section id="exam" className="pv-section">
              <h2 className="pv-section__label">Exam Tips & Guidance</h2>
              <div className="pv-card pv-exam-card">
                <div className="pv-exam-list">
                  {examTips.map((tip, index) => (
                    <div key={index} className="pv-exam-item">
                      <span className="pv-exam-bullet">✓</span>
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Footer Navigation Buttons */}
          <nav className="pv-footer-nav" aria-label="Practical pagination">
            <button
              type="button"
              className="pv-nav-btn"
              disabled={!previousProgram}
              onClick={() => previousProgram && handleSelectProgram(previousProgram.id)}
            >
              <span className="pv-nav-btn__sub">Previous Practical</span>
              <span className="pv-nav-btn__title">
                {previousProgram ? `${previousProgram.number} · ${previousProgram.title}` : "None"}
              </span>
            </button>

            <button
              type="button"
              className="pv-nav-btn pv-nav-btn--next"
              disabled={!nextProgram}
              onClick={() => nextProgram && handleSelectProgram(nextProgram.id)}
            >
              <span className="pv-nav-btn__sub">Next Practical</span>
              <span className="pv-nav-btn__title">
                {nextProgram ? `${nextProgram.number} · ${nextProgram.title}` : "None"}
              </span>
            </button>
          </nav>
        </main>
      </div>

      <style>{`
        .pv--dark {
          --pv-bg: #090d12;
          --pv-panel: #111720;
          --pv-panel-hover: #1c2433;
          --pv-text: #f1f5f9;
          --pv-muted: #94a3b8;
          --pv-border: #1e293b;
          --pv-accent: #38bdf8;
        }

        .pv--light {
          --pv-bg: #f8fafc;
          --pv-panel: #ffffff;
          --pv-panel-hover: #f1f5f9;
          --pv-text: #0f172a;
          --pv-muted: #64748b;
          --pv-border: #e2e8f0;
          --pv-accent: #0284c7;
        }

        .pv {
          min-height: 100vh;
          background-color: var(--pv-bg);
          color: var(--pv-text);
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          transition: background-color 0.2s ease, color 0.2s ease;
        }

        .pv--android {
          --pv-accent: #34d399;
        }

        .pv-header {
          position: sticky;
          top: 0;
          z-index: 40;
          background: var(--pv-panel);
          border-bottom: 1px solid var(--pv-border);
          transition: background-color 0.2s ease, border-color 0.2s ease;
        }

        .pv-header__inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0.75rem 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .pv-brand {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .pv-back-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 5px;
          border: 1px solid var(--pv-border);
          border-radius: 6px;
          background: transparent;
          color: var(--pv-muted);
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .pv-back-btn:hover {
          color: var(--pv-text);
          border-color: var(--pv-muted);
          background: var(--pv-panel-hover);
        }

        .pv-brand__divider {
          color: var(--pv-muted);
          opacity: 0.4;
        }

        .pv-brand__label {
          font-family: ui-monospace, SFMono-Regular, monospace;
          font-size: 11px;
          font-weight: 600;
          color: var(--pv-muted);
          text-transform: uppercase;
        }

        .pv-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .pv-counter {
          font-family: ui-monospace, SFMono-Regular, monospace;
          font-size: 11px;
          color: var(--pv-muted);
        }

        .pv-close-btn {
          background: transparent;
          border: 1px solid var(--pv-border);
          color: var(--pv-text);
          padding: 5px 12px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.15s ease;
        }

        .pv-close-btn:hover {
          background: var(--pv-panel-hover);
        }

        .pv-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem 1.5rem 4rem;
          display: grid;
          grid-template-columns: 260px 1fr;
          gap: 2.5rem;
        }

        .pv-sidebar {
          position: sticky;
          top: 80px;
          height: fit-content;
        }

        .pv-sidebar__header {
          font-family: ui-monospace, SFMono-Regular, monospace;
          font-size: 11px;
          font-weight: 700;
          color: var(--pv-muted);
          text-transform: uppercase;
          margin-bottom: 0.75rem;
        }

        .pv-sidebar__list {
          background: var(--pv-panel);
          border: 1px solid var(--pv-border);
          border-radius: 8px;
          overflow: hidden;
          max-height: calc(100vh - 140px);
          overflow-y: auto;
        }

        .pv-sidebar__item {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          background: transparent;
          border: none;
          border-bottom: 1px solid var(--pv-border);
          color: var(--pv-muted);
          font-size: 13px;
          text-align: left;
          cursor: pointer;
          transition: background-color 0.15s ease, color 0.15s ease;
        }

        .pv-sidebar__item:last-child {
          border-bottom: none;
        }

        .pv-sidebar__item:hover {
          background: var(--pv-panel-hover);
          color: var(--pv-text);
        }

        .pv-sidebar__item--active {
          background: var(--pv-panel-hover);
          color: var(--pv-text);
          font-weight: 600;
        }

        .pv-sidebar__num {
          font-family: ui-monospace, SFMono-Regular, monospace;
          font-size: 11px;
          color: var(--pv-accent);
          font-weight: 700;
        }

        .pv-sidebar__title {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .pv-content {
          min-width: 0;
        }

        .pv-hero {
          margin-bottom: 2rem;
        }

        .pv-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: ui-monospace, SFMono-Regular, monospace;
          font-size: 11px;
          font-weight: 700;
          color: var(--pv-accent);
          margin-bottom: 0.5rem;
        }

        .pv-title {
          font-size: clamp(1.5rem, 3vw, 2.25rem);
          font-weight: 800;
          line-height: 1.2;
          margin: 0 0 0.5rem;
        }

        .pv-description {
          color: var(--pv-muted);
          font-size: 0.95rem;
          line-height: 1.5;
          margin: 0 0 1.25rem;
        }

        .pv-anchors {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          padding-bottom: 4px;
        }

        .pv-anchors button {
          background: var(--pv-panel);
          border: 1px solid var(--pv-border);
          color: var(--pv-muted);
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
        }

        .pv-anchors button:hover {
          color: var(--pv-text);
          border-color: var(--pv-muted);
        }

        .pv-section {
          margin-bottom: 2rem;
          scroll-margin-top: 80px;
        }

        .pv-section__label {
          font-family: ui-monospace, SFMono-Regular, monospace;
          font-size: 11px;
          font-weight: 700;
          color: var(--pv-muted);
          text-transform: uppercase;
          margin-bottom: 0.5rem;
        }

        .pv-card {
          background: var(--pv-panel);
          border: 1px solid var(--pv-border);
          border-radius: 8px;
          padding: 1.25rem;
        }

        .pv-aim-text {
          margin: 0;
          font-size: 0.95rem;
          line-height: 1.6;
        }

        .pv-steps {
          display: flex;
          flex-direction: column;
        }

        .pv-step-row {
          display: flex;
          gap: 12px;
          padding: 8px 0;
          border-bottom: 1px solid var(--pv-border);
        }

        .pv-step-row:last-child {
          border-bottom: none;
        }

        .pv-step-idx {
          font-family: ui-monospace, SFMono-Regular, monospace;
          font-size: 11px;
          color: var(--pv-accent);
          font-weight: 700;
        }

        .pv-step-val {
          font-size: 0.9rem;
          line-height: 1.5;
        }

        .pv-code-stack {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .pv-output-card {
          padding: 0;
          overflow: hidden;
        }

        .pv-output-header {
          background: var(--pv-panel-hover);
          border-bottom: 1px solid var(--pv-border);
          padding: 8px 12px;
          font-family: ui-monospace, SFMono-Regular, monospace;
          font-size: 11px;
          color: var(--pv-muted);
        }

        .pv-output-code {
          margin: 0;
          padding: 12px;
          font-family: ui-monospace, SFMono-Regular, monospace;
          font-size: 12px;
          line-height: 1.6;
          overflow-x: auto;
          white-space: pre-wrap;
          color: var(--pv-text);
        }

        .pv-exam-card {
          border-color: rgba(2, 132, 199, 0.3);
        }

        .pv-exam-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .pv-exam-item {
          display: flex;
          gap: 8px;
          font-size: 0.9rem;
          line-height: 1.5;
        }

        .pv-exam-bullet {
          color: var(--pv-accent);
          font-weight: 700;
        }

        .pv-footer-nav {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-top: 3rem;
          padding-top: 1.5rem;
          border-top: 1px solid var(--pv-border);
        }

        .pv-nav-btn {
          background: var(--pv-panel);
          border: 1px solid var(--pv-border);
          border-radius: 8px;
          padding: 12px;
          display: flex;
          flex-direction: column;
          text-align: left;
          cursor: pointer;
          transition: border-color 0.15s ease;
        }

        .pv-nav-btn:hover:not(:disabled) {
          border-color: var(--pv-muted);
        }

        .pv-nav-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .pv-nav-btn--next {
          text-align: right;
        }

        .pv-nav-btn__sub {
          font-family: ui-monospace, SFMono-Regular, monospace;
          font-size: 10px;
          color: var(--pv-muted);
          text-transform: uppercase;
        }

        .pv-nav-btn__title {
          font-size: 13px;
          font-weight: 600;
          color: var(--pv-text);
          margin-top: 4px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .pv-mobile-nav {
          display: none;
        }

        @media (max-width: 820px) {
          .pv-container {
            grid-template-columns: 1fr;
          }

          .pv-sidebar {
            display: none;
          }

          .pv-mobile-nav {
            display: flex;
            flex-direction: column;
            gap: 6px;
            margin-bottom: 1.5rem;
          }

          .pv-mobile-nav__label {
            font-family: ui-monospace, SFMono-Regular, monospace;
            font-size: 11px;
            color: var(--pv-muted);
            text-transform: uppercase;
          }

          .pv-mobile-nav__scroller {
            display: flex;
            gap: 6px;
            overflow-x: auto;
            padding-bottom: 4px;
          }

          .pv-mobile-chip {
            background: var(--pv-panel);
            border: 1px solid var(--pv-border);
            color: var(--pv-muted);
            padding: 6px 12px;
            border-radius: 6px;
            font-size: 12px;
            font-weight: 600;
            white-space: nowrap;
          }

          .pv-mobile-chip--active {
            border-color: var(--pv-accent);
            color: var(--pv-text);
            background: var(--pv-panel-hover);
          }
        }
      `}</style>
    </div>
  );
}

export default ProgramView;