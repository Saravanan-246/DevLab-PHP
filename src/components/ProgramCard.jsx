import React from "react";

function ProgramCard({
  program = {},
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

  return (
    <div
      className={`program-card ${className}`}
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
        <span className="program-card__badge">{category}</span>
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
        .program-card {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 20px;
          border: 1px solid var(--border, #1e2631);
          border-radius: 12px;
          background: var(--surface, #11151c);
          cursor: pointer;
          outline: none;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          user-select: none;
        }

        .program-card:hover {
          border-color: var(--accent, #3b82f6);
          background: var(--surface-soft, #161b24);
          transform: translateY(-2px);
          box-shadow: 0 8px 20px -6px rgba(0, 0, 0, 0.3);
        }

        .program-card:focus-visible {
          box-shadow: 0 0 0 2px var(--bg, #0d0f12), 0 0 0 4px var(--accent, #3b82f6);
        }

        .program-card__header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
        }

        .program-card__number {
          font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
          font-size: 12px;
          font-weight: 600;
          color: var(--accent, #3b82f6);
        }

        .program-card__badge {
          font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
          font-size: 10px;
          font-weight: 500;
          color: var(--muted, #94a3b8);
          background: var(--surface-soft, #1a202c);
          padding: 3px 8px;
          border-radius: 4px;
          border: 1px solid var(--border, #1e2631);
        }

        .program-card__body {
          flex: 1;
        }

        .program-card__title {
          margin: 0 0 8px 0;
          font-size: 16px;
          font-weight: 600;
          line-height: 1.35;
          color: var(--text, #f0f4f8);
        }

        .program-card__description {
          margin: 0;
          font-size: 13px;
          line-height: 1.6;
          color: var(--muted, #94a3b8);
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .program-card__footer {
          margin-top: 18px;
          padding-top: 14px;
          border-top: 1px solid var(--border, #1e2631);
        }

        .program-card__link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          font-weight: 500;
          color: var(--text, #f0f4f8);
          transition: color 0.15s ease;
        }

        .program-card__arrow {
          transition: transform 0.2s ease;
        }

        .program-card:hover .program-card__link {
          color: var(--accent, #3b82f6);
        }

        .program-card:hover .program-card__arrow {
          transform: translateX(3px);
        }
      `}</style>
    </div>
  );
}

export default ProgramCard;