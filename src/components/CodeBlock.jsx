import React, { useState } from "react";

function CodeBlock({
  code = "",
  language = "php",
  filename = "index.php",
  className = "",
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!code) return;

    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code: ", err);
    }
  };

  const normalizedLang = String(language).toLowerCase();

  return (
    <div className={`code-block code-block--${normalizedLang} ${className}`}>
      {/* Header bar with filename and copy action */}
      <div className="code-block__header">
        <div className="code-block__info">
          <span className="code-block__filename">{filename}</span>
          <span className={`code-block__lang code-block__lang--${normalizedLang}`}>
            {normalizedLang}
          </span>
        </div>

        <button
          type="button"
          className="code-block__copy-btn"
          onClick={handleCopy}
          aria-label="Copy code to clipboard"
        >
          {copied ? (
            <span className="code-block__copied">
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
            <span className="code-block__copy">
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

      {/* Code viewport container */}
      <div className="code-block__content">
        <pre className="code-block__pre">
          <code className={`language-${normalizedLang}`}>{code}</code>
        </pre>
      </div>

      <style>{`
        .code-block {
          width: 100%;
          margin: 14px 0;
          border: 1px solid var(--border-strong, #2d3748);
          border-radius: 4px;
          background: var(--surface, #11151c);
          overflow: hidden;
          font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
        }

        .code-block__header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 14px;
          border-bottom: 1px solid var(--border, #1a202c);
          background: var(--surface-soft, #171d26);
        }

        .code-block__info {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .code-block__filename {
          font-size: 12px;
          font-weight: 600;
          color: var(--text, #f0f4f8);
        }

        .code-block__lang {
          font-size: 10px;
          font-weight: 700;
          padding: 2px 7px;
          border-radius: 3px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          background: rgba(99, 102, 241, 0.12);
          color: #a5b4fc;
          border: 1px solid rgba(99, 102, 241, 0.25);
        }

        /* Language Specific Badge Accents */
        .code-block__lang--java,
        .code-block__lang--xml {
          background: rgba(16, 185, 129, 0.12);
          color: #6ee7b7;
          border-color: rgba(16, 185, 129, 0.25);
        }

        .code-block__lang--sql {
          background: rgba(245, 158, 11, 0.12);
          color: #fcd34d;
          border-color: rgba(245, 158, 11, 0.25);
        }

        .code-block__copy-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 4px 10px;
          border: 1px solid var(--border-strong, #2d3748);
          border-radius: 3px;
          background: var(--surface, #11151c);
          color: var(--muted, #8a96a8);
          font-size: 11px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .code-block__copy-btn:hover {
          border-color: var(--theme-accent, #3b82f6);
          color: var(--text, #f0f4f8);
          background: var(--surface-soft, #171d26);
        }

        .code-block__copy,
        .code-block__copied {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .code-block__copied {
          color: #10b981;
          font-weight: 700;
        }

        .code-block__content {
          width: 100%;
          overflow-x: auto;
          background: var(--surface, #11151c);
        }

        .code-block__pre {
          margin: 0;
          padding: 16px 18px;
          font-size: 13px;
          line-height: 1.65;
          color: var(--text, #f0f4f8);
          white-space: pre;
          tab-size: 2;
        }

        .code-block__pre code {
          font-family: inherit;
        }

        /* Scrollbar styling */
        .code-block__content::-webkit-scrollbar {
          height: 6px;
        }

        .code-block__content::-webkit-scrollbar-track {
          background: transparent;
        }

        .code-block__content::-webkit-scrollbar-thumb {
          background: var(--border-strong, #2d3748);
          border-radius: 3px;
        }

        .code-block__content::-webkit-scrollbar-thumb:hover {
          background: var(--muted, #8a96a8);
        }
      `}</style>
    </div>
  );
}

export default CodeBlock;