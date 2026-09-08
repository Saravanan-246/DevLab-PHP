import React from "react";
import Logo from "./Logo";

function HeaderBrand({ track = "" }) {
  return (
    <div className="header-brand">
      <Logo compact />
      <span className="header-brand__divider" />
      <span className="header-brand__tag">
        {track ? track : "CS Workspace"}
      </span>

      <style>{`
        .header-brand {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .header-brand__divider {
          width: 1px;
          height: 14px;
          background: var(--border, #2d3748);
        }

        .header-brand__tag {
          font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
          font-size: 11px;
          font-weight: 600;
          color: var(--muted, #8a96a8);
          letter-spacing: 0.03em;
        }
      `}</style>
    </div>
  );
}

export default HeaderBrand;