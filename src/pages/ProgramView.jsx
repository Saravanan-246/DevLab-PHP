import React, { useMemo } from "react";
import CodeBlock from "../components/CodeBlock";
import Logo from "../components/Logo";
import ThemeToggle from "../components/ThemeToggle";

// Helper function to split multi-file code strings into separate code blocks
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

  const categoryUpper = String(currentProgram?.category || "").toUpperCase();
  const isAndroid = categoryUpper === "ANDROID";
  const isMySQL = categoryUpper === "MYSQL";

  // Filter practicals so Android view ONLY shows Android practicals
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
    (program) => String(program?.id) === String(currentProgram?.id)
  );

  const previousProgram =
    currentIndex > 0 ? activeCategoryPrograms[currentIndex - 1] : null;

  const nextProgram =
    currentIndex >= 0 && currentIndex < activeCategoryPrograms.length - 1
      ? activeCategoryPrograms[currentIndex + 1]
      : null;

  const handleSelectProgram = (programId) => {
    if (typeof onSelectProgram === "function") {
      onSelectProgram(programId);
    }
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  if (!currentProgram) {
    return (
      <main className="program-view-empty">
        <div className="program-view-empty__box">
          <span>Practical Workspace</span>
          <h1>Practical not found</h1>
          <p>The selected practical is unavailable.</p>
          <button type="button" onClick={onClose}>
            Back to practicals
          </button>
        </div>

        <style>{`
          .program-view-empty {
            min-height: 100vh;
            display: grid;
            place-items: center;
            padding: 24px;
            background: var(--bg, #090b0e);
            color: var(--text, #f0f4f8);
          }

          .program-view-empty__box {
            width: min(400px, 100%);
            padding: 28px;
            border: 1px solid var(--border, #1a202c);
            border-radius: 2px;
            background: var(--surface, #11151c);
            text-align: center;
          }

          .program-view-empty__box span {
            color: var(--accent, #3b82f6);
            font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
            font-size: 11px;
            text-transform: uppercase;
          }

          .program-view-empty h1 {
            margin-top: 10px;
            font-size: 22px;
            font-weight: 700;
          }

          .program-view-empty p {
            margin-top: 8px;
            color: var(--muted, #8a96a8);
            font-size: 13px;
          }

          .program-view-empty button {
            margin-top: 20px;
            height: 38px;
            padding: 0 16px;
            border: 1px solid var(--border-strong, #2d3748);
            border-radius: 2px;
            background: var(--surface-soft, #171d26);
            color: var(--text, #f0f4f8);
            cursor: pointer;
            font-weight: 600;
          }

          .program-view-empty button:hover {
            border-color: var(--accent, #3b82f6);
          }
        `}</style>
      </main>
    );
  }

  const {
    number = "01",
    category = "PHP",
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
  const defaultFilename = isAndroid
    ? "MainActivity.java"
    : isMySQL
    ? "query.sql"
    : "index.php";

  const parsedBlocks = parseCodeBlocks(code, defaultLanguage, defaultFilename);

  return (
    <main className={`program-view ${isAndroid ? "program-view--android" : ""} ${className}`}>
      {/* Header Bar */}
      <header className="program-view__topbar">
        <div className="program-view__topbar-inner">
          <div className="program-view__brand">
            <Logo compact />
            <span className="program-view__brand-divider" />
            <span className="program-view__brand-context">
              {isAndroid ? "Android Lab" : "PHP & MySQL Lab"}
            </span>
          </div>

          <div className="program-view__actions">
            <span className="program-view__counter">
              {number} / {String(activeCategoryPrograms.length).padStart(2, "0")}
            </span>
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
            <button
              type="button"
              className="program-view__close"
              onClick={onClose}
              aria-label="Close practical"
            >
              Close
            </button>
          </div>
        </div>
      </header>

      <div className="program-view__layout">
        {/* Sidebar - Strictly filtered to current category */}
        <aside className="program-view__sidebar">
          <span className="program-view__sidebar-label">
            {isAndroid ? "Android Practicals" : "PHP & MySQL Practicals"}
          </span>
          <div className="program-view__program-list">
            {activeCategoryPrograms.map((program) => {
              const isActive = String(program.id) === String(currentProgram.id);
              return (
                <button
                  type="button"
                  key={program.id}
                  className={`program-view__program ${
                    isActive ? "program-view__program--active" : ""
                  }`}
                  aria-current={isActive ? "true" : undefined}
                  onClick={() => handleSelectProgram(program.id)}
                >
                  <span className="program-view__program-number">
                    {program.number}
                  </span>
                  <span className="program-view__program-name">
                    {program.title}
                  </span>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Main Content Viewport */}
        <article className="program-view__content">
          {/* Mobile Horizontal Selector */}
          <div className="program-view__mobile-programs">
            <span className="program-view__mobile-label">Select Practical</span>
            <div className="program-view__mobile-list">
              {activeCategoryPrograms.map((program) => {
                const isActive = String(program.id) === String(currentProgram.id);
                return (
                  <button
                    type="button"
                    key={program.id}
                    className={`program-view__mobile-button ${
                      isActive ? "program-view__mobile-button--active" : ""
                    }`}
                    aria-current={isActive ? "true" : undefined}
                    onClick={() => handleSelectProgram(program.id)}
                  >
                    P{program.number}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Intro Section */}
          <header className="program-view__intro">
            <div className="program-view__eyebrow">
              <span>Practical {number}</span>
              <span className="program-view__divider" />
              <span className="program-view__category-tag">
                {isAndroid ? "Android" : isMySQL ? "MySQL" : "PHP"}
              </span>
            </div>

            <h1 className="program-view__title">{title}</h1>
            <p className="program-view__description">{shortDescription}</p>

            {/* Quick Navigation Anchor Bar */}
            <div className="program-view__quick-nav">
              <button
                type="button"
                className="program-view__quick-button"
                onClick={() => scrollToSection("aim")}
              >
                Aim
              </button>
              <button
                type="button"
                className="program-view__quick-button"
                onClick={() => scrollToSection("algorithm")}
              >
                Algorithm
              </button>
              <button
                type="button"
                className="program-view__quick-button"
                onClick={() => scrollToSection("code")}
              >
                Code
              </button>
              <button
                type="button"
                className="program-view__quick-button"
                onClick={() => scrollToSection("output")}
              >
                Output
              </button>
              {examTips.length > 0 && (
                <button
                  type="button"
                  className="program-view__quick-button"
                  onClick={() => scrollToSection("exam")}
                >
                  Exam tips
                </button>
              )}
            </div>
          </header>

          {/* Aim Section */}
          <section id="aim" className="program-view__section">
            <span className="program-view__label">Aim</span>
            <p className="program-view__aim">{aim}</p>
          </section>

          {/* Algorithm Section */}
          <section id="algorithm" className="program-view__section">
            <span className="program-view__label">Algorithm</span>
            <div className="program-view__algorithm">
              {algorithm.map((step, index) => (
                <div key={index} className="program-view__algorithm-row">
                  <span className="program-view__step-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="program-view__step-text">{step}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Source Code Section */}
          <section id="code" className="program-view__section">
            <span className="program-view__label">Source Code</span>
            <div className="program-view__code-container">
              {parsedBlocks.map((block, index) => (
                <div key={index} className="program-view__code-block-wrapper">
                  <CodeBlock
                    code={block.code}
                    language={block.language}
                    filename={block.filename}
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Output Section */}
          <section id="output" className="program-view__section">
            <span className="program-view__label">Expected Output</span>
            <div className="program-view__output">
              <div className="program-view__output-header">
                <span className="program-view__output-title">
                  {isAndroid ? "Device Screen / Logcat" : "Console / Browser output"}
                </span>
              </div>
              <pre>
                <code>{output}</code>
              </pre>
            </div>
          </section>

          {/* How It Works Section */}
          {howItWorks.length > 0 && (
            <section className="program-view__section">
              <span className="program-view__label">How it works</span>
              <div className="program-view__list">
                {howItWorks.map((item, index) => (
                  <div key={index} className="program-view__list-row">
                    <span className="program-view__step-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="program-view__step-text">{item}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Exam Tips Section */}
          {examTips.length > 0 && (
            <section id="exam" className="program-view__exam">
              <span className="program-view__label">Exam tips</span>
              <div className="program-view__exam-list">
                {examTips.map((tip, index) => (
                  <div key={index} className="program-view__exam-row">
                    <span className="program-view__exam-mark">✓</span>
                    <span className="program-view__exam-text">{tip}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Navigation Controls */}
          <div className="program-view__navigation">
            <button
              type="button"
              className="program-view__navigation-button"
              disabled={!previousProgram}
              onClick={() =>
                previousProgram && handleSelectProgram(previousProgram.id)
              }
            >
              <span className="program-view__navigation-label">
                Previous practical
              </span>
              <span className="program-view__navigation-title">
                {previousProgram
                  ? `${previousProgram.number} · ${previousProgram.title}`
                  : "First practical"}
              </span>
            </button>

            <button
              type="button"
              className="program-view__navigation-button program-view__navigation-button--next"
              disabled={!nextProgram}
              onClick={() =>
                nextProgram && handleSelectProgram(nextProgram.id)
              }
            >
              <span className="program-view__navigation-label">
                Next practical
              </span>
              <span className="program-view__navigation-title">
                {nextProgram
                  ? `${nextProgram.number} · ${nextProgram.title}`
                  : "Last practical"}
              </span>
            </button>
          </div>
        </article>
      </div>

      <style>{`
        .program-view {
          min-height: 100vh;
          width: 100%;
          overflow-x: hidden;
          background: var(--bg, #090b0e);
          color: var(--text, #f0f4f8);
          font-family: "Manrope", -apple-system, BlinkMacSystemFont, sans-serif;

          --theme-accent: #3b82f6;
        }

        .program-view--android {
          --theme-accent: #10b981;
        }

        .program-view__topbar {
          position: sticky;
          top: 0;
          z-index: 50;
          width: 100%;
          border-bottom: 1px solid var(--border, #1a202c);
          background: var(--bg, #090b0e);
        }

        .program-view__topbar-inner {
          width: min(1180px, calc(100% - 32px));
          height: 60px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .program-view__brand {
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 0;
        }

        .program-view__brand-divider {
          width: 1px;
          height: 16px;
          background: var(--border, #1a202c);
        }

        .program-view__brand-context {
          font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
          font-size: 11px;
          color: var(--muted, #8a96a8);
          white-space: nowrap;
          text-transform: uppercase;
        }

        .program-view__actions {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-shrink: 0;
        }

        .program-view__counter {
          font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
          font-size: 11px;
          color: var(--muted, #8a96a8);
        }

        .program-view__close {
          height: 34px;
          padding: 0 14px;
          border: 1px solid var(--border-strong, #2d3748);
          border-radius: 2px;
          background: var(--surface, #11151c);
          color: var(--text, #f0f4f8);
          font-size: 11px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .program-view__close:hover {
          border-color: var(--theme-accent);
          background: var(--surface-soft, #171d26);
        }

        .program-view__layout {
          width: min(1180px, calc(100% - 32px));
          margin: 0 auto;
          display: grid;
          grid-template-columns: 240px minmax(0, 1fr);
          gap: 36px;
          padding: 36px 0 80px;
        }

        .program-view__content {
          min-width: 0;
          width: 100%;
        }

        .program-view__sidebar {
          position: sticky;
          top: 80px;
          align-self: start;
        }

        .program-view__sidebar-label {
          display: block;
          margin-bottom: 10px;
          font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
          font-size: 10px;
          color: var(--muted, #8a96a8);
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .program-view__program-list {
          display: flex;
          flex-direction: column;
          border: 1px solid var(--border-strong, #2d3748);
          border-radius: 2px;
          background: var(--surface, #11151c);
          max-height: calc(100vh - 120px);
          overflow-y: auto;
        }

        .program-view__program {
          position: relative;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 11px 14px;
          border: 0;
          border-bottom: 1px solid var(--border, #1a202c);
          background: transparent;
          color: var(--muted, #8a96a8);
          font-size: 12px;
          font-weight: 500;
          text-align: left;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .program-view__program:last-child {
          border-bottom: 0;
        }

        .program-view__program:hover {
          background: var(--surface-soft, #171d26);
          color: var(--text, #f0f4f8);
        }

        .program-view__program--active {
          background: var(--surface-soft, #171d26) !important;
          color: #ffffff !important;
          font-weight: 600;
        }

        .program-view__program--active::before {
          content: "";
          position: absolute;
          left: 0;
          top: 6px;
          bottom: 6px;
          width: 3px;
          background: var(--theme-accent);
        }

        .program-view__program-number {
          font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
          font-size: 11px;
          color: var(--theme-accent);
        }

        .program-view__program-name {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .program-view__mobile-programs {
          display: none;
        }

        .program-view__eyebrow {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
          font-size: 11px;
          color: var(--theme-accent);
        }

        .program-view__category-tag {
          font-weight: 600;
        }

        .program-view__divider {
          width: 12px;
          height: 1px;
          background: var(--border-strong, #2d3748);
        }

        .program-view__title {
          margin: 10px 0 0 0;
          font-size: clamp(22px, 4vw, 38px);
          font-weight: 800;
          line-height: 1.25;
          letter-spacing: -0.02em;
          overflow-wrap: break-word;
          word-break: break-word;
        }

        .program-view__description {
          margin: 10px 0 0 0;
          font-size: 14px;
          line-height: 1.6;
          color: var(--muted, #8a96a8);
          overflow-wrap: break-word;
        }

        .program-view__quick-nav {
          display: flex;
          gap: 8px;
          margin-top: 20px;
          overflow-x: auto;
          padding-bottom: 4px;
          scrollbar-width: none;
        }

        .program-view__quick-nav::-webkit-scrollbar {
          display: none;
        }

        .program-view__quick-button {
          padding: 6px 12px;
          border: 1px solid var(--border-strong, #2d3748);
          border-radius: 2px;
          background: var(--surface, #11151c);
          color: var(--muted, #8a96a8);
          font-size: 11px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s ease;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .program-view__quick-button:hover {
          border-color: var(--theme-accent);
          color: var(--text, #f0f4f8);
        }

        .program-view__section {
          padding-top: 32px;
          scroll-margin-top: 70px;
        }

        .program-view__label {
          display: block;
          margin-bottom: 10px;
          font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
          font-size: 11px;
          font-weight: 600;
          color: var(--theme-accent);
          text-transform: uppercase;
        }

        .program-view__code-container {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .program-view__aim {
          margin: 0;
          font-size: 14px;
          line-height: 1.7;
          color: var(--text, #f0f4f8);
          overflow-wrap: break-word;
        }

        .program-view__algorithm {
          border-top: 1px solid var(--border, #1a202c);
        }

        .program-view__algorithm-row,
        .program-view__list-row {
          display: grid;
          grid-template-columns: 28px minmax(0, 1fr);
          gap: 12px;
          padding: 10px 0;
          border-bottom: 1px solid var(--border, #1a202c);
        }

        .program-view__step-number {
          font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
          font-size: 11px;
          color: var(--muted, #8a96a8);
        }

        .program-view__step-text {
          font-size: 13px;
          line-height: 1.6;
          color: var(--text, #f0f4f8);
          overflow-wrap: break-word;
        }

        .program-view__output {
          border: 1px solid var(--border-strong, #2d3748);
          border-radius: 2px;
          background: var(--surface, #11151c);
          overflow: hidden;
        }

        .program-view__output-header {
          padding: 10px 14px;
          border-bottom: 1px solid var(--border, #1a202c);
          background: var(--surface-soft, #171d26);
        }

        .program-view__output-title {
          font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
          font-size: 11px;
          color: var(--muted, #8a96a8);
        }

        .program-view__output pre {
          margin: 0;
          padding: 14px;
          font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
          font-size: 12px;
          line-height: 1.7;
          color: var(--text, #f0f4f8);
          overflow-x: auto;
          white-space: pre-wrap;
          word-break: break-all;
        }

        .program-view__exam {
          margin-top: 36px;
          padding: 18px;
          border: 1px solid var(--border-strong, #2d3748);
          border-radius: 2px;
          background: var(--surface, #11151c);
        }

        .program-view__exam-row {
          display: flex;
          gap: 10px;
          padding: 8px 0;
          border-bottom: 1px solid var(--border, #1a202c);
        }

        .program-view__exam-row:last-child {
          border-bottom: 0;
        }

        .program-view__exam-mark {
          color: var(--theme-accent);
          font-size: 12px;
          font-weight: 700;
        }

        .program-view__exam-text {
          font-size: 13px;
          line-height: 1.6;
          color: var(--text, #f0f4f8);
          overflow-wrap: break-word;
        }

        .program-view__navigation {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid var(--border, #1a202c);
        }

        .program-view__navigation-button {
          display: flex;
          flex-direction: column;
          padding: 12px 14px;
          border: 1px solid var(--border-strong, #2d3748);
          border-radius: 2px;
          background: var(--surface, #11151c);
          color: var(--text, #f0f4f8);
          text-align: left;
          cursor: pointer;
          transition: all 0.15s ease;
          min-width: 0;
        }

        .program-view__navigation-button:hover:not(:disabled) {
          border-color: var(--theme-accent);
          background: var(--surface-soft, #171d26);
        }

        .program-view__navigation-button--next {
          text-align: right;
        }

        .program-view__navigation-label {
          font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
          font-size: 10px;
          color: var(--muted, #8a96a8);
        }

        .program-view__navigation-title {
          margin-top: 4px;
          font-size: 12px;
          font-weight: 600;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .program-view__navigation-button:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        @media (max-width: 850px) {
          .program-view__topbar-inner {
            width: calc(100% - 24px);
            height: 54px;
          }

          .program-view__brand-context,
          .program-view__brand-divider {
            display: none;
          }

          .program-view__layout {
            grid-template-columns: 1fr;
            width: calc(100% - 24px);
            padding: 20px 0 60px;
          }

          .program-view__sidebar {
            display: none;
          }

          .program-view__mobile-programs {
            display: block;
            margin-bottom: 20px;
          }

          .program-view__mobile-label {
            display: block;
            margin-bottom: 8px;
            font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
            font-size: 10px;
            color: var(--muted, #8a96a8);
            text-transform: uppercase;
          }

          .program-view__mobile-list {
            display: flex;
            gap: 6px;
            overflow-x: auto;
            padding-bottom: 4px;
            scrollbar-width: thin;
          }

          .program-view__mobile-button {
            padding: 6px 12px;
            border: 1px solid var(--border-strong, #2d3748);
            border-radius: 2px;
            background: var(--surface, #11151c);
            color: var(--muted, #8a96a8);
            font-size: 11px;
            font-weight: 600;
            cursor: pointer;
            flex-shrink: 0;
          }

          .program-view__mobile-button--active {
            border-color: var(--theme-accent);
            background: var(--surface-soft, #171d26);
            color: #ffffff;
          }
        }

        @media (max-width: 600px) {
          .program-view__counter {
            display: none;
          }

          .program-view__navigation {
            grid-template-columns: 1fr;
          }

          .program-view__navigation-button--next {
            text-align: left;
          }
        }
      `}</style>
    </main>
  );
}

export default ProgramView;