import React from "react";
import Button from "../components/Button";
import Logo from "../components/Logo";
import ThemeToggle from "../components/ThemeToggle";
import heroImage from "../assets/landing-hero.png";

function Landing({
  theme = "dark",
  onToggleTheme,
  onExplore,
  className = "",
}) {
  const isLight = theme === "light";

  return (
    <div
      className={`g-landing ${
        isLight ? "g-landing--light" : "g-landing--dark"
      } ${className}`}
    >
      {/* Header Navigation */}
      <header className="g-landing__header">
        <div className="g-landing__nav">
          <div className="g-landing__brand">
            <Logo />
            <span className="g-landing__brand-label">CS Workspace</span>
          </div>

          <nav className="g-landing__pills" aria-label="Main navigation">
            <button
              type="button"
              className="g-landing__pill g-landing__pill--active"
              onClick={() => onExplore("ALL")}
            >
              All Practicals
            </button>
            <button
              type="button"
              className="g-landing__pill"
              onClick={() => onExplore("PHP")}
            >
              PHP &amp; MySQL
            </button>
            <button
              type="button"
              className="g-landing__pill"
              onClick={() => onExplore("ANDROID")}
            >
              Android
            </button>
          </nav>

          <div className="g-landing__actions">
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="g-landing__main">
        {/* Hero Copy */}
        <section className="g-landing__hero">
          <div className="g-landing__hero-badge">
            <span className="g-landing__dot" />
            CS CURRICULUM REFERENCE 2026
          </div>

          <h1 className="g-landing__title">
            Structured reference for <br />
            <span className="g-landing__title-gradient">lab algorithms &amp; code.</span>
          </h1>

          <p className="g-landing__lead">
            Exam-ready guidance, step-by-step algorithms, expected outputs, and complete source files in a distraction-free workspace.
          </p>

          <div className="g-landing__cta-bar">
            <Button
              variant="primary"
              size="lg"
              onClick={() => onExplore("ALL")}
            >
              Explore All Practicals →
            </Button>
          </div>
        </section>

        {/* Centered Media Frame */}
        <div className="g-landing__preview-container">
          <div className="g-landing__preview-card">
            <div className="g-landing__preview-header">
              <div className="g-landing__window-dots">
                <span />
                <span />
                <span />
              </div>
              <span className="g-landing__window-title">workspace_preview.png</span>
            </div>
            <div className="g-landing__image-wrapper">
              <img
                src={heroImage}
                alt="CS Practice Workspace Showcase"
                className="g-landing__preview-img"
              />
            </div>
          </div>
        </div>

        {/* Track Selection Grid */}
        <section className="g-landing__grid">
          <div
            className="g-card"
            onClick={() => onExplore("PHP")}
            role="button"
            tabIndex={0}
          >
            <div className="g-card__header">
              <span className="g-card__badge g-card__badge--php">PHP &amp; MySQL</span>
              <span className="g-card__meta">12 Practicals</span>
            </div>
            <div className="g-card__body">
              <h2>PHP &amp; MySQL Workspace</h2>
              <p>Form processing, database queries, session tracking, and file handling.</p>
            </div>
            <div className="g-card__footer">
              <span>Explore Track</span>
              <span className="g-card__arrow">→</span>
            </div>
          </div>

          <div
            className="g-card"
            onClick={() => onExplore("ANDROID")}
            role="button"
            tabIndex={0}
          >
            <div className="g-card__header">
              <span className="g-card__badge g-card__badge--android">Android Dev</span>
              <span className="g-card__meta">9 Practicals</span>
            </div>
            <div className="g-card__body">
              <h2>Android Development</h2>
              <p>Java layouts, SQLite storage, background services, and intent handlers.</p>
            </div>
            <div className="g-card__footer">
              <span>Explore Track</span>
              <span className="g-card__arrow">→</span>
            </div>
          </div>
        </section>

        {/* Minimal Metrics Bar */}
        <section className="g-landing__metrics" aria-label="Workspace Metrics">
          <div className="g-landing__metric-item">
            <strong>21 Modules</strong>
            <span>Verified Source Code</span>
          </div>
          <div className="g-landing__metric-sep" />
          <div className="g-landing__metric-item">
            <strong>Exam Ready</strong>
            <span>Outputs &amp; Algorithms</span>
          </div>
          <div className="g-landing__metric-sep" />
          <div className="g-landing__metric-item">
            <strong>One Click</strong>
            <span>Copy Code Snippets</span>
          </div>
        </section>
      </main>

      <style>{`
        /* Scoped Color System */
        .g-landing--dark {
          --g-bg: #0b0f17;
          --g-surface: #131924;
          --g-surface-soft: #1c2433;
          --g-border: #1e293b;
          --g-border-strong: #334155;
          --g-text: #f3f4f6;
          --g-muted: #9ca3af;
          --g-accent: #38bdf8;
        }

        .g-landing--light {
          --g-bg: #f8fafc;
          --g-surface: #ffffff;
          --g-surface-soft: #f1f5f9;
          --g-border: #e2e8f0;
          --g-border-strong: #cbd5e1;
          --g-text: #0f172a;
          --g-muted: #64748b;
          --g-accent: #0284c7;
        }

        .g-landing {
          min-height: 100vh;
          background-color: var(--g-bg);
          color: var(--g-text);
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          transition: background-color 0.2s ease, color 0.2s ease;
        }

        /* Header Navigation */
        .g-landing__header {
          padding: 0.85rem 1.5rem;
          border-bottom: 1px solid var(--g-border);
          background: var(--g-surface);
          position: sticky;
          top: 0;
          z-index: 40;
        }

        .g-landing__nav {
          max-width: 1040px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .g-landing__brand {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .g-landing__brand-label {
          font-size: 13px;
          font-weight: 700;
          color: var(--g-text);
        }

        .g-landing__pills {
          display: flex;
          align-items: center;
          gap: 4px;
          background: var(--g-surface-soft);
          padding: 4px;
          border-radius: 99px;
          border: 1px solid var(--g-border);
        }

        .g-landing__pill {
          background: transparent;
          border: none;
          color: var(--g-muted);
          padding: 5px 14px;
          border-radius: 99px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .g-landing__pill--active,
        .g-landing__pill:hover {
          color: var(--g-text);
          background: var(--g-surface);
        }

        /* Main Workspace Container */
        .g-landing__main {
          max-width: 1040px;
          margin: 0 auto;
          padding: 3rem 1.5rem 5rem;
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
        }

        /* Hero Copy */
        .g-landing__hero {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .g-landing__hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--g-surface-soft);
          border: 1px solid var(--g-border);
          padding: 4px 12px;
          border-radius: 99px;
          font-family: ui-monospace, SFMono-Regular, monospace;
          font-size: 11px;
          font-weight: 700;
          color: var(--g-accent);
          margin-bottom: 1.25rem;
        }

        .g-landing__dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: var(--g-accent);
        }

        .g-landing__title {
          font-size: clamp(2rem, 4.5vw, 3.25rem);
          font-weight: 800;
          line-height: 1.15;
          margin: 0 0 1rem;
          color: var(--g-text);
          letter-spacing: -0.02em;
        }

        .g-landing__title-gradient {
          color: var(--g-accent);
        }

        .g-landing__lead {
          font-size: 1.05rem;
          line-height: 1.6;
          color: var(--g-muted);
          max-width: 580px;
          margin: 0 0 1.75rem;
        }

        .g-landing__cta-bar {
          display: flex;
          justify-content: center;
        }

        /* Centered Image Showcase */
        .g-landing__preview-container {
          width: 100%;
          display: flex;
          justify-content: center;
        }

        .g-landing__preview-card {
          width: 100%;
          max-width: 860px;
          background: var(--g-surface);
          border: 1px solid var(--g-border-strong);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 12px 24px -8px rgba(0, 0, 0, 0.15);
        }

        .g-landing__preview-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 14px;
          background: var(--g-surface-soft);
          border-bottom: 1px solid var(--g-border);
        }

        .g-landing__window-dots {
          display: flex;
          gap: 6px;
        }

        .g-landing__window-dots span {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--g-border-strong);
        }

        .g-landing__window-title {
          font-family: ui-monospace, SFMono-Regular, monospace;
          font-size: 11px;
          color: var(--g-muted);
        }

        .g-landing__image-wrapper {
          width: 100%;
          overflow: hidden;
        }

        .g-landing__preview-img {
          width: 100%;
          height: auto;
          display: block;
          object-fit: cover;
        }

        /* Cards Grid */
        .g-landing__grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        .g-card {
          background: var(--g-surface);
          border: 1px solid var(--g-border);
          border-radius: 12px;
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          cursor: pointer;
          transition: border-color 0.15s ease, transform 0.15s ease;
        }

        .g-card:hover {
          border-color: var(--g-border-strong);
          transform: translateY(-2px);
        }

        .g-card__header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.85rem;
        }

        .g-card__badge {
          font-family: ui-monospace, SFMono-Regular, monospace;
          font-size: 10px;
          font-weight: 700;
          padding: 2px 7px;
          border-radius: 4px;
          text-transform: uppercase;
        }

        .g-card__badge--php {
          background: rgba(2, 132, 199, 0.12);
          color: #0284c7;
        }

        .g-card__badge--android {
          background: rgba(5, 150, 105, 0.12);
          color: #059669;
        }

        .g-card__meta {
          font-family: ui-monospace, SFMono-Regular, monospace;
          font-size: 11px;
          color: var(--g-muted);
        }

        .g-card__body h2 {
          font-size: 1.15rem;
          font-weight: 700;
          margin: 0 0 0.4rem;
          color: var(--g-text);
        }

        .g-card__body p {
          font-size: 0.875rem;
          line-height: 1.5;
          color: var(--g-muted);
          margin: 0;
        }

        .g-card__footer {
          margin-top: 1.25rem;
          padding-top: 0.75rem;
          border-top: 1px solid var(--g-border);
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 13px;
          font-weight: 600;
          color: var(--g-text);
        }

        .g-card__arrow {
          transition: transform 0.15s ease;
        }

        .g-card:hover .g-card__arrow {
          transform: translateX(3px);
        }

        /* Metrics Bar */
        .g-landing__metrics {
          display: flex;
          align-items: center;
          justify-content: space-around;
          background: var(--g-surface);
          border: 1px solid var(--g-border);
          border-radius: 10px;
          padding: 1.25rem;
        }

        .g-landing__metric-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
        }

        .g-landing__metric-item strong {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--g-text);
        }

        .g-landing__metric-item span {
          font-size: 0.8rem;
          color: var(--g-muted);
        }

        .g-landing__metric-sep {
          width: 1px;
          height: 24px;
          background: var(--g-border);
        }

        /* Mobile Adjustments */
        @media (max-width: 768px) {
          .g-landing__pills {
            display: none;
          }

          .g-landing__grid {
            grid-template-columns: 1fr;
          }

          .g-landing__metrics {
            flex-direction: column;
            gap: 1rem;
          }

          .g-landing__metric-sep {
            width: 100%;
            height: 1px;
          }
        }
      `}</style>
    </div>
  );
}

export default Landing;