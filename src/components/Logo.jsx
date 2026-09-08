import React from "react";

function Logo({ compact = false, className = "" }) {
  return (
    <div className={`app-logo ${className}`}>
      <div className="app-logo__icon">
        <span>&lt;&gt;</span>
      </div>
      <span className="app-logo__text">
        Dev<strong>Lab</strong>
      </span>

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
          border-radius: 4px;
          background: #6366f1;
          color: #ffffff;
          font-family: ui-monospace, SFMono-Regular, monospace;
          font-size: 13px;
          font-weight: 800;
        }

        .app-logo__text {
          font-size: 16px;
          font-weight: 600;
          letter-spacing: -0.02em;
          color: var(--text, #f0f4f8);
        }

        .app-logo__text strong {
          color: #6366f1;
          font-weight: 800;
        }
      `}</style>
    </div>
  );
}

export default Logo;