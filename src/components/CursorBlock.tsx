"use client";

import { useEffect, useRef, useState } from "react";
import { useFinePointer } from "./useFinePointer";

const TRAIL = 3;
const HEAD_FOLLOW = 0.32;
const TRAIL_FOLLOW = 0.24;
const LABEL_OFFSET = 16;

/** A small block and its trail chase the pointer. It turns on links and shows the nearest `data-cursor` label. */
export function CursorBlock() {
  const fine = useFinePointer();
  const [label, setLabel] = useState("");
  const root = useRef<HTMLDivElement>(null);
  const head = useRef<HTMLSpanElement>(null);
  const tag = useRef<HTMLSpanElement>(null);
  const trail = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    if (!fine) return;
    const target = { x: 0, y: 0 };
    const points = Array.from({ length: TRAIL + 1 }, () => ({ x: 0, y: 0 }));
    let raf = 0;
    let seen = false;
    // A label can hold several phrases separated by "|". Each click moves to the next one.
    let phrase = 0;

    const frame = () => {
      let moving = false;
      points.forEach((point, i) => {
        const lead = i === 0 ? target : points[i - 1];
        const k = i === 0 ? HEAD_FOLLOW : TRAIL_FOLLOW;
        point.x += (lead.x - point.x) * k;
        point.y += (lead.y - point.y) * k;
        if (Math.abs(lead.x - point.x) + Math.abs(lead.y - point.y) > 0.1) moving = true;
      });
      if (head.current) head.current.style.transform = `translate3d(${points[0].x}px, ${points[0].y}px, 0)`;
      if (tag.current) tag.current.style.transform = `translate3d(${points[0].x + LABEL_OFFSET}px, ${points[0].y + LABEL_OFFSET}px, 0)`;
      trail.current.forEach((el, i) => {
        if (el) el.style.transform = `translate3d(${points[i + 1].x}px, ${points[i + 1].y}px, 0)`;
      });
      raf = moving ? requestAnimationFrame(frame) : 0;
    };

    const read = (el: Element | null) => {
      const link = el?.closest("a, button") ?? null;
      const labelled = el?.closest<HTMLElement>("[data-cursor]") ?? null;
      const inside = link && labelled && !link.contains(labelled);
      const phrases = inside ? [] : (labelled?.dataset.cursor ?? "").split("|").filter(Boolean);
      if (root.current) {
        root.current.dataset.active = link ? "true" : "false";
        root.current.dataset.big = phrases.length && labelled?.hasAttribute("data-cursor-big") ? "true" : "false";
      }
      setLabel(phrases.length ? phrases[phrase % phrases.length] : "");
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      target.x = e.clientX;
      target.y = e.clientY;
      if (!seen) {
        seen = true;
        points.forEach((point) => {
          point.x = target.x;
          point.y = target.y;
        });
      }
      if (root.current) root.current.dataset.visible = "true";
      read(e.target instanceof Element ? e.target : null);
      if (!raf) raf = requestAnimationFrame(frame);
    };
    const onClick = () => {
      phrase++;
      // A click can change what is under the pointer, such as a label being retired.
      window.setTimeout(() => read(document.elementFromPoint(target.x, target.y)), 0);
    };
    const onDown = () => {
      if (root.current) root.current.dataset.pressed = "true";
    };
    const onUp = () => {
      if (root.current) root.current.dataset.pressed = "false";
    };
    const onLeave = () => {
      if (root.current) root.current.dataset.visible = "false";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    window.addEventListener("click", onClick);
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("click", onClick);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [fine]);

  if (!fine) return null;
  return (
    <div ref={root} className="cursor" aria-hidden data-visible="false">
      {Array.from({ length: TRAIL }, (_, i) => (
        <i
          key={i}
          className="cursor-trail"
          ref={(el) => {
            trail.current[i] = el;
          }}
        >
          <b style={{ opacity: 0.45 - i * 0.12, scale: 1 - (i + 1) * 0.2 }} />
        </i>
      ))}
      <span ref={head} className="cursor-head">
        <b />
      </span>
      <span ref={tag} className="cursor-tag">
        {label && <em>{label}</em>}
      </span>
    </div>
  );
}
