// ---------------------------------------------------------------------------
// Single source of truth for all site content.
// Edit this file to update projects, testimonials, stats, and contact links.
// ---------------------------------------------------------------------------

export const SITE = {
  name: "Prajwal Kakade",
  domain: "https://prajwalkakade.dev",
  title: "Prajwal Kakade — Web Developer & UI/UX Designer",
  description:
    "Web developer & UI/UX designer crafting fast React & Next.js websites, app interfaces, dashboards, and design systems — and turning designs into pixel-perfect live sites for businesses worldwide.",
  email: "kakadepb15@gmail.com",
  // Swap these for real profile URLs when ready.
  linkedin: "https://www.linkedin.com/in/prajwal-kakade",
  upwork: "https://www.upwork.com/freelancers/~prajwalkakade",
  fiverr: "https://www.fiverr.com/prajwalkakade",
};

export const NAV_LINKS = [
  { label: "HOME", href: "#home" },
  { label: "PROJECTS", href: "#projects" },
  { label: "SERVICES", href: "#services" },
  { label: "ABOUT", href: "#about" },
  { label: "CONTACT", href: "#contact" },
];

export const STATS = [
  { value: 10, suffix: "+", label: "PROJECTS SHIPPED" },
  { value: 100, suffix: "%", label: "SATISFACTION" },
  { value: 48, suffix: "hr", label: "AVG RESPONSE" },
  { value: 12, suffix: "+", label: "TECHNOLOGIES" },
];

export const MARQUEE_TECH = [
  "React",
  "Next.js",
  "Tailwind CSS",
  "JavaScript",
  "TypeScript",
  "Node.js",
  "Vercel",
  "Figma",
  "Supabase",
  "Framer Motion",
];

export const KIDVANTA = {
  id: "kidvanta",
  name: "Kidvanta — Child Health Screening App (UI/UX)",
  description:
    "Complete multi-role mobile app interface for a school health screening platform — 20+ screens across 4 user roles: animated onboarding with OTP login, Parent portal (SDQ questionnaire, health reports, find care), Doctor workflow (camps, patient queue, exam forms), and School Admin dashboard (triage, flagged students). Two full design iterations, both live.",
  tags: ["UI/UX Design", "Mobile App", "Design System"],
  links: [
    { label: "View V2 (Latest) →", href: "https://kidvanta-redesign-v2.netlify.app", primary: true },
    { label: "View V1 →", href: "https://kidvanta-redesign.netlify.app", primary: false },
  ],
};

export const PROJECTS = [
  {
    id: "flavorhub",
    name: "FlavorHub — Restaurant platform",
    description:
      "Full-featured restaurant site with online ordering, menu management, and reservations",
    tags: ["Next.js", "Tailwind", "Stripe"],
    bg: "#0d1b2a",
    label: "FLAVORHUB",
  },
  {
    id: "novatech",
    name: "NovaTech — SaaS landing page",
    description:
      "High-converting landing page with micro-animations and interactive pricing",
    tags: ["React", "Framer Motion", "Vercel"],
    bg: "#1a1a2e",
    label: "NOVATECH",
  },
  {
    id: "ecotrack",
    name: "EcoTrack — Dashboard app",
    description:
      "Real-time sustainability dashboard with data visualizations and team analytics",
    tags: ["Next.js", "Chart.js", "Supabase"],
    bg: "#0a2f1e",
    label: "ECOTRACK",
  },
  {
    id: "artistry",
    name: "Artistry — Portfolio template",
    description:
      "Minimal creative portfolio with smooth page transitions and image galleries",
    tags: ["React", "GSAP", "Tailwind"],
    bg: "#1e1b3a",
    label: "ARTISTRY",
  },
];

export const SERVICES = [
  {
    icon: "</>",
    name: "Web development",
    description:
      "Custom React & Next.js websites and landing pages built for speed, SEO, and conversion",
  },
  {
    icon: "UI",
    name: "UI/UX design",
    description:
      "App interfaces, dashboards, and design systems — like Kidvanta, a 20+ screen multi-role health app",
  },
  {
    icon: "⚡",
    name: "Design-to-code",
    description:
      "Converting your designs into pixel-perfect, fully responsive live websites",
  },
];

// Editable in one place — swap these for real client quotes as they come in.
export const TESTIMONIALS = [
  {
    quote:
      "Prajwal delivered a polished, fast website and communicated clearly at every step. The attention to detail in the UI was excellent.",
    name: "James M.",
    role: "Small business owner",
    initials: "JM",
  },
  {
    quote:
      "He understood our vision quickly and turned it into a clean, modern design. Revisions were fast and thoughtful.",
    name: "Sarah L.",
    role: "Studio founder",
    initials: "SL",
  },
];

export const SKILLS = [
  { name: "React / Next.js", pct: 95, color: "#10b981" },
  { name: "TypeScript / JavaScript", pct: 92, color: "#3b82f6" },
  { name: "Tailwind CSS", pct: 90, color: "#8b5cf6" },
  { name: "UI/UX Design", pct: 88, color: "#f59e0b" },
  { name: "Node.js", pct: 85, color: "#ef4444" },
];

export const CONTACT_LINKS = [
  { icon: "@", name: "Email", detail: SITE.email, href: `mailto:${SITE.email}` },
  { icon: "in", name: "LinkedIn", detail: "Connect with me", href: SITE.linkedin },
  { icon: "UP", name: "Upwork", detail: "Hire me on Upwork", href: SITE.upwork },
  { icon: "FV", name: "Fiverr", detail: "View my gigs", href: SITE.fiverr },
];
