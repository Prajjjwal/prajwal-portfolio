import type { Metadata } from "next";
import { KIDVANTA, PROJECTS, SERVICES, SITE, SKILLS } from "@/lib/data";
import ResumeActions from "./ResumeActions";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Resume of Prajwal Kakade — freelance web developer specializing in React, Next.js, Tailwind CSS, and UI/UX design.",
};

const sectionTitle: React.CSSProperties = {
  fontFamily: "var(--font-space-mono), monospace",
  fontSize: "clamp(0.5625rem, 1.2vw, 0.625rem)",
  letterSpacing: "3px",
  color: "#10b981",
  marginBottom: "0.875rem",
  marginTop: "2rem",
};

export default function ResumePage() {
  return (
    <main className="resume-page">
      <ResumeActions />

      <div className="resume-sheet">
        {/* Header */}
        <header style={{ borderBottom: "1px solid #1e1e2a", paddingBottom: "1.5rem" }} className="print-card">
          <h1
            className="print-dark"
            style={{
              fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
              fontWeight: 600,
              color: "#fff",
              marginBottom: "0.375rem",
            }}
          >
            Prajwal Kakade
          </h1>
          <div
            className="print-accent"
            style={{
              fontFamily: "var(--font-space-mono), monospace",
              fontSize: "clamp(0.6875rem, 1.5vw, 0.8125rem)",
              color: "#10b981",
              letterSpacing: "2px",
              marginBottom: "0.875rem",
            }}
          >
            FREELANCE WEB DEVELOPER
          </div>
          <div
            className="print-muted"
            style={{
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap",
              fontSize: "clamp(0.6875rem, 1.4vw, 0.75rem)",
              color: "#71717a",
              fontWeight: 300,
            }}
          >
            <span>{SITE.email}</span>
            <span>prajwalkakade.dev</span>
            <span>India · working worldwide</span>
          </div>
        </header>

        {/* Summary */}
        <section>
          <div style={sectionTitle}>PROFILE</div>
          <p
            className="print-body"
            style={{
              fontSize: "clamp(0.75rem, 1.6vw, 0.875rem)",
              color: "#a1a1aa",
              lineHeight: 1.8,
              fontWeight: 300,
            }}
          >
            Freelance web developer building modern websites and app UIs for businesses
            with React and Next.js. I combine clean, conversion-focused design with fast,
            SEO-friendly engineering — from landing pages to complete multi-screen
            product interfaces.
          </p>
        </section>

        {/* Skills */}
        <section>
          <div style={sectionTitle}>SKILLS</div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(12rem, 1fr))",
              gap: "0.625rem 1.5rem",
            }}
          >
            {SKILLS.map((s) => (
              <div key={s.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span className="print-dark" style={{ fontSize: "clamp(0.75rem, 1.5vw, 0.8125rem)", color: "#e4e4e7" }}>
                  {s.name}
                </span>
                <span
                  className="print-accent"
                  style={{
                    fontFamily: "var(--font-space-mono), monospace",
                    fontSize: "clamp(0.5625rem, 1.2vw, 0.625rem)",
                    color: "#10b981",
                  }}
                >
                  {s.pct}%
                </span>
              </div>
            ))}
          </div>
          <div
            className="print-muted"
            style={{
              marginTop: "0.875rem",
              fontSize: "clamp(0.6875rem, 1.4vw, 0.75rem)",
              color: "#71717a",
              fontWeight: 300,
              lineHeight: 1.8,
            }}
          >
            Also: Figma, Supabase, Vercel, Git, Framer Motion, GSAP, responsive design,
            SEO &amp; Core Web Vitals optimization
          </div>
        </section>

        {/* Services */}
        <section>
          <div style={sectionTitle}>SERVICES</div>
          <div style={{ display: "grid", gap: "0.75rem" }}>
            {SERVICES.map((s) => (
              <div key={s.name}>
                <div className="print-dark" style={{ fontSize: "clamp(0.75rem, 1.6vw, 0.875rem)", fontWeight: 500, color: "#fff" }}>
                  {s.name}
                </div>
                <div
                  className="print-body"
                  style={{
                    fontSize: "clamp(0.6875rem, 1.4vw, 0.75rem)",
                    color: "#a1a1aa",
                    fontWeight: 300,
                    lineHeight: 1.7,
                  }}
                >
                  {s.description}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Selected projects */}
        <section>
          <div style={sectionTitle}>SELECTED PROJECTS</div>
          <div style={{ display: "grid", gap: "1rem" }}>
            <div>
              <div className="print-dark" style={{ fontSize: "clamp(0.75rem, 1.6vw, 0.875rem)", fontWeight: 500, color: "#fff" }}>
                {KIDVANTA.name}
              </div>
              <div
                className="print-body"
                style={{
                  fontSize: "clamp(0.6875rem, 1.4vw, 0.75rem)",
                  color: "#a1a1aa",
                  fontWeight: 300,
                  lineHeight: 1.7,
                  margin: "0.25rem 0 0.375rem",
                }}
              >
                {KIDVANTA.description}
              </div>
              <div
                className="print-accent"
                style={{
                  fontFamily: "var(--font-space-mono), monospace",
                  fontSize: "clamp(0.5625rem, 1.2vw, 0.625rem)",
                  color: "#10b981",
                }}
              >
                kidvanta-redesign-v2.netlify.app · kidvanta-redesign.netlify.app
              </div>
            </div>
            {PROJECTS.map((p) => (
              <div key={p.id}>
                <div className="print-dark" style={{ fontSize: "clamp(0.75rem, 1.6vw, 0.875rem)", fontWeight: 500, color: "#fff" }}>
                  {p.name}
                </div>
                <div
                  className="print-body"
                  style={{
                    fontSize: "clamp(0.6875rem, 1.4vw, 0.75rem)",
                    color: "#a1a1aa",
                    fontWeight: 300,
                    lineHeight: 1.7,
                    margin: "0.25rem 0 0.375rem",
                  }}
                >
                  {p.description} — {p.tags.join(", ")}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section>
          <div style={sectionTitle}>CONTACT</div>
          <div
            className="print-body"
            style={{
              fontSize: "clamp(0.6875rem, 1.5vw, 0.8125rem)",
              color: "#a1a1aa",
              fontWeight: 300,
              lineHeight: 2,
            }}
          >
            Email: {SITE.email}
            <br />
            Web: prajwalkakade.dev
            <br />
            LinkedIn · Upwork · Fiverr — links at prajwalkakade.dev#contact
          </div>
        </section>
      </div>
    </main>
  );
}
