import React from "react";
import Button from "../components/Button";
import Logo from "../components/Logo";
import ThemeToggle from "../components/ThemeToggle";

function Landing({ theme = "dark", onToggleTheme, onExplore, className = "" }) {
  const isLight = theme === "light";

  return (
    <div className={`landing ${isLight ? "landing--light" : ""} ${className}`}>
      {/* Top Navigation */}
      <header className="landing__header">
        <div className="landing__header-inner">
          <div className="landing__brand">
            <Logo />
            <span className="landing__tagline">Practical Workspace</span>
          </div>

          <div className="landing__actions">
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onExplore("ALL")}
            >
              Explore All
            </Button>
          </div>
        </div>
      </header>

      {/* Main Hero Viewport */}
      <main className="landing__main">
        <div className="landing__hero">
          <div className="landing__badge">CS Curriculum Reference</div>

          <h1 className="landing__title">
            Structured Practical Workspace for{" "}
            <span className="landing__title-accent">Computer Science</span>
          </h1>

          <p className="landing__description">
            Access step-by-step algorithms, full source code, expected outputs,
            and exam hints for your core practical coursework.
          </p>

          {/* Subject Directory Grid */}
          <div className="landing__subjects">
            {/* PHP & MySQL Card */}
            <div
              className="landing__subject-card landing__subject-card--php"
              onClick={() => onExplore("PHP")}
            >
              <div className="landing__card-header">
                <span className="landing__subject-code landing__subject-code--php">
                  PHP
                </span>
                <span className="landing__count-badge">12 Practicals</span>
              </div>
              <div className="landing__subject-info">
                <h3>PHP & MySQL</h3>
                <p>
                  Server-side scripting, session handling, database connections,
                  and SQL query executions.
                </p>
              </div>
              <div className="landing__card-footer">
                <span className="landing__card-link landing__card-link--php">
                  Explore Track →
                </span>
              </div>
            </div>

            {/* Android Card */}
            <div
              className="landing__subject-card landing__subject-card--android"
              onClick={() => onExplore("ANDROID")}
            >
              <div className="landing__card-header">
                <span className="landing__subject-code landing__subject-code--android">
                  ANDROID
                </span>
                <span className="landing__count-badge">9 Practicals</span>
              </div>
              <div className="landing__subject-info">
                <h3>Android Development</h3>
                <p>
                  Native Java UI layouts, SQLite persistence, background threads,
                  and GPS tracking.
                </p>
              </div>
              <div className="landing__card-footer">
                <span className="landing__card-link landing__card-link--android">
                  Explore Track →
                </span>
              </div>
            </div>
          </div>

          {/* Primary Action Button */}
          <div className="landing__cta">
            <Button
              variant="primary"
              size="lg"
              onClick={() => onExplore("ALL")}
            >
              Browse All 21 Practicals
            </Button>
          </div>
        </div>
      </main>

      <style>{`
        .landing {
          --bg: #090c10;
          --surface: #111620;
          --surface-soft: #171e2c;
          --border: #1f293d;
          --border-strong: #2e3d5a;
          --text: #f0f4f8;
          --muted: #8292a6;

          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: var(--bg);
          color: var(--text);
          font-family: "Manrope", -apple-system, BlinkMacSystemFont, sans-serif;
          transition: background-color 0.2s ease, color 0.2s ease;
        }

        /* Light Theme Variable Overrides */
        .landing--light {
          --bg: #f8fafc;
          --surface: #ffffff;
          --surface-soft: #f1f5f9;
          --border: #e2e8f0;
          --border-strong: #cbd5e1;
          --text: #0f172a;
          --muted: #64748b;
        }

        /* Header Navigation */
        .landing__header {
          position: sticky;
          top: 0;
          z-index: 50;
          width: 100%;
          border-bottom: 1px solid var(--border);
          background: var(--bg);
          transition: border-color 0.2s ease, background-color 0.2s ease;
        }

        .landing__header-inner {
          width: min(1180px, calc(100% - 32px));
          height: 60px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .landing__brand {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .landing__tagline {
          font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
          font-size: 11px;
          color: var(--muted);
          padding-left: 12px;
          border-left: 1px solid var(--border);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .landing__actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        /* Hero Container */
        .landing__main {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 60px 16px 80px;
        }

        .landing__hero {
          max-width: 800px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* Badge */
        .landing__badge {
          display: inline-flex;
          align-items: center;
          padding: 4px 12px;
          border-radius: 4px;
          border: 1px solid var(--border-strong);
          background: var(--surface-soft);
          color: var(--text);
          font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
          font-size: 11px;
          font-weight: 600;
          margin-bottom: 20px;
          letter-spacing: 0.03em;
          text-transform: uppercase;
        }

        .landing__title {
          margin: 0;
          font-size: clamp(28px, 4.5vw, 48px);
          font-weight: 800;
          line-height: 1.2;
          letter-spacing: -0.025em;
          color: var(--text);
        }

        .landing__title-accent {
          color: #6366f1;
        }

        .landing--light .landing__title-accent {
          color: #4f46e5;
        }

        .landing__description {
          margin: 16px 0 0 0;
          max-width: 580px;
          font-size: 15px;
          line-height: 1.65;
          color: var(--muted);
        }

        /* Subject Cards Grid */
        .landing__subjects {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          width: 100%;
          margin-top: 40px;
        }

        .landing__subject-card {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 22px;
          border: 1px solid var(--border);
          border-radius: 4px;
          background: var(--surface);
          text-align: left;
          cursor: pointer;
          transition: border-color 0.15s ease, background-color 0.15s ease, transform 0.15s ease;
        }

        .landing__subject-card--php:hover {
          border-color: #6366f1;
          background: var(--surface-soft);
          transform: translateY(-2px);
        }

        .landing__subject-card--android:hover {
          border-color: #10b981;
          background: var(--surface-soft);
          transform: translateY(-2px);
        }

        .landing__card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .landing__subject-code {
          display: grid;
          place-items: center;
          padding: 3px 8px;
          border-radius: 3px;
          font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
          font-size: 11px;
          font-weight: 700;
        }

        .landing__subject-code--php {
          background: rgba(99, 102, 241, 0.12);
          color: #818cf8;
          border: 1px solid rgba(99, 102, 241, 0.3);
        }

        .landing__subject-code--android {
          background: rgba(16, 185, 129, 0.12);
          color: #34d399;
          border: 1px solid rgba(16, 185, 129, 0.3);
        }

        .landing__count-badge {
          font-family: ui-monospace, SFMono-Regular, monospace;
          font-size: 11px;
          font-weight: 500;
          color: var(--muted);
        }

        .landing__subject-info h3 {
          margin: 0;
          font-size: 16px;
          font-weight: 700;
          color: var(--text);
        }

        .landing__subject-info p {
          margin: 6px 0 0 0;
          font-size: 13px;
          line-height: 1.55;
          color: var(--muted);
        }

        .landing__card-footer {
          margin-top: 20px;
          padding-top: 12px;
          border-top: 1px solid var(--border);
        }

        .landing__card-link {
          font-family: ui-monospace, SFMono-Regular, monospace;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .landing__card-link--php {
          color: #6366f1;
        }

        .landing__card-link--android {
          color: #10b981;
        }

        .landing__cta {
          margin-top: 36px;
        }

        /* Mobile Responsive */
        @media (max-width: 640px) {
          .landing__header-inner {
            width: calc(100% - 24px);
          }

          .landing__tagline {
            display: none;
          }

          .landing__main {
            padding: 36px 16px 60px;
          }

          .landing__subjects {
            grid-template-columns: 1fr;
            gap: 12px;
          }
        }
      `}</style>
    </div>
  );
}

export default Landing;