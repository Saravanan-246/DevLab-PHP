import React from "react";

function Button({
  children,
  variant = "primary",
  size = "md",
  onClick,
  type = "button",
  disabled = false,
  className = "",
  ...props
}) {
  const baseClass = "btn";
  const variantClass = `btn--${variant}`;
  const sizeClass = `btn--${size}`;
  const disabledClass = disabled ? "btn--disabled" : "";

  const combinedClassName = `${baseClass} ${variantClass} ${sizeClass} ${disabledClass} ${className}`.trim();

  return (
    <>
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={combinedClassName}
        {...props}
      >
        <span className="btn__content">{children}</span>
      </button>

      {/* Global component styles rendered once per app scope */}
      <style>{`
        /* Base Button Styles */
        .btn {
          --btn-accent: var(--accent, #0284c7);
          --btn-accent-hover: var(--accent-hover, #0369a1);
          --btn-text-on-accent: var(--accent-text, #ffffff);
          --btn-surface: var(--surface-soft, rgba(255, 255, 255, 0.05));
          --btn-surface-hover: var(--surface-strong, rgba(255, 255, 255, 0.1));
          --btn-border: var(--border-strong, rgba(255, 255, 255, 0.15));
          --btn-text: var(--text, #f3f4f6);

          display: inline-flex;
          align-items: center;
          justify-content: center;
          position: relative;
          white-space: nowrap;
          vertical-align: middle;
          font-family: inherit;
          font-weight: 600;
          line-height: 1;
          border-radius: var(--radius-md, 8px);
          border: 1px solid transparent;
          cursor: pointer;
          user-select: none;
          text-decoration: none;
          transition: background-color 0.15s cubic-bezier(0.16, 1, 0.3, 1),
                      border-color 0.15s cubic-bezier(0.16, 1, 0.3, 1),
                      color 0.15s cubic-bezier(0.16, 1, 0.3, 1),
                      box-shadow 0.15s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.05s ease;
          outline: none;
        }

        .btn__content {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .btn:active:not(:disabled) {
          transform: scale(0.98);
        }

        /* --- Sizes --- */
        .btn--sm {
          height: 32px;
          padding: 0 12px;
          font-size: 12px;
          letter-spacing: 0.01em;
        }

        .btn--md {
          height: 40px;
          padding: 0 16px;
          font-size: 13.5px;
          letter-spacing: -0.005em;
        }

        .btn--lg {
          height: 48px;
          padding: 0 24px;
          font-size: 15px;
          letter-spacing: -0.01em;
        }

        /* --- Variants --- */
        /* Primary */
        .btn--primary {
          background-color: var(--btn-accent);
          color: var(--btn-text-on-accent);
          border-color: transparent;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        }

        .btn--primary:hover:not(:disabled) {
          background-color: var(--btn-accent-hover);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        /* Secondary */
        .btn--secondary {
          background-color: var(--btn-surface);
          color: var(--btn-text);
          border-color: var(--btn-border);
          backdrop-filter: blur(8px);
        }

        .btn--secondary:hover:not(:disabled) {
          background-color: var(--btn-surface-hover);
          border-color: var(--btn-text);
        }

        /* Focus & Disabled States */
        .btn:focus-visible {
          outline: 2px solid var(--btn-accent);
          outline-offset: 2px;
        }

        .btn--disabled,
        .btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          pointer-events: none;
          box-shadow: none;
        }
      `}</style>
    </>
  );
}

export default Button;