import React from "react";

function SectionHeading({
  title = "",
  description = "",
  badge = "",
  align = "left",
  className = "",
}) {
  return (
    <div
      className={`section-heading section-heading--${align} ${className}`}
    >
      {badge && <span className="section-heading__badge">{badge}</span>}

      {title && <h2 className="section-heading__title">{title}</h2>}

      {description && (
        <p className="section-heading__description">{description}</p>
      )}

      <style>{`
        .section-heading {
          margin-bottom: 28px;
        }

        .section-heading--center {
          text-align: center;
        }

        .section-heading--center .section-heading__description {
          margin-left: auto;
          margin-right: auto;
        }

        .section-heading__badge {
          display: inline-block;
          margin-bottom: 8px;
          padding: 3px 10px;
          border-radius: 6px;
          border: 1px solid var(--border, #1e2631);
          background: var(--surface-soft, #161b24);
          color: var(--accent, #3b82f6);
          font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
          font-size: 11px;
          font-weight: 500;
        }

        .section-heading__title {
          margin: 0;
          font-size: clamp(22px, 3.5vw, 30px);
          font-weight: 700;
          line-height: 1.25;
          letter-spacing: -0.02em;
          color: var(--text, #f0f4f8);
        }

        .section-heading__description {
          margin: 10px 0 0 0;
          max-width: 580px;
          font-size: 14px;
          line-height: 1.6;
          color: var(--muted, #94a3b8);
        }
      `}</style>
    </div>
  );
}

export default SectionHeading;