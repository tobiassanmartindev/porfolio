"use client";

import { useEffect, useState } from "react";

/** True for a real mouse with motion allowed. Touch screens keep native scrolling and reduced motion is respected. */
export function useFinePointer() {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const pointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setFine(pointer.matches && !reduced.matches);
    update();
    pointer.addEventListener("change", update);
    reduced.addEventListener("change", update);
    return () => {
      pointer.removeEventListener("change", update);
      reduced.removeEventListener("change", update);
    };
  }, []);
  return fine;
}
