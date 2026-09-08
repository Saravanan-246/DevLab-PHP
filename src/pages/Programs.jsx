import React, { useState, useMemo, useEffect, useRef } from "react";
import ProgramCard from "../components/ProgramCard";
import SectionHeading from "../components/SectionHeading";
import Logo from "../components/Logo";
import ThemeToggle from "../components/ThemeToggle";

function Programs({
  programs = [],
  initialCategory = "PHP",
  theme = "dark",
  onToggleTheme,
  onOpenProgram,
  onClose,
  className = "",
}) {
  const [selectedCategory, setSelectedCategory] = useState(
    initialCategory === "ANDROID" ? "ANDROID" : "PHP"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (initialCategory === "ANDROID" || initialCategory === "PHP") {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  // Keyboard shortcut listener ('/' or 'Cmd+K' to focus search)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.key === "/" || (e.metaKey && e.key === "k")) && document.activeElement !== searchInputRef.current) {
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
    <div className={`programs-page ${className}`}>
      {/* Header Bar with Glassmorphism */}
      <header className="programs-page__header">
        <div className="programs-page__header-inner">
          <div className="programs-page__brand">
            <Logo compact />
            <span className="programs-page__divider" />
            <span className="programs-page__context">Practical Hub</span>
          </div>

          <div className="programs-page__actions">
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
            <button
              type="button"
              className="programs-page__close-btn"
              onClick={onClose}
            >
              <span>Close</span>
              <kbd className="programs-page__kbd">Esc</kbd>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="programs-page__main">
        <div className="programs-page__container">
          <SectionHeading
            badge="Practical Directory"
            title="Lab Practicals"
            description="Select a course to view source code, algorithm steps, and output."
          />

          {/* Controls: Styled Category Tabs + Enhanced Search Bar */}
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
                    <span className="programs-page__category-badge">{count}</span>
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
                placeholder="Search practicals... (/)"
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

          {/* Grid Header Counter */}
          <div className="programs-page__meta-bar">
            <span className="programs-page__meta-count">
              Showing <strong>{filteredPrograms.length}</strong> {selectedCategory === "PHP" ? "PHP & MySQL" : "Android"} practical{filteredPrograms.length !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Grid View */}
          {filteredPrograms.length > 0 ? (
            <div className="programs-page__grid">
              {filteredPrograms.map((program) => (
                <ProgramCard
                  key={program.id}
                  program={program}
                  onOpen={onOpenProgram}
                />
              ))}
            </div>
          ) : (
            <div className="programs-page__empty">
              <div className="programs-page__empty-icon">🔍</div>
              <h3>No practicals found</h3>
              <p>
                No practical matches "<strong>{searchQuery}</strong>" in{" "}
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
        .programs-page {
          min-height: 100vh;
          width: 100%;
          overflow-x: hidden;
          background: var(--bg, #090b0e);
          color: var(--text, #f0f4f8);
          font-family: "Manrope", -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .programs-page__header {
          position: sticky;
          top: 0;
          z-index: 50;
          width: 100%;
          border-bottom: 1px solid var(--border, #1a202c);
          background: rgba(9, 11, 14, 0.82);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        .programs-page__header-inner {
          width: min(1180px, calc(100% - 32px));
          height: 60px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .programs-page__brand {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .programs-page__divider {
          width: 1px;
          height: 16px;
          background: var(--border, #1a202c);
        }

        .programs-page__context {
          font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
          font-size: 11px;
          color: var(--muted, #8a96a8);
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .programs-page__actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .programs-page__close-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          height: 34px;
          padding: 0 12px;
          border: 1px solid var(--border-strong, #2d3748);
          border-radius: 4px;
          background: var(--surface, #11151c);
          color: var(--text, #f0f4f8);
          font-size: 11px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .programs-page__close-btn:hover {
          border-color: var(--accent, #3b82f6);
          background: var(--surface-soft, #171d26);
        }

        .programs-page__kbd {
          padding: 2px 4px;
          border: 1px solid var(--border-strong, #2d3748);
          border-radius: 3px;
          background: rgba(255, 255, 255, 0.04);
          font-family: ui-monospace, SFMono-Regular, monospace;
          font-size: 9px;
          color: var(--muted, #8a96a8);
        }

        .programs-page__main {
          padding: 32px 0 80px;
        }

        .programs-page__container {
          width: min(1180px, calc(100% - 32px));
          margin: 0 auto;
        }

        /* Toolbar Filter & Search */
        .programs-page__toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 16px;
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
          border: 1px solid var(--border-strong, #2d3748);
          border-radius: 4px;
          background: var(--surface, #11151c);
          color: var(--muted, #8a96a8);
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .programs-page__category-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--muted, #64748b);
          transition: background-color 0.15s ease, box-shadow 0.15s ease;
        }

        .programs-page__category-badge {
          padding: 1px 6px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.06);
          font-family: ui-monospace, SFMono-Regular, monospace;
          font-size: 10px;
          color: var(--muted, #8a96a8);
          transition: all 0.15s ease;
        }

        /* PHP & MySQL Button Styling (Indigo Theme) */
        .programs-page__category-btn--php:hover {
          border-color: rgba(99, 102, 241, 0.4);
          color: #f0f4f8;
        }
        .programs-page__category-btn--php.programs-page__category-btn--active {
          border-color: #6366f1;
          background: rgba(99, 102, 241, 0.12);
          color: #a5b4fc;
        }
        .programs-page__category-btn--php.programs-page__category-btn--active .programs-page__category-dot {
          background: #6366f1;
          box-shadow: 0 0 8px rgba(99, 102, 241, 0.8);
        }
        .programs-page__category-btn--php.programs-page__category-btn--active .programs-page__category-badge {
          background: rgba(99, 102, 241, 0.25);
          color: #c7d2fe;
        }

        /* Android Button Styling (Emerald Theme) */
        .programs-page__category-btn--android:hover {
          border-color: rgba(16, 185, 129, 0.4);
          color: #f0f4f8;
        }
        .programs-page__category-btn--android.programs-page__category-btn--active {
          border-color: #10b981;
          background: rgba(16, 185, 129, 0.12);
          color: #6ee7b7;
        }
        .programs-page__category-btn--android.programs-page__category-btn--active .programs-page__category-dot {
          background: #10b981;
          box-shadow: 0 0 8px rgba(16, 185, 129, 0.8);
        }
        .programs-page__category-btn--android.programs-page__category-btn--active .programs-page__category-badge {
          background: rgba(16, 185, 129, 0.25);
          color: #a7f3d0;
        }

        /* Search Input */
        .programs-page__search-box {
          position: relative;
          display: flex;
          align-items: center;
          width: 280px;
        }

        .programs-page__search-icon {
          position: absolute;
          left: 12px;
          color: var(--muted, #8a96a8);
          pointer-events: none;
          transition: color 0.15s ease;
        }

        .programs-page__search-input {
          width: 100%;
          height: 38px;
          padding: 0 32px 0 36px;
          border: 1px solid var(--border-strong, #2d3748);
          border-radius: 4px;
          background: var(--surface, #11151c);
          color: var(--text, #f0f4f8);
          font-size: 12px;
          outline: none;
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
        }

        .programs-page__search-input:focus {
          border-color: var(--accent, #3b82f6);
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.15);
        }

        .programs-page__search-input:focus + .programs-page__search-icon {
          color: var(--accent, #3b82f6);
        }

        .programs-page__clear-btn {
          position: absolute;
          right: 10px;
          border: none;
          background: transparent;
          color: var(--muted, #8a96a8);
          font-size: 12px;
          cursor: pointer;
          padding: 2px 4px;
          transition: color 0.15s ease;
        }

        .programs-page__clear-btn:hover {
          color: var(--text, #f0f4f8);
        }

        .programs-page__search-kbd {
          position: absolute;
          right: 10px;
          padding: 2px 6px;
          border: 1px solid var(--border-strong, #2d3748);
          border-radius: 3px;
          background: rgba(255, 255, 255, 0.03);
          font-family: ui-monospace, SFMono-Regular, monospace;
          font-size: 10px;
          color: var(--muted, #8a96a8);
          pointer-events: none;
        }

        /* Meta Counter Bar */
        .programs-page__meta-bar {
          margin-bottom: 20px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--border, #1a202c);
        }

        .programs-page__meta-count {
          font-size: 12px;
          color: var(--muted, #8a96a8);
        }

        .programs-page__meta-count strong {
          color: var(--text, #f0f4f8);
        }

        /* Grid Layout */
        .programs-page__grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 16px;
        }

        /* Empty State */
        .programs-page__empty {
          text-align: center;
          padding: 64px 20px;
          border: 1px dashed var(--border-strong, #2d3748);
          border-radius: 4px;
          background: var(--surface, #11151c);
        }

        .programs-page__empty-icon {
          font-size: 28px;
          margin-bottom: 12px;
          opacity: 0.8;
        }

        .programs-page__empty h3 {
          margin: 0 0 6px 0;
          font-size: 16px;
          font-weight: 700;
        }

        .programs-page__empty p {
          margin: 0 0 20px 0;
          font-size: 13px;
          color: var(--muted, #8a96a8);
        }

        .programs-page__reset-btn {
          padding: 8px 16px;
          border: 1px solid var(--border-strong, #2d3748);
          border-radius: 4px;
          background: var(--surface-soft, #171d26);
          color: var(--accent, #3b82f6);
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .programs-page__reset-btn:hover {
          border-color: var(--accent, #3b82f6);
          background: rgba(59, 130, 246, 0.1);
        }

        /* Mobile Responsive Layout */
        @media (max-width: 640px) {
          .programs-page__header-inner {
            width: calc(100% - 24px);
            height: 54px;
          }

          .programs-page__context,
          .programs-page__divider,
          .programs-page__kbd {
            display: none;
          }

          .programs-page__main {
            padding: 20px 0 60px;
          }

          .programs-page__container {
            width: calc(100% - 24px);
          }

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
            gap: 12px;
          }
        }
      `}</style>
    </div>
  );
}

export default Programs;