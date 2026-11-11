"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";

const DURATION = 0.6;
const HOLD = 0.1;
const EXIT = 0.5;
const MARK = 84;
const GAP = 3;
const STORAGE_KEY = "strata-loader-seen";
const EASE = "cubic-bezier(0.76, 0, 0.24, 1)";

const hash = (i: number, seed: number) => {
  const n = Math.sin(i * 127.1 + seed * 311.7) * 43758.5453;
  return n - Math.floor(n);
};
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

const rows = site.loader.grid;
const cols = Math.max(...rows.map((r) => r.length));
const cells = rows.flatMap((row, y) =>
  Array.from(row).flatMap((c, x) => (c === "0" ? [] : [{ x, y, accent: c === "2" }])),
);
const size = (MARK - GAP * (cols - 1)) / cols;

/** Once-per-session intro: the logo flickers on pixel by pixel, then the screen slides away. */
export function Loader() {
  const root = useRef<HTMLDivElement>(null);
  const mark = useRef<HTMLDivElement>(null);
  const pixels = useRef<(HTMLDivElement | null)[]>([]);
  const counter = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    let seen = false;
    try {
      seen = window.sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {}
    if (seen) {
      setFinished(true);
      return;
    }
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    const html = document.documentElement;
    const previous = html.style.overflow;
    html.style.overflow = "hidden";
    const unlock = () => {
      html.style.overflow = previous;
    };

    const thresholds = cells.map((_, i) => 0.05 + hash(i, 3.1) * 0.75);
    const phases = cells.map((_, i) => hash(i, 9.7) * 100);
    const total = Math.max(0.4, reduced ? Math.min(DURATION, 0.8) : DURATION) * 1000;
    const start = performance.now();
    let raf = 0;
    let timer = 0;
    let lastPct = -1;

    const exit = () => {
      try {
        window.sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {}
      el.style.pointerEvents = "none";
      const ms = (reduced ? 0.35 : EXIT) * 1000;
      const m = mark.current;
      if (m && !reduced) {
        m.style.transition = `transform ${ms * 0.8}ms ${EASE}, opacity ${ms * 0.6}ms ease`;
        m.style.transform = "translateY(-40px) scale(0.96)";
        m.style.opacity = "0";
      }
      if (reduced) {
        el.style.transition = `opacity ${ms}ms ease`;
        el.style.opacity = "0";
      } else {
        el.style.transition = `transform ${ms}ms ${EASE}`;
        el.style.transform = "translate3d(0,-100%,0)";
      }
      unlock();
      timer = window.setTimeout(() => {
        el.style.display = "none";
        setFinished(true);
      }, ms + 60);
    };

    const frame = (now: number) => {
      const t = Math.min(1, (now - start) / total);
      const p = easeInOutCubic(t);
      const pct = Math.round(p * 100);
      if (pct !== lastPct) {
        lastPct = pct;
        if (counter.current) counter.current.textContent = String(pct).padStart(3, "0");
      }
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
      for (let i = 0; i < cells.length; i++) {
        const pixel = pixels.current[i];
        if (!pixel) continue;
        const threshold = thresholds[i];
        let opacity = 0;
        if (p >= threshold + 0.12 || t >= 1) {
          opacity = 1;
        } else if (p >= threshold) {
          const local = (p - threshold) / 0.12;
          opacity = reduced ? local : Math.sin(now * 0.05 + phases[i]) > 0.2 - local * 1.2 ? 1 : 0.12;
        }
        pixel.style.opacity = String(opacity);
      }
      if (t < 1) raf = requestAnimationFrame(frame);
      else timer = window.setTimeout(exit, Math.max(0, HOLD) * 1000);
    };
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timer);
      unlock();
    };
  }, []);

  const label: React.CSSProperties = { fontFamily: "var(--mono)", fontWeight: 400, fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", lineHeight: 1.2 };

  return (
    <div style={{ position: "fixed", left: 0, top: 0, width: "100%", height: "100vh", pointerEvents: "none" }}>
      <div
        ref={root}
        aria-hidden={finished}
        role="status"
        aria-label="Loading"
        style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden", background: "var(--bg)", display: finished ? "none" : "block", pointerEvents: finished ? "none" : "auto", willChange: "transform, opacity" }}
      >
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div ref={mark} style={{ position: "relative", width: MARK, height: (size + GAP) * rows.length - GAP }}>
            {cells.map((cell, i) => (
              <div
                key={`${cell.x}-${cell.y}`}
                ref={(el) => {
                  pixels.current[i] = el;
                }}
                style={{
                  position: "absolute",
                  left: cell.x * (size + GAP),
                  top: cell.y * (size + GAP),
                  width: size,
                  height: size,
                  borderRadius: 1,
                  background: cell.accent ? "var(--accent)" : "var(--text)",
                  boxShadow: cell.accent ? `0 0 ${size}px rgba(255, 90, 31, 0.4)` : undefined,
                  opacity: 0,
                }}
              />
            ))}
          </div>
        </div>
        <div style={{ ...label, position: "absolute", left: 32, right: 32, bottom: 32, display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={{ color: "var(--text)" }}>{site.loader.label}</span>
            <span style={{ color: "var(--muted)" }}>{site.loader.caption}</span>
          </div>
          <div style={{ color: "var(--text)", fontSize: 13, display: "flex", alignItems: "baseline", gap: 2 }}>
            <span ref={counter} style={{ fontVariantNumeric: "tabular-nums" }}>
              000
            </span>
            <span style={{ color: "var(--accent)" }}>%</span>
          </div>
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 2, background: "rgba(138, 141, 148, 0.133)" }}>
          <div ref={bar} style={{ width: "100%", height: "100%", background: "var(--accent)", transform: "scaleX(0)", transformOrigin: "0 50%" }} />
        </div>
      </div>
    </div>
  );
}
