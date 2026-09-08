import React from "react";
import CodeBlock from "../components/CodeBlock";
import Logo from "../components/Logo";
import ThemeToggle from "../components/ThemeToggle";

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

  const currentIndex = programs.findIndex(
    (program) => String(program?.id) === String(currentProgram?.id)
  );

  const previousProgram =
    currentIndex > 0 ? programs[currentIndex - 1] : null;

  const nextProgram =
    currentIndex >= 0 && currentIndex < programs.length - 1
      ? programs[currentIndex + 1]
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
          <span>PHP & MySQL Lab</span>
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
            background: var(--bg, #0d0f12);
            color: var(--text, #f0f4f8);
          }

          .program-view-empty__box {
            width: min(400px, 100%);
            padding: 28px;
            border: 1px solid var(--border, #1e2631);
            border-radius: 12px;
            background: var(--surface, #11151c);
            text-align: center;
          }

          .program-view-empty__box span {
            color: var(--accent, #3b82f6);
            font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
            font-size: 11px;
          }

          .program-view-empty h1 {
            margin-top: 10px;
            font-size: 22px;
          }

          .program-view-empty p {
            margin-top: 8px;
            color: var(--muted, #94a3b8);
            font-size: 13px;
          }

          .program-view-empty button {
            margin-top: 20px;
            height: 38px;
            padding: 0 16px;
            border: 1px solid var(--border, #2a3441);
            border-radius: 6px;
            background: var(--surface-soft, #161b24);
            color: var(--text, #f0f4f8);
            cursor: pointer;
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

  return (
    <main className={`program-view ${className}`}>
      {/* Header Bar */}
      <header className="program-view__topbar">
        <div className="program-view__topbar-inner">
          <div className="program-view__brand">
            <Logo compact />
            <span className="program-view__brand-divider" />
            <span className="program-view__brand-context">Practical Lab</span>
          </div>

          <div className="program-view__actions">
            <span className="program-view__counter">
              {number} / {String(programs.length).padStart(2, "0")}
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
        {/* Desktop Sidebar */}
        <aside className="program-view__sidebar">
          <span className="program-view__sidebar-label">Practicals</span>
          <div className="program-view__program-list">
            {programs.map((program) => {
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
          {/* Mobile Selector */}
          <div className="program-view__mobile-programs">
            <span className="program-view__mobile-label">Practicals</span>
            <div className="program-view__mobile-list">
              {programs.map((program) => {
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
              <span>{category}</span>
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
              <button
                type="button"
                className="program-view__quick-button"
                onClick={() => scrollToSection("exam")}
              >
                Exam tips
              </button>
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

          {/* Code Section */}
          <section id="code" className="program-view__section">
            <span className="program-view__label">Source Code</span>
            <CodeBlock
              code={code}
              language={category === "MYSQL" ? "SQL" : "PHP"}
              filename={category === "MYSQL" ? "query.sql" : "index.php"}
            />
          </section>

          {/* Output Section */}
          <section id="output" className="program-view__section">
            <span className="program-view__label">Expected Output</span>
            <div className="program-view__output">
              <div className="program-view__output-header">
                <span className="program-view__output-title">
                  Console output
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
          background: var(--bg, #0d0f12);
          color: var(--text, #f0f4f8);
        }

        .program-view__topbar {
          position: sticky;
          top: 0;
          z-index: 50;
          width: 100%;
          border-bottom: 1px solid var(--border, #1e2631);
          background: var(--bg, #0d0f12);
        }

        .program-view__topbar-inner {
          width: min(1160px, calc(100% - 32px));
          height: 64px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .program-view__brand {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .program-view__brand-divider {
          width: 1px;
          height: 16px;
          background: var(--border, #1e2631);
        }

        .program-view__brand-context {
          font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
          font-size: 11px;
          color: var(--muted, #94a3b8);
        }

        .program-view__actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .program-view__counter {
          font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
          font-size: 11px;
          color: var(--muted, #94a3b8);
        }

        .program-view__close {
          height: 34px;
          padding: 0 14px;
          border: 1px solid var(--border, #2a3441);
          border-radius: 6px;
          background: var(--surface, #11151c);
          color: var(--text, #f0f4f8);
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.18s ease;
        }

        .program-view__close:hover {
          border-color: var(--accent, #3b82f6);
          background: var(--surface-soft, #161b24);
        }

        .program-view__layout {
          width: min(1160px, calc(100% - 32px));
          margin: 0 auto;
          display: grid;
          grid-template-columns: 220px 1fr;
          gap: 40px;
          padding: 40px 0 80px;
        }

        .program-view__sidebar {
          position: sticky;
          top: 84px;
          align-self: start;
        }

        .program-view__sidebar-label {
          display: block;
          margin-bottom: 10px;
          font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
          font-size: 10px;
          color: var(--muted, #94a3b8);
        }

        .program-view__program-list {
          display: flex;
          flex-direction: column;
          border: 1px solid var(--border, #1e2631);
          border-radius: 10px;
          background: var(--surface, #11151c);
          max-height: calc(100vh - 120px);
          overflow-y: auto;
        }

        .program-view__program {
          position: relative;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 14px;
          border: 0;
          border-bottom: 1px solid var(--border, #1e2631);
          background: transparent;
          color: var(--muted, #94a3b8);
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
          background: var(--surface-soft, #161b24);
          color: var(--text, #f0f4f8);
        }

        .program-view__program--active {
          background: var(--surface-soft, #161b24) !important;
          color: #ffffff !important;
          font-weight: 600;
        }

        .program-view__program--active::before {
          content: "";
          position: absolute;
          left: 0;
          top: 8px;
          bottom: 8px;
          width: 3px;
          border-radius: 0 2px 2px 0;
          background: var(--accent, #3b82f6);
        }

        .program-view__program-number {
          font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
          font-size: 11px;
          color: var(--accent, #3b82f6);
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
          color: var(--accent, #3b82f6);
        }

        .program-view__title {
          margin: 12px 0 0 0;
          font-size: clamp(28px, 4.5vw, 44px);
          font-weight: 800;
          line-height: 1.2;
          letter-spacing: -0.02em;
        }

        .program-view__description {
          margin: 12px 0 0 0;
          font-size: 15px;
          line-height: 1.6;
          color: var(--muted, #94a3b8);
        }

        .program-view__quick-nav {
          display: flex;
          gap: 8px;
          margin-top: 24px;
          overflow-x: auto;
          padding-bottom: 4px;
        }

        .program-view__quick-button {
          padding: 6px 12px;
          border: 1px solid var(--border, #2a3441);
          border-radius: 6px;
          background: var(--surface, #11151c);
          color: var(--muted, #94a3b8);
          font-size: 11px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.15s ease;
          white-space: nowrap;
        }

        .program-view__quick-button:hover {
          border-color: var(--accent, #3b82f6);
          color: var(--text, #f0f4f8);
        }

        .program-view__section {
          padding-top: 40px;
          scroll-margin-top: 80px;
        }

        .program-view__label {
          display: block;
          margin-bottom: 12px;
          font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
          font-size: 11px;
          font-weight: 600;
          color: var(--accent, #3b82f6);
        }

        .program-view__aim {
          margin: 0;
          font-size: 14px;
          line-height: 1.7;
          color: var(--text, #f0f4f8);
        }

        .program-view__algorithm {
          border-top: 1px solid var(--border, #1e2631);
        }

        .program-view__algorithm-row,
        .program-view__list-row {
          display: grid;
          grid-template-columns: 32px 1fr;
          gap: 12px;
          padding: 12px 0;
          border-bottom: 1px solid var(--border, #1e2631);
        }

        .program-view__step-number {
          font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
          font-size: 11px;
          color: var(--muted, #94a3b8);
        }

        .program-view__step-text {
          font-size: 13px;
          line-height: 1.6;
          color: var(--text, #f0f4f8);
        }

        .program-view__output {
          border: 1px solid var(--border, #1e2631);
          border-radius: 10px;
          background: var(--surface, #11151c);
          overflow: hidden;
        }

        .program-view__output-header {
          padding: 10px 16px;
          border-bottom: 1px solid var(--border, #1e2631);
          background: var(--surface-soft, #161b24);
        }

        .program-view__output-title {
          font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
          font-size: 11px;
          color: var(--muted, #94a3b8);
        }

        .program-view__output pre {
          margin: 0;
          padding: 18px;
          font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
          font-size: 12px;
          line-height: 1.7;
          color: var(--text, #f0f4f8);
          overflow-x: auto;
          white-space: pre-wrap;
        }

        .program-view__exam {
          margin-top: 40px;
          padding: 20px;
          border: 1px solid var(--border, #1e2631);
          border-radius: 10px;
          background: var(--surface, #11151c);
        }

        .program-view__exam-row {
          display: flex;
          gap: 10px;
          padding: 8px 0;
          border-bottom: 1px solid var(--border, #1e2631);
        }

        .program-view__exam-row:last-child {
          border-bottom: 0;
        }

        .program-view__exam-mark {
          color: var(--accent, #3b82f6);
          font-size: 12px;
        }

        .program-view__exam-text {
          font-size: 13px;
          line-height: 1.6;
          color: var(--text, #f0f4f8);
        }

        .program-view__navigation {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-top: 48px;
          padding-top: 24px;
          border-top: 1px solid var(--border, #1e2631);
        }

        .program-view__navigation-button {
          display: flex;
          flex-direction: column;
          padding: 16px;
          border: 1px solid var(--border, #2a3441);
          border-radius: 8px;
          background: var(--surface, #11151c);
          color: var(--text, #f0f4f8);
          text-align: left;
          cursor: pointer;
          transition: all 0.18s ease;
        }

        .program-view__navigation-button:hover:not(:disabled) {
          border-color: var(--accent, #3b82f6);
          background: var(--surface-soft, #161b24);
        }

        .program-view__navigation-button--next {
          text-align: right;
        }

        .program-view__navigation-label {
          font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
          font-size: 10px;
          color: var(--muted, #94a3b8);
        }

        .program-view__navigation-title {
          margin-top: 4px;
          font-size: 13px;
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
          .program-view__layout {
            grid-template-columns: 1fr;
          }

          .program-view__sidebar {
            display: none;
          }

          .program-view__mobile-programs {
            display: block;
            margin-bottom: 24px;
          }

          .program-view__mobile-label {
            display: block;
            margin-bottom: 8px;
            font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
            font-size: 10px;
            color: var(--muted, #94a3b8);
          }

          .program-view__mobile-list {
            display: flex;
            gap: 6px;
            overflow-x: auto;
            padding-bottom: 4px;
          }

          .program-view__mobile-button {
            padding: 6px 12px;
            border: 1px solid var(--border, #1e2631);
            border-radius: 6px;
            background: var(--surface, #11151c);
            color: var(--muted, #94a3b8);
            font-size: 11px;
            cursor: pointer;
          }

          .program-view__mobile-button--active {
            border-color: var(--accent, #3b82f6);
            background: var(--surface-soft, #161b24);
            color: var(--text, #ffffff);
            font-weight: 600;
          }
        }

        @media (max-width: 600px) {
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