"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";

const BEATS = [
  "How do you creatively strategise?",
  "Research",
  "More research",
  "Creative block",
  "WAIT!",
  "Every brief arrives with different questions.",
  "My work begins by finding the right one.",
  "Everything else is execution.",
];

export default function ScrollStory() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setActive(Math.min(BEATS.length - 1, Math.floor(p * BEATS.length)));
  });

  if (reduced) {
    return (
      <main className="min-h-screen bg-black px-6 py-24 sm:px-12">
        <div className="mx-auto flex max-w-3xl flex-col gap-12">
          {BEATS.map((line) => (
            <p key={line} className="font-serif text-3xl font-light text-fg md:text-5xl">
              {line}
            </p>
          ))}
        </div>
      </main>
    );
  }

  return (
    <main ref={ref} className="relative bg-black" style={{ height: `${BEATS.length * 100}vh` }}>
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden px-6 sm:px-12">
        <div className="relative w-full max-w-4xl">
          {BEATS.map((line, i) => {
            const isActive = i === active;
            return (
              <motion.p
                key={line}
                initial={false}
                animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : i < active ? -24 : 24 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-x-0 top-1/2 -translate-y-1/2 font-serif text-4xl font-light leading-tight text-fg md:text-6xl"
              >
                {line}
              </motion.p>
            );
          })}
        </div>
      </div>
    </main>
  );
}
