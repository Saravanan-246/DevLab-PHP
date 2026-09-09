import React from "react";

function ProgramCard({
  program = {},
  theme = "dark",
  onOpen,
  className = "",
}) {
  const {
    id,
    number = "01",
    title = "",
    shortDescription = "",
    category = "PHP",
  } = program;

  const handleClick = () => {
    if (typeof onOpen === "function" && id !== undefined) {
      onOpen(id);
    }
  };

  const isAndroid = String(category).toUpperCase() === "ANDROID";
  const isLight = theme === "light";

  return (
    <div
      className={`program-card ${
        isLight ? "program-card--light" : "program-card--dark"
      } ${className}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      <div className="program-card__header">
        <span className="program-card__number">#{number}</span>
        <span
          className={`program-card__badge ${
            isAndroid ? "program-card__badge--android" : ""
          }`}
        >
          {category}
        </span>
      </div>

      <div className="program-card__body">
        <h3 className="program-card__title">{title}</h3>
        <p className="program-card__description">{shortDescription}</p>
      </div>

      <div className="program-card__footer">
        <span className="program-card__link">
          View practical
          <svg
            className="program-card__arrow"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </span>
      </div>

      <style>{`
        /* Dynamic Scoped Theme System */
        .program-card--dark {
          --pc-bg: var(--surface, #111720);
          --pc-border: var(--border, #1e293b);
          --pc-border-hover: var(--border-strong, #334155);
          --pc-text: var(--text, #f1f5f9);
          --pc-muted: var(--muted, #94a3b8);
          --pc-accent: var(--accent, #0284c7);
          --pc-badge-php-text: #38bdf8;
          --pc-badge-php-bg: rgba(2, 132, 199, 0.15);
          --pc-badge-android-text: #34d399;
          --pc-badge-android-bg: rgba(5, 150, 105, 0.15);
        }

        .program-card--light {
          --pc-bg: var(--surface, #ffffff);
          --pc-border: var(--border, #e2e8f0);
          --pc-border-hover: var(--border-strong, #cbd5e1);
          --pc-text: var(--text, #0f172a);
          --pc-muted: var(--muted, #64748b);
          --pc-accent: var(--accent, #0284c7);
          --pc-badge-php-text: #0284c7;
          --pc-badge-php-bg: rgba(2, 132, 199, 0.08);
          --pc-badge-android-text: #059669;
          --pc-badge-android-bg: rgba(5, 150, 105, 0.08);
        }

        .program-card {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 1.25rem;
          border: 1px solid var(--pc-border);
          border-radius: 10px;
          background-color: var(--pc-bg);
          cursor: pointer;
          outline: none;
          transition: border-color 0.15s ease, transform 0.15s ease, box-shadow 0.15s ease, background-color 0.15s ease;
          user-select: none;
        }

        .program-card:hover {
          border-color: var(--pc-border-hover);
          transform: translateY(-2px);
          box-shadow: 0 10px 20px -10px rgba(0, 0, 0, 0.1);
        }

        .program-card:focus-visible {
          border-color: var(--pc-accent);
          box-shadow: 0 0 0 2px var(--pc-accent);
        }

        .program-card__header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.85rem;
        }

        .program-card__number {
          font-family: ui-monospace, SFMono-Regular, monospace;
          font-size: 11px;
          font-weight: 700;
          color: var(--pc-accent);
        }

        .program-card__badge {
          font-family: ui-monospace, SFMono-Regular, monospace;
          font-size: 10px;
          font-weight: 700;
          color: var(--pc-badge-php-text);
          background-color: var(--pc-badge-php-bg);
          padding: 2px 7px;
          border-radius: 4px;
          text-transform: uppercase;
        }

        .program-card__badge--android {
          color: var(--pc-badge-android-text);
          background-color: var(--pc-badge-android-bg);
        }

        .program-card__body {
          flex: 1;
        }

        .program-card__title {
          margin: 0 0 0.5rem 0;
          font-size: 1.05rem;
          font-weight: 700;
          line-height: 1.35;
          color: var(--pc-text);
        }

        .program-card__description {
          margin: 0;
          font-size: 0.85rem;
          line-height: 1.5;
          color: var(--pc-muted);
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .program-card__footer {
          margin-top: 1.25rem;
          padding-top: 0.75rem;
          border-top: 1px solid var(--pc-border);
        }

        .program-card__link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.825rem;
          font-weight: 600;
          color: var(--pc-text);
          transition: color 0.15s ease;
        }

        .program-card__arrow {
          transition: transform 0.15s ease;
        }

        .program-card:hover .program-card__link {
          color: var(--pc-accent);
        }

        .program-card:hover .program-card__arrow {
          transform: translateX(3px);
        }
      `}</style>
    </div>
  );
}

export default ProgramCard;