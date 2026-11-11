"use client";

import { useEffect, useRef } from "react";

const GRAVITY = 1500;
const BOUNCE = 0.45;
const REPEL_RADIUS = 56;
const BROKEN_FOR = 1900;
const REPAIR_STIFFNESS = 120;
const REPAIR_DAMPING = 10;
const REPAIR_STAGGER = 420;
const SHARD = 96;
const SPEED_MIN = 130;
const SPEED_RANGE = 210;
const SCATTER = 70;
const LIFT_MIN = 110;
const LIFT_RANGE = 130;
const MAX_DPR = 1.5;
const CLICK_SLOP = 6;
const SPRITE_PADDING = 4;

type Piece = {
  kind: "text" | "box" | "shard";
  hx: number;
  hy: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  vr: number;
  w: number;
  h: number;
  delay: number;
  char: string;
  font: string;
  color: string;
  ascent: number;
  fill: string;
  stroke: string;
  radius: number | number[];
};
type Group = { pieces: Piece[]; hidden: Element; left: number; right: number; floor: number; repairAt: number; settled: boolean };

const isTransparent = (color: string) => color === "transparent" || /rgba?\(.*,\s*0\)$/.test(color);

/**
 * Makes everything inside `selector` breakable: a click on a text or tile shatters it, and a click on the
 * empty part of a card shatters the whole card. Pieces are drawn on one canvas so it stays smooth with
 * hundreds of them, and the real elements are only hidden, never changed, until the pieces are back in place.
 */
