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

  return (
    <div className={`code-block ${className}`}>
      {/* Header bar with filename and copy action */}
      <div className="code-block__header">
        <div className="code-block__info">
          <span className="code-block__filename">{filename}</span>
          <span className="code-block__lang">{language.toLowerCase()}</span>
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
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Copied
            </span>
          ) : (
            <span className="code-block__copy">
              <svg
                width="14"
                height="14"
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
          <code className={`language-${language.toLowerCase()}`}>{code}</code>
        </pre>
      </div>

      <style>{`
        .code-block {
          width: 100%;
          margin: 16px 0;
          border: 1px solid var(--border, #1e2631);
          border-radius: 10px;
          background: var(--surface, #11151c);
          overflow: hidden;
          font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace;
        }

        .code-block__header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 16px;
          border-bottom: 1px solid var(--border, #1e2631);
          background: var(--surface-soft, #161b24);
        }

        .code-block__info {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .code-block__filename {
          font-size: 12px;
          font-weight: 500;
          color: var(--text, #e2e8f0);
        }

        .code-block__lang {
          font-size: 10px;
          font-weight: 600;
          color: var(--accent, #3b82f6);
          background: rgba(59, 130, 246, 0.1);
          padding: 2px 8px;
          border-radius: 4px;
        }

        .code-block__copy-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 5px 10px;
          border: 1px solid var(--border, #2a3441);
          border-radius: 6px;
          background: var(--surface, #11151c);
          color: var(--muted, #94a3b8);
          font-size: 11px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .code-block__copy-btn:hover {
          border-color: var(--accent, #3b82f6);
          color: var(--text, #ffffff);
          background: var(--surface-soft, #161b24);
        }

        .code-block__copy,
        .code-block__copied {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .code-block__copied {
          color: #10b981;
        }

        .code-block__content {
          width: 100%;
          overflow-x: auto;
        }

        .code-block__pre {
          margin: 0;
          padding: 18px 20px;
          font-size: 13px;
          line-height: 1.7;
          color: var(--text, #f0f4f8);
          white-space: pre;
          word-spacing: normal;
          word-break: normal;
          tab-size: 2;
        }

        .code-block__pre code {
          font-family: inherit;
        }

        /* Custom subtle scrollbar */
        .code-block__content::-webkit-scrollbar {
          height: 6px;
        }

        .code-block__content::-webkit-scrollbar-track {
          background: transparent;
        }

        .code-block__content::-webkit-scrollbar-thumb {
          background: var(--border, #2a3441);
          border-radius: 4px;
        }

        .code-block__content::-webkit-scrollbar-thumb:hover {
          background: var(--muted, #64748b);
        }
      `}</style>
    </div>
  );
}

export default CodeBlock;