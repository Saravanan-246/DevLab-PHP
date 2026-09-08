import React from "react";
import Button from "../components/Button";
import Logo from "../components/Logo";
import ThemeToggle from "../components/ThemeToggle";

function Landing({
  theme = "dark",
  onToggleTheme,
  onExplore,
  className = "",
}) {
  return (
    <div className={`landing ${className}`}>
      {/* Header bar */}
      <header className="landing__header">
        <div className="landing__header-inner">
          <div className="landing__brand">
            <Logo />
            <span className="landing__tagline">PHP & MySQL Practical Lab</span>
          </div>

          <div className="landing__actions">
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
            <Button variant="secondary" size="sm" onClick={onExplore}>
              Explore lab
            </Button>
          </div>
        </div>
      </header>

      {/* Main hero section */}
      <main className="landing__main">
        <div className="landing__hero">
          <div className="landing__badge">Academic workspace</div>

          <h1 className="landing__title">
            PHP & MySQL practical guide for web development
          </h1>

          <p className="landing__description">
            Access structured practicals, source codes, expected outputs,
            and exam tips for your college curriculum.
          </p>

          <div className="landing__cta">
            <Button variant="primary" size="lg" onClick={onExplore}>
              Browse all practicals
            </Button>
          </div>

          {/* Quick stats grid */}
          <div className="landing__stats">
            <div className="landing__stat-item">
              <span className="landing__stat-value">12</span>
              <span className="landing__stat-label">Core practicals</span>
            </div>
            <div className="landing__stat-divider" />
            <div className="landing__stat-item">
              <span className="landing__stat-value">PHP</span>
              <span className="landing__stat-label">Server programming</span>
            </div>
            <div className="landing__stat-divider" />
            <div className="landing__stat-item">
              <span className="landing__stat-value">MySQL</span>
              <span className="landing__stat-label">Database queries</span>
            </div>
          </div>
        </div>
      </main>

      <style>{`
        .landing {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: var(--bg, #0d0f12);
          color: var(--text, #f0f4f8);
        }

        .landing__header {
          position: sticky;
          top: 0;
          z-index: 50;
          width: 100%;
          border-bottom: 1px solid var(--border, #1e2631);
          background: var(--bg, #0d0f12);
        }

        .landing__header-inner {
          width: min(1160px, calc(100% - 32px));
          height: 64px;
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
          color: var(--muted, #94a3b8);
          padding-left: 12px;
          border-left: 1px solid var(--border, #1e2631);
        }

        .landing__actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .landing__main {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 60px 16px 80px;
        }

        .landing__hero {
          max-width: 720px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .landing__badge {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 6px;
          border: 1px solid var(--border, #1e2631);
          background: var(--surface-soft, #161b24);
          color: var(--accent, #3b82f6);
          font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
          font-size: 11px;
          font-weight: 500;
          margin-bottom: 20px;
        }

        .landing__title {
          margin: 0;
          font-size: clamp(32px, 5.5vw, 52px);
          font-weight: 800;
          line-height: 1.15;
          letter-spacing: -0.03em;
          color: var(--text, #f0f4f8);
        }

        .landing__description {
          margin: 20px 0 0 0;
          max-width: 540px;
          font-size: 16px;
          line-height: 1.6;
          color: var(--muted, #94a3b8);
        }

        .landing__cta {
          margin-top: 32px;
        }

        .landing__stats {
          margin-top: 60px;
          padding: 20px 32px;
          display: flex;
          align-items: center;
          gap: 24px;
          border: 1px solid var(--border, #1e2631);
          border-radius: 12px;
          background: var(--surface, #11151c);
        }

        .landing__stat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .landing__stat-value {
          font-size: 20px;
          font-weight: 700;
          color: var(--accent, #3b82f6);
        }

        .landing__stat-label {
          font-size: 11px;
          color: var(--muted, #94a3b8);
          margin-top: 2px;
        }

        .landing__stat-divider {
          width: 1px;
          height: 24px;
          background: var(--border, #1e2631);
        }

        @media (max-width: 600px) {
          .landing__tagline {
            display: none;
          }

          .landing__stats {
            flex-direction: column;
            gap: 16px;
            width: 100%;
            padding: 20px;
          }

          .landing__stat-divider {
            width: 100%;
            height: 1px;
          }
        }
      `}</style>
    </div>
  );
}

export default Landing;