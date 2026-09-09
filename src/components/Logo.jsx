import React from "react";

function Logo({ compact = false, className = "" }) {
  return (
    <div className={`app-logo ${compact ? "app-logo--compact" : ""} ${className}`}>
      <div className="app-logo__icon" aria-hidden="true">
        <span>&lt;/&gt;</span>
      </div>
      
      {!compact && (
        <span className="app-logo__text">
          CS<strong>Lab</strong>
        </span>
      )}

      <style>{`
        .app-logo {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          user-select: none;
        }

        .app-logo__icon {
          display: grid;
          place-items: center;
          width: 32px;
          height: 32px;
          border-radius: 6px;
          background: var(--accent-blue, #0284c7);
          color: #ffffff;
          font-family: ui-monospace, SFMono-Regular, monospace;
          font-size: 13px;
          font-weight: 800;
          flex-shrink: 0;
        }

        .app-logo__text {
          font-size: 16px;
          font-weight: 600;
          letter-spacing: -0.02em;
          color: var(--text, #f1f5f9);
        }

        .app-logo__text strong {
          color: var(--accent-blue, #0284c7);
          font-weight: 800;
        }

        .app-logo--compact .app-logo__icon {
          width: 28px;
          height: 28px;
          font-size: 11px;
        }
      `}</style>
    </div>
  );
}

export default Logo;