export function BreakEngine({ selector, cards, floorOf, headOf }: { selector: string; cards: string; floorOf: string; headOf: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = canvas?.closest<HTMLElement>(selector);
    const ctx = canvas?.getContext("2d");
    if (!canvas || !section || !ctx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const groups = new Set<Group>();
    const measure = document.createElement("canvas").getContext("2d")!;
    const pointer = { x: 0, y: 0, on: false };
    const down = { x: 0, y: 0 };
    let raf = 0;
    let last = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;
    const fontCache = new Map<string, number>();

    const ascentOf = (font: string) => {
      let value = fontCache.get(font);
      if (value === undefined) {
        measure.font = font;
        value = measure.measureText("x").fontBoundingBoxAscent;
        fontCache.set(font, value);
      }
      return value;
    };
    // Drawing rotated text every frame is very slow, so each glyph is drawn once and then reused as an image.
    const sprites = new Map<string, HTMLCanvasElement>();
    const spriteOf = (p: Piece) => {
      const key = `${dpr}|${p.color}|${p.font}|${p.char}`;
      let sprite = sprites.get(key);
      if (sprite) return sprite;
      measure.font = p.font;
      const metrics = measure.measureText(p.char);
      const logicalW = Math.ceil(Math.max(p.w, metrics.width)) + SPRITE_PADDING * 2;
      const logicalH = Math.ceil(metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent) + SPRITE_PADDING * 2;
      sprite = document.createElement("canvas");
      sprite.width = Math.ceil(logicalW * dpr);
      sprite.height = Math.ceil(logicalH * dpr);
      const c = sprite.getContext("2d")!;
      c.scale(dpr, dpr);
      c.font = p.font;
      c.fillStyle = p.color;
      c.textBaseline = "alphabetic";
      c.fillText(p.char, SPRITE_PADDING, SPRITE_PADDING + p.ascent);
      sprites.set(key, sprite);
      return sprite;
    };
    const blank = (kind: Piece["kind"], x: number, y: number, w: number, h: number): Piece => ({
      kind, hx: x, hy: y, x, y, vx: 0, vy: 0, r: 0, vr: 0, w, h, delay: 0, char: "", font: "", color: "", ascent: 0, fill: "", stroke: "", radius: 0,
    });

    const collect = (root: Element, origin: DOMRect, into: Piece[]) => {
      const boxes: Element[] = root.matches(".about-tile") ? [root] : [];
      root.querySelectorAll("*").forEach((el) => {
        if (el.closest(".brk-hide") || el.tagName === "CANVAS") return;
        const cs = getComputedStyle(el);
        if (cs.visibility !== "hidden" && !isTransparent(cs.backgroundColor)) boxes.push(el);
      });
      for (const el of boxes) {
        const cs = getComputedStyle(el);
        const r = el.getBoundingClientRect();
        if (r.width < 1 || r.height < 1) continue;
        const piece = blank("box", r.left - origin.left + r.width / 2, r.top - origin.top + r.height / 2, r.width, r.height);
        piece.fill = cs.backgroundColor;
        piece.radius = parseFloat(cs.borderTopLeftRadius) || 0;
        piece.stroke = cs.boxShadow !== "none" ? "#24262b" : "";
        into.push(piece);
      }
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      const range = document.createRange();
      for (let node = walker.nextNode() as Text | null; node; node = walker.nextNode() as Text | null) {
        const parent = node.parentElement;
        if (!parent || parent.closest(".brk-hide") || parent.closest("[hidden]") || !node.data.trim()) continue;
        const cs = getComputedStyle(parent);
        const font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
        const ascent = ascentOf(font);
        const upper = cs.textTransform === "uppercase";
        let offset = 0;
        for (const char of node.data) {
          const start = offset;
          offset += char.length;
          if (!char.trim()) continue;
          range.setStart(node, start);
          range.setEnd(node, offset);
          const r = range.getClientRects()[0];
          if (!r || r.width < 0.5) continue;
          const piece = blank("text", r.left - origin.left + r.width / 2, r.top - origin.top + r.height / 2, r.width, r.height);
          piece.char = upper ? char.toUpperCase() : char;
          piece.font = font;
          piece.color = cs.color;
          piece.ascent = ascent;
          into.push(piece);
        }
      }
    };

    const shards = (card: Element, origin: DOMRect, into: Piece[]) => {
      const cs = getComputedStyle(card);
      const r = card.getBoundingClientRect();
      const radius = parseFloat(cs.borderTopLeftRadius) || 0;
      const columns = Math.max(2, Math.round(r.width / SHARD));
      const rows = Math.max(2, Math.round(r.height / SHARD));
      const w = r.width / columns;
      const h = r.height / rows;
      for (let row = 0; row < rows; row++) {
        for (let column = 0; column < columns; column++) {
          const piece = blank("shard", r.left - origin.left + (column + 0.5) * w, r.top - origin.top + (row + 0.5) * h, w + 0.5, h + 0.5);
          piece.fill = cs.backgroundColor;
          piece.stroke = "#24262b";
          piece.radius = [
            row === 0 && column === 0 ? radius : 0,
            row === 0 && column === columns - 1 ? radius : 0,
            row === rows - 1 && column === columns - 1 ? radius : 0,
            row === rows - 1 && column === 0 ? radius : 0,
          ];
          into.push(piece);
        }
      }
    };

    const prepareCanvas = () => {
      // The canvas only covers the viewport, so its cost doesn't grow with the length of the section.
      const r = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      width = r.width;
      height = r.height;
      const bufferW = Math.round(width * dpr);
      const bufferH = Math.round(height * dpr);
      if (canvas.width !== bufferW) canvas.width = bufferW;
      if (canvas.height !== bufferH) canvas.height = bufferH;
    };
    const releaseCanvas = () => {
      canvas.width = 0;
      canvas.height = 0;
    };

    const draw = () => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const origin = section.getBoundingClientRect();
      for (const group of groups) {
        for (const p of group.pieces) {
          const screenX = p.x + origin.left;
          const screenY = p.y + origin.top;
          const reach = Math.max(p.w, p.h);
          if (screenX < -reach || screenX > width + reach || screenY < -reach || screenY > height + reach) continue;
          const cos = Math.cos(p.r) * dpr;
          const sin = Math.sin(p.r) * dpr;
          ctx.setTransform(cos, sin, -sin, cos, screenX * dpr, screenY * dpr);
          if (p.kind === "text") {
            const sprite = spriteOf(p);
            ctx.drawImage(sprite, -p.w / 2 - SPRITE_PADDING, -p.h / 2 - SPRITE_PADDING, sprite.width / dpr, sprite.height / dpr);
            continue;
          }
          ctx.fillStyle = p.fill;
          ctx.beginPath();
          ctx.roundRect(-p.w / 2, -p.h / 2, p.w, p.h, p.radius);
          ctx.fill();
          const moved = Math.abs(p.x - p.hx) + Math.abs(p.y - p.hy) > 2;
          if (p.stroke && (p.kind === "box" || moved)) {
            ctx.strokeStyle = p.stroke;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
    };

    const step = (now: number) => {
      const dt = Math.min(0.033, (now - last) / 1000 || 0.016);
      last = now;
      for (const group of groups) {
        const repairing = now >= group.repairAt;
        let settled = repairing;
        for (const p of group.pieces) {
          // Pieces only dodge the pointer while broken, or a repair under the mouse would never finish.
          if (pointer.on && !repairing) {
            const dx = p.x - pointer.x;
            const dy = p.y - pointer.y;
            const d = Math.hypot(dx, dy) || 1;
            if (d < REPEL_RADIUS) {
              const push = (1 - d / REPEL_RADIUS) * 2600 * dt;
              p.vx += (dx / d) * push;
              p.vy += (dy / d) * push;
            }
          }
          if (!repairing || now - group.repairAt < p.delay) {
            p.vy += GRAVITY * dt;
            p.vx *= 0.995;
            p.x += p.vx * dt;
            p.y += p.vy * dt;
            p.r += p.vr * dt;
            const halfW = p.w / 2;
            const floor = group.floor - p.h / 2;
            const minX = group.left + halfW;
            const maxX = group.right - halfW;
            if (p.x < minX || p.x > maxX) {
              p.x = Math.min(maxX, Math.max(minX, p.x));
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
          p.vx += (p.hx - p.x) * REPAIR_STIFFNESS * dt;
          p.vy += (p.hy - p.y) * REPAIR_STIFFNESS * dt;
          const damp = Math.exp(-dt * REPAIR_DAMPING);
          p.vx *= damp;
          p.vy *= damp;
          p.x += p.vx * dt;
          p.y += p.vy * dt;
          p.r += (0 - p.r) * Math.min(1, dt * 8);
          if (Math.abs(p.x - p.hx) + Math.abs(p.y - p.hy) + Math.abs(p.vx) + Math.abs(p.vy) + Math.abs(p.r) > 3) settled = false;
        }
        group.settled = settled;
      }
      for (const group of [...groups]) {
        if (!group.settled) continue;
        group.hidden.classList.remove("brk-hide");
        groups.delete(group);
      }
      draw();
      if (groups.size) {
        raf = requestAnimationFrame(step);
      } else {
        raf = 0;
        releaseCanvas();
      }
    };

    const shatter = (target: Element, whole: boolean, bounds: DOMRect, floor: number, clientX: number, clientY: number) => {
      if (target.closest(".brk-hide")) return;
      prepareCanvas();
      const origin = section.getBoundingClientRect();
      const pieces: Piece[] = [];
      if (whole) shards(target, origin, pieces);
      collect(target, origin, pieces);
      if (!pieces.length) return;
      target.classList.add("brk-hide");
      const originX = clientX - origin.left;
      const originY = clientY - origin.top;
      for (const p of pieces) {
        const dx = p.x - originX;
        const dy = p.y - originY;
        const d = Math.hypot(dx, dy) || 1;
        const speed = SPEED_MIN + Math.random() * SPEED_RANGE;
        p.vx = (dx / d) * speed + (Math.random() - 0.5) * SCATTER;
        p.vy = (dy / d) * speed - LIFT_MIN - Math.random() * LIFT_RANGE;
        p.vr = (Math.random() - 0.5) * (p.kind === "shard" ? 4 : 10);
        p.delay = Math.random() * REPAIR_STAGGER;
      }
      groups.add({ pieces, hidden: target, left: bounds.left - origin.left, right: bounds.right - origin.left, floor, repairAt: performance.now() + BROKEN_FOR, settled: false });
      if (!raf) {
        last = performance.now();
        raf = requestAnimationFrame(step);
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      down.x = e.clientX;
      down.y = e.clientY;
    };
    const onClick = (e: MouseEvent) => {
      if (Math.hypot(e.clientX - down.x, e.clientY - down.y) > CLICK_SLOP) return;
      if (!(e.target instanceof Element)) return;
      const t = e.target;
      if (t.closest("a, button")) return;
      const origin = section.getBoundingClientRect();
      const card = t.closest(cards);
      const leaf = t.closest(".about-tile") ?? t.closest("p, h2, h3");
      // Pieces stay inside their own card, or above the grid for the section title.
      if (leaf && section.contains(leaf)) {
        const bounds = (card ?? section.querySelector(headOf) ?? section).getBoundingClientRect();
        const floor = card ? bounds.bottom : (section.querySelector(floorOf)?.getBoundingClientRect().top ?? bounds.bottom);
        shatter(leaf, false, bounds, floor - origin.top, e.clientX, e.clientY);
      } else if (card) {
        const bounds = card.getBoundingClientRect();
        shatter(card, true, bounds, bounds.bottom - origin.top, e.clientX, e.clientY);
      }
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const origin = section.getBoundingClientRect();
      pointer.x = e.clientX - origin.left;
      pointer.y = e.clientY - origin.top;
      pointer.on = true;
    };
    const onLeave = () => {
      pointer.on = false;
    };
    // If the layout changes the pieces no longer have a valid home, so everything is restored at once.
    const restoreAll = () => {
      for (const group of groups) group.hidden.classList.remove("brk-hide");
      groups.clear();
      cancelAnimationFrame(raf);
      raf = 0;
      releaseCanvas();
    };
    let lastWidth = section.clientWidth;
    const ro = new ResizeObserver(() => {
      if (section.clientWidth === lastWidth) return;
      lastWidth = section.clientWidth;
      restoreAll();
    });
    ro.observe(section);
    const onResize = () => {
      if (groups.size) prepareCanvas();
    };
    window.addEventListener("resize", onResize, { passive: true });

    section.addEventListener("pointerdown", onPointerDown, true);
    section.addEventListener("click", onClick);
    section.addEventListener("pointermove", onMove, { passive: true });
    section.addEventListener("pointerleave", onLeave);
    return () => {
      restoreAll();
      ro.disconnect();
      window.removeEventListener("resize", onResize);
      section.removeEventListener("pointerdown", onPointerDown, true);
      section.removeEventListener("click", onClick);
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
    };
  }, [selector, cards, floorOf, headOf]);

  return <canvas ref={canvasRef} className="brk-canvas" aria-hidden width={0} height={0} />;
}
