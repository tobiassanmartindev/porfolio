"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const GLYPHS = "/\\|_-+#";
const STEPS = 14;
const STEP_MS = 34;

/** Small page-wide touches: scrambling labels, a card spotlight, the nav progress bar and the away-tab title. */
export function MicroEffects({ awayTitle }: { awayTitle: string }) {
  const pathname = usePathname();

  // Nav progress and the tab title work with any motion preference.
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      document.documentElement.style.setProperty("--scroll", String(max > 0 ? Math.min(1, window.scrollY / max) : 0));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    let title = "";
    const onVisibility = () => {
      if (document.hidden) {
        title = document.title;
        document.title = awayTitle;
      } else if (title) {
        document.title = title;
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [awayTitle, pathname]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cleanups: (() => void)[] = [];

    const timers = new Map<Element, number>();
    const scramble = (el: Element) => {
      if (timers.has(el)) return;
      const original = el.textContent ?? "";
      let step = 0;
      const timer = window.setInterval(() => {
        step++;
        const solved = (step / STEPS) * original.length;
        el.textContent = [...original]
          .map((char, i) => (i < solved || char === " " || i === 0 ? char : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
          .join("");
        if (step >= STEPS) {
          window.clearInterval(timer);
          el.textContent = original;
          timers.delete(el);
        }
      }, STEP_MS);
      timers.set(el, timer);
    };
    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        scramble(entry.target);
        io.unobserve(entry.target);
      }
    });
    document.querySelectorAll("[data-scramble]").forEach((el) => {
      io.observe(el);
      const onEnter = () => scramble(el);
      el.addEventListener("pointerenter", onEnter);
      cleanups.push(() => el.removeEventListener("pointerenter", onEnter));
    });
    cleanups.push(() => {
      io.disconnect();
      timers.forEach((timer) => window.clearInterval(timer));
    });

    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      document.querySelectorAll<HTMLElement>("[data-spotlight]").forEach((grid) => {
        let raf = 0;
        const point = { x: 0, y: 0 };
        const paint = () => {
          raf = 0;
          grid.querySelectorAll<HTMLElement>(":scope > *").forEach((card) => {
            const r = card.getBoundingClientRect();
            card.style.setProperty("--mx", `${point.x - r.left}px`);
            card.style.setProperty("--my", `${point.y - r.top}px`);
          });
        };
        const onMove = (e: PointerEvent) => {
          point.x = e.clientX;
          point.y = e.clientY;
          if (!raf) raf = requestAnimationFrame(paint);
        };
        grid.addEventListener("pointermove", onMove, { passive: true });
        cleanups.push(() => {
          cancelAnimationFrame(raf);
          grid.removeEventListener("pointermove", onMove);
        });
      });
    }

    return () => cleanups.forEach((cleanup) => cleanup());
  }, [pathname]);

  return null;
}
