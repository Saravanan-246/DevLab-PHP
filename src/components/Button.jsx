import React from "react";

function Button({
  children,
  variant = "primary",
  size = "md",
  icon: Icon,
  iconPosition = "left",
  fullWidth = false,
  disabled = false,
  className = "",
  onClick,
  type = "button",
  ...props
}) {
  const baseStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    borderRadius: "8px",
    fontWeight: "500",
    fontSize: size === "sm" ? "13px" : size === "lg" ? "15px" : "14px",
    lineHeight: "1.4",
    padding:
      size === "sm"
        ? "6px 12px"
        : size === "lg"
        ? "12px 22px"
        : "9px 16px",
    width: fullWidth ? "100%" : "auto",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    transition: "all 0.18s cubic-bezier(0.16, 1, 0.3, 1)",
    outline: "none",
    border: "1px solid transparent",
    userSelect: "none",
    whiteSpace: "nowrap",
  };

  const variants = {
    primary: {
      backgroundColor: "var(--accent, #3b82f6)",
      color: "#ffffff",
      borderColor: "transparent",
    },
    secondary: {
      backgroundColor: "var(--surface-soft, #1e2631)",
      color: "var(--text, #f0f4f8)",
      borderColor: "var(--border, #2a3441)",
    },
    outline: {
      backgroundColor: "transparent",
      color: "var(--text, #f0f4f8)",
      borderColor: "var(--border, #2a3441)",
    },
    ghost: {
      backgroundColor: "transparent",
      color: "var(--muted, #94a3b8)",
      borderColor: "transparent",
    },
  };

  const selectedVariant = variants[variant] || variants.primary;

  return (
    <>
      <button
        type={type}
        disabled={disabled}
        onClick={onClick}
        className={`btn btn--${variant} btn--${size} ${className}`}
        style={{ ...baseStyle, ...selectedVariant }}
        {...props}
      >
        {Icon && iconPosition === "left" && (
          <Icon size={size === "sm" ? 14 : size === "lg" ? 18 : 16} />
        )}
        <span>{children}</span>
        {Icon && iconPosition === "right" && (
          <Icon size={size === "sm" ? 14 : size === "lg" ? 18 : 16} />
        )}
      </button>

      <style>{`
        .btn:hover:not(:disabled) {
          filter: brightness(1.08);
          transform: translateY(-1px);
        }

        .btn:active:not(:disabled) {
          transform: translateY(0);
          filter: brightness(0.96);
        }

        .btn--outline:hover:not(:disabled),
        .btn--ghost:hover:not(:disabled) {
          border-color: var(--accent, #3b82f6);
          color: var(--text, #ffffff);
          background-color: var(--surface-soft, #1e2631);
        }

        .btn:focus-visible {
          box-shadow: 0 0 0 2px var(--bg, #0d0f12), 0 0 0 4px var(--accent, #3b82f6);
        }
      `}</style>
    </>
  );
}

export default Button;