import React from "react";

function ThemeToggle({
  theme = "dark",
  onToggle,
  className = "",
}) {
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={onToggle}
      className={`theme-toggle ${className}`}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {isDark ? (
        <svg
          className="theme-toggle__icon"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ) : (
        <svg
          className="theme-toggle__icon"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}

      <style>{`
        .theme-toggle {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 34px;
          height: 34px;
          border-radius: var(--radius-md, 6px);
          border: 1px solid var(--border);
          background: var(--surface);
          color: var(--muted);
          cursor: pointer;
          outline: none;
          transition: background-color 0.15s ease, border-color 0.15s ease, color 0.15s ease;
        }

        .theme-toggle:hover {
          border-color: var(--border-strong);
          color: var(--text);
          background: var(--surface-soft);
        }

        .theme-toggle:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 2px;
        }

        .theme-toggle__icon {
          transition: transform 0.2s ease;
        }

        .theme-toggle:hover .theme-toggle__icon {
          transform: rotate(15deg);
        }
      `}</style>
    </button>
  );
}

export default ThemeToggle;