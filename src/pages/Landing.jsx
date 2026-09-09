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
    <div className={`landing ${isLight ? "landing--light" : "landing--dark"} ${className}`}>
      {/* Background Ambient Glow */}
      <div className="landing__glow" aria-hidden="true" />

      {/* Navigation Header */}
      <header className="landing__header">
        <div className="landing__header-inner">
          <div className="landing__brand">
            <Logo />
            <span className="landing__brand-divider">/</span>
            <span className="landing__brand-title">CS Workspace</span>
          </div>

          <nav className="landing__nav-pills" aria-label="Main Navigation">
            <button
              type="button"
              className="landing__pill landing__pill--active"
              onClick={() => onExplore("ALL")}
            >
              Overview
            </button>
            <button
              type="button"
              className="landing__pill"
              onClick={() => onExplore("PHP")}
            >
              PHP &amp; MySQL
            </button>
            <button
              type="button"
              className="landing__pill"
              onClick={() => onExplore("ANDROID")}
            >
              Android
            </button>
          </nav>

          <div className="landing__header-actions">
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="landing__main">
        {/* Hero Section */}
        <section className="landing__hero">
          <div className="landing__badge">
            <span className="landing__badge-dot" />
            CS CURRICULUM REFERENCE 2026
          </div>

          <h1 className="landing__title">
            Some Scripts <br />
            <span className="landing__title-gradient">Never Die.</span>
          </h1>

          <p className="landing__lead">
            A high-performance workspace engineered for algorithms, practical source code, expected outputs, and exam-ready guidance.
          </p>

          <div className="landing__cta-wrapper">
            <Button
              variant="primary"
              size="lg"
              onClick={() => onExplore("ALL")}
              className="landing__cta-btn"
            >
              Browse All 21 Practicals <span className="cta-arrow">→</span>
            </Button>
          </div>
        </section>

        {/* Clean Stage Window */}
        <div className="landing__stage">
          <div className="landing__window">
            <div className="landing__window-header">
              <span className="landing__window-title">workspace_preview.png</span>
            </div>
            <div className="landing__window-body">
              <img
                src={heroImage}
                alt="CS Practice Workspace Showcase"
                className="landing__window-img"
              />
            </div>
          </div>
        </div>

        {/* Learning Tracks */}
        <section className="landing__tracks">
          <div
            className="track-card"
            onClick={() => onExplore("PHP")}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onExplore("PHP")}
          >
            <div className="track-card__top">
              <div className="track-card__header">
                <span className="track-card__tag tag--php">PHP &amp; MySQL</span>
                <span className="track-card__count">12 Practicals</span>
              </div>
              <h2 className="track-card__title">PHP &amp; MySQL Workspace</h2>
              <p className="track-card__desc">
                Form validation, dynamic SQL operations, session control, and backend file handling algorithms.
              </p>
            </div>
            <div className="track-card__footer">
              <span>Explore PHP Track</span>
              <span className="track-card__arrow">→</span>
            </div>
          </div>

          <div
            className="track-card"
            onClick={() => onExplore("ANDROID")}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onExplore("ANDROID")}
          >
            <div className="track-card__top">
              <div className="track-card__header">
                <span className="track-card__tag tag--android">Android Dev</span>
                <span className="track-card__count">9 Practicals</span>
              </div>
              <h2 className="track-card__title">Android Development</h2>
              <p className="track-card__desc">
                Java layout architectures, SQLite persistence, background services, and intent operations.
              </p>
            </div>
            <div className="track-card__footer">
              <span>Explore Android Track</span>
              <span className="track-card__arrow">→</span>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="landing__stats" aria-label="Workspace Highlights">
          <div className="stat-item">
            <strong>21 Modules</strong>
            <span>Verified Practical Code</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <strong>Step-by-Step</strong>
            <span>Algorithms &amp; Logic</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <strong>Exam Ready</strong>
            <span>Outputs &amp; Flow Guidance</span>
          </div>
        </section>
      </main>

      <style>{`
        /* Design Tokens */
        .landing--dark {
          --l-bg: #090a0f;
          --l-surface: #12151e;
          --l-surface-soft: #1a1e2b;
          --l-border: rgba(255, 255, 255, 0.08);
          --l-border-strong: rgba(255, 255, 255, 0.16);
          --l-text: #f8fafc;
          --l-muted: #94a3b8;
          --l-accent: #38bdf8;
          --l-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.6);
        }

        .landing--light {
          --l-bg: #f8fafc;
          --l-surface: #ffffff;
          --l-surface-soft: #f1f5f9;
          --l-border: #e2e8f0;
          --l-border-strong: #cbd5e1;
          --l-text: #0f172a;
          --l-muted: #64748b;
          --l-accent: #0284c7;
          --l-shadow: 0 20px 40px -15px rgba(15, 23, 42, 0.08);
        }

        .landing {
          min-height: 100vh;
          background-color: var(--l-bg);
          color: var(--l-text);
          font-family: 'Google Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          position: relative;
          isolation: isolate;
          transition: background-color 0.25s ease, color 0.25s ease;
        }

        .landing__glow {
          position: absolute;
          top: -100px;
          left: 50%;
          transform: translateX(-50%);
          width: 800px;
          height: 400px;
          background: radial-gradient(ellipse at center, rgba(56, 189, 248, 0.08) 0%, transparent 70%);
          pointer-events: none;
          z-index: -1;
        }

        /* Navigation Header */
        .landing__header {
          padding: 0.75rem 1.5rem;
          background: var(--l-surface);
          border-bottom: 1px solid var(--l-border);
          position: sticky;
          top: 0;
          z-index: 50;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        .landing__header-inner {
          max-width: 1080px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .landing__brand {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .landing__brand-divider {
          color: var(--l-muted);
          opacity: 0.3;
        }

        .landing__brand-title {
          font-size: 13px;
          font-weight: 600;
          color: var(--l-text);
          letter-spacing: -0.01em;
        }

        .landing__nav-pills {
          display: flex;
          gap: 2px;
          background: var(--l-surface-soft);
          padding: 3px;
          border-radius: 99px;
          border: 1px solid var(--l-border);
        }

        .landing__pill {
          background: transparent;
          border: none;
          color: var(--l-muted);
          padding: 5px 14px;
          border-radius: 99px;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .landing__pill:hover {
          color: var(--l-text);
        }

        .landing__pill--active {
          color: #ffffff;
          background: var(--l-accent);
          font-weight: 600;
        }

        /* Main Container */
        .landing__main {
          max-width: 1080px;
          margin: 0 auto;
          padding: 3.5rem 1.5rem 5rem;
          display: flex;
          flex-direction: column;
          gap: 3.5rem;
        }

        /* Hero */
        .landing__hero {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .landing__badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.04em;
          color: var(--l-accent);
          background: var(--l-surface-soft);
          border: 1px solid var(--l-border);
          padding: 4px 12px;
          border-radius: 99px;
          margin-bottom: 1.25rem;
        }

        .landing__badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: var(--l-accent);
        }

        .landing__title {
          font-size: clamp(2.25rem, 5vw, 3.5rem);
          font-weight: 800;
          line-height: 1.1;
          margin: 0 0 1rem;
          color: var(--l-text);
          letter-spacing: -0.03em;
        }

        .landing__title-gradient {
          color: var(--l-accent);
        }

        .landing__lead {
          font-size: 1.05rem;
          line-height: 1.6;
          color: var(--l-muted);
          max-width: 580px;
          margin: 0 0 1.75rem;
        }

        .landing__cta-wrapper {
          display: flex;
          justify-content: center;
        }

        .landing__cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-weight: 600;
        }

        .cta-arrow {
          transition: transform 0.2s ease;
        }

        .landing__cta-btn:hover .cta-arrow {
          transform: translateX(4px);
        }

        /* Stage Window Showcase */
        .landing__stage {
          display: flex;
          justify-content: center;
        }

        .landing__window {
          width: 100%;
          max-width: 900px;
          background: var(--l-surface);
          border: 1px solid var(--l-border-strong);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: var(--l-shadow);
        }

        .landing__window-header {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8px 16px;
          background: var(--l-surface-soft);
          border-bottom: 1px solid var(--l-border);
        }

        .landing__window-title {
          font-family: monospace;
          font-size: 11px;
          color: var(--l-muted);
          letter-spacing: 0.02em;
        }

        .landing__window-body {
          width: 100%;
          background: var(--l-bg);
          overflow: hidden;
        }

        .landing__window-img {
          width: 100%;
          height: auto;
          display: block;
          object-fit: cover;
        }

        /* Track Cards */
        .landing__tracks {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        .track-card {
          background: var(--l-surface);
          border: 1px solid var(--l-border);
          border-radius: 12px;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          cursor: pointer;
          outline: none;
          transition: border-color 0.2s ease, transform 0.2s ease;
        }

        .track-card:hover {
          border-color: var(--l-border-strong);
          transform: translateY(-2px);
        }

        .track-card:focus-visible {
          border-color: var(--l-accent);
        }

        .track-card__header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.85rem;
        }

        .track-card__tag {
          font-family: monospace;
          font-size: 10px;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 4px;
          text-transform: uppercase;
        }

        .tag--php {
          background: rgba(56, 189, 248, 0.12);
          color: var(--l-accent);
        }

        .tag--android {
          background: rgba(34, 197, 94, 0.12);
          color: #22c55e;
        }

        .track-card__count {
          font-family: monospace;
          font-size: 11px;
          color: var(--l-muted);
        }

        .track-card__title {
          font-size: 1.2rem;
          font-weight: 700;
          margin: 0 0 0.5rem;
          color: var(--l-text);
        }

        .track-card__desc {
          font-size: 0.875rem;
          line-height: 1.55;
          color: var(--l-muted);
          margin: 0;
        }

        .track-card__footer {
          margin-top: 1.5rem;
          padding-top: 1rem;
          border-top: 1px solid var(--l-border);
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 13.5px;
          font-weight: 600;
          color: var(--l-accent);
        }

        .track-card__arrow {
          transition: transform 0.2s ease;
        }

        .track-card:hover .track-card__arrow {
          transform: translateX(4px);
        }

        /* Stats Highlights */
        .landing__stats {
          display: flex;
          align-items: center;
          justify-content: space-around;
          background: var(--l-surface);
          border: 1px solid var(--l-border);
          border-radius: 12px;
          padding: 1.25rem;
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
        }

        .stat-item strong {
          font-size: 1rem;
          font-weight: 700;
          color: var(--l-text);
        }

        .stat-item span {
          font-size: 0.8rem;
          color: var(--l-muted);
        }

        .stat-divider {
          width: 1px;
          height: 24px;
          background: var(--l-border);
        }

        /* Mobile Breakpoints */
        @media (max-width: 768px) {
          .landing__nav-pills {
            display: none;
          }

          .landing__tracks {
            grid-template-columns: 1fr;
          }

          .landing__stats {
            flex-direction: column;
            gap: 1rem;
          }

          .stat-divider {
            width: 100%;
            height: 1px;
          }
        }
      `}</style>
    </div>
  );
}

export default Landing;