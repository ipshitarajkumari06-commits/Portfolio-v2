"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { humAiN } from "@/lib/collections/hum-ai-n";

const HOLD = 1600;
const TRANSITION = 700;
const ease = [0.22, 1, 0.36, 1] as const;

const stages = [humAiN.transformation.human, humAiN.transformation.humane, humAiN.transformation.final];

// Quiet typographic transform, not a morph or particle effect. One word
// crossfades into the next, held long enough each time for the reader to
// register the change themselves — the naming should feel inevitable, not
// performed.
export default function Transformation() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px -20% 0px" });
  const prefersReducedMotion = useReducedMotion();
  const [stage, setStage] = useState(-1);

  useEffect(() => {
    if (!inView) return;
    if (prefersReducedMotion) {
      setStage(stages.length - 1);
      return;
    }
    const step = HOLD + TRANSITION;
    const timers = stages.map((_, i) => setTimeout(() => setStage(i), 100 + i * step));
    return () => timers.forEach(clearTimeout);
  }, [inView, prefersReducedMotion]);

  return (
    <div ref={ref} className="mx-auto max-w-2xl text-center">
      <AnimatePresence mode="wait">
        {stage >= 0 && (
          <motion.p
            key={stage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.8, ease } }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease } }}
            className="font-serif text-[clamp(2.5rem,9vw,5.5rem)] font-light tracking-tight text-fg"
          >
            {stages[stage]}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
