"use client";

import { motion } from "motion/react";
import { useFinePointer } from "./useFinePointer";

const THROW = { bounceStiffness: 260, bounceDamping: 11 };

/** The name as loose letters: pull one away and it springs back. Touch screens get a small tap instead, so scrolling still works. */
export function HeroName({ name, cursor }: { name: string; cursor: string }) {
  const fine = useFinePointer();
  let index = 0;
  return (
    <h1 className="t t-h1 hero-name" aria-label={name} data-cursor={fine ? cursor : undefined}>
      {name.split(" ").map((word, w) => (
        <span key={word} aria-hidden>
          {w > 0 && " "}
          <span className="hero-word">
            {[...word].map((letter) => {
              const i = index++;
              const tilt = i % 2 ? 5 : -5;
              return (
                <motion.span
                  key={i}
                  className="hero-letter"
                  drag={fine}
                  dragSnapToOrigin
                  dragElastic={0.7}
                  dragMomentum={false}
                  dragTransition={THROW}
                  whileHover={fine ? { scale: 1.08, rotate: tilt } : undefined}
                  whileTap={{ scale: 0.94 }}
                  whileDrag={{ scale: 1.14, rotate: tilt * 2, color: "rgb(255, 90, 31)", zIndex: 5 }}
                  transition={{ type: "spring", stiffness: 420, damping: 18 }}
                >
                  {letter}
                </motion.span>
              );
            })}
          </span>
        </span>
      ))}
    </h1>
  );
}
