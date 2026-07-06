"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  CONTACT_LINKS,
  KIDVANTA,
  MARQUEE_TECH,
  NAV_LINKS,
  PROJECTS,
  SERVICES,
  SITE,
  STATS,
  TESTIMONIALS,
} from "@/lib/data";
import KidvantaPhones from "./KidvantaPhones";

const TERMINAL_LINES = [
  "npm run build-awesome",
  "deploying pixel-perfect sites...",
  "const passion = 'unlimited';",
  "git push origin main",
];

function Terminal() {
  const [text, setText] = useState("");

  useEffect(() => {
    let line = 0;
    let char = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const current = TERMINAL_LINES[line];
      if (!deleting) {
        char++;
        setText(current.substring(0, char));
        if (char >= current.length) {
          deleting = true;
          timer = setTimeout(tick, 2500);
          return;
        }
        timer = setTimeout(tick, 55 + Math.random() * 35);
      } else {
        char--;
        setText(current.substring(0, char));
        if (char <= 0) {
          deleting = false;
          line = (line + 1) % TERMINAL_LINES.length;
          timer = setTimeout(tick, 400);
          return;
        }
        timer = setTimeout(tick, 25);
      }
    };
    timer = setTimeout(tick, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="term">
      <div className="term-dots">
        <span style={{ background: "#ff5f57" }} />
        <span style={{ background: "#febc2e" }} />
        <span style={{ background: "#28c840" }} />
      </div>
      <div className="term-line">
        <span className="grn">prajwal@dev</span>
        <span style={{ color: "#52525b" }}>:~$</span> <span className="wht">{text}</span>
        <span className="term-cursor" />
      </div>
      <div className="term-out">
        <div className="tl ok">✓ Website compiled successfully</div>
        <div className="tl ok">✓ Lighthouse score: 98/100</div>
        <div className="tl ok">✓ Deployed to production</div>
        <div className="tl" style={{ color: "#71717a", marginTop: "8px" }}>
          Ready to build your next project...
        </div>
      </div>
    </div>
  );
}

function StatCounter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1200;
    const start = performance.now();
    let raf = 0;
    const step = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      setDisplay(Math.round(value * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <div className="pstat-n" ref={ref}>
      {display}
      {suffix}
    </div>
  );
}

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

function FloatingShapes({ id }: { id: string }) {
  // Decorative floating shapes per concept-project thumbnail, matching the reference.
  const shapes: Record<string, React.ReactNode> = {
    flavorhub: (
      <>
        <div className="fl" style={{ width: "100px", height: "60px", background: "#10b981", top: "25px", left: "25px", animation: "float1 5s ease-in-out infinite" }} />
        <div className="fl" style={{ width: "140px", height: "35px", background: "#3b82f6", bottom: "35px", right: "20px", animation: "float2 6s ease-in-out infinite" }} />
        <div className="fl" style={{ width: "50px", height: "50px", background: "#f59e0b", borderRadius: "50%", top: "45%", left: "45%", animation: "pulse 4s ease-in-out infinite" }} />
      </>
    ),
    novatech: (
      <>
        <div className="fl" style={{ width: "70px", height: "70px", background: "#8b5cf6", borderRadius: "50%", top: "20px", right: "30px", animation: "float2 5.5s ease-in-out infinite" }} />
        <div className="fl" style={{ width: "120px", height: "30px", background: "#ec4899", bottom: "30px", left: "25px", animation: "float1 6.5s ease-in-out infinite" }} />
        <div className="fl" style={{ width: "55px", height: "55px", background: "#06b6d4", top: "50%", right: "50%", animation: "pulse 5s ease-in-out infinite" }} />
      </>
    ),
    ecotrack: (
      <>
        <div className="fl" style={{ width: "80px", height: "40px", background: "#10b981", top: "30px", right: "25px", animation: "float1 4.5s ease-in-out infinite" }} />
        <div className="fl" style={{ width: "60px", height: "60px", background: "#34d399", borderRadius: "50%", bottom: "25px", left: "30px", animation: "float2 5s ease-in-out infinite" }} />
        <div className="fl" style={{ width: "110px", height: "25px", background: "#6ee7b7", top: "48%", left: "35%", animation: "pulse 4.5s ease-in-out infinite" }} />
      </>
    ),
    artistry: (
      <>
        <div className="fl" style={{ width: "65px", height: "65px", background: "#a855f7", borderRadius: "10px", top: "25px", left: "25px", animation: "float2 5.2s ease-in-out infinite" }} />
        <div className="fl" style={{ width: "90px", height: "32px", background: "#f472b6", bottom: "28px", right: "25px", animation: "float1 4.8s ease-in-out infinite" }} />
        <div className="fl" style={{ width: "40px", height: "40px", background: "#c084fc", borderRadius: "50%", top: "42%", right: "38%", animation: "pulse 5.5s ease-in-out infinite" }} />
      </>
    ),
  };
  return <>{shapes[id]}</>;
}

export default function Portfolio() {
  return (
    <div id="portfolio">
      <div className="wrap">
        <div className="port-divider">
          <div className="port-divider-text">SCROLL INTO REALITY</div>
        </div>

        <nav className="pnav" id="home">
          <a href="#game-section" className="hud-logo" style={{ textDecoration: "none" }} aria-label="Back to the space game">
            <span>{"{"}</span>PK<span>{"}"}</span>
          </a>
          <div className="pnav-links">
            {NAV_LINKS.map((l) => (
              <a key={l.label} href={l.href}>
                {l.label}
              </a>
            ))}
          </div>
        </nav>

        {/* HERO */}
        <section className="phero">
          <div className="phero-grid">
            <motion.div {...reveal}>
              <div className="phero-tag">FREELANCE WEB DEVELOPER</div>
              <h1>
                I build modern
                <br />
                websites that
                <br />
                <span className="accent">convert</span>.
              </h1>
              <p>
                React &amp; Next.js developer crafting fast, responsive, and
                conversion-focused web experiences for businesses worldwide.
              </p>
              <div className="pbtn-row">
                <a className="pbtn-p" href="#projects">
                  View my work →
                </a>
                <a className="pbtn-s" href="#contact">
                  Get in touch
                </a>
              </div>
            </motion.div>
            <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.15 }}>
              <Terminal />
            </motion.div>
          </div>
        </section>

        {/* STATS */}
        <div className="pstats">
          {STATS.map((s, i) => (
            <motion.div
              className="pstat"
              key={s.label}
              {...reveal}
              transition={{ ...reveal.transition, delay: i * 0.08 }}
            >
              <StatCounter value={s.value} suffix={s.suffix} />
              <div className="pstat-l">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* TECH MARQUEE */}
        <div className="pmq">
          <div className="pmq-track">
            {[...MARQUEE_TECH, ...MARQUEE_TECH].map((t, i) => (
              <div className="pmq-item" key={`${t}-${i}`}>
                <span className="pmq-dot" />
                {t}
              </div>
            ))}
          </div>
        </div>

        {/* PROJECTS */}
        <section className="psec" id="projects">
          <motion.div {...reveal}>
            <div className="psec-tag">FEATURED WORK</div>
            <div className="psec-title">Projects that speak for themselves</div>
          </motion.div>
          <div className="ppg">
            {/* Kidvanta — featured, spans full width */}
            <motion.div className="ppc featured" {...reveal}>
              <div className="ppt">
                <div
                  className="ppti"
                  style={{ background: "linear-gradient(140deg, #0E1230 0%, #1a1440 55%, #12798E 130%)" }}
                >
                  <KidvantaPhones />
                </div>
              </div>
              <div className="ppi">
                <div className="ppn">{KIDVANTA.name}</div>
                <div className="ppd">{KIDVANTA.description}</div>
                <div className="pptags">
                  {KIDVANTA.tags.map((t) => (
                    <span className="pptag" key={t}>
                      {t}
                    </span>
                  ))}
                </div>
                <div className="pplinks">
                  {KIDVANTA.links.map((l) => (
                    <a
                      key={l.href}
                      className={l.primary ? "pplink-p" : "pplink-s"}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {l.label}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {PROJECTS.map((p, i) => (
              <motion.div
                className="ppc"
                key={p.id}
                {...reveal}
                transition={{ ...reveal.transition, delay: (i % 2) * 0.1 }}
              >
                <div className="ppt">
                  <div className="ppti" style={{ background: p.bg }}>
                    <FloatingShapes id={p.id} />
                    <span className="ppnb">{p.label}</span>
                    <div className="ppo">
                      <span>CASE STUDY ON REQUEST</span>
                    </div>
                  </div>
                </div>
                <div className="ppi">
                  <div className="ppn">{p.name}</div>
                  <div className="ppd">{p.description}</div>
                  <div className="pptags">
                    {p.tags.map((t) => (
                      <span className="pptag" key={t}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SERVICES */}
        <section className="psec" id="services" style={{ borderTop: "1px solid #1e1e2a" }}>
          <motion.div {...reveal}>
            <div className="psec-tag">WHAT I DO</div>
            <div className="psec-title">Services</div>
          </motion.div>
          <div className="svg-grid">
            {SERVICES.map((s, i) => (
              <motion.div
                className="svc"
                key={s.name}
                {...reveal}
                transition={{ ...reveal.transition, delay: i * 0.1 }}
              >
                <div className="svc-i">{s.icon}</div>
                <div className="svc-n">{s.name}</div>
                <div className="svc-d">{s.description}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ABOUT */}
        <section className="psec" id="about" style={{ borderTop: "1px solid #1e1e2a" }}>
          <motion.div {...reveal}>
            <div className="psec-tag">WHO I AM</div>
            <div className="psec-title">About me</div>
            <p
              style={{
                fontSize: "clamp(0.8125rem, 1.7vw, 0.9375rem)",
                color: "#a1a1aa",
                lineHeight: 1.9,
                fontWeight: 300,
                maxWidth: "46rem",
              }}
            >
              Hey! I&apos;m Prajwal Kakade — a freelance web developer based in India,
              working with clients worldwide. I believe great websites are crafted, not
              just coded: I build modern websites and app UIs with React and Next.js,
              from high-converting landing pages to complete multi-screen product
              interfaces, always with clean design, fast load times, and attention to
              the details users actually feel.
            </p>
          </motion.div>
        </section>

        {/* TESTIMONIALS */}
        <section className="psec" id="testimonials" style={{ borderTop: "1px solid #1e1e2a" }}>
          <motion.div {...reveal}>
            <div className="psec-tag">CLIENT LOVE</div>
            <div className="psec-title">Words from happy clients</div>
          </motion.div>
          <div className="ptg">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                className="ptc"
                key={t.name}
                {...reveal}
                transition={{ ...reveal.transition, delay: i * 0.1 }}
              >
                <div className="pt-stars">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <span className="pt-star" key={s}>
                      ★
                    </span>
                  ))}
                </div>
                <div className="pt-text">&ldquo;{t.quote}&rdquo;</div>
                <div className="pt-who">
                  <div className="pt-av">{t.initials}</div>
                  <div>
                    <div className="pt-nm">{t.name}</div>
                    <div className="pt-rl">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section className="psec" id="contact" style={{ borderTop: "1px solid #1e1e2a" }}>
          <motion.div {...reveal}>
            <div className="psec-tag">GET IN TOUCH</div>
            <div className="psec-title">Contact</div>
          </motion.div>
          <div className="pcontact-grid">
            {CONTACT_LINKS.map((c, i) => (
              <motion.a
                className="pcl"
                key={c.name}
                href={c.href}
                {...(c.href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                {...reveal}
                transition={{ ...reveal.transition, delay: i * 0.08 }}
              >
                <div className="pcl-i">{c.icon}</div>
                <div>
                  <div className="pcl-n">{c.name}</div>
                  <div className="pcl-d">{c.detail}</div>
                </div>
              </motion.a>
            ))}
          </div>
        </section>

        {/* CTA */}
        <motion.div className="pcta" {...reveal}>
          <div className="pcta-in">
            <div className="psec-tag">READY TO START?</div>
            <div className="psec-title">Let&apos;s build something amazing</div>
            <p>Got a project in mind? I&apos;d love to hear about it.</p>
            <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
              <a className="pbtn-p" href={`mailto:${SITE.email}?subject=Project inquiry`}>
                Start a project →
              </a>
              <Link className="pbtn-s" href="/resume">
                View resume
              </Link>
            </div>
          </div>
        </motion.div>

        {/* FOOTER */}
        <footer className="pfooter">
          <div className="pfooter-l">
            <div className="hud-logo">
              <span>{"{"}</span>PK<span>{"}"}</span>
            </div>
            <p>prajwalkakade.dev — crafted with precision</p>
          </div>
          <div className="pfooter-r">
            <a href={SITE.upwork} target="_blank" rel="noopener noreferrer">
              UPWORK
            </a>
            <a href={SITE.fiverr} target="_blank" rel="noopener noreferrer">
              FIVERR
            </a>
            <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer">
              LINKEDIN
            </a>
            <a href={`mailto:${SITE.email}`}>EMAIL</a>
          </div>
        </footer>
      </div>
    </div>
  );
}
