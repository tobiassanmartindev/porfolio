"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { projects, site } from "@/content/site";

const CARD_WIDTH = 220;
const CARD_RATIO = 1.25;
const RADIUS = 0.26;
const MIN_RADIUS = 130;
const TILT = 16;
const PERSPECTIVE = 1400;
const SCROLL_TURNS = 0.5;
const IDLE_SPEED = 0.06;
const SMOOTHING = 0.6;
const DEPTH_DIM = 0.82;

const DRAG_SPEED = 0.004;
const DRAG_FRICTION = 2.6;
const CLICK_SLOP = 6;

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

/** Sticky stage where one linked card per project orbits the title. Scroll or a mouse drag spins it, plus a slow idle spin that pauses on hover or focus. */
export function OrbitGallery() {
  const { title, hint, hintDrag, cursorStage, cursorCard } = site.orbit;
  const count = projects.length;
  const root = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const titleBlock = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const cards = useRef<(HTMLAnchorElement | null)[]>([]);
  const dims = useRef<(HTMLDivElement | null)[]>([]);
  const paused = useRef(false);

  useEffect(() => {
    const r = root.current;
    const s = stage.current;
    if (!r || !s) return;
    let width = s.clientWidth || 1;
    let height = s.clientHeight || 1;
    let front = -1;

    const render = (angle: number, progress: number) => {
      const scale = clamp(width / 1440, 0.55, 1.1);
      const cardHeight = CARD_WIDTH * CARD_RATIO;
      const orbit = Math.max(width * RADIUS, Math.min(width * 0.34, MIN_RADIUS));
      const tilt = (TILT * Math.PI) / 180;
      const cos = Math.cos(tilt);
      const sin = Math.sin(tilt);
      let nearest = 0;
      let nearestZ = -Infinity;
      for (let i = 0; i < count; i++) {
        const card = cards.current[i];
        if (!card) continue;
        const a = angle + (i / count) * Math.PI * 2;
        const x = Math.sin(a) * orbit;
        const z = Math.cos(a) * orbit;
        const y = z * sin * 0.6;
        const depth = z * cos;
        const persp = PERSPECTIVE / Math.max(60, PERSPECTIVE - depth);
        const near = (z / orbit + 1) / 2;
        const rotate = -Math.sin(a) * 28;
        card.style.transform = `translate3d(${(x * persp - CARD_WIDTH / 2).toFixed(2)}px, ${(y * persp - cardHeight / 2).toFixed(2)}px, 0) scale(${(persp * scale).toFixed(4)}) perspective(${PERSPECTIVE}px) rotateY(${rotate.toFixed(2)}deg)`;
        card.style.zIndex = String(Math.round(near * 1000));
        if (card.style.opacity !== "1") card.style.opacity = "1";
        const dim = dims.current[i];
        if (dim) dim.style.opacity = ((1 - near) * DEPTH_DIM).toFixed(3);
        if (z > nearestZ) {
          nearestZ = z;
          nearest = i;
        }
      }
      const block = titleBlock.current;
      if (block) {
        const reveal = clamp(progress * 4, 0, 1);
        block.style.transform = `translate3d(0, ${((1 - reveal) * 24).toFixed(2)}px, 0)`;
        block.style.opacity = (0.35 + reveal * 0.65).toFixed(3);
      }
      if (nearest !== front && counter.current) {
        front = nearest;
        counter.current.textContent = `${String(nearest + 1).padStart(2, "0")} / ${String(count).padStart(2, "0")}`;
      }
    };

    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    const ro = new ResizeObserver(() => {
      width = s.clientWidth || 1;
      height = s.clientHeight || 1;
    });
    ro.observe(s);
    let visible = true;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(r);

    const drag = { on: false, x: 0, moved: 0, angle: 0, velocity: 0, sample: 0 };
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      drag.on = true;
      drag.x = e.clientX;
      drag.moved = 0;
      drag.velocity = 0;
      drag.sample = performance.now();
    };
    const onMove = (e: PointerEvent) => {
      if (!drag.on) return;
      const dx = e.clientX - drag.x;
      const now = performance.now();
      drag.x = e.clientX;
      drag.moved += Math.abs(dx);
      drag.angle += dx * DRAG_SPEED;
      drag.velocity = (dx * DRAG_SPEED) / Math.max(0.008, (now - drag.sample) / 1000);
      drag.sample = now;
      if (drag.moved > CLICK_SLOP) s.dataset.dragging = "true";
    };
    const onUp = () => {
      drag.on = false;
      delete s.dataset.dragging;
    };
    // A drag that ends over a card must not open it.
    const onClickCapture = (e: MouseEvent) => {
      if (drag.moved <= CLICK_SLOP) return;
      e.preventDefault();
      e.stopPropagation();
      drag.moved = 0;
    };
    s.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    s.addEventListener("click", onClickCapture, true);

    let raf = 0;
    let last = performance.now();
    let idle = 0;
    let smooth = -1;
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!visible) return;
      const rect = r.getBoundingClientRect();
      const vh = window.innerHeight || height;
      const stickyTop = (vh - height) / 2;
      const target = clamp((stickyTop - rect.top) / Math.max(1, rect.height - height), 0, 1);
      if (smooth < 0) smooth = target;
      const k = reduced ? 1 : 1 - Math.exp(-dt * (2 + (1 - SMOOTHING) * 18));
      smooth += (target - smooth) * k;
      if (!reduced && !paused.current) idle += dt * IDLE_SPEED;
      if (!drag.on) {
        drag.angle += drag.velocity * dt;
        drag.velocity *= Math.exp(-dt * DRAG_FRICTION);
      }
      render(-smooth * SCROLL_TURNS * Math.PI * 2 - idle + drag.angle, smooth);
    };
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      s.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      s.removeEventListener("click", onClickCapture, true);
    };
  }, [count]);

  const pause = () => {
    paused.current = true;
  };
  const resume = () => {
    paused.current = false;
  };

  return (
    <div ref={root} className="orbit">
      <div ref={stage} className="orbit-stage" data-cursor={cursorStage}>
        <div className="orbit-glow" />
        <div className="orbit-center">
          {projects.map((project, i) => (
            <Link
              key={project.slug}
              href={`/work/${project.slug}`}
              aria-label={`${project.name}: ${site.orbit.cardAction}`}
              className="orbit-card"
              draggable={false}
              data-cursor={cursorCard}
              onPointerEnter={pause}
              onPointerLeave={resume}
              onFocus={pause}
              onBlur={resume}
              ref={(el) => {
                cards.current[i] = el;
              }}
              style={{ width: CARD_WIDTH, height: CARD_WIDTH * CARD_RATIO }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={project.cover.src} alt={project.cover.alt} draggable={false} loading="lazy" decoding="async" />
              <div
                className="orbit-dim"
                ref={(el) => {
                  dims.current[i] = el;
                }}
              />
            </Link>
          ))}
          <div ref={titleBlock} className="orbit-title-block">
            <div className="orbit-title-inner">
              <p className="orbit-title">{title}</p>
            </div>
          </div>
        </div>
        <div className="mono-11 orbit-foot">
          <span>
            <span className="only-mouse">{hintDrag}</span>
            <span className="only-touch">{hint}</span>
          </span>
          <span ref={counter} className="orbit-counter">
            01 / {String(count).padStart(2, "0")}
          </span>
        </div>
      </div>
    </div>
  );
}
