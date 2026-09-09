import React from "react";
import Logo from "../components/Logo";

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
          gap: 10px;
        }

        .header-brand__divider {
          width: 1px;
          height: 14px;
          background: var(--border, #1e293b);
        }

        .header-brand__tag {
          font-family: ui-monospace, SFMono-Regular, monospace;
          font-size: 11px;
          font-weight: 600;
          color: var(--muted, #94a3b8);
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
      `}</style>
    </div>
  );
}

export default HeaderBrand;