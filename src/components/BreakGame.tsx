"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

/** What counts as a brick. Only the outermost match is used, so a label and its input break together. */
const BRICKS =
  "h1, h2, h3, p, label, input, textarea, select, img, canvas, .divider";
const SKIP = ".nav, .wa-float, .cursor, .game-layer, .brk-canvas, .loader";
const TILE = 56;
const SHARD = 44;
const GRAVITY = 1500;
const BOUNCE = 0.4;
const LIVES = 3;
const BALL = 6;
const OVER_FOR = 1500;
const REPAIR_STAGGER = 500;
const MAX_DPR = 2;
const SPRITE_PADDING = 4;

type Copy = {
  title: string;
  start: string;
  launch: string;
  launchTouch: string;
  exit: string;
  lives: string;
  won: string;
  lost: string;
  quit: string;
};
type Source = {
  img: CanvasImageSource;
  sx: number;
  sy: number;
  sw: number;
  sh: number;
};
type Brick = {
  el: Element | null;
  x: number;
  y: number;
  w: number;
  h: number;
  alive: boolean;
  tile?: Source;
};
type Piece = {
  kind: "char" | "box" | "img";
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
  sprite?: HTMLCanvasElement;
  fill?: string;
  src?: Source;
};
type Phase = "ready" | "play" | "over" | "repair";
type Hud = {
  lives: number;
  left: number;
  total: number;
  time: number;
  message: string;
};

const isTransparent = (color: string) =>
  color === "transparent" || /rgba?\(.*,\s*0\)$/.test(color);
const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

/** Breakout played on the page itself: whatever is on screen becomes the bricks, and it all comes back at the end. */
export function BreakGame({ copy }: { copy: Copy }) {
  const [active, setActive] = useState(false);
  const [hud, setHud] = useState<Hud>({
    lives: LIVES,
    left: 0,
    total: 0,
    time: 0,
    message: "",
  });
  const layer = useRef<HTMLCanvasElement>(null);
  const opener = useRef<HTMLButtonElement>(null);
  const quit = useRef<() => void>(() => {});
  const copyRef = useRef(copy);
  copyRef.current = copy;

  const start = useCallback(() => setActive(true), []);

  useEffect(() => {
    if (!active) return;
    const canvas = layer.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const text = copyRef.current;
    const root = document.documentElement;
    const touch = !window.matchMedia("(pointer: fine)").matches;

    // Freeze the page where it is. The scrollbar's width is kept as padding so nothing shifts.
    const scrollbar = window.innerWidth - root.clientWidth;
    root.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbar}px`;
    root.dataset.game = "";

    let W = window.innerWidth;
    let H = window.innerHeight;
    let dpr = 1;
    const bricks: Brick[] = [];
    const pieces: Piece[] = [];
    const hidden: Element[] = [];
    const dimmed: Element[] = [];
    const measure = document.createElement("canvas").getContext("2d")!;
    const paddle = { x: 0, y: 0, w: 120, h: 10 };
    const ball = { x: 0, y: 0, vx: 0, vy: 0, speed: 0 };
    const keys = { left: false, right: false };
    let phase: Phase = "ready";
    let lives = LIVES;
    let base = 0;
    let startedAt = 0;
    let endedAt = 0;
    let lastSecond = -1;
    let raf = 0;
    let last = performance.now();
    let finished = false;

    const show = (patch: Partial<Hud>) => setHud((h) => ({ ...h, ...patch }));
    const hide = (el: Element) => {
      el.classList.add("game-hide");
      hidden.push(el);
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      paddle.w = clamp(W * 0.12, 90, 150);
      paddle.y = H - (touch ? 72 : 56);
      paddle.x = clamp(paddle.x || W / 2 - paddle.w / 2, 0, W - paddle.w);
      base = clamp(H * 0.62, 380, 580);
    };

    const sprites = new Map<string, HTMLCanvasElement>();
    const spriteOf = (char: string, font: string, color: string, w: number) => {
      const key = `${color}|${font}|${char}`;
      let sprite = sprites.get(key);
      if (sprite) return sprite;
      measure.font = font;
      const m = measure.measureText(char);
      const lw = Math.ceil(Math.max(w, m.width)) + SPRITE_PADDING * 2;
      const lh =
        Math.ceil(m.fontBoundingBoxAscent + m.fontBoundingBoxDescent) +
        SPRITE_PADDING * 2;
      sprite = document.createElement("canvas");
      sprite.width = Math.ceil(lw * dpr);
      sprite.height = Math.ceil(lh * dpr);
      const c = sprite.getContext("2d")!;
      c.scale(dpr, dpr);
      c.font = font;
      c.fillStyle = color;
      c.fillText(
        char,
        SPRITE_PADDING,
        SPRITE_PADDING + m.fontBoundingBoxAscent,
      );
      sprites.set(key, sprite);
      return sprite;
    };

    const piece = (
      kind: Piece["kind"],
      x: number,
      y: number,
      w: number,
      h: number,
    ): Piece => ({
      kind,
      hx: x,
      hy: y,
      x,
      y,
      vx: 0,
      vy: 0,
      r: 0,
      vr: 0,
      w,
      h,
      delay: 0,
    });

    const visible = (el: Element) => {
      const check = (el as HTMLElement).checkVisibility;
      return check
        ? check.call(el, { opacityProperty: true, visibilityProperty: true })
        : true;
    };

    /** Turns the elements on screen into bricks. Big canvases and images are cut into tiles. */
    const build = () => {
      const zone = paddle.y - 90;
      document.querySelectorAll(BRICKS).forEach((el) => {
        if (el.closest(SKIP) || el.parentElement?.closest(BRICKS)) return;
        const r = el.getBoundingClientRect();
        if (
          r.width < 4 ||
          r.height < 1 ||
          r.bottom <= 0 ||
          r.top >= H ||
          r.right <= 0 ||
          r.left >= W
        )
          return;
        if (!visible(el)) return;
        if (r.bottom > zone) {
          el.classList.add("game-dim");
          dimmed.push(el);
          return;
        }
        const media =
          el instanceof HTMLCanvasElement || el instanceof HTMLImageElement;
        if (media && r.width > 240 && r.height > 60) {
          tile(el as HTMLCanvasElement | HTMLImageElement, r);
          return;
        }
        bricks.push({
          el,
          x: r.left,
          y: r.top,
          w: r.width,
          h: r.height,
          alive: true,
        });
      });
    };

    const tile = (el: HTMLCanvasElement | HTMLImageElement, r: DOMRect) => {
      const snap = document.createElement("canvas");
      snap.width = Math.max(1, Math.round(r.width * dpr));
      snap.height = Math.max(1, Math.round(r.height * dpr));
      const c = snap.getContext("2d", { willReadFrequently: true })!;
      c.drawImage(el, 0, 0, snap.width, snap.height);
      let data: Uint8ClampedArray | null = null;
      try {
        data = c.getImageData(0, 0, snap.width, snap.height).data;
      } catch {
        data = null;
      }
      const columns = Math.max(1, Math.round(r.width / TILE));
      const rows = Math.max(1, Math.round(r.height / TILE));
      const tw = r.width / columns;
      const th = r.height / rows;
      let added = 0;
      for (let row = 0; row < rows; row++) {
        for (let column = 0; column < columns; column++) {
          const sx = Math.floor(column * tw * dpr);
          const sy = Math.floor(row * th * dpr);
          const sw = Math.floor(tw * dpr);
          const sh = Math.floor(th * dpr);
          // Empty tiles (the gaps between letters of the wordmark) aren't bricks.
          if (data) {
            let ink = 0;
            for (let y = sy; y < sy + sh; y += 3) {
              for (let x = sx; x < sx + sw; x += 3)
                if (data[(y * snap.width + x) * 4 + 3] > 120) ink++;
            }
            if (ink < (sw * sh) / 9 / 50) continue;
          }
          const x = r.left + column * tw;
          const y = r.top + row * th;
          if (y + th <= 0) continue;
          bricks.push({
            el: null,
            x,
            y,
            w: tw,
            h: th,
            alive: true,
            tile: { img: snap, sx, sy, sw, sh },
          });
          added++;
        }
      }
      if (added) hide(el);
    };

    const scatter = (list: Piece[], fromX: number, fromY: number) => {
      for (const p of list) {
        const dx = p.x - fromX;
        const dy = p.y - fromY;
        const d = Math.hypot(dx, dy) || 1;
        const speed = 120 + Math.random() * 220;
        p.vx = (dx / d) * speed + ball.vx * 0.25 + (Math.random() - 0.5) * 60;
        p.vy = (dy / d) * speed - 120 - Math.random() * 140;
        p.vr = (Math.random() - 0.5) * (p.kind === "char" ? 10 : 5);
        pieces.push(p);
      }
    };

    const shards = (
      x: number,
      y: number,
      w: number,
      h: number,
      make: (p: Piece, cx: number, cy: number, cw: number, ch: number) => void,
      out: Piece[],
    ) => {
      const columns = Math.max(1, Math.round(w / SHARD));
      const rows = Math.max(1, Math.round(h / SHARD));
      const cw = w / columns;
      const ch = h / rows;
      for (let row = 0; row < rows; row++) {
        for (let column = 0; column < columns; column++) {
          const p = piece(
            "box",
            x + (column + 0.5) * cw,
            y + (row + 0.5) * ch,
            cw + 0.5,
            ch + 0.5,
          );
          make(p, column * cw, row * ch, cw, ch);
          out.push(p);
        }
      }
    };

    const breakBrick = (b: Brick) => {
      b.alive = false;
      const out: Piece[] = [];
      if (b.tile) {
        const t = b.tile;
        shards(
          b.x,
          b.y,
          b.w,
          b.h,
          (p, cx, cy, cw, ch) => {
            p.kind = "img";
            const k = t.sw / b.w;
            p.src = {
              img: t.img,
              sx: t.sx + cx * k,
              sy: t.sy + cy * k,
              sw: cw * k,
              sh: ch * k,
            };
          },
          out,
        );
        // Small pieces of a tile read better than one big slab.
        for (const p of [...out]) {
          if (p.w <= 24) continue;
          out.splice(out.indexOf(p), 1);
          const s = p.src!;
          for (let i = 0; i < 4; i++) {
            const ix = i % 2;
            const iy = Math.floor(i / 2);
            const q = piece(
              "img",
              p.hx - p.w / 4 + ix * (p.w / 2),
              p.hy - p.h / 4 + iy * (p.h / 2),
              p.w / 2,
              p.h / 2,
            );
            q.src = {
              img: s.img,
              sx: s.sx + (ix * s.sw) / 2,
              sy: s.sy + (iy * s.sh) / 2,
              sw: s.sw / 2,
              sh: s.sh / 2,
            };
            out.push(q);
          }
        }
        scatter(out, ball.x, ball.y);
        return;
      }
      const el = b.el!;
      // Backgrounds and borders: dividers, fields, buttons.
      const boxes = [el, ...el.querySelectorAll("*")];
      for (const node of boxes) {
        const cs = getComputedStyle(node);
        const r = node.getBoundingClientRect();
        if (r.width < 1 || r.height < 1) continue;
        if (
          node instanceof HTMLImageElement ||
          node instanceof HTMLCanvasElement
        ) {
          shards(
            r.left,
            r.top,
            r.width,
            r.height,
            (p, cx, cy, cw, ch) => {
              p.kind = "img";
              const sw =
                node instanceof HTMLImageElement
                  ? node.naturalWidth
                  : node.width;
              const sh =
                node instanceof HTMLImageElement
                  ? node.naturalHeight
                  : node.height;
              p.src = {
                img: node,
                sx: (cx / r.width) * sw,
                sy: (cy / r.height) * sh,
                sw: (cw / r.width) * sw,
                sh: (ch / r.height) * sh,
              };
            },
            out,
          );
          continue;
        }
        let fill = isTransparent(cs.backgroundColor) ? "" : cs.backgroundColor;
        const field = node.matches("input, textarea, select");
        if (!fill && field && parseFloat(cs.borderBottomWidth) > 0) {
          shards(
            r.left,
            r.bottom - 1,
            r.width,
            1,
            (p) => (p.fill = cs.borderBottomColor),
            out,
          );
          continue;
        }
        if (!fill) continue;
        shards(r.left, r.top, r.width, r.height, (p) => (p.fill = fill), out);
      }
      // Text, one piece per character, drawn exactly as the page draws it.
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      const range = document.createRange();
      for (
        let node = walker.nextNode() as Text | null;
        node;
        node = walker.nextNode() as Text | null
      ) {
        const parent = node.parentElement;
        if (!parent || !node.data.trim()) continue;
        const cs = getComputedStyle(parent);
        const font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
        const upper = cs.textTransform === "uppercase";
        let offset = 0;
        for (const char of node.data) {
          const from = offset;
          offset += char.length;
          if (!char.trim()) continue;
          range.setStart(node, from);
          range.setEnd(node, offset);
          const r = range.getClientRects()[0];
          if (!r || r.width < 0.5) continue;
          const p = piece(
            "char",
            r.left + r.width / 2,
            r.top + r.height / 2,
            r.width,
            r.height,
          );
          p.sprite = spriteOf(
            upper ? char.toUpperCase() : char,
            font,
            cs.color,
            r.width,
          );
          out.push(p);
        }
      }
      hide(el);
      scatter(out, ball.x, ball.y);
    };

    const resetBall = () => {
      phase = "ready";
      ball.speed = base;
      ball.vx = 0;
      ball.vy = 0;
      show({ message: touch ? text.launchTouch : text.launch });
    };
    const launch = () => {
      if (phase !== "ready") return;
      if (!startedAt) startedAt = performance.now();
      const angle = (Math.random() - 0.5) * 0.7;
      ball.vx = Math.sin(angle) * ball.speed;
      ball.vy = -Math.cos(angle) * ball.speed;
      phase = "play";
      show({ message: "" });
    };

    const end = (message: string) => {
      if (phase === "over" || phase === "repair") return;
      phase = "over";
      endedAt = performance.now();
      show({ message });
    };

    quit.current = () => end(text.quit);

    const restore = () => {
      if (finished) return;
      finished = true;
      for (const el of hidden) el.classList.remove("game-hide");
      for (const el of dimmed) el.classList.remove("game-dim");
      root.style.overflow = "";
      document.body.style.paddingRight = "";
      delete root.dataset.game;
      setActive(false);
      requestAnimationFrame(() =>
        opener.current?.focus({ preventScroll: true }),
      );
    };

    const stepPieces = (dt: number, now: number) => {
      let settled = true;
      for (const p of pieces) {
        const repairing =
          phase === "repair" && now - endedAt - OVER_FOR > p.delay;
        if (!repairing) {
          p.vy += GRAVITY * dt;
          p.vx *= 0.995;
          p.x += p.vx * dt;
          p.y += p.vy * dt;
          p.r += p.vr * dt;
          const floor = H - p.h / 2;
          if (p.x < p.w / 2 || p.x > W - p.w / 2) {
            p.x = clamp(p.x, p.w / 2, W - p.w / 2);
            p.vx *= -BOUNCE;
          }
          if (p.y > floor) {
            p.y = floor;
            p.vy *= -BOUNCE;
            p.vx *= 0.8;
            p.vr *= 0.7;
          }
          settled = false;
          continue;
        }
        p.vx += (p.hx - p.x) * 120 * dt;
        p.vy += (p.hy - p.y) * 120 * dt;
        const damp = Math.exp(-dt * 10);
        p.vx *= damp;
        p.vy *= damp;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.r += (0 - p.r) * Math.min(1, dt * 8);
        if (
          Math.abs(p.x - p.hx) +
            Math.abs(p.y - p.hy) +
            Math.abs(p.vx) +
            Math.abs(p.vy) +
            Math.abs(p.r) >
          3
        )
          settled = false;
      }
      return settled;
    };

    const stepBall = (dt: number) => {
      const step = Math.max(1, Math.ceil((ball.speed * dt) / 4));
      const h = dt / step;
      for (let i = 0; i < step; i++) {
        ball.x += ball.vx * h;
        ball.y += ball.vy * h;
        if (ball.x < BALL) {
          ball.x = BALL;
          ball.vx = Math.abs(ball.vx);
        } else if (ball.x > W - BALL) {
          ball.x = W - BALL;
          ball.vx = -Math.abs(ball.vx);
        }
        if (ball.y < BALL) {
          ball.y = BALL;
          ball.vy = Math.abs(ball.vy);
        }
        // Where it lands on the paddle sets the angle, so the player can aim.
        if (
          ball.vy > 0 &&
          ball.y + BALL >= paddle.y &&
          ball.y - BALL <= paddle.y + paddle.h &&
          ball.x >= paddle.x - BALL &&
          ball.x <= paddle.x + paddle.w + BALL
        ) {
          const off = clamp(
            (ball.x - (paddle.x + paddle.w / 2)) / (paddle.w / 2),
            -1,
            1,
          );
          const angle = off * 1.05;
          ball.vx = Math.sin(angle) * ball.speed;
          ball.vy = -Math.cos(angle) * ball.speed;
          ball.y = paddle.y - BALL;
        }
        for (const b of bricks) {
          if (!b.alive) continue;
          const nx = clamp(ball.x, b.x, b.x + b.w);
          const ny = clamp(ball.y, b.y, b.y + b.h);
          if ((ball.x - nx) ** 2 + (ball.y - ny) ** 2 > BALL * BALL) continue;
          const overlapX = Math.min(
            ball.x + BALL - b.x,
            b.x + b.w - (ball.x - BALL),
          );
          const overlapY = Math.min(
            ball.y + BALL - b.y,
            b.y + b.h - (ball.y - BALL),
          );
          if (overlapX < overlapY)
            ball.vx =
              ball.x < b.x + b.w / 2 ? -Math.abs(ball.vx) : Math.abs(ball.vx);
          else
            ball.vy =
              ball.y < b.y + b.h / 2 ? -Math.abs(ball.vy) : Math.abs(ball.vy);
          breakBrick(b);
          const scale = Math.min(1.6, ball.speed / base + 0.015) * base;
          const k = scale / ball.speed;
          ball.speed = scale;
          ball.vx *= k;
          ball.vy *= k;
          const left = bricks.filter((x) => x.alive).length;
          show({ left });
          if (!left) {
            end(
              text.won.replace(
                "{t}",
                `${Math.max(1, Math.round((performance.now() - startedAt) / 1000))} s`,
              ),
            );
            return;
          }
          break;
        }
        if (ball.y - BALL > H) {
          lives--;
          show({ lives });
          if (lives <= 0) end(text.lost);
          else resetBall();
          return;
        }
      }
    };

    const draw = () => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      for (const b of bricks) {
        if (!b.alive || !b.tile) continue;
        const t = b.tile;
        ctx.drawImage(t.img, t.sx, t.sy, t.sw, t.sh, b.x, b.y, b.w, b.h);
      }
      for (const p of pieces) {
        const cos = Math.cos(p.r) * dpr;
        const sin = Math.sin(p.r) * dpr;
        ctx.setTransform(cos, sin, -sin, cos, p.x * dpr, p.y * dpr);
        if (p.kind === "char") {
          const s = p.sprite!;
          ctx.drawImage(
            s,
            -p.w / 2 - SPRITE_PADDING,
            -p.h / 2 - SPRITE_PADDING,
            s.width / dpr,
            s.height / dpr,
          );
        } else if (p.kind === "img") {
          const s = p.src!;
          ctx.drawImage(
            s.img,
            s.sx,
            s.sy,
            Math.max(1, s.sw),
            Math.max(1, s.sh),
            -p.w / 2,
            -p.h / 2,
            p.w,
            p.h,
          );
        } else {
          ctx.fillStyle = p.fill!;
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        }
      }
      if (phase === "ready" || phase === "play") {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.fillStyle = "#f2f2f0";
        ctx.beginPath();
        ctx.roundRect(paddle.x, paddle.y, paddle.w, paddle.h, 3);
        ctx.fill();
        ctx.fillStyle = "#ff5a1f";
        ctx.fillRect(ball.x - BALL, ball.y - BALL, BALL * 2, BALL * 2);
      }
    };

    const loop = (now: number) => {
      const dt = Math.min(0.033, (now - last) / 1000 || 0.016);
      last = now;
      if (keys.left || keys.right)
        paddle.x = clamp(
          paddle.x + (keys.right ? 1 : -1) * 760 * dt,
          0,
          W - paddle.w,
        );
      if (phase === "ready") {
        ball.x = paddle.x + paddle.w / 2;
        ball.y = paddle.y - BALL - 1;
      } else if (phase === "play") {
        stepBall(dt);
        const second = Math.floor((now - startedAt) / 1000);
        if (second !== lastSecond) {
          lastSecond = second;
          show({ time: second });
        }
      } else if (phase === "over" && now - endedAt > OVER_FOR) {
        phase = "repair";
        for (const p of pieces) p.delay = Math.random() * REPAIR_STAGGER;
      }
      const settled = stepPieces(dt, now);
      draw();
      if (
        phase === "repair" &&
        settled &&
        now - endedAt > OVER_FOR + REPAIR_STAGGER
      ) {
        restore();
        return;
      }
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      paddle.x = clamp(e.clientX - paddle.w / 2, 0, W - paddle.w);
    };
    const onDown = (e: PointerEvent) => {
      onMove(e);
      if (e.pointerType === "mouse" || phase === "ready") launch();
    };
    const onKey = (e: KeyboardEvent) => {
      const down = e.type === "keydown";
      if (e.key === "Escape" && down) {
        end(text.quit);
      } else if (e.key === "ArrowLeft" || e.key === "a") {
        keys.left = down;
      } else if (e.key === "ArrowRight" || e.key === "d") {
        keys.right = down;
      } else if ((e.key === " " || e.key === "Enter") && down) {
        launch();
      } else {
        return;
      }
      e.preventDefault();
    };
    // A new layout leaves the bricks out of place, so the page is put back at once.
    const onResize = () => {
      if (
        Math.abs(window.innerWidth - W) < 2 &&
        Math.abs(window.innerHeight - H) < 120
      )
        return;
      cancelAnimationFrame(raf);
      restore();
    };

    let boot = 0;
    // Waits a frame so the frozen page has settled before measuring it.
    boot = requestAnimationFrame(() => {
      resize();
      build();
      const total = bricks.length;
      if (!total) {
        restore();
        return;
      }
      show({ lives, left: total, total, time: 0 });
      resetBall();
      canvas.focus({ preventScroll: true });
      last = performance.now();
      raf = requestAnimationFrame(loop);
    });

    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerdown", onDown);
    window.addEventListener("keydown", onKey);
    window.addEventListener("keyup", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(boot);
      cancelAnimationFrame(raf);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerdown", onDown);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("keyup", onKey);
      window.removeEventListener("resize", onResize);
      if (!finished) {
        for (const el of hidden) el.classList.remove("game-hide");
        for (const el of dimmed) el.classList.remove("game-dim");
        root.style.overflow = "";
        document.body.style.paddingRight = "";
        delete root.dataset.game;
      }
    };
  }, [active]);

  const time = `${String(Math.floor(hud.time / 60)).padStart(2, "0")}:${String(hud.time % 60).padStart(2, "0")}`;

  return (
    <>
      <div className="footer-col">
        <p className="t t-mono">{copy.title}</p>
        <button
          ref={opener}
          type="button"
          className="footer-link game-start"
          onClick={start}
          disabled={active}
        >
          <span className="t t-btn">{copy.start}</span>
        </button>
      </div>
      {active &&
        createPortal(
          <div className="game-layer">
            <canvas
              ref={layer}
              className="game-canvas"
              tabIndex={-1}
              aria-label={copy.start}
            />
            <div className="game-hud" aria-live="polite">
              <span className="t t-mono">
                {copy.lives} <b>{"■".repeat(Math.max(0, hud.lives))}</b>
              </span>
              <span className="t t-mono">
                {hud.total - hud.left}/{hud.total}
              </span>
              <span className="t t-mono">{time}</span>
              <button
                type="button"
                className="t t-mono game-exit"
                onClick={() => quit.current()}
              >
                {copy.exit}
              </button>
            </div>
            {hud.message && (
              <p className="t t-label game-message">{hud.message}</p>
            )}
          </div>,
          document.body,
        )}
    </>
  );
}
