"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

// Every image in the Collection behaves the same way: a quiet fade in
// once, the first time it enters the viewport, then a gentle zoom on
// hover. Nothing scrolls, slides, or masks — restrained on purpose.
//
// hover=false skips the zoom wrapper (and its overflow-hidden), for
// CycleImages children — those already auto-cycle on their own, and
// overflow-hidden on an ancestor would clip the Ken Burns drift.
export default function RevealImage({ children, hover = true }: { children: ReactNode; hover?: boolean }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.4, ease }}
      className={hover ? "overflow-hidden" : undefined}
    >
      {hover ? (
        <div className="transition-transform duration-300 ease-out hover:scale-[1.03]">{children}</div>
      ) : (
        children
      )}
    </motion.div>
  );
}
