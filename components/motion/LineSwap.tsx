"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

type LineSwapProps = {
  lineA: string;
  lineB: string;
  delay?: number;
  className?: string;
};

const ease = [0.22, 1, 0.36, 1] as const;

export default function LineSwap({ lineA, lineB, delay = 3500, className = "" }: LineSwapProps) {
  const prefersReducedMotion = useReducedMotion();
  const [showB, setShowB] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      setShowB(true);
      return;
    }
    const timer = setTimeout(() => setShowB(true), delay);
    return () => clearTimeout(timer);
  }, [prefersReducedMotion, delay]);

  const duration = prefersReducedMotion ? 0 : 1.2;

  return (
    // Clipping wrapper. Position: relative, overflow hidden on both axes,
    // fixed to exactly one line's height (with a touch of extra leading so
    // descenders like "g" and "y" are never cut). The wrapper itself never
    // animates — its clip box is a hard, motionless boundary; only the
    // child inside it moves.
    <span
      className={`relative block h-[1lh] overflow-hidden leading-[1.4] ${className}`}
    >
      {/* The animated stack: truly position:absolute inside the relative
          wrapper, pinned left/right/top (never `inset-0`, which would clamp
          its own height to the wrapper's and break the translate math) so
          it can never cause horizontal overflow, while its height stays
          intrinsic to its content — both complete sentences, independently
          typeset with real, natural spacing, stacked in normal flow. */}
      <motion.span
        className="absolute inset-x-0 top-0 block"
        animate={{ y: showB ? "-50%" : "0%" }}
        transition={{ duration, ease }}
      >
        <span className="block whitespace-nowrap" aria-hidden={showB}>
          {lineA}
        </span>
        <span className="block whitespace-nowrap" aria-hidden={!showB}>
          {lineB}
        </span>
      </motion.span>
    </span>
  );
}
