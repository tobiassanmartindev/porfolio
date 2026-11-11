"use client";

import { useEffect, useRef, useState } from "react";

const TYPE = 55;
const DELETE = 28;
const PAUSE = 1.6;
const START_DELAY = 0.3;

type Mode = "waiting" | "typing" | "holding" | "deleting";

/** Typewriter that cycles through phrases in the nav pill, pausing while off screen. */
export function TypeCycle({ phrases, prefix = "→ " }: { phrases: string[]; prefix?: string }) {
  const [text, setText] = useState("");
  const [mode, setMode] = useState<Mode>("waiting");
  const [inView, setInView] = useState(true);
  const ref = useRef<HTMLSpanElement>(null);
  const state = useRef({ phrase: 0, chars: 0, mode: "waiting" as Mode, started: false });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    const s = state.current;
    let timer = 0;
    const jitter = (ms: number) => ms * (0.7 + Math.random() * 0.6);
    const tick = () => {
      const phrase = phrases[s.phrase % phrases.length];
      if (reduced) {
        setText(phrase);
        setMode("holding");
        s.phrase = (s.phrase + 1) % phrases.length;
        timer = window.setTimeout(tick, Math.max(0.6, PAUSE) * 1000 + 600);
        return;
      }
      if (s.mode === "waiting") {
        s.mode = "typing";
        s.chars = 0;
      }
      if (s.mode === "typing") {
        s.chars++;
        setText(phrase.slice(0, s.chars));
        setMode("typing");
        if (s.chars >= phrase.length) {
          s.mode = "holding";
          timer = window.setTimeout(tick, PAUSE * 1000);
          return;
        }
        timer = window.setTimeout(tick, jitter(TYPE));
      } else if (s.mode === "holding") {
        s.mode = "deleting";
        setMode("deleting");
        timer = window.setTimeout(tick, DELETE);
      } else if (s.mode === "deleting") {
        s.chars--;
        setText(phrase.slice(0, Math.max(0, s.chars)));
        if (s.chars <= 0) {
          s.phrase = (s.phrase + 1) % phrases.length;
          s.mode = "waiting";
          setMode("waiting");
          timer = window.setTimeout(tick, 260);
          return;
        }
        timer = window.setTimeout(tick, DELETE);
      }
    };
    const delay = s.started ? 120 : START_DELAY * 1000;
    s.started = true;
    timer = window.setTimeout(tick, delay);
    return () => window.clearTimeout(timer);
  }, [inView, phrases]);

  const longest = phrases.reduce((a, b) => (b.length > a.length ? b : a), "");
  const blink = mode === "holding" || mode === "waiting";

  return (
    <span
      ref={ref}
      style={{
        fontFamily: "var(--mono)",
        fontWeight: 400,
        fontSize: 14,
        letterSpacing: "0.08em",
        lineHeight: 1.2,
        textTransform: "uppercase",
        whiteSpace: "pre",
        color: "rgb(242, 242, 240)",
        display: "inline-grid",
        alignItems: "center",
        position: "relative",
      }}
    >
      <span aria-hidden style={{ gridArea: "1 / 1", visibility: "hidden", display: "inline-flex" }}>
        {prefix}
        {longest}
        <span style={{ display: "inline-block", width: "0.74em" }} />
      </span>
      <span aria-live="polite" aria-label={phrases.join(", ")} style={{ gridArea: "1 / 1", display: "inline-flex", alignItems: "center" }}>
        <span style={{ color: "rgb(255, 90, 31)" }}>{prefix}</span>
        <span>{text}</span>
        <span
          aria-hidden
          style={{
            display: "inline-block",
            width: "0.62em",
            height: "1em",
            marginLeft: "0.12em",
            background: "rgb(255, 90, 31)",
            verticalAlign: "-0.12em",
            animation: blink ? "strata-typecycle-blink 1s steps(1) infinite" : "none",
          }}
        />
      </span>
    </span>
  );
}
