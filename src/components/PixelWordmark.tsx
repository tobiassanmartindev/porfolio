"use client";

import { useEffect, useRef } from "react";
import { GLYPHS } from "./wordmark-glyphs";

const P = {
  accent: "rgb(255, 90, 31)",
  accentRatio: 0.03,
  assembleDuration: 1.8,
  damping: 0.86,
  dotColor: "rgb(242, 242, 240)",
  dotScale: 0.72,
  dotsPerPixel: 3,
  ghostOpacity: 0.07,
  letterSpacing: 1,
  pointerForce: 1,
  pointerRadius: 2.2,
  stiffness: 0.045,
};

const hash = (i: number, seed: number) => {
  const n = Math.sin(i * 12.9898 + seed * 78.233) * 43758.5453;
  return n - Math.floor(n);
};

function glyph(char: string) {
  const rows = GLYPHS[char] ?? GLYPHS[" "];
  const width = rows[0].length;
  if (char === " ") return { rows, x0: 0, w: width };
  let min = width;
  let max = -1;
  for (const row of rows) {
    for (let i = 0; i < row.length; i++) {
      if (row[i] === "1") {
        if (i < min) min = i;
        if (i > max) max = i;
      }
    }
  }
  return max < 0 ? { rows, x0: 0, w: width } : { rows, x0: min, w: max - min + 1 };
}

function layout(text: string, w: number, h: number) {
  const glyphs = Array.from((text || " ").toUpperCase()).map(glyph);
  const spacing = Math.max(0, P.letterSpacing);
  const total = glyphs.reduce((sum, g) => sum + g.w, 0) + spacing * Math.max(0, glyphs.length - 1);
  const pixel = Math.max(1, Math.min(w / Math.max(1, total), h / 7));
  const dots = Math.max(1, Math.round(P.dotsPerPixel));
  const cell = pixel / dots;
  const left = (w - total * pixel) / 2;
  const top = h - 7 * pixel; // bottom aligned
  const xs: number[] = [];
  const ys: number[] = [];
  const accent: number[] = [];
  const ghost: { x: number; y: number }[] = [];
  let cursor = 0;
  for (const g of glyphs) {
    for (let row = 0; row < 7; row++) {
      for (let col = 0; col < g.w; col++) {
        const on = g.rows[row][g.x0 + col] === "1";
        const px = left + (cursor + col) * pixel;
        const py = top + row * pixel;
        for (let dy = 0; dy < dots; dy++) {
          for (let dx = 0; dx < dots; dx++) {
            const x = px + (dx + 0.5) * cell;
            const y = py + (dy + 0.5) * cell;
            if (on) {
              const index = xs.length;
              xs.push(x);
              ys.push(y);
              accent.push(+(hash(index, 4.2) < P.accentRatio));
            } else {
              ghost.push({ x, y });
            }
          }
        }
      }
    }
    cursor += g.w + spacing;
  }
  const n = xs.length;
  return {
    n,
    hx: Float32Array.from(xs),
    hy: Float32Array.from(ys),
    x: Float32Array.from(xs),
    y: Float32Array.from(ys),
    vx: new Float32Array(n),
    vy: new Float32Array(n),
    delay: new Float32Array(n),
    accent: Uint8Array.from(accent),
    ghost,
    dot: cell * Math.min(1, Math.max(0.1, P.dotScale)),
    pixel,
  };
}

