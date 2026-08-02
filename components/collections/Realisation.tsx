"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { humAiN } from "@/lib/collections/hum-ai-n";

const HOLD = 1900;
const TRANSITION = 600;
const ease = [0.22, 1, 0.36, 1] as const;

// One line at a time, held, then replaced — not stacked like First
// Instinct or Research. This is the strategist naming the conclusion the
// notebook just proved, so each line needs its own held beat before the
// next arrives. After the third hold, everything fades; The Idea below
// carries on the thought as its own scroll-triggered reveal.
export default function Realisation() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px -20% 0px" });
  const prefersReducedMotion = useReducedMotion();
  const [index, setIndex] = useState(-1);

  useEffect(() => {
    if (!inView || prefersReducedMotion) return;
    const lines = humAiN.realisation.lines;
    const step = HOLD + TRANSITION;
    const timers = lines.map((_, i) => setTimeout(() => setIndex(i), 100 + i * step));
    timers.push(setTimeout(() => setIndex(lines.length), 100 + lines.length * step));
    return () => timers.forEach(clearTimeout);
  }, [inView, prefersReducedMotion]);

  if (prefersReducedMotion) {
    return (
      <div className="mx-auto flex max-w-2xl flex-col gap-3">
        {humAiN.realisation.lines.map((line) => (
          <p key={line} className="font-serif text-xl leading-snug text-fg/80 md:text-2xl">
            {line}
          </p>
        ))}
      </div>
    );
  }

  return (
    <div ref={ref} className="mx-auto min-h-[3.5em] max-w-2xl">
      <AnimatePresence mode="wait">
        {index >= 0 && index < humAiN.realisation.lines.length && (
          <motion.p
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.7, ease } }}
            exit={{ opacity: 0, transition: { duration: 0.6, ease } }}
            className="font-serif text-xl leading-snug text-fg/80 md:text-2xl"
          >
            {humAiN.realisation.lines[index]}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
