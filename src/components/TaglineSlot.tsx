"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { TypeCycle } from "./TypeCycle";

/** The typewriter is not rendered on phones, where the nav only holds brand and menu. */
export function TaglineSlot() {
  const [phone, setPhone] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 809.98px)");
    const update = () => setPhone(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  if (phone) return null;
  return (
    <div className="nav-tagline">
      <TypeCycle phrases={site.nav.phrases} />
    </div>
  );
}