/** Footer wordmark built from dots that assemble on view and scatter around the pointer. */
export function PixelWordmark({ text }: { text: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    let W = 1;
    let H = 1;
    let dpr = 1;
    let data: ReturnType<typeof layout> | null = null;
    let ghostLayer: HTMLCanvasElement | null = null;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = Math.max(1, canvas.clientWidth);
      H = Math.max(1, canvas.clientHeight);
      const pw = Math.round(W * dpr);
      const ph = Math.round(H * dpr);
      if (canvas.width !== pw || canvas.height !== ph) {
        canvas.width = pw;
        canvas.height = ph;
      }
      data = layout(text, W, H);
      ghostLayer = null;
    };
    const dot = (c: CanvasRenderingContext2D, x: number, y: number, r: number) => {
      c.moveTo(x + r, y);
      c.arc(x, y, r, 0, Math.PI * 2);
    };
    const buildGhost = () => {
      if (!data || P.ghostOpacity <= 0) return null;
      const layer = document.createElement("canvas");
      layer.width = canvas.width;
      layer.height = canvas.height;
      const c = layer.getContext("2d");
      if (!c) return null;
      c.setTransform(dpr, 0, 0, dpr, 0, 0);
      c.fillStyle = P.dotColor;
      c.globalAlpha = P.ghostOpacity;
      c.beginPath();
      const r = data.dot / 2;
      for (const g of data.ghost) dot(c, g.x, g.y, r);
      c.fill();
      return layer;
    };
    const paint = (time: number) => {
      const d = data;
      if (!d) return;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (P.ghostOpacity > 0) {
        ghostLayer ||= buildGhost();
        if (ghostLayer) ctx.drawImage(ghostLayer, 0, 0);
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const r = d.dot / 2;
      const settled = time === Infinity;
      for (let colour = 0; colour < 2; colour++) {
        ctx.fillStyle = colour === 0 ? P.dotColor : P.accent;
        if (settled) {
          ctx.globalAlpha = 1;
          ctx.beginPath();
          for (let i = 0; i < d.n; i++) if (d.accent[i] === colour) dot(ctx, d.x[i], d.y[i], r);
          ctx.fill();
        } else {
          for (let step = 1; step <= 4; step++) {
            const low = (step - 1) / 4;
            const high = step / 4;
            ctx.globalAlpha = high;
            ctx.beginPath();
            let any = false;
            for (let i = 0; i < d.n; i++) {
              if (d.accent[i] !== colour) continue;
              const a = Math.min(1, Math.max(0, (time - d.delay[i]) / 0.35));
              if (a > low && a <= high) {
                dot(ctx, d.x[i], d.y[i], r);
                any = true;
              }
            }
            if (any) ctx.fill();
          }
        }
      }
      ctx.globalAlpha = 1;
    };

    resize();
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    let done = reduced;
    let startedAt = -1;
    let inView = false;
    let awake = true;
    let raf = 0;
    let last = performance.now();
    const pointer = { cx: 0, cy: 0, active: false };
    const wake = () => {
      awake = true;
    };
    const scatter = () => {
      const d = data;
      if (!d) return;
      const duration = Math.max(0.2, P.assembleDuration);
      for (let i = 0; i < d.n; i++) {
        const angle = hash(i, 1.3) * Math.PI * 2;
        const dist = (0.3 + hash(i, 2.7)) * Math.max(W, H) * 0.6;
        d.x[i] = W / 2 + Math.cos(angle) * dist;
        d.y[i] = H / 2 + Math.sin(angle) * dist * 0.6;
        d.vx[i] = 0;
        d.vy[i] = 0;
        d.delay[i] = (d.hx[i] / W) * duration * 0.45 + hash(i, 5.9) * duration * 0.35;
      }
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView && !done && startedAt < 0) {
          scatter();
          startedAt = performance.now();
        }
        if (inView) wake();
      },
      { threshold: 0.25 },
    );
    io.observe(canvas);
    const ro = new ResizeObserver(() => {
      resize();
      if (!done && startedAt >= 0) scatter();
      paint(done ? Infinity : 0);
      wake();
    });
    ro.observe(canvas);
    const onMove = (e: PointerEvent) => {
      pointer.cx = e.clientX;
      pointer.cy = e.clientY;
      pointer.active = true;
      wake();
    };
    const onLeave = () => {
      pointer.active = false;
      wake();
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const step = Math.min(3, (now - last) / 16.667);
      last = now;
      const d = data;
      if (!inView || !d || !awake) return;
      const time = startedAt < 0 ? (done ? Infinity : -1) : (now - startedAt) / 1000;
      if (time < 0) return;
      let px = -1e9;
      let py = -1e9;
      const interacting = pointer.active && !reduced;
      if (interacting) {
        const rect = canvas.getBoundingClientRect();
        px = pointer.cx - rect.left;
        py = pointer.cy - rect.top;
      }
      const radius = Math.max(1, P.pointerRadius * d.pixel);
      const radius2 = radius * radius;
      const force = P.pointerForce * d.pixel * 0.35;
      const damp = P.damping ** step;
      let energy = 0;
      for (let i = 0; i < d.n; i++) {
        if (time !== Infinity && time < d.delay[i]) {
          energy += 1;
          continue;
        }
        let ax = (d.hx[i] - d.x[i]) * P.stiffness;
        let ay = (d.hy[i] - d.y[i]) * P.stiffness;
        if (interacting) {
          const dx = d.x[i] - px;
          const dy = d.y[i] - py;
          const dist2 = dx * dx + dy * dy;
          if (dist2 < radius2 && dist2 > 1e-4) {
            const dist = Math.sqrt(dist2);
            const falloff = 1 - dist / radius;
            const push = falloff * falloff * force;
            ax += (dx / dist) * push;
            ay += (dy / dist) * push;
          }
        }
        d.vx[i] = (d.vx[i] + ax * step) * damp;
        d.vy[i] = (d.vy[i] + ay * step) * damp;
        d.x[i] += d.vx[i] * step;
        d.y[i] += d.vy[i] * step;
        energy += Math.abs(d.vx[i]) + Math.abs(d.vy[i]) + Math.abs(d.hx[i] - d.x[i]) * 0.1 + Math.abs(d.hy[i] - d.y[i]) * 0.1;
      }
      if (!done && (time === Infinity || time > Math.max(0.2, P.assembleDuration) + 0.4)) done = true;
      paint(done ? Infinity : time);
      if (done && energy < 0.02 * Math.max(1, d.n * 0.01)) {
        for (let i = 0; i < d.n; i++) {
          d.x[i] = d.hx[i];
          d.y[i] = d.hy[i];
          d.vx[i] = 0;
          d.vy[i] = 0;
        }
        paint(Infinity);
        awake = false;
      }
    };
    if (done) paint(Infinity);
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
    };
  }, [text]);

  return <canvas ref={ref} role="img" aria-label={text} style={{ width: "100%", height: "100%", display: "block", touchAction: "pan-y" }} />;
}
