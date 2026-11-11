"use client";

import { useEffect, useRef, useState } from "react";

/** Image tile that fades in the first time it nears the viewport and zooms slightly on hover. */
export function ImageCard({
  src,
  alt,
  radius = 10,
  position = "50% 50%",
}: {
  src: string;
  alt: string;
  radius?: number;
  /** CSS object-position, e.g. "50% 0%" to keep the top of a screenshot. */
  position?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [waiting, setWaiting] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || el.getBoundingClientRect().top < window.innerHeight * 0.92) return;
    setWaiting(true);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setWaiting(false);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px 4% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`pc pc-z${waiting ? " pc-wait" : ""}`} style={{ borderRadius: radius }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} loading="lazy" decoding="async" draggable={false} style={{ objectPosition: position }} />
    </div>
  );
}
