"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PLANET_CONTENT, type PlanetId } from "./planetContent";

const WORLD = 2400;

type Planet = {
  id: PlanetId;
  name: string;
  x: number;
  y: number;
  r: number;
  color: string;
  glow: string;
  rings: boolean;
  rc?: string;
  orb: { a: number; d: number; r: number; s: number; c: string }[];
  _near?: boolean;
};

const PLANETS: Planet[] = [
  { id: "projects", name: "PROJECTS", x: 500, y: 500, r: 70, color: "#3b82f6", glow: "59,130,246", rings: true, rc: "rgba(59,130,246,0.12)", orb: [{ a: 0, d: 100, r: 7, s: 0.007, c: "#93c5fd" }] },
  { id: "skills", name: "SKILLS", x: 1900, y: 400, r: 60, color: "#10b981", glow: "16,185,129", rings: false, orb: [{ a: 2, d: 85, r: 6, s: 0.009, c: "#6ee7b7" }] },
  { id: "about", name: "ABOUT ME", x: 1100, y: 1400, r: 75, color: "#f59e0b", glow: "245,158,11", rings: true, rc: "rgba(245,158,11,0.1)", orb: [{ a: 1, d: 105, r: 8, s: 0.005, c: "#fcd34d" }] },
  { id: "testimonials", name: "REVIEWS", x: 2100, y: 1500, r: 62, color: "#8b5cf6", glow: "139,92,246", rings: false, orb: [{ a: 3, d: 88, r: 5, s: 0.008, c: "#c4b5fd" }] },
  { id: "contact", name: "CONTACT", x: 400, y: 2000, r: 56, color: "#ef4444", glow: "239,68,68", rings: true, rc: "rgba(239,68,68,0.1)", orb: [{ a: 4, d: 80, r: 5, s: 0.01, c: "#fca5a5" }] },
  { id: "resume", name: "RESUME", x: 2000, y: 2100, r: 52, color: "#06b6d4", glow: "6,182,212", rings: false, orb: [{ a: 5, d: 76, r: 5, s: 0.01, c: "#67e8f9" }] },
];

const INTRO_PLANETS = [
  { name: "PROJECTS", color: "#3b82f6", bg: "rgba(59,130,246,0.15)" },
  { name: "SKILLS", color: "#10b981", bg: "rgba(16,185,129,0.15)" },
  { name: "ABOUT", color: "#f59e0b", bg: "rgba(245,158,11,0.15)" },
  { name: "REVIEWS", color: "#8b5cf6", bg: "rgba(139,92,246,0.15)" },
  { name: "CONTACT", color: "#ef4444", bg: "rgba(239,68,68,0.15)" },
  { name: "RESUME", color: "#06b6d4", bg: "rgba(6,182,212,0.15)" },
];

// Slow, controllable ship physics
const ACCEL = 0.09;
const FRICTION = 0.96;
const MAX_SPEED = 3.8;

