"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

// Unveils its content from the bottom up as it scrolls into view, so the artwork is revealed
// rather than simply appearing. Reduced-motion visitors see the content at rest.
export default function ScrollWipe({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.95", "start 0.35"] });
  const clip = useTransform(scrollYProgress, [0, 1], ["inset(100% 0 0 0 round 20px)", "inset(0% 0 0 0 round 20px)"]);

  return (
    <div ref={ref}>
      <motion.div style={reduce ? undefined : { clipPath: clip }}>{children}</motion.div>
    </div>
  );
}
