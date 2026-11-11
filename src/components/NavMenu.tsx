"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { site } from "@/content/site";

/** Hamburger that opens the full-screen menu. */
export function NavMenu({ homeFonts = false }: { homeFonts?: boolean }) {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const previous = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = previous;
    };
  }, [open]);

  return (
    <div className="nav-menu">
      <button ref={button} className="nm-b" aria-label={open ? "Cerrar menú" : "Abrir menú"} aria-expanded={open} onClick={() => setOpen(!open)}>
        <i />
        <i />
      </button>
      {open &&
        createPortal(
          <nav className={`nm-p${homeFonts ? " fonts-home" : ""}`} aria-label="Principal">
            {site.nav.links.map((link, i) => (
              <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                {link.label}
              </a>
            ))}
            {site.nav.note && <div className="nm-n">{site.nav.note}</div>}
          </nav>,
          document.body,
        )}
    </div>
  );
}
