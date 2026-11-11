"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const DISTANCE = 20;
const DURATION = 0.6;

/** Blocks marked `data-reveal` rise and fade in the first time they reach the viewport. */
export function RevealEngine() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const style = document.createElement("style");
    style.textContent = `.rv-wait{opacity:.25;transform:translateY(${DISTANCE}px)}.rv-go{transition:opacity ${DURATION}s ease,transform ${DURATION}s cubic-bezier(.2,.8,.2,1)}`;
    document.head.appendChild(style);
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("rv-go");
          entry.target.classList.remove("rv-wait");
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px 6% 0px" },
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.94) return;
      el.classList.add("rv-wait");
      io.observe(el);
    });
    return () => {
      io.disconnect();
      style.remove();
    };
  }, [pathname]);

  return null;
}
