"use client";

import { useEffect, useRef, useState } from "react";

const PHOTO = "/about/foto.webp";
const CELL = 6;
const SIZE = CELL;
const TILES = 25; // tiles per side: a 150px portrait
const GRAVITY = 1500;
const BOUNCE = 0.45;
const REPEL_RADIUS = 60;
const BROKEN_FOR = 1900;

type Copy = { label: string; hint: string; broken: string; fixing: string; fixed: string; again: string; cursor: string };
type Piece = { hx: number; hy: number; x: number; y: number; vx: number; vy: number; r: number; vr: number; delay: number; col: number; row: number };
type Mode = "idle" | "broken" | "repair";

/** Cuts the portrait into a round mosaic of square tiles. */
function buildPieces() {
  const pieces: Piece[] = [];
  const mid = (TILES - 1) / 2;
  for (let row = 0; row < TILES; row++) {
    for (let col = 0; col < TILES; col++) {
      if (Math.hypot(col - mid, row - mid) > TILES / 2) continue;
      const hx = (col - TILES / 2) * CELL;
      const hy = (row - TILES / 2) * CELL;
      pieces.push({ hx, hy, x: hx, y: hy, vx: 0, vy: 0, r: 0, vr: 0, delay: 0, col, row });
    }
  }
  return pieces;
}

/** A tiled portrait that shies away from the pointer, shatters on click and puts itself back together. */
export function BreakableMonogram({ copy }: { copy: Copy }) {
  const [message, setMessage] = useState(copy.hint);
  const button = useRef<HTMLButtonElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = canvas.current;
    const host = button.current;
    const ctx = el?.getContext("2d");
    if (!el || !host || !ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pieces = buildPieces();
    const img = new Image();
    img.decoding = "async";
    img.src = PHOTO;
    const pointer = { x: 0, y: 0, on: false };
    let width = 1;
    let height = 1;
    let cx = 0;
    let cy = 0;
    let mode: Mode = "idle";
    let raf = 0;
    let last = 0;
    let breaks = 0;
    let timer = 0;
    let repairStart = 0;

    const draw = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);
      if (!img.complete || !img.naturalWidth) return;
      const src = img.naturalWidth / TILES;
      for (const p of pieces) {
        ctx.save();
        ctx.translate(cx + p.x + SIZE / 2, cy + p.y + SIZE / 2);
        ctx.rotate(p.r);
        // A hair of overlap hides the seams between tiles while the photo is whole.
        ctx.drawImage(img, p.col * src, p.row * src, src, src, -SIZE / 2, -SIZE / 2, SIZE + 0.4, SIZE + 0.4);
        ctx.restore();
      }
    };

    const step = (now: number) => {
      const dt = Math.min(0.033, (now - last) / 1000 || 0.016);
      last = now;
      let settled = !pointer.on || mode === "repair";
      for (const p of pieces) {
        // No dodging during a repair, or it would never finish while the mouse is over it.
        if (pointer.on && mode !== "repair") {
          const dx = cx + p.x - pointer.x;
          const dy = cy + p.y - pointer.y;
          const d = Math.hypot(dx, dy) || 1;
          if (d < REPEL_RADIUS) {
            const push = (1 - d / REPEL_RADIUS) * 2600 * dt;
            p.vx += (dx / d) * push;
            p.vy += (dy / d) * push;
          }
        }
        if (mode === "broken") {
          p.vy += GRAVITY * dt;
          p.vx *= 0.995;
          p.x += p.vx * dt;
          p.y += p.vy * dt;
          p.r += p.vr * dt;
          const left = -cx;
          const right = width - cx - SIZE;
          const floor = height - cy - SIZE;
          if (p.x < left || p.x > right) {
            p.x = Math.min(right, Math.max(left, p.x));
            p.vx *= -BOUNCE;
          }
          if (p.y > floor) {
            p.y = floor;
            p.vy *= -BOUNCE;
            p.vx *= 0.82;
            p.vr *= 0.7;
          }
          settled = false;
          continue;
        }
        const active = mode === "idle" || now - repairStart > p.delay;
        if (active) {
          const k = mode === "repair" ? 120 : 150;
          p.vx += (p.hx - p.x) * k * dt;
          p.vy += (p.hy - p.y) * k * dt;
          const damp = Math.exp(-dt * (mode === "repair" ? 10 : 12));
          p.vx *= damp;
          p.vy *= damp;
          p.x += p.vx * dt;
          p.y += p.vy * dt;
          p.r += (0 - p.r) * Math.min(1, dt * 8);
        }
        const tolerance = mode === "repair" ? 3 : 0.2;
        if (Math.abs(p.x - p.hx) + Math.abs(p.y - p.hy) + Math.abs(p.vx) + Math.abs(p.vy) + Math.abs(p.r) > tolerance) settled = false;
      }
      if (mode === "repair" && settled) {
        mode = "idle";
        host.parentElement?.removeAttribute("data-broken");
        setMessage(breaks > 1 ? copy.again : copy.fixed);
        settled = false;
      }
      draw();
      raf = settled ? 0 : requestAnimationFrame(step);
    };

    const wake = () => {
      if (raf) return;
      last = performance.now();
      raf = requestAnimationFrame(step);
    };

    const resize = () => {
      const r = el.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = r.width;
      height = r.height;
      el.width = Math.round(width * dpr);
      el.height = Math.round(height * dpr);
      cx = width / 2;
      cy = height / 2;
      draw();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    resize();
    img.addEventListener("load", draw);

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = el.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
      pointer.on = true;
      wake();
    };
    const onLeave = () => {
      pointer.on = false;
      wake();
    };
    const onClick = (e: MouseEvent) => {
      if (reduced) return;
      const r = el.getBoundingClientRect();
      // A keyboard click reports no coordinates, so it breaks from the centre.
      const originX = e.detail === 0 ? cx : e.clientX - r.left;
      const originY = e.detail === 0 ? cy : e.clientY - r.top;
      breaks++;
      mode = "broken";
      host.parentElement?.setAttribute("data-broken", "");
      setMessage(copy.broken);
      for (const p of pieces) {
        const dx = cx + p.x - originX;
        const dy = cy + p.y - originY;
        const d = Math.hypot(dx, dy) || 1;
        const speed = 150 + Math.random() * 240;
        p.vx = (dx / d) * speed + (Math.random() - 0.5) * 90;
        p.vy = (dy / d) * speed - 130 - Math.random() * 150;
        p.vr = (Math.random() - 0.5) * 12;
      }
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        mode = "repair";
        repairStart = performance.now();
        for (const p of pieces) p.delay = Math.random() * 420;
        setMessage(copy.fixing);
        wake();
      }, BROKEN_FOR);
      wake();
    };

    if (!reduced) {
      host.addEventListener("pointermove", onMove);
      host.addEventListener("pointerleave", onLeave);
      host.addEventListener("click", onClick);
    }
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timer);
      ro.disconnect();
      img.removeEventListener("load", draw);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      host.removeEventListener("click", onClick);
    };
  }, [copy]);

  return (
    <button ref={button} type="button" className="about-break" aria-label={copy.label} data-cursor={copy.cursor} data-cursor-big>
      <canvas ref={canvas} aria-hidden />
      <span className="mono-11 about-break-note" aria-live="polite">
        {message}
      </span>
    </button>
  );
}
