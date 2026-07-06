"use client";

import Link from "next/link";

export default function ResumeActions() {
  return (
    <div
      className="no-print"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "1.5rem",
        gap: "0.75rem",
        flexWrap: "wrap",
      }}
    >
      <Link
        href="/"
        style={{
          fontFamily: "var(--font-space-mono), monospace",
          fontSize: "clamp(0.625rem, 1.4vw, 0.75rem)",
          color: "#71717a",
          textDecoration: "none",
          letterSpacing: "1px",
        }}
      >
        ← BACK TO SITE
      </Link>
      <div style={{ display: "flex", gap: "0.625rem", flexWrap: "wrap" }}>
        <button className="mod-btn" style={{ marginTop: 0 }} onClick={() => window.print()}>
          PRINT / SAVE PDF
        </button>
        <a
          className="mod-btn"
          style={{
            marginTop: 0,
            background: "transparent",
            color: "#10b981",
            border: "1px solid #10b981",
          }}
          href="/Prajwal-Kakade-Resume.pdf"
          download
        >
          DOWNLOAD PDF ↓
        </a>
      </div>
    </div>
  );
}