export default function SpaceGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const joyRef = useRef<HTMLDivElement>(null);
  const joyThumbRef = useRef<HTMLDivElement>(null);
  const minimapRef = useRef<HTMLDivElement>(null);
  const mmShipRef = useRef<HTMLDivElement>(null);
  const coordsRef = useRef<HTMLDivElement>(null);

  const [started, setStarted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [discovered, setDiscovered] = useState<Set<PlanetId>>(new Set());
  const [activeKeys, setActiveKeys] = useState({ w: false, a: false, s: false, d: false });
  const [modal, setModal] = useState<PlanetId | null>(null);
  const [showScrollHint, setShowScrollHint] = useState(false);

  // Mutable game state lives in refs so the rAF loop never re-renders React.
  const game = useRef({
    started: false,
    ship: { x: WORLD / 2, y: WORLD / 2, vx: 0, vy: 0, angle: -1.57 },
    cam: { x: 0, y: 0 },
    keys: {} as Record<string, boolean>,
    mouse: { down: false, x: 0, y: 0 },
    joy: { active: false, dx: 0, dy: 0 },
    thrust: [] as { x: number; y: number; vx: number; vy: number; life: number; r: number }[],
    W: 0,
    H: 0,
    time: 0,
    discovered: new Set<PlanetId>(),
    audio: null as AudioContext | null,
  });

  const playTone = useCallback((f: number, d: number, v: number) => {
    const ctx = game.current.audio;
    if (!ctx) return;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.connect(g);
    g.connect(ctx.destination);
    o.type = "sine";
    o.frequency.value = f;
    g.gain.setValueAtTime(v, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + d);
    o.start();
    o.stop(ctx.currentTime + d);
  }, []);

  const openPlanet = useCallback(
    (id: PlanetId) => {
      setModal(id);
      game.current.discovered.add(id);
      setDiscovered(new Set(game.current.discovered));
      playTone(600, 0.2, 0.04);
    },
    [playTone]
  );

  const start = useCallback(() => {
    setStarted(true);
    game.current.started = true;
    if (!game.current.audio) {
      const AC = window.AudioContext ?? (window as any).webkitAudioContext;
      if (AC) game.current.audio = new AC();
    }
    playTone(440, 0.3, 0.04);
    setTimeout(() => playTone(660, 0.4, 0.04), 150);
    setTimeout(() => setShowScrollHint(true), 2000);
  }, [playTone]);

  useEffect(() => {
    setIsMobile(/Android|iPhone|iPad|iPod|webOS/i.test(navigator.userAgent));
  }, []);

  // Keyboard: WASD + arrows, preventDefault on arrows while the game fills the view
  useEffect(() => {
    const syncKeys = () => {
      const k = game.current.keys;
      setActiveKeys({
        w: !!(k["w"] || k["arrowup"]),
        a: !!(k["a"] || k["arrowleft"]),
        s: !!(k["s"] || k["arrowdown"]),
        d: !!(k["d"] || k["arrowright"]),
      });
    };
    const onDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (["arrowup", "arrowdown", "arrowleft", "arrowright"].includes(key)) {
        const sec = sectionRef.current;
        if (sec) {
          const r = sec.getBoundingClientRect();
          if (r.top <= 0 && r.bottom > window.innerHeight * 0.5) e.preventDefault();
        }
      }
      game.current.keys[key] = true;
      syncKeys();
    };
    const onUp = (e: KeyboardEvent) => {
      game.current.keys[e.key.toLowerCase()] = false;
      syncKeys();
    };
    window.addEventListener("keydown", onDown);
    window.addEventListener("keyup", onUp);
    return () => {
      window.removeEventListener("keydown", onDown);
      window.removeEventListener("keyup", onUp);
    };
  }, []);

  // Joystick (mobile)
  useEffect(() => {
    const joy = joyRef.current;
    const thumb = joyThumbRef.current;
    if (!joy || !thumb) return;
    const handle = (e: TouchEvent) => {
      const t = e.touches[0];
      const r = joy.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      let dx = t.clientX - cx;
      let dy = t.clientY - cy;
      const d = Math.hypot(dx, dy);
      const max = r.width * 0.4;
      if (d > max) {
        dx = (dx / d) * max;
        dy = (dy / d) * max;
      }
      game.current.joy.dx = dx / max;
      game.current.joy.dy = dy / max;
      thumb.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`;
    };
    const onStart = (e: TouchEvent) => {
      e.preventDefault();
      game.current.joy.active = true;
      handle(e);
    };
    const onMove = (e: TouchEvent) => {
      e.preventDefault();
      handle(e);
    };
    const onEnd = () => {
      game.current.joy.active = false;
      game.current.joy.dx = 0;
      game.current.joy.dy = 0;
      thumb.style.transform = "translate(-50%, -50%)";
    };
    joy.addEventListener("touchstart", onStart, { passive: false });
    joy.addEventListener("touchmove", onMove, { passive: false });
    joy.addEventListener("touchend", onEnd);
    return () => {
      joy.removeEventListener("touchstart", onStart);
      joy.removeEventListener("touchmove", onMove);
      joy.removeEventListener("touchend", onEnd);
    };
  }, []);

  // Minimap planet dots
  useEffect(() => {
    const mm = minimapRef.current;
    if (!mm) return;
    const dots: HTMLDivElement[] = [];
    for (const p of PLANETS) {
      const d = document.createElement("div");
      d.className = "mm-dot";
      d.style.cssText = `width:5px;height:5px;background:${p.color};left:${(p.x / WORLD) * 100}%;top:${(p.y / WORLD) * 100}%;box-shadow:0 0 4px ${p.color};margin-left:-2.5px;margin-top:-2.5px`;
      mm.appendChild(d);
      dots.push(d);
    }
    return () => dots.forEach((d) => d.remove());
  }, []);

  // Main canvas loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const g = game.current;

    const resize = () => {
      g.W = canvas.width = section.offsetWidth;
      g.H = canvas.height = section.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Starfield & nebulae (generated once per mount)
    const stars = Array.from({ length: 400 }, () => ({
      x: Math.random() * WORLD,
      y: Math.random() * WORLD,
      r: Math.random() * 1.3 + 0.3,
      tw: Math.random() * 0.015 + 0.004,
      tp: Math.random() * 6.28,
    }));
    const farStars = Array.from({ length: 150 }, () => ({
      x: Math.random() * WORLD * 1.5,
      y: Math.random() * WORLD * 1.5,
      r: Math.random() * 0.7 + 0.2,
      b: Math.random() * 0.4,
    }));
    const nebulae = [
      { x: 500, y: 400, r: 250, c: "16,185,129", o: 0.035 },
      { x: 1900, y: 800, r: 300, c: "139,92,246", o: 0.025 },
      { x: 1200, y: 1800, r: 280, c: "239,68,68", o: 0.02 },
      { x: 2000, y: 1800, r: 220, c: "59,130,246", o: 0.03 },
    ];

    let raf = 0;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      g.time += 0.016;
      ctx.clearRect(0, 0, g.W, g.H);

      if (!g.started) {
        ctx.fillStyle = "#0a0a0f";
        ctx.fillRect(0, 0, g.W, g.H);
        for (let i = 0; i < 150; i++) {
          const s = stars[i];
          ctx.globalAlpha = 0.3 + 0.3 * Math.sin(g.time * s.tw * 60 + s.tp);
          ctx.fillStyle = "#fff";
          ctx.beginPath();
          ctx.arc(s.x % g.W, s.y % g.H, s.r, 0, 6.28);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
        return;
      }

      const { ship, keys, mouse, joy: js, cam } = g;
      if (keys["w"] || keys["arrowup"]) ship.vy -= ACCEL;
      if (keys["s"] || keys["arrowdown"]) ship.vy += ACCEL;
      if (keys["a"] || keys["arrowleft"]) ship.vx -= ACCEL;
      if (keys["d"] || keys["arrowright"]) ship.vx += ACCEL;
      if (mouse.down) {
        const dx = mouse.x - g.W / 2;
        const dy = mouse.y - g.H / 2;
        const d = Math.hypot(dx, dy);
        if (d > 20) {
          ship.vx += (dx / d) * 0.02;
          ship.vy += (dy / d) * 0.02;
        }
      }
      if (js.active) {
        ship.vx += js.dx * ACCEL;
        ship.vy += js.dy * ACCEL;
      }
      ship.vx *= FRICTION;
      ship.vy *= FRICTION;
      const spd = Math.hypot(ship.vx, ship.vy);
      if (spd > MAX_SPEED) {
        ship.vx = (ship.vx / spd) * MAX_SPEED;
        ship.vy = (ship.vy / spd) * MAX_SPEED;
      }
      ship.x = Math.max(40, Math.min(WORLD - 40, ship.x + ship.vx));
      ship.y = Math.max(40, Math.min(WORLD - 40, ship.y + ship.vy));
      if (spd > 0.3) ship.angle = Math.atan2(ship.vy, ship.vx);
      cam.x = ship.x - g.W / 2;
      cam.y = ship.y - g.H / 2;

      if (spd > 0.5)
        for (let i = 0; i < 2; i++)
          g.thrust.push({
            x: ship.x - Math.cos(ship.angle) * 10,
            y: ship.y - Math.sin(ship.angle) * 10,
            vx: -Math.cos(ship.angle) * (0.8 + Math.random() * 0.6) + (Math.random() - 0.5) * 0.5,
            vy: -Math.sin(ship.angle) * (0.8 + Math.random() * 0.6) + (Math.random() - 0.5) * 0.5,
            life: 1,
            r: Math.random() * 1.8 + 0.8,
          });
      g.thrust = g.thrust.filter((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.03;
        return p.life > 0;
      });

      for (const s of farStars) {
        let sx = (s.x - cam.x * 0.3) % g.W;
        let sy = (s.y - cam.y * 0.3) % g.H;
        if (sx < 0) sx += g.W;
        if (sy < 0) sy += g.H;
        ctx.globalAlpha = s.b;
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(sx, sy, s.r, 0, 6.28);
        ctx.fill();
      }
      for (const n of nebulae) {
        const nx = n.x - cam.x;
        const ny = n.y - cam.y;
        if (nx < -n.r * 2 || nx > g.W + n.r * 2 || ny < -n.r * 2 || ny > g.H + n.r * 2) continue;
        const grad = ctx.createRadialGradient(nx, ny, 0, nx, ny, n.r);
        grad.addColorStop(0, `rgba(${n.c},${n.o})`);
        grad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.globalAlpha = 1;
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(nx, ny, n.r, 0, 6.28);
        ctx.fill();
      }
      for (const s of stars) {
        const sx = s.x - cam.x;
        const sy = s.y - cam.y;
        if (sx < -5 || sx > g.W + 5 || sy < -5 || sy > g.H + 5) continue;
        ctx.globalAlpha = 0.4 + 0.4 * Math.sin(g.time * s.tw * 60 + s.tp);
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(sx, sy, s.r, 0, 6.28);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      for (const p of PLANETS) {
        const px = p.x - cam.x;
        const py = p.y - cam.y;
        if (px < -250 || px > g.W + 250 || py < -250 || py > g.H + 250) continue;
        const gl = ctx.createRadialGradient(px, py, p.r * 0.3, px, py, p.r * 3.5);
        gl.addColorStop(0, `rgba(${p.glow},0.12)`);
        gl.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = gl;
        ctx.beginPath();
        ctx.arc(px, py, p.r * 3.5, 0, 6.28);
        ctx.fill();
        const pr = p.r + 18 + Math.sin(g.time * 1.8) * 10;
        ctx.strokeStyle = `rgba(${p.glow},${0.08 + Math.sin(g.time * 1.8) * 0.04})`;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.arc(px, py, pr, 0, 6.28);
        ctx.stroke();
        if (p.rings && p.rc) {
          ctx.save();
          ctx.translate(px, py);
          ctx.scale(1, 0.28);
          ctx.strokeStyle = p.rc;
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.arc(0, 0, p.r + 22, 0, 6.28);
          ctx.stroke();
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(0, 0, p.r + 30, 0, 6.28);
          ctx.stroke();
          ctx.restore();
        }
        const bg = ctx.createRadialGradient(px - p.r * 0.3, py - p.r * 0.3, p.r * 0.1, px, py, p.r);
        bg.addColorStop(0, p.color);
        bg.addColorStop(1, `rgba(${p.glow},0.35)`);
        ctx.fillStyle = bg;
        ctx.beginPath();
        ctx.arc(px, py, p.r, 0, 6.28);
        ctx.fill();
        if (g.discovered.has(p.id)) {
          ctx.strokeStyle = "#10b981";
          ctx.lineWidth = 2;
          ctx.setLineDash([4, 4]);
          ctx.beginPath();
          ctx.arc(px, py, p.r + 10, 0, 6.28);
          ctx.stroke();
          ctx.setLineDash([]);
        }
        for (const o of p.orb) {
          o.a += o.s;
          const ox = px + Math.cos(o.a) * o.d;
          const oy = py + Math.sin(o.a) * o.d;
          ctx.fillStyle = o.c;
          ctx.globalAlpha = 0.6;
          ctx.beginPath();
          ctx.arc(ox, oy, o.r, 0, 6.28);
          ctx.fill();
          ctx.globalAlpha = 1;
          ctx.strokeStyle = `rgba(${p.glow},0.05)`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.arc(px, py, o.d, 0, 6.28);
          ctx.stroke();
        }
        ctx.font = '700 12px "Space Mono", monospace';
        ctx.textAlign = "center";
        ctx.fillStyle = "#fff";
        ctx.globalAlpha = 0.85;
        ctx.fillText(p.name, px, py + p.r + 26);
        const dts = Math.hypot(ship.x - p.x, ship.y - p.y);
        if (dts < p.r + 100) {
          ctx.font = '400 10px "Space Mono", monospace';
          ctx.fillStyle = p.color;
          ctx.globalAlpha = 0.5 + Math.sin(g.time * 3.5) * 0.3;
          ctx.fillText("[ CLICK TO EXPLORE ]", px, py + p.r + 42);
          if (dts < p.r + 60 && !p._near) {
            p._near = true;
            playTone(520, 0.15, 0.03);
          }
        } else {
          p._near = false;
        }
        ctx.globalAlpha = 1;
      }

      for (const p of g.thrust) {
        ctx.globalAlpha = p.life * 0.5;
        ctx.fillStyle = "#10b981";
        ctx.beginPath();
        ctx.arc(p.x - cam.x, p.y - cam.y, p.r * p.life, 0, 6.28);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // Ship
      const sx = ship.x - cam.x;
      const sy = ship.y - cam.y;
      ctx.save();
      ctx.translate(sx, sy);
      ctx.rotate(ship.angle + 1.5708);
      const sg = ctx.createRadialGradient(0, 0, 2, 0, 0, 18);
      sg.addColorStop(0, "rgba(16,185,129,0.15)");
      sg.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = sg;
      ctx.beginPath();
      ctx.arc(0, 0, 18, 0, 6.28);
      ctx.fill();
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.moveTo(0, -11);
      ctx.lineTo(-6, 9);
      ctx.lineTo(0, 5);
      ctx.lineTo(6, 9);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "#10b981";
      ctx.beginPath();
      ctx.moveTo(0, -5);
      ctx.lineTo(-3, 4);
      ctx.lineTo(0, 2);
      ctx.lineTo(3, 4);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // HUD readouts (imperative to avoid re-render churn)
      if (coordsRef.current)
        coordsRef.current.textContent = `X:${Math.round(ship.x)} Y:${Math.round(ship.y)}`;
      const mm = minimapRef.current;
      const ms = mmShipRef.current;
      if (mm && ms) {
        ms.style.left = `${(ship.x / WORLD) * (mm.offsetWidth - 5)}px`;
        ms.style.top = `${(ship.y / WORLD) * (mm.offsetHeight - 5)}px`;
      }
    };
    loop();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [playTone]);

  // Canvas pointer handlers
  const hitPlanet = useCallback(
    (clientX: number, clientY: number) => {
      const g = game.current;
      if (!g.started) return;
      const rect = canvasRef.current?.getBoundingClientRect();
      const mx = clientX - (rect?.left ?? 0) + g.cam.x;
      const my = clientY - (rect?.top ?? 0) + g.cam.y;
      for (const p of PLANETS) {
        if (Math.hypot(mx - p.x, my - p.y) < p.r + 50) {
          openPlanet(p.id);
          break;
        }
      }
    },
    [openPlanet]
  );

  const modalDef = modal ? PLANET_CONTENT[modal] : null;

  return (
    <div id="game-section" ref={sectionRef}>
      <canvas
        ref={canvasRef}
        onMouseDown={(e) => {
          if (e.button === 0) {
            game.current.mouse.down = true;
            game.current.mouse.x = e.clientX;
            game.current.mouse.y = e.clientY;
          }
        }}
        onMouseMove={(e) => {
          if (game.current.mouse.down) {
            game.current.mouse.x = e.clientX;
            game.current.mouse.y = e.clientY;
          }
        }}
        onMouseUp={() => (game.current.mouse.down = false)}
        onMouseLeave={() => (game.current.mouse.down = false)}
        onClick={(e) => hitPlanet(e.clientX, e.clientY)}
        onTouchEnd={(e) => {
          const t = e.changedTouches[0];
          if (t) hitPlanet(t.clientX, t.clientY);
        }}
      />

      {/* INTRO */}
      <div className={`intro${started ? " hidden" : ""}`}>
        <div className="intro-logo">
          <span>{"{"}</span>PK<span>{"}"}</span>
        </div>
        <div className="intro-sub">
          Welcome to my universe.
          <br />
          Explore planets to discover my work &amp; story.
        </div>
        <button className="intro-btn" onClick={start}>
          LAUNCH MISSION ▸
        </button>
        <div className="intro-keys">
          {isMobile ? "Joystick to fly • Tap planets" : "WASD / Arrow Keys to fly • Click planets"}
        </div>
        <div className="intro-ps">
          {INTRO_PLANETS.map((p) => (
            <div className="intro-ph" key={p.name}>
              <div className="intro-pd" style={{ borderColor: p.color, background: p.bg }} />
              <div className="intro-pn">{p.name}</div>
            </div>
          ))}
        </div>
        <div className="intro-scroll">
          <div className="intro-scroll-t">OR SCROLL DOWN FOR PORTFOLIO</div>
          <div className="intro-scroll-a" />
        </div>
      </div>

      {/* HUD */}
      <div className="hud" style={{ opacity: started ? 1 : 0 }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div className="hud-logo">
            <span>{"{"}</span>PK<span>{"}"}</span>
          </div>
          <div className="hud-coords" ref={coordsRef}>
            X:0 Y:0
          </div>
        </div>
        <div className="hud-disc">
          DISCOVERED: <b>{discovered.size}</b>/6
        </div>
      </div>

      {/* WASD indicator */}
      <div className="wasd">
        <div className="wasd-row">
          <div className={`wk${activeKeys.w ? " active" : ""}`}>W</div>
        </div>
        <div className="wasd-row">
          <div className={`wk${activeKeys.a ? " active" : ""}`}>A</div>
          <div className={`wk${activeKeys.s ? " active" : ""}`}>S</div>
          <div className={`wk${activeKeys.d ? " active" : ""}`}>D</div>
        </div>
        <div className="wasd-label">MOVE</div>
      </div>

      {/* Mobile joystick */}
      <div className="joy" ref={joyRef}>
        <div className="joy-t" ref={joyThumbRef} />
      </div>

      {/* Minimap */}
      <div className="mm-lbl" style={{ opacity: started ? 1 : 0 }}>
        RADAR
      </div>
      <div className="mm" ref={minimapRef} style={{ opacity: started ? 1 : 0 }}>
        <div className="mm-ship" ref={mmShipRef} />
      </div>

      {/* Scroll hint */}
      <div className={`scroll-hint${showScrollHint ? " show" : ""}`}>
        <div className="scroll-hint-t">SCROLL FOR PORTFOLIO</div>
        <div className="scroll-hint-a" />
      </div>

      {/* Planet modal */}
      <AnimatePresence>
        {modalDef && (
          <motion.div
            className="mo"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => {
              if (e.target === e.currentTarget) setModal(null);
            }}
          >
            <motion.div
              className="mod"
              initial={{ opacity: 0, y: 16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <button className="mod-x" onClick={() => setModal(null)} aria-label="Close">
                ×
              </button>
              <div className="mod-tag" style={{ color: modalDef.color }}>
                {modalDef.tag}
              </div>
              <div className="mod-title">{modalDef.title}</div>
              {modalDef.body}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
