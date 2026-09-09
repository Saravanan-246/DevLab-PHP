import React, { useState } from "react";

function CodeBlock({
  code = "",
  language = "php",
  filename = "index.php",
  theme = "dark",
  className = "",
}) {
  const [copied, setCopied] = useState(false);
  const isLight = theme === "light";

  const handleCopy = async () => {
    if (!code) return;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        return;
      } catch (err) {
        console.warn("Clipboard API failed, falling back to execCommand: ", err);
      }
    }

    try {
      const textarea = document.createElement("textarea");
      textarea.value = code;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code: ", err);
    }
  };

  const normalizedLang = String(language).toLowerCase();

  return (
    <div
      className={`cb cb--${normalizedLang} ${
        isLight ? "cb--light" : "cb--dark"
      } ${className}`}
    >
      {/* Header Bar */}
      <div className="cb__header">
        <div className="cb__info">
          <span className="cb__filename">{filename}</span>
          <span className={`cb__badge cb__badge--${normalizedLang}`}>
            {normalizedLang}
          </span>
        </div>

        <button
          type="button"
          className="cb__copy-btn"
          onClick={handleCopy}
          aria-label="Copy code to clipboard"
        >
          {copied ? (
            <span className="cb__copied-text">
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Copied!
            </span>
          ) : (
            <span className="cb__copy-text">
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              Copy
            </span>
          )}
        </button>
      </div>

      {/* Code Container Viewport */}
      <div className="cb__viewport">
        <pre className="cb__pre">
          <code className={`language-${normalizedLang}`}>{code}</code>
        </pre>
      </div>

      <style>{`
        /* CodeBlock High-Contrast Color Variables */
        .cb--dark {
          --cb-bg: #0f172a;
          --cb-header-bg: #1e293b;
          --cb-border: #334155;
          --cb-text: #f8fafc;
          --cb-filename-text: #e2e8f0;
          --cb-muted: #94a3b8;
          --cb-accent: #38bdf8;
        }

        .cb--light {
          --cb-bg: #ffffff;
          --cb-header-bg: #f1f5f9;
          --cb-border: #cbd5e1;
          --cb-text: #0f172a;
          --cb-filename-text: #1e293b;
          --cb-muted: #64748b;
          --cb-accent: #0284c7;
        }

        .cb {
          width: 100%;
          margin: 1rem 0;
          border: 1px solid var(--cb-border);
          border-radius: 8px;
          background-color: var(--cb-bg);
          overflow: hidden;
          font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
          transition: background-color 0.2s ease, border-color 0.2s ease;
        }

        /* Top Bar Header */
        .cb__header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 14px;
          background-color: var(--cb-header-bg);
          border-bottom: 1px solid var(--cb-border);
        }

        .cb__info {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .cb__filename {
          font-size: 12px;
          font-weight: 700;
          color: var(--cb-filename-text);
        }

        .cb__badge {
          font-size: 10px;
          font-weight: 700;
          padding: 2px 6px;
          border-radius: 4px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          background: rgba(2, 132, 199, 0.15);
          color: var(--cb-accent);
          border: 1px solid rgba(2, 132, 199, 0.3);
        }

        .cb__badge--java,
        .cb__badge--xml {
          background: rgba(5, 150, 105, 0.15);
          color: #34d399;
          border-color: rgba(5, 150, 105, 0.3);
        }

        .cb__badge--sql {
          background: rgba(217, 119, 6, 0.15);
          color: #fbbf24;
          border-color: rgba(217, 119, 6, 0.3);
        }

        /* Copy Button */
        .cb__copy-btn {
          background: transparent;
          border: 1px solid var(--cb-border);
          border-radius: 6px;
          padding: 4px 10px;
          color: var(--cb-muted);
          font-size: 11px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .cb__copy-btn:hover {
          border-color: var(--cb-muted);
          color: var(--cb-text);
          background-color: var(--cb-border);
        }

        .cb__copy-text,
        .cb__copied-text {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .cb__copied-text {
          color: #34d399;
          font-weight: 700;
        }

        /* Code Text Viewport */
        .cb__viewport {
          width: 100%;
          overflow-x: auto;
          background-color: var(--cb-bg);
        }

        .cb__pre {
          margin: 0;
          padding: 16px;
          font-size: 13.5px;
          line-height: 1.6;
          color: var(--cb-text);
          white-space: pre;
          tab-size: 2;
        }

        .cb__pre code {
          font-family: inherit;
          color: var(--cb-text) !important;
          opacity: 1 !important;
        }

        /* Scrollbar Styling */
        .cb__viewport::-webkit-scrollbar {
          height: 6px;
        }

        .cb__viewport::-webkit-scrollbar-track {
          background: transparent;
        }

        .cb__viewport::-webkit-scrollbar-thumb {
          background: var(--cb-border);
          border-radius: 4px;
        }

        .cb__viewport::-webkit-scrollbar-thumb:hover {
          background: var(--cb-muted);
        }
      `}</style>
    </div>
  );
}

export default CodeBlock;