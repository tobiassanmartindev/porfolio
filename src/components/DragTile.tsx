"use client";

import { motion } from "motion/react";
import { useFinePointer } from "./useFinePointer";

/** A tile that can be pulled out of its grid and springs back when released. */
export function DragTile({ children, cursor }: { children: React.ReactNode; cursor: string }) {
  const fine = useFinePointer();
  return (
    <motion.div
      className="about-tile about-tile-drag"
      data-cursor={fine ? cursor : undefined}
      drag={fine}
      dragSnapToOrigin
      dragElastic={0.9}
      dragMomentum={false}
      dragTransition={{ bounceStiffness: 300, bounceDamping: 13 }}
      whileHover={fine ? { scale: 1.1, rotate: -4 } : undefined}
      whileDrag={{ scale: 1.2, rotate: 8, zIndex: 20, boxShadow: "inset 0 0 0 1px rgb(255, 90, 31), 0 16px 30px -10px rgb(0, 0, 0)" }}
      transition={{ type: "spring", stiffness: 420, damping: 20 }}
    >
      {children}
    </motion.div>
  );
}
