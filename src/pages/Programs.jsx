import React, { useState, useMemo } from "react";
import ProgramCard from "../components/ProgramCard";
import SectionHeading from "../components/SectionHeading";
import Logo from "../components/Logo";
import ThemeToggle from "../components/ThemeToggle";

function Programs({
  programs = [],
  theme = "dark",
  onToggleTheme,
  onOpenProgram,
  onClose,
  className = "",
}) {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["ALL", "PHP", "MYSQL"];

  // Filter programs based on category and search query
  const filteredPrograms = useMemo(() => {
    return programs.filter((program) => {
      const matchesCategory =
        selectedCategory === "ALL" ||
        program.category?.toUpperCase() === selectedCategory;

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
      {/* Header bar */}
      <header className="programs-page__header">
        <div className="programs-page__header-inner">
          <div className="programs-page__brand">
            <Logo compact />
            <span className="programs-page__divider" />
            <span className="programs-page__context">Practical Directory</span>
          </div>

          <div className="programs-page__actions">
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
            <button
              type="button"
              className="programs-page__close-btn"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="programs-page__main">
        <div className="programs-page__container">
          <SectionHeading
            badge="Course Catalog"
            title="PHP & MySQL Practicals"
            description="Select a practical to view details, source code, algorithm steps, and output."
          />

          {/* Search and Category Filter Toolbar */}
          <div className="programs-page__toolbar">
            <div className="programs-page__categories">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`programs-page__category-btn ${
                    selectedCategory === cat
                      ? "programs-page__category-btn--active"
                      : ""
                  }`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat === "ALL" ? "All Practicals" : cat}
                </button>
              ))}
            </div>

            <div className="programs-page__search-box">
              <svg
                className="programs-page__search-icon"
                width="16"
                height="16"
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
                type="text"
                className="programs-page__search-input"
                placeholder="Search practicals..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  type="button"
                  className="programs-page__clear-btn"
                  onClick={() => setSearchQuery("")}
                >
                  ×
                </button>
              )}
            </div>
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
              <h3>No practicals found</h3>
              <p>Try adjusting your search query or category filter.</p>
              <button
                type="button"
                className="programs-page__reset-btn"
                onClick={() => {
                  setSelectedCategory("ALL");
                  setSearchQuery("");
                }}
              >
                Reset filters
              </button>
            </div>
          )}
        </div>
      </main>

      <style>{`
        .programs-page {
          min-height: 100vh;
          background: var(--bg, #0d0f12);
          color: var(--text, #f0f4f8);
        }

        .programs-page__header {
          position: sticky;
          top: 0;
          z-index: 50;
          width: 100%;
          border-bottom: 1px solid var(--border, #1e2631);
          background: var(--bg, #0d0f12);
        }

        .programs-page__header-inner {
          width: min(1160px, calc(100% - 32px));
          height: 64px;
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
          background: var(--border, #1e2631);
        }

        .programs-page__context {
          font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
          font-size: 11px;
          color: var(--muted, #94a3b8);
        }

        .programs-page__actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .programs-page__close-btn {
          height: 34px;
          padding: 0 14px;
          border: 1px solid var(--border, #2a3441);
          border-radius: 6px;
          background: var(--surface, #11151c);
          color: var(--text, #f0f4f8);
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.18s ease;
        }

        .programs-page__close-btn:hover {
          border-color: var(--accent, #3b82f6);
          background: var(--surface-soft, #161b24);
        }

        .programs-page__main {
          padding: 40px 0 80px;
        }

        .programs-page__container {
          width: min(1160px, calc(100% - 32px));
          margin: 0 auto;
        }

        /* Toolbar Filter & Search */
        .programs-page__toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 32px;
          flex-wrap: wrap;
        }

        .programs-page__categories {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .programs-page__category-btn {
          padding: 6px 14px;
          border: 1px solid var(--border, #1e2631);
          border-radius: 6px;
          background: var(--surface, #11151c);
          color: var(--muted, #94a3b8);
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .programs-page__category-btn:hover {
          border-color: var(--border-strong, #2a3441);
          color: var(--text, #f0f4f8);
        }

        .programs-page__category-btn--active {
          border-color: var(--accent, #3b82f6);
          background: var(--surface-soft, #161b24);
          color: var(--text, #ffffff);
          font-weight: 600;
        }

        .programs-page__search-box {
          position: relative;
          display: flex;
          align-items: center;
          width: 240px;
        }

        .programs-page__search-icon {
          position: absolute;
          left: 10px;
          color: var(--muted, #94a3b8);
          pointer-events: none;
        }

        .programs-page__search-input {
          width: 100%;
          height: 34px;
          padding: 0 30px 0 32px;
          border: 1px solid var(--border, #1e2631);
          border-radius: 6px;
          background: var(--surface, #11151c);
          color: var(--text, #f0f4f8);
          font-size: 12px;
          outline: none;
          transition: border-color 0.15s ease;
        }

        .programs-page__search-input:focus {
          border-color: var(--accent, #3b82f6);
        }

        .programs-page__clear-btn {
          position: absolute;
          right: 8px;
          border: none;
          background: transparent;
          color: var(--muted, #94a3b8);
          font-size: 16px;
          cursor: pointer;
        }

        /* Grid */
        .programs-page__grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 20px;
        }

        /* Empty state */
        .programs-page__empty {
          text-align: center;
          padding: 60px 20px;
          border: 1px dashed var(--border, #1e2631);
          border-radius: 12px;
          background: var(--surface, #11151c);
        }

        .programs-page__empty h3 {
          margin: 0 0 8px 0;
          font-size: 18px;
          color: var(--text, #f0f4f8);
        }

        .programs-page__empty p {
          margin: 0 0 16px 0;
          font-size: 13px;
          color: var(--muted, #94a3b8);
        }

        .programs-page__reset-btn {
          padding: 8px 16px;
          border: 1px solid var(--border, #2a3441);
          border-radius: 6px;
          background: var(--surface-soft, #161b24);
          color: var(--accent, #3b82f6);
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
        }

        @media (max-width: 600px) {
          .programs-page__toolbar {
            flex-direction: column;
            align-items: stretch;
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