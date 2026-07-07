import Link from "next/link";
import { CONTACT_LINKS, KIDVANTA, PROJECTS, SITE, SKILLS, TESTIMONIALS } from "@/lib/data";

export type PlanetId =
  | "projects"
  | "skills"
  | "about"
  | "testimonials"
  | "contact"
  | "resume";

type PlanetModalDef = {
  tag: string;
  color: string;
  title: string;
  body: React.ReactNode;
};

export const PLANET_CONTENT: Record<PlanetId, PlanetModalDef> = {
  projects: {
    tag: "PLANET PROJECTS",
    color: "#3b82f6",
    title: "My Work",
    body: (
      <>
        <div className="mod-text">Websites and app UIs built for clients worldwide.</div>
        <div className="mod-grid">
          <div className="mod-card" style={{ gridColumn: "1 / -1" }}>
            <div className="mod-ct">FEATURED — HEALTH APP UI/UX</div>
            <div className="mod-cn">Kidvanta</div>
            <div className="mod-cd">
              Multi-role school health screening app — 20+ screens, 4 user roles, two live
              design iterations.
            </div>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "10px" }}>
              {KIDVANTA.links.map((l) => (
                <a
                  key={l.href}
                  className="mod-btn"
                  style={{ marginTop: 0, ...(l.primary ? {} : { background: "transparent", color: "#3b82f6", border: "1px solid #3b82f6" }) }}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>
          {PROJECTS.map((p) => (
            <div className="mod-card" key={p.id}>
              <div className="mod-ct">{p.tags[0].toUpperCase()}</div>
              <div className="mod-cn">{p.name.split("—")[0].trim()}</div>
              <div className="mod-cd">{p.description}</div>
            </div>
          ))}
        </div>
        <a className="mod-btn" href="#projects">
          SEE ALL PROJECTS ↓
        </a>
      </>
    ),
  },
  skills: {
    tag: "PLANET SKILLS",
    color: "#10b981",
    title: "Tech Arsenal",
    body: (
      <>
        <div className="mod-text">
          Technologies I use to build fast, scalable web experiences.
        </div>
        {SKILLS.map((s) => (
          <div className="sk-row" key={s.name}>
            <div className="sk-h">
              <span className="sk-n">{s.name}</span>
              <span className="sk-p">{s.pct}%</span>
            </div>
            <div className="sk-bar">
              <div className="sk-fill" style={{ width: `${s.pct}%`, background: s.color }} />
            </div>
          </div>
        ))}
        <div className="mod-div" />
        <div style={{ fontSize: "12px", color: "#52525b", fontWeight: 300 }}>
          Also: Figma, Vercel, Supabase, Git, Framer Motion, GSAP
        </div>
      </>
    ),
  },
  about: {
    tag: "PLANET ABOUT",
    color: "#f59e0b",
    title: "About Me",
    body: (
      <>
        <div className="mod-text">
          Hey! I&apos;m Prajwal Kakade — a web developer &amp; UI/UX designer who
          believes great products are designed and built as one craft.
        </div>
        <div className="mod-text">
          I build modern websites with React and Next.js, design app interfaces,
          dashboards, and design systems, and convert designs into pixel-perfect
          live sites — always with clean design and fast load times.
        </div>
        <div className="mod-text">
          When not coding, I explore new tech and sharpen my design eye.
        </div>
        <div className="mod-div" />
        <div className="mod-grid">
          <div className="mod-card">
            <div className="mod-ct">LOCATION</div>
            <div className="mod-cn">India</div>
            <div className="mod-cd">Working with clients worldwide</div>
          </div>
          <div className="mod-card">
            <div className="mod-ct">STATUS</div>
            <div className="mod-cn">Available</div>
            <div className="mod-cd">Currently accepting projects</div>
          </div>
        </div>
      </>
    ),
  },
  testimonials: {
    tag: "PLANET REVIEWS",
    color: "#8b5cf6",
    title: "Client Love",
    body: (
      <>
        <div className="mod-text">What clients say about working with me.</div>
        {TESTIMONIALS.map((t) => (
          <div className="tc" key={t.name}>
            <div className="tc-q">&ldquo;{t.quote}&rdquo;</div>
            <div className="tc-a">{t.name}</div>
            <div className="tc-r">{t.role}</div>
          </div>
        ))}
      </>
    ),
  },
  contact: {
    tag: "PLANET CONTACT",
    color: "#ef4444",
    title: "Let's Connect",
    body: (
      <>
        <div className="mod-text">Ready to start? I&apos;d love to hear from you.</div>
        {CONTACT_LINKS.map((c, i) => (
          <a
            className="cl"
            key={c.name}
            href={c.href}
            {...(c.href.startsWith("http")
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            <span>{String(i + 1).padStart(2, "0")}</span> {c.name} — {c.detail}
          </a>
        ))}
        <div className="mod-div" />
        <a className="mod-btn" href={`mailto:${SITE.email}`}>
          SEND MESSAGE →
        </a>
      </>
    ),
  },
  resume: {
    tag: "PLANET RESUME",
    color: "#06b6d4",
    title: "Resume",
    body: (
      <>
        <div className="rs-t">WHAT I DO</div>
        <div className="rs-i">
          <div className="rs-in">Web Developer & UI/UX Designer</div>
          <div className="rs-is">Websites, app interfaces & design-to-code — React, Next.js, Figma</div>
          <div className="rs-id">AVAILABLE FOR PROJECTS</div>
        </div>
        <div className="rs-t">TECH STACK</div>
        <div style={{ fontSize: "12px", color: "#71717a", fontWeight: 300, lineHeight: 1.8 }}>
          React, Next.js, TypeScript, JavaScript, Tailwind CSS, Node.js, Supabase, Vercel,
          Figma, Framer Motion
        </div>
        <div className="rs-t">SELECTED WORK</div>
        <div className="rs-i">
          <div className="rs-in">Kidvanta — Child Health Screening App</div>
          <div className="rs-is">20+ screens, 4 user roles, two live design iterations</div>
        </div>
        <div className="rs-i">
          <div className="rs-in">Web projects</div>
          <div className="rs-is">Restaurant platform, SaaS landing, dashboards, portfolios</div>
        </div>
        <div className="mod-div" />
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <Link className="mod-btn" href="/resume">
            FULL RESUME →
          </Link>
          <a
            className="mod-btn"
            style={{ background: "transparent", color: "#06b6d4", border: "1px solid #06b6d4" }}
            href="/Prajwal-Kakade-Resume.pdf"
            download
          >
            DOWNLOAD PDF ↓
          </a>
        </div>
      </>
    ),
  },
};
