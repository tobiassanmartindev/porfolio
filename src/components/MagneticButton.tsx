"use client";

import { animate, motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";

const EASE = [0.7, 0, 0.2, 1] as const;
const SWEEP = 0.6;
const STRENGTH = 0.3;
const MAGNET_AREA = 24;
const CSS_EASE = `${SWEEP}s cubic-bezier(0.7,0,0.2,1)`;
const SPRING = { stiffness: 220, damping: 18, mass: 0.6 };

const ICON_POSITIONS = ["translate3d(0,0,0)", "translate3d(-150%,150%,0)", "translate3d(150%,-150%,0)"];

/** Pill link that follows the pointer, with a rising fill, rolling label and swapping arrow. */
export function MagneticButton({ label, href, external = false }: { label: string; href: string; external?: boolean }) {
  const [hovered, setHovered] = useState(false);
  const reduced = useRef(false);
  const ref = useRef<HTMLAnchorElement>(null);

  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);
  const x = useSpring(targetX, SPRING);
  const y = useSpring(targetY, SPRING);
  const innerX = useTransform(x, (v) => v * 0.45);
  const innerY = useTransform(y, (v) => v * 0.45);

  const fill = useMotionValue(100);
  const fillTransform = useTransform(fill, (v) => `translate3d(0, ${v}%, 0)`);
  const fillRadius = useTransform(fill, (v) => {
    const top = v > 0 ? Math.min(50, v * 0.6) : 0;
    const bottom = v < 0 ? Math.min(50, -v * 0.6) : 0;
    return `${top}% ${top}% ${bottom}% ${bottom}%`;
  });

  useEffect(() => {
    reduced.current = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
  }, []);

  const enter = () => {
    setHovered(true);
    if (fill.get() <= -99.5) fill.set(100);
    animate(fill, 0, { duration: reduced.current ? 0.01 : SWEEP, ease: EASE });
  };
  const leave = () => {
    setHovered(false);
    targetX.set(0);
    targetY.set(0);
    animate(fill, -100, { duration: reduced.current ? 0.01 : SWEEP * 0.85, ease: EASE });
  };
  const move = (e: React.PointerEvent) => {
    if (reduced.current || e.pointerType === "touch" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const cx = r.left + r.width / 2 - x.get();
    const cy = r.top + r.height / 2 - y.get();
    targetX.set((e.clientX - cx) * STRENGTH);
    targetY.set((e.clientY - cy) * STRENGTH);
  };

  return (
    <div
      onPointerEnter={enter}
      onPointerLeave={leave}
      onPointerMove={move}
      style={{ width: "100%", height: "100%", minWidth: "max-content", position: "relative", display: "flex", alignItems: "stretch", justifyContent: "stretch" }}
    >
      <div aria-hidden style={{ position: "absolute", inset: -MAGNET_AREA, zIndex: 0 }} />
      <motion.a
        ref={ref}
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        onFocus={enter}
        onBlur={leave}
        style={{
          x,
          y,
          position: "relative",
          zIndex: 1,
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 14,
          boxSizing: "border-box",
          padding: "8px 8px 8px 26px",
          borderRadius: 999,
          background: "rgb(255, 90, 31)",
          border: "1px solid rgb(255, 90, 31)",
          overflow: "hidden",
          isolation: "isolate",
          textDecoration: "none",
          cursor: "pointer",
          color: "rgb(11, 12, 14)",
          WebkitTapHighlightColor: "transparent",
          pointerEvents: "auto",
        }}
      >
        <motion.span
          aria-hidden
          style={{
            position: "absolute",
            left: "-10%",
            right: "-10%",
            top: 0,
            bottom: 0,
            background: "rgb(242, 242, 240)",
            transform: fillTransform,
            borderRadius: fillRadius,
            zIndex: -1,
            pointerEvents: "none",
          }}
        />
        <motion.span
          style={{
            x: innerX,
            y: innerY,
            position: "relative",
            display: "block",
            overflow: "hidden",
            fontFamily: "var(--sans)",
            fontSize: 15,
            lineHeight: 1.2,
            letterSpacing: "-0.01em",
            fontWeight: 500,
            whiteSpace: "nowrap",
          }}
        >
          <span style={{ display: "block", transform: hovered ? "translate3d(0,-100%,0)" : "translate3d(0,0,0)", transition: `transform ${CSS_EASE}` }}>
            <span style={{ display: "block" }}>{label}</span>
            <span aria-hidden style={{ display: "block", position: "absolute", top: "100%", left: 0 }}>
              {label}
            </span>
          </span>
        </motion.span>
        <motion.span
          aria-hidden
          style={{
            x: innerX,
            y: innerY,
            position: "relative",
            width: 30,
            height: 30,
            flexShrink: 0,
            borderRadius: 999,
            overflow: "hidden",
            background: hovered ? "rgb(7, 8, 10)" : "rgb(255, 90, 31)",
            transition: `background-color ${CSS_EASE}`,
            display: "block",
          }}
        >
          {[0, 1].map((i) => {
            const transform = i === 0 ? (hovered ? ICON_POSITIONS[2] : ICON_POSITIONS[0]) : hovered ? ICON_POSITIONS[0] : ICON_POSITIONS[1];
            return (
              <span
                key={i}
                style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", transform, transition: `transform ${CSS_EASE}` }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden style={{ display: "block" }}>
                  <path d="M4.5 11.5l7-7M5.5 4.5h6v6" stroke={hovered ? "rgb(242, 242, 240)" : "rgb(7, 8, 10)"} strokeWidth="1.6" strokeLinecap="square" />
                </svg>
              </span>
            );
          })}
        </motion.span>
      </motion.a>
    </div>
  );
}
