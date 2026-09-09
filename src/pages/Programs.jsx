import React, { useState, useMemo, useEffect, useRef } from "react";
import ProgramCard from "../components/ProgramCard";
import SectionHeading from "../components/SectionHeading";

function Programs({
  programs = [],
  initialCategory = "PHP",
  theme = "dark",
  onOpenProgram,
  onClose,
  className = "",
}) {
  const [selectedCategory, setSelectedCategory] = useState(
    initialCategory === "ANDROID" ? "ANDROID" : "PHP"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef(null);

  const isLight = theme === "light";

  useEffect(() => {
    if (initialCategory === "ANDROID" || initialCategory === "PHP") {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  // Keyboard shortcut listener ('/' or 'Cmd+K' to focus search)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        (e.key === "/" || (e.metaKey && e.key === "k")) &&
        document.activeElement !== searchInputRef.current
      ) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const categories = ["PHP", "ANDROID"];

  // Count available programs per category
  const categoryCounts = useMemo(() => {
    const counts = { PHP: 0, ANDROID: 0 };
    programs.forEach((p) => {
      const cat = p.category?.toUpperCase();
      if (cat === "PHP" || cat === "MYSQL") counts.PHP++;
      else if (cat === "ANDROID") counts.ANDROID++;
    });
    return counts;
  }, [programs]);

  // Filtered practicals logic
  const filteredPrograms = useMemo(() => {
    return programs.filter((program) => {
      const progCat = program.category?.toUpperCase();

      const matchesCategory =
        selectedCategory === "PHP"
          ? progCat === "PHP" || progCat === "MYSQL"
          : progCat === "ANDROID";

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        program.title?.toLowerCase().includes(query) ||
        program.shortDescription?.toLowerCase().includes(query) ||
        String(program.number).includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [programs, selectedCategory, searchQuery]);

  return (
    <div
      className={`programs-page ${
        isLight ? "programs-page--light" : "programs-page--dark"
      } ${className}`}
    >
      <main className="programs-page__main">
        <div className="programs-page__container">
          {/* Top Bar with Back Button */}
          <div className="programs-page__nav-bar">
            {onClose && (
              <button
                type="button"
                className="programs-page__back-btn"
                onClick={onClose}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
                <span>Back to Home</span>
              </button>
            )}
          </div>

          <SectionHeading
            badge="Practical Reference"
            title="Lab Practicals"
            description="Select a module to view algorithms, source code, and expected outputs."
          />

          {/* Controls: Category Tabs & Search Bar */}
          <div className="programs-page__toolbar">
            <div className="programs-page__categories">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                const count = categoryCounts[cat] || 0;
                return (
                  <button
                    key={cat}
                    type="button"
                    className={`programs-page__category-btn programs-page__category-btn--${cat.toLowerCase()} ${
                      isActive ? "programs-page__category-btn--active" : ""
                    }`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    <span className="programs-page__category-dot" />
                    <span>{cat === "PHP" ? "PHP & MySQL" : "Android"}</span>
                    <span className="programs-page__category-badge">
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="programs-page__search-box">
              <svg
                className="programs-page__search-icon"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                ref={searchInputRef}
                type="text"
                className="programs-page__search-input"
                placeholder="Search modules... (/)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery ? (
                <button
                  type="button"
                  className="programs-page__clear-btn"
                  onClick={() => setSearchQuery("")}
                  title="Clear search"
                >
                  ✕
                </button>
              ) : (
                <kbd className="programs-page__search-kbd">/</kbd>
              )}
            </div>
          </div>

          {/* Practical Item Counter Bar */}
          <div className="programs-page__meta-bar">
            <span className="programs-page__meta-count">
              Showing <strong>{filteredPrograms.length}</strong>{" "}
              {selectedCategory === "PHP" ? "PHP & MySQL" : "Android"} module
              {filteredPrograms.length !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Practical Cards Grid */}
          {filteredPrograms.length > 0 ? (
            <div className="programs-page__grid">
              {filteredPrograms.map((program) => (
                <ProgramCard
                  key={program.id}
                  program={program}
                  theme={theme}
                  onOpen={onOpenProgram}
                />
              ))}
            </div>
          ) : (
            <div className="programs-page__empty">
              <svg
                className="programs-page__empty-icon"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <h3>No Modules Match Your Search</h3>
              <p>
                No practical found matching "<strong>{searchQuery}</strong>" in{" "}
                {selectedCategory === "PHP" ? "PHP & MySQL" : "Android"}.
              </p>
              <button
                type="button"
                className="programs-page__reset-btn"
                onClick={() => setSearchQuery("")}
              >
                Clear Search Filter
              </button>
            </div>
          )}
        </div>
      </main>

      <style>{`
        /* --- Color Tokens & Theme Logic --- */
        .programs-page--dark {
          --p-bg: var(--bg, #090d12);
          --p-panel: var(--surface, #111720);
          --p-panel-hover: var(--surface-soft, #1a2332);
          --p-text: var(--text, #f1f5f9);
          --p-muted: var(--muted, #94a3b8);
          --p-border: var(--border, #1e293b);
          --p-border-strong: var(--border-strong, #334155);
          --p-badge-bg: rgba(255, 255, 255, 0.06);
          --p-accent-php: #0284c7;
          --p-accent-php-bg: rgba(2, 132, 199, 0.12);
          --p-accent-php-text: #f0f9ff;
          --p-accent-android: #059669;
          --p-accent-android-bg: rgba(5, 150, 105, 0.12);
          --p-accent-android-text: #ecfdf5;
        }

        .programs-page--light {
          --p-bg: var(--bg, #f8fafc);
          --p-panel: var(--surface, #ffffff);
          --p-panel-hover: var(--surface-soft, #f1f5f9);
          --p-text: var(--text, #0f172a);
          --p-muted: var(--muted, #64748b);
          --p-border: var(--border, #e2e8f0);
          --p-border-strong: var(--border-strong, #cbd5e1);
          --p-badge-bg: rgba(0, 0, 0, 0.05);
          --p-accent-php: #0284c7;
          --p-accent-php-bg: rgba(2, 132, 199, 0.1);
          --p-accent-php-text: #0369a1;
          --p-accent-android: #10b981;
          --p-accent-android-bg: rgba(16, 185, 129, 0.1);
          --p-accent-android-text: #047857;
        }

        .programs-page {
          min-height: 100vh;
          width: 100%;
          background-color: var(--p-bg);
          color: var(--p-text);
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          transition: background-color 0.2s ease, color 0.2s ease;
        }

        .programs-page__main {
          padding: 1.5rem 0 4rem;
        }

        .programs-page__container {
          max-width: 1180px;
          margin: 0 auto;
          padding: 0 1.25rem;
        }

        /* Top Navigation Header & Back Button */
        .programs-page__nav-bar {
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
        }

        .programs-page__back-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 12px;
          border: 1px solid var(--p-border);
          border-radius: 6px;
          background: var(--p-panel);
          color: var(--p-muted);
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .programs-page__back-btn:hover {
          color: var(--p-text);
          border-color: var(--p-border-strong);
          background: var(--p-panel-hover);
        }

        /* Controls & Filter Bar */
        .programs-page__toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          margin-top: 1.5rem;
          margin-bottom: 1.25rem;
        }

        .programs-page__categories {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .programs-page__category-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 14px;
          border: 1px solid var(--p-border);
          border-radius: 6px;
          background: var(--p-panel);
          color: var(--p-muted);
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .programs-page__category-btn:hover {
          color: var(--p-text);
          border-color: var(--p-border-strong);
        }

        .programs-page__category-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--p-muted);
          transition: transform 0.15s ease, background-color 0.15s ease;
        }

        .programs-page__category-badge {
          padding: 1px 6px;
          border-radius: 10px;
          background: var(--p-badge-bg);
          font-family: ui-monospace, SFMono-Regular, monospace;
          font-size: 10px;
          color: var(--p-muted);
        }

        .programs-page__category-btn--php.programs-page__category-btn--active {
          border-color: var(--p-accent-php);
          color: var(--p-accent-php-text);
          background: var(--p-accent-php-bg);
        }

        .programs-page__category-btn--php.programs-page__category-btn--active .programs-page__category-dot {
          background: var(--p-accent-php);
        }

        .programs-page__category-btn--android.programs-page__category-btn--active {
          border-color: var(--p-accent-android);
          color: var(--p-accent-android-text);
          background: var(--p-accent-android-bg);
        }

        .programs-page__category-btn--android.programs-page__category-btn--active .programs-page__category-dot {
          background: var(--p-accent-android);
        }

        /* Search Box */
        .programs-page__search-box {
          position: relative;
          display: flex;
          align-items: center;
          width: 280px;
        }

        .programs-page__search-icon {
          position: absolute;
          left: 12px;
          color: var(--p-muted);
          pointer-events: none;
        }

        .programs-page__search-input {
          width: 100%;
          height: 38px;
          padding: 0 32px 0 36px;
          border: 1px solid var(--p-border);
          border-radius: 6px;
          background: var(--p-panel);
          color: var(--p-text);
          font-size: 12px;
          outline: none;
          transition: border-color 0.15s ease, background-color 0.15s ease;
        }

        .programs-page__search-input:focus {
          border-color: var(--p-border-strong);
        }

        .programs-page__clear-btn {
          position: absolute;
          right: 10px;
          border: none;
          background: transparent;
          color: var(--p-muted);
          font-size: 12px;
          cursor: pointer;
        }

        .programs-page__search-kbd {
          position: absolute;
          right: 10px;
          padding: 2px 6px;
          border: 1px solid var(--p-border);
          border-radius: 4px;
          background: var(--p-badge-bg);
          font-family: ui-monospace, SFMono-Regular, monospace;
          font-size: 10px;
          color: var(--p-muted);
          pointer-events: none;
        }

        /* Meta Item Counter Bar */
        .programs-page__meta-bar {
          margin-bottom: 1.25rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid var(--p-border);
        }

        .programs-page__meta-count {
          font-size: 12px;
          color: var(--p-muted);
        }

        .programs-page__meta-count strong {
          color: var(--p-text);
        }

        /* Grid Layout */
        .programs-page__grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 16px;
        }

        /* Empty State */
        .programs-page__empty {
          text-align: center;
          padding: 4rem 1.5rem;
          border: 1px solid var(--p-border);
          border-radius: 8px;
          background: var(--p-panel);
        }

        .programs-page__empty-icon {
          color: var(--p-muted);
          margin-bottom: 1rem;
        }

        .programs-page__empty h3 {
          margin: 0 0 0.5rem;
          font-size: 1.1rem;
          font-weight: 700;
        }

        .programs-page__empty p {
          margin: 0 0 1.5rem;
          font-size: 0.875rem;
          color: var(--p-muted);
        }

        .programs-page__reset-btn {
          padding: 8px 16px;
          border: 1px solid var(--p-border-strong);
          border-radius: 6px;
          background: var(--p-panel-hover);
          color: var(--p-text);
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .programs-page__reset-btn:hover {
          border-color: var(--p-muted);
        }

        /* Responsive Breakpoints */
        @media (max-width: 640px) {
          .programs-page__toolbar {
            flex-direction: column;
            align-items: stretch;
            gap: 12px;
          }

          .programs-page__categories {
            width: 100%;
          }

          .programs-page__category-btn {
            flex: 1;
            justify-content: center;
          }

          .programs-page__search-box {
            width: 100%;
          }

          .programs-page__grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

export default Programs